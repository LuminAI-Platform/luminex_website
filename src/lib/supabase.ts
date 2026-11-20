/**
 * Lightweight, zero-dependency Supabase PostgREST client for Next.js Route Handlers,
 * plus an in-memory fallback store so local bookings can be tracked in development
 * even when Supabase environment variables are not configured.
 */

import fs from "fs";
import os from "os";
import path from "path";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/+$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export interface LocalTimelineStep {
  id: string;
  title: string;
  timestamp?: string;
  description: string;
  status: "completed" | "in_progress" | "pending";
  courier?: string;
  requiredId?: string;
}

export interface LocalTestimonialRecord {
  id: string;
  rating: number;
  quote: string;
  author: string;
  title: string;
  verified?: boolean;
  kind?: "verified_delivery" | "client_review" | "featured_partner";
  createdAt?: string;
}

interface LocalStoreData {
  consignments: Record<string, LocalTimelineStep[]>;
  testimonials: LocalTestimonialRecord[];
}

const LOCAL_STORE_DIR =
  process.env.NODE_ENV === "production"
    ? os.tmpdir()
    : path.join(process.cwd(), ".data");
const LOCAL_STORE_FILE = path.join(LOCAL_STORE_DIR, "local-store.json");

const globalForStore = globalThis as unknown as {
  __luminex_fallback_store?: LocalStoreData;
};

function getMemoryStore(): LocalStoreData {
  if (!globalForStore.__luminex_fallback_store) {
    globalForStore.__luminex_fallback_store = {
      consignments: {},
      testimonials: [],
    };
  }
  return globalForStore.__luminex_fallback_store;
}

function readLocalStore(): LocalStoreData {
  const mem = getMemoryStore();
  try {
    if (fs.existsSync(LOCAL_STORE_FILE)) {
      const raw = fs.readFileSync(LOCAL_STORE_FILE, "utf8");
      const parsed = JSON.parse(raw) as Partial<LocalStoreData>;
      const consignments = {
        ...mem.consignments,
        ...(parsed.consignments && typeof parsed.consignments === "object"
          ? parsed.consignments
          : {}),
      };
      const fileTestimonials = Array.isArray(parsed.testimonials)
        ? parsed.testimonials
        : [];
      const seen = new Set<string>();
      const mergedTestimonials: LocalTestimonialRecord[] = [];
      for (const item of [...mem.testimonials, ...fileTestimonials]) {
        const key = `${item.author.toLowerCase()}::${item.quote.toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          mergedTestimonials.push(item);
        }
      }
      mem.consignments = consignments;
      mem.testimonials = mergedTestimonials;
      return { consignments, testimonials: mergedTestimonials };
    }
  } catch (err) {
    console.warn("[Fallback Store Read Warning]:", err);
  }
  return mem;
}

function writeLocalStore(data: LocalStoreData): void {
  const mem = getMemoryStore();
  mem.consignments = data.consignments;
  mem.testimonials = data.testimonials;
  try {
    if (!fs.existsSync(LOCAL_STORE_DIR)) {
      fs.mkdirSync(LOCAL_STORE_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORE_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("[Fallback Store Disk Write Warning - using memory mirror]:", err);
  }
}

export function saveLocalConsignment(csn: string, steps: LocalTimelineStep[]): void {
  const normalized = csn.trim().toUpperCase();
  const store = readLocalStore();
  store.consignments[normalized] = steps;
  writeLocalStore(store);
}

export function getLocalConsignment(csn: string): LocalTimelineStep[] | undefined {
  const normalized = csn.trim().toUpperCase();
  const store = readLocalStore();
  return store.consignments[normalized];
}

export function getLocalTestimonials(): LocalTestimonialRecord[] {
  return readLocalStore().testimonials;
}

export function saveLocalTestimonial(item: LocalTestimonialRecord): void {
  const store = readLocalStore();
  const duplicateKey = `${item.author.toLowerCase()}::${item.quote.toLowerCase()}`;
  const filtered = store.testimonials.filter(
    (existing) =>
      `${existing.author.toLowerCase()}::${existing.quote.toLowerCase()}` !==
      duplicateKey
  );
  store.testimonials = [item, ...filtered].slice(0, 20);
  writeLocalStore(store);
}

/**
 * Formats a Date or ISO timestamp consistently as `24 Oct 2026, 08:00 GMT`.
 */
export function formatTimestampGMT(input: string | Date): string {
  const date = typeof input === "string" ? new Date(input) : input;
  if (Number.isNaN(date.getTime())) return "";

  const datePart = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "GMT",
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "GMT",
  }).format(date);

  return `${datePart}, ${timePart} GMT`;
}

/**
 * Returns whether valid Supabase credentials have been configured in the environment.
 */
export function isSupabaseConfigured(): boolean {
  if (!supabaseUrl || !(supabaseServiceRoleKey || supabaseAnonKey)) {
    return false;
  }
  if (!/^https?:\/\//i.test(supabaseUrl) || supabaseUrl.includes("your-project")) {
    return false;
  }
  return true;
}

interface PostgrestResult<T = Record<string, unknown>> {
  data: T | null;
  error: { message: string; status?: number } | null;
}

class PostgrestQueryBuilder<T = Record<string, unknown>>
  implements PromiseLike<PostgrestResult<T>> {
  private url: URL;
  private headers: Record<string, string>;
  private method: "GET" | "POST" = "GET";
  private bodyData?: string;
  private isSingle = false;

  constructor(baseUrl: string, apiKey: string, table: string) {
    this.url = new URL(`${baseUrl}/rest/v1/${table}`);
    this.headers = {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
  }

  select(columns = "*"): this {
    this.url.searchParams.set("select", columns.replace(/\s+/g, ""));
    if (this.method === "POST") {
      this.headers["Prefer"] = "return=representation";
    }
    return this;
  }

  insert(rows: unknown[]): this {
    this.method = "POST";
    this.bodyData = JSON.stringify(rows);
    this.headers["Prefer"] = this.headers["Prefer"] || "return=minimal";
    return this;
  }

  eq(column: string, value: string | number): this {
    this.url.searchParams.set(column, `eq.${value}`);
    return this;
  }

  order(column: string, options?: { ascending?: boolean }): this {
    const dir = options?.ascending === false ? "desc" : "asc";
    this.url.searchParams.set("order", `${column}.${dir}`);
    return this;
  }

  single(): this {
    this.isSingle = true;
    this.headers["Accept"] = "application/vnd.pgrst.object+json";
    return this;
  }

  private async execute(): Promise<PostgrestResult<T>> {
    try {
      const response = await fetch(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: this.bodyData,
        cache: "no-store",
        signal: AbortSignal.timeout(4500),
      });

      const text = await response.text();
      const parsed = text ? JSON.parse(text) : null;

      if (!response.ok) {
        return {
          data: null,
          error: {
            message: parsed?.message || parsed?.error || response.statusText,
            status: response.status,
          },
        };
      }

      if (this.isSingle && Array.isArray(parsed)) {
        return { data: (parsed[0] ?? null) as T, error: null };
      }

      return { data: parsed as T, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Database request failed",
        },
      };
    }
  }

  then<TResult1 = PostgrestResult<T>, TResult2 = never>(
    onfulfilled?: ((value: PostgrestResult<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    return this.execute().then(onfulfilled, onrejected);
  }
}

export interface SupabaseRestClient {
  from<T = Record<string, unknown>>(table: string): PostgrestQueryBuilder<T>;
}

/**
 * Server-side Supabase REST client for Route Handlers.
 */
export function getSupabaseServerClient(): SupabaseRestClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const key = supabaseServiceRoleKey || supabaseAnonKey;
  return {
    from<T = Record<string, unknown>>(table: string) {
      return new PostgrestQueryBuilder<T>(supabaseUrl, key, table);
    },
  };
}
