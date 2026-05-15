import { Puzzle, MicVocal, Smartphone } from "lucide-react";
import { SectionLabel, SectionTitle } from "./shell";

export function Workshops() {
  const items = [
    {
      icon: <Puzzle className="h-6 w-6" />,
      accent: "bg-clay",
      title: "Presja rówieśnicza - skąd się bierze?",
      desc: "Mechanizmy presji społecznej: jak działa, dlaczego jej ulegamy i co możemy z tym zrobić. Psychologia społeczna bez akademickiego żargonu.",
      tags: ["90 min", "12–18 lat", "Interaktywny"],
    },
    {
      icon: <MicVocal className="h-6 w-6" />,
      accent: "bg-honey",
      title: 'Powiedz „nie" - asertywność w praktyce',
      desc: 'Ćwiczenia, scenki i dyskusje. Budujemy umiejętność mówienia „nie" bez poczucia winy oraz stawiania i szanowania granic.',
      tags: ["120 min", "Szkoły i NGO", "Scenki"],
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      accent: "bg-ink",
      title: "W sieci i poza nią - presja rówieśnicza",
      desc: "Jak media społecznościowe wzmacniają presję rówieśniczą? FOMO, porównywanie się, cyfrowy mobbing - i zdrowe nawyki w sieci.",
      tags: ["90 min", "14–20 lat", "Dyskusja"],
    },
  ];
  return (
    <section className="bg-warm pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal mx-auto max-w-2xl text-center">
          <SectionLabel center>Warsztaty</SectionLabel>
          <SectionTitle center>
            Co robimy <em className="italic text-clay">razem?</em>
          </SectionTitle>
          <p className="mt-4 text-lg text-muted-foreground">
            Spotkania interaktywne, bezpieczne i dostosowane do wieku. Nie mówimy <em>do</em>{" "}
            młodzieży - rozmawiamy <em>z</em> nią.
          </p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((w, i) => (
            <article
              key={w.title}
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-elev"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={`absolute inset-x-0 top-0 h-1 ${w.accent}`} />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-soft text-clay">
                {w.icon}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold leading-snug">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {w.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
