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

  const totals = await db.get<{
    documents: number | null;
    chunks: number | null;
    contentSize: number | null;
    contextSize: number | null;
  }>(sql`
    SELECT
      (SELECT COUNT(*) FROM documents) as documents,
      COUNT(*) as chunks,
      SUM(LENGTH(content)) as contentSize,
      SUM(LENGTH("contextualContent")) as contextSize
    FROM document_chunks
  `);

  const documentCount = Number(totals?.documents || 0);
  const chunkCount = Number(totals?.chunks || 0);
  const contentSize = Number(totals?.contentSize || 0);
  const contextSize = Number(totals?.contextSize || 0);
  const avgChunksPerDoc = documentCount > 0 ? chunkCount / documentCount : 0;

  // TODO(cloudflare-rag): count vectors in Vectorize once embeddings move there
  const embeddedCount = 0;

  const lastIndexed = await db.get<{ title: string; createdAt: number }>(sql`
    SELECT title, "createdAt"
    FROM documents
    ORDER BY "createdAt" DESC
    LIMIT 1
  `);

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
    embeddingDimensions: 1024,
    vectorIndex: 'Vectorize (cosine)',
    textIndex: 'none (FTS5 pending)',
  };
});
