# Blog Package

Nuxt 4 + Nuxt UI application with AI chat, RAG-powered search, and content management.

## Content Authoring

Posts live in `content/2.blog/` with naming convention `YYYYMMDD.slug-name.md`.

Required frontmatter (validated by Zod in `content.config.ts`):

```yaml
---
title: 'Post Title'
description: 'Brief summary for SEO'
date: '2026-01-15'
badge:
  label: 'Category'        # e.g. AI Tools, Kids, Productivity
image:
  src: '/images/blog/image.png'
  alt: 'Description'
authors:
  - name: Chris Towles
    to: https://twitter.com/Chris_Towles
    avatar:
      src: /images/ctowles-profile-512x512.png
---
```

Content collections are defined in `content.config.ts`: `index`, `posts`, `blog`, `appEntry`, `apps`.

## Database

PostgreSQL with Drizzle ORM. Schema in `server/database/schema.ts`, migrations in `server/database/migrations/`.

Key tables: `users`, `chats`, `messages`, `documents`, `document_chunks`.

```bash
pnpm db:migrate   # Run migrations (from root)
pnpm db:generate  # Generate migration after schema change
```

Drizzle config: `drizzle.config.ts`. Uses `DATABASE_URL` env var.

## RAG Pipeline

Contextual hybrid search system in `server/utils/rag/`:

- **chunker.ts** — Splits markdown into ~2000-char chunks with 400-char overlap, preserves paragraph boundaries
- **ingest.ts** — Reads `content/2.blog/*.md`, hashes for change detection, generates contextual descriptions via Claude Haiku (with prompt caching), embeds via AWS Bedrock Titan Text v2 (1024 dims)
- **retrieve.ts** — Hybrid search: parallel pgvector cosine + BM25 tsvector, Reciprocal Rank Fusion (0.7 semantic / 0.3 BM25), optional Cohere v3 reranking

Database: `documents` + `document_chunks` tables with pgvector HNSW index and GIN tsvector index.

### Search Endpoints

- `/api/search` (POST, public) — RAG search with reranking, deduplicates by document
- `/api/admin/rag/search-test` (POST, auth) — Debug endpoint with pipeline details and timings
- `/search` page — Public search UI with URL query params (`?q=`)

### AI Chat Tools

`server/utils/ai/tools/` — Claude Agent SDK tools used by the chat feature:
`searchBlogContent`, `getAuthor`, `getDateTime`, `getTopics`, `getWeather`, `rollDice`

## Auth

`nuxt-auth-utils` with GitHub OAuth. Admin pages use `auth` middleware. Login via popup flow.

## Key Patterns

- Server utils in `server/utils/` are auto-imported by Nitro (e.g. `retrieveRAG`, `embedText`, `useDrizzle`)
- Shared test IDs in `shared/test-ids.ts` — used by both Vue components and Playwright E2E tests
- UI components from `@nuxt/ui` (`UCard`, `UButton`, `UBlogPost`, `UPageHeader`, etc.)
- Route rules in `nuxt.config.ts`: `/` prerendered, `/chat/**` SSR disabled
