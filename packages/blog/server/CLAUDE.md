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
- `log` from `evlog` — `log.warn(scope, message)` takes 1-2 args only; interpolate extras inline

## Database

Cloudflare D1 (SQLite) with Drizzle ORM.

- **Schema**: `database/schema/` — barrel `index.ts`, feature files `blog.ts`, `typing.ts`, `workflow.ts`
- **Access**: `useDrizzle()` from `utils/drizzle.ts` — wraps the `DB` binding from the current event (needs Nitro `asyncContext`), so call it inside a handler
- **Tables**: `tables.chats` (with `containerId` for container reuse), `tables.messages`, `tables.users`, `tables.documents`, `tables.documentChunks`, plus the `typing_*` and `workflow_*` sets
- **Migrations**: `pnpm db:generate` writes SQL under `database/migrations/`; `wrangler d1 migrations apply` runs it (`pnpm db:migrate` locally)
- **Atomic writes**: `db.batch([...])`; there are no interactive transactions
- **Bulk inserts**: D1 allows 100 bound parameters per statement — build statements with `insertChunked(db, table, rows)` and pass them to `db.batch`

UUID primary keys generated via `crypto.randomUUID()`. All tables have `createdAt` timestamp.

Never hand-edit anything under `migrations/meta/` (journal or snapshots). For SQL Drizzle cannot express (FTS5 tables, triggers), use `npx drizzle-kit generate --custom --name <name>` and write the SQL in the scaffolded file.

## RAG (Retrieval-Augmented Generation)

- **Ingest**: `utils/rag/ingest.ts` (injectable) and `content-ingest.ts` (reads Nuxt Content `posts`); contextual summaries from Claude, embeddings from Workers AI, vectors in Vectorize
- **Retrieve**: `utils/rag/retrieve.ts` — Vectorize + D1 FTS5 trigram/bm25, RRF fusion, Workers AI rerank
- **Bindings**: `AI` and `VECTORIZE` are absent in `env.dev`; RAG throws `RagUnavailableError` and routes answer 503. Full design: `docs/rag-implementation.md`

## Adding a New API Route

1. Create `api/{resource}/{action}.{method}.ts`
2. Add `defineRouteMeta()` for OpenAPI docs
3. Validate all inputs with Zod
4. Use `useDrizzle()` for database access
5. Write test file alongside: `{action}.{method}.test.ts`
