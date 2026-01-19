import { z } from 'zod';
import { sql } from 'drizzle-orm';
// retrieveRAG, embedText auto-imported from server/utils/**

interface SemanticRow {
  id: string;
  title: string;
  url: string;
  chunkIndex: number;
  preview: string;
  distance: string;
}

interface BM25Row {
  id: string;
  title: string;
  url: string;
  chunkIndex: number;
  preview: string;
  rank: string;
}

defineRouteMeta({
  openAPI: {
    description: 'Test RAG search with detailed pipeline information',
    tags: ['admin', 'rag'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const {
    query,
    topK = 5,
    skipRerank = false,
  } = await readValidatedBody(
    event,
    z.object({
      query: z.string().min(1),
      topK: z.number().optional(),
      skipRerank: z.boolean().optional(),
    }).parse,
  );

  const startTime = Date.now();
  const timings: Record<string, number> = {};

  // Step 1: Embed query
  const embedStart = Date.now();
  const queryEmbedding = await embedText(query);
  timings.embedding = Date.now() - embedStart;

  // Step 2: Run full retrieval
  const retrieveStart = Date.now();
  const results = await retrieveRAG(query, { topK, skipRerank });
  timings.retrieval = Date.now() - retrieveStart;

  // Get raw semantic and BM25 results for debugging
  const db = useDrizzle();
  const embeddingStr = `[${queryEmbedding.join(',')}]`;

  // Raw semantic results
  const semanticStart = Date.now();
  const semanticRaw = await db.execute(sql`
    SELECT
      dc.id,
      d.title,
      d.url,
      dc."chunkIndex",
      LEFT(dc.content, 100) as preview,
      dc.embedding <=> ${embeddingStr}::vector AS distance
    FROM document_chunks dc
    JOIN documents d ON dc."documentId" = d.id
    WHERE dc.embedding IS NOT NULL
    ORDER BY distance
    LIMIT 10
  `);
  timings.semanticSearch = Date.now() - semanticStart;

  // Raw BM25 results
  const bm25Start = Date.now();
  const bm25Raw = await db.execute(sql`
    SELECT
      dc.id,
      d.title,
      d.url,
      dc."chunkIndex",
      LEFT(dc.content, 100) as preview,
      ts_rank(dc."searchVector", plainto_tsquery('english', ${query})) AS rank
    FROM document_chunks dc
    JOIN documents d ON dc."documentId" = d.id
    WHERE dc."searchVector" @@ plainto_tsquery('english', ${query})
    ORDER BY rank DESC
    LIMIT 10
  `);
  timings.bm25Search = Date.now() - bm25Start;

  timings.total = Date.now() - startTime;

  return {
    query,
    results: results.map((r, i) => ({
      rank: i + 1,
      title: r.documentTitle,
      url: r.documentUrl,
      score: r.score,
      content: r.content,
      contextualContent: r.contextualContent,
      chunkIndex: r.chunkIndex,
    })),
    pipeline: {
      semanticResults: (semanticRaw.rows as SemanticRow[]).map((r, i) => ({
        rank: i + 1,
        title: r.title,
        url: r.url,
        distance: parseFloat(r.distance).toFixed(4),
        preview: r.preview,
      })),
      bm25Results: (bm25Raw.rows as BM25Row[]).map((r, i) => ({
        rank: i + 1,
        title: r.title,
        url: r.url,
        score: parseFloat(r.rank).toFixed(4),
        preview: r.preview,
      })),
    },
    timings: {
      embedding: `${timings.embedding}ms`,
      semanticSearch: `${timings.semanticSearch}ms`,
      bm25Search: `${timings.bm25Search}ms`,
      retrieval: `${timings.retrieval}ms`,
      total: `${timings.total}ms`,
    },
    config: {
      topK,
      skipRerank,
      embeddingDimensions: queryEmbedding.length,
      semanticWeight: 0.7,
      bm25Weight: 0.3,
    },
  };
});
