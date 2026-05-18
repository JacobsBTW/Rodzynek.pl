import { Sparkles, ArrowRight, HeartHandshake, MessageCircle, Shield } from "lucide-react";
import { getHomeSectionHref, publicContent, type Locale } from "@/lib/public-content";

function FloatCard({
  icon,
  title,
  desc,
  tone,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: "clay" | "honey" | "sand";
  className?: string;
}) {
  const toneClass =
    tone === "clay"
      ? "bg-clay-soft text-clay"
      : tone === "honey"
        ? "bg-honey/30 text-ink"
        : "bg-sand text-ink-soft";
  return (
    <div
      className={`flex w-[19rem] items-center gap-3 rounded-2xl bg-card p-4 shadow-soft ${className}`}
    >
      <div
        className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl ${toneClass}`}
      >
        {icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}

export function Hero({ locale = "pl" }: { locale?: Locale }) {
  const t = publicContent[locale].hero;
  const icons = [
    <HeartHandshake className="h-5 w-5" />,
    <MessageCircle className="h-5 w-5" />,
    <Shield className="h-5 w-5" />,
  ];
  const tones = ["clay", "honey", "sand"] as const;
  const classes = [
    "animate-float",
    "ml-10 animate-float [animation-delay:1.2s]",
    "animate-float [animation-delay:2.4s]",
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden className="absolute inset-0 bg-grain opacity-60" />
      <div
        aria-hidden
        className="absolute -top-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-clay-soft blur-3xl opacity-70"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-honey/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-[1.1fr_1fr] md:px-10">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-clay/20 bg-warm px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-clay">
            <Sparkles className="h-3.5 w-3.5" />
            {t.badge}
          </span>
          <h1 className="mt-6 font-display text-5xl font-black leading-[1.02] tracking-[-0.025em] text-balance md:text-7xl">
            {t.titleBefore}
            <span className="italic text-clay">{t.titleEmphasis}</span>
            {t.titleAfter}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground text-pretty">{t.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={getHomeSectionHref(locale, "workshops")}
              className="group inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elev hover:-translate-y-0.5"
            >
              {t.primaryCta}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href={getHomeSectionHref(locale, "about")}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-warm px-7 py-3.5 text-sm font-semibold text-foreground transition hover:border-clay hover:text-clay"
            >
              {t.secondaryCta}
            </a>
          </div>
        </div>

        <div className="relative h-[28rem] md:h-[34rem]">
          <div className="absolute inset-0 rounded-[2.5rem] gradient-warm shadow-elev" />
          <div className="absolute inset-6 flex flex-col justify-center gap-4">
            {t.cards.map(([title, desc], i) => (
              <FloatCard
                key={title}
                icon={icons[i]}
                title={title}
                desc={desc}
                tone={tones[i]}
                className={classes[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Marquee({ locale = "pl" }: { locale?: Locale }) {
  const items = publicContent[locale].hero.marquee;
  return (
    <div className="marquee-track border-y border-border bg-warm py-5 overflow-hidden">
      <div className="flex w-max animate-marquee gap-12 pr-12 text-sm font-semibold uppercase tracking-[0.15em] text-ink-soft/85">
        {[...items, ...items].map((text, i) => (
          <span key={`${text}-${i}`} className="flex items-center gap-12">
            <span>{text}</span>
            <span className="text-clay">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
