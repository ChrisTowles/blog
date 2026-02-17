# Server (Nitro)

Nuxt Nitro server — API routes, database, AI integrations.

## API Route Conventions

Routes use Nitro file-based routing with HTTP method suffixes:

- `api/chats.get.ts` → `GET /api/chats`
- `api/chats/[id].post.ts` → `POST /api/chats/:id`
- `api/artifacts/execute.post.ts` → `POST /api/artifacts/execute`

Every route handler uses `defineEventHandler()`. Validate input with Zod:

```ts
const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
const { model } = await readValidatedBody(event, z.object({ model: z.string() }).parse);
```

## SSE Streaming Pattern

Both chat and artifacts stream responses via Server-Sent Events:

```ts
const stream = new ReadableStream({
  async start(controller) {
    const encoder = new TextEncoder();
    // Send events as `data: {json}\n\n`
    controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
    controller.close();
  },
});
setHeader(event, 'Content-Type', 'text/event-stream');
return stream;
```

Event types are defined in `shared/chat-types.ts` and `shared/artifact-types.ts`.

## AI / Anthropic

- **Client**: `getAnthropicClient()` in `utils/ai/anthropic.ts` — singleton, wrapped with Braintrust observability
- **Tools**: Defined in `utils/ai/tools.ts` (Anthropic SDK format) and `utils/ai/tools/*.ts` (Agent SDK format)
- **Thread safety**: Tool execution must be stateless. No module-level mutable state — pass context as parameters.

### Beta Streaming (Chat + Artifacts)

Both chat and artifacts use Anthropic beta APIs. Chat uses `beta.messages.stream()` (not `client.messages.stream()`) for streaming with code execution.

- Beta headers: `code-execution-2025-08-25`, `files-api-2025-04-14`, `skills-2025-10-02`
- `code_execution_20250825` tool type for sandboxed execution
- `server_tool_use` blocks are server-side (code execution) — do NOT add to client tool loop
- `tool_use` blocks are client-side (our tools like weather, dice) — execute locally and loop
- `bash_code_execution_tool_result` / `text_editor_code_execution_tool_result` content blocks for stdout/stderr
- Code execution results (`*_tool_result` blocks) are processed inline during streaming via `content_block_start` for fast UI updates
- `content_block_start` for `*_tool_result` blocks contains full result in `content_block.content` (stdout, stderr, return_code, content[].file_id) — no deltas needed
- Files referenced by `file_id`, downloaded via Files API beta — metadata via `client.beta.files.retrieveMetadata()` (NOT `retrieve`)
- Container ID persisted in `chats.containerId` for reuse across turns
- Skills loaded from `.claude/skills/*/SKILL.md` via `utils/ai/skills-loader.ts` (cached at startup)
- Pre-built Anthropic skills: `pdf`, `pptx`, `xlsx`, `docx` (NOT `create-pdf` — see https://platform.claude.com/docs/en/build-with-claude/skills-guide)
- Beta response types are unstable — typed interfaces in `utils/ai/anthropic-beta-types.ts` use `any` for `content` fields where union narrowing is impractical
- Hoist `TextEncoder` to module scope (not per-function call) in SSE streaming handlers

## Database

PostgreSQL with Drizzle ORM.

- **Schema**: `database/schema.ts`
- **Access**: `useDrizzle()` from `utils/drizzle.ts` (creates connection per call)
- **Tables**: `tables.chats` (with `containerId` for container reuse), `tables.messages`, `tables.users`, `tables.documents`, `tables.documentChunks`
- **Migrations**: `pnpm db:generate` → `pnpm db:migrate`

UUID primary keys generated via `crypto.randomUUID()`. All tables have `createdAt` timestamp.

### Custom SQL Migrations

Drizzle can't express `tsvector` columns, triggers, or GIN indexes. For these:
1. Create SQL file manually in `database/migrations/` (e.g. `0002_fix_name.sql`)
2. Add entry to `meta/_journal.json` with next `idx`
3. Copy previous snapshot as new `meta/NNNN_snapshot.json` (update `id`/`prevId` UUIDs)
4. Keep Drizzle schema using `text().$type<string>()` workaround — don't change it

The `document_chunks.searchVector` column is `text()` in Drizzle but `tsvector` in PostgreSQL (via custom migration). A trigger auto-populates it from `content` + `contextualContent`.

## RAG (Retrieval-Augmented Generation)

- **Ingest**: `utils/rag/ingest.ts` — chunks blog content, generates contextual summaries with Claude, embeds with AWS Titan
- **Retrieve**: `utils/rag/retrieve.ts` — hybrid search (pgvector cosine similarity + BM25 full-text), RRF fusion
- **Embeddings**: AWS Bedrock Titan Text v2, 1024 dimensions

## Adding a New API Route

1. Create `api/{resource}/{action}.{method}.ts`
2. Add `defineRouteMeta()` for OpenAPI docs
3. Validate all inputs with Zod
4. Use `useDrizzle()` for database access
5. Write test file alongside: `{action}.{method}.test.ts`
