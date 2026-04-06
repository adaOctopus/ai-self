"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { HomeScreen } from "@/components/HomeScreen";
import { ResultsScreen } from "@/components/ResultsScreen";
import { CadmusSession } from "@/components/session1/CadmusSession";
import { VoiceTypeQuiz } from "@/components/session2/VoiceTypeQuiz";
import { VoiceTypeResult } from "@/components/session2/VoiceTypeResult";
import { DetoxPlan } from "@/components/session3/DetoxPlan";
import {
  API_KEY_KEY,
  clearSession1,
  loadSession1,
  loadVoiceResult,
  RESUME_DISMISS_KEY,
  saveVoiceResult,
} from "@/lib/sessionStorage";
import type { ThemeId } from "@/lib/theme";
import { applyThemeToDocument, readStoredTheme, writeStoredTheme } from "@/lib/theme";
import type { VoiceTypeId } from "@/lib/voiceTypes";
import { voiceResultMarkdown } from "@/lib/voiceMarkdown";

type Screen =
  | "home"
  | "session-1"
  | "session-2"
  | "session-2-result"
  | "session-3"
  | "results";

export default function Page() {
  const [screen, setScreen] = useState<Screen>("home");
  const [apiKey, setApiKey] = useState("");
  const [theme, setTheme] = useState<ThemeId>("minimal");
  const [hydrated, setHydrated] = useState(false);
  const [resumeDismissed, setResumeDismissed] = useState(false);

  const [voiceDominant, setVoiceDominant] = useState<VoiceTypeId | null>(null);
  const [voiceSecondary, setVoiceSecondary] = useState<VoiceTypeId | null>(null);

  const [resultsMarkdown, setResultsMarkdown] = useState("");
  const [resultKind, setResultKind] = useState<"session-1" | "session-2">(
    "session-1",
  );
  const [resultsTime, setResultsTime] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      setApiKey(localStorage.getItem(API_KEY_KEY) ?? "");
      const t = readStoredTheme();
      const initial = t ?? "minimal";
      setTheme(initial);
      applyThemeToDocument(initial);
      const vr = loadVoiceResult();
      if (vr) {
        setVoiceDominant(vr.dominant);
        setVoiceSecondary(vr.secondary);
      }
      setResumeDismissed(localStorage.getItem(RESUME_DISMISS_KEY) === "1");
      setHydrated(true);
    });
  }, []);

  const colorful = theme === "colorful";

  const persistKey = useCallback((key: string) => {
    localStorage.setItem(API_KEY_KEY, key);
    setApiKey(key);
  }, []);

  const handleThemeChange = useCallback((t: ThemeId) => {
    setTheme(t);
    writeStoredTheme(t);
  }, []);

  const showResumeBanner = useMemo(() => {
    if (!hydrated || resumeDismissed) return false;
    const s = loadSession1();
    return (
      s != null &&
      s.pendingIndex > 0 &&
      s.pendingIndex < 13 &&
      screen === "home"
    );
  }, [hydrated, resumeDismissed, screen]);

  const openResults = useCallback(
    (md: string, kind: "session-1" | "session-2") => {
      setResultsMarkdown(md);
      setResultKind(kind);
      setResultsTime(new Date().toLocaleString());
      setScreen("results");
    },
    [],
  );

  if (!hydrated) {
    return (
      <div className="min-h-[100dvh] bg-[var(--cadmus-bg)]" aria-busy />
    );
  }

  if (screen === "home") {
    return (
      <HomeScreen
        theme={theme}
        colorful={colorful}
        onThemeChange={handleThemeChange}
        apiKey={apiKey}
        onSaveApiKey={persistKey}
        onOpenSession={(n) => {
          if (n === 1) setScreen("session-1");
          if (n === 2) setScreen("session-2");
          if (n === 3) setScreen("session-3");
        }}
        showResumeBanner={showResumeBanner}
        onResumeSession={() => setScreen("session-1")}
        onDismissResume={() => {
          setResumeDismissed(true);
          localStorage.setItem(RESUME_DISMISS_KEY, "1");
        }}
      />
    );
  }

  if (screen === "session-1") {
    return (
      <CadmusSession
        apiKey={apiKey}
        colorful={colorful}
        onBack={() => setScreen("home")}
        onComplete={(md) => openResults(md, "session-1")}
      />
    );
  }

  if (screen === "session-2") {
    return (
      <VoiceTypeQuiz
        colorful={colorful}
        onBack={() => setScreen("home")}
        onComplete={(dominant, secondary) => {
          setVoiceDominant(dominant);
          setVoiceSecondary(secondary);
          saveVoiceResult(dominant, secondary);
          setScreen("session-2-result");
        }}
      />
    );
  }

  if (
    screen === "session-2-result" &&
    voiceDominant &&
    voiceSecondary
  ) {
    return (
      <div className="min-h-[100dvh] bg-[var(--cadmus-bg)]">
        <VoiceTypeResult
          dominant={voiceDominant}
          secondary={voiceSecondary}
          colorful={colorful}
          onBeginCadmusSession={() => setScreen("session-1")}
          onViewResults={() =>
            openResults(
              voiceResultMarkdown(voiceDominant, voiceSecondary),
              "session-2",
            )
          }
        />
      </div>
    );
  }

  if (screen === "session-3") {
    return (
      <DetoxPlan
        voiceType={voiceDominant}
        colorful={colorful}
        onBack={() => setScreen("home")}
        onGoQuiz={() => setScreen("session-2")}
        onGoSession={() => setScreen("session-1")}
      />
    );
  }

  if (screen === "results") {
    return (
      <ResultsScreen
        title="Your Session Results"
        markdown={resultsMarkdown}
        timestamp={resultsTime}
        colorful={colorful}
        resultKind={resultKind}
        voiceDominant={voiceDominant ?? undefined}
        voiceSecondary={voiceSecondary ?? undefined}
        onBackHome={() => setScreen("home")}
        onStartAnother={() => {
          clearSession1();
          setScreen("home");
        }}
      />
    );
  }

  return null;
}
