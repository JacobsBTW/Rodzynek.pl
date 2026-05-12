import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/shell";
import { Projekt } from "@/components/site/projekt";

export const Route = createFileRoute("/projekt")({
  head: () => ({
    meta: [
      { title: "Projekt CLARA & Yourope — Rodzynek.pl" },
      { name: "description", content: "Rodzynek.pl działa w ramach projektu CLARA Uniwersytetu Łódzkiego we współpracy z europejską siecią Yourope." },
      { property: "og:title", content: "Projekt CLARA & Yourope — Rodzynek.pl" },
      { property: "og:description", content: "Akademickie korzenie Rodzynka: projekt CLARA, sieć Yourope, Uniwersytet Łódzki." },
    ],
  }),
  component: () => (
    <SiteShell>
      <Projekt />
    </SiteShell>
  ),
});
