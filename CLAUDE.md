# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Structure

Personal blog/website - Vue/Nuxt monorepo. Also serves as a playground for testing AI features.

```
.claude-plugin/     # Claude Code plugin marketplace config
packages/
├── blog/           # Main Nuxt application
│   ├── content/    # Markdown blog posts (Nuxt Content)
│   └── server/database/schema.ts  # Drizzle ORM schema
├── slides/         # Slidev presentations
└── claude-plugins/ # Claude Code plugins
    ├── tt-core/    # /tt:commit, /tt:refine commands
    └── notifications/  # Audio notification on Stop hook
infra/terraform/    # GCP infrastructure
```

## Claude Code Plugin Marketplace

This repo is a Claude Code plugin marketplace. Plugins live in `packages/claude-plugins/`.

**Available plugins:**
- `tt-core` - `/tt:commit` (git commits), `/tt:refine` (text refinement)
- `notifications` - Audio notification when Claude stops after Write/Edit

## Essential Commands

```bash
# Development
pnpm dev              # Dev server with remote storage
pnpm dev:no-remote    # Dev server without remote storage

# Build & Test
pnpm build            # Build all packages
pnpm lint             # ESLint (or oxlint)
pnpm typecheck        # TypeScript checks
pnpm test             # Vitest

# Single package (from packages/blog/)
nuxt dev --remote --envName development
nuxt build
vitest
nuxt typecheck

# Slides
pnpm slides           # Start slide server
```

## Tech Stack

- **Framework**: Nuxt + Nuxt UI Pro + Nuxt Content
- **Database**: Drizzle ORM with PostgreSQL (Cloud SQL)
- **AI**: Anthropic SDK with tool calling, integrated chatbot
  - RAG pipeline: semantic search + BM25, followed by reranker
- **Auth**: GitHub OAuth via nuxt-auth-utils
- **Monorepo**: pnpm workspaces

## Hosting & Deployment

**GCP** via Terraform. Migrated from Cloudflare Workers/NuxtHub.

### Architecture
- **Cloud Run**: Container hosting (scales to zero)
- **Cloud SQL**: PostgreSQL (public IP + Auth Proxy)
- **Artifact Registry**: Docker images
- **Secret Manager**: API keys, DB credentials, session passwords

### GCP Projects
- Production: `blog-towles-production`
- Staging: `blog-towles-staging`

### Terraform Structure
```
infra/terraform/
├── modules/
│   ├── cloud-run/    # Container hosting
│   ├── cloud-sql/    # PostgreSQL database
│   └── shared/       # IAM, service accounts, registry
└── environments/
    ├── staging/
    └── prod/
```

### Deploy Commands
```bash
# Staging
nr gcp:staging:init      # terraform init
nr gcp:staging:plan      # terraform plan
nr gcp:staging:apply     # terraform apply
nr gcp:staging:deploy    # build & push container, deploy
nr gcp:staging:logs      # tail logs

# Production
nr gcp:prod:init         # terraform init
nr gcp:prod:apply        # terraform apply
nr gcp:prod:deploy       # build & push container, deploy
nr gcp:prod:logs         # tail logs
```

Full terraform docs: [infra/terraform/README.md](infra/terraform/README.md)

## Code Style

- TypeScript only
- `async/await` for async code
- `import` syntax for modules
- camelCase variables/functions, PascalCase components
- Single quotes, 4 spaces indent
- Arrow functions for callbacks
- const/let appropriately, destructuring, template literals
- ES6+ features preferred

## Claude Code Docs

Reference: https://code.claude.com/docs/en/claude_code_docs_map.md

## Agent Usage

**Always use subagents for everything.** When exploring code, researching, planning, or doing multi-step work - spawn a Task agent. This keeps context clean, enables parallelism, and matches the workflow documented in #100.

Examples:
- Codebase exploration → `Task` with `subagent_type=Explore`
- Implementation planning → `Task` with `subagent_type=Plan`
- Feature development → `Task` with `subagent_type=feature-dev:*`
- Code review → `Task` with `subagent_type=feature-dev:code-reviewer`
