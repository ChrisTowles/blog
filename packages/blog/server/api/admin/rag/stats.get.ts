import { sql } from 'drizzle-orm';
import { loadBlogSources } from '../../../utils/rag/content-ingest';
import { EMBEDDING_DIMENSIONS, EMBEDDING_MODEL } from '../../../utils/rag/runtime';

defineRouteMeta({
  openAPI: {
    description: 'Get RAG system statistics',
    tags: ['admin', 'rag'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const db = useDrizzle();

  const totals = await db.get<{
    documents: number | null;
    chunks: number | null;
    contentSize: number | null;
    contextSize: number | null;
    embedded: number | null;
  }>(sql`
    SELECT
      (SELECT COUNT(*) FROM documents) as documents,
      COUNT(*) as chunks,
      COUNT("embeddedAt") as embedded,
      SUM(LENGTH(content)) as contentSize,
      SUM(LENGTH("contextualContent")) as contextSize
    FROM document_chunks
  `);

  const documentCount = Number(totals?.documents || 0);
  const chunkCount = Number(totals?.chunks || 0);
  const contentSize = Number(totals?.contentSize || 0);
  const contextSize = Number(totals?.contextSize || 0);
  const avgChunksPerDoc = documentCount > 0 ? chunkCount / documentCount : 0;

  const embeddedCount = Number(totals?.embedded || 0);

  const lastIndexed = await db.get<{ title: string; createdAt: number }>(sql`
    SELECT title, "createdAt"
    FROM documents
    ORDER BY "createdAt" DESC
    LIMIT 1
  `);

  const publishedPosts = (await loadBlogSources()).length;

  return {
    documents: {
      indexed: documentCount,
      onDisk: publishedPosts, // key kept for the admin page; counts published Nuxt Content posts
      pendingIndex: Math.max(0, publishedPosts - documentCount),
    },
    chunks: {
      total: chunkCount,
      withEmbeddings: embeddedCount,
      avgPerDocument: parseFloat(avgChunksPerDoc.toFixed(1)),
    },
    storage: {
      contentBytes: contentSize,
      contextBytes: contextSize,
      totalBytes: contentSize + contextSize,
      contentKB: (contentSize / 1024).toFixed(2),
      contextKB: (contextSize / 1024).toFixed(2),
      totalKB: ((contentSize + contextSize) / 1024).toFixed(2),
    },
    lastIndexed: lastIndexed
      ? {
          title: lastIndexed.title,
          date: new Date(lastIndexed.createdAt),
        }
      : null,
    embeddingDimensions: EMBEDDING_DIMENSIONS,
    vectorIndex: `Vectorize (cosine, ${EMBEDDING_MODEL})`,
    textIndex: 'D1 FTS5 (trigram, bm25)',
  };
});
