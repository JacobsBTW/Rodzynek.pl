import { Link } from "@tanstack/react-router";
import { SectionLabel, SectionTitle } from "./shell";

export function Team() {
  const team = [
    {
      initials: "IMG",
      bio: "Niedługo przedstawimy zespół Rodzynek.pl - studentów, mentorów rówieśniczych i badaczki stojące za projektem.",
    },
    {
      initials: "IMG",
      bio: "Prowadzący warsztaty rówieśnicze w szkołach i organizacjach młodzieżowych.",
    },
    {
      initials: "IMG",
      bio: "Treści, media społecznościowe i kontakt z partnerami edukacyjnymi.",
    },
    {
      initials: "IMG",
      bio: "Ewaluacja warsztatów i współpraca akademicka w ramach projektu CLARA.",
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
              key={i}
              className="reveal group overflow-hidden rounded-3xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-elev"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div
                className={`relative flex aspect-square items-center justify-center ${tones[i]}`}
              >
                <div className="absolute inset-6 rounded-full bg-card/40 ring-1 ring-inset ring-warm/40" />
                <span className="relative font-display text-5xl font-black tracking-tight">
                  {m.initials}
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-card/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-soft backdrop-blur">
                  Wkrótce
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold">Imię i Nazwisko</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Chcesz dołączyć do zespołu?{" "}
          <Link
            to="/kontakt"
            className="font-semibold text-clay underline-offset-4 hover:underline"
          >
            Napisz do nas →
          </Link>
        </p>
      </div>
    </section>
  );
}
