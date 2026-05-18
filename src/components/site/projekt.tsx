import { Check, HeartHandshake, MessageCircle, Users } from "lucide-react";
import { SectionLabel, SectionTitle } from "./shell";

export function Projekt() {
  const approach = [
    "Nie narzucamy gotowych rozwiązań - wypracowujemy je wspólnie z młodzieżą.",
    "Nie pouczamy - rozmawiamy.",
    "Nie udajemy, że wiemy wszystko - chcemy słuchać.",
  ];
  const actions = [
    {
      icon: <Users className="h-5 w-5" />,
      name: "Reintegrujemy grupy",
      desc: "Pomagamy klasom i grupom rówieśniczym odbudowywać kontakt, zaufanie i poczucie wspólnoty.",
    },
    {
      icon: <HeartHandshake className="h-5 w-5" />,
      name: "Szkolimy liderów",
      desc: "Wzmacniamy osoby, które mogą później prowadzić działania rówieśnicze w swoich szkołach.",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      name: "Tworzymy przestrzeń",
      desc: "Budujemy miejsce, w którym młodzi nie muszą udawać i mogą mówić o tym, co naprawdę ważne.",
    },
  ];

  return (
    <section className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid max-w-7xl items-start gap-16 px-6 md:grid-cols-[1fr_1.15fr] md:px-10">
        <div className="reveal">
          <SectionLabel>Cel</SectionLabel>
          <SectionTitle>
            Budujemy system <em className="italic text-clay">wsparcia rówieśniczego.</em>
          </SectionTitle>
          <div className="mt-5 space-y-5 text-lg leading-relaxed text-muted-foreground text-pretty">
            <p>
              Naszym celem jest reintegracja grup rówieśniczych i budowa systemu wsparcia
              rówieśniczego.
            </p>
            <p>
              Demokratyzujemy przestrzeń szkolną poprzez zajęcia profilaktyczne prowadzone przez
              młodzież, a nie tylko dla młodzieży. Opieramy warsztaty na ich wiedzy z doświadczenia,
              bo to młodzi najlepiej wiedzą, z czym mierzą się na co dzień.
            </p>
          </div>
          <a
            href="/#kontakt"
            className="mt-8 inline-flex rounded-full bg-clay px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-elev"
          >
            Chcesz działać razem? Napisz do nas
          </a>
        </div>

        <div className="reveal grid gap-6">
          <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
            <SectionLabel>Nasze podejście</SectionLabel>
            <ul className="mt-5 grid gap-4">
              {approach.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-clay text-primary-foreground">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-base text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {actions.map((action) => (
              <div
                key={action.name}
                className="rounded-2xl border border-border bg-card p-5 transition hover:border-clay hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clay-soft text-clay">
                  {action.icon}
                </div>
                <h3 className="mt-4 font-semibold leading-tight">{action.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{action.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-ink p-7 text-warm shadow-elev">
            <SectionLabel className="text-honey">Co robimy?</SectionLabel>
            <p className="mt-4 text-lg leading-relaxed text-warm/80 text-pretty">
              Prowadzimy warsztaty, szkolimy liderów rówieśniczych i tworzymy przestrzeń, w której
              nie musisz udawać. Wierzymy, że prawdziwa zmiana zaczyna się od małych kroków i od
              ludzi, którzy są obok.
            </p>
            <p className="mt-5 font-display text-2xl font-light italic leading-snug text-warm">
              Jesteśmy tu po to, żeby nie być samym.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
