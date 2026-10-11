import { z } from 'zod';
import { eq } from 'drizzle-orm';

defineRouteMeta({
  openAPI: {
    description: 'Force re-index a specific document from Nuxt Content',
    tags: ['admin', 'rag'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  if (!session.user) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const { id } = await getValidatedRouterParams(
    event,
    z.object({
      id: z.string(),
    }).parse,
  );

  const db = useDrizzle();

  const existingDoc = await db.query.documents.findFirst({
    where: (doc) => eq(doc.id, id),
  });

  if (!existingDoc) {
    throw createError({ statusCode: 404, statusMessage: 'Document not found' });
  }

  const result = await withRagErrors(() => ingestDocument(existingDoc.slug, true));

  if (result.errors.length > 0) {
    throw createError({ statusCode: 502, statusMessage: result.errors.join('; ') });
  }

  const updated = await db.query.documents.findFirst({ where: (doc) => eq(doc.id, id) });

  return {
    success: true,
    document: {
      id,
      slug: existingDoc.slug,
      title: updated?.title ?? existingDoc.title,
      contentHash: (updated?.contentHash ?? existingDoc.contentHash).slice(0, 12) + '...',
    },
    chunksCreated: result.chunksCreated,
    message: `Re-indexed ${result.chunksCreated} chunks`,
  };
});
