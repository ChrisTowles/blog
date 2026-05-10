---
name: typing-team
description: Launch the typing app development team — lead coordinates 5 feature-sliced teammates (db, ui, ai, engine, games) to refactor the reading app into a kid-friendly typing tutor at /typing with families/classrooms, spelling-list import, and PixiJS games
arguments:
  - name: task
    description: What to work on (e.g. "do phase 0 cutover", "build phase 4 groups + learners", "ship Letter Rain game", "wire spelling list import")
    required: true
---

Launch the typing app development team for: $ARGUMENTS

## Setup

1. Create an agent team `typing-team` with 5 teammates: typing-db, typing-ui, typing-ai, typing-engine, typing-games.
2. Start the typing-team-leader to coordinate.
3. Pass the task description to the leader.

The leader will:

- Read `docs/specs/2026-05-10-typing-app-design.md` and `docs/specs/2026-05-10-typing-app-plan.md`
- Ensure `feature/typing-app` branch exists and is checked out
- Break the task into sub-tasks with file-ownership boundaries
- Spawn teammates and require plan approval before implementation
- Run verification (`pnpm typecheck && pnpm lint && pnpm test -- --run`, plus dev-server screenshot from phase 3 onward)
- Commit each task with `feat(typing):` / `fix(typing):` / `chore(typing):` scope
- Report results back here via SendMessage
