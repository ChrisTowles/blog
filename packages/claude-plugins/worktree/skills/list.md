---
description: List worktree slots and their status
allowed-tools: Bash(tsx:*), Bash(cat:*), Read(*)
---

## Context

- Current directory: !`pwd`
- Repository: !`basename $(git rev-parse --show-toplevel 2>/dev/null || pwd)`

## Your Task

List all worktree slots and their current status.

### Steps

1. **Run the list script**:
   ```bash
   tsx packages/claude-plugins/worktree/scripts/worktree-list.ts
   ```

2. **Display results**: Show the formatted table with:
   - Slot number
   - Issue number (if any)
   - Branch name
   - Relative path
   - Port assignment
   - Status (active, free, stale)

### Status Meanings

- **active**: Worktree exists and is tracked
- **free**: Slot available for new worktree
- **stale**: Registry has entry but worktree doesn't exist (manual deletion)

### Example Output

```
Worktree Slots:

Slot | Issue | Branch                    | Path                              | PORT | Status
-----|-------|---------------------------|-----------------------------------|------|--------
1    | #142  | feature/142-add-feature   | ../blog-worktrees/142-add-feature | 3001 | active
2    | -     | -                         | -                                 | 3002 | free
3    | #156  | feature/156-fix-bug       | ../blog-worktrees/156-fix-bug     | 3003 | stale ⚠️

Summary: 1 active, 1 free, 1 stale

⚠️  Stale entries exist. The worktree was removed outside this tool.
   Use /worktree:remove to clean up the registry.
```
