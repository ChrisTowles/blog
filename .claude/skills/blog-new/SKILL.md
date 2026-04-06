---
name: blog-team
description: Launch the blog post creation team — interviewer, researcher, voice reviewer, QA checker in parallel tmux panes
arguments:
  - name: topic
    description: The blog post topic or a brief description
    required: true
  - name: links
    description: Comma-separated URLs to research (web pages, YouTube videos)
    required: false
---

Orchestrate a blog post creation team through 4 phases for: $ARGUMENTS

## Phase 1: Gather (Parallel)

Launch two Agent subagents in parallel:

1. **blog-interviewer** — spawned as Agent with `subagent_type: "blog-interviewer"`. Interviews the user via SendMessage to gather scope, opinions, key points, and personal experiences.
2. **blog-researcher** — spawned as Agent with `subagent_type: "blog-researcher"`. Researches the topic by scraping links, searching the web, and extracting YouTube transcripts.

Pass the topic and links to both agents. Wait for both to complete.

## Phase 2: Draft

Combine interviewer notes + researcher findings. Write the blog post to `packages/blog/content/2.blog/YYYYMMDD.slug-name.md` with complete frontmatter.

### Frontmatter Template

```yaml
---
title: 'Post Title'
description: 'Brief summary for SEO'
date: 'YYYY-MM-DD'
image:
  src: '/images/blog/YYYYMMDD-HHMM-slug.png'
  alt: 'Description'
authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png
badge:
  label: 'Category'
---
```

### Drafting Guidelines

- Use the `brand-voice` skill for voice/tone rules and the `blog-content-architect` skill for personality
- Use the interviewer's gathered answers as the backbone — these are the user's actual opinions and experiences
- Use the researcher's findings as supporting evidence and context

## Phase 3: Review (Parallel)

Launch three tasks in parallel:

1. **blog-voice-reviewer** — spawned as Agent with `subagent_type: "blog-voice-reviewer"`. Reviews draft for brand voice consistency.
2. **blog-qa-checker** — spawned as Agent with `subagent_type: "blog-qa-checker"`. Validates frontmatter, links, lint, typecheck, tests.
3. **blog-image** — use the `blog-image` skill to generate the hero image.

Wait for all to complete.

## Phase 4: Report

Apply any revisions from voice-reviewer and qa-checker. Report summary to user:

- Post path and title
- Image status
- QA results
- Any issues that need manual attention

## Error Handling

- If an agent fails, note the failure and continue with remaining agents
- If image generation fails, leave the frontmatter image path as a placeholder and note it in the report
- Always complete Phase 4 even if other phases had failures
