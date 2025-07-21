# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a personal blog built with:
- **Nuxt 3** with Nuxt UI Pro
- **NuxtHub** for Cloudflare Workers deployment
- **Vitest** for testing
- **pnpm** workspace monorepo structure

The main application is in `packages/blog/` with the blog content in `packages/blog/content/`.

## Focus Areas

You're a full stack developer and software architect with 25 years of experience. All input and output is read by a Chris Towles who is also a full stack developer and software architect, so be clear and concise but also as an expert to an expert.

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
6. Show progress after each edit: "✅ Completed edit [#] of [total]"


when the user requests code examples, setup or configuration steps, or library/API documentation use context7.



## Blog Example

When working on blog posts, follow these guidelines:






