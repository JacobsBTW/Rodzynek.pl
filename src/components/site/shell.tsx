import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const NAV_LINKS = [
  { href: "/#o-nas", label: "O nas" },
  { href: "/#warsztaty", label: "Warsztaty" },
  { href: "/#projekt", label: "Projekt" },
  { href: "/#zespol", label: "Zespół" },
] as const;

function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "backdrop-blur-xl bg-warm/85 border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10">
        <Link to="/" aria-label="Rodzynek.pl — strona główna" className="flex items-center gap-2">
          <img src="/logo-icon.png" alt="Rodzynek.pl" className="h-10 w-auto" />
        </Link>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-ink-soft transition hover:text-clay"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            to="/kontakt"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
          >
            Zaproś nas <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-warm text-ink md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-warm/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-ink-soft transition hover:bg-clay-soft/60 hover:text-clay"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <Link
                to="/kontakt"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Zaproś nas <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-warm/65">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-10 text-center md:flex-row md:px-10 md:text-left">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo-full.png" alt="Rodzynek.pl" className="h-12 w-auto rounded-lg" />
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition hover:text-warm">{l.label}</a>
            </li>
          ))}
          <li><Link to="/kontakt" className="transition hover:text-warm">Kontakt</Link></li>
        </ul>
        <span className="text-xs text-warm/45">© 2025 Rodzynek.pl · CLARA / Yourope · UŁ</span>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Przejdź do treści
      </a>
      <Nav scrolled={scrolled} />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionLabel({ children, center, className = "" }: { children: React.ReactNode; center?: boolean; className?: string }) {
  return (
    <p className={`text-xs font-bold uppercase tracking-[0.16em] text-clay ${center ? "text-center" : ""} ${className}`}>
      {children}
    </p>
  );
}

export function SectionTitle({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h1 className={`mt-3 font-display text-4xl font-black leading-[1.05] tracking-[-0.025em] text-balance md:text-5xl ${center ? "text-center" : ""}`}>
      {children}
    </h1>
  );
}