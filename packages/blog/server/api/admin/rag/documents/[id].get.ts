import { z } from 'zod'

defineRouteMeta({
  openAPI: {
    description: 'Get document details with all chunks',
    tags: ['admin', 'rag']
  }
})

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string()
  }).parse)

  const db = useDrizzle()

  // Get document
  const document = await db.query.documents.findFirst({
    where: (doc, { eq }) => eq(doc.id, id)
  })

  if (!document) {
    throw createError({ statusCode: 404, statusMessage: 'Document not found' })
  }

  // Get all chunks for this document
  const chunks = await db.query.documentChunks.findMany({
    where: (chunk, { eq }) => eq(chunk.documentId, id),
    orderBy: (chunk, { asc }) => asc(chunk.chunkIndex)
  })

  return {
    document: {
      id: document.id,
      slug: document.slug,
      title: document.title,
      url: document.url,
      path: document.path,
      contentHash: document.contentHash,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt
    },
    chunks: chunks.map(chunk => ({
      id: chunk.id,
      index: chunk.chunkIndex,
      content: chunk.content,
      contentPreview: chunk.content.slice(0, 200) + (chunk.content.length > 200 ? '...' : ''),
      contextualContent: chunk.contextualContent,
      hasEmbedding: chunk.embedding !== null,
      contentLength: chunk.content.length,
      contextLength: chunk.contextualContent.length,
      createdAt: chunk.createdAt
    })),
    summary: {
      totalChunks: chunks.length,
      totalContentLength: chunks.reduce((sum, c) => sum + c.content.length, 0),
      totalContextLength: chunks.reduce((sum, c) => sum + c.contextualContent.length, 0),
      allEmbedded: chunks.every(c => c.embedding !== null)
    }
  }
})
