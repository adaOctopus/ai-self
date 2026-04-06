"use client";

import { useCallback, useRef } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  colorful?: boolean;
};

export function TextInput({
  value,
  onChange,
  onSend,
  disabled,
  placeholder = "Write your answer…",
  colorful,
}: Props) {
  const ta = useRef<HTMLTextAreaElement>(null);

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        if (!disabled && value.trim()) onSend();
      }
    },
    [disabled, onSend, value],
  );

  return (
    <div
      className={cn(
        "no-print border-t border-[var(--cadmus-border)] bg-[var(--cadmus-bg)]/95 p-3 backdrop-blur supports-[backdrop-filter]:bg-[var(--cadmus-bg)]/80",
        "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
      )}
    >
      <div className="mx-auto flex max-w-3xl gap-2">
        <textarea
          ref={ta}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "min-h-[5rem] flex-1 resize-y rounded-xl border border-[var(--cadmus-border)] bg-[var(--cadmus-surface)] px-3 py-2 text-sm text-[var(--cadmus-text)] placeholder:text-[var(--cadmus-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--cadmus-gold)]",
          )}
        />
        <button
          type="button"
          disabled={disabled || !value.trim()}
          onClick={onSend}
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl font-semibold transition disabled:opacity-40",
            colorful
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-[var(--cadmus-gold)] text-[#080808] hover:bg-[var(--cadmus-gold-light)]",
          )}
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-[var(--cadmus-muted)]">
        Ctrl+Enter or ⌘+Enter to send
      </p>
    </div>
  );
}
