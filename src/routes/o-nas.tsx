import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { About } from "@/components/site/about";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nas - Rodzynek.pl" },
      {
        name: "description",
        content:
          "Poznaj Rodzynek.pl - młodych ludzi, którzy tworzą wsparcie rówieśnicze i reagują na presję oraz wykluczenie.",
      },
      { property: "og:title", content: "O nas - Rodzynek.pl" },
      {
        property: "og:description",
        content:
          "Kim jesteśmy, dlaczego powstał Rodzynek.pl i czemu wierzymy w rozmowę zamiast pouczania.",
      },
    ],
  }),
  component: () => (
    <SiteShell>
      <About />
    </SiteShell>
  ),
});
