---
description: Initialize worktree config for a repository
allowed-tools: Bash(python:*), Bash(python3:*), Bash(mkdir:*), Read(*), Write(*), AskUserQuestion(*)
---

Initialize worktree configuration for the current repository. This is interactive - gather info then create config files.

1. Ask user for slot count (default 5)
2. Ask which env vars should be slot-specific (PORT, OAUTH_*, etc.)
3. Ask which env vars to copy from main repo
4. Create `../{repo}-worktrees/config/slots.toml`
5. Create `.env*.template` files
6. Initialize `.worktree-registry.json`

Reference the init skill for detailed steps and examples.
