import { z } from 'zod'
// ingestBlogPosts, ingestDocument auto-imported from server/utils/**

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- types.d.ts augmentation not picked up in server context
  const username = (session.user as any)?.username || ''
  if (!adminNames.includes(username)) {
    console.log(`Forbidden access attempt by user: ${session}`)
    throw createError({ statusCode: 403, statusMessage: `Forbidden, session user: ${username}` })
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
