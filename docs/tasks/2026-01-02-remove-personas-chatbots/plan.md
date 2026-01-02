# Plan: Remove Personas & Chatbots System

## Summary

Remove personas, chatbots, capabilities, and skills system. Keep simplified public chat at `/chat` with:
- Hardcoded general helpful system prompt
- RAG integration for blog content
- Tool calling preserved
- GitHub OAuth preserved (but chat is public)

## Phase 1: Delete Files

### Server API Routes
- [ ] Delete `server/api/personas/`
- [ ] Delete `server/api/chatbots/`
- [ ] Delete `server/api/capabilities/`
- [ ] Delete `server/api/skills/`

### Server Utils
- [ ] Delete `server/utils/chatbots.ts`
- [ ] Delete `server/utils/capabilities/`
- [ ] Delete `server/utils/skills/`

### Pages
- [ ] Delete `app/pages/bot/`
- [ ] Delete `app/pages/c/`

### Components
- [ ] Delete `PersonaSelect.vue` (if exists)
- [ ] Delete `CapabilityBadges.vue` (if exists)
- [ ] Delete any other persona/chatbot components

### Docs
- [ ] Delete `docs/skill-loader.md`

### Tests
- [ ] Delete `chatbots.test.ts`
- [ ] Delete `personas.test.ts`
- [ ] Delete `skills.test.ts`
- [ ] Delete `skills/e2e.test.ts`
- [ ] Delete `skills/loader.test.ts`

## Phase 2: Schema Changes

### Update `server/database/schema.ts`
- [ ] Remove `personas` table definition
- [ ] Remove `chatbots` table definition
- [ ] Remove `capabilities` table definition
- [ ] Remove `personaCapabilities` table definition
- [ ] Remove `skills` table definition
- [ ] Remove `personaId`, `personaSlug`, `chatbotSlug` from `chats` table
- [ ] Remove related relations/exports

### Create Drop Migration
- [ ] Create `0010_remove-personas-system.sql`:
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
- [ ] Remove persona/chatbot logic from chat endpoints
- [ ] Hardcode system prompt in chat handler
- [ ] Ensure RAG integration still works
- [ ] Ensure tool calling still works

### Update Chat UI
- [ ] Remove PersonaSelect from chat page
- [ ] Remove chatbot routing logic
- [ ] Clean up imports/references

### System Prompt
- [ ] Add hardcoded general helpful prompt (no specific focus)

## Phase 4: Cleanup & Verify

### Typecheck & Lint
- [ ] Run `pnpm typecheck` - fix any broken references
- [ ] Run `pnpm lint` - fix any issues
- [ ] Run `pnpm build` - ensure builds

### Test
- [ ] Run remaining tests, verify they pass
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
