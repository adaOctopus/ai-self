import {
  BUNDLE_PDFS,
  bundlePdfPublicUrl,
  type BundlePdfEntry,
} from "@/lib/pdfBundleManifest";
import { rankChunksFromCorpus } from "@/lib/bundleRetrieval";

const MAX_PAGES_PER_PDF = 280;
const MAX_CHARS_PER_PDF = 220_000;
const CACHE_KEY = "cadmus-bundle-corpus-v1";

let memoryCorpus: string | null = null;
let loadPromise: Promise<string> | null = null;

function readSessionCache(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw && raw.length > 500 ? raw : null;
  } catch {
    return null;
  }
}

function writeSessionCache(text: string): void {
  if (typeof window === "undefined") return;
  try {
    if (text.length < 4_500_000) sessionStorage.setItem(CACHE_KEY, text);
  } catch {
    /* quota — ignore */
  }
}

async function configurePdfWorker(): Promise<
  typeof import("pdfjs-dist")
> {
  const pdfjs = await import("pdfjs-dist");
  const { GlobalWorkerOptions, version } = pdfjs;
  GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  return pdfjs;
}

async function extractOnePdf(
  pdfjs: typeof import("pdfjs-dist"),
  entry: BundlePdfEntry,
): Promise<string> {
  const url = bundlePdfPublicUrl(entry.file);
  let res: Response;
  try {
    res = await fetch(url, { cache: "force-cache" });
  } catch {
    return "";
  }
  if (!res.ok) return "";

  const buf = await res.arrayBuffer();
  if (!buf.byteLength) return "";

  const { getDocument } = pdfjs;
  const task = getDocument({ data: buf });
  const pdf = await task.promise;
  const n = Math.min(pdf.numPages, MAX_PAGES_PER_PDF);
  let acc = `\n\n--- ${entry.label} ---\n\n`;
  let total = acc.length;

  for (let i = 1; i <= n; i++) {
    if (total >= MAX_CHARS_PER_PDF) break;
    const page = await pdf.getPage(i);
    const tc = await page.getTextContent();
    const pageText = tc.items
      .map((item) => ("str" in item && typeof item.str === "string" ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (pageText) {
      acc += `${pageText}\n`;
      total = acc.length;
    }
  }

  return acc;
}

/**
 * Loads and concatenates text from `public/docs/*.pdf` (best effort).
 * Cached in memory and sessionStorage for the tab session.
 */
export async function ensureBundleCorpus(): Promise<string> {
  if (typeof window === "undefined") return "";
  if (memoryCorpus !== null) return memoryCorpus;

  const cached = readSessionCache();
  if (cached) {
    memoryCorpus = cached;
    return memoryCorpus;
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const pdfjs = await configurePdfWorker();
    const parts: string[] = [];
    for (const entry of BUNDLE_PDFS) {
      try {
        const t = await extractOnePdf(pdfjs, entry);
        if (t) parts.push(t);
      } catch {
        /* skip broken / encrypted PDF */
      }
    }
    const merged = parts.join("\n").trim();
    memoryCorpus = merged;
    if (merged.length > 200) writeSessionCache(merged);
    return merged;
  })();

  return loadPromise;
}

/** Fire-and-forget warm-up while the user is still answering questions. */
export function preloadBundleCorpus(): void {
  if (typeof window === "undefined") return;
  void ensureBundleCorpus();
}

export async function excerptsForAnswers(
  answers: string[],
  k = 4,
): Promise<string[]> {
  const corpus = await ensureBundleCorpus();
  if (!corpus) return [];
  const query = answers.join(" ").slice(0, 8000);
  return rankChunksFromCorpus(corpus, query, k);
}

export async function excerptsForAcknowledgment(
  userAnswer: string,
  priorAnswerText: string,
  k = 1,
): Promise<string[]> {
  const corpus = await ensureBundleCorpus();
  if (!corpus) return [];
  const query = `${userAnswer}\n${priorAnswerText}`.slice(0, 4000);
  return rankChunksFromCorpus(corpus, query, k);
}
