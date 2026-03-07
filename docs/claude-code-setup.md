# Claude Code Setup

Current Claude Code configuration for this project. All paths relative to `.claude/`.

## Skills

### Blog Writing Pipeline

Four sequential skills for the blog content creation workflow:

| Skill                   | Purpose                                                                                                                                                                        | Trigger                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| `blog-01-create-prompt` | Generates a detailed prompt from a blog idea using the `blog-content-architect` agent. Saves output to `._tmp/prompts/`.                                                       | `/blog-01-create-prompt <idea>`                |
| `blog-02-write-post`    | Writes a full blog post from a prompt. Researches similar posts, asks clarifying questions, confirms outline, then writes. Uses `blog-content-architect` agent for voice/tone. | `/blog-02-write-post @._tmp/prompts/<file>`    |
| `blog-03-review`        | Reviews and edits an existing blog post for clarity, voice, structure, code quality, and length (800-1500 words target). Applies edits directly.                               | `/blog-03-review` (prompts for post selection) |
| `blog-04-image-prompt`  | Generates AI image prompts for blog hero images. Outputs include Google AI Studio links with URL-encoded prompts. Saves to `._tmp/images/`.                                    | `/blog-04-image-prompt <post path or topic>`   |

### Blog Utilities

| Skill             | Purpose                                                                                                                                                                                                             | Trigger                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `blog-mermaid`    | Creates mermaid diagrams matching the blog's sky/zinc color theme. Includes templates for flowcharts, sequence diagrams, and style guidelines.                                                                      | When adding diagrams to blog content                                                        |
| `fix-blog-images` | Fixes image issues in uncommitted posts: renames generic filenames, moves images to `/images/blog/`, fixes paths to absolute, improves alt text. Includes a Python analysis script at `scripts/fix_blog_images.py`. | "fix blog images", "check images", "prepare post for publish", or after pasting screenshots |

### Loan Application Demo Skills

Three skills forming a multi-agent loan underwriting demo. Each outputs structured JSON with `decision`, `flags`, and `analysis`.

| Skill             | Purpose                                                                                                               | Trigger                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `loan-background` | Fraud detection agent. Checks income/employment plausibility, internal consistency, and common fraud patterns.        | When processing loan applications (background check phase) |
| `loan-market`     | Market analyst agent. Evaluates deal structure: property value, LTV, down payment %, loan type (conforming vs jumbo). | When processing loan applications (market analysis phase)  |
| `loan-the-bank`   | Conservative bank underwriter agent. Evaluates DTI, LTV, credit score tiers, employment stability.                    | When processing loan applications (financial risk phase)   |

### Framework Reference Skills

| Skill     | Purpose                                                                                                                                                                                                                                                                                                                                                                                                           | Trigger                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `nuxt-v4` | Comprehensive Nuxt 4 framework reference (900+ lines). Covers SSR, composables, data fetching, server routes, routing, SEO, state management, error handling, hydration, performance, testing, and Cloudflare deployment. Includes 7 deep-dive reference files in `references/`. Sourced from [secondsky/claude-skills](https://github.com/secondsky/claude-skills) (vendored locally to avoid prompt injection). | Any Nuxt 4 development work     |
| `slidev`  | Slidev presentation framework reference. Covers file format, frontmatter, layouts, click animations, code blocks, presenter notes. Slides live in `packages/slides/`.                                                                                                                                                                                                                                             | Creating or editing slide decks |

## Agents

| Agent                    | Purpose                                                                                                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `blog-content-architect` | Enforces the blog's authentic writing voice and tone. Modeled after Matt Pocock's style: personal, humble, peer-to-peer, concise. Used by the blog writing pipeline skills. Includes a tone validation checklist and examples of good/bad voice. |

## MCP Servers

None configured. No `.claude/mcp.json` exists in the project.

## Slash Commands

None. No `.claude/commands/` directory exists.

## Settings

From `settings.json`:

- **Allowed tools**: `git commit`, `git push`, `bun`, `WebFetch`, `mkdir`, `ls`, `timeout`
- **Additional directories**: `/home/ctowles/code/f`
- **Plugins**: None enabled

## Gaps and Opportunities

- **No MCP servers** -- could add filesystem, GitHub, or database MCP servers for richer tool integration.
- **No slash commands** -- the blog pipeline skills could be exposed as `/commands` for faster invocation.
- **No linting/testing skill** -- a skill encoding the project's verification workflow (test, lint, typecheck, integration, e2e, screenshot) could reduce repeated instructions from CLAUDE.md.
- **Nuxt UI skill missing** -- the nuxt-v4 skill references a `nuxt-ui-v4` related skill that isn't installed.
- **Loan skills are standalone** -- no orchestrator skill that runs all three loan agents together and synthesizes a final decision.
- **Image generation skill is manual** -- could integrate with an image generation API directly instead of producing prompts for external tools.
