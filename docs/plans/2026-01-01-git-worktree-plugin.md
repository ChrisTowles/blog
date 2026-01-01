# Git Worktree Plugin for Claude Code

**Date**: 2026-01-01
**Status**: Implemented
**Scope**: Generic Claude Code plugin for managing git worktrees with isolated dev environments
**Location**: `packages/claude-plugins/worktree/`

---

## Implementation Tasks

### Phase 1: Plugin Setup
- [x] Create `packages/claude-plugins/worktree/` directory structure
- [x] Create `.claude-plugin/plugin.json` with plugin metadata
- [x] Create `package.json` with tsx dependency
- [x] Create `README.md` with usage docs

### Phase 2: Core Library (`scripts/lib/`)
- [x] `registry.ts` - Read/write `.worktree-registry.json`
- [x] `slots.ts` - Parse `slots.yaml`, find free slot, allocate/free
- [x] `env.ts` - Template processing (`{{VAR}}`, `{{COPY:VAR}}`, glob `.env*.template`)
- [x] `git.ts` - Git operations (branch, worktree create/remove, check merged)
- [x] `github.ts` - Fetch issue title from GitHub API via `gh`
- [x] `ports.ts` - Check if port is in use (warn only)
- [x] `paths.ts` - Resolve worktree paths, sibling folder naming

### Phase 3: Commands
- [x] `scripts/worktree-init.ts` - Initialize config for repo
- [x] `skills/init.md` - Skill definition for `/worktree:init`
- [x] `scripts/worktree-create.ts` - Create worktree with slot
- [x] `skills/create.md` - Skill definition for `/worktree:create`
- [x] `scripts/worktree-list.ts` - List slots and worktrees
- [x] `skills/list.md` - Skill definition for `/worktree:list`
- [x] `scripts/worktree-remove.ts` - Remove worktree, free slot
- [x] `skills/remove.md` - Skill definition for `/worktree:remove`

### Phase 4: Testing & Polish
- [x] Test init flow with interactive prompts
- [x] Test create with GitHub issue number
- [x] Test create with manual branch name
- [x] Test list with stale detection
- [x] Test remove with stash option
- [x] Test `--dry-run` flags
- [x] Test port warning
- [x] Add error handling for all edge cases

### Future (Not in Initial Scope)
- [ ] `/worktree:sync` command

---

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Platform | Linux/macOS only | Simpler bash scripts, no Windows path handling |
| Unmerged branch removal | Offer stash option | Auto-stash before removal, user can recover |
| Config location | Sibling folder only | Secrets stay out of repo, each dev sets up |
| Non-GitHub repos | Manual branch name | Prompt for branch name if no GitHub |
| Env drift | `/worktree sync` command | Update all worktrees' COPY vars at once |
| Script language | TypeScript + tsx | Type-safe, auto-install prompt if tsx missing |
| Slot reuse | Any free slot | First available, no preference tracking |
| Auto-detect services | No | Fully manual slot var setup |
| Port validation | Warn only | Check ports, warn if in use, don't block |
| Registry corruption | Verify on list | Check actual worktrees, mark stale entries |
| Post-create automation | None | Just output instructions |
| Min slots | 1 | Allow even single-slot setups |
| Multi-env files | Glob pattern | Process all `.env*.template` files |
| Issue cache | Always fresh | Hit GitHub API each time |
| List output | Relative path | `../repo-worktrees/feature-xxx` |
| Sync scope | All worktrees | Update all at once |
| Zellij integration | None | Separate concerns |
| Plugin name | `worktree` | `/worktree:create`, `/worktree:list`, etc. |
| Initial scope | Core 4 commands | create, list, remove, init (sync later) |
| Dry-run | Yes for both | `--dry-run` flag for create and remove |

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

Claude Code plugin with commands to create, list, remove, and init worktrees with automatic environment configuration.

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
│   ├── .env.template          # Template with {{SLOT_VAR}} placeholders
│   └── .env.local.template    # Additional templates (glob: .env*.template)
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
packages/claude-plugins/worktree/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── create.md              # /worktree:create <issue|branch-name>
│   ├── list.md                # /worktree:list
│   ├── remove.md              # /worktree:remove <issue>
│   └── init.md                # /worktree:init (per-repo setup)
├── scripts/
│   ├── worktree-create.ts
│   ├── worktree-list.ts
│   ├── worktree-remove.ts
│   ├── worktree-init.ts
│   └── lib/
│       ├── registry.ts        # Read/write registry
│       ├── slots.ts           # Slot allocation
│       ├── env.ts             # Template processing (glob .env*.template)
│       ├── git.ts             # Git/GitHub operations
│       ├── ports.ts           # Port availability check (warn only)
│       └── tsx-check.ts       # Check/prompt tsx install
├── package.json               # tsx dependency
└── README.md
```

---

## Commands

### `/worktree:create <issue-number|branch-name>`

**Arguments**: Issue number (fetches from GitHub) OR manual branch name (for non-GitHub repos)

**Flags**: `--dry-run` - Preview without creating

1. Check tsx installed, prompt to install if missing
2. Verify worktrees config exists for this repo
3. If numeric: fetch issue title from GitHub API (always fresh)
4. If string: use as branch name directly
5. Find first available slot
6. Check if slot ports are in use → warn if occupied
7. Create branch: `feature/<issue>-<slug-from-title>` or use provided name
8. Create worktree in `../{repo}-worktrees/{branch-slug}/`
9. Process all `.env*.template` files (glob pattern):
   - Replace `{{VAR}}` with slot values from `slots.yaml`
   - Replace `{{COPY:VAR}}` with values from main repo's `.env*`
   - Keep static values as-is
10. Update `.worktree-registry.json`
11. Output: slot info, relative path, port warnings, next steps

### `/worktree:list`

1. Read `.worktree-registry.json`
2. Verify against `git worktree list` → mark stale entries
3. Read `slots.yaml` for display values
4. Display table with relative paths:
   ```
   Slot | Issue | Branch                    | Path                              | PORT | Status
   -----|-------|---------------------------|-----------------------------------|------|--------
   1    | #142  | feature/142-add-feature   | ../blog-worktrees/142-add-feature | 3001 | active
   2    | -     | -                         | -                                 | 3002 | free
   3    | #156  | feature/156-fix-bug       | ../blog-worktrees/156-fix-bug     | 3003 | stale ⚠️
   ```

### `/worktree:remove <issue-number>`

**Flags**: `--dry-run` - Preview without removing

1. Find slot by issue number
2. Check for uncommitted changes → offer stash option
3. Check if branch merged → prompt if not, offer force delete
4. If `--dry-run`: show what would happen, exit
5. Apply stash if requested
6. Remove worktree: `git worktree remove <path>`
7. Delete branch if confirmed
8. Free slot in registry
9. Output: confirmation

### `/worktree:init`

Per-repo initialization (run once per project):

1. Check tsx installed, prompt to install if missing
2. Detect repo name from git remote or folder
3. Create `../{repo}-worktrees/config/` directory
4. Interactive prompts:
   - Number of slots (default: 5, minimum: 1)
   - Slot variables to define (with examples)
   - Values for each slot
5. Generate `slots.yaml` from responses
6. Find all `.env*` files in main repo
7. For each, create corresponding `.env*.template`:
   - Prompt which vars should be slot-specific → `{{VAR}}`
   - Prompt which vars to copy from main → `{{COPY:VAR}}`
   - Keep rest as static
8. Initialize empty registry with slot count
9. Output: config paths, next steps

---

## Future: `/worktree:sync`

Update `{{COPY:VAR}}` values across all worktrees:

1. Read all `.env*.template` files
2. Extract `{{COPY:VAR}}` placeholders
3. Read current values from main repo's `.env*` files
4. For each worktree in registry:
   - Re-process templates with fresh COPY values
   - Preserve slot-specific values
5. Output: summary of updated worktrees

---

## Implementation Details

### Template Processing

The `.env*.template` files support three value types:

| Syntax | Source | Example |
|--------|--------|---------|
| `{{VAR}}` | From `slots.yaml` for assigned slot | `{{PORT}}` → `3001` |
| `{{COPY:VAR}}` | From main repo's `.env*` | `{{COPY:API_KEY}}` → `sk-xxx` |
| Static | Kept as-is | `NODE_ENV=development` |

### Multi-Env File Support

Process all files matching `.env*.template`:
- `.env.template` → `.env`
- `.env.local.template` → `.env.local`
- `.env.development.template` → `.env.development`

### Branch Naming

Format: `feature/<issue>-<slug>` or manual name

Slug generation (for GitHub issues):
- Fetch issue title from GitHub (always fresh, no cache)
- Lowercase, replace spaces with hyphens
- Remove special chars
- Truncate to 30 chars

Example: Issue #142 "Add dark mode toggle" → `feature/142-add-dark-mode-toggle`

### Port Checking

On create, check if slot's PORT values are in use via net.createConnection().
Warn only, don't block creation.

### tsx Dependency

Scripts require `tsx` to run TypeScript directly. On first run, check if tsx exists and prompt user to install globally if missing.

### Registry Verification

On `/worktree:list`, cross-reference with `git worktree list`:
- Active: worktree exists in both registry and git
- Free: slot not assigned
- Stale: in registry but worktree missing (manual deletion)

---

## Error Handling

| Scenario | Action |
|----------|--------|
| Config not initialized | Error: "No worktree config found. Run `/worktree:init` first." |
| No free slots | Error: "All N slots in use. Remove a worktree first." |
| Issue not found | Error: "GitHub issue #X not found" |
| Worktree exists | Error: "Worktree for issue #X already exists (slot Y)" |
| Branch exists | Prompt: "Branch exists. Use existing or create fresh?" |
| Unmerged branch on remove | Offer stash, then prompt: "Branch not merged. Force delete?" |
| Missing template var | Error: "Template has {{VAR}} but not defined in slots.yaml" |
| Missing COPY source | Warning: "{{COPY:VAR}} not found in main .env, leaving empty" |
| Port in use | Warning: "Port 3001 appears to be in use" |
| tsx not installed | Prompt: "Install tsx globally?" |
| Stale registry entry | Mark as stale in list, don't auto-clean |

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

## Future Considerations

- `/worktree:sync` - Update COPY vars across all worktrees
- Auto-generate docker-compose from slots.yaml
- VSCode/Cursor workspace file generation per worktree
- GitHub CLI integration for issue status updates
- `/worktree:switch <issue>` - cd to worktree + start dev server
- Hooks: pre-create, post-create, pre-remove scripts
- Config inheritance: global defaults + per-repo overrides
