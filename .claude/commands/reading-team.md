---
name: reading-team
description: Launch the reading app development team — lead coordinates 4 feature-sliced teammates (db, ui, ai-pipeline, srs)
arguments:
  - name: task
    description: What to work on (e.g. "create demo page with 3 curated stories")
    required: true
---

Launch the reading app development team for: $ARGUMENTS

## Setup

1. Create an agent team `reading-team` with 4 teammates
2. Start the reading-team-leader to coordinate
3. Pass the task description to the leader

The leader will:

- Read the design spec and plan for context
- Break the task into sub-tasks for each teammate
- Spawn teammates with file-ownership boundaries
- Require plan approval before implementation
- Run verification after all teammates finish
- Report results back here
