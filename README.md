# Chris Towles Blog

![cicd badge](https://github.com/ChrisTowles/blog/actions/workflows/ci.yml/badge.svg?branch=main)

This is just my personal blog at <https://Chris.Towles.dev>

## Quick Links

- [Blog](https://chris.towles.dev)
- [Nuxt UI Components](https://ui.nuxt.com/components#element)
- [Google Search Console](https://search.google.com/search-console/)
- [AWS Console](https://ctowles.awsapps.com/start/#/?tab=accounts)
  - `223452314076`
  - `aws configure sso`
- [Claude Code Docs](https://code.claude.com/docs/en/claude_code_docs_map.md)
- [Hosting & Deployment](docs/hosting.md)

-

## Claude Code Plugin Marketplace

This repo is also a [Claude Code](https://docs.anthropic.com/en/docs/claude-code) plugin marketplace.

> These plugins used to live in a separate repo ([towles-tool](https://github.com/ChrisTowles/towles-tool)), but I got tired of updating two repos. Monorepo it is.

### Available Plugins

| Plugin          | Commands/Hooks             | Description                           |
| --------------- | -------------------------- | ------------------------------------- |
| `tt-core`       | `/tt:commit`, `/tt:refine` | Git commit generator, text refinement |
| `notifications` | Stop hook                  | Audio notification when Claude stops  |

### Adding a Marketplace

```bash
# From GitHub repo
claude plugin marketplace add ChrisTowles/blog

# From local directory
claude plugin marketplace add ./

# List marketplaces
claude plugin marketplace list

# Update
claude plugin marketplace update towles-tool


```

### Adding a Plugin

```bash

# Example
claude plugin install tt@towles-tool --scope user
```

Scopes: `user` (~/.claude/), `project` (.claude/), `local` (current dir)

### Plugin Structure

```
.claude-plugin/
└── marketplace.json          # Marketplace config
packages/claude-plugins/
├── tt-core/
│   ├── .claude-plugin/plugin.json
│   └── commands/             # Skill definitions
└── notifications/
    ├── .claude-plugin/plugin.json
    └── hooks/                # Hook scripts
```

## Blog Tech Stack

- [Nuxt](https://nuxtjs.org/)
  - using nuxt-content
- [Nuxt UI Pro](https://ui.nuxt.com/)
  - Paid for [Nuxt UI Pro](https://ui.nuxt.com/) ($249)
    - First, any time I spend doing CSS and even Tailwind is time wasted.
    - Happy to give back to NuxtLabs, I've used so much from [Anthfu](https://github.com/antfu), [Daniel Roe](https://github.com/danielroe) and Vue and Nuxt core members.
- [GCP Cloud Run](https://cloud.google.com/run) — Production hosting with Cloud SQL (PostgreSQL)
- [Nuxt Chat](https://github.com/nuxt-ui-pro/chat)
  - using the Nuxt UI Pro Chat Template
- Icons
  - <https://heroicons.com/>
  - <https://simpleicons.org/>

- GitHub OAuth client ID - Setup
- https://github.com/settings/developers
- https://nuxt.com/modules/auth-utils

## Development

```bash
# Install dependencies
pnpm install

# Start dev server with remote storage
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Deployment

```bash
pnpm gcp:prod:deploy
```

## Content Management

Blog posts are stored in `packages/blog/content/2.blog/` using Markdown with frontmatter.

### Creating Blog Posts

File naming: `YYYYMMDD.post-title.md`

Use the blog-content-architect agent for creating focused, concise posts (800-1500 words).

## AI Agent Design Principles

From [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents):

- **Simplicity** - Start straightforward, add complexity only when it demonstrably improves outcomes
- **Transparency** - Explicitly show planning steps
- **Strong interfaces** - Thorough tool documentation and testing
- **Sandbox first** - Extensive testing in isolated environments with guardrails

## Great Examples of Nuxt UI Pro

- <https://github.com/nuxt-ui-pro/saas>
- <https://github.com/nuxt-ui-pro/landing>
