# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Structure

Personal blog/website - Vue/Nuxt monorepo. Also serves as a playground for testing AI features.

```
packages/
├── blog/           # Main Nuxt application
│   ├── content/    # Markdown blog posts (Nuxt Content)
│   └── server/database/schema.ts  # Drizzle ORM schema
└── slides/         # Slidev presentations
infra/terraform/    # GCP infrastructure
```

## Essential Commands

```bash
# Development
bun dev              # Dev server with remote storage
bun dev:no-remote    # Dev server without remote storage

# Build & Test
bun run build        # Build all packages
bun run lint         # ESLint
bun run typecheck    # TypeScript checks
bun run test         # Vitest

# Single package (from packages/blog/)
nuxt dev --remote --envName development
nuxt build
vitest
nuxt typecheck

# Slides
bun run slides:upgrade   # Start slide server
```

## Tech Stack

- **Framework**: Nuxt + Nuxt UI Pro + Nuxt Content
- **Database**: Drizzle ORM with PostgreSQL (Cloud SQL)
- **AI**: Anthropic SDK with tool calling, integrated chatbot
  - RAG pipeline: semantic search + BM25, followed by reranker
- **Auth**: GitHub OAuth via nuxt-auth-utils
- **Monorepo**: Bun workspaces

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

## Agent Usage

**Always use subagents for everything.** When exploring code, researching, planning, or doing multi-step work - spawn a Task agent. This keeps context clean, enables parallelism, and matches the workflow documented in #100.

Examples:
- Codebase exploration → `Task` with `subagent_type=Explore`
- Implementation planning → `Task` with `subagent_type=Plan`
- Feature development → `Task` with `subagent_type=feature-dev:*`
- Code review → `Task` with `subagent_type=feature-dev:code-reviewer`
