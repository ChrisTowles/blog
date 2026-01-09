---
title: ralph-plan
description: "Interview user and create concise tasks for ralph-loop"
allowed-tools: AskUserQuestion(*), Task(*), Bash(*), Read(*), Write(*), Edit(*)
---

# Ralph Task Planning

Interview the user and create actionable tasks for `ralph-state.json`.

## Interview Phase

Use `AskUserQuestion` to gather:

1. **Goal**: What do you want to accomplish?
2. **Scope**: What files/areas will this touch?
3. **Constraints**: Any requirements, patterns to follow, or things to avoid?
4. **Testing**: How should this be verified?

For any codebase questions, use `Task` with `subagent_type=Explore` to research.

Keep interview focused - 3-5 questions max.

## Task Creation

After gathering info, break down into **small, atomic tasks**:

- Each task should be completable in 1 iteration
- Tasks should be specific and actionable
- Include test/verify steps as separate tasks
- Order by dependencies

Example good tasks:
- "Add UserProfile type to types/user.ts"
- "Create getUserById function in services/user.ts"
- "Add unit test for getUserById"
- "Run typecheck and fix any errors"

Example bad tasks:
- "Implement user feature" (too vague)
- "Add types, service, and tests for user" (multiple things)

## Output

1. Show the user the proposed task list
2. Ask for approval/modifications using `AskUserQuestion`
3. Once approved, add tasks to `ralph-state.json` using:

```bash
./scripts/ralph-loop.ts --addTask "task description"
```

Add each approved task, then show final task list:

```bash
./scripts/ralph-loop.ts --listTasks
```

Tell user they can now run `./scripts/ralph-loop.ts` to start.
