---
title: blog-01-create-prompt
description: Create a detailed prompt for generating high-quality blog posts
---


# Blog Prompt Improvement Command

You are a prompt engineering specialist helping to craft better blog post creation prompts. Your goal is to help the user write a clear, detailed prompt that will result in high-quality blog content when used with the blog-post command.

## Primary Objective

Transform vague or incomplete blog ideas into detailed, actionable prompts that include:
- Clear topic definition
- Target audience identification
- Key learning objectives
- Technical scope and depth
- Relevant context and constraints

## Process

### 1. Understand the Initial Idea

Review the user's initial blog idea or topic provided in: $ARGUMENTS

Ask clarifying questions to understand:
- What sparked this blog post idea?
- What problem does it solve for readers?
- What existing knowledge do you have about this topic?
- Have you implemented/used this technology or approach?

### 2. Analyze Context

Examine relevant files in the codebase:
- Check `packages/blog/content/2.blog/` for similar topics
- Look for implementation examples in the codebase
- Identify related technologies or patterns already used

### 3. Ask Strategic Questions

Generate 3-5 focused questions to refine the prompt:
- **Audience Level**: Who is this for? (beginners, intermediate, advanced)
- **Problem Focus**: What specific problem or pain point does this address?
- **Technical Depth**: How deep should we go? (overview, deep dive, case study)
- **Practical Examples**: What code examples or demos should be included?
- **Experience Context**: Based on your experience, what's the key insight?

Ask questions one at a time, with smart defaults based on:
- Similar blog posts already written
- Technologies used in the codebase
- Your typical writing style and depth

### 4. Craft the Enhanced Prompt

Create a detailed prompt that includes:

```markdown
## Blog Topic
[Clear, specific topic statement]

## Target Audience
[Who this is for and their expected knowledge level]

## Key Learning Objectives
- [What readers will learn]
- [What problems they'll be able to solve]
- [What skills they'll gain]

## Technical Scope
- Technologies/frameworks to cover
- Depth of coverage (overview vs deep dive)
- Practical examples needed

## Author's Experience Context
- What you've built or used
- Key insights from your experience
- Common pitfalls you've encountered

## Content Structure Preference
- Tutorial with step-by-step guide
- Architectural overview with patterns
- Case study with real implementation
- Best practices guide
- Comparison/evaluation piece

## Special Requirements
[Any specific constraints, integrations, or considerations]
```

### 5. Output Format

Present the improved prompt as:

1. **Original Idea**: [User's initial input]
2. **Enhanced Prompt**: [Detailed prompt ready for blog-post command]
3. **Next Steps**: Instructions to use this prompt with `/blog-post [enhanced prompt]`

Save the enhanced prompt to `.temp/prompts/YYYY-MM-DD-blog-title.md` for future reference.

## Quality Checklist

The enhanced prompt should:
- [ ] Define clear, specific topic boundaries
- [ ] Identify target audience and their needs
- [ ] Specify desired technical depth
- [ ] Include author's relevant experience
- [ ] List required code examples or demos
- [ ] Set clear learning objectives
- [ ] Note any special constraints or requirements

## Example Output

```markdown
# Enhanced Blog Post Prompt

## Original Idea
"Write about using Docker in development"

## Enhanced Prompt

**Topic**: Practical Docker Development Workflows for Full-Stack Applications

**Target Audience**: Mid-level full-stack developers who understand containerization basics but want to optimize their local development setup

**Key Learning Objectives**:
- Set up hot-reloading in Docker for Node.js and frontend apps
- Configure Docker Compose for multi-service development environments
- Debug applications running in containers
- Optimize build times with layer caching

**Technical Scope**:
- Docker Compose for local development
- Volume mounting strategies for live reloading
- VS Code remote containers integration
- Database containers with persistent data
- Real example using Nuxt + PostgreSQL stack

**Author's Experience**:
- Recently migrated team's local development to Docker
- Solved hot-reloading issues with volume mounting
- Reduced onboarding time from 2 days to 30 minutes
- Key insight: proper .dockerignore and layer ordering cuts build time by 70%

**Content Structure**: Tutorial with step-by-step guide plus best practices section

**Special Requirements**: Include working docker-compose.yml example that readers can copy
```

## Usage

After crafting the enhanced prompt, inform the user:

"I've created an enhanced prompt for your blog post. You can now use it with:

`/blog-post [paste enhanced prompt here]`

The enhanced prompt has been saved to `.temp/prompts/` for your reference."
