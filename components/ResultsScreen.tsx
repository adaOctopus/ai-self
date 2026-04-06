"use client";

import { useCallback, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { toPng } from "html-to-image";
import { ArrowLeft, Copy, Printer, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VoiceTypeId } from "@/lib/voiceTypes";
import { VOICE_TYPES } from "@/lib/voiceTypes";

type Props = {
  title: string;
  markdown: string;
  timestamp: string;
  colorful: boolean;
  resultKind: "session-1" | "session-2";
  voiceDominant?: VoiceTypeId;
  voiceSecondary?: VoiceTypeId;
  onBackHome: () => void;
  onStartAnother: () => void;
};

export function ResultsScreen({
  title,
  markdown,
  timestamp,
  colorful,
  resultKind,
  voiceDominant,
  voiceSecondary,
  onBackHome,
  onStartAnother,
}: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [shareBusy, setShareBusy] = useState(false);

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [markdown]);

  const print = useCallback(() => {
    window.print();
  }, []);

  const shareCard = useCallback(async () => {
    if (!shareRef.current || !voiceDominant) return;
    setShareBusy(true);
    try {
      const dataUrl = await toPng(shareRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: colorful ? "#ffffff" : "#080808",
      });
      const link = document.createElement("a");
      link.download = "cadmus-voice-type.png";
      link.href = dataUrl;
      link.click();
    } catch {
      /* ignore */
    } finally {
      setShareBusy(false);
    }
  }, [colorful, voiceDominant]);

  const d =
    voiceDominant != null ? VOICE_TYPES[voiceDominant] : null;
  const s =
    voiceSecondary != null ? VOICE_TYPES[voiceSecondary] : null;

  return (
    <div className="min-h-[100dvh] bg-[var(--cadmus-bg)] px-4 pb-24 pt-6 sm:px-6">
      <header className="no-print mx-auto flex max-w-3xl items-center gap-3">
        <button
          type="button"
          onClick={onBackHome}
          className="rounded-lg p-2 text-[var(--cadmus-muted)] hover:bg-[var(--cadmus-surface)]"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--cadmus-muted)]">
            {title}
          </p>
          <p className="text-xs text-[var(--cadmus-muted)]">{timestamp}</p>
        </div>
      </header>

      <article
        ref={printRef}
        className={cn(
          "prose mx-auto mt-8 max-w-3xl max-w-none prose-headings:font-semibold",
          colorful
            ? "prose-neutral text-neutral-900 prose-p:text-neutral-800 prose-headings:text-neutral-900"
            : "prose-invert text-[var(--cadmus-text)] prose-p:text-[var(--cadmus-text)] prose-headings:text-[var(--cadmus-text)]",
        )}
      >
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </article>

      {resultKind === "session-2" && d && s && (
        <div className="pointer-events-none fixed left-[-10000px] top-0 z-0">
          <div
            ref={shareRef}
            className={cn(
              "flex h-[400px] w-[720px] flex-col justify-between p-10",
              colorful
                ? "bg-white text-neutral-900"
                : "bg-[#080808] text-[#F0EAD6]",
            )}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                The Cadmus Companion
              </p>
              <h2 className="mt-6 text-4xl font-semibold leading-tight tracking-tight">
                {d.name}
              </h2>
              <p className="mt-2 text-lg opacity-80">{d.tagline}</p>
            </div>
            <div>
              <p className="text-sm opacity-70">
                With elements of {s.name}
              </p>
              <p
                className={cn(
                  "mt-4 h-1 w-24 rounded-full",
                  colorful
                    ? "bg-emerald-600"
                    : "bg-[#C49C3E]",
                )}
              />
            </div>
          </div>
        </div>
      )}

      <div className="no-print mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--cadmus-border)] px-4 py-3 text-sm font-semibold text-[var(--cadmus-text)] hover:bg-[var(--cadmus-surface)]"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied" : "Copy to Clipboard"}
        </button>
        <button
          type="button"
          onClick={print}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--cadmus-border)] px-4 py-3 text-sm font-semibold text-[var(--cadmus-text)] hover:bg-[var(--cadmus-surface)]"
        >
          <Printer className="h-4 w-4" />
          Download as PDF
        </button>
        {resultKind === "session-2" && (
          <button
            type="button"
            disabled={shareBusy}
            onClick={shareCard}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--cadmus-gold)] px-4 py-3 text-sm font-semibold text-[#080808] hover:bg-[var(--cadmus-gold-light)] disabled:opacity-50"
          >
            <Share2 className="h-4 w-4" />
            {shareBusy ? "…" : "Share Your Type"}
          </button>
        )}
        <button
          type="button"
          onClick={onStartAnother}
          className={cn(
            "inline-flex flex-1 items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold sm:min-w-[12rem]",
            colorful
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-[var(--cadmus-gold)] text-[#080808]",
          )}
        >
          Start Another Session
        </button>
      </div>
    </div>
  );
}
