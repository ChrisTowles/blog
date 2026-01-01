# Git Worktree Plugin for Claude Code

**Date**: 2026-01-01
**Status**: Planning
**Scope**: Generic Claude Code plugin for managing git worktrees with isolated dev environments

---

## Problem Statement

Working on multiple features simultaneously requires:
- Separate git worktrees per feature
- Isolated services (different ports per worktree)
- Resources that require pre-configuration (OAuth apps, API keys, etc.)
- Manual .env setup each time

Current workflow is error-prone and repetitive.

---

## Solution: Git Worktree Plugin

Claude Code plugin with commands to create, list, and remove worktrees with automatic environment configuration.

### Key Insight: Slot Pools

Some resources can't be dynamically allocated (OAuth callback URLs, pre-registered webhooks, etc.). Solution: Define a pool of N slots, each with pre-configured values. Assign slots on worktree creation.

---

## Architecture

### Directory Structure

```
my-project/                    # Main repo
my-project-worktrees/          # Sibling folder (auto-named from repo)
├── config/
│   ├── slots.yaml             # Pool of slot values
│   └── .env.template          # Template with {{SLOT_VAR}} placeholders
├── .worktree-registry.json    # Slot assignments
└── feature-142-add-feature/   # Actual worktrees
```

### Slot Registry

```json
{
  "repoName": "my-project",
  "slotCount": 5,
  "assignments": [
    { "slot": 1, "issue": 142, "branch": "feature/142-add-feature", "worktree": "feature-142-add-feature", "createdAt": "2026-01-01T10:00:00Z" },
    { "slot": 2, "issue": null, "branch": null, "worktree": null, "createdAt": null },
    { "slot": 3, "issue": null, "branch": null, "worktree": null, "createdAt": null },
    { "slot": 4, "issue": null, "branch": null, "worktree": null, "createdAt": null },
    { "slot": 5, "issue": null, "branch": null, "worktree": null, "createdAt": null }
  ]
}
```

### Slots Config (Generic)

```yaml
# config/slots.yaml
# Define any variables per slot. Use in .env.template as {{VAR_NAME}}

slots:
  - slot: 1
    PORT: 3001
    PG_PORT: 5433
    OAUTH_CLIENT_ID: "Ov23li..."
    OAUTH_CLIENT_SECRET: "secret1..."
    WEBHOOK_URL: "https://hooks.example.com/slot1"

  - slot: 2
    PORT: 3002
    PG_PORT: 5434
    OAUTH_CLIENT_ID: "Ov23li..."
    OAUTH_CLIENT_SECRET: "secret2..."
    WEBHOOK_URL: "https://hooks.example.com/slot2"

  # ... additional slots
```

### Env Template (Generic)

```bash
# config/.env.template
# {{SLOT_VAR}} - replaced from slots.yaml
# {{COPY:VAR}} - copied from main repo's .env
# Static values - kept as-is

# Slot-specific (from slots.yaml)
PORT={{PORT}}
DATABASE_URL=postgresql://postgres:postgres@localhost:{{PG_PORT}}/mydb
OAUTH_CLIENT_ID={{OAUTH_CLIENT_ID}}
OAUTH_CLIENT_SECRET={{OAUTH_CLIENT_SECRET}}
WEBHOOK_URL={{WEBHOOK_URL}}

# Copied from main .env
API_KEY={{COPY:API_KEY}}
ANTHROPIC_API_KEY={{COPY:ANTHROPIC_API_KEY}}

# Static (same for all worktrees)
NODE_ENV=development
DEBUG=true
```

---

## Plugin Structure

```
git-worktree/
├── plugin.json
├── skills/
│   ├── create/SKILL.md        # /worktree create <issue>
│   ├── list/SKILL.md          # /worktree list
│   ├── remove/SKILL.md        # /worktree remove <issue>
│   └── init/SKILL.md          # /worktree init (per-repo setup)
├── scripts/
│   ├── worktree-create.ts
│   ├── worktree-list.ts
│   ├── worktree-remove.ts
│   ├── worktree-init.ts
│   └── lib/
│       ├── registry.ts        # Read/write registry
│       ├── slots.ts           # Slot allocation
│       ├── env.ts             # Template processing
│       └── git.ts             # Git/GitHub operations
└── references/
    └── setup-examples.md      # Example configs for common stacks
```

---

## Commands

### `/worktree create <issue-number>`

1. Verify worktrees config exists for this repo
2. Fetch issue title from GitHub API
3. Find first available slot
4. Create branch: `feature/<issue>-<slug-from-title>`
5. Create worktree in `../{repo}-worktrees/feature-<issue>-<slug>/`
6. Process `.env.template`:
   - Replace `{{VAR}}` with slot values from `slots.yaml`
   - Replace `{{COPY:VAR}}` with values from main repo's `.env`
   - Keep static values as-is
7. Update `.worktree-registry.json`
8. Output: slot info, paths, next steps

### `/worktree list`

1. Read `.worktree-registry.json`
2. Read `slots.yaml` for display values
3. Display table with configured slot variables:
   ```
   Slot | Issue | Branch                    | PORT | PG_PORT | Status
   -----|-------|---------------------------|------|---------|--------
   1    | #142  | feature/142-add-feature   | 3001 | 5433    | active
   2    | -     | -                         | 3002 | 5434    | free
   3    | #156  | feature/156-fix-bug       | 3003 | 5435    | active
   4    | -     | -                         | 3004 | 5436    | free
   5    | -     | -                         | 3005 | 5437    | free
   ```

### `/worktree remove <issue-number>`

1. Find slot by issue number
2. Prompt for cleanup options (docker, branch deletion)
3. Remove worktree: `git worktree remove <path>`
4. Delete branch if merged, prompt if not
5. Free slot in registry
6. Output: confirmation

### `/worktree init`

Per-repo initialization (run once per project):

1. Detect repo name from git remote or folder
2. Create `../{repo}-worktrees/config/` directory
3. Interactive prompts:
   - Number of slots (default: 5)
   - Slot variables to define (with examples)
   - Values for each slot
4. Generate `slots.yaml` from responses
5. Copy current `.env`, convert to template:
   - Prompt which vars should be slot-specific → `{{VAR}}`
   - Prompt which vars to copy from main → `{{COPY:VAR}}`
   - Keep rest as static
6. Initialize empty registry with slot count
7. Output: config paths, next steps

---

## Implementation Details

### Template Processing

The `.env.template` supports three value types:

| Syntax | Source | Example |
|--------|--------|---------|
| `{{VAR}}` | From `slots.yaml` for assigned slot | `{{PORT}}` → `3001` |
| `{{COPY:VAR}}` | From main repo's `.env` | `{{COPY:API_KEY}}` → `sk-xxx` |
| Static | Kept as-is | `NODE_ENV=development` |

### Branch Naming

Format: `feature/<issue>-<slug>`

Slug generation:
- Fetch issue title from GitHub
- Lowercase, replace spaces with hyphens
- Remove special chars
- Truncate to 30 chars

Example: Issue #142 "Add dark mode toggle" → `feature/142-add-dark-mode-toggle`

### Docker Compose (Optional)

If project uses Docker, two patterns:

**Pattern A**: Shared compose in worktrees folder
```yaml
# {repo}-worktrees/docker-compose.yml
services:
  db-slot-1:
    image: postgres:16
    ports: ["5433:5432"]
    volumes: ["./data/slot-1:/var/lib/postgresql/data"]
  db-slot-2:
    ports: ["5434:5432"]
    volumes: ["./data/slot-2:/var/lib/postgresql/data"]
```

**Pattern B**: Per-worktree compose using .env
```yaml
# Each worktree's docker-compose.yml
services:
  db:
    ports: ["${PG_PORT}:5432"]
```

---

## Example Configurations

### Nuxt + GitHub OAuth + PostgreSQL

```yaml
# slots.yaml
slots:
  - slot: 1
    PORT: 3001
    PG_PORT: 5433
    OAUTH_CLIENT_ID: "Ov23li_slot1..."
    OAUTH_CLIENT_SECRET: "secret1..."
  - slot: 2
    PORT: 3002
    PG_PORT: 5434
    OAUTH_CLIENT_ID: "Ov23li_slot2..."
    OAUTH_CLIENT_SECRET: "secret2..."
```

```bash
# .env.template
NUXT_PORT={{PORT}}
DATABASE_URL=postgresql://postgres:postgres@localhost:{{PG_PORT}}/app
NUXT_OAUTH_GITHUB_CLIENT_ID={{OAUTH_CLIENT_ID}}
NUXT_OAUTH_GITHUB_CLIENT_SECRET={{OAUTH_CLIENT_SECRET}}
NUXT_SESSION_PASSWORD={{COPY:NUXT_SESSION_PASSWORD}}
ANTHROPIC_API_KEY={{COPY:ANTHROPIC_API_KEY}}
```

### Next.js + Stripe + Redis

```yaml
# slots.yaml
slots:
  - slot: 1
    PORT: 3001
    REDIS_PORT: 6380
    STRIPE_WEBHOOK_SECRET: "whsec_slot1..."
  - slot: 2
    PORT: 3002
    REDIS_PORT: 6381
    STRIPE_WEBHOOK_SECRET: "whsec_slot2..."
```

```bash
# .env.template
PORT={{PORT}}
REDIS_URL=redis://localhost:{{REDIS_PORT}}
STRIPE_WEBHOOK_SECRET={{STRIPE_WEBHOOK_SECRET}}
STRIPE_SECRET_KEY={{COPY:STRIPE_SECRET_KEY}}
DATABASE_URL={{COPY:DATABASE_URL}}
```

---

## Error Handling

| Scenario | Action |
|----------|--------|
| Config not initialized | Error: "No worktree config found. Run `/worktree init` first." |
| No free slots | Error: "All N slots in use. Remove a worktree first." |
| Issue not found | Error: "GitHub issue #X not found" |
| Worktree exists | Error: "Worktree for issue #X already exists (slot Y)" |
| Branch exists | Prompt: "Branch exists. Use existing or create fresh?" |
| Unmerged branch on remove | Prompt: "Branch not merged. Force delete?" |
| Missing template var | Error: "Template has {{VAR}} but not defined in slots.yaml" |
| Missing COPY source | Warning: "{{COPY:VAR}} not found in main .env, leaving empty" |

---

## Future Considerations

- Auto-generate docker-compose from slots.yaml
- VSCode/Cursor workspace file generation per worktree
- Zellij layout generation (split with dev server + logs)
- Sync .env changes across worktrees (re-run template for non-slot vars)
- GitHub CLI integration for issue status updates
- `/worktree switch <issue>` - cd to worktree + start dev server
- Hooks: pre-create, post-create, pre-remove scripts
- Config inheritance: global defaults + per-repo overrides
