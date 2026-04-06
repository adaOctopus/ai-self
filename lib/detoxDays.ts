import type { VoiceTypeId } from "./voiceTypes";
import { VOICE_TYPES } from "./voiceTypes";

export type DetoxDay = {
  day: number;
  title: string;
  task: string;
  time: string;
  why: string;
  writeDown: string;
};

export const DETOX_PROMPTS_DAY3 = [1, 7, 14, 23, 38] as const;

const BASE_DAYS: Omit<DetoxDay, "task">[] = [
  {
    day: 1,
    title: "KNOW YOUR INNER VOICES",
    time: "Instant",
    why: `You cannot change a pattern you cannot name. Today you get the name.`,
    writeDown: `Your dominant inner voice and the one sentence that described you most accurately.`,
  },
  {
    day: 2,
    title: "READ YOUR CHAPTER",
    time: "Instant",
    why: `The book gives you the conceptual map. You need the map before you can navigate.`,
    writeDown: `The one sentence from the book that made you stop.`,
  },
  {
    day: 3,
    title: "SURFACE THE PATTERN",
    time: "Instant",
    why: `Reading about a pattern is insight. Writing about YOUR pattern is transformation.`,
    writeDown: `The answer to prompt 14 in full.`,
  },
  {
    day: 4,
    title: "THE CADMUS SESSION",
    time: "Instant",
    why: `By Day 4 you have enough self-knowledge for the session to go deep. This is your breakthrough day.`,
    writeDown: `Your Phase 3 experiment from the session.`,
  },
  {
    day: 5,
    title: "WRITE YOUR CODE",
    time: "Instant",
    why: `A code makes future decisions automatic. Instead of agonizing over whether to say no, you consult your code.`,
    writeDown: `Your 3–5 code statements.`,
  },
  {
    day: 6,
    title: "BUILD YOUR ENVIRONMENT",
    time: "Instant",
    why: `Your environment shapes your behavior more than your intentions do. You are building a physical reminder system.`,
    writeDown: `The 3 posters you chose and why each one matters to you.`,
  },
  {
    day: 7,
    title: "THE FIRST AUTHENTIC DECISION",
    time: "As long as it takes",
    why: `A code without action is philosophy. One decision changes it into a way of life.`,
    writeDown: `The decision you made, what your code said about it, and how it felt different from your default.`,
  },
];

export function getDetoxDays(voiceType: VoiceTypeId | null): DetoxDay[] {
  const chapter =
    voiceType != null
      ? VOICE_TYPES[voiceType].chapter
      : "Complete the inner voices map first — then your chapter picks will appear here.";

  return BASE_DAYS.map((row, i) => {
    if (i === 0) {
      return {
        ...row,
        task: `Complete the inner voices map (Session 2).`,
      };
    }
    if (i === 1) {
      return {
        ...row,
        task: `Read the chapter(s) from the ebook that match your inner-voice result: ${chapter}`,
      };
    }
    if (i === 2) {
      return {
        ...row,
        task: `Complete prompts ${DETOX_PROMPTS_DAY3.join(", ")} from your 100 prompts collection. These five prompts are selected to surface your dominant pattern.`,
      };
    }
    if (i === 3) {
      return {
        ...row,
        task: `Complete the full Cadmus Session (Session 1).`,
      };
    }
    if (i === 4) {
      return {
        ...row,
        task: `Write the first draft of your personal code. It should have 3–5 statements beginning with "I am someone who..." It should answer: what do I value? what do I refuse? what do I stand for?`,
      };
    }
    if (i === 5) {
      return {
        ...row,
        task: `Choose 3 posters from your collection that speak directly to your code. Print them or set them as phone/desktop wallpaper. Place them where you will see them every single morning.`,
      };
    }
    return {
      ...row,
      task: `Make one real decision today using your personal code. It can be small — saying no to something, choosing something different from your default, or starting something you've been avoiding.`,
    };
  });
}
