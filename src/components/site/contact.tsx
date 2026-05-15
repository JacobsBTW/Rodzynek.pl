import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Mail, MapPin, GraduationCap, ArrowRight, Check, Loader2 } from "lucide-react";
import { contactSubmissionSchema, submitContactSubmission } from "@/lib/contact-submission";
import { SectionLabel } from "./shell";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-xl border bg-warm px-4 py-3 text-sm outline-none transition focus:bg-card focus-visible:ring-2 focus-visible:ring-ring/40 ${error ? "border-destructive focus:border-destructive" : "border-border focus:border-clay"}`}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const submitContact = useServerFn(submitContactSubmission);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setErrors({});

    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      org: String(fd.get("org") ?? ""),
      topic: String(fd.get("topic") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };

    const parsed = contactSubmissionSchema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0];
        if (typeof k === "string" && !fieldErrs[k]) fieldErrs[k] = issue.message;
      }
      setErrors(fieldErrs);
      toast.error("Sprawdź formularz", { description: "Niektóre pola wymagają poprawy." });
      return;
    }

    if (parsed.data.website) {
      setStatus("sent");
      formRef.current?.reset();
      return;
    }

    setStatus("sending");
    try {
      await submitContact({ data: parsed.data });
    } catch (error) {
      console.error("contact submit error", error);
      setStatus("idle");
      toast.error("Nie udało się wysłać", {
        description: "Spróbuj ponownie za chwilę albo napisz na rodzynekpl.kontakt@gmail.com.",
      });
      return;
    }

    setStatus("sent");
    formRef.current?.reset();
    toast.success("Wysłano!", { description: "Odezwiemy się w ciągu ~24 godzin." });
    setTimeout(() => setStatus("idle"), 6000);
  };

  const sending = status === "sending";
  const sent = status === "sent";

  return (
    <section className="relative overflow-hidden bg-clay pt-32 pb-24 text-warm md:pt-40 md:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 right-[-2rem] select-none font-display text-[14rem] font-black leading-none tracking-tighter text-warm/[0.06] md:text-[18rem]"
      >
        Rodzynek
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-[1.1fr_1fr] md:px-10">
        <div>
          <SectionLabel className="text-warm/70">Kontakt</SectionLabel>
          <h1 className="mt-3 font-display text-4xl font-black leading-[1.05] tracking-tight text-balance md:text-5xl">
            Chcesz mieć nas u siebie?
          </h1>
          <p className="mt-5 max-w-lg text-warm/80 text-pretty">
            Jesteś nauczycielem, pedagogiem, animatorem lub działasz w NGO? Napisz do nas — ustalimy
            szczegóły i przyjedziemy z warsztatem.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              {
                icon: <Mail className="h-5 w-5" />,
                label: "E-mail",
                value: "rodzynekpl.kontakt@gmail.com",
                href: "mailto:rodzynekpl.kontakt@gmail.com",
              },
              {
                icon: <MapPin className="h-5 w-5" />,
                label: "Baza działań",
                value: "Łódź & okolice (i nie tylko)",
              },
              {
                icon: <GraduationCap className="h-5 w-5" />,
                label: "Uczelnia",
                value: "Uniwersytet Łódzki · CLARA / Yourope",
              },
            ].map((c) => (
              <li key={c.label} className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-warm/15">
                  {c.icon}
                </div>
                <div>
                  <div className="text-xs text-warm/65">{c.label}</div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-base font-semibold underline-offset-4 hover:underline"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-base font-semibold">{c.value}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <form
          ref={formRef}
          onSubmit={onSubmit}
          aria-label="Formularz kontaktowy Rodzynek.pl"
          noValidate
          className="rounded-3xl bg-card p-7 text-foreground shadow-elev md:p-9"
        >
          <h2 className="font-display text-xl font-bold">Zaproś Rodzynek 🍇</h2>
          <p className="mt-1 text-sm text-muted-foreground">Odpowiadamy w ciągu ~24 godzin.</p>
          <fieldset disabled={sending || sent} className="mt-6 grid gap-4 disabled:opacity-70">
            <Field
              label="Imię i nazwisko"
              name="name"
              placeholder="np. Anna Kowalska"
              required
              error={errors.name}
            />
            <Field
              label="E-mail"
              name="email"
              type="email"
              placeholder="anna@szkola.edu.pl"
              required
              error={errors.email}
            />
            <Field
              label="Instytucja / Organizacja"
              name="org"
              placeholder="np. SP nr 5 w Łodzi"
              required
              error={errors.org}
            />
            <div>
              <label
                htmlFor="topic"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft"
              >
                Interesuje mnie
              </label>
              <select
                id="topic"
                name="topic"
                defaultValue="Warsztat dla uczniów (szkoła ponadpodstawowa)"
                className="w-full rounded-xl border border-border bg-warm px-4 py-3 text-sm outline-none transition focus:border-clay focus:bg-card focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <option>Warsztat dla uczniów (szkoła ponadpodstawowa)</option>
                <option>Warsztat dla uczniów (szkoła podstawowa kl. 7–8)</option>
                <option>Szkolenie dla nauczycieli / pedagogów</option>
                <option>Inne — opisz poniżej</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-soft"
              >
                Wiadomość (opcjonalnie)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full resize-none rounded-xl border border-border bg-warm px-4 py-3 text-sm outline-none transition focus:border-clay focus:bg-card focus-visible:ring-2 focus-visible:ring-ring/40"
                placeholder="Powiedz nam coś więcej…"
              />
              {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
            </div>
            <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
              <label htmlFor="website">Strona www</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <button
              type="submit"
              disabled={sending || sent}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-clay px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-100"
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" /> Wysłano!
                </>
              ) : sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Wysyłam…
                </>
              ) : (
                <>
                  Wyślij zgłoszenie <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Wysyłając formularz wyrażasz zgodę na przetwarzanie podanych danych (imię, e-mail,
              instytucja) wyłącznie w celu odpowiedzi na zgłoszenie. Dane nie są udostępniane
              stronom trzecim.
            </p>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
