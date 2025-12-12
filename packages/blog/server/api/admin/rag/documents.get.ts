import { sql } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    description: 'List all indexed documents with chunk counts',
    tags: ['admin', 'rag']
  }
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const db = useDrizzle()

  // Get all documents with chunk counts
  const documents = await db.execute(sql`
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
      SUM(LENGTH(dc.content)) as "contentSize",
      SUM(CASE WHEN dc.embedding IS NOT NULL THEN 1 ELSE 0 END) as "embeddedChunks"
    FROM documents d
    LEFT JOIN document_chunks dc ON d.id = dc."documentId"
    GROUP BY d.id
    ORDER BY d."createdAt" DESC
  `)

  return {
    documents: documents.rows.map(doc => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      url: doc.url,
      path: doc.path,
      contentHash: doc.contentHash?.slice(0, 12) + '...', // Truncate hash for display
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      chunkCount: Number(doc.chunkCount || 0),
      contentSize: Number(doc.contentSize || 0),
      embeddedChunks: Number(doc.embeddedChunks || 0),
      isFullyEmbedded: Number(doc.chunkCount || 0) === Number(doc.embeddedChunks || 0)
    })),
    total: documents.rows.length
  }
})
