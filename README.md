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
| `npm run format` | Prettier |

## Environment

See `.env.example`. Use `.env.local` for local overrides (gitignored).

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API origin |
| `VITE_API_TOKEN` | Bearer token |
| `VITE_CURRENT_AUTHOR` | Your display author (outgoing bubbles) |
| `VITE_POLL_INTERVAL_MS` | Poll interval for new messages |

## Docs

- [`docs/todo.md`](docs/todo.md) — implementation checklist
- [`docs/architecture.md`](docs/architecture.md) — folders, env, Docker-ready notes

## Docker

The app builds to a static `dist/` (nginx-friendly). A full `Dockerfile` is optional later; `.dockerignore` is already in place.
