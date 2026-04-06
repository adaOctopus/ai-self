import type { VoiceTypeId } from "./voiceTypes";

export const SESSION1_KEY = "cadmus-session-1-v1";
export const API_KEY_KEY = "cadmus-api-key";
export const VOICE_RESULT_KEY = "cadmus-voice-result-v1";
export const RESUME_DISMISS_KEY = "cadmus-resume-dismissed";

export function saveVoiceResult(
  dominant: VoiceTypeId,
  secondary: VoiceTypeId,
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    VOICE_RESULT_KEY,
    JSON.stringify({ dominant, secondary }),
  );
}

export function loadVoiceResult(): {
  dominant: VoiceTypeId;
  secondary: VoiceTypeId;
} | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(VOICE_RESULT_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as {
      dominant: VoiceTypeId;
      secondary: VoiceTypeId;
    };
    if (!p.dominant || !p.secondary) return null;
    return p;
  } catch {
    return null;
  }
}

export type Session1Persist = {
  messages: { role: "user" | "assistant"; content: string }[];
  answers: string[];
  /** Index of next question we're waiting to collect (0–12). If 13, session complete */
  pendingIndex: number;
  ackSeed: number;
};

export function loadSession1(): Session1Persist | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION1_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<Session1Persist>;
    if (!Array.isArray(p.messages) || !Array.isArray(p.answers)) return null;
    return {
      messages: p.messages,
      answers: p.answers,
      pendingIndex:
        typeof p.pendingIndex === "number" ? p.pendingIndex : 0,
      ackSeed: typeof p.ackSeed === "number" ? p.ackSeed : 0,
    };
  } catch {
    return null;
  }
}

export function saveSession1(p: Session1Persist): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION1_KEY, JSON.stringify(p));
}

export function clearSession1(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION1_KEY);
}
