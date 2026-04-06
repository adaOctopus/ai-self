import type { VoiceTypeId } from "./voiceTypes";

export type QuizOption = {
  label: string;
  scores: Partial<Record<VoiceTypeId, number>>;
};

export type QuizQuestion = {
  id: number;
  prompt: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt:
      "When someone gives you feedback you disagree with, you most often...",
    options: [
      { label: "Quietly adjust your position to avoid conflict", scores: { conformist: 2 } },
      { label: "Feel a surge of self-criticism before defending", scores: { critic: 2 } },
      { label: "Push back harder because you dislike being challenged", scores: { rebel: 2 } },
      { label: "Analyze the feedback without emotional reaction", scores: { protector: 2 } },
    ],
  },
  {
    id: 2,
    prompt: "When you make a mistake in front of others, the first voice says...",
    options: [
      { label: "'What are they going to think of me?'", scores: { conformist: 2 } },
      { label: "'You should have known better. Again.'", scores: { critic: 2 } },
      { label: "'The situation was set up for me to fail.'", scores: { rebel: 2 } },
      { label: "'Understand what happened and correct it.'", scores: { protector: 2 } },
    ],
  },
  {
    id: 3,
    prompt:
      "You've had an idea for a project that excites you. Your first obstacle is...",
    options: [
      { label: "Worrying whether people will approve of it", scores: { conformist: 2 } },
      { label: "Convincing yourself it's not good enough yet", scores: { critic: 2 } },
      { label: "Resisting the 'proper' way to do it", scores: { rebel: 2 } },
      { label: "Needing to plan it fully before starting", scores: { protector: 2 } },
    ],
  },
  {
    id: 4,
    prompt: "In a relationship where something feels wrong, you tend to...",
    options: [
      { label: "Say nothing because it might cause conflict", scores: { conformist: 2 } },
      { label: "Blame yourself for the problem", scores: { critic: 2 } },
      { label: "Test the other person rather than be direct", scores: { rebel: 2 } },
      { label: "Try to understand the dynamic before feeling anything", scores: { protector: 2 } },
    ],
  },
  {
    id: 5,
    prompt: "When you imagine a life that's truly yours — the main feeling is...",
    options: [
      { label: "Fear of what others would think", scores: { conformist: 2 } },
      { label: "Doubt that you're capable of it", scores: { critic: 2 } },
      { label: "Frustration that you're not already living it", scores: { rebel: 2 } },
      { label: "Uncertainty about what that would actually look like", scores: { protector: 2 } },
    ],
  },
  {
    id: 6,
    prompt: "Your relationship with rules and social norms is best described as...",
    options: [
      { label: "I follow them to avoid friction", scores: { conformist: 2 } },
      { label: "I judge myself harshly when I break them", scores: { critic: 2 } },
      { label: "I break them on principle", scores: { rebel: 2 } },
      { label: "I follow the ones that make logical sense", scores: { protector: 2 } },
    ],
  },
  {
    id: 7,
    prompt: "You achieved something meaningful. Your immediate internal reaction is...",
    options: [
      { label: "Relief that others are pleased", scores: { conformist: 2 } },
      { label: "Identifying what you could have done better", scores: { critic: 2 } },
      { label: "Slight deflation — the chase was more interesting", scores: { rebel: 2 } },
      { label: "Satisfaction followed by planning the next thing", scores: { protector: 2 } },
    ],
  },
  {
    id: 8,
    prompt: "Alone on a free afternoon with no obligations — you feel...",
    options: [
      {
        label: "Slightly anxious without structure or purpose",
        scores: { conformist: 2, trueSelf: 1 },
      },
      { label: "Guilty that you're not being productive", scores: { critic: 2 } },
      { label: "Restless and quickly seeking stimulation", scores: { rebel: 2 } },
      {
        label: "Fine — you appreciate the time to think",
        scores: { protector: 2, trueSelf: 1 },
      },
    ],
  },
  {
    id: 9,
    prompt: "Someone challenges a belief you hold publicly. You...",
    options: [
      {
        label: "Wonder if maybe they're right — even if you don't think so",
        scores: { conformist: 2 },
      },
      { label: "Feel embarrassed and over-explain your position", scores: { critic: 2 } },
      { label: "Become more committed to the belief under pressure", scores: { rebel: 2 } },
      { label: "Separate the idea from the emotion and engage", scores: { protector: 2 } },
    ],
  },
  {
    id: 10,
    prompt:
      "When you think about the gap between who you are and who you want to be...",
    options: [
      { label: "It mostly involves what others expect of you", scores: { conformist: 2 } },
      { label: "It feels like your own failure", scores: { critic: 2 } },
      { label: "It makes you angry at what's holding you back", scores: { rebel: 2 } },
      { label: "You think about it practically, not emotionally", scores: { protector: 2 } },
    ],
  },
  {
    id: 11,
    prompt: "The people closest to you would say you are hardest to reach when...",
    options: [
      { label: "You're trying to keep the peace", scores: { conformist: 2 } },
      { label: "You're being too hard on yourself", scores: { critic: 2 } },
      { label: "You've decided someone doesn't understand you", scores: { rebel: 2 } },
      { label: "You've gone into analysis mode", scores: { protector: 2 } },
    ],
  },
  {
    id: 12,
    prompt: "The phrase that resonates most with you right now is...",
    options: [
      { label: "'I don't know what I actually want anymore.'", scores: { conformist: 3 } },
      { label: "'I'm my own worst enemy.'", scores: { critic: 3 } },
      { label: "'I refuse to become like everyone else.'", scores: { rebel: 3 } },
      {
        label: "'I understand myself perfectly — I just don't act on it.'",
        scores: { protector: 3 },
      },
      {
        label: "'I feel the gap between who I am and how I'm living every day.'",
        scores: { trueSelf: 4 },
      },
    ],
  },
];

const ALL_IDS: VoiceTypeId[] = [
  "conformist",
  "critic",
  "rebel",
  "protector",
  "trueSelf",
];

export function emptyScores(): Record<VoiceTypeId, number> {
  return {
    conformist: 0,
    critic: 0,
    rebel: 0,
    protector: 0,
    trueSelf: 0,
  };
}

export function tallyScores(
  scores: Record<VoiceTypeId, number>,
  option: QuizOption,
): Record<VoiceTypeId, number> {
  const next = { ...scores };
  for (const id of ALL_IDS) {
    const add = option.scores[id];
    if (add) next[id] += add;
  }
  return next;
}

export function dominantAndSecondary(
  scores: Record<VoiceTypeId, number>,
): { dominant: VoiceTypeId; secondary: VoiceTypeId } {
  const sorted = [...ALL_IDS].sort((a, b) => scores[b] - scores[a]);
  return { dominant: sorted[0], secondary: sorted[1] };
}
