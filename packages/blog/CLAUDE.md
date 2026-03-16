# Blog Package

Main Nuxt 4 application — blog content, AI chat, RAG-powered search, and interactive artifacts.

## Key Directories

```
app/
├── components/         # Vue components (auto-imported by Nuxt)
│   ├── CodeRunner.vue    # MDC component for interactive code execution
│   ├── artifact/Output.vue # Renders artifact execution results
│   ├── prose/ProsePre.vue  # Code blocks with Shiki + Mermaid
│   ├── tool/               # Chat tool result renderers (Weather, Dice)
│   └── blog/               # Blog-specific components (PostList)
├── composables/        # Vue composables (auto-imported)
│   ├── useChat.ts          # Chat SSE streaming + message state
│   └── useArtifact.ts      # Artifact execution lifecycle + container reuse
└── pages/              # File-based routing

server/
├── api/                # Nitro API routes
│   ├── artifacts/          # Code execution + file download
│   ├── chats/              # Chat CRUD + AI streaming
│   ├── reading/            # Reading app (children, stories, srs, sessions, achievements, phonics)
│   └── admin/              # Admin endpoints (RAG management)
├── database/           # Drizzle ORM schema + migrations
└── utils/
    ├── ai/                 # Anthropic client, tools, streaming
    │   ├── tools.ts            # Tool registry + executeTool()
    │   └── tools/              # Individual tool definitions (Agent SDK format)
    ├── rag/                # Chunking, ingestion, retrieval
    └── reading/            # Phonics validator, story generator, safety review, image generator

shared/                 # Types shared between client and server
├── chat-types.ts           # Chat messages, SSE events
└── artifact-types.ts       # Artifact execution types, SSE events
```

## Content Authoring

Posts live in `content/2.blog/` with naming convention `YYYYMMDD.slug-name.md`.

Required frontmatter (validated by Zod in `content.config.ts`):

```yaml
---
title: 'Post Title'
description: 'Brief summary for SEO'
date: '2026-01-15'
badge:
  label: 'Category' # e.g. AI Tools, Kids, Productivity
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

## Component Naming Conventions

Nuxt auto-imports components with directory prefix:

- `components/CodeRunner.vue` → `<CodeRunner>` / `::code-runner` in MDC
- `components/artifact/Output.vue` → `<ArtifactOutput>`
- `components/tool/Weather.vue` → `<ToolWeather>`
- `components/prose/ProsePre.vue` → `<ProsePre>` (prose components are special)

## Artifact System

Interactive code execution in blog posts using Anthropic's Code Execution Tool.

### MDC Usage

```markdown
::code-runner{language="python" title="Example"}
print("Hello from an isolated container")
::
```

Props: `language`, `title`, `prompt`, `code`, `readonly`

### API Flow

1. Client calls `POST /api/artifacts/execute` with code/prompt
2. Server sends to Anthropic Messages API with `code_execution_20250825` tool
3. Code runs in isolated Linux container (Anthropic infra, no internet)
4. Results stream back via SSE (text, code, stdout/stderr, file references)
5. Generated files fetched via `GET /api/artifacts/files/{fileId}` (proxies Anthropic Files API)

### Beta Headers

- `code-execution-2025-08-25` — sandboxed code execution
- `files-api-2025-04-14` — file download from container
- `skills-2025-10-02` — document generation skills (optional)

## Database

PostgreSQL with Drizzle ORM. Schema directory at `server/database/schema/` (barrel `index.ts`, feature files: `blog.ts`, `reading.ts`). Migrations in `server/database/migrations/`.

Key tables: `users`, `chats`, `messages`, `documents`, `document_chunks`, `child_profiles`, `phonics_units`, `child_phonics_progress`, `srs_cards`, `stories`, `reading_sessions`, `achievements`.

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

## Chat System

### Tool Pattern

Tools are defined in two places (being consolidated):

- `server/utils/ai/tools.ts` — Anthropic SDK format tool definitions + `executeTool()` switch
- `server/utils/ai/tools/*.ts` — Agent SDK format tools (used for MCP server)

When adding a new chat tool:

1. Add tool definition to `chatTools` array in `tools.ts`
2. Add execution case to `executeTool()` switch
3. Optionally create Agent SDK tool in `tools/` directory
4. Add UI renderer in `components/tool/` if the tool needs rich display

### SSE Streaming Pattern

Both chat and artifacts use SSE with the same pattern:

- Server creates `ReadableStream`, sends `data: {json}\n\n` lines
- Client reads with `response.body.getReader()`, parses line-by-line
- Event types defined in `shared/*-types.ts`

## Auth

`nuxt-auth-utils` with GitHub OAuth. Admin pages use `auth` middleware. Login via popup flow.

## Environment

Required env vars (see `server/utils/env-config.ts`):

- `ANTHROPIC_API_KEY` — for all AI features
- `DATABASE_URL` — PostgreSQL connection
- `BRAINTRUST_API_KEY` / `BRAINTRUST_PROJECT_NAME` — observability

## Testing

```bash
pnpm test                # Unit tests (excludes *.integration.test.ts)
pnpm test:integration    # Integration tests (needs DATABASE_URL / docker)
pnpm test:e2e            # Playwright E2E tests
```

Test files live next to source: `foo.ts` → `foo.test.ts`
Integration tests use `.integration.test.ts` suffix and separate config (`vitest.integration.config.ts`).
DB test helpers in `server/test-utils/db-helper.ts`: `cleanupDatabase()`, `createTestUser()`, `createTestChat()`, `createTestMessage()`, `createTestChild()`, `createTestStory()`, `createTestSrsCard()`.

## Key Patterns

- Server utils in `server/utils/` are auto-imported by Nitro (e.g. `retrieveRAG`, `embedText`, `useDrizzle`)
- Shared test IDs in `shared/test-ids.ts` — used by both Vue components and Playwright E2E tests
- UI components from `@nuxt/ui` (`UCard`, `UButton`, `UBlogPost`, `UPageHeader`, etc.)
- Route rules in `nuxt.config.ts`: `/` prerendered, `/chat/**` SSR disabled
- Top-level exported functions use `function` keyword (not arrow functions): `export async function useHighlighter()` not `export const useHighlighter = async () =>`
- Prefer database-level sorting (`orderBy(desc(...))`) over JS `.sort()` on query results

## Gotchas

- **Anthropic client** — always use `getAnthropicClient()` from `utils/ai/anthropic.ts`, never `new Anthropic()`. The singleton wraps with Braintrust observability.
- **Reading API auth** — use `requireChildOwner(event, childId)` from `server/utils/reading/require-child-owner.ts` for any route that accesses child-scoped data.
- **Reading layout** — `/reading` pages use `layout: 'reading'` (not `default`). Bluey theme via CSS custom properties in `assets/css/reading-theme.css`.
- **Reading theme colors** — NEVER use raw palette vars (`--reading-sky-blue`, `--reading-orange`, etc.) in components. Always use semantic tokens: `--reading-primary`, `--reading-secondary`, `--reading-accent`, `--reading-success`, `--reading-highlight`, `--reading-bg`, `--reading-card-bg`, `--reading-text`. Raw palette vars are only defined in `reading-theme.css` and mapped by `useReadingTheme.applyTheme()`. Using raw vars breaks custom themes.
- **Composable cleanup** — composables using browser APIs (Speech, TTS) must call cleanup in `onUnmounted`. Don't rely on consumers to clean up.
- **MDC slots parse as markdown** — code in `::component` body loses indentation and `[x]` becomes links. Use `code` prop with `\n` escapes for code content.
- **Nuxt auto-imports don't work in Vitest** — test files need explicit imports (`import { chatTools } from './tools'`).
- **Vue ref unwrapping** — nested refs in objects returned from composables are NOT auto-unwrapped in templates. Destructure to top-level: `const { status, code } = useMyComposable()`.
- **Auth pattern** — every AI-calling route must call `await getUserSession(event)` at the top of the handler.
- **Syntax highlighting** — use `useHighlighter()` composable with `material-theme-palenight` theme (Shiki).
- **Shiki in custom components** — use `ShikiCachedRenderer` from `shiki-stream/vue` with `await useHighlighter()`. See `ChatCodeExecution.vue` and `ProsePre.vue` for the pattern.
- **Model config** — use `useRuntimeConfig().public.model` instead of hardcoding model strings.
- **Debugging beta APIs** — beta client methods cast via `AnthropicBetaClient` can silently fail in try/catch. Check `tail /tmp/nuxt-dev.log | grep -i warn` for swallowed errors.
- **Dev server startup** — always use `pnpm dev` from repo root (runs `docker:up`, `db:migrate`, `kill-port`). Using `pnpm --filter @chris-towles/blog dev` skips those steps and can leave stale servers on other ports.
- **Vitest 4 has no `--include` CLI flag** — use a separate config file with `-c` flag for different test subsets, not CLI include/exclude.
