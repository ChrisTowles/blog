import { z } from 'zod'
import { ingestBlogPosts, ingestDocument } from '../../../utils/rag/ingest'

defineRouteMeta({
  openAPI: {
    description: 'Ingest blog posts into RAG database',
    tags: ['admin', 'rag']
  }
})

export default defineEventHandler(async (event) => {
  // Check for admin access (you may want to add proper auth here)
  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  // Optional: restrict to specific admin users
  const adminNames = ['ChrisTowles']
  if (!adminNames.includes(session.user.username)) {
    console.log(`Forbidden access attempt by user: ${session}`)
    throw createError({ statusCode: 403, statusMessage: `Forbidden, session user: ${session.user.username}` })
  }

  const body = await readBody(event).catch(() => ({}))

  // If slug provided, ingest single document
  if (body?.slug) {
    const { slug } = z.object({ slug: z.string() }).parse(body)
    const result = await ingestDocument(slug)
    return result
  }

  // Otherwise, ingest all blog posts
  const result = await ingestBlogPosts()
  return result
})
