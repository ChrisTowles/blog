import type { H3Event } from 'h3';
import { eq } from 'drizzle-orm';

/**
 * Allow access to a workflow if:
 * 1. It's a template (isPublished=1) — anyone can access, OR
 * 2. The user is authenticated and owns the workflow.
 *
 * Throws 404 if workflow doesn't exist, 401 if not a template and not authenticated,
 * 404 if not a template and not owned by the user.
 */
export async function requireWorkflowOrTemplate(event: H3Event, workflowId: string) {
  const db = useDrizzle();

  // First check if it's a published template (accessible to everyone)
  const [workflow] = await db
    .select()
    .from(tables.workflows)
    .where(eq(tables.workflows.id, workflowId));

  if (!workflow) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  if (workflow.isPublished === 1) {
    return workflow;
  }

  // Not a template — require ownership
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  if (workflow.ownerId !== session.user.id) {
    throw createError({ statusCode: 404, message: 'Workflow not found' });
  }

  return workflow;
}
