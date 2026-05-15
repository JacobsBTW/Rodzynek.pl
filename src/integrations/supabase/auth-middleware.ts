// Ten plik jest generowany automatycznie. Nie edytuj go ręcznie.
import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_PUBLISHABLE_KEY = process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
      const missing = [
        ...(!SUPABASE_URL ? ["SUPABASE_URL"] : []),
        ...(!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []),
      ];
      const message = `Brakuje zmiennych środowiskowych Supabase: ${missing.join(", ")}. Skonfiguruj zmienne środowiskowe Supabase.`;
      console.error(`[Supabase] ${message}`);
      throw new Response(message, { status: 500 });
    }

    const request = getRequest();

    if (!request?.headers) {
      throw new Response("Brak autoryzacji: nagłówki żądania są niedostępne", { status: 401 });
    }

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      throw new Response("Brak autoryzacji: nie przekazano nagłówka authorization", {
        status: 401,
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new Response("Brak autoryzacji: obsługiwane są tylko tokeny Bearer", { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Response("Brak autoryzacji: nie przekazano tokenu", { status: 401 });
    }

    const supabase = createClient<Database>(SUPABASE_URL!, SUPABASE_PUBLISHABLE_KEY!, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: {
        storage: undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await supabase.auth.getClaims(token);
    if (error || !data?.claims) {
      throw new Response("Brak autoryzacji: nieprawidłowy token", { status: 401 });
    }

    if (!data.claims.sub) {
      throw new Response("Brak autoryzacji: token nie zawiera identyfikatora użytkownika", {
        status: 401,
      });
    }

    return next({
      context: {
        supabase,
        userId: data.claims.sub,
        claims: data.claims,
      },
    });
  },
);
