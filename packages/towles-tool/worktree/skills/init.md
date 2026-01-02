---
description: Context for initializing worktree configuration
---

## Worktree Init Context

### What Gets Created
```
{repo}-worktrees/           # Sibling folder
├── config/
│   ├── slots.toml          # Slot variable definitions
│   └── .env*.template      # Environment templates
└── .worktree-registry.json # Slot assignments
```

### Slot Variables
Variables that differ per worktree. Common examples:
- `PORT`, `PG_PORT` - different ports per worktree
- `OAUTH_CLIENT_ID/SECRET` - pre-registered OAuth apps
- `WEBHOOK_URL` - pre-registered webhooks

### Copy Variables
Variables copied from main repo's `.env*` (shared secrets):
- `API_KEY`, `ANTHROPIC_API_KEY`
- Database credentials (if same for all)

### slots.toml Format
```toml
[slots.1]
PORT = 3001
PG_PORT = 5433

[slots.2]
PORT = 3002
PG_PORT = 5434
```

### .env.template Format
```bash
PORT={{PORT}}
DATABASE_URL=postgresql://localhost:{{PG_PORT}}/app
API_KEY={{COPY:API_KEY}}
NODE_ENV=development
```

### Reinitializing
If config exists, ask user before overwriting.
