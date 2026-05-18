import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Projekt } from "@/components/site/projekt";

export const Route = createFileRoute("/projekt")({
  head: () => ({
    meta: [
      { title: "Projekt - Rodzynek.pl" },
      {
        name: "description",
        content:
          "Cel Rodzynek.pl: reintegracja grup rówieśniczych, wsparcie rówieśnicze i warsztaty tworzone z młodzieżą.",
      },
      { property: "og:title", content: "Projekt - Rodzynek.pl" },
      {
        property: "og:description",
        content:
          "Zobacz, jak Rodzynek.pl buduje system wsparcia rówieśniczego i przestrzeń do rozmowy bez presji.",
      },
    ],
  }),
  component: () => (
    <SiteShell>
      <Projekt />
    </SiteShell>
  ),
});
