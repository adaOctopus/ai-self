"use client";

import { cn } from "@/lib/utils";

type Props = {
  value: number;
  max?: number;
  className?: string;
  colorful?: boolean;
};

export function ProgressBar({
  value,
  max = 100,
  className,
  colorful = false,
}: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-[var(--cadmus-surface-raised)] border border-[var(--cadmus-border)]",
        className,
      )}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-out",
          colorful ? "bg-emerald-600" : "bg-[var(--cadmus-gold)]",
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
