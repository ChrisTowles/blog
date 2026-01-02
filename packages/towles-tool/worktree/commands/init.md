---
description: Initialize worktree config for a repository
allowed-tools: Bash(python:*), Bash(python3:*), Bash(mkdir:*), Read(*), Write(*), AskUserQuestion(*)
---

Initialize worktree configuration for the current repository.

1. Ask user for slot count (default 3)
2. Create `../{repo}-worktrees/config/slots.config.json`
3. Create `../{repo}-worktrees/config/slots.schema.json`
4. Create `../{repo}-worktrees/config/.env.template` (copy from main .env.example, add `{{VAR}}` placeholders)
5. Initialize `../{repo}-worktrees/.worktree-registry.json`

## Keep it simple

- **NO port offset logic** - just add a `_note` field mentioning users can use different ports if needed
- **NO copyFromMain lists** - template file declares what it needs via `{{VAR}}` placeholders
- Create `.env.template` with `{{VAR}}` placeholders - create command parses these and resolves from main .env (errors if missing)
- Schema should only type known fields (repository, slots, etc.), use `additionalProperties: true`
- Slots are simple: `{ "id": "slot-1", "status": "available" }`
