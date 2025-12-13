import { z } from 'zod'
import { eq } from 'drizzle-orm'

defineRouteMeta({
  openAPI: {
    description: 'Delete a document and its chunks from the index',
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

  // Check document exists
  const document = await db.query.documents.findFirst({
    where: (doc, { eq }) => eq(doc.id, id)
  })

  if (!document) {
    throw createError({ statusCode: 404, statusMessage: 'Document not found' })
  }

  // Delete chunks first (cascade should handle this, but be explicit)
  await db.delete(tables.documentChunks)
    .where(eq(tables.documentChunks.documentId, id))

  // Delete document
  await db.delete(tables.documents)
    .where(eq(tables.documents.id, id))

  return {
    success: true,
    deleted: {
      id: document.id,
      slug: document.slug,
      title: document.title
    }
  }
})
