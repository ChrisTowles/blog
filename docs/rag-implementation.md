# RAG Implementation: Contextual Hybrid Search with Reranking

Documentation for the blog's Retrieval-Augmented Generation (RAG) system.

## Overview

The chat feature uses RAG to search blog content and provide contextually relevant answers with source citations. Implementation follows [Anthropic's Contextual Retrieval cookbook](https://github.com/anthropics/claude-cookbooks/blob/main/capabilities/contextual-embeddings/guide.ipynb).

**Performance (from Anthropic's research):**
| Approach | Pass@10 |
|----------|---------|
| Baseline RAG | 87% |
| + Contextual Embeddings | 92% |
| + Hybrid Search (BM25) | 92% |
| + Reranking | **95%** |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        INGESTION PIPELINE                        │
├─────────────────────────────────────────────────────────────────┤
│  Markdown Files    →  Chunker  →  Claude Haiku  →  Titan Embed  │
│  (content/2.blog/)    (~500 tok)   (context gen)    (1024 dim)  │
│                                         ↓                        │
│                              PostgreSQL + pgvector               │
│                              (documents, document_chunks)        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        RETRIEVAL PIPELINE                        │
├─────────────────────────────────────────────────────────────────┤
│  User Query                                                      │
│      ↓                                                           │
│  ┌─────────────┐    ┌─────────────┐                             │
│  │  Semantic   │    │    BM25     │   (parallel)                │
│  │  (pgvector) │    │  (tsvector) │                             │
│  └──────┬──────┘    └──────┬──────┘                             │
│         └────────┬─────────┘                                     │
│                  ↓                                               │
│         Reciprocal Rank Fusion (RRF)                            │
│                  ↓                                               │
│         Cohere Rerank v3 (Bedrock)                              │
│                  ↓                                               │
│         Top 5 Results with URLs                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Vector Store | PostgreSQL + pgvector | Semantic search with HNSW index |
| BM25 Search | PostgreSQL tsvector | Keyword/full-text search |
| Embeddings | Amazon Titan Text v2 | 1024-dim vectors via Bedrock |
| Reranking | Cohere Rerank v3 | Final precision via Bedrock |
| Context Generation | Claude Haiku | Situating context for chunks |

## Database Schema

### `documents` table
Stores blog post metadata for linking results back to source URLs.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| slug | varchar(200) | Unique slug (e.g., "tips-for-claude-code") |
| title | varchar(500) | Post title |
| path | varchar(500) | Source file path |
| url | varchar(500) | Public URL (e.g., "/blog/tips-for-claude-code") |
| contentHash | varchar(64) | SHA-256 for change detection |
| createdAt, updatedAt | timestamp | Timestamps |

### `document_chunks` table
Stores chunked content with embeddings and full-text search vector.

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| documentId | uuid | FK to documents |
| chunkIndex | integer | Order within document |
| content | text | Original chunk text |
| contextualContent | text | Claude-generated situating context |
| embedding | vector(1024) | Titan embedding |
| searchVector | tsvector | Auto-generated for BM25 |

**Indexes:**
- `embedding` - HNSW index (`vector_cosine_ops`) for fast similarity search
- `searchVector` - GIN index for full-text search

## File Structure

```
packages/blog/server/
├── utils/
│   ├── ai/
│   │   ├── anthropic.ts     # Claude client
│   │   ├── bedrock.ts       # Titan embeddings, Cohere rerank
│   │   └── tools.ts         # Chat tools (searchBlogContent)
│   └── rag/
│       ├── chunker.ts       # Text chunking, markdown parsing
│       ├── ingest.ts        # Blog post ingestion pipeline
│       └── retrieve.ts      # Hybrid search + reranking
├── api/
│   └── admin/rag/
│       └── ingest.post.ts   # Admin endpoint for ingestion
└── database/
    ├── schema.ts            # Drizzle schema (documents, document_chunks)
    └── migrations/
        └── 0003_*.sql       # pgvector extension + tables
```

## Ingestion Pipeline

### 1. Content Parsing
- Reads `content/2.blog/*.md` files
- Extracts YAML frontmatter (title, date)
- Derives slug from filename: `20250713.tips-for-claude-code.md` → `tips-for-claude-code`

### 2. Chunking Strategy
- Target size: ~500 tokens (~2000 chars)
- Overlap: ~100 tokens (~400 chars)
- Preserves paragraph boundaries
- Minimum chunk size: 200 chars

### 3. Contextual Description Generation
Uses Claude Haiku with **prompt caching** (60%+ cost savings):

```
<document title="{title}" url="{url}">
{full_document_content}  ← CACHED
</document>

<chunk>{chunk_content}</chunk>

Generate 1-2 sentences situating this chunk within the overall document
for improving search retrieval.
```

### 4. Embedding
- Combines: `{chunk_content}\n\nContext: {contextual_description}`
- Embeds with Amazon Titan Text v2 (1024 dimensions)
- L2 normalized for cosine similarity

### 5. Storage
- Inserts into `document_chunks` table
- `searchVector` auto-generated by PostgreSQL trigger

### Incremental Updates
- SHA-256 hash of content stored in `documents.contentHash`
- Unchanged documents skipped on re-ingestion
- Changed documents: delete old chunks, re-ingest

## Retrieval Pipeline

### 1. Query Embedding
Embed user query with Titan Text v2.

### 2. Parallel Search
**Semantic Search (pgvector):**
```sql
SELECT *, embedding <=> $query_embedding AS distance
FROM document_chunks
ORDER BY distance LIMIT 50
```

**BM25 Search (tsvector):**
```sql
SELECT *, ts_rank(search_vector, plainto_tsquery($query)) AS rank
FROM document_chunks
WHERE search_vector @@ plainto_tsquery($query)
ORDER BY rank DESC LIMIT 50
```

### 3. Reciprocal Rank Fusion (RRF)
Combines semantic and BM25 results:

```
score(doc) = Σ (weight / (rank + k))
```
- k = 60 (standard constant)
- Semantic weight: 0.7
- BM25 weight: 0.3

### 4. Reranking
- Top 20 candidates sent to Cohere Rerank v3
- Returns final top 5 with relevance scores

### 5. Result Format
```typescript
interface RAGResult {
  content: string           // Original chunk
  contextualContent: string // Generated context
  documentTitle: string     // "Tips for Claude Code"
  documentUrl: string       // "/blog/tips-for-claude-code"
  score: number
}
```

## Chat Integration

### Tool Definition
```typescript
{
  name: 'searchBlogContent',
  description: 'Search blog posts for relevant information...',
  input_schema: {
    properties: {
      query: { type: 'string' }
    }
  }
}
```

### System Prompt Addition
```
When citing blog content, ALWAYS use markdown links:
"According to [Tips for Claude Code](/blog/tips-for-claude-code), ..."
```

## Admin Interface

**URL:** `/admin/rag`

Features:
- "Run Ingestion" button
- Results display (processed, skipped, chunks, errors)
- Protected by auth middleware

## Cost Estimates

### Ingestion (one-time, ~40 posts)
| Service | Cost |
|---------|------|
| Claude Haiku (with caching) | ~$0.50 |
| Titan embeddings | ~$0.02 |
| **Total** | **~$0.52** |

### Per Query
| Service | Cost |
|---------|------|
| Titan embedding | ~$0.0001 |
| Cohere rerank | ~$0.001 |
| **Total** | **~$0.001** |

## Environment Variables

```bash
# AWS (for Bedrock)
AWS_REGION=us-east-1
# Uses default credential chain (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, or IAM role)

# Anthropic (for context generation)
ANTHROPIC_API_KEY=sk-ant-...

# PostgreSQL (must have pgvector extension)
DATABASE_URL=postgresql://...
```

## Commands

```bash
# Generate migration
pnpm db:generate

# Run migration (enables pgvector, creates tables)
pnpm db:migrate

# Trigger ingestion via API
curl -X POST https://your-site/api/admin/rag/ingest

# Or use admin UI
# Navigate to /admin/rag
```

## Future Improvements

- [ ] Webhook to auto-ingest on new blog post publish
- [ ] Query result caching for frequently asked questions
- [ ] Rate limiting on RAG queries
- [ ] Analytics dashboard for search quality
- [ ] Support for other content types (slides, apps)
