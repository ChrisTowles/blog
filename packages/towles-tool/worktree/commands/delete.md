---
description: Remove a worktree and free its slot
allowed-tools: Bash(python:*), Bash(python3:*), Bash(git:*), Read(*)
---

Remove a worktree by issue number or branch name.

Run from the main repo directory:
```bash
python3 <plugin-path>/scripts/worktree_remove.py <issue-number|branch-name> [options]
```

Options:
- `--dry-run` - preview without removing
- `--stash` - stash uncommitted changes first
- `--force` - force removal
- `--delete-branch` - also delete the git branch
