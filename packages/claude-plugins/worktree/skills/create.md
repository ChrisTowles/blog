---
description: Create a new git worktree with slot allocation
allowed-tools: Bash(tsx:*), Bash(git:*), Bash(cd:*), Read(*), AskUserQuestion(*)
---

## Context

- Current directory: !`pwd`
- Repository: !`basename $(git rev-parse --show-toplevel 2>/dev/null || pwd)`
- Config exists: !`ls ../$(basename $(pwd))-worktrees/config/slots.yaml 2>/dev/null && echo "Yes" || echo "No - run /worktree:init first"`
- Current slots: !`cat ../$(basename $(pwd))-worktrees/.worktree-registry.json 2>/dev/null | head -20 || echo "No registry found"`

## Arguments

The user should provide either:
- **Issue number**: e.g., `142` - fetches title from GitHub, creates `feature/142-<slug>`
- **Branch name**: e.g., `feature/my-branch` - uses directly

Optional flag: `--dry-run` to preview without creating

## Your Task

Create a new git worktree with automatic slot allocation and environment setup.

### Steps

1. **Validate input**: Ensure user provided issue number or branch name

2. **Check prerequisites**:
   - Config must exist (`/worktree:init` run first)
   - tsx must be available
   - For issue numbers, `gh` CLI must work

3. **Run the create script**:
   ```bash
   cd /path/to/main/repo
   tsx packages/claude-plugins/worktree/scripts/worktree-create.ts <input> [--dry-run]
   ```

4. **Report results**:
   - Slot assigned
   - Worktree path (relative)
   - Any port warnings
   - Any template warnings
   - Next steps (cd, install, dev)

### Error Handling

- **No config**: Tell user to run `/worktree:init` first
- **No free slots**: Show current slot usage, suggest `/worktree:remove`
- **Issue not found**: Verify issue number, check `gh auth status`
- **Branch exists**: Ask if user wants to use existing branch or create new

### Example Output

```
Creating worktree:
  Branch: feature/142-add-dark-mode
  Slot: 2
  Path: ../blog-worktrees/142-add-dark-mode

✅ Worktree created!

Slot 2 assigned
Path: ../blog-worktrees/142-add-dark-mode

⚠️  Port warnings:
  - Port 3002 appears to be in use

Next steps:
  cd ../blog-worktrees/142-add-dark-mode
  pnpm install
  pnpm dev
```
