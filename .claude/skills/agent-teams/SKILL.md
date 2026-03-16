---
name: agent-teams
description: >
  How to build and use Claude Code agent teams — multi-agent coordination with teammates,
  shared task lists, messaging, and tmux/iTerm2 split panes. Use this skill whenever the user
  asks about agent teams, creating teams, coordinating teammates, spawning teammates, team
  configuration, teammate communication, task dependencies, or wants to build a multi-agent
  workflow. Also use when the user mentions "teammates", "team lead", "shared tasks",
  "tmux panes", or wants parallel agents that communicate with each other (not just subagents
  that report back).
user-invocable: true
argument-hint: '[question or task]'
---

# Claude Code Agent Teams

Agent teams let a lead agent spawn independent teammates that coordinate via a shared task list and messaging — unlike subagents which only report results back to the caller.

**Docs:** https://docs.anthropic.com/en/docs/claude-code/agent-teams
**Subagents docs:** https://docs.anthropic.com/en/docs/claude-code/sub-agents
**Skills docs:** https://docs.anthropic.com/en/docs/claude-code/skills
**Plugins docs:** https://docs.anthropic.com/en/docs/claude-code/plugins

## Prerequisites

Requires Claude Code v2.1.32+ and the experimental flag enabled:

```json
// ~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

## When to Use Teams vs Subagents

| Need                                            | Use      |
| ----------------------------------------------- | -------- |
| Focused task, result returned to caller         | Subagent |
| Multiple agents that need to talk to each other | Team     |
| Independent context windows, self-coordination  | Team     |
| Lower token cost, summarized results            | Subagent |
| Complex multi-phase workflows with dependencies | Team     |

## Architecture

A team has 4 components:

1. **Lead** — the main Claude Code session that creates the team and coordinates
2. **Teammates** — separate Claude Code instances with their own context windows
3. **Task list** — shared work items teammates claim and complete (file-lock based)
4. **Mailbox** — `message` (one teammate) or `broadcast` (all) communication

Storage paths:

- Team config: `~/.claude/teams/{team-name}/config.json`
- Tasks: `~/.claude/tasks/{team-name}/`

## Display Modes

Set `teammateMode` in settings.json or use `--teammate-mode` flag:

| Mode             | Behavior                                                       |
| ---------------- | -------------------------------------------------------------- |
| `auto` (default) | Split panes if in tmux, else in-process                        |
| `in-process`     | All in one terminal. Shift+Down to cycle, Ctrl+T for task list |
| `tmux`           | Each teammate gets own tmux pane                               |
| `iterm2`         | Each teammate gets own iTerm2 tab                              |

Split panes not supported in: VS Code terminal, Windows Terminal, Ghostty.

## Building a Team: Step by Step

### 1. Create the team leader agent

The leader is a custom agent (`.claude/agents/my-team-leader.md`) that orchestrates:

```yaml
---
name: my-team-leader
description: Orchestrates the team. Coordinates teammates, manages phases, runs verification.
color: blue
---

You are the leader of a development team. You coordinate N teammates through phases.

## Responsibilities

1. **Phase 1 (Plan):** Break task into sub-tasks. Assign to teammates by file ownership.
2. **Phase 2 (Implement):** Spawn teammates. Require plan approval before coding.
3. **Phase 3 (Verify):** Run typecheck, lint, tests after all teammates finish.
4. **Phase 4 (Report):** Send summary to user via SendMessage.

## Teammates

- **worker-a** — owns src/feature-a/, types related to A
- **worker-b** — owns src/feature-b/, types related to B

## Task Assignment Rules

- Only spawn teammates that are needed for the current task
- If worker-a changes shared types, it must finish before worker-b starts (dependency)
- Avoid assigning work that crosses file ownership boundaries
```

### 2. Create teammate agents

Each teammate is also a custom agent (`.claude/agents/worker-a.md`):

```yaml
---
name: worker-a
description: Feature A developer. Owns src/feature-a/ files.
color: green
---

You are a specialist for Feature A. You own these files:
- src/feature-a/**
- tests/feature-a/**

Follow the team lead's task assignments. Commit after completing each task.
```

### 3. Create a launch command

A skill or command (`.claude/commands/my-team.md`) ties it together:

```yaml
---
name: my-team
description: Launch the development team
arguments:
  - name: task
    description: What to work on
    required: true
---

Launch the development team for: $ARGUMENTS

## Setup

1. Create an agent team `my-team` with N teammates
2. Start the my-team-leader to coordinate
3. Pass the task description to the leader
```

## Key Features

### Task Dependencies

Tasks can depend on other tasks. A dependent task stays `pending` until its dependency completes:

- Lead assigns tasks with dependency relationships
- Teammates auto-claim unassigned, unblocked tasks via file locking
- Task states: `pending` → `in progress` → `completed`

### Plan Approval

Require teammates to plan before implementing — the lead reviews and approves/rejects plans before code is written.

### Hooks

Two team-specific hook events:

| Hook            | When                      | Exit code 2 effect           |
| --------------- | ------------------------- | ---------------------------- |
| `TeammateIdle`  | Teammate about to go idle | Sends feedback to teammate   |
| `TaskCompleted` | Task marked complete      | Prevents completion (blocks) |

### Inter-agent Communication

- `message`: Send to one specific teammate
- `broadcast`: Send to all teammates
- `SendMessage`: Report results back to the user

## Best Practices

1. **3-5 teammates** for most workflows — more creates coordination overhead
2. **5-6 tasks per teammate** — enough to stay busy, not overwhelming
3. **Give context in spawn prompts** — teammates don't inherit the lead's conversation history
4. **Assign distinct file ownership** — prevents merge conflicts and wasted work
5. **Start with research/review tasks** before parallel implementation
6. **Use phases** — gather info, then implement, then verify
7. **Always verify after implementation** — run typecheck, lint, tests as a final phase
8. **Handle failures gracefully** — if one teammate fails, continue with the rest

## Limitations

- No session resumption for in-process teammates
- One team per session
- No nested teams (teammates can't spawn their own teams)
- Lead is fixed (can't promote a teammate to lead)
- Task status can lag slightly

## Real-World Patterns

### Content Creation Team (parallel phases)

Phases: Gather (interviewer + researcher) → Draft → Review (voice + QA + images) → Report

### Feature Development Team (file-sliced)

Each teammate owns a vertical slice: database, UI, AI pipeline, business logic. Dependencies flow from schema → logic → UI.

### Research Team

Multiple research agents explore different aspects in parallel, then a synthesizer combines findings.
