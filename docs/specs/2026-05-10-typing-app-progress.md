# Typing App — Phase Progress Log

This file is appended once per phase as the typing-team-leader executes
phases 3-9 of the plan. Earlier phases (0-2) are documented in commit
history (`1af4db6`..`0d23afe`).

## Phase 3 — Anonymous E2E

Status: complete.

Commits:

- `8966eda` feat(typing): public lesson API + progress page + anonymous E2E

Files added:

- `packages/layers/typing/server/api/typing/lessons/index.get.ts`
- `packages/layers/typing/server/api/typing/lessons/[id].get.ts`
- `packages/layers/typing/app/components/typing/StageMap.vue`
- `packages/layers/typing/app/components/typing/KeyHeatmap.vue`
- `packages/layers/typing/app/pages/typing/progress.vue`
- `packages/blog/e2e/typing-anonymous.spec.ts`

Verification: `pnpm typecheck`, `pnpm lint`, `pnpm test --run` all clean.
Skipped Playwright screenshot in this phase to conserve dev-server cycles
since the layouts are basic Tailwind static markup. Phase 7 game work and
Phase 8 spelling import will produce screenshots where the visual diff
matters most.

## Phase 4 — Groups + learners + act-as

Status: complete.

Commits:

- `03a9486` feat(typing): groups, learners, invites, act-as switcher, progress merge

Files added:

- Server: `groups/index.get.ts`, `index.post.ts`, `[id].get.ts`, `[id].put.ts`,
  `[id]/invite.post.ts`, `[id]/join.post.ts`,
  `[id]/learners/index.get.ts`, `index.post.ts`, `[learnerId].put.ts`.
- Server: `progress/index.get.ts`, `index.post.ts`, `merge.post.ts`.
- Server utils: `groups.ts`, `require-guardian.ts`.
- Client composable: `useActiveLearner.ts`. `useTypingProgress` updated
  to mirror writes to the server when a learner is active.
- Client component: `LearnerSwitcher.vue` mounted in the typing layout.
- Pages: `group/index.vue`, `group/learners.vue`, `join/[token].vue`,
  `sign-in.vue`.
- Integration tests: `packages/blog/server/api/typing/groups.integration.test.ts`
  (5 describe blocks, 9 tests; all pass against local Postgres).

Decisions / deviations:

- `groups.ts` imports `useDrizzle` and `tables` explicitly rather than
  relying on Nitro auto-imports so the helper is callable from Vitest.
- The integration test exercises helper functions and direct DB writes
  rather than spinning up the full Nitro routes; auth/Zod validation on
  the routes is exercised via the Phase 7+ Playwright flows.
- `useActiveLearner` defaults to `'anon'` and persists to a cookie; UI
  composables fall back to localStorage for anonymous progress.

Verification: `pnpm typecheck`, `pnpm lint`, `pnpm test --run`,
`pnpm test:integration -- --run typing` all clean.

## Phase 5 — AI topic games

Status: complete (live integration test gated).

Commits:

- `54b8a6e` feat(typing): AI topic-game generator + safety review + topics UI

Files added:

- `server/utils/typing/lesson-safety.ts` — block list + Claude Haiku
  safety review (temp 0).
- `server/utils/typing/lesson-generator.ts` — Claude Haiku (temp 0.3),
  constrained to unlocked keys, 2 retries.
- `server/api/typing/lessons/generate.post.ts` — public route,
  in-memory rate limit (10/day anon, 30/day authed).
- `app/components/typing/TopicGameForm.vue` + `app/pages/typing/topics.vue`.
- `lesson-generator.test.ts` (10 unit tests, all passing).
- `lesson-generator.integration.test.ts` (gated on `RUN_INTEGRATION=1`).

Decisions / deviations:

- Both `generateLesson` and `aiSafetyReview` accept an optional
  `client` parameter — tests inject a stub; production calls
  `getAnthropicClient()` by default. Avoided `vi.mock` because the
  Nuxt vitest environment was unreliable with relative-path mocks.
- The test hit a length-validation failure on the first run; lesson
  text was bumped to 70 chars to match the `LENGTH_BOUNDS.short`
  60-160 floor.
- Live integration tests stay skipped (no `RUN_INTEGRATION` flag).
  The user can enable them with `RUN_INTEGRATION=1 pnpm test ...`.

Verification: `pnpm typecheck`, `pnpm lint`, `pnpm test --run` (451
passing) clean.
