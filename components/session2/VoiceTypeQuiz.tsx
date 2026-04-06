"use client";

import { useCallback, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { QuestionCard } from "@/components/session2/QuestionCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  QUIZ_QUESTIONS,
  emptyScores,
  tallyScores,
  dominantAndSecondary,
} from "@/lib/quizQuestions";
import type { VoiceTypeId } from "@/lib/voiceTypes";

type Props = {
  colorful: boolean;
  onBack: () => void;
  onComplete: (dominant: VoiceTypeId, secondary: VoiceTypeId) => void;
};

export function VoiceTypeQuiz({ colorful, onBack, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState(emptyScores());

  const q = QUIZ_QUESTIONS[index];

  const handlePick = useCallback(
    (optionIndex: number) => {
      const opt = q.options[optionIndex];
      const nextScores = tallyScores(scores, opt);
      if (index >= QUIZ_QUESTIONS.length - 1) {
        const { dominant, secondary } = dominantAndSecondary(nextScores);
        onComplete(dominant, secondary);
        return;
      }
      setScores(nextScores);
      setIndex((i) => i + 1);
    },
    [index, onComplete, q.options, scores],
  );

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--cadmus-bg)] px-4 pb-10 pt-6 sm:px-6">
      <header className="mx-auto flex w-full max-w-xl items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg p-2 text-[var(--cadmus-muted)] hover:bg-[var(--cadmus-surface)]"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1 space-y-2">
          <ProgressBar
            value={index + 1}
            max={12}
            colorful={colorful}
          />
        </div>
      </header>

      <main className="mx-auto mt-8 w-full max-w-xl flex-1">
        <QuestionCard
          key={q.id}
          question={q}
          onPick={handlePick}
          colorful={colorful}
        />
      </main>
    </div>
  );
}
