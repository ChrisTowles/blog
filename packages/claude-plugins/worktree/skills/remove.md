---
description: Remove a worktree and free its slot
allowed-tools: Bash(tsx:*), Bash(git:*), Read(*), AskUserQuestion(*)
---

## Context

- Current directory: !`pwd`
- Repository: !`basename $(git rev-parse --show-toplevel 2>/dev/null || pwd)`
- Current slots: !`cat ../$(basename $(pwd))-worktrees/.worktree-registry.json 2>/dev/null | head -20 || echo "No registry found"`

## Arguments

The user should provide:
- **Issue number**: e.g., `142` - finds worktree by issue
- **Branch name**: e.g., `feature/142-add-feature` - finds by branch

Optional flags:
- `--dry-run` - Preview without removing
- `--stash` - Stash uncommitted changes before removal
- `--force` - Force removal even with uncommitted/unmerged
- `--delete-branch` - Also delete the git branch

## Your Task

Remove a worktree and free its slot for reuse.

### Steps

1. **Validate input**: Ensure user provided issue number or branch name

2. **Run the remove script**:
   ```bash
   tsx packages/claude-plugins/worktree/scripts/worktree-remove.ts <input> [options]
   ```

3. **Handle prompts**:
   - If uncommitted changes: ask user if they want to stash or force
   - If branch not merged: ask user if they want to force delete

4. **Report results**:
   - Slot freed
   - Whether changes were stashed
   - Whether branch was deleted

### Error Handling

- **No worktree found**: Show available worktrees with `/worktree:list`
- **Uncommitted changes**: Offer `--stash` to save changes
- **Branch not merged**: Warn user, offer `--force` to proceed
- **Stale entry**: Clean up registry even if worktree doesn't exist

### Example Output

```
Removing worktree:
  Slot: 2
  Branch: feature/142-add-feature
  Path: ../blog-worktrees/142-add-feature

Removing worktree...
Deleting branch feature/142-add-feature...

✅ Worktree removed!

Slot 2 freed
Branch feature/142-add-feature deleted
```

### With Uncommitted Changes

```
Removing worktree:
  Slot: 2
  Branch: feature/142-add-feature
  Path: ../blog-worktrees/142-add-feature

❌ Error: Worktree has uncommitted changes. Use --stash to stash them or --force to discard.
```

Then ask user which option they prefer.
