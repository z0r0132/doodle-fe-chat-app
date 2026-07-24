# Chat App (Doodle Frontend Challenge)

React + TypeScript chat UI for the Doodle frontend engineer challenge. Talks to the [Frontend Challenge Chat API](https://github.com/DoodleScheduling/frontend-challenge-chat-api).

## Quick start (reviewers)

**1. Start the Chat API** ([Frontend Challenge Chat API](https://github.com/DoodleScheduling/frontend-challenge-chat-api)):

```bash
docker compose up -d
# health: http://localhost:3000/health
# swagger: http://localhost:3000/api/v1/docs
```

**2. Start this app:**

```bash
cp .env.example .env.local   # optional
npm install
npm run dev
```

Open http://localhost:5173. You should see seeded messages, then be able to send as `VITE_CURRENT_AUTHOR` (default `You` — yellow / right-aligned).

**3. Checks:**

```bash
npm run typecheck
npm test
npm run test:e2e   # requires API on :3000
```

## Assumptions

- Outgoing bubbles = messages whose `author` equals `VITE_CURRENT_AUTHOR`.
- “Realtime” = polling `GET /api/v1/messages?after=<newestCreatedAt>` (API has no WebSocket).
- List order follows the API (oldest first).
- Message body is plain text; HTML entities from the API are decoded for display only (no HTML rendering).

## Environment

See `.env.example`. Use `.env.local` for local overrides (gitignored).

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API origin (`http://localhost:3000` locally) |
| `VITE_API_TOKEN` | Bearer token |
| `VITE_CURRENT_AUTHOR` | Your display author (outgoing bubbles) |
| `VITE_POLL_INTERVAL_MS` | Poll interval for new messages |

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Local Vite dev server |
| `npm run build` | Typecheck + production build → `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run typecheck` | TypeScript project references check |
| `npm run lint` | Oxlint |
| `npm test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright E2E (starts Vite if needed; API required for load/send) |
| `npm run format` | Prettier |

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
- Encryption is not the right tool here; the usual approaches are:
  - **Keep plain text** (current) — safest and enough for this challenge.
  - **Constrained Markdown** (e.g. bold/italic/links only) → parse to HTML → **sanitize** with a library like DOMPurify before render.
  - **Structured rich text** (Slate/ProseMirror) — overkill unless editing UX is a product goal.

If product later needed bold/icons/emoji shortcodes, I’d add a small Markdown (or token) subset + sanitization, not open-ended HTML.

### Realtime transport

The provided API exposes REST only. “Realtime” is implemented with **polling** `?after=`. If the backend added WebSockets/SSE later, the UI could swap the poll loop for a subscription while keeping the same merge-by-`_id` model.

### Other “if we had more time / larger app”

- Infinite scroll upward via `?before=` for history
- Pause polling when the tab is hidden (`document.visibilityState`)
- Further a11y tooling (axe CI) beyond current labels, live region, and focus styles

## Docs

- [`docs/todo.md`](docs/todo.md) — implementation checklist
- [`docs/architecture.md`](docs/architecture.md) — folders, env, Docker-ready notes

## Docker

Multi-stage image: Node builds `dist/`, nginx serves it on port 80.

```bash
docker build -t doodle-chat-app .
docker run --rm -p 8080:80 doodle-chat-app
```

Open http://localhost:8080. Override API URL/token at build time if needed:

```bash
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:3000 \
  --build-arg VITE_API_TOKEN=super-secret-doodle-token \
  --build-arg VITE_CURRENT_AUTHOR=You \
  -t doodle-chat-app .
```

Note: the browser calls the API from the user’s machine, so `VITE_API_BASE_URL` must be reachable from the browser (e.g. `http://localhost:3000` when the Chat API runs locally).

## Submission

Email the repo link to `code-challenge@doodle.com` with subject `FE-<yourname>`.
