# The Cadmus Companion

![App Preview](/home/gandalf/.cursor/projects/home-gandalf-Cardano-cardano-development-quantum-digital-product/assets/c__Users_tasos_AppData_Roaming_Cursor_User_workspaceStorage_d09e4b720ea2210e292810f7e76348af_images_image-db56fafb-d357-4da4-985a-021da08e1111.png)

Single-page interactive companion powered by **The Code of Cadmus** — self-mastery paths with optional OpenAI-powered responses. No login, no database, no payments. Ship as a hosted URL or as a static UI (see limitations below).

## Features

- **Minimal / Colorful themes** — Brand near-black + gold, or clean light UI with **emerald** accents (dark text on mint chips, solid buttons; persisted in `localStorage`). Copy emphasizes **instant** flows — no minute-counts in the UI.
- **Session 1 — The Cadmus Session** — Three phases (Surface → Understand → Act), 13 prompts, then a **Cadmus Plan**. With an API key (user or server env), turns use **gpt-4o-mini** with full question + prior answers as context. Without AI: **short offline acknowledgments** that quote the user’s words + a **structured template plan** from keyword routing, optionally **enriched with short excerpts** from PDFs you place under `public/docs/` (see [Bundle PDFs](#bundle-pdfs-offline-excerpts)).
- **Session 2 — Inner voices map** — 12 questions, scored to five voice archetypes; result screen + exportable share card.
- **Session 3 — 7-Day Conformity Detox** — Collapsible day cards; Day 2 copy adapts if you’ve completed the quiz.
- **Results** — Markdown, copy, print / PDF, optional share image (Session 2).

### Bundle PDFs (offline excerpts)

There is **no server-side** vector store or RAG. If you add the three bundle PDFs to **`public/docs/`** with the filenames listed in `public/docs/README.txt` (and `lib/pdfBundleManifest.ts`), the **browser** extracts text with `pdfjs-dist` and matches short **paragraph excerpts** to the user’s answers when the LLM API is missing or fails. Nothing is uploaded; extraction runs client-side and is cached in the tab (`sessionStorage` when size allows).

Without those files, offline mode still works using **typed answers** plus built-in patterns only.

### PDFs and “context” (AI on)

When OpenAI is enabled, **personalization** comes from **what the user types** in Session 1 and the quiz, plus **model generation** — not from automatic PDF ingestion on the server. You can still add bundle PDFs for **offline** excerpt matching as above.

## Tech stack

- Next.js (App Router), TypeScript, Tailwind CSS v4, `@tailwindcss/typography`
- OpenAI `gpt-4o-mini` via Route Handler `POST /api/cadmus-session`
- `localStorage` for theme, optional user API key, Session 1 progress, voice-type result

## Project structure

| Path | Purpose |
| --- | --- |
| `app/page.tsx` | Client app shell: screen routing and persistence |
| `app/layout.tsx` | Fonts, theme bootstrap script |
| `app/globals.css` | Theme tokens (`data-theme`), animations |
| `app/api/cadmus-session/route.ts` | Streams OpenAI text (Node runtime) |
| `components/` | Home, sessions, results, UI primitives |
| `lib/` | Voice types, quiz, session copy, fallbacks, storage keys |
| `public/docs/` | Optional bundle PDFs for client-side offline excerpts |

## Local development

```bash
npm install
cp .env.example .env.local
# Optionally set OPENAI_API_KEY in .env.local
# Optional: server-side default key for /api/cadmus-session when users do not paste a key in Settings.
OPENAI_API_KEY=
NEXT_PUBLIC_APP_NAME=The Cadmus Companion
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `OPENAI_API_KEY` | No | Server default for `/api/cadmus-session` if the user does not supply a key in Settings |
| `NEXT_PUBLIC_APP_NAME` | No | Browser title / metadata |

Users may paste their own key in **Settings** (stored in the browser). It is sent to **your** `/api/cadmus-session` route only, which forwards to OpenAI. Alternatively, set **`OPENAI_API_KEY`** on the server so users don’t need to paste anything.

## Deployment (recommended)

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com) or any Node host that supports Next.js Route Handlers. Set `OPENAI_API_KEY` in the host environment if you want a server default.

## Static export caveat

`output: 'export'` produces static HTML **without** `/api/*` routes. The OpenAI API **cannot** be called directly from the browser (CORS). A pure static folder therefore **cannot** offer full streaming AI unless you add a separate backend.

- **Full AI:** use a normal Next.js deployment with `/api/cadmus-session`.
- **Offline bundle:** Session 1 still works using deterministic **fallback** plans when no API key / no server route is available.

## Scripts

- `npm run dev` — development server  
- `npm run build` — production build  
- `npm run start` — run production server  
- `npm run lint` — ESLint  

---

*Powered by the book [THE CODE OF CADMUS](https://thecodeofcadmus.com)*
