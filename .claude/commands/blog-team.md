---
name: blog-team
description: Launch the blog post creation team — interviewer, researcher, voice reviewer, image creator, QA checker in parallel tmux panes
arguments:
  - name: topic
    description: The blog post topic or a brief description
    required: true
  - name: links
    description: Comma-separated URLs to research (web pages, YouTube videos)
    required: false
---

Launch the blog post creation team for: $ARGUMENTS

## Setup

1. Create tmux session `blog-team` with 5 panes (leader, researcher, voice-reviewer, image-creator, qa-checker)
2. Start the blog-team-leader agent in pane 0
3. Pass the topic and links to the leader

The leader will:

- Launch the interviewer (communicates with you here in main terminal)
- Launch the researcher in tmux pane 1
- Wait for Phase 1 to complete
- Draft the post
- Launch review agents in parallel (panes 2-4)
- Report results back here

Watch the agents work: `tmux attach -t blog-team`
