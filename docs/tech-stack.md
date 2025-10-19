# Tech Stack

## Essential Commands

```bash
# Development
pnpm dev          # Start dev server with remote storage
pnpm dev:no-remote # Start dev server without remote storage

# Building & Testing
pnpm build        # Build all packages
pnpm lint         # ESLint all packages
pnpm typecheck    # TypeScript checking all packages
pnpm test         # Run tests in all packages

# Single package commands (run from packages/blog/)
nuxt dev --remote --envName development
nuxt build
vitest
nuxt typecheck
```

## Architecture Overview

- **Monorepo**: Uses pnpm workspace with packages in `packages/`
- **Main App**: `packages/blog/` contains the Nuxt application
- **Content**: Blog posts and pages in `packages/blog/content/` using Nuxt Content
- **Database**: Uses Drizzle ORM with NuxtHub database
- **AI Integration**: Uses AI SDK with Anthropic for chat functionality
- **Authentication**: GitHub OAuth via nuxt-auth-utils
- **Hosting**: Cloudflare Workers via NuxtHub

## Key Technologies

- **Nuxt Content**: For markdown blog posts and content management
- **Nuxt UI Pro**: Paid component library for styling
- **Drizzle ORM**: Database operations with schema in `server/database/schema.ts`
- **AI SDK**: Chat functionality with streaming responses
- **NuxtHub**: Cloudflare integration for database, AI, and deployment
