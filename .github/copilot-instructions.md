# Copilot Instructions

This project is a web application of a personal blog. The application is built using Typescript; NuxtJs, NuxtJs UI PRO and hosted on GCP Cloud Run. Tests are in vitest.

## Project Structure

This is a personal blog built with:

- **Nuxt 3** with Nuxt UI Pro
- **GCP Cloud Run** with Docker containers
- **Vitest** for testing
- **pnpm** workspace monorepo structure

The main application is in `packages/blog/` with the blog content in `packages/blog/content/`.

## Essential Commands

```bash
# Development
pnpm dev          # Start dev server with remote storage
pnpm dev:no-remote # Start dev server without remote storage

# Building & Testing
pnpm build        # Build all packages
pnpm lint         # Lint all packages
pnpm typecheck    # TypeScript checking all packages
pnpm test         # Run tests in all packages

# Deployment
pnpm gcp:prod:deploy    # Deploy to GCP production
pnpm gcp:staging:deploy # Deploy to GCP staging
```

## Architecture Overview

- **Monorepo**: Uses pnpm workspace with packages in `packages/`
- **Main App**: `packages/blog/` contains the Nuxt application
- **Content**: Blog posts and pages in `packages/blog/content/` using Nuxt Content
- **Database**: Drizzle ORM with PostgreSQL (Cloud SQL)
- **AI Integration**: Anthropic SDK for chat functionality
- **Authentication**: GitHub OAuth via nuxt-auth-utils
- **Hosting**: GCP Cloud Run

## Key Technologies

- **Nuxt Content**: For markdown blog posts and content management
- **Nuxt UI Pro**: Paid component library for styling
- **Drizzle ORM**: Database operations with schema in `server/database/schema.ts`
- **Anthropic SDK**: Chat functionality with streaming responses
- **GCP**: Cloud Run deployment, Cloud SQL database

## Coding Standards

- Use camelCase for variables/functions, PascalCase for components
- Single quotes for strings, 4 spaces indentation
- Arrow functions for callbacks, async/await for async code
- Use const/let appropriately, destructuring, template literals
- ES6+ features preferred

## Large File Editing Protocol

When working with files >300 lines or complex changes:

1. Create detailed plan before making edits
2. Include all functions/sections needing modification
3. Show order of changes and dependencies
4. Format as "PROPOSED EDIT PLAN" with edit sequence
5. Wait for user confirmation before proceeding
6. Show progress after each edit: "Completed edit [#] of [total]"
