# RAG Implementation: Contextual Hybrid Search on Cloudflare

Blog posts are chunked, each chunk gets a Claude-written situating description (Anthropic's contextual retrieval), and retrieval fuses vector search with keyword search before an optional rerank.

## Architecture

```
Ingest   Nuxt Content (posts) -> chunk -> Claude Haiku context -> Workers AI embeddings
                                   |                                   |
                                   v                                   v
                             D1 document_chunks                 Vectorize (id = chunk id)
                             + FTS5 document_chunks_fts

Retrieve query -> embed -> Vectorize topK -> hydrate rows from D1 ----\
                -> FTS5 MATCH + bm25 ------------------------------------> RRF -> rerank -> top K
```

| Piece         | Choice                                                                  |
| ------------- | ----------------------------------------------------------------------- |
| Embeddings    | Workers AI `@cf/qwen/qwen3-embedding-0.6b`, 1024-d, batches of 32       |
| Vector store  | Vectorize binding `VECTORIZE`, 1024-d cosine, one vector per chunk      |
| Keyword index | D1 FTS5 `document_chunks_fts`, external content, `tokenize='trigram'`   |
| Reranker      | Workers AI `@cf/baai/bge-reranker-base` (512-token input, top 20 fused) |
| Context text  | Claude Haiku via `getAnthropicClient()`                                 |
| Source        | Nuxt Content `posts` collection (`rawbody` field), published posts only |

Model ids and I/O shapes were checked against the Workers AI docs: embeddings take `{ text: string[] }` (documents) or `{ queries: string }` (applies the retrieval instruction) with at most 32 inputs and return `{ data: number[][], shape }`; the reranker takes `{ query, contexts: [{ text }], top_k }` and returns `{ response: [{ id, score }] }`.

## Data model

- `documents`: slug, title, url, path (Nuxt Content stem), contentHash.
- `document_chunks`: content, contextualContent, `embeddedAt` (set after the vector is upserted).
- Vectorize metadata per vector: `documentId`, `slug`, `url`, `title`. Queries use `returnMetadata: 'none'` (topK cap 100 instead of 50); chunk text and document fields are loaded from D1.
- Migrations: `0001_chunk_embedded_at.sql` (drizzle) and `0002_chunks_fts5.sql` (custom: virtual table, insert/update/delete triggers, rebuild). The update trigger only fires for `content` / `contextualContent`, so setting `embeddedAt` does not reindex FTS.

The trigram tokenizer matches substrings of three or more characters, so queries drop shorter terms. Terms are quoted and OR-ed into the `MATCH` expression; `bm25(document_chunks_fts, 1.0, 0.5)` weights chunk text over the generated context.

## Code

```
server/utils/rag/
├── chunker.ts          # paragraph chunking, frontmatter stripping, SHA-256 hash
├── runtime.ts          # RagRuntime { ai, vectorize, db }, RagUnavailableError, withRagErrors
├── workers-ai.ts       # embedTexts / embedQuery / rerankDocuments (zod-parsed outputs)
├── vectors.ts          # Vectorize upsert / delete / query
├── store.ts            # delete a document's chunks + vectors together
├── ingest.ts           # ingestSources(runtime, sources, describe): pure, injectable
├── content-ingest.ts   # Nuxt Content loader, ingestBlogPosts, ingestDocument
└── retrieve.ts         # semanticSearch, keywordSearch, RRF, retrieveRAG(Detailed)
```

Everything takes a `RagRuntime`, so tests inject fakes (`server/test-utils/rag-fakes.ts`) instead of mocking modules.

## Ingestion

1. `loadBlogSources()` reads published posts with `queryCollection(event, 'posts')` (no filesystem, so it works on Workers).
2. A document is skipped when its hash is unchanged and every chunk has `embeddedAt`; a run that failed part-way resumes on the next call.
3. Otherwise: chunk, generate contexts, embed in batches, replace old chunks and vectors, insert new rows, upsert vectors, stamp `embeddedAt`.
4. A full run also deletes documents (and vectors) whose post is gone or became a draft.

A full ingest makes one Claude call per chunk, so use `limit` to stay inside request limits and call again; unchanged documents are skipped.

## Retrieval

Semantic and keyword legs run in parallel with 10x candidates (capped at 100). A failing leg is logged and the other still answers; RRF (0.7 / 0.3, k = 60) merges, then the reranker reorders the top 20, falling back to fused order if it fails.

If `AI` or `VECTORIZE` is not bound (`env.dev` omits them because they only run remotely), RAG throws `RagUnavailableError` ("RAG unavailable: AI binding missing"). Routes return 503; the chat `searchBlogContent` tool returns `{ error }`.

## Endpoints

| Endpoint                                    | Notes                                                           |
| ------------------------------------------- | --------------------------------------------------------------- |
| `POST /api/search`                          | Public, reranked, deduplicated by document                      |
| `POST /api/admin/rag/ingest`                | Admin (`ChrisTowles` session). Body `{ slug?, force?, limit? }` |
| `POST /api/admin/rag/documents/:id/reindex` | Force re-embed one document                                     |
| `DELETE /api/admin/rag/documents/:id`       | Removes chunks and vectors                                      |
| `GET /api/admin/rag/stats`, `.../documents` | Embedded counts come from `embeddedAt`                          |
| `POST /api/admin/rag/search-test`           | Both legs, timings, fused results                               |

After importing data into a fresh D1 and Vectorize index, sign in as the admin and `POST /api/admin/rag/ingest` (repeat until `documentsProcessed` is 0).

## Testing

- `pnpm test`: RRF, query building, Workers AI helpers, vector helpers and binding checks with fakes.
- `pnpm test:integration`: runs all migrations on local D1 and checks FTS5 hits, trigger sync, ingest, skip/force/prune and the hybrid pipeline with fake AI and Vectorize.
