# Chat App (Doodle Frontend Challenge)

React + TypeScript chat UI for the [Doodle frontend challenge](../frontend-engineer/README.md). Talks to the local [Chat API](../frontend-challenge-chat-api).

## Prerequisites

- Node.js 20+
- Chat API running at `http://localhost:3000` (see API repo: `docker compose up`)

## Setup

```bash
cp .env.example .env.local   # optional; defaults also in .env
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local Vite dev server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run typecheck` | TypeScript project references check |
| `npm run lint` | Oxlint |
| `npm test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright E2E (starts Vite if needed) |
| `npm run format` | Prettier |

## Environment

See `.env.example`. Use `.env.local` for local overrides (gitignored).

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API origin |
| `VITE_API_TOKEN` | Bearer token |
| `VITE_CURRENT_AUTHOR` | Your display author (outgoing bubbles) |
| `VITE_POLL_INTERVAL_MS` | Poll interval for new messages |

## Decisions & tradeoffs

These choices are intentional for a short challenge submission. They also sketch how the design would grow.

### Why not TanStack Query (React Query)?

TanStack Query is a common choice for API/server state in React apps. This chat UI is a **single page** with one list: initial load, poll with `?after=`, and send via POST. A small `useMessages` hook covers that without an extra dependency, and keeps the submission easier to review in a short challenge.

If the app grew (more screens, shared caches, complex invalidation/retries across features), TanStack Query would be a strong fit for server state.

### List virtualization

Not used. The API seed set is tiny, and even a few hundred DOM bubbles is fine on modern mobile browsers. **Virtualization** (e.g. `react-window` / TanStack Virtual) becomes worth it when the list grows to hundreds or thousands of messages, or when scroll/jank shows up in profiling. Until then it adds complexity for little gain.

### Rich text (bold, icons, links) — not Markdown rendering yet

Messages are rendered as **plain text** (`white-space: pre-wrap`). We only **decode HTML entities** from the API (e.g. seed `It&#39;s` → `It's`) so text displays correctly — we do **not** inject HTML with `dangerouslySetInnerHTML`.

That is a deliberate security tradeoff:

- Allowing raw HTML from authors opens **XSS** (scripts in messages).
- “Encryption” is not the right tool here; the usual approaches are:
  - **Keep plain text** (current) — safest and enough for this challenge.
  - **Constrained Markdown** (e.g. bold/italic/links only) → parse to HTML → **sanitize** with a library like DOMPurify before render.
  - **Structured rich text** (Slate/ProseMirror) — overkill unless editing UX is a product goal.

If product later needed bold/icons/emoji shortcodes, I’d add a small Markdown (or token) subset + sanitization, not open-ended HTML.

### Realtime transport

The provided API exposes REST only. “Realtime” is implemented with **polling** `?after=`. If the backend added WebSockets/SSE later, the UI could swap the poll loop for a subscription while keeping the same merge-by-`_id` model.

### Other “if we had more time / larger app”

- Infinite scroll upward via `?before=` for history
- Pause polling when the tab is hidden (`document.visibilityState`)
- Docker multi-stage image for the static `dist/` (build is already Docker-ready)
- Stronger a11y pass (`aria-live` for new messages, reduced-motion)

## Docs

- [`docs/todo.md`](docs/todo.md) — implementation checklist
- [`docs/architecture.md`](docs/architecture.md) — folders, env, Docker-ready notes

## Docker

The app builds to a static `dist/` (nginx-friendly). A full `Dockerfile` is optional later; `.dockerignore` is already in place.
