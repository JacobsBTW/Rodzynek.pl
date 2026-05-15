import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Inbox, Loader2, LogOut, Mail, RotateCcw } from "lucide-react";
import {
  getAdminDashboardState,
  loginAdmin,
  logoutAdmin,
  updateContactSubmissionStatus,
  type AdminContactSubmission,
} from "@/lib/admin-submissions";

export const Route = createFileRoute("/admin")({
  loader: () => getAdminDashboardState(),
  head: () => ({
    meta: [
      { title: "Panel zgłoszeń — Rodzynek.pl" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function AdminPage() {
  const initialState = Route.useLoaderData();
  const [dashboardState, setDashboardState] = useState(initialState);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const login = useServerFn(loginAdmin);
  const logout = useServerFn(logoutAdmin);
  const refresh = useServerFn(getAdminDashboardState);

  async function reloadState() {
    setDashboardState(await refresh());
  }

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const result = await login({ data: { password } });
      if (!result.ok) {
        setError(
          result.configured ? "Niepoprawne hasło." : "Brakuje sekretu ADMIN_DASHBOARD_PASSWORD.",
        );
        return;
      }

      setPassword("");
      await reloadState();
    } catch (err) {
      console.error("admin login error", err);
      setError("Nie udało się zalogować. Spróbuj ponownie.");
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    setBusy(true);
    await logout();
    setDashboardState(await refresh());
    setBusy(false);
  }

  if (!dashboardState.configured) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Panel nie jest jeszcze skonfigurowany
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Dodaj w Cloudflare sekret <code>ADMIN_DASHBOARD_PASSWORD</code>, a potem odśwież tę
            stronę.
          </p>
        </div>
      </AdminShell>
    );
  }

  if (!dashboardState.authenticated) {
    return (
      <AdminShell>
        <form
          onSubmit={onLogin}
          className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-clay text-primary-foreground">
            <Inbox className="h-5 w-5" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold text-foreground">Panel zgłoszeń</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Wpisz hasło administracyjne, żeby zobaczyć formularze.
          </p>
          <label
            htmlFor="admin-password"
            className="mt-6 block text-xs font-semibold uppercase tracking-wide text-ink-soft"
          >
            Hasło
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-warm px-4 py-3 text-sm outline-none transition focus:border-clay focus:bg-card focus-visible:ring-2 focus-visible:ring-ring/40"
            autoComplete="current-password"
            required
          />
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-clay px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-70"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Zaloguj
          </button>
        </form>
      </AdminShell>
    );
  }

  if (!dashboardState.databaseConfigured) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 shadow-soft">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Baza danych nie jest jeszcze podłączona
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Dodaj w Cloudflare sekrety <code>SUPABASE_URL</code> oraz{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code>, a potem odśwież tę stronę.
          </p>
          <button
            type="button"
            onClick={onLogout}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-warm px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-card"
          >
            <LogOut className="h-4 w-4" />
            Wyloguj
          </button>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-clay">Rodzynek.pl</p>
            <h1 className="mt-2 font-display text-3xl font-black text-foreground">
              Zgłoszenia z formularza
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Ostatnie {dashboardState.submissions.length} zgłoszeń zapisanych w Supabase.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reloadState}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-warm"
            >
              <RotateCcw className="h-4 w-4" />
              Odśwież
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-clay px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <LogOut className="h-4 w-4" />
              Wyloguj
            </button>
          </div>
        </div>

        <SubmissionsList submissions={dashboardState.submissions} onChanged={reloadState} />
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-warm px-6 py-10 text-foreground md:px-10">{children}</main>
  );
}

function SubmissionsList({
  submissions,
  onChanged,
}: {
  submissions: AdminContactSubmission[];
  onChanged: () => Promise<void>;
}) {
  if (!submissions.length) {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-border bg-card p-8 text-center">
        <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-3 font-semibold text-foreground">Brak zgłoszeń</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Nowe wiadomości z formularza pojawią się tutaj.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-4">
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} onChanged={onChanged} />
      ))}
    </div>
  );
}

function SubmissionCard({
  submission,
  onChanged,
}: {
  submission: AdminContactSubmission;
  onChanged: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const updateStatus = useServerFn(updateContactSubmissionStatus);
  const isRead = submission.status === "read";

  async function setStatus(status: "new" | "read") {
    setBusy(true);
    await updateStatus({ data: { id: submission.id, status } });
    await onChanged();
    setBusy(false);
  }

  return (
    <article className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-xl font-bold text-foreground">{submission.name}</h2>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                isRead ? "bg-muted text-muted-foreground" : "bg-honey text-ink"
              }`}
            >
              {isRead ? "Przeczytane" : "Nowe"}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{formatDate(submission.created_at)}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus(isRead ? "new" : "read")}
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-warm px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-card disabled:opacity-70"
        >
          {isRead ? <RotateCcw className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          {isRead ? "Oznacz jako nowe" : "Oznacz jako przeczytane"}
        </button>
      </div>

      <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">E-mail</dt>
          <dd className="mt-1">
            <a
              className="inline-flex items-center gap-2 font-semibold text-clay hover:underline"
              href={`mailto:${submission.email}`}
            >
              <Mail className="h-4 w-4" />
              {submission.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Instytucja
          </dt>
          <dd className="mt-1 font-medium text-foreground">{submission.organization}</dd>
        </div>
        <div className="md:col-span-2">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Temat</dt>
          <dd className="mt-1 font-medium text-foreground">{submission.topic}</dd>
        </div>
      </dl>

      {submission.message ? (
        <div className="mt-5 rounded-xl bg-warm p-4 text-sm leading-relaxed text-foreground">
          {submission.message}
        </div>
      ) : null}
    </article>
  );
}
