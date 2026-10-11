import { z } from 'zod';
import { log } from 'evlog';

defineRouteMeta({
  openAPI: {
    description: 'Ingest blog posts into the RAG index (D1 text + Vectorize vectors)',
    tags: ['admin', 'rag'],
  },
});

const bodySchema = z.object({
  slug: z.string().optional(),
  force: z.boolean().optional(),
  limit: z.number().int().positive().optional(),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  // Optional: restrict to specific admin users
  const adminNames = ['ChrisTowles'];
  const username = session.user.username || '';

  if (!adminNames.includes(username)) {
    log.warn('admin', `Forbidden access attempt by user: ${username}`);
    throw createError({ statusCode: 403, statusMessage: `Forbidden, session user: ${username}` });
  }

  const body = bodySchema.parse(await readBody(event).catch(() => ({})));

  return withRagErrors(() =>
    body.slug
      ? ingestDocument(body.slug, body.force)
      : ingestBlogPosts({ force: body.force, limit: body.limit }),
  );
});
