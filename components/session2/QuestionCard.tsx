"use client";

import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/quizQuestions";

type Props = {
  question: QuizQuestion;
  onPick: (optionIndex: number) => void;
  colorful?: boolean;
};

export function QuestionCard({ question, onPick, colorful }: Props) {
  return (
    <div className="animate-slide-up space-y-4">
      <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
        Question {question.id} of 12
      </p>
      <h2 className="text-xl font-semibold leading-snug tracking-tight text-[var(--cadmus-text)] sm:text-2xl">
        {question.prompt}
      </h2>
      <ul className="mt-4 flex flex-col gap-3">
        {question.options.map((opt, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onPick(i)}
              className={cn(
                "w-full rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] px-4 py-4 text-left text-sm leading-relaxed text-[var(--cadmus-text)] transition hover:border-[var(--cadmus-gold)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cadmus-gold)] active:scale-[0.99]",
                colorful && "hover:border-[#2288ff]",
              )}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
