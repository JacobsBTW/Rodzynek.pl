// @lovable.dev/vite-tanstack-config zawiera już poniższe elementy - nie dodawaj ich ręcznie,
// bo aplikacja uruchomiłaby zduplikowane wtyczki:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     wtyczki logowania błędów oraz wykrywanie sandboxa (port/host/strictPort).
// Dodatkową konfigurację można przekazać przez defineConfig({ vite: { ... } }).
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Przekierowanie wejścia serwera TanStack Start do src/server.ts (nasza obsługa błędów SSR).
// @cloudflare/vite-plugin buduje projekt z tej konfiguracji - samo main w wrangler.jsonc nie wystarcza.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});
