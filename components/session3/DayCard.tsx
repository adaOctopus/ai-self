"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import type { DetoxDay } from "@/lib/detoxDays";
import { cn } from "@/lib/utils";

type Props = {
  day: DetoxDay;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function DayCard({ day, open, onOpenChange }: Props) {
  return (
    <Collapsible.Root open={open} onOpenChange={onOpenChange}>
      <div
        className={cn(
          "rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] transition",
          open && "ring-1 ring-[var(--cadmus-gold)]/30",
        )}
      >
        <Collapsible.Trigger asChild>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
                Day {day.day}
              </p>
              <p className="text-lg font-semibold tracking-tight text-[var(--cadmus-text)]">
                {day.title}
              </p>
            </div>
            <ChevronDown
              className={cn(
                "h-5 w-5 shrink-0 text-[var(--cadmus-gold)] transition",
                open && "rotate-180",
              )}
            />
          </button>
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-hidden data-[state=closed]:hidden">
          <div className="space-y-4 border-t border-[var(--cadmus-border)] px-4 pb-5 pt-2 text-sm leading-relaxed text-[var(--cadmus-text)]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
                Task
              </p>
              <p className="mt-1">{day.task}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
                Time
              </p>
              <p className="mt-1">{day.time}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
                Why
              </p>
              <p className="mt-1 whitespace-pre-wrap text-[var(--cadmus-muted)]">
                {day.why}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
                Write down
              </p>
              <p className="mt-1">{day.writeDown}</p>
            </div>
          </div>
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  );
}
