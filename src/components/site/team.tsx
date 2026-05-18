import { SectionLabel, SectionTitle } from "./shell";

export function Team() {
  const team = [
    {
      name: "Kornelia Łabieniec",
      initials: "KŁ",
      quote: "Trudne rzeczy łatwiej przejść z uśmiechem. Serio.",
      image: "/team/kornelia-labieniec.jpg",
    },
    {
      name: "Iwo Nalbach",
      initials: "IN",
      quote: "Byłem obok. Widziałem. I zostałem.",
    },
    {
      name: "Zuzanna Malinowska",
      initials: "ZM",
      quote: "Wiedziałam, że nie jestem sama. Chcę, żebyś też to wiedział.",
      image: "/team/zuzanna-malinowska.jpg",
    },
    {
      name: "Lena Drogosz",
      initials: "LD",
      quote: "Z małej iskry można zrobić pożar.",
    },
  ];
  const tones = [
    "bg-clay-soft text-clay",
    "bg-honey/30 text-ink",
    "bg-sand text-ink-soft",
    "bg-clay-soft text-clay",
  ];

  return (
    <section className="bg-warm pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="reveal mx-auto max-w-xl text-center">
          <SectionLabel center>Nasz zespół</SectionLabel>
          <SectionTitle center>
            Ludzie za <em className="italic text-clay">Rodzynkiem</em>
          </SectionTitle>
          <p className="mt-4 text-muted-foreground">
            Studenci, mentorzy rówieśniczy, badaczki i animatorki - łączy nas wiara, że rozmowa
            zmienia więcej niż wykład.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {team.map((m, i) => (
            <article
              key={m.name}
              className="reveal group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elev"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div
                className={`relative flex aspect-square items-center justify-center overflow-hidden ${tones[i]}`}
              >
                {m.image ? (
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
                ) : (
                  <>
                    <div className="absolute inset-6 rounded-full bg-card/40 ring-1 ring-inset ring-warm/40" />
                    <span className="relative font-display text-5xl font-black tracking-tight">
                      {m.initials}
                    </span>
                    <span className="absolute bottom-3 right-3 rounded-full bg-card/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-soft backdrop-blur">
                      Zdjęcie wkrótce
                    </span>
                  </>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">{m.name}</h3>
                <p className="mt-3 text-sm italic leading-relaxed text-muted-foreground">
                  „{m.quote}”
                </p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Chcesz działać razem?{" "}
          <a
            href="/#kontakt"
            className="font-semibold text-clay underline-offset-4 hover:underline"
          >
            Napisz do nas →
          </a>
        </p>
      </div>
    </section>
  );
}
