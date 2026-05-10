# Typing App Launch Plan

How to resume the reading-to-typing-app refactor in a fresh Claude Code session.

## Current state (main, commit `9a77464`)

- 5 typing-\* agents and `/typing-team` slash command in `.claude/`
- Design spec: `docs/specs/2026-05-10-typing-app-design.md`
- Implementation plan: `docs/specs/2026-05-10-typing-app-plan.md`
- Reading-\* agents and `/reading-team` slash command deleted
- Reading code (`packages/layers/reading/`, `server/database/schema/reading.ts`, `e2e/reading.spec.ts`, `public/images/reading/`) is still on main — Phase 0 of the plan removes it as a hard cutover

## Background agent already running (optional cleanup first)

A background `general-purpose` agent was launched in a previous session to execute all 9 phases. It's running in a temp worktree on branch `feature/typing-app`. If you want a clean start in your new terminal session:

```bash
# In your new session, check for the worktree and kill the agent if needed:
git worktree list
# If you see a worktree on feature/typing-app, you can keep it, remove it, or let the new session pick up where it left off (the leader will commit to the same branch).
```

The background agent SendMessage's progress updates after each phase, so if it's already partway through, look for those updates in your previous session before deciding.

## The prompt to paste into a fresh Claude Code session

Copy everything between the lines below into Claude Code in `~/code/p/blog-repos/blog-primary`:

---

```
/typing-team execute all 9 phases of the typing app build end-to-end.

Branch: feature/typing-app (create from main if it doesn't exist; check git worktree list first to see if a prior worktree is in flight).

Process:
- Phase 0: hard cutover (you do this directly, not delegated). git mv reading layer to typing, rip inner files, recreate minimal nuxt.config.ts + package.json, delete reading schema/e2e/public images, update root CLAUDE.md.
- Phase 1: typing-db schema + curriculum seed.
- Phase 2: typing-engine + typing-ui in parallel — engine composables + tests, lesson UI shell, public lesson routes.
- Phase 3: anonymous E2E — progress.vue + e2e/typing-anonymous.spec.ts.
- Phase 4: groups + learners + act-as — full multi-guardian flow with LearnerSwitcher.
- Phase 5: AI topic games (typing-ai) — Claude Haiku constrained generation + safety review + public rate-limited route.
- Phase 6: audio (typing-ui) — Google Cloud TTS Chirp3 with on-disk cache + Web Speech fallback.
- Phase 7: games framework + 3 starter games (typing-games) — PixiJS, mirroring components/poker/PokerTable.vue. Letter Rain, Letter Tic-Tac-Toe, Lake Leap.
- Phase 8: spelling lists (typing-ai + typing-engine + typing-ui + typing-games) — Claude Sonnet 4 vision worksheet extraction, auto-lesson generation, mastery tracking, Lake Leap spelling mode.
- Phase 9: polish — mastery gating, empty states, Lighthouse, root CLAUDE.md.

Conventions:
- Conventional commits scoped `typing:` (feat/fix/chore/test/style). Commit per logical unit.
- After every phase run `pnpm typecheck && pnpm lint && pnpm test -- --run`. Phase 4+ also `pnpm test:integration`. Phase 3+, 7+, 8 also Playwright screenshots saved to /tmp/typing-phaseN-<surface>.png.
- Fix every test failure — no pre-existing-failure carve-outs.
- After every phase, SendMessage me a short summary: phase N done, commit hashes, what's next.
- If an external service is unavailable (no ANTHROPIC_API_KEY for phase 5/8 live tests, no GOOGLE_TTS_KEY for phase 6) — implement code anyway, run mocked unit tests, mark live integration tests as gated/skipped, note this in the summary so I can run them later.
- Pre-commit hooks (oxfmt + nuxt typecheck) may modify staged files; re-stage and create a new commit if needed. Never use --no-verify.
- Make reasonable calls on ambiguity and continue; note the call in the next summary.

Definition of done: design spec's "Verification" section passes end to end. Anonymous user runs stage 1 lesson; sign in -> create family -> add Logan; invite spouse via link; both can act-as Logan; spelling-worksheet photo extracts words and Logan plays Lake Leap with them; topic game ("Poppy Playtime") generates kid-safe Lake Leap round; Letter Rain / Tic-Tac-Toe playable; sign-in merges anonymous progress.

When fully done, send a final summary: every commit hash by phase, screenshot paths, any gated tests that need keys, and recommended next step.
```

---

## What you'll see when it runs

1. Team-leader reads the spec/plan, creates `feature/typing-app`, and starts Phase 0.
2. After each phase, a SendMessage notification appears in your terminal with commit hashes + status.
3. Verification fails will be auto-fixed by the team before the phase reports complete.
4. Final SendMessage at the end with the full commit log + recommended next step (open PR, deploy, iterate, etc.).

Estimated total time: hours, not minutes — it's substantial work. Background mode is fine; you can do other things in the same session and the agent will keep going.

## If you want to do less than all 9 phases

Replace the phase list in the prompt with the subset, e.g. "phases 0, 1, 2, 4 (skip 3 for now; 5-9 follow up)". The team-leader handles partial runs the same way.

## Re-running a specific phase later

Just `/typing-team do phase N` after the foundation is in place. The leader respects whatever phase you point it at.
