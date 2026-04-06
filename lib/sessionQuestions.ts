export type PhaseId = 1 | 2 | 3;

export const PHASE_LABELS: Record<
  PhaseId,
  { short: string; label: string }
> = {
  1: { short: "SURFACE", label: "SURFACE · Phase 1 of 3" },
  2: { short: "UNDERSTAND", label: "UNDERSTAND · Phase 2 of 3" },
  3: { short: "ACT", label: "ACT · Phase 3 of 3" },
};

/** Questions 1–13 in order; index 0 = Q1 */
export const SESSION_QUESTIONS: string[] = [
  `What situation in your life right now is making you feel most like you're betraying yourself — or that something is wrong?`,
  `When did you last feel completely like yourself? What were you doing, and who were you with?`,
  `This week — which voice has been loudest? The one that says 'fit in and stay safe,' or the one that says 'something is wrong here'?`,
  `What is the decision you've been avoiding the most? What are you afraid people will think if you make it?`,
  `In which area of your life do you feel most like you're playing a role someone else wrote for you?`,
  `What would you do differently this week if no one was watching and no one would judge you?`,
  `What feeling have you been trying to suppress or ignore the most in the past month?`,
  `Looking at everything you've shared — what pattern do you recognize? What theme keeps showing up?`,
  `When did this pattern first appear in your life? How old were you, and what was happening?`,
  `Who taught you this pattern — directly, or by example? (It could be a person, an environment, a culture.)`,
  `What has this pattern cost you in concrete terms in the last twelve months? Think in terms of decisions made, relationships affected, opportunities missed.`,
  `Given everything you've uncovered — what is ONE specific, small experiment you could run in the next 7 days that would test a different way of being? (Not a goal. An experiment. Something you can observe and report back on.)`,
  `What is the REAL reason you haven't tried this experiment before now? Be specific.`,
];

export function questionIndexToPhase(qIndex: number): PhaseId {
  if (qIndex < 7) return 1;
  if (qIndex < 11) return 2;
  return 3;
}

export const OPENING_MESSAGE = `Welcome. This is a guided session based on The Code of Cadmus.

There are three phases. Each phase builds on the last.
Answer as honestly as you can — no one else will read this.

Let's start with what's real right now.`;

export const TRANSITION_AFTER_Q7 = `Good. Phase 1 complete.

You've just done something most people never do — you put language to what's actually happening. Let's go one level deeper.

Phase 2: Understand.`;

export const TRANSITION_AFTER_Q11 = `Phase 2 complete.

You've just done what takes most people 3–4 therapy sessions to reach. You've named the pattern, found its origin, and counted its cost.

Now we move to the only part that actually changes anything.

Phase 3: Act.`;

export const FIRST_QUESTION = SESSION_QUESTIONS[0];

export const CADMUS_PLAN_SYSTEM_PROMPT = `You are a self-mastery guide trained in the philosophy of "The Code of Cadmus." The core principle: avoiding conformity to keep your soul.

The book identifies that modern humans suffer from three main problems:
1. External conformity pressure (social media, culture, family expectations)
2. Internal voices (Conformist, Inner Critic, Rebel, Protector, True Self)
3. Lack of a personal code — clear values that guide decisions

Based on the user's session answers below, generate a personalized "Cadmus Plan" with the following structure:

---

## YOUR CADMUS PLAN

### What I Hear You Saying
[2-3 sentences that PRECISELY name what they've described — make them feel seen and understood, not analyzed]

### The Pattern
[Name their specific conformity pattern in 1-2 sentences. Be specific, not generic. Use their actual words.]

### Where This Came From
[1-2 sentences connecting their answer to a universal human truth. Validate without excusing.]

### Your Experiment (Week 1)
[Refine their Q12 answer into a specific, concrete, testable experiment. Give it a name. Give them the exact moment to do it.]

### What To Watch For
[2-3 specific signs that will tell them the experiment is working. Make these observable behaviors, not feelings.]

### Your Personal Code — First Line
[Based on everything they shared, write the FIRST LINE of their personal code. One sentence. Starts with "I am someone who..."]

### What To Use From Your Bundle
[Reference specific products from The Code of Cadmus bundle:
- Which chapter of the ebook addresses their exact pattern
- Which 2-3 prompts from the 100 to start with
- Which poster quote speaks to their situation]

---

Keep the tone: direct, warm, honest, non-generic.
Never say "it sounds like" or "it seems."
Write as if you know them, because their words have told you who they are.
Max 400 words total.

USER SESSION DATA:
`;
