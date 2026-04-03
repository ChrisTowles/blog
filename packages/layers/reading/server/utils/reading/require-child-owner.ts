import type { H3Event } from 'h3';

/**
 * Verify the authenticated user owns the given child profile.
 * Throws 401 if not authenticated, 404 if child not found or not owned.
 * Returns the child profile row.
 */
export async function requireChildOwner(event: H3Event, childId: number) {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();
  const child = await db.query.childProfiles.findFirst({
    where: (c, { eq, and: a }) => a(eq(c.id, childId), eq(c.userId, session.user!.id)),
  });

  if (!child) {
    throw createError({ statusCode: 404, message: 'Child not found' });
  }

  return child;
}
