"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DayCard } from "@/components/session3/DayCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getDetoxDays } from "@/lib/detoxDays";
import type { VoiceTypeId } from "@/lib/voiceTypes";

type Props = {
  voiceType: VoiceTypeId | null;
  colorful: boolean;
  onBack: () => void;
  onGoQuiz: () => void;
  onGoSession: () => void;
};

export function DetoxPlan({
  voiceType,
  colorful,
  onBack,
  onGoQuiz,
  onGoSession,
}: Props) {
  const days = getDetoxDays(voiceType);
  const [openDay, setOpenDay] = useState<number | null>(1);
  const [trackerDay, setTrackerDay] = useState(1);

  return (
    <div className="min-h-[100dvh] bg-[var(--cadmus-bg)] px-4 pb-16 pt-6 sm:px-6">
      <header className="mx-auto flex max-w-3xl items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg p-2 text-[var(--cadmus-muted)] hover:bg-[var(--cadmus-surface)]"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--cadmus-text)]">
            7-Day Conformity Detox
          </h1>
          <p className="mt-1 text-sm text-[var(--cadmus-muted)]">
            One day at a time — use everything in your bundle.
          </p>
        </div>
      </header>

      <div className="mx-auto mt-8 max-w-3xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
          <span>
            Day {trackerDay} of 7
          </span>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setTrackerDay(d);
                  setOpenDay(d);
                }}
                className={`h-7 min-w-[1.75rem] rounded-md px-1 text-[10px] font-semibold ${
                  trackerDay === d
                    ? "bg-[var(--cadmus-gold)] text-[#080808]"
                    : "border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] text-[var(--cadmus-muted)]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <ProgressBar value={trackerDay} max={7} colorful={colorful} />
      </div>

      {!voiceType && (
        <div className="mx-auto mt-6 max-w-3xl rounded-lg border border-[var(--cadmus-gold)]/40 bg-[var(--cadmus-surface)] p-4 text-sm text-[var(--cadmus-text)]">
          <p>
            Complete <strong>Map Your Inner Voices</strong> first so Day 2 can
            point to the right chapters.
          </p>
          <button
            type="button"
            onClick={onGoQuiz}
            className="mt-3 rounded-lg bg-[var(--cadmus-gold)] px-4 py-2 text-xs font-semibold text-[#080808]"
          >
            Open assessment
          </button>
        </div>
      )}

      <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1 space-y-3">
          {days.map((d) => (
            <DayCard
              key={d.day}
              day={d}
              open={openDay === d.day}
              onOpenChange={(o) => setOpenDay(o ? d.day : null)}
            />
          ))}
        </div>
        <aside className="no-print w-full shrink-0 rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] p-4 text-sm text-[var(--cadmus-muted)] lg:sticky lg:top-24 lg:max-w-xs">
          <p className="font-semibold text-[var(--cadmus-text)]">Shortcuts</p>
          <button
            type="button"
            onClick={onGoQuiz}
            className="mt-3 block w-full rounded-lg border border-[var(--cadmus-border)] py-2 text-left text-xs text-[var(--cadmus-text)] hover:bg-[var(--cadmus-surface-raised)]"
          >
            Inner voices map
          </button>
          <button
            type="button"
            onClick={onGoSession}
            className="mt-2 block w-full rounded-lg border border-[var(--cadmus-border)] py-2 text-left text-xs text-[var(--cadmus-text)] hover:bg-[var(--cadmus-surface-raised)]"
          >
            Cadmus Session
          </button>
        </aside>
      </div>
    </div>
  );
}
