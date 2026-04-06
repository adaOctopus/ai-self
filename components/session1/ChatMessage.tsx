"use client";

import { cn } from "@/lib/utils";

export type ChatRole = "user" | "assistant";

type Props = {
  role: ChatRole;
  children: React.ReactNode;
  className?: string;
};

export function ChatMessage({ role, children, className }: Props) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "animate-slide-up max-w-[min(100%,42rem)] rounded-2xl px-4 py-3 text-sm leading-relaxed",
        isUser
          ? "ml-auto bg-[var(--cadmus-gold)] text-[#080808]"
          : "mr-auto border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] text-[var(--cadmus-text)]",
        className,
      )}
    >
      <div className="whitespace-pre-wrap">{children}</div>
    </div>
  );
}
