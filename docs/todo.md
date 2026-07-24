# Chat app todo

Living checklist for the Doodle frontend challenge. Check items as slices land. After every section, run the **Review gate** before moving on.

## Challenge requirements (track against these)

- [x] React + TypeScript chat UI (Vite SPA)
- [x] Responsive on common browsers + mobile
- [x] Clear readable architecture
- [x] Frequent descriptive commits
- [x] Performance minded (fast load, efficient mobile rendering)
- [x] Accessibility prioritized
- [x] Design attention to mockups (not pixel-perfect)

## 1. Scaffold

- [x] Vite + React + TypeScript app created
- [x] `.cursor/rules/` added (project, architecture, React/TS, styling, testing, commits, review-gate)
- [x] `docs/todo.md` + `docs/architecture.md`
- [x] `.env.example`, `.env`, `.env.local` pattern documented
- [x] `.dockerignore` (Docker-ready footing)
- [x] Lint / format / typecheck / test scripts wired
- [x] **Review gate:** review scaffold; fix; `npm run typecheck` + `npm run lint`

## 2. Design shell

- [x] Copy `Body BG.png` to `public/`
- [x] CSS variables (colors, spacing from annotated assets)
- [x] Full-height chat layout + sticky composer placeholder
- [x] **Review gate:** review layout/CSS; visual smoke in browser

## 3. API client

- [x] Typed `getMessages` / `createMessage` with Bearer auth
- [x] Error mapping (401 / 400 / 5xx)
- [x] Vitest unit tests (success, validation, unauthorized)
- [x] **Review gate:** review client + tests; re-run `npm test`

## 4. E2E harness (early)

- [x] Playwright installed and configured
- [x] Smoke E2E: app boots, shell visible
- [x] **Review gate:** review Playwright setup; re-run smoke E2E

## 5. Message UI

- [x] `MessageBubble` incoming vs outgoing (`VITE_CURRENT_AUTHOR`)
- [x] `MessageList`
- [x] Timestamp formatting; HTML entity decode for seed content
- [x] Component tests (a11y / rendering)
- [x] Incremental E2E: messages render; incoming vs outgoing
- [x] **Review gate:** review UI + tests; re-run unit + E2E smoke

## 6. Load + poll

- [x] `useMessages`: initial load, poll `after=`, merge by `_id`
- [x] Loading / error UI
- [x] Incremental E2E: loads live messages (API up)
- [x] **Review gate:** review hook; re-run unit + E2E

## 7. Composer / send

- [x] Composer validation + pending state + Enter to send
- [x] Unit/integration tests for hook + composer
- [x] Incremental E2E: send appears as outgoing
- [x] **Review gate:** review send path; re-run unit + E2E

## 8. Polish + README

- [x] Responsive + a11y pass (focus, labels, `aria-live` as needed)
- [x] Reviewer README (run API + FE, env table, assumptions)
- [x] **Review gate:** final polish review

## 9. Full E2E suite (largest, at the end)

- [x] Happy path, validation, keyboard send, mobile viewport, a11y smoke
- [x] **Review gate:** full suite green

## 10. OPTIONAL — Docker packaging

- [x] Multi-stage `Dockerfile` (+ nginx) 
- [x] Documented in README

## Definition of done

- [x] API running locally; FE loads messages and can send
- [x] Unit tests green; E2E suite green (or documented skips)
- [x] `docs/todo.md` checkboxes reflect reality
- [x] Ready to email repo link with subject `FE-<yourname>`
