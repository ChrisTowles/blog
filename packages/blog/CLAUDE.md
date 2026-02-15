# Blog Package

Main Nuxt 4 application — blog content, AI chat, and interactive artifacts.

## Key Directories

```
app/
├── components/         # Vue components (auto-imported by Nuxt)
│   ├── BlogArtifact.vue    # MDC component for interactive code execution
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
│   └── admin/              # Admin endpoints (RAG management)
├── database/           # Drizzle ORM schema + migrations
└── utils/
    ├── ai/                 # Anthropic client, tools, streaming
    │   ├── tools.ts            # Tool registry + executeTool()
    │   └── tools/              # Individual tool definitions (Agent SDK format)
    └── rag/                # Chunking, ingestion, retrieval

shared/                 # Types shared between client and server
├── chat-types.ts           # Chat messages, SSE events
└── artifact-types.ts       # Artifact execution types, SSE events
```

## Component Naming Conventions

Nuxt auto-imports components with directory prefix:
- `components/BlogArtifact.vue` → `<BlogArtifact>` / `::blog-artifact` in MDC
- `components/artifact/Output.vue` → `<ArtifactOutput>`
- `components/tool/Weather.vue` → `<ToolWeather>`
- `components/prose/ProsePre.vue` → `<ProsePre>` (prose components are special)

## Artifact System

Interactive code execution in blog posts using Anthropic's Code Execution Tool.

### MDC Usage

```markdown
::blog-artifact{language="python" title="Example"}
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

## Environment

Required env vars (see `server/utils/env-config.ts`):
- `ANTHROPIC_API_KEY` — for all AI features
- `DATABASE_URL` — PostgreSQL connection
- `BRAINTRUST_API_KEY` / `BRAINTRUST_PROJECT_NAME` — observability

## Testing

```bash
pnpm test           # Vitest unit tests
pnpm test:e2e       # Playwright E2E tests
```

Test files live next to source: `foo.ts` → `foo.test.ts`
