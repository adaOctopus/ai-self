"use client";

import { useState } from "react";
import {
  Brain,
  CalendarRange,
  Eye,
  Settings,
  Sparkles,
  Zap,
} from "lucide-react";
import { PathCard } from "@/components/PathCard";
import type { ThemeId } from "@/lib/theme";
import { cn } from "@/lib/utils";

type Props = {
  theme: ThemeId;
  onThemeChange: (t: ThemeId) => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  onOpenSession: (n: 1 | 2 | 3) => void;
  showResumeBanner: boolean;
  onResumeSession: () => void;
  onDismissResume: () => void;
  colorful: boolean;
};

export function HomeScreen({
  theme,
  onThemeChange,
  apiKey,
  onSaveApiKey,
  onOpenSession,
  showResumeBanner,
  onResumeSession,
  onDismissResume,
  colorful,
}: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftKey, setDraftKey] = useState(apiKey);

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-[var(--cadmus-bg)] px-4 pb-28 pt-8 sm:px-6 sm:pb-24">
      {colorful && (
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, #2288ff 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 100% 50%, #ff88aa33 0%, transparent 45%)",
          }}
        />
      )}

      <header className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] text-[var(--cadmus-gold)]"
                aria-hidden
              >
                <Eye className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h1 className="text-lg font-semibold tracking-[0.14em] text-[var(--cadmus-text)] sm:text-xl">
                THE CADMUS COMPANION
              </h1>
            </div>
            <p className="mt-2 max-w-md text-sm italic text-[var(--cadmus-muted)]">
              Avoid conformity to keep your soul.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-0 sm:justify-end">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
              Theme
            </span>
            {(["minimal", "colorful"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onThemeChange(t)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition",
                  theme === t
                    ? colorful
                      ? "bg-emerald-600 text-white"
                      : "bg-[var(--cadmus-gold)] text-[#080808]"
                    : "border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] text-[var(--cadmus-muted)] hover:text-[var(--cadmus-text)]",
                )}
              >
                {t === "minimal" ? "Dark" : "Light"}
              </button>
            ))}
          </div>
        </div>

        <h2 className="mt-12 text-center text-3xl font-semibold tracking-tight text-[var(--cadmus-text)] sm:text-4xl">
          Choose your path.
        </h2>
      </header>

      {showResumeBanner && (
        <div className="mx-auto mt-8 flex w-full max-w-5xl flex-col gap-3 rounded-lg border border-[var(--cadmus-gold)]/40 bg-[var(--cadmus-surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--cadmus-text)]">
            You have an in-progress Cadmus Session. Continue where you left off?
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onDismissResume}
              className="rounded-lg border border-[var(--cadmus-border)] px-3 py-2 text-sm text-[var(--cadmus-muted)] hover:text-[var(--cadmus-text)]"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={onResumeSession}
              className="rounded-lg bg-[var(--cadmus-gold)] px-4 py-2 text-sm font-semibold text-[#080808]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <main className="mx-auto mt-10 grid w-full max-w-5xl flex-1 grid-cols-1 gap-6 md:grid-cols-3">
        <PathCard
          colorful={colorful}
          icon={<Zap className="h-6 w-6" />}
          chip="INSTANT · SELF-WORK"
          title="The Cadmus Session"
          description="Three structured phases surface what’s really going on. You leave with one clear action — deep work without the performance."
          cta="Begin Session →"
          onSelect={() => onOpenSession(1)}
        />
        <PathCard
          colorful={colorful}
          icon={<Brain className="h-6 w-6" />}
          chip="INSTANT · INNER MAP"
          title="Map Your Inner Voices"
          description="Twelve questions show which inner voice has been steering your choices — so you can choose differently on purpose."
          cta="Discover Your Inner Voices →"
          onSelect={() => onOpenSession(2)}
        />
        <PathCard
          colorful={colorful}
          icon={<CalendarRange className="h-6 w-6" />}
          chip="INSTANT · 7-STEP TRACK"
          title="7-Day Conformity Detox"
          description="A step-by-step track that uses everything in your bundle. By Day 7 you’ll have drafted your personal code and made one real decision from it."
          cta="Start Your Plan →"
          onSelect={() => onOpenSession(3)}
        />
      </main>

      <button
        type="button"
        onClick={() => {
          setSettingsOpen((o) => !o);
          setDraftKey(apiKey);
        }}
        className="no-print fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] text-[var(--cadmus-gold)] shadow-lg transition hover:bg-[var(--cadmus-surface-raised)]"
        aria-expanded={settingsOpen}
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </button>

      <footer className="mx-auto mt-12 max-w-5xl pb-8 text-center text-xs text-[var(--cadmus-text)]">
        Powered by the book{" "}
        <a
          href="https://codeofcadmus.com"
          className={cn(
            "font-semibold underline",
            colorful ? "text-emerald-800" : "text-[var(--cadmus-gold)]",
          )}
          target="_blank"
          rel="noreferrer"
        >
          THE CODE OF CADMUS
        </a>
      </footer>

      {settingsOpen && (
        <div className="no-print fixed inset-x-4 bottom-24 z-50 mx-auto max-w-md rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] p-4 shadow-2xl sm:left-auto sm:right-6 sm:mx-0">
          <div className="flex items-start gap-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cadmus-gold)]" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
                OpenAI (optional)
              </p>
              <p className="mt-1 text-sm text-[var(--cadmus-text)]">
                Enter your API key — stored in this browser only. It is sent only
                to this app&apos;s server route, which calls OpenAI (same as
                ChatGPT). We don&apos;t store your key on our side.
              </p>
            </div>
          </div>
          <label className="mt-3 block text-xs text-[var(--cadmus-muted)]">
            API key
            <input
              type="password"
              autoComplete="off"
              value={draftKey}
              onChange={(e) => setDraftKey(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[var(--cadmus-border)] bg-[var(--cadmus-surface-raised)] px-3 py-2 text-sm text-[var(--cadmus-text)]"
              placeholder="sk-..."
            />
          </label>
          <p className="mt-2 text-xs text-[var(--cadmus-muted)]">
            Get a key at{" "}
            <a
              href="https://platform.openai.com"
              className="text-[var(--cadmus-gold)] underline"
              target="_blank"
              rel="noreferrer"
            >
              platform.openai.com
            </a>
            . If you skip this: the Cadmus Session still runs using{" "}
            <strong className="text-[var(--cadmus-text)]">
              offline acknowledgments
            </strong>{" "}
            (mirrors your words) and a{" "}
            <strong className="text-[var(--cadmus-text)]">
              template plan
            </strong>{" "}
            from your answers — no PDFs are uploaded; the host can also set{" "}
            <code className="text-[10px]">OPENAI_API_KEY</code> so you don&apos;t
            have to paste a key.
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-[var(--cadmus-muted)] hover:text-[var(--cadmus-text)]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onSaveApiKey(draftKey.trim());
                setSettingsOpen(false);
              }}
              className="rounded-lg bg-[var(--cadmus-gold)] px-4 py-2 text-sm font-semibold text-[#080808]"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
