import type { VoiceTypeId } from "./voiceTypes";
import { VOICE_TYPES } from "./voiceTypes";
import { SESSION_QUESTIONS } from "./sessionQuestions";

/** Too short / non-answers — push for substance instead of generic praise */
export function isNonAnswer(text: string): boolean {
  const t = text.trim().toLowerCase();
  if (t.length < 12) return true;
  const trivial = /^(hi|hello|hey|ok|okay|yes|no|test|idk|dunno|what|hmm+)\.?$/i;
  if (trivial.test(t)) return true;
  const words = t.split(/\s+/).filter(Boolean);
  return words.length < 3;
}

/**
 * Offline acknowledgment: mirrors their words — never generic "thanks for being direct".
 */
export function buildRetrySameQuestion(questionIndex: number): string {
  return `This needs a real answer — not a test run. Stay with it and answer in your own words:\n\n${SESSION_QUESTIONS[questionIndex]}`;
}

/** Use only when the answer is substantive (not a greeting / test string). */
export function buildOfflineAcknowledgment(
  answer: string,
  pdfExcerpt?: string,
): string {
  const trimmed = answer.trim();
  const clip =
    trimmed.length > 140 ? `${trimmed.slice(0, 137).trim()}…` : trimmed;
  let block = `You pointed at something concrete — “${clip}”. We’ll stay with that thread.`;
  const ex = pdfExcerpt?.trim();
  if (ex && ex.length > 20) {
    const q =
      ex.length > 380 ? `${ex.slice(0, 377).trim()}…` : ex;
    block += `\n\n**From your bundle (PDF)**\n> ${q}`;
  }
  return block;
}

export function detectPattern(answers: string[]): VoiceTypeId {
  const text = answers.join(" ").toLowerCase();

  const checks: { id: VoiceTypeId; patterns: RegExp[] }[] = [
    {
      id: "conformist",
      patterns: [
        /think of me|approval|fit in|please|peace|judg|what will they|say yes/,
      ],
    },
    {
      id: "critic",
      patterns: [
        /not good enough|should have|perfect|failure|ashamed|harsh|mistake/,
      ],
    },
    {
      id: "rebel",
      patterns: [
        /refuse|defy|against|push back|won't|rebel|fight|resent/,
      ],
    },
    {
      id: "protector",
      patterns: [
        /analyze|understand|logic|rational|plan|why i feel|intellect/,
      ],
    },
    {
      id: "trueSelf",
      patterns: [
        /gap|authentic|soul|wrong here|know myself|disconnect|grief/,
      ],
    },
  ];

  for (const { id, patterns } of checks) {
    for (const p of patterns) {
      if (p.test(text)) return id;
    }
  }
  return "conformist";
}

function snippet(s: string, max = 120): string {
  const t = s.trim().replace(/\s+/g, " ");
  if (t.length <= max) return t;
  return `${t.slice(0, max)}…`;
}

export function buildFallbackPlan(
  answers: string[],
  pdfExcerpts: string[] = [],
): string {
  const patternId = detectPattern(answers);
  const vt = VOICE_TYPES[patternId];
  const a1 = answers[0] ?? "";
  const a7 = answers[6] ?? "";
  const a8 = answers[7] ?? "";
  const a12 = answers[11] ?? "";
  const a13 = answers[12] ?? "";

  const grounded =
    pdfExcerpts.length > 0
      ? `### Grounded in your bundle (PDF excerpts)

${pdfExcerpts
  .slice(0, 4)
  .map((e) => `> ${e.replace(/^>/gm, "").trim()}`)
  .join("\n\n")}

`
      : "";

  const offlineNote =
    pdfExcerpts.length > 0
      ? "*Generated offline when no AI is available. Excerpts above were matched from PDFs you placed in `public/docs/` (client-side text only; nothing is uploaded).*"
      : "*Generated offline from your words when no AI is available. Add the three bundle PDFs under `public/docs/` (see README) for excerpt-backed offline plans, or add an OpenAI key in Settings for a fully tailored plan.*";

  return `## YOUR CADMUS PLAN

### What I Hear You Saying

You are navigating "${snippet(a1)}" while carrying "${snippet(a7)}". You already put words to a pattern: "${snippet(a8)}".

### The Pattern

Your answers point toward **${vt.name}** energy — ${vt.tagline.toLowerCase()}. The thread through your responses is the conformity cost: trading your signal for safety, performance, or old wiring.

${grounded}### Where This Came From

You traced where you learned to survive. Naming the teacher — person, culture, environment — doesn't excuse the present; it frees you to edit the script.

### Your Experiment (Week 1)

**Name:** The ${vt.name.split(" ")[1] ?? "Honest"} Test

**What to do:** ${snippet(a12) || vt.experiment}

**When:** Pick one concrete moment in the next 7 days — calendar it — and run the experiment once, observe once, write three lines after.

### What To Watch For

- You say your preference out loud once where you'd normally hedge.
- You pause before the automatic yes — and notice what you actually want.
- You complete the micro-action without narrating yourself out of it.

### Your Personal Code — First Line

I am someone who chooses one honest move before I choose another person's comfort.

### What To Use From Your Bundle

- **Ebook:** ${vt.chapter}
- **Prompts to start:** ${vt.prompts.slice(0, 3).join(", ")} from your 100 prompts
- **Poster line:** "${vt.posters[0]}"

---

${offlineNote}

**Your note on resistance:** ${snippet(a13) || "—"}
`;
}

