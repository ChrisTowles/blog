---
description: Initialize worktree config for a repository
allowed-tools: Bash(tsx:*), Bash(ls:*), Bash(mkdir:*), Read(*), Write(*), AskUserQuestion(*)
---

## Context

- Current directory: !`pwd`
- Repository name: !`basename $(git rev-parse --show-toplevel 2>/dev/null || pwd)`
- Existing .env files: !`ls -la .env* 2>/dev/null || echo "No .env files found"`

## Your Task

Initialize worktree configuration for this repository. This creates:
- A sibling folder `{repo-name}-worktrees/config/`
- `slots.yaml` with slot variable definitions
- `.env*.template` files from existing .env files
- `.worktree-registry.json` for tracking slot assignments

### Steps

1. **Check if already initialized**: Look for `../{repo-name}-worktrees/config/slots.yaml`. If exists, inform user and ask if they want to reinitialize.

2. **Gather slot count**: Use AskUserQuestion to ask how many slots (default 5, minimum 1).

3. **Identify slot variables**: Look at existing .env files. Ask user which variables should be slot-specific (different per worktree). Common examples:
   - PORT, PG_PORT (ports)
   - OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET (pre-registered OAuth apps)
   - WEBHOOK_URL (pre-registered webhooks)

4. **Gather slot values**: For each slot variable, ask for the value for each slot. Example:
   ```
   Slot 1: PORT=3001, PG_PORT=5433
   Slot 2: PORT=3002, PG_PORT=5434
   ```

5. **Identify copy variables**: Ask which .env variables should be copied from main repo (shared secrets). Examples:
   - API_KEY, ANTHROPIC_API_KEY
   - DATABASE credentials (same for all worktrees)

6. **Create config**:
   - Create `../{repo-name}-worktrees/config/` directory
   - Write `slots.yaml` with slot definitions
   - For each .env file, create corresponding .env*.template with:
     - `{{VAR}}` for slot variables
     - `{{COPY:VAR}}` for copied variables
     - Static values for everything else
   - Initialize empty `.worktree-registry.json`

7. **Output summary**: Show created files and next steps.

### Example slots.yaml

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

### Example .env.template

```bash
PORT={{PORT}}
DATABASE_URL=postgresql://localhost:{{PG_PORT}}/app
OAUTH_CLIENT_ID={{OAUTH_CLIENT_ID}}
API_KEY={{COPY:API_KEY}}
NODE_ENV=development
```
