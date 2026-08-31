import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Environment variable configuration for Supabase.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

let serverClientInstance: SupabaseClient | null = null;
let browserClientInstance: SupabaseClient | null = null;

/**
 * Returns whether Supabase credentials have been configured in the environment.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey));
}

/**
 * Server-side Supabase client with elevated privileges for trusted Route Handlers & Server Actions.
 * Uses SUPABASE_SERVICE_ROLE_KEY if present, falling back to NEXT_PUBLIC_SUPABASE_ANON_KEY.
 */
export function getSupabaseServerClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!serverClientInstance) {
    const key = supabaseServiceRoleKey || supabaseAnonKey;
    serverClientInstance = createClient(supabaseUrl, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return serverClientInstance;
}

/**
 * Client-side Supabase client for browser components (uses public anon key only).
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  if (!browserClientInstance) {
    browserClientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }

  return browserClientInstance;
}
