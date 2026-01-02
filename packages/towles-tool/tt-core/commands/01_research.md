---
title: research
description: "Gather information before planning"

# Created based on https://www.anthropic.com/engineering/claude-code-best-practices and keeping it simple.
---

Ask the user for their topic/goal.

## Codebase Research
Use Task agents (subagent_type=Explore) to:
- Find relevant files, patterns, conventions
- Understand existing architecture
- Identify dependencies and conflicts

## External Research
Use WebSearch to find:
- How thought leaders/experts approach this problem
- Best practices from top practitioners
- Common pitfalls and lessons learned
- Recent developments or preferred patterns

Loop: if findings raise new questions, search again until you have a clear picture of the ideal approach.

## Output

DO NOT write code yet.

Write findings to `docs/tasks/{YYYY-MM-DD}-{topic}/research.md` with:
1. Codebase context
2. Expert recommendations
   1. include citations/links
3. Recommended approach based on research

Then update `.current-plan` in repo root with the task folder path.

Use AskUserQuestion before moving to planning (02_plan).s
