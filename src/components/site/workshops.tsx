import { useState } from "react";
import { ChevronDown, MicVocal, Puzzle, Smartphone } from "lucide-react";
import { SectionLabel, SectionTitle } from "./shell";

export function Workshops() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const items = [
    {
      icon: <Puzzle className="h-6 w-6" />,
      accent: "bg-clay",
      title: "“Masz głos” - warsztat tworzony RAZEM z młodzieżą",
      intro:
        "Nie przychodzimy z gotowymi rozwiązaniami, narzucanymi działaniami. Przychodzimy po to, żeby je wypracować z młodzieżą, bo to ona wie czego potrzebuje!",
      detailsTitle: "Podczas warsztatu:",
      details: [
        "zastanowimy się, skąd bierze się presja i gdzie najczęściej doświadcza jej młodzież,",
        "wymyślimy, jak na nią reagować - po swojemu, po ludzku, bez udawania,",
        "sprawdzimy, co działa w Waszej szkole, a co nie.",
      ],
      tags: [],
    },
    {
      icon: <MicVocal className="h-6 w-6" />,
      accent: "bg-honey",
      title: "To WY macie głos.",
      intro: "My dajemy narzędzia i bezpieczną przestrzeń - Wy mówicie, co jest dla Was ważne.",
      body: [
        "Na warsztacie nie ma wykładów, są ćwiczenia, rozmowa i pomysły młodzieży, dla której rzeczywistość szkolna jest codziennością.",
        "Na ich podstawie powstanie autorski scenariusz, który potem mogą prowadzić sami uczniowie - dla innych klas.",
      ],
      audience: "klasy 7-8 i 1-4 liceum",
      tags: ["60 minut"],
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      accent: "bg-ink",
      title: "„BEZ presji” - warsztat o zjawisku presji rówieśniczej i budowaniu wspólnoty.",
      intro:
        "Gotowy scenariusz dla klas, które potrzebują konkretnych narzędzi i bezpiecznego wprowadzenia w temat.",
      detailsTitle: "Na warsztacie:",
      details: [
        "uczniowie dowiedzą się, czym jest presja rówieśnicza i skąd się bierze",
        "uczniowie przećwiczą stosowanie asertywnych komunikatów",
        "pokażemy jak ważne jest wspieranie się i stawanie w swojej obronie",
      ],
      format:
        "ćwiczenia interaktywne, praca w parach i grupach, dużo ruchu i rozmowy. Zero wykładów, zero oceniania.",
      audience:
        "klasy 3-6 szkoły podstawowej oraz klasy o niższej aktywności lub potrzebujące bardziej ustrukturyzowanych zajęć.",
      tags: ["60 minut"],
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpanded((current) => ({ ...current, [index]: !current[index] }));
  };

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
              className="reveal group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-elev"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className={`absolute inset-x-0 top-0 h-1 ${w.accent}`} />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay-soft text-clay">
                {w.icon}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold leading-snug">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{w.intro}</p>
              <div
                id={`workshop-details-${i}`}
                className={`grid transition-all duration-300 ${
                  expanded[i] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                    {w.body?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {w.details && (
                      <div>
                        <p className="font-semibold text-foreground">{w.detailsTitle}</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {w.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {w.format && (
                      <p>
                        <span className="font-semibold text-foreground">Forma:</span> {w.format}
                      </p>
                    )}
                    {w.audience && (
                      <p className="rounded-2xl bg-clay-soft px-4 py-3 text-clay">
                        <span className="font-bold">Dla kogo:</span> {w.audience}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="button"
                aria-expanded={expanded[i] ?? false}
                aria-controls={`workshop-details-${i}`}
                onClick={() => toggleExpanded(i)}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-clay transition hover:border-clay hover:bg-clay-soft"
              >
                {expanded[i] ? "Pokaż mniej" : "Pokaż więcej"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${expanded[i] ? "rotate-180" : ""}`}
                />
              </button>
              {w.tags.length > 0 && (
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
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
