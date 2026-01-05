---
title: plan
description: "Interview user and create implementation plan"

# created based on Thariq Shihipar prompt in blog post
# https://x.com/trq212/status/2005315275026260309

---


Interview me in detail using `AskUserQuestion` about:
- Technical implementation
- UI & UX
- Concerns and tradeoffs
- Edge cases

Ask non-obvious questions. Continue interviewing until complete.

## Explore

### Codebase Research

Use Task agents (subagent_type=Explore) to:
- Find relevant files, patterns, conventions
- Understand existing architecture
- Identify dependencies and conflicts


## Output

DO NOT write code yet.

Write the Plan to implement with TODOS and if large phases to `docs/tasks/{YYYY-MM-DD}-{topic}/plan.md`


1. Codebase context
2. Expert recommendations
   1. include citations/links
3. Recommended approach based on research

Then update `.current-plan` in repo root with the task folder path.


## Finally

Lasty ask the user if they want to create a GitHub issue from the plan. If yes, create issue in relevant repo with title and body from plan.

