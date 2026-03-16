---
name: reading-team
description: Launch the reading app development team — 4 feature-sliced teammates (db, ui, ai-pipeline, srs) coordinated by a lead
arguments:
  - name: task
    description: What to work on (e.g. "create demo page with 3 curated stories", "add anonymous browsing support")
    required: true
---

Launch the reading app development team for: $ARGUMENTS

## Context

The reading app lives at `/reading` within the blog. Key references:
- **Design spec:** `docs/specs/2026-03-15-reading-app-design.md`
- **Implementation plan:** `docs/specs/2026-03-15-reading-app-plan.md`
- **Branch:** `feature/reading-app`

## Team Structure

Create an agent team with 4 feature-sliced teammates. Each owns distinct files to avoid merge conflicts.

### Teammate: reading-db
Schema, migrations, types, seed data, test helpers.
**Owns:** `server/database/schema/reading.ts`, `shared/reading-types.ts`, `server/test-utils/db-helper.ts`, `server/utils/reading/phonics-seed.ts`

### Teammate: reading-ui
Pages, components, client composables (TTS, activeChild).
**Owns:** `app/pages/reading/`, `app/components/reading/`, `app/composables/useTTS.ts`, `app/composables/useActiveChild.ts`
Note: `useSRS.ts` and `usePhonics.ts` are owned by reading-srs.

### Teammate: reading-ai
Story generation pipeline, phonics validation, safety review.
**Owns:** `server/utils/reading/phonics-validator.ts`, `server/utils/reading/story-generator.ts`, `server/utils/reading/story-safety.ts`, `server/api/reading/stories/`

### Teammate: reading-srs
SRS engine, child profiles, phonics progress, session recording.
**Owns:** `app/composables/useSRS.ts`, `app/composables/usePhonics.ts`, `server/api/reading/srs/`, `server/api/reading/children/`, `server/api/reading/sessions/`

## Lead Responsibilities

1. Read the design spec and plan for full context
2. Break the requested task into sub-tasks, one per teammate
3. Assign tasks via the shared task list with dependencies
4. Require plan approval before teammates implement
5. After all teammates finish, run verification: `pnpm typecheck && pnpm lint && pnpm test -- --run`
6. Report results back

## Key Conventions

- Use `getAnthropicClient()` from `utils/ai/anthropic.ts` (never `new Anthropic()`)
- Use `requireChildOwner(event, childId)` for auth in reading API routes
- Drizzle schema in `server/database/schema/reading.ts`, barrel in `schema/index.ts`
- Nuxt auto-imports: don't import `ref`, `computed`, `useFetch`, `defineEventHandler`, `useDrizzle`, `tables`, `eq`, `and`, `getUserSession`, `createError`, etc.
- Test IDs in `shared/test-ids.ts` under `TEST_IDS.READING.*`
- Commit after each task with descriptive messages
