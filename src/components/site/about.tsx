import { HeartHandshake, MessageCircle, Quote, Users } from "lucide-react";
import { SectionLabel, SectionTitle } from "./shell";

export function About() {
  const highlights = [
    {
      icon: <Users className="h-5 w-5" />,
      name: "Tacy sami jak Wy",
      desc: "Mówimy z perspektywy młodych ludzi, którzy sami znają presję i wykluczenie.",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      name: "Rozmowa zamiast wykładu",
      desc: "Nie przychodzimy pouczać. Chcemy słuchać, pytać i tworzyć przestrzeń do szczerej rozmowy.",
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      name: "Wsparcie rówieśnicze",
      desc: "Zwracamy uwagę na to, że młodzi mogą być dla siebie wsparciem, a nie kolejnym źródłem stresu.",
    },
  ];

  return (
    <section className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid max-w-7xl items-start gap-16 px-6 md:grid-cols-[0.95fr_1.05fr] md:px-10">
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-3xl bg-ink p-9 text-warm shadow-elev">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-warm/5" />
            <p className="font-display text-2xl font-light italic leading-snug text-warm/95 md:text-[1.7rem]">
              Hej, chcesz pogadać?
            </p>
            <p className="mt-5 text-base leading-relaxed text-warm/75">
              Czasem właśnie tego pytania brakuje najbardziej. Rodzynek.pl powstał po to, żeby
              młodzi ludzie częściej zauważali siebie nawzajem i reagowali, kiedy ktoś zostaje sam z
              presją.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Młodzież", "Rozmowa", "Wsparcie", "Bez presji"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-warm/15 bg-warm/10 px-3.5 py-1 text-xs font-semibold text-warm/85"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-3xl border border-border bg-card p-7 shadow-soft">
            <SectionLabel>Czemu Rodzynek?</SectionLabel>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Rodzynkiem z początku był Iwo, bo naturalnie objął tę rolę w grupie składającej się z
              trzech kobiet i jego. Jednak z czasem okazało się, że każdy z nas był lub bywa
              Rodzynkiem. To nie tylko symbol naszej wyjątkowej współpracy i zgranej dynamiki, ale
              też metafora tego, co spotyka każdego z nas: bycia wykluczonym, obserwowanym z boku,
              czasem wydłubywanym i odsuwanym na dalszy plan jak rodzynki w cieście.
            </p>
          </div>
        </div>

        <div className="reveal">
          <SectionLabel>O nas</SectionLabel>
          <SectionTitle>
            Jesteśmy grupą młodych ludzi - <em className="italic text-clay">taką samą jak Wy.</em>
          </SectionTitle>
          <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            <p>
              Projekt Rodzynek.pl stworzyliśmy, bo sami doświadczaliśmy presji, wykluczenia i
              momentów, w których brakowało nam kogoś, kto po prostu zauważy i zapyta: „Hej, chcesz
              pogadać?”.
            </p>
            <p>
              Teraz wiemy, jak ważne jest reagowanie na presję rówieśniczą i dbanie o siebie
              nawzajem, ale bardzo długo nie potrafiliśmy tego robić. Właśnie dlatego powstał
              Rodzynek - by zwrócić młodym uwagę na to, że powinni być dla siebie wsparciem, a nie
              kolejnym źródłem stresu, którego w szkolnej rzeczywistości jest już wystarczająco.
            </p>
          </div>
          <div className="mt-8 grid gap-3">
            {highlights.map((p) => (
              <div
                key={p.name}
                className="group rounded-2xl border border-border bg-card p-5 transition hover:border-clay hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-clay-soft text-clay transition group-hover:bg-clay group-hover:text-primary-foreground">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
