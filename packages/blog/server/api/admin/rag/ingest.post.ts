import { z } from 'zod';

defineRouteMeta({
  openAPI: {
    description: 'Ingest blog posts into RAG database',
    tags: ['admin', 'rag'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  // Optional: restrict to specific admin users
  const adminNames = ['ChrisTowles'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- types.d.ts augmentation not picked up in server context
  const username = (session.user as any)?.username || '';
  if (!adminNames.includes(username)) {
    console.log(`Forbidden access attempt by user: ${JSON.stringify(session)}`);
    throw createError({ statusCode: 403, statusMessage: `Forbidden, session user: ${username}` });
  }

  const body = await readBody(event).catch(() => ({}));

  if (body?.slug) {
    const { slug } = z.object({ slug: z.string() }).parse(body);
    return ingestDocument(slug);
  }

  return ingestBlogPosts();
});
