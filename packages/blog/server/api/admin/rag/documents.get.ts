import { sql } from 'drizzle-orm';

defineRouteMeta({
  openAPI: {
    description: 'List all indexed documents with chunk counts',
    tags: ['admin', 'rag'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const db = useDrizzle();

  const documents = await db.all<{
    id: string;
    slug: string;
    title: string;
    url: string;
    path: string;
    contentHash: string;
    createdAt: number;
    updatedAt: number;
    chunkCount: number | null;
    contentSize: number | null;
  }>(sql`
    SELECT
      d.id,
      d.slug,
      d.title,
      d.url,
      d.path,
      d."contentHash",
      d."createdAt",
      d."updatedAt",
      COUNT(dc.id) as "chunkCount",
      SUM(LENGTH(dc.content)) as "contentSize"
    FROM documents d
    LEFT JOIN document_chunks dc ON d.id = dc."documentId"
    GROUP BY d.id
    ORDER BY d."createdAt" DESC
  `);

  return {
    documents: documents.map((doc) => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      url: doc.url,
      path: doc.path,
      contentHash: doc.contentHash.slice(0, 12) + '...', // Truncate hash for display
      createdAt: new Date(doc.createdAt),
      updatedAt: new Date(doc.updatedAt),
      chunkCount: Number(doc.chunkCount || 0),
      contentSize: Number(doc.contentSize || 0),
      // TODO(cloudflare-rag): count vectors in Vectorize once embeddings move there
      embeddedChunks: 0,
      isFullyEmbedded: false,
    })),
    total: documents.length,
  };
});
