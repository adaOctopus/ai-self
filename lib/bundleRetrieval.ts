const STOP = new Set(
  [
    "the", "and", "for", "are", "but", "not", "you", "all", "can", "her", "was",
    "one", "our", "out", "day", "get", "has", "him", "his", "how", "its", "may",
    "new", "now", "old", "see", "two", "way", "who", "boy", "did", "let", "put",
    "say", "she", "too", "use", "that", "this", "with", "have", "from", "they",
    "know", "want", "been", "good", "much", "some", "time", "very", "when",
    "come", "here", "just", "like", "long", "make", "many", "more", "only",
    "over", "such", "take", "than", "them", "well", "were", "what", "your",
    "about", "after", "also", "back", "because", "being", "could", "every",
    "first", "into", "other", "should", "their", "there", "these", "think",
    "those", "through", "where", "which", "while", "would", "will",
  ],
);

function tokenize(s: string): string[] {
  const m = s.toLowerCase().match(/\b[a-z]{3,}\b/g);
  if (!m) return [];
  return m.filter((w) => !STOP.has(w));
}

function splitIntoChunks(text: string, maxLen = 520): string[] {
  const parts = text.split(/\n+/).filter((p) => p.trim().length > 0);
  const chunks: string[] = [];
  let buf = "";
  for (const p of parts) {
    const line = p.trim();
    if (buf.length + line.length > maxLen && buf.length > 80) {
      chunks.push(buf.trim());
      buf = line;
    } else {
      buf = buf ? `${buf}\n${line}` : line;
    }
  }
  if (buf.trim().length > 40) chunks.push(buf.trim());
  return chunks;
}

function scoreChunk(chunk: string, terms: Set<string>): number {
  const words = tokenize(chunk);
  let s = 0;
  for (const w of words) {
    if (terms.has(w)) s += 1;
  }
  return s;
}

export function rankChunksFromCorpus(
  corpus: string,
  query: string,
  k: number,
): string[] {
  const qTerms = new Set(tokenize(query));
  if (qTerms.size === 0 || !corpus.trim()) return [];

  const chunks = splitIntoChunks(corpus);
  const scored = chunks
    .map((c) => ({ c, score: scoreChunk(c, qTerms) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  const out: string[] = [];
  const seen = new Set<string>();
  for (const { c } of scored) {
    const key = c.slice(0, 120);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(c.length > 420 ? `${c.slice(0, 417).trim()}…` : c);
    if (out.length >= k) break;
  }
  return out;
}
