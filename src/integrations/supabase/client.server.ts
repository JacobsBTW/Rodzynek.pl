// Ten plik jest generowany automatycznie. Nie edytuj go ręcznie.
// Serwerowy klient Supabase z kluczem service role - omija RLS.
// Używaj go wyłącznie do operacji administracyjnych w funkcjach i trasach serwerowych.
// Dla zapytań użytkownika z RLS używaj middleware autoryzacji.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["SUPABASE_URL"] : []),
      ...(!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []),
    ];
    const message = `Brakuje zmiennych środowiskowych Supabase: ${missing.join(", ")}. Skonfiguruj zmienne środowiskowe Supabase.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

let _supabaseAdmin: ReturnType<typeof createSupabaseAdminClient> | undefined;

// Serwerowy klient Supabase z service role - omija RLS.
// BEZPIECZEŃSTWO: używaj tylko w zaufanych operacjach serwerowych; nigdy nie wystawiaj go po stronie klienta.
// Import: import { supabaseAdmin } from "@/integrations/supabase/client.server";
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createSupabaseAdminClient>, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  },
});
