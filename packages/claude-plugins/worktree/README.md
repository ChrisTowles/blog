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
| `/worktree:remove <issue>` | Remove worktree and free slot |

## Setup

1. Run `/worktree:init` in your main repo
2. Configure slot count and variables
3. Define which env vars are slot-specific vs copied from main

## Directory Structure

```
my-project/                    # Main repo
my-project-worktrees/          # Sibling folder (auto-named)
├── config/
│   ├── slots.yaml             # Pool of slot values
│   ├── .env.template          # Template with {{SLOT_VAR}} placeholders
│   └── .env.local.template    # Additional templates
├── .worktree-registry.json    # Slot assignments
└── feature-142-add-feature/   # Actual worktrees
```

## Template Syntax

| Syntax | Source | Example |
|--------|--------|---------|
| `{{VAR}}` | From `slots.yaml` | `{{PORT}}` → `3001` |
| `{{COPY:VAR}}` | From main repo's `.env` | `{{COPY:API_KEY}}` → `sk-xxx` |
| Static | Kept as-is | `NODE_ENV=development` |

## Example slots.yaml

```yaml
slots:
  - slot: 1
    PORT: 3001
    PG_PORT: 5433
    OAUTH_CLIENT_ID: "Ov23li_slot1..."
  - slot: 2
    PORT: 3002
    PG_PORT: 5434
    OAUTH_CLIENT_ID: "Ov23li_slot2..."
```

## Example .env.template

```bash
PORT={{PORT}}
DATABASE_URL=postgresql://localhost:{{PG_PORT}}/app
OAUTH_CLIENT_ID={{OAUTH_CLIENT_ID}}
API_KEY={{COPY:API_KEY}}
NODE_ENV=development
```

## Requirements

- `tsx` - TypeScript execution (prompted to install if missing)
- `gh` - GitHub CLI (for issue title fetching)
