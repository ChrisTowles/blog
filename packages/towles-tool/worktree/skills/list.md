---
description: Context for listing worktree slots
---

## Worktree Listing Context

### Status Meanings
- **active** - Worktree exists and is tracked in registry
- **free** - Slot available for new worktree
- **stale** - Registry has entry but worktree doesn't exist (manual deletion)

### Output Format
Table showing: Slot | Issue | Branch | Path | PORT | Status

### Stale Entries
Occur when worktrees are removed outside this tool (manual `git worktree remove`).
Use `/worktree:remove` to clean up the registry entry.

### Registry Location
`../{repo}-worktrees/.worktree-registry.json`
