# Git Worktree Plugin

Claude Code plugin for managing git worktrees with slot-based environment configuration.

## Problem

Working on multiple features simultaneously requires separate worktrees, each with isolated services (different ports, OAuth apps, etc.). This plugin automates worktree creation with automatic environment configuration.

## Key Concept: Slot Pools

Some resources can't be dynamically allocated (OAuth callback URLs, pre-registered webhooks). Solution: Define a pool of N slots, each with pre-configured values. Slots are assigned on worktree creation.

## Commands

| Command | Description |
|---------|-------------|
| `/worktree:init` | Initialize worktree config for a repo |
| `/worktree:create <issue\|branch>` | Create worktree with slot allocation |
| `/worktree:list` | List slots and worktrees |
| `/worktree:delete <issue>` | Remove worktree and free slot |

## Setup

1. Run `/worktree:init` in your main repo
2. Configure slot count and variables
3. Define which env vars are slot-specific vs copied from main

## Directory Structure

```
my-project/                    # Main repo
my-project-worktrees/          # Sibling folder (auto-named)
├── config/
│   ├── slots.config.json      # Pool of slot values
│   ├── slots.schema.json      # JSON Schema for IDE hints
│   ├── .env.template          # Template with {{SLOT_VAR}} placeholders
│   └── .env.local.template    # Additional templates
├── .worktree-registry.json    # Slot assignments
└── feature-142-add-feature/   # Actual worktrees
```

## Template Syntax

| Syntax | Source | Example |
|--------|--------|---------|
| `{{VAR}}` | From `slots.config.json` | `{{PORT}}` → `3001` |
| `{{COPY:VAR}}` | From files in `copyFromRootRepo` | `{{COPY:API_KEY}}` → `sk-xxx` |
| Static | Kept as-is | `NODE_ENV=development` |

## Example slots.config.json

```json
{
  "$schema": "./slots.schema.json",
  "copyFromRootRepo": [".env"],
  "slots": {
    "slot-1": { "PORT": 3001, "DB_PORT": 5341, "OAUTH_CLIENT_ID": "Ov23li_slot1..." },
    "slot-2": { "PORT": 3002, "DB_PORT": 5342, "OAUTH_CLIENT_ID": "Ov23li_slot2..." },
    "slot-3": { "PORT": 3003, "DB_PORT": 5343, "OAUTH_CLIENT_ID": "Ov23li_slot3..." }
  }
}
```

### copyFromRootRepo

Specifies which `.env` files in the root repo to copy `{{COPY:VAR}}` values from:
- Single file: `"copyFromRootRepo": ".env"`
- Multiple files: `"copyFromRootRepo": [".env", ".env.local"]` (later files override earlier)

## Example .env.template

```bash
PORT={{PORT}}
DATABASE_URL=postgresql://localhost:{{DB_PORT}}/app
OAUTH_CLIENT_ID={{OAUTH_CLIENT_ID}}
API_KEY={{COPY:API_KEY}}
NODE_ENV=development
```

## Requirements

- Python 3.11+
- `gh` - GitHub CLI (for issue title fetching)
