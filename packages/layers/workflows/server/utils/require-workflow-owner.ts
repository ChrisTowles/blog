import type { H3Event } from 'h3';
import { eq, and } from 'drizzle-orm';

/**
 * Verify the authenticated user owns the given workflow.
 * Throws 401 if not authenticated, 404 if workflow not found or not owned.
 * Returns the workflow row.
 */
export async function requireWorkflowOwner(event: H3Event, workflowId: string) {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();
  const [workflow] = await db
    .select()
    .from(tables.workflows)
    .where(and(eq(tables.workflows.id, workflowId), eq(tables.workflows.ownerId, session.user.id)));

  if (!workflow) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  return workflow;
}
