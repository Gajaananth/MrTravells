// Server-side Supabase client using SUPABASE_SERVICE_ROLE_KEY
import { createClient } from '@supabase/supabase-js';

let supabaseServerInstance = null;

export function getSupabaseServerClient() {
  if (supabaseServerInstance) return supabaseServerInstance;

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !serviceRoleKey || supabaseUrl.includes('your-project')) {
    return null;
  }

  supabaseServerInstance = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return supabaseServerInstance;
}
