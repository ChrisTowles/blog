---
description: Create git commit
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*), AskUserQuestion(*)
---

## Context

- Current git status: !`git status`
- Current git diff (staged changes): !`git diff HEAD`
- Current branch: !`git branch --show-current`
- Recent commits: !`git log --oneline -10`

## Your task

1. generate 5 **single line** commit messages with conventional commits format.
2. **Use AskUserQuestion tool** to ask which of those, or their own to use, to create the commit.
3. Create a single git commit with that message using `git commit -m "<message>"`.
