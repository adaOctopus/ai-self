/**
 * PDFs shipped beside the app under `public/docs/`. Client-side extraction feeds
 * offline Session 1 when no LLM API is available.
 */
export type BundlePdfEntry = {
  file: string;
  label: string;
};

export const BUNDLE_PDFS: readonly BundlePdfEntry[] = [
  {
    file: "the-code-of-cadmus-ebook.pdf",
    label: "The Code of Cadmus",
  },
  {
    file: "tldr-dark-mode-busy-professionals.pdf",
    label: "TLDR Dark Mode — For busy professionals",
  },
  {
    file: "self-development-inner-work-workbook.pdf",
    label: "Self Development — Inner Work — Workbook Journal",
  },
];

export function bundlePdfPublicUrl(file: string): string {
  return `/docs/${encodeURIComponent(file)}`;
}
