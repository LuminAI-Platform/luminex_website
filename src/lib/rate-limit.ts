/**
 * Simple in-memory sliding-window rate limiter for API Route Handlers.
 *
 * Each limiter instance tracks request counts per identifier (typically IP address)
 * within a configurable time window.
 *
 * NOTE: This is per-serverless-instance on Vercel. For strict distributed
 * rate limiting, replace with @upstash/ratelimit + Redis.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimiterConfig {
  /** Unique namespace to isolate rate-limit counters per route. */
  namespace?: string;
  /** Maximum number of requests allowed per window. */
  maxRequests: number;
  /** Time window in milliseconds. */
  windowMs: number;
  /** Optional cap on tracked keys to prevent unbounded memory growth. */
  maxKeys?: number;
}

const stores = new Map<string, Map<string, RateLimitEntry>>();

/**
 * Creates a rate limiter with the given configuration.
 *
 * @example
 * ```ts
 * const limiter = createRateLimiter({ maxRequests: 5, windowMs: 60_000 });
 *
 * export async function POST(request: Request) {
 *   const ip = request.headers.get("x-forwarded-for") || "unknown";
 *   const { success, remaining } = limiter.check(ip);
 *   if (!success) {
 *     return NextResponse.json({ error: "Too many requests." }, { status: 429 });
 *   }
 *   // ... handle request
 * }
 * ```
 */
export function createRateLimiter(config: RateLimiterConfig) {
  const storeKey = `${config.namespace || "default"}-${config.maxRequests}-${config.windowMs}`;
  const maxKeys = config.maxKeys ?? 10_000;

  if (!stores.has(storeKey)) {
    stores.set(storeKey, new Map());
  }

  const store = stores.get(storeKey)!;

  // Periodic cleanup of expired entries (every 60s)
  if (typeof globalThis !== "undefined") {
    const cleanupKey = `__ratelimit_cleanup_${storeKey}`;
    if (!(globalThis as Record<string, unknown>)[cleanupKey]) {
      (globalThis as Record<string, unknown>)[cleanupKey] = true;
      const timer = setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of store.entries()) {
          if (now > entry.resetTime) {
            store.delete(key);
          }
        }
      }, 60_000);
      if (typeof timer === "object" && timer !== null && "unref" in timer) {
        (timer as { unref: () => void }).unref();
      }
    }
  }

  return {
    /**
     * Check if the identifier is within the rate limit.
     * Automatically increments the counter.
     */
    check(identifier: string): { success: boolean; remaining: number; resetTime: number } {
      const now = Date.now();
      const entry = store.get(identifier);

      if (!entry || now > entry.resetTime) {
        if (store.size >= maxKeys) {
          for (const [key, existing] of store.entries()) {
            if (now > existing.resetTime) {
              store.delete(key);
            }
          }
        }
        // New window
        store.set(identifier, {
          count: 1,
          resetTime: now + config.windowMs,
        });
        return {
          success: true,
          remaining: config.maxRequests - 1,
          resetTime: now + config.windowMs,
        };
      }

      // Existing window
      entry.count += 1;

      if (entry.count > config.maxRequests) {
        return {
          success: false,
          remaining: 0,
          resetTime: entry.resetTime,
        };
      }

      return {
        success: true,
        remaining: config.maxRequests - entry.count,
        resetTime: entry.resetTime,
      };
    },
  };
}
