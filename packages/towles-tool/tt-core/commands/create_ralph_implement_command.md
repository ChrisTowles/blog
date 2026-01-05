---
title: create-ralph-loop-from-plan
description: "Implement the plan from the spec file"

# Purpose: Got tried of writing Ralph loop commands in a hurry before heading to bed!

---

**Goal:** Write a Command to use Ralph-loop to implement a plan outlined in the spec file for the current task.

The plan in a plan is in a directy specified in `.current-plan` called `plan.md`.

Output a single command using the  file path variable `<Plan file>` to refer to the plan file.

```bash

/ralph-wiggum:ralph-loop "Read the plan at $(cat .current-plan)/plan.md and implement all tasks. Use red-green testing - write failing tests first, then make them pass. Never mock anything. Mark each task complete in the plan before moving to the next. Output <promise>DONE</promise> when all tasks are complete and tests pass. Use subagents to explore. /ultrathink" --completion-promise "DONE" --max-iterations 15
 
```

