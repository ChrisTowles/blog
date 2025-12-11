# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Structure

Personal blog/website - Vue/Nuxt monorepo.

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
pnpm dev              # Dev server with remote storage
pnpm dev:no-remote    # Dev server without remote storage

# Build & Test
pnpm build            # Build all packages
pnpm lint             # ESLint
pnpm typecheck        # TypeScript checks
pnpm test             # Vitest

# Single package (from packages/blog/)
nuxt dev --remote --envName development
nuxt build
vitest
nuxt typecheck

# Slides
pnpm run slides:upgrade   # Start slide server
```

## Tech Stack

- **Framework**: Nuxt + Nuxt UI Pro + Nuxt Content
- **Database**: Drizzle ORM with PostgreSQL (Cloud SQL)
- **AI**: AI SDK with Anthropic
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
