---
description: Create a new git worktree with slot allocation
allowed-tools: Bash(python:*), Bash(python3:*), Bash(git:*), Read(*)
---

Create a worktree for the given issue number or branch name.

Run from the main repo directory:
```bash
python3 <plugin-path>/scripts/worktree_create.py <issue-number|branch-name> [--dry-run]
```

Arguments:
- Issue number (e.g., `142`) - fetches title from GitHub
- Branch name (e.g., `feature/my-branch`) - uses directly
- `--dry-run` - preview without creating
