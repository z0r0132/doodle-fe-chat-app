# Architecture

## App shape

Vite + React + TypeScript SPA. Static build output in `dist/` (nginx-friendly later).

```
src/
  api/         HTTP client + message endpoints
  components/  Presentational UI
  config/      env.ts (only place reading import.meta.env)
  hooks/       useMessages and related data hooks
  styles/      Global CSS / tokens
  types/       Shared types
e2e/           Playwright specs (incremental, then full suite)
```

## Env

| Variable | Purpose |
|----------|---------|
| `VITE_API_BASE_URL` | Chat API origin (local: `http://localhost:3000`) |
| `VITE_API_TOKEN` | Bearer token |
| `VITE_CURRENT_AUTHOR` | Author string for outgoing (“you”) messages |
| `VITE_POLL_INTERVAL_MS` | Poll interval for `?after=` fetches |

- Committed: `.env.example`, production-oriented `.env`
- Local overrides: `.env.local` (gitignored via `*.local`)

## Current user

Outgoing (yellow, right-aligned, no author label) when `message.author === VITE_CURRENT_AUTHOR`.

## Realtime

No WebSocket in the API. Poll `GET /api/v1/messages?after=<newestCreatedAt>`.

## Design shell

- Tiled background: `public/body-bg.webp` — full 1536×1180 **lossless** WebP of challenge `Body BG.png` (~103KB vs ~514KB PNG, same pixels)
- Layout: `ChatLayout` (scrollable feed + sticky footer) + `ComposerShell` (visual only until send is wired)

## Docker-ready

- Multi-stage `Dockerfile`: `node` build → `nginx` serve `dist/`
- Build-time `VITE_*` args (see README)
- `.dockerignore` excludes `node_modules`, `dist`, `.env.local`, Playwright artifacts
