import { GraduationCap, FlaskConical, Globe2, Check } from "lucide-react";
import { SectionLabel, SectionTitle } from "./shell";

export function Projekt() {
  const partners = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      name: "Uniwersytet Łódzki",
      desc: "Macierzysta uczelnia projektu Rodzynek.pl",
    },
    {
      icon: <FlaskConical className="h-5 w-5" />,
      name: "Projekt CLARA",
      desc: "Laboratorium badań stosowanych i działań społecznych",
    },
    {
      icon: <Globe2 className="h-5 w-5" />,
      name: "Yourope",
      desc: "Europejska sieć działań na rzecz młodzieży",
    },
  ];
  const values = [
    ["Bezpłatne warsztaty", "dla szkół i organizacji młodzieżowych"],
    ["Naukowe podstawy", "metody oparte na badaniach z zakresu psychologii"],
    ["Studencki głos", "autentyczność i bliskość wiekowa jako klucz do kontaktu"],
    ["Europejski kontekst", "działamy w ramach sieci obejmującej wiele krajów"],
  ];
  return (
    <section className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto grid max-w-7xl items-start gap-16 px-6 md:grid-cols-[1fr_1.3fr] md:px-10">
        <div className="reveal">
          <SectionLabel>Skąd jesteśmy</SectionLabel>
          <SectionTitle>
            Projekt CLARA i<br />
            <em className="italic text-clay">Yourope</em>
          </SectionTitle>
          <div className="mt-8 grid gap-3">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:border-clay hover:bg-clay-soft/40"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-clay-soft text-clay">
                  {p.icon}
                </div>
                <div>
                  <div className="text-sm font-bold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal">
          <p className="text-lg text-muted-foreground text-pretty">
            Rodzynek.pl to inicjatywa studencka powstała w ramach projektu{" "}
            <strong className="text-foreground">CLARA</strong>, realizowanego przez Uniwersytet
            Łódzki we współpracy z siecią Yourope - europejską organizacją zrzeszającą festiwale i
            inicjatywy młodzieżowe.
          </p>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Projekt łączy akademicką wiedzę o profilaktyce z energią i autentycznością studenckiego
            wsparcia rówieśniczego. Działamy <strong className="text-foreground">non-profit</strong>
            , z pełnym zaangażowaniem i bez zewnętrznych interesów.
          </p>
          <ul className="mt-8 grid gap-3">
            {values.map(([h, t]) => (
              <li key={h} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-clay text-primary-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span className="text-base text-ink-soft">
                  <strong className="font-semibold text-foreground">{h}</strong> - {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
