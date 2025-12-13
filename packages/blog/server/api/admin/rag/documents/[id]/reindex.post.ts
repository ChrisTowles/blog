import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { readFile } from 'node:fs/promises'
// Utils auto-imported from server/utils/** via nitro config

defineRouteMeta({
  openAPI: {
    description: 'Force re-index a specific document',
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

  // Get existing document
  const existingDoc = await db.query.documents.findFirst({
    where: (doc, { eq }) => eq(doc.id, id)
  })

  if (!existingDoc) {
    throw createError({ statusCode: 404, statusMessage: 'Document not found' })
  }

  // Read file from disk
  let content: string
  try {
    content = await readFile(existingDoc.path, 'utf-8')
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Source file not found on disk' })
  }

  const contentHash = await hashContent(content)
  const parsed = parseBlogMarkdown(content, existingDoc.path)

  // Delete existing chunks
  await db.delete(tables.documentChunks)
    .where(eq(tables.documentChunks.documentId, id))

  // Update document with new hash
  await db.update(tables.documents)
    .set({
      title: parsed.title,
      contentHash,
      updatedAt: new Date()
    })
    .where(eq(tables.documents.id, id))

  // Chunk and re-embed
  const chunks = chunkText(parsed.content)
  let chunksCreated = 0

  for (const chunk of chunks) {
    const contextualContent = await generateContextualDescription(
      parsed.title,
      existingDoc.url,
      parsed.content,
      chunk.content
    )

    const textToEmbed = `${chunk.content}\n\nContext: ${contextualContent}`
    const embeddings = await embedTexts([textToEmbed])
    const embeddingResult = embeddings[0]

    if (!embeddingResult) {
      throw new Error(`Failed to generate embedding for chunk ${chunk.index}`)
    }

    await db.insert(tables.documentChunks).values({
      documentId: id,
      chunkIndex: chunk.index,
      content: chunk.content,
      contextualContent,
      embedding: embeddingResult.embedding
    })

    chunksCreated++
  }

  return {
    success: true,
    document: {
      id,
      slug: existingDoc.slug,
      title: parsed.title,
      contentHash: contentHash.slice(0, 12) + '...'
    },
    chunksCreated,
    message: `Re-indexed ${chunksCreated} chunks`
  }
})
