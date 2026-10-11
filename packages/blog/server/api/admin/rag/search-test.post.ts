import { z } from 'zod';
import { EMBEDDING_DIMENSIONS } from '../../../utils/rag/runtime';

defineRouteMeta({
  openAPI: {
    description: 'Test RAG search with detailed pipeline information',
    tags: ['admin', 'rag'],
  },
});

const PREVIEW_LENGTH = 100;

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

  const { results, semantic, keyword, timingsMs } = await withRagErrors(() =>
    retrieveRAGDetailed(query, { topK, skipRerank }),
  );

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
      semanticResults: semantic.slice(0, 10).map((r, i) => ({
        rank: i + 1,
        title: r.documentTitle,
        url: r.documentUrl,
        distance: r.distance.toFixed(4),
        preview: r.content.slice(0, PREVIEW_LENGTH),
      })),
      bm25Results: keyword.slice(0, 10).map((r, i) => ({
        rank: i + 1,
        title: r.documentTitle,
        url: r.documentUrl,
        score: r.rank.toFixed(4),
        preview: r.content.slice(0, PREVIEW_LENGTH),
      })),
    },
    timings: {
      semanticSearch: `${timingsMs.semantic}ms`,
      bm25Search: `${timingsMs.keyword}ms`,
      rerank: `${timingsMs.rerank}ms`,
      total: `${timingsMs.total}ms`,
    },
    config: {
      topK,
      skipRerank,
      embeddingDimensions: EMBEDDING_DIMENSIONS,
      semanticWeight: 0.7,
      bm25Weight: 0.3,
    },
  };
});
