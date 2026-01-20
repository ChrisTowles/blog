# Research: Remove Personas & Chatbots System

## Goal

Remove the personas, chatbots, capabilities, and skills system added in Dec 2025 commits. User wants to head in a different direction.

## Codebase Context

### What Was Added (Dec 2025)

**Database Tables** (`server/database/schema.ts`):

- `personas` - AI personas with themes, system prompts
- `chatbots` - Pre-configured chat interfaces with persona FK
- `capabilities` - Reusable skills/behaviors for personas
- `personaCapabilities` - Many-to-many junction
- `skills` - Knowledge modules (markdown + optional zip)
- Modified `chats` table with personaId, personaSlug, chatbotSlug

**Migrations to Remove**:

- `0005_add-persona-theme.sql`
- `0006_add-persona-slug.sql`
- `0007_add-chatbots.sql`
- `0008_add-skills.sql`
- `0009_add-chatbot-slug-to-chats.sql`

**API Routes**:

- `/api/personas/*` - CRUD for personas
- `/api/chatbots/*` - CRUD + by-path lookup
- `/api/capabilities/*` - List/get capabilities
- `/api/skills/*` - List/get/upload skills

**Pages**:

- `/app/pages/bot/index.vue` - Browse chatbots
- `/app/pages/bot/[slug].vue` - Chatbot-specific chat
- `/app/pages/c/[...slug].vue` - Dynamic chatbot routes

**Server Utils**:

- `server/utils/chatbots.ts` - Chatbot config loading
- `server/utils/capabilities/` - Persona definitions, registry
- `server/utils/skills/` - Skill loader, types, tests

**Tests Added**:

- `chatbots.test.ts`
- `personas.test.ts`
- `skills.test.ts`
- `skills/e2e.test.ts`
- `skills/loader.test.ts`

### What to Keep

The base chat functionality appears to predate this:

- `chats` table (but remove persona/chatbot columns)
- `messages` table
- `/api/chats` endpoints
- `/app/pages/chat/` pages
- `useChat.ts` composable (core streaming logic)

## Removal Scope

### Files to Delete

```
server/api/personas/
server/api/chatbots/
server/api/capabilities/
server/api/skills/
server/utils/chatbots.ts
server/utils/capabilities/
server/utils/skills/
app/pages/bot/
app/pages/c/
app/components/PersonaSelect.vue (if exists)
app/components/CapabilityBadges.vue (if exists)
docs/skill-loader.md
```

### Schema Changes

- Drop tables: personas, chatbots, capabilities, personaCapabilities, skills
- Remove from chats: personaId, personaSlug, chatbotSlug columns

### Migration Strategy

**Option A: New migration removing tables**

- Add `0010_remove-personas-system.sql` dropping all related tables/columns
- Clean approach, maintains migration history

**Option B: Reset migrations**

- Squash migrations to clean state
- Only viable if no prod data matters

## Recommended Approach

1. Delete all persona/chatbot/skill files
2. Clean up schema.ts (remove tables, remove FK columns from chats)
3. Create migration to drop tables/columns
4. Update chat endpoints to remove persona logic
5. Simplify chat pages (remove PersonaSelect, chatbot routing)
6. Run typecheck to find remaining references
7. Remove related tests

## Questions Before Planning

Need to clarify:

1. **What's the new direction?** (Simpler chat? Different AI architecture? No chat at all?)
2. **Keep base chat?** Should `/chat` remain with a single default persona, or remove chat entirely?
3. **Data preservation?** Any existing chat history to preserve, or clean slate?
