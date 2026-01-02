---
description: Context for git worktree management with slot-based environment configuration
---

## Worktree Init Context

### What Gets Created
```
{repo}-worktrees/           # Sibling folder
├── config/
│   ├── slots.config.json   # Slot variable definitions
│   ├── slots.schema.json   # JSON Schema for IDE hints
│   └── .env*.template      # Environment templates
└── .worktree-registry.json # Slot assignments
```

### Slot Variables
Variables that differ per worktree. Common examples:
- `PORT`, `DB_PORT` - different ports per worktree
- `OAUTH_CLIENT_ID/SECRET` - pre-registered OAuth apps
- `WEBHOOK_URL` - pre-registered webhooks

### Copy Variables
Variables copied from root repo's `.env` files (shared secrets). Specify source file(s) via `copyFromRootRepo`:
- `API_KEY`, `ANTHROPIC_API_KEY`
- Database credentials (if same for all)

### slots.config.json Format
```json
{
  "$schema": "./slots.schema.json",
  "copyFromRootRepo": [".env"],
  "slots": [
 { "id": "slot-1", "PORT": 3001, "DB_PORT": 5341 },
    { "id": "slot-2", "PORT": 3002, "DB_PORT": 5342 },
    { "id": "slot-3", "PORT": 3003, "DB_PORT": 5343 }
  
  ]
}
```

### copyFromRootRepo
Specifies which `.env` files in the root repo to copy `{{COPY:VAR}}` values from:
- `"copyFromRootRepo": ".env"` - single file
- `"copyFromRootRepo": [".env", ".env.local"]` - multiple files (later override earlier)

### .env.template Format
```bash
PORT={{PORT}}
DATABASE_URL=postgresql://localhost:{{DB_PORT}}/app
API_KEY={{COPY:API_KEY}}
NODE_ENV=development
```

### Reinitializing
If config exists, ask user before overwriting.

---

## Worktree Creation Context

### Prerequisites
- Config must exist in `../{repo}-worktrees/config/` (run `/worktree:init` first)
- For issue numbers, `gh` CLI must be authenticated

### How It Works
1. Finds first available slot from registry (named slots like `slot-1`, `slot-2`)
2. For issue numbers: fetches title from GitHub, creates `feature/{issue}-{slug}`
3. Creates git worktree in `../{repo}-worktrees/{branch-slug}/`
4. Processes `.env*.template` files with slot values
5. Updates registry with slot assignment

### Auto-Generated Slots
If all configured slots are in use, the system auto-generates new slots (e.g., `slot-4`, `slot-5`). These work but won't have pre-configured values in `slots.config.json`.

### Template Variables
- `{{VAR}}` - replaced from `slots.config.json` for assigned slot
- `{{COPY:VAR}}` - copied from files listed in `copyFromRootRepo`

### Error Handling
- **No config**: Run `/worktree:init` first
- **No free slots**: Auto-generates new slot, or remove unused with `/worktree:remove`
- **Issue not found**: Check issue number, verify `gh auth status`
- **Branch exists**: Prompt to use existing or create fresh
- **Port in use**: Warning only, doesn't block creation

---

## Worktree Listing Context

### Status Meanings
- **active** - Worktree exists and is tracked in registry
- **free** - Slot available for new worktree
- **stale** - Registry has entry but worktree doesn't exist (manual deletion)

### Output Format
Table showing: Slot | Issue | Branch | Path | PORT | Status

### Stale Entries
Occur when worktrees are removed outside this tool (manual `git worktree remove`).
Use `/worktree:delete` to clean up the registry entry.

### Registry Location
`../{repo}-worktrees/.worktree-registry.json`

---

## Worktree Removal Context

### What Gets Removed
- Git worktree directory
- Registry entry (frees slot for reuse)
- Optionally: git branch (`--delete-branch`)

### Safety Checks
- **Uncommitted changes**: Offers `--stash` to save, `--force` to discard
- **Unmerged branch**: Warns before deletion, requires `--force`

### Stale Entries
If worktree was deleted manually, the script cleans up the registry entry.
Stashed changes can be recovered with `git stash list` in main repo.

### Error Handling
- **No worktree found**: Run `/worktree:list` to see available
- **Uncommitted changes**: User chooses stash or force
- **Branch not merged**: User confirms force delete
