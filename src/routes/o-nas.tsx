import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { About } from "@/components/site/about";

export const Route = createFileRoute("/o-nas")({
  head: () => ({
    meta: [
      { title: "O nas — Rodzynek.pl" },
      { name: "description", content: "Studencka inicjatywa z UŁ. Peer-led warsztaty o presji rówieśniczej w ramach projektu CLARA i sieci Yourope." },
      { property: "og:title", content: "O nas — Rodzynek.pl" },
      { property: "og:description", content: "Kim jesteśmy i dlaczego wierzymy, że rozmowa rówieśnika z rówieśnikiem zmienia więcej niż wykład." },
    ],
  }),
  component: () => (
    <SiteShell>
      <About />
    </SiteShell>
  ),
});
