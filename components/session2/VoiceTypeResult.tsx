"use client";

import type { VoiceTypeId } from "@/lib/voiceTypes";
import { VOICE_TYPES } from "@/lib/voiceTypes";
import { cn } from "@/lib/utils";

type Props = {
  dominant: VoiceTypeId;
  secondary: VoiceTypeId;
  colorful: boolean;
  onBeginCadmusSession: () => void;
  onViewResults: () => void;
};

export function VoiceTypeResult({
  dominant,
  secondary,
  colorful,
  onBeginCadmusSession,
  onViewResults,
}: Props) {
  const d = VOICE_TYPES[dominant];
  const s = VOICE_TYPES[secondary];

  return (
    <div className="animate-fade-in mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
        Your result
      </p>
      <h2 className="mt-2 text-center text-3xl font-semibold tracking-tight text-[var(--cadmus-text)] sm:text-4xl">
        You are{" "}
        <span className="relative inline-block">
          <span className="relative z-10">{d.name}</span>
          <span
            className={cn(
              "absolute -bottom-1 left-0 right-0 h-2 opacity-60",
              colorful
                ? "bg-emerald-600"
                : "bg-[var(--cadmus-gold)]",
            )}
            aria-hidden
          />
        </span>
      </h2>
      <p className="mt-4 text-center text-sm text-[var(--cadmus-muted)]">
        with elements of <strong className="text-[var(--cadmus-text)]">{s.name}</strong>
      </p>
      <p className="mt-6 text-center text-lg font-medium text-[var(--cadmus-gold)]">
        {d.tagline}
      </p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--cadmus-text)]">
        <p>{d.description}</p>
      </div>

      <section className="mt-10 rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] p-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
          What this costs you
        </h3>
        <p className="mt-2 text-sm text-[var(--cadmus-text)]">{d.cost}</p>
      </section>

      <section className="mt-4 rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] p-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
          Your hidden gift
        </h3>
        <p className="mt-2 text-sm text-[var(--cadmus-text)]">{d.gift}</p>
      </section>

      <section className="mt-4 rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] p-5">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
          Where to start
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cadmus-text)]">
          <li>
            <span className="text-[var(--cadmus-muted)]">Chapter: </span>
            {d.chapter}
          </li>
          <li>
            <span className="text-[var(--cadmus-muted)]">Poster lines: </span>
            {d.posters.join(" · ")}
          </li>
          <li>
            <span className="text-[var(--cadmus-muted)]">Experiment: </span>
            {d.experiment}
          </li>
        </ul>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onBeginCadmusSession}
          className={cn(
            "flex-1 rounded-xl py-3 text-center text-sm font-semibold",
            colorful
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-[var(--cadmus-gold)] text-[#080808]",
          )}
        >
          Begin your Cadmus Session
        </button>
        <button
          type="button"
          onClick={onViewResults}
          className="flex-1 rounded-xl border border-[var(--cadmus-border)] py-3 text-center text-sm font-semibold text-[var(--cadmus-text)] hover:bg-[var(--cadmus-surface)]"
        >
          Summary & export
        </button>
      </div>
    </div>
  );
}
