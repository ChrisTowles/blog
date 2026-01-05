---
title: create-ralph-loop-from-plan
description: "Implement the plan from the spec file"

# Purpose: Got tried of writing Ralph loop commands in a hurry before heading to bed!

---

**Goal:** Write a Command to use Ralph-loop to implement a plan outlined in the spec file for the current task.

The plan in a plan is in a directy specified in `.current-plan` called `plan.md`.

Output a single command using the  file path variable `<Plan file>` to refer to the plan file.

```

 /ralph-wiggum:ralph-loop "Read the <Plan file> and work to complete the tasks in it, Make red green tests. Never mock anything. mark Tasks done before moving on.  Output <promise>FIXED</promise> when all tests pass." --completion-promise "FIXED" --max-iterations 10 
 
```

