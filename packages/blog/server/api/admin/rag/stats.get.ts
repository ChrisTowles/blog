import { sql } from 'drizzle-orm';

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

  // Get document count
  const docCountResult = await db.execute(sql`SELECT COUNT(*) as count FROM documents`);
  const documentCount = Number(docCountResult.rows[0]?.count || 0);

  // Get chunk count
  const chunkCountResult = await db.execute(sql`SELECT COUNT(*) as count FROM document_chunks`);
  const chunkCount = Number(chunkCountResult.rows[0]?.count || 0);

  // Get chunks with embeddings
  const embeddedCountResult = await db.execute(
    sql`SELECT COUNT(*) as count FROM document_chunks WHERE embedding IS NOT NULL`,
  );
  const embeddedCount = Number(embeddedCountResult.rows[0]?.count || 0);

  // Get average chunks per document
  const avgChunksResult = await db.execute(sql`
    SELECT AVG(chunk_count) as avg_chunks
    FROM (
      SELECT COUNT(*) as chunk_count
      FROM document_chunks
      GROUP BY "documentId"
    ) as counts
  `);
  const avgChunksPerDoc = Number(avgChunksResult.rows[0]?.avg_chunks || 0).toFixed(1);

  // Get total content size
  const contentSizeResult = await db.execute(sql`
    SELECT
      SUM(LENGTH(content)) as content_size,
      SUM(LENGTH("contextualContent")) as context_size
    FROM document_chunks
  `);
  const contentSize = Number(contentSizeResult.rows[0]?.content_size || 0);
  const contextSize = Number(contentSizeResult.rows[0]?.context_size || 0);

  // Get most recent document
  const recentDocResult = await db.execute(sql`
    SELECT title, "createdAt"
    FROM documents
    ORDER BY "createdAt" DESC
    LIMIT 1
  `);
  const lastIndexed = recentDocResult.rows[0] || null;

  // Get document list with file system status
  const { readdir } = await import('node:fs/promises');
  const { join } = await import('node:path');
  let filesOnDisk = 0;
  try {
    const blogDir = join(process.cwd(), 'content/2.blog');
    const files = await readdir(blogDir);
    filesOnDisk = files.filter((f) => f.endsWith('.md')).length;
  } catch {
    // Ignore errors
  }

  return {
    documents: {
      indexed: documentCount,
      onDisk: filesOnDisk,
      pendingIndex: Math.max(0, filesOnDisk - documentCount),
    },
    chunks: {
      total: chunkCount,
      withEmbeddings: embeddedCount,
      avgPerDocument: parseFloat(avgChunksPerDoc),
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
          date: lastIndexed.createdAt,
        }
      : null,
    embeddingDimensions: 1024,
    vectorIndex: 'HNSW (cosine)',
    textIndex: 'GIN (tsvector)',
  };
});
