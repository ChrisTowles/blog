import { and, eq } from 'drizzle-orm';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { tables, useDrizzle } from '../../utils/drizzle';
import {
  cleanupDatabase,
  createTestUser,
  createTestWorkflow,
  createTestWorkflowNode,
} from '../../test-utils/db-helper';

const hasDatabase = !!process.env.DATABASE_URL;

describe.skipIf(!hasDatabase)('Workflow CRUD Integration', () => {
  let db: ReturnType<typeof useDrizzle>;
  let testUser: typeof tables.users.$inferSelect;

  beforeAll(() => {
    db = useDrizzle();
  });

  beforeEach(async () => {
    await cleanupDatabase();
    testUser = await createTestUser();
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  it('creates a workflow and retrieves it by owner', async () => {
    const workflow = await createTestWorkflow(testUser.id, { name: 'My Workflow' });
    expect(workflow.name).toBe('My Workflow');
    expect(workflow.ownerId).toBe(testUser.id);

    const rows = await db
      .select()
      .from(tables.workflows)
      .where(eq(tables.workflows.ownerId, testUser.id));
    expect(rows).toHaveLength(1);
    expect(rows[0]!.name).toBe('My Workflow');
  });

  it('cascades deletes to nodes and edges on workflow delete', async () => {
    const workflow = await createTestWorkflow(testUser.id);
    await createTestWorkflowNode(workflow.id, 'node_1');
    await createTestWorkflowNode(workflow.id, 'node_2');

    await db.delete(tables.workflows).where(eq(tables.workflows.id, workflow.id));

    const nodes = await db
      .select()
      .from(tables.workflowNodes)
      .where(eq(tables.workflowNodes.workflowId, workflow.id));
    expect(nodes).toHaveLength(0);
  });

  it('does not leak workflows across owners', async () => {
    // Must use unique email/username/providerId to avoid unique constraint violation
    const otherUser = await createTestUser({
      email: 'other@example.com',
      username: 'otheruser',
      providerId: '99999',
    });
    await createTestWorkflow(otherUser.id, { name: 'Other workflow' });

    const myWorkflows = await db
      .select()
      .from(tables.workflows)
      .where(eq(tables.workflows.ownerId, testUser.id));
    expect(myWorkflows).toHaveLength(0);
  });

  it('saves and reloads nodes with correct data', async () => {
    const workflow = await createTestWorkflow(testUser.id);
    await createTestWorkflowNode(workflow.id, 'node_test', { label: 'Analyzer' });

    const loaded = await db
      .select()
      .from(tables.workflowNodes)
      .where(
        and(
          eq(tables.workflowNodes.workflowId, workflow.id),
          eq(tables.workflowNodes.nodeId, 'node_test'),
        ),
      );
    expect(loaded[0]!.label).toBe('Analyzer');
    expect(JSON.parse(loaded[0]!.outputSchema).type).toBe('object');
  });
});
