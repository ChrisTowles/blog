import { z } from 'zod';
import { eq } from 'drizzle-orm';

defineRouteMeta({
  openAPI: {
    description: 'Delete a document, its chunks and its vectors from the index',
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

  const document = await db.query.documents.findFirst({
    where: (doc) => eq(doc.id, id),
  });

  if (!document) {
    throw createError({ statusCode: 404, statusMessage: 'Document not found' });
  }

  await withRagErrors(() => deleteDocument(useRagRuntime(), id));

  return {
    success: true,
    deleted: {
      id: document.id,
      slug: document.slug,
      title: document.title,
    },
  };
});
