# Typing App Implementation Plan

Sequenced cutover from `packages/layers/reading/` to `packages/layers/typing/`, then five vertical slices: foundations, anonymous engine + UI, AI topic games, audio, **groups + learners**, **games framework + 3 starter games**, and **spelling lists**.

Branch: `feature/typing-app`. Each task lists the owning teammate. Conventional commits, scope `typing`.

## Phase 0 — Cutover (typing-team-leader runs this directly)

> **Hard cutover.** No reading routes, tables, or assets remain after this phase.

0.1 `git checkout -b feature/typing-app` (from `main`).
0.2 `git mv packages/layers/reading packages/layers/typing` then `git rm -r packages/layers/typing/{app,server,nuxt.config.ts,package.json}` — keep the directory shell, rebuild every file.
0.3 Recreate `packages/layers/typing/nuxt.config.ts` and `package.json` minimally so the layer registers.
0.4 `git rm -r packages/blog/public/images/reading` and `rm -f packages/blog/server/database/schema/reading.ts` (typing-db replaces it).
0.5 `git rm packages/blog/e2e/reading.spec.ts`.
0.6 Update root `CLAUDE.md` to describe the typing app instead of the reading app.
0.7 Commit: `chore(typing): cutover from reading to typing layer`.

## Phase 1 — Foundation: schema, types, curriculum (typing-db)

1.1 Schema: `typing_groups`, `typing_group_members`, `typing_group_invites`, `typing_learners`, `typing_lessons`, `typing_attempts`, `typing_key_stats`, `typing_spelling_lists`, `typing_spelling_progress`. Indexes per design spec.
1.2 Shared types in `packages/blog/shared/typing-types.ts`: `TypingGroup`, `Guardian`, `Learner`, `LessonRow`, `AttemptRow`, `KeyStat`, `LocalProgress`, `SpellingList`, `SpellingProgress`, `StageDefinition`.
1.3 Curriculum seed in `server/utils/typing/curriculum.ts` — full 20-stage table with 3-5 built-in lessons per stage.
1.4 Seed endpoint `server/api/typing/_seed.post.ts` (admin-only, idempotent).
1.5 Test helpers: `db-helper.ts` additions for typing tables (insert group + learner factories).

## Phase 2 — Engine + lesson UI shell (typing-engine + typing-ui in parallel)

2.1 (typing-engine) `useTypingEngine` composable: cursor, char-by-char input, error tracking, gross + net WPM, accuracy, per-key error counts, `complete` event. Pure TS. Unit tests cover all branches.
2.2 (typing-engine) `useTypingProgress` composable: localStorage read/write under `typing:progress:v1`, schema-versioned. Anonymous-first; logged-in users hit `/api/typing/progress?learnerId=`.
2.3 (typing-engine) `useVirtualKeyboard` composable: next-key derivation, finger/color mapping, shift state.
2.4 (typing-ui) `VirtualKeyboard.vue` + `HandHint.vue` (HTML/SVG). Color-coded fingers, next-key glow, correct/wrong flash.
2.5 (typing-ui) `LessonRunner.vue` wires engine + keyboard + WPM meter.
2.6 (typing-ui) `pages/typing/index.vue` (lesson picker) + `pages/typing/lesson/[id].vue`.

## Phase 3 — Anonymous flow E2E (typing-engine + typing-ui)

3.1 (typing-engine) `lessons/index.get.ts`, `lessons/[id].get.ts` — public.
3.2 (typing-ui) Anonymous user can complete a stage 1 drill end-to-end. Progress persists across page refresh.
3.3 (typing-ui) `pages/typing/progress.vue` with `StageMap` + `KeyHeatmap` reading from `useTypingProgress`.
3.4 E2E spec: `e2e/typing-anonymous.spec.ts`.

## Phase 4 — Groups, learners, act-as (typing-engine + typing-ui + typing-db)

> **Why this comes before topic games**: progress routes need a learner identity. We migrate progress to be `learnerId`-keyed here, before adding more storage paths.

4.1 (typing-db) Migration helpers if needed; `typing-db` work is already done in phase 1.
4.2 (typing-engine) `groups/index.get.ts`, `groups/index.post.ts`, `groups/[id].get.ts`, `groups/[id].put.ts`.
4.3 (typing-engine) `groups/[id]/learners/*.ts` CRUD.
4.4 (typing-engine) `groups/[id]/invite.post.ts` (generate token), `groups/[id]/join.post.ts` (accept token).
4.5 (typing-engine) `useActiveLearner` composable (cookie + `useState`). Auto-creates a default learner when first guardian creates a family.
4.6 (typing-engine) Re-key `progress/index.{get,post}.ts` and `progress/merge.post.ts` to `learnerId` — anonymous merge writes to the active learner at sign-in.
4.7 (typing-engine) `require-guardian.ts` helper — validates session user is a guardian of the targeted group.
4.8 (typing-ui) `pages/typing/group/index.vue` + `group/learners.vue` + `pages/typing/join/[token].vue`.
4.9 (typing-ui) `LearnerSwitcher.vue` in the layout header. Shows active learner + dropdown.
4.10 E2E: `e2e/typing-group-invite.spec.ts` (invite -> join -> switch learner -> record attempt).

## Phase 5 — AI topic games (typing-ai)

5.1 `lesson-safety.ts` — block list + AI safety review; pattern from old reading app.
5.2 `lesson-generator.ts` — Claude Haiku topic generator. Constrained to unlocked keys; regex validation; up to 2 retries.
5.3 `lessons/generate.post.ts` — public route, IP-rate-limited (10/day) for anon, user-rate-limited (30/day) for authed.
5.4 (typing-ui) `TopicGameForm.vue` + `pages/typing/topics.vue`.
5.5 Tests: `lesson-generator.test.ts` (mocked Anthropic), `lesson-generator.integration.test.ts` (live, gated).

## Phase 6 — Audio (typing-ui)

6.1 `server/utils/typing/tts.ts` — Google Cloud TTS Chirp3 client + on-disk cache `public/audio/typing/<hash>.mp3`.
6.2 `audio/[phrase].get.ts` — content-addressed audio endpoint.
6.3 `useTypingAudio` composable — preload key names a-z + encouragement phrases. Web Speech API fallback if `TYPING_TTS_PROVIDER` unset.
6.4 Settings toggle for per-key audio (default on stages 1-5).

## Phase 7 — Games framework + 3 starter games (typing-games)

7.1 `useGameRunner.ts` composable — PixiJS `Application` lifecycle, resize observation, audio bus, keypress subscription via `useTypingEngine`. Pattern lifted from `components/poker/PokerTable.vue`.
7.2 `components/typing/games/GameStage.vue` — host wrapper that mounts a game scene by slug.
7.3 `LetterRain.ts` — falling letters, particle bursts on hit, miss counter, 60s round.
7.4 `LetterTicTacToe.ts` — 3x3 grid, single-letter cells, AI opponent (random L1-2; minimax L3+).
7.5 `LakeLeap.ts` — side-scrolling platformer; words on platforms; type to jump. Supports curriculum, topic, and spelling-list modes.
7.6 (typing-engine) `pages/typing/game/[slug].vue` route with config (mode, source list).
7.7 (typing-engine) `recordGameAttempt` extension to `useTypingProgress` — attempt rows tagged with `gameSlug`.
7.8 Tests: unit tests for game scoring logic; E2E `e2e/typing-game-letter-rain.spec.ts` smoke.

## Phase 8 — Spelling lists (typing-ai + typing-engine + typing-ui)

8.1 (typing-ai) `spelling-extractor.ts` — Claude Sonnet 4 vision; strict JSON output; validation.
8.2 (typing-engine) `spelling/extract.post.ts` (multipart image upload), `spelling/index.{get,post}.ts`, `spelling/[id].{put,delete}.ts`. Auth: guardian-of-learner.
8.3 (typing-ai) `spelling-lessons.ts` — auto-generate drill + mixed-sentence lesson rows from a spelling list. Sentence is Haiku-generated, safety-reviewed, key-constrained.
8.4 (typing-engine) Spelling mastery hook in `progress/index.post.ts`: when an attempt completes, scan `errorsByKey` + the source text and update `typing_spelling_progress` for any spelling list referenced by the lesson.
8.5 (typing-ui) `pages/typing/spelling/index.vue` (active week + history).
8.6 (typing-ui) `pages/typing/spelling/new.vue` with `SpellingListForm.vue` (paste/type) and `SpellingImageDropzone.vue` (drop or upload, calls `extract.post.ts`, lets guardian confirm before save).
8.7 (typing-ui) `SpellingMasteryCard.vue` on the learner home — surfaces this week's list with progress and a "Play Lake Leap with these words" CTA.
8.8 (typing-games) Lake Leap "spelling mode" plumbing — accepts a `spellingListId` and pulls words from it.
8.9 E2E: `e2e/typing-spelling-import.spec.ts` (mocked vision -> confirm -> lake leap).

## Phase 9 — Polish

9.1 Curriculum mastery gating (95% acc + target WPM) and stage advancement.
9.2 Friendly empty/error states across pages.
9.3 Lighthouse pass on `/typing`, `/typing/lesson/<id>`, `/typing/game/<slug>`.
9.4 Update `CLAUDE.md` description of the typing feature.

## Verification After Each Phase

- `pnpm typecheck && pnpm lint && pnpm test -- --run`
- Phase 3+: also `pnpm dev` + Playwright screenshot of `/typing` + the lesson runner.
- Phase 4+: also `pnpm test:integration` for groups + merge routes.
- Phase 7+: Playwright screenshot of each game.
- Phase 8: Playwright screenshot of spelling-import flow with a fake worksheet image.

## Out of scope (post-MVP)

- Learner-direct login (kids logging in themselves with their own credential).
- Cross-group learners in the UI (schema supports it; UI ships single-group-per-learner first).
- Leaderboards / social.
- Custom keyboard layouts (Dvorak, Colemak).
- Mobile / on-screen tap-typing — desktop physical keyboard only for MVP.
- Additional games beyond the starter 3 — add after watching what kids gravitate to.
