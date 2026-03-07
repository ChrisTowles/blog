---
name: blog-03-review
description: 'Review and improve the blog post draft for clarity, engagement, SEO, and authentic voice.'
---

# Blog Post Review Command

Use the `blog-content-architect` agent to review and improve an existing blog post draft. Focus on clarity, technical accuracy, engagement, SEO, and preserving the author's authentic voice.

## Review Process

### 1. Identify the Blog Post

- If the user hasn't specified a blog post, list recent posts in `packages/blog/content/2.blog/` and ask which one to review
- Read the complete blog post file

### 2. Core Review Criteria

#### Focus & Clarity (CRITICAL)

- [ ] **ONE Big Idea**: Does the post focus on mainly one, clear concept?
  - [ ] If other ideas are present, are they tightly related?
- [ ] **Clear Value Proposition**: Is it immediately obvious what the reader will learn?
- [ ] **Stays On Topic**: Does every section support the main idea?
- [ ] **No Scope Creep**: Are there tangents or secondary topics that dilute the message?

#### Length & Structure

- [ ] **Word Count**: 800-1500 words (max 2000 for deep technical dives)
- [ ] **Section Count**: 3-4 sections maximum (excluding intro/conclusion)
- [ ] **Logical Flow**: Does the structure support progressive learning?
- [ ] **Section Balance**: Are sections roughly equal in depth and length?

#### Code Examples

- [ ] **Minimal Snippets**: 2-3 code examples maximum
- [ ] **Snippet Length**: 10-20 lines each (exceptions for critical context)
- [ ] **Code Quality**: Working, practical examples
- [ ] **Explanation**: Each snippet has clear context and explanation

#### Voice & Tone (CRITICAL)

- [ ] **Authentic & Vulnerable**: Writing feels genuine, not authoritative or preachy
- [ ] **Learning Together**: Tone is "I'm figuring this out too" not "let me teach you"
- [ ] **Experience-Based**: Shares real lessons learned, including mistakes
- [ ] **Humble Expert**: Balances 25 years experience with openness to learning
- [ ] **Conversational**: Reads like talking with a peer, not lecturing

#### Technical Quality

- [ ] **Accuracy**: Technical details are correct
- [ ] **Best Practices**: Follows current industry standards
- [ ] **Context**: Explains WHY behind decisions, not just HOW
- [ ] **Practical Value**: Provides actionable insights
- [ ] **Troubleshooting**: Includes common pitfalls or gotchas

#### SEO & Discoverability

- [ ] **Title**: Descriptive, includes primary keyword, under 60 characters
- [ ] **Description**: Frontmatter `description` is compelling and includes key terms (under 160 characters)
- [ ] **Headings**: H2/H3 headings use natural keyword variations
- [ ] **Opening Paragraph**: First 100 words clearly state what the post covers
- [ ] **Internal Links**: Links to related posts on the blog where relevant
- [ ] **Alt Text**: Images have descriptive alt text in frontmatter

### 3. Make Edits

Apply improvements directly to the post. For each change, briefly note why.

### 4. Summary & Next Step

After editing, present:

1. **Changes Made**: Brief summary of improvements
2. **Remaining Concerns**: Anything that needs the author's judgment
3. **Next step**: `/blog-04-image-prompt packages/blog/content/2.blog/{post-filename}`
