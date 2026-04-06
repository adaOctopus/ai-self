"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ChatMessage } from "@/components/session1/ChatMessage";
import { PhaseIndicator } from "@/components/session1/PhaseIndicator";
import { TextInput } from "@/components/session1/TextInput";
import { LoadingDots } from "@/components/ui/LoadingDots";
import {
  CADMUS_PLAN_SYSTEM_PROMPT,
  FIRST_QUESTION,
  OPENING_MESSAGE,
  SESSION_QUESTIONS,
  TRANSITION_AFTER_Q11,
  TRANSITION_AFTER_Q7,
} from "@/lib/sessionQuestions";
import { ACK_SYSTEM, buildAckUserContent } from "@/lib/sessionAckPrompt";
import {
  loadSession1,
  saveSession1,
  type Session1Persist,
} from "@/lib/sessionStorage";
import {
  buildFallbackPlan,
  buildOfflineAcknowledgment,
  buildRetrySameQuestion,
  isNonAnswer,
} from "@/lib/fallbackResponses";
import {
  excerptsForAcknowledgment,
  excerptsForAnswers,
  preloadBundleCorpus,
} from "@/lib/bundleCorpus";

type Props = {
  apiKey: string;
  colorful: boolean;
  onBack: () => void;
  onComplete: (markdown: string) => void;
};

async function streamFromApi(
  messages: { role: "system" | "user" | "assistant"; content: string }[],
  apiKey: string,
  onDelta: (full: string) => void,
): Promise<string> {
  const res = await fetch("/api/cadmus-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, apiKey }),
  });
  if (!res.ok || !res.body) {
    throw new Error("stream_failed");
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let acc = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    acc += decoder.decode(value, { stream: true });
    onDelta(acc);
  }
  return acc;
}

function initialPersist(): Session1Persist {
  return {
    messages: [
      { role: "assistant", content: OPENING_MESSAGE },
      { role: "assistant", content: FIRST_QUESTION },
    ],
    answers: [],
    pendingIndex: 0,
    ackSeed: 0,
  };
}

function priorPairsForAck(
  base: Session1Persist,
  justAnsweredIndex: number,
): { q: string; a: string }[] {
  const pairs: { q: string; a: string }[] = [];
  for (let i = 0; i < justAnsweredIndex; i++) {
    pairs.push({
      q: SESSION_QUESTIONS[i],
      a: base.answers[i] ?? "",
    });
  }
  return pairs;
}

function nextOfflineAssistant(
  p: Session1Persist,
  justAnsweredIndex: number,
  pdfExcerpt?: string,
): { messages: Session1Persist["messages"]; pendingIndex: number } {
  const answer = p.answers[justAnsweredIndex] ?? "";

  if (isNonAnswer(answer)) {
    return {
      messages: [
        ...p.messages,
        {
          role: "assistant",
          content: buildRetrySameQuestion(justAnsweredIndex),
        },
      ],
      pendingIndex: justAnsweredIndex,
    };
  }

  const ack = buildOfflineAcknowledgment(answer, pdfExcerpt);

  if (justAnsweredIndex === 6) {
    return {
      messages: [
        ...p.messages,
        {
          role: "assistant",
          content: `${ack}\n\n${TRANSITION_AFTER_Q7}\n\n${SESSION_QUESTIONS[7]}`,
        },
      ],
      pendingIndex: 7,
    };
  }
  if (justAnsweredIndex === 10) {
    return {
      messages: [
        ...p.messages,
        {
          role: "assistant",
          content: `${ack}\n\n${TRANSITION_AFTER_Q11}\n\n${SESSION_QUESTIONS[11]}`,
        },
      ],
      pendingIndex: 11,
    };
  }

  return {
    messages: [
      ...p.messages,
      {
        role: "assistant",
        content: `${ack}\n\n${SESSION_QUESTIONS[justAnsweredIndex + 1]}`,
      },
    ],
    pendingIndex: justAnsweredIndex + 1,
  };
}

export function CadmusSession({
  apiKey,
  colorful,
  onBack,
  onComplete,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [persist, setPersist] = useState<Session1Persist | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const loaded = loadSession1();
      setPersist(loaded ?? initialPersist());
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    preloadBundleCorpus();
  }, []);

  useEffect(() => {
    if (!persist || !hydrated) return;
    saveSession1(persist);
  }, [persist, hydrated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [persist?.messages, streaming, busy]);

  const handleSend = useCallback(async () => {
    if (!persist || busy) return;
    const text = draft.trim();
    if (!text) return;
    if (persist.pendingIndex >= 13) return;

    const userMsg = { role: "user" as const, content: text };
    const nextAnswers = [...persist.answers];
    nextAnswers[persist.pendingIndex] = text;
    const base: Session1Persist = {
      ...persist,
      messages: [...persist.messages, userMsg],
      answers: nextAnswers,
    };
    setDraft("");
    setPersist(base);
    setBusy(true);

    const justIdx = persist.pendingIndex;
    const key = apiKey.trim();

    try {
      if (justIdx === 12) {
        setStreaming(true);
        const answers = nextAnswers;
        const planPrompt = `${CADMUS_PLAN_SYSTEM_PROMPT}\n${answers
          .map((a, i) => `Q${i + 1}: ${a}`)
          .join("\n")}`;

        try {
          const full = await streamFromApi(
            [
              { role: "system", content: planPrompt },
              { role: "user", content: "Generate the Cadmus Plan now." },
            ],
            key,
            () => {},
          );
          const final: Session1Persist = {
            ...base,
            messages: [...base.messages, { role: "assistant", content: full }],
            pendingIndex: 13,
            ackSeed: base.ackSeed,
          };
          setPersist(final);
          setStreaming(false);
          setBusy(false);
          onComplete(full);
          return;
        } catch {
          let pdfBits: string[] = [];
          try {
            pdfBits = await excerptsForAnswers(answers);
          } catch {
            pdfBits = [];
          }
          const plan = buildFallbackPlan(answers, pdfBits);
          const final: Session1Persist = {
            ...base,
            messages: [...base.messages, { role: "assistant", content: plan }],
            pendingIndex: 13,
            ackSeed: base.ackSeed,
          };
          setPersist(final);
          setStreaming(false);
          setBusy(false);
          onComplete(plan);
          return;
        }
      }

      const repeat = isNonAnswer(text);
      const nextBlock = repeat
        ? SESSION_QUESTIONS[justIdx]
        : justIdx === 6
          ? `${TRANSITION_AFTER_Q7}\n\n${SESSION_QUESTIONS[7]}`
          : justIdx === 10
            ? `${TRANSITION_AFTER_Q11}\n\n${SESSION_QUESTIONS[11]}`
            : SESSION_QUESTIONS[justIdx + 1];

      setStreaming(true);
      const userContent = buildAckUserContent({
        questionIndexAnswered: justIdx,
        userAnswer: text,
        priorPairs: priorPairsForAck(base, justIdx),
        nextBlock,
      });

      try {
        const full = await streamFromApi(
          [
            { role: "system", content: ACK_SYSTEM },
            { role: "user", content: userContent },
          ],
          key,
          () => {},
        );
        const next: Session1Persist = {
          ...base,
          messages: [...base.messages, { role: "assistant", content: full }],
          pendingIndex: repeat ? justIdx : justIdx + 1,
          ackSeed: base.ackSeed,
        };
        setPersist(next);
      } catch {
        let ex: string | undefined;
        try {
          const prior = base.answers.slice(0, justIdx).join(" ");
          const hits = await excerptsForAcknowledgment(text, prior);
          ex = hits[0];
        } catch {
          ex = undefined;
        }
        const off = nextOfflineAssistant(base, justIdx, ex);
        setPersist({ ...base, ...off });
      }
      setStreaming(false);
      setBusy(false);
    } catch {
      let ex: string | undefined;
      try {
        const prior = base.answers.slice(0, justIdx).join(" ");
        const hits = await excerptsForAcknowledgment(text, prior);
        ex = hits[0];
      } catch {
        ex = undefined;
      }
      const off = nextOfflineAssistant(base, justIdx, ex);
      setPersist({ ...base, ...off });
      setStreaming(false);
      setBusy(false);
    }
  }, [apiKey, busy, draft, onComplete, persist]);

  if (!hydrated || !persist) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--cadmus-bg)]">
        <LoadingDots />
      </div>
    );
  }

  const showInput = persist.pendingIndex < 13;
  const phaseQ = Math.min(persist.pendingIndex, 12);

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[var(--cadmus-bg)]">
      <header className="no-print sticky top-0 z-10 border-b border-[var(--cadmus-border)] bg-[var(--cadmus-bg)]/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg p-2 text-[var(--cadmus-muted)] hover:bg-[var(--cadmus-surface)] hover:text-[var(--cadmus-text)]"
            aria-label="Back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <PhaseIndicator questionIndex={phaseQ} colorful={colorful} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 overflow-y-auto px-4 py-6">
        {persist.messages.map((m, i) => (
          <ChatMessage key={`${i}-${m.role.slice(0, 1)}`} role={m.role}>
            {m.content}
          </ChatMessage>
        ))}
        {streaming && (
          <div className="flex items-center gap-2 text-[var(--cadmus-muted)]">
            <LoadingDots />
            <span className="text-xs">Writing…</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showInput && (
        <TextInput
          colorful={colorful}
          value={draft}
          onChange={setDraft}
          onSend={handleSend}
          disabled={busy}
        />
      )}

      {!showInput && persist.pendingIndex >= 13 && (
        <div className="no-print border-t border-[var(--cadmus-border)] bg-[var(--cadmus-bg)] p-4">
          <button
            type="button"
            onClick={() => {
              const lastAssistant = [...persist.messages]
                .reverse()
                .find((m) => m.role === "assistant");
              if (lastAssistant?.content) onComplete(lastAssistant.content);
            }}
            className="mx-auto block w-full max-w-3xl rounded-xl bg-[var(--cadmus-gold)] py-3 text-center text-sm font-semibold text-[#080808] hover:bg-[var(--cadmus-gold-light)]"
          >
            Open results
          </button>
        </div>
      )}
    </div>
  );
}
