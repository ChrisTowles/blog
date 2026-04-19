---
name: go
description: End-to-end feature workflow — branch, implement, test, simplify, review, commit, PR
---

Run the full feature workflow for the feature described in the current conversation. Do not ask the user to restate it — infer the feature from the prior turns.

## Pipeline

Execute these steps in order. Each step must complete before the next.

### 1. Branch

Check `git branch --show-current`.

- If on `main`: create a new branch named after the feature (short kebab-case, e.g. `feat/chat-streaming-retry`) and check it out.
- If on any other branch: stay on it. Do **not** prompt the user to confirm, do **not** cut a new branch, do **not** switch to `main` first. The feature ships as additional commits on the current branch; that is a supported workflow. Existing uncommitted working-tree changes (modifications and untracked files) that are unrelated to this feature stay untouched — commit only the files this feature changes, via explicit `git add <path>` in step 6.

### 2. Implement

Build the feature based on what was discussed in the conversation. Edit existing files in preference to creating new ones. Follow the project conventions in `CLAUDE.md` (hard cutover, no backward compatibility, no premature abstractions, minimal comments).

### 3. Test

Run the verification stack from `CLAUDE.md`. All must pass before moving on — do not accept pre-existing failures, fix them.

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration   # needs DATABASE_URL
```

If the feature touches UI: start `pnpm dev`, hit the page with `npx playwright screenshot`, and verify visually. Report "can't verify UI" explicitly if you can't.

### 4. Simplify

Invoke `/simplify` on the diff. Read its recommendations, then **apply every fix it suggests** to the working tree before continuing. Re-run `pnpm lint` + `pnpm typecheck` after applying — simplify passes can break things.

### 5. Review

Invoke `/review` on the diff. Read its findings, then **apply every fix it suggests** to the working tree. Re-run the full test stack from step 3 after applying — review fixes can regress behavior.

### 6. Commit

Follow the commit protocol from the system prompt:

- `git status` + `git diff` + `git log` in parallel.
- Stage specific files (no `git add -A`).
- Write a conventional-commit-style message that explains the _why_, not the _what_. Match the tone of recent commits (`git log --oneline -10`).
- Use a HEREDOC for the commit message.
- Never `--no-verify`. If a hook fails, fix the cause and make a new commit — never amend.

### 7. Pull Request

- Push with `-u` if the branch has no upstream.
- Run `gh pr create` with a title under 70 chars and a body containing `## Summary` (1–3 bullets) and `## Test plan` (checklist covering the steps you actually ran).
- Return the PR URL at the end.

## Guardrails

- Never force-push, never reset --hard, never touch `main` directly.
- If any step fails and the fix is non-obvious, stop and surface the failure instead of working around it.
- If the conversation doesn't contain a clear feature to build, stop at step 1 and ask the user what the feature is.
