"use client";

import { PHASE_LABELS, questionIndexToPhase, type PhaseId } from "@/lib/sessionQuestions";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";

type Props = {
  /** 0-based index of the question the user is answering (0–12), or 13 when done */
  questionIndex: number;
  colorful?: boolean;
};

export function PhaseIndicator({ questionIndex, colorful }: Props) {
  const phase: PhaseId =
    questionIndex >= 13 ? 3 : questionIndexToPhase(questionIndex);
  const phaseProgress = phase === 1 ? 33 : phase === 2 ? 66 : 100;
  const label = PHASE_LABELS[phase].label;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
        <span className={cn("truncate", colorful && "text-[var(--cadmus-text)]")}>
          {label}
        </span>
      </div>
      <ProgressBar value={phaseProgress} colorful={colorful} />
    </div>
  );
}
