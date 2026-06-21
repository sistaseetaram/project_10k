import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// `isSupabaseConfigured` lets the UI degrade gracefully (show a setup notice)
// instead of crashing when the env vars haven't been filled in yet.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // eslint-disable-next-line no-console
  console.warn(
    '[Project 10K] Supabase env vars missing. Add VITE_SUPABASE_URL and ' +
      'VITE_SUPABASE_ANON_KEY to .env, then rebuild. Auth + data are disabled until then.'
  );
}

// The anon key is publishable by design — Row Level Security is the security
// boundary, not key secrecy. Never put the service_role key in client code.
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
