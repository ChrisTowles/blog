---
title: research
description: "Research a topic then use findings to interview and build a plan"
---

use $ARGUMENTS  as the Topic of research.

If empty, ask the user the Problem or Topic they want to research.

First, gather context silently:
1. WebSearch for how thought leaders approach this topic
2. Explore agent to find how this repo currently handles similar patterns

Research and explore for relevant information:
- Patterns/tradeoffs you discovered from thought leaders
- Gaps or opportunities you found in the codebase
- Technical decisions that matter based on real examples


write the research to file `docs/tasks/{YYYY-MM-DD}-{topic}/research.md`

Tell me to run the `plan` command next to interview me based on your research and build a plan.

```bash
/plan "docs/tasks/{YYYY-MM-DD}-{topic}/research.md"
```