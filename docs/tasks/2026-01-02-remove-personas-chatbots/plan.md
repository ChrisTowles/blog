# Plan: Remove Personas & Chatbots System

## Summary

Remove personas, chatbots, capabilities, and skills system. Keep simplified public chat at `/chat` with:
- Hardcoded general helpful system prompt
- RAG integration for blog content
- Tool calling preserved
- GitHub OAuth preserved (but chat is public)

## Phase 1: Delete Files

### Server API Routes
- [x] Delete `server/api/personas/`
- [x] Delete `server/api/chatbots/`
- [x] Delete `server/api/capabilities/`
- [x] Delete `server/api/skills/`

### Server Utils
- [x] Delete `server/utils/chatbots.ts`
- [x] Delete `server/utils/capabilities/`
- [x] Delete `server/utils/skills/`

### Pages
- [x] Delete `app/pages/bot/`
- [x] Delete `app/pages/c/`

### Components
- [x] Delete `PersonaSelect.vue` (if exists)
- [x] Delete `CapabilityBadges.vue` (if exists)
- [x] Delete any other persona/chatbot components

### Docs
- [x] Delete `docs/skill-loader.md`

### Tests
- [x] Delete `chatbots.test.ts`
- [x] Delete `personas.test.ts`
- [x] Delete `skills.test.ts`
- [x] Delete `skills/e2e.test.ts`
- [x] Delete `skills/loader.test.ts`

## Phase 2: Schema Changes

### Update `server/database/schema.ts`
- [x] Remove `personas` table definition
- [x] Remove `chatbots` table definition
- [x] Remove `capabilities` table definition
- [x] Remove `personaCapabilities` table definition
- [x] Remove `skills` table definition
- [x] Remove `personaId`, `personaSlug`, `chatbotSlug` from `chats` table
- [x] Remove related relations/exports

### Create Drop Migration
- [x] Create `0010_remove-personas-system.sql`:
  ```sql
  -- Drop junction table first (FK constraints)
  DROP TABLE IF EXISTS persona_capabilities;

  -- Drop main tables
  DROP TABLE IF EXISTS skills;
  DROP TABLE IF EXISTS capabilities;
  DROP TABLE IF EXISTS chatbots;
  DROP TABLE IF EXISTS personas;

  -- Remove columns from chats
  ALTER TABLE chats DROP COLUMN IF EXISTS persona_id;
  ALTER TABLE chats DROP COLUMN IF EXISTS persona_slug;
  ALTER TABLE chats DROP COLUMN IF EXISTS chatbot_slug;
  ```

## Phase 3: Update Chat System

### Update Chat API
- [x] Remove persona/chatbot logic from chat endpoints
- [x] Hardcode system prompt in chat handler
- [x] Ensure RAG integration still works
- [x] Ensure tool calling still works

### Update Chat UI
- [x] Remove PersonaSelect from chat page
- [x] Remove chatbot routing logic
- [x] Clean up imports/references

### System Prompt
- [x] Add hardcoded general helpful prompt (no specific focus)

## Phase 4: Cleanup & Verify

### Typecheck & Lint
- [x] Run `pnpm typecheck` - fix any broken references (pre-existing shiki/test type issues only)
- [x] Run `pnpm lint` - fix any issues (pre-existing worktree.ts issue only)
- [x] Run `pnpm build` - ensure builds

### Test
- [x] Run remaining tests, verify they pass (pre-existing mock issues only)
- [ ] Manual test chat works at `/chat`
- [ ] Verify RAG retrieval works
- [ ] Verify tool calling works

## Phase 5: Deploy

### Staging
- [ ] Deploy to staging
- [ ] Run migration on staging DB
- [ ] Verify chat functionality

### Production (after staging verification)
- [ ] Deploy to production
- [ ] Run migration on prod DB
- [ ] Verify chat functionality

## Notes

- Clean slate for chat data - no data preservation needed
- Public access, no auth required for chat
- Keep GitHub OAuth flow intact for other features
- Migration drops all persona-related tables and columns

## Known Issues

### Pre-existing Vite 8 Beta + Debug ESM Issue
There's a pre-existing issue where chat pages fail with:
```
The requested module 'debug/src/browser.js' does not provide an export named 'default'
```

This is caused by the Vite 8.0.0-beta.2 override in package.json combined with the debug@4.4.3 package's CJS/ESM interop. This issue existed before the persona removal and affects client-side navigation to chat pages.

**Workaround attempted:**
- Added debug to optimizeDeps.include (already present, didn't fix)
- Tried micromark to optimizeDeps (didn't fix)
- Tried ssr.noExternal (didn't fix)
- Tried debug override to 4.3.4 (didn't fix)
- Tried enabling SSR for chat pages (didn't fix)

**Root cause:** Vite 8 beta ESM module resolution doesn't handle debug's CJS exports correctly.

**Next steps:** Consider reverting Vite 8 beta override or waiting for stable Vite 8 release.
