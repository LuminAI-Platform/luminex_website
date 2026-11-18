/**
 * Lightweight, zero-dependency Supabase PostgREST client for Next.js Route Handlers,
 * plus an in-memory fallback store so local bookings can be tracked in development
 * even when Supabase environment variables are not configured.
 */

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

const globalForConsignments = globalThis as unknown as {
  __luminex_local_consignments?: Map<string, LocalTimelineStep[]>;
};

function getLocalStore(): Map<string, LocalTimelineStep[]> {
  if (!globalForConsignments.__luminex_local_consignments) {
    globalForConsignments.__luminex_local_consignments = new Map();
  }
  return globalForConsignments.__luminex_local_consignments;
}

export function saveLocalConsignment(csn: string, steps: LocalTimelineStep[]): void {
  getLocalStore().set(csn.trim().toUpperCase(), steps);
}

export function getLocalConsignment(csn: string): LocalTimelineStep[] | undefined {
  return getLocalStore().get(csn.trim().toUpperCase());
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
