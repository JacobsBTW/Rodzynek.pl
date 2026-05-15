import { Brain, HeartHandshake, Wrench, Users, Quote } from "lucide-react";
import { SectionLabel, SectionTitle } from "./shell";

export function About() {
  const pillars = [
    {
      icon: <Brain className="h-5 w-5" />,
      name: "Edukacja",
      desc: "Wiedza o mechanizmach presji społecznej i sposobach radzenia sobie z nią.",
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      name: "Wsparcie",
      desc: "Bezpieczna, empatyczna przestrzeń do rozmowy bez oceniania.",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      name: "Narzędzia",
      desc: "Praktyczne techniki asertywności i budowania granic na co dzień.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      name: "Społeczność",
      desc: "Budujemy więzi i kulturę wzajemnego szacunku wśród młodych.",
    },
  ];
  return (
    <section className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 md:px-10">
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-3xl bg-ink p-9 text-warm shadow-elev">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-warm/5" />
            <p className="font-display text-2xl font-light italic leading-snug text-warm/95 md:text-[1.7rem]">
              Presja rówieśnicza dotyczy{" "}
              <strong className="font-semibold not-italic text-honey">każdego z nas.</strong>{" "}
              Dlatego najskuteczniejsza odpowiedź na nią wychodzi właśnie od nas - rówieśników.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Rówieśniczo", "Projekt CLARA", "Yourope", "UŁ"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-warm/15 bg-warm/10 px-3.5 py-1 text-xs font-semibold text-warm/85"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 flex items-center gap-2 rounded-2xl bg-card px-4 py-3 text-xs font-semibold shadow-soft">
            <span className="h-2 w-2 rounded-full bg-clay" /> Aktywny 2025–2026
          </div>
          <div className="absolute -left-3 -top-3 flex items-center gap-2 rounded-2xl bg-card px-4 py-3 text-xs font-semibold shadow-soft">
            <span className="h-2 w-2 rounded-full bg-honey" /> Uni Łódź
          </div>
        </div>

        <div className="reveal">
          <SectionLabel>O nas</SectionLabel>
          <SectionTitle>
            Rodzynek to <em className="italic text-clay">coś innego.</em>
          </SectionTitle>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Jesteśmy grupą studentów Uniwersytetu Łódzkiego działających w ramach projektu CLARA
            sieci Yourope. Rodzynek powstał z przekonania, że rozmowy między rówieśnikami mają moc,
            której nie zastąpi żaden podręcznik.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {pillars.map((p) => (
              <div
                key={p.name}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:border-clay hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clay-soft text-clay transition group-hover:bg-clay group-hover:text-primary-foreground">
                  {p.icon}
                </div>
                <h3 className="mt-3 font-semibold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
