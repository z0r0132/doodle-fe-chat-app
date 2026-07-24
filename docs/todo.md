# Chat app todo

Living checklist for the Doodle frontend challenge. Check items as slices land. After every section, run the **Review gate** before moving on.

## Challenge requirements (track against these)

- [x] React + TypeScript chat UI (Vite SPA)
- [ ] Responsive on common browsers + mobile
- [ ] Clear readable architecture
- [ ] Frequent descriptive commits
- [ ] Performance minded (fast load, efficient mobile rendering)
- [ ] Accessibility prioritized
- [ ] Design attention to mockups (not pixel-perfect)

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

- [ ] `useMessages`: initial load, poll `after=`, merge by `_id`
- [ ] Loading / error UI
- [ ] Incremental E2E: loads live messages (API up)
- [ ] **Review gate:** review hook; re-run unit + E2E

## 7. Composer / send

- [ ] Composer validation + pending state + Enter to send
- [ ] Unit/integration tests for hook + composer
- [ ] Incremental E2E: send appears as outgoing
- [ ] **Review gate:** review send path; re-run unit + E2E

## 8. Polish + README

- [ ] Responsive + a11y pass (focus, labels, `aria-live` as needed)
- [ ] Reviewer README (run API + FE, env table, assumptions)
- [ ] **Review gate:** final polish review

## 9. Full E2E suite (largest, at the end)

- [ ] Happy path, validation, keyboard send, mobile viewport, a11y smoke
- [ ] **Review gate:** full suite green

## 10. OPTIONAL — Docker packaging

- [ ] Multi-stage `Dockerfile` (+ optional compose) **or**
- [ ] Consciously skip and note in README: build is Docker-ready via static `dist/`

## Definition of done

- [ ] API running locally; FE loads messages and can send
- [ ] Unit tests green; E2E suite green (or documented skips)
- [ ] `docs/todo.md` checkboxes reflect reality
- [ ] Ready to email repo link with subject `FE-<yourname>`
