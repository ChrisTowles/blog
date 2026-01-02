---
description: Context for removing worktrees
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
