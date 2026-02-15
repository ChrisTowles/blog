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

### Artifact Execution

Uses Anthropic beta APIs — the beta headers and response shapes may change:
- `code_execution_20250825` tool type for sandboxed execution
- `code_execution_tool_result` content block for stdout/stderr
- Files referenced by `file_id`, downloaded via Files API beta

## Database

PostgreSQL with Drizzle ORM.

- **Schema**: `database/schema.ts`
- **Access**: `useDrizzle()` from `utils/drizzle.ts` (creates connection per call)
- **Tables**: `tables.chats`, `tables.messages`, `tables.users`, `tables.documents`, `tables.documentChunks`
- **Migrations**: `pnpm db:generate` → `pnpm db:migrate`

UUID primary keys generated via `crypto.randomUUID()`. All tables have `createdAt` timestamp.

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
