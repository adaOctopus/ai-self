export type VoiceTypeId =
  | "conformist"
  | "critic"
  | "rebel"
  | "protector"
  | "trueSelf";

export type VoiceType = {
  id: VoiceTypeId;
  name: string;
  tagline: string;
  description: string;
  cost: string;
  gift: string;
  posters: string[];
  prompts: number[];
  chapter: string;
  experiment: string;
};

export const VOICE_TYPES: Record<VoiceTypeId, VoiceType> = {
  conformist: {
    id: "conformist",
    name: "The Conformist",
    tagline: "Safety through belonging",
    description:
      "Your dominant voice has learned that fitting in equals survival. You are a master of reading what others want and delivering it. The cost: you've become an expert at everyone's life except your own.",
    cost:
      "You make decisions based on what 'looks right' rather than what IS right for you. You've said yes to things you wanted to say no to so many times you've lost track of what you actually want.",
    gift:
      "Your sensitivity to others is a superpower. When redirected inward, it becomes deep self-awareness.",
    posters: [
      "Belonging that costs you yourself is not belonging — it's erasure.",
      "The polite no is still a no. Practice it.",
      "Their approval is not your compass.",
    ],
    prompts: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    chapter:
      "Chapter 2 — What I mean by conformity + Chapter 8 — What to do about these voices",
    experiment:
      "This week: say no to one small request you'd normally automatically accept. Notice what happens inside you when you do.",
  },
  critic: {
    id: "critic",
    name: "The Inner Critic",
    tagline: "Perfection as protection",
    description:
      "Your dominant voice holds you to a standard no one could meet. It attacks before the world can. The logic: if I destroy myself first, their criticism can't hurt me.",
    cost:
      "You've delayed, abandoned, or never started things that mattered because they weren't going to be perfect. You mistake self-attack for self-awareness.",
    gift:
      "Your standards are genuinely high. Turned outward, that becomes excellence. The shift is from attacking yourself to challenging yourself.",
    posters: [
      "Done is the bridge. Perfect is the wall.",
      "Your first draft is data, not verdict.",
      "Excellence includes finishing.",
    ],
    prompts: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    chapter:
      "Chapter 7 — What are the voices in your head? + Chapter 3 — What I mean by soul",
    experiment:
      "Publish, send, or show one thing this week that isn't finished or perfect yet.",
  },
  rebel: {
    id: "rebel",
    name: "The Rebel",
    tagline: "Defiance as identity",
    description:
      "You resist conformity — but reactively. Your identity has been built in opposition to something. The problem: when you define yourself against something, that something still controls you.",
    cost:
      "Your non-conformity is still dictated by others — just in reverse. You've traded one cage for another, just with better aesthetics.",
    gift:
      "You see the cages others can't. The shift is from reactive defiance to conscious choice — not 'I won't' but 'I choose not to, because...'",
    posters: [
      "Defiance without direction is still obedience — to the opposite.",
      "Choose your no. Don't just inherit it.",
      "Freedom is what you build, not what you refuse.",
    ],
    prompts: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    chapter:
      "Chapter 1 — Who is Cadmus? + Chapter 6 — Why you need a CODE",
    experiment:
      "Identify ONE thing you rebel against automatically. Ask: 'If I chose to engage with this instead of resist it, what would I learn?'",
  },
  protector: {
    id: "protector",
    name: "The Protector",
    tagline: "Logic as a wall",
    description:
      "You process everything through analysis because feeling is dangerous. You are calm, rational, and excellent in a crisis. You are also alone in ways that logic can't explain.",
    cost:
      "You've intellectualized your way out of relationships, opportunities, and your own desires. You confuse 'understanding why you feel something' with actually feeling it.",
    gift:
      "Your capacity for clear thinking under pressure is rare. The shift is adding emotional data to your analysis, not replacing thinking with feeling.",
    posters: [
      "Understanding is not the same as intimacy.",
      "Name the feeling before you explain it.",
      "Clarity without contact is a lighthouse with no shore.",
    ],
    prompts: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
    chapter:
      "Chapter 5 — What goes deeply against our nature + Chapter 9 — What's a life worth living?",
    experiment:
      "Name one feeling you've had this week without immediately explaining why you have it. Just: 'I feel ___.' Stop there.",
  },
  trueSelf: {
    id: "trueSelf",
    name: "The True Self",
    tagline: "The voice that was always there",
    description:
      "Your dominant voice IS the authentic one — which means you feel the gap between who you are and how you're living more acutely than most. That discomfort isn't a problem. It's information.",
    cost:
      "You feel the inauthenticity of your environment deeply, which can become paralysis, superiority, or a chronic low-grade grief for a life not yet lived.",
    gift:
      "You already know. The work isn't discovery — it's courage.",
    posters: [
      "The gap you feel is honesty, not failure.",
      "Courage is the next step, not the next insight.",
      "Your code begins where the knowing stops hiding.",
    ],
    prompts: [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
    chapter:
      "Chapter 6 — Why you need a CODE + Behind The Mask",
    experiment:
      "Write the first three lines of your personal code today. Not the perfect version. The honest version.",
  },
};
