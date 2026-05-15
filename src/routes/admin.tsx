import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, Lock, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Submission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organization: string;
  topic: string;
  message: string | null;
  status: string;
};

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel administracyjny | Rodzynek.pl" },
      { name: "robots", content: "noindex,nofollow" },
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
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [query, setQuery] = useState("");

  const filteredSubmissions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return submissions;

    return submissions.filter((submission) =>
      [
        submission.name,
        submission.email,
        submission.organization,
        submission.topic,
        submission.message ?? "",
        submission.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query, submissions]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/submissions", { credentials: "same-origin" });
      if (response.status === 401) {
        setAuthenticated(false);
        setSubmissions([]);
        return;
      }
      if (!response.ok) throw new Error(`Pobieranie zgłoszeń nie powiodło się: ${response.status}`);

      const payload = (await response.json()) as { submissions?: Submission[] };
      setSubmissions(payload.submissions ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Nie udało się pobrać zgłoszeń");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", { credentials: "same-origin" });
        const payload = (await response.json()) as { authenticated?: boolean };
        if (cancelled) return;
        setAuthenticated(Boolean(payload.authenticated));
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setCheckingSession(false);
      }
    }

    void checkSession();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (authenticated) void loadSubmissions();
  }, [authenticated]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoggingIn(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.status === 401) {
        toast.error("Niepoprawne hasło");
        return;
      }
      if (response.status === 500) {
        toast.error("Panel admina nie ma ustawionych sekretów");
        return;
      }
      if (!response.ok) throw new Error(`Logowanie nie powiodło się: ${response.status}`);

      setPassword("");
      setAuthenticated(true);
      toast.success("Zalogowano");
    } catch (error) {
      console.error(error);
      toast.error("Nie udało się zalogować");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
      setAuthenticated(false);
      setSubmissions([]);
      setQuery("");
      toast.success("Wylogowano");
    } catch (error) {
      console.error(error);
      toast.error("Nie udało się wylogować");
    } finally {
      setLoggingOut(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-warm px-6 text-ink">
        <RefreshCw className="h-5 w-5 animate-spin text-clay" />
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-warm px-6 py-12 text-ink">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-border bg-card p-7 shadow-soft"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay text-primary-foreground">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-black">Panel admina</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Wpisz hasło administratora, żeby zobaczyć zgłoszenia z formularza.
          </p>
          <label className="mt-6 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Hasło
          </label>
          <div className="mt-2 flex gap-2">
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="h-11 bg-warm"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-11 w-11"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button type="submit" disabled={loggingIn} className="mt-5 h-11 w-full bg-clay">
            {loggingIn ? "Logowanie..." : "Zaloguj"}
          </Button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-warm px-4 py-6 text-ink md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-clay">Rodzynek.pl</p>
            <h1 className="mt-2 font-display text-3xl font-black">Zgłoszenia z formularza</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Jesteś zalogowany jako administrator. Widzisz ostatnie {submissions.length} wpisów z
              formularza kontaktowego.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={loadSubmissions}
              disabled={loading}
              className="bg-card"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Odśwież
            </Button>
            <Button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="bg-clay text-primary-foreground hover:bg-clay/90"
            >
              <LogOut className="h-4 w-4" />
              {loggingOut ? "Wylogowywanie..." : "Wyloguj"}
            </Button>
          </div>
        </header>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Szukaj po nazwie, e-mailu, organizacji lub treści..."
            className="h-11 max-w-xl bg-card"
          />
          <div className="text-sm text-muted-foreground">
            Wyniki: {filteredSubmissions.length} / {submissions.length}
          </div>
        </div>

        <section className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead className="bg-clay-soft/50 text-xs uppercase tracking-wide text-ink-soft">
                <tr>
                  <th className="px-4 py-3 font-semibold">Data</th>
                  <th className="px-4 py-3 font-semibold">Osoba</th>
                  <th className="px-4 py-3 font-semibold">Organizacja</th>
                  <th className="px-4 py-3 font-semibold">Temat</th>
                  <th className="px-4 py-3 font-semibold">Wiadomość</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-t border-border align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                      {formatDate(submission.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{submission.name}</div>
                      <a
                        href={`mailto:${submission.email}`}
                        className="text-sm text-clay underline-offset-4 hover:underline"
                      >
                        {submission.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{submission.organization}</td>
                    <td className="px-4 py-3">{submission.topic}</td>
                    <td className="max-w-md px-4 py-3 text-muted-foreground">
                      {submission.message || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-clay-soft px-2.5 py-1 text-xs font-semibold text-clay">
                        {submission.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                      Ładowanie zgłoszeń...
                    </td>
                  </tr>
                )}
                {!loading && filteredSubmissions.length === 0 && (
                  <tr>
                    <td className="px-4 py-10 text-center text-muted-foreground" colSpan={6}>
                      Brak zgłoszeń do wyświetlenia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
