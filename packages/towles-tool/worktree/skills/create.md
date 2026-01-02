---
description: Context for creating git worktrees with slot allocation
---

## Worktree Creation Context

### Prerequisites
- Config must exist in `../{repo}-worktrees/config/` (run `/worktree:init` first)
- For issue numbers, `gh` CLI must be authenticated

### How It Works
1. Finds first available slot from registry
2. For issue numbers: fetches title from GitHub, creates `feature/{issue}-{slug}`
3. Creates git worktree in `../{repo}-worktrees/{branch-slug}/`
4. Processes `.env*.template` files with slot values
5. Updates registry with slot assignment

### Template Variables
- `{{VAR}}` - replaced from `slots.toml` for assigned slot
- `{{COPY:VAR}}` - copied from main repo's `.env*` files

### Error Handling
- **No config**: Run `/worktree:init` first
- **No free slots**: Run `/worktree:list`, remove unused with `/worktree:remove`
- **Issue not found**: Check issue number, verify `gh auth status`
- **Branch exists**: Prompt to use existing or create fresh
- **Port in use**: Warning only, doesn't block creation
