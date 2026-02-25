/**
 * Loan CRUD Integration Tests
 *
 * Tests loan database operations against a real PostgreSQL database.
 * Requires DATABASE_URL environment variable pointing to a running PostgreSQL instance.
 *
 * Run with: pnpm test:integration -- --run loan-crud
 */
import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import { useDrizzle, tables, eq, and, desc } from '../../utils/drizzle';
import {
  cleanupDatabase,
  createTestUser,
  createTestLoanApplication,
  createTestLoanReview,
  createTestLoanMessage,
  COMPLETE_APPLICATION_DATA,
} from '../../test-utils/db-helper';

const hasDatabase = !!process.env.DATABASE_URL;

describe.skipIf(!hasDatabase)('Loan CRUD Integration', () => {
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

  describe('Create application', () => {
    it('inserts a loan application with default values', async () => {
      const app = await createTestLoanApplication(testUser.id);

      expect(app).toBeDefined();
      expect(app.id).toBeTruthy();
      expect(app.userId).toBe(testUser.id);
      expect(app.status).toBe('intake');
      expect(app.applicationData).toEqual({});
    });

    it('generates unique IDs', async () => {
      const app1 = await createTestLoanApplication(testUser.id);
      const app2 = await createTestLoanApplication(testUser.id);

      expect(app1.id).not.toBe(app2.id);
    });

    it('accepts application data override', async () => {
      const app = await createTestLoanApplication(testUser.id, {
        applicationData: COMPLETE_APPLICATION_DATA,
      });

      expect(app.applicationData).toEqual(COMPLETE_APPLICATION_DATA);
    });
  });

  describe('Get application', () => {
    it('returns application with reviews and messages', async () => {
      const app = await createTestLoanApplication(testUser.id, {
        applicationData: COMPLETE_APPLICATION_DATA,
      });
      await createTestLoanReview(app.id, { reviewer: 'the-bank' });
      await createTestLoanMessage(app.id, {
        role: 'user',
        parts: [{ type: 'text', text: 'Hello' }],
      });

      const result = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => and(e(a.id, app.id), e(a.userId, testUser.id)),
        with: {
          reviews: true,
          messages: true,
        },
      });

      expect(result).toBeDefined();
      expect(result!.reviews).toHaveLength(1);
      expect(result!.messages).toHaveLength(1);
    });

    it('returns undefined for non-existent ID', async () => {
      const result = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => and(e(a.id, 'non-existent'), e(a.userId, testUser.id)),
      });

      expect(result).toBeUndefined();
    });

    it('enforces user isolation', async () => {
      const otherUser = await createTestUser({
        email: 'other@example.com',
        username: 'otheruser',
        providerId: '99999',
      });

      const app = await createTestLoanApplication(otherUser.id);

      const result = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => and(e(a.id, app.id), e(a.userId, testUser.id)),
      });

      expect(result).toBeUndefined();
    });
  });

  describe('Update application', () => {
    it('updates applicationData JSON field', async () => {
      const app = await createTestLoanApplication(testUser.id);

      await db
        .update(tables.loanApplications)
        .set({ applicationData: COMPLETE_APPLICATION_DATA })
        .where(eq(tables.loanApplications.id, app.id));

      const updated = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => e(a.id, app.id),
      });

      expect(updated!.applicationData).toEqual(COMPLETE_APPLICATION_DATA);
    });

    it('transitions status from intake to reviewing', async () => {
      const app = await createTestLoanApplication(testUser.id);

      await db
        .update(tables.loanApplications)
        .set({ status: 'reviewing' })
        .where(eq(tables.loanApplications.id, app.id));

      const updated = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => e(a.id, app.id),
      });

      expect(updated!.status).toBe('reviewing');
    });
  });

  describe('Status transitions', () => {
    it('can transition through intake → reviewing → approved', async () => {
      const app = await createTestLoanApplication(testUser.id);

      await db
        .update(tables.loanApplications)
        .set({ status: 'reviewing' })
        .where(eq(tables.loanApplications.id, app.id));

      await db
        .update(tables.loanApplications)
        .set({ status: 'approved' })
        .where(eq(tables.loanApplications.id, app.id));

      const final = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => e(a.id, app.id),
      });
      expect(final!.status).toBe('approved');
    });

    it('can transition through intake → reviewing → denied', async () => {
      const app = await createTestLoanApplication(testUser.id);

      await db
        .update(tables.loanApplications)
        .set({ status: 'reviewing' })
        .where(eq(tables.loanApplications.id, app.id));

      await db
        .update(tables.loanApplications)
        .set({ status: 'denied' })
        .where(eq(tables.loanApplications.id, app.id));

      const final = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => e(a.id, app.id),
      });
      expect(final!.status).toBe('denied');
    });

    it('can transition through intake → reviewing → flagged', async () => {
      const app = await createTestLoanApplication(testUser.id);

      await db
        .update(tables.loanApplications)
        .set({ status: 'reviewing' })
        .where(eq(tables.loanApplications.id, app.id));

      await db
        .update(tables.loanApplications)
        .set({ status: 'flagged' })
        .where(eq(tables.loanApplications.id, app.id));

      const final = await db.query.loanApplications.findFirst({
        where: (a, { eq: e }) => e(a.id, app.id),
      });
      expect(final!.status).toBe('flagged');
    });
  });

  describe('Cascade deletes', () => {
    it('deleting application cascade-deletes reviews', async () => {
      const app = await createTestLoanApplication(testUser.id);
      await createTestLoanReview(app.id, { reviewer: 'the-bank' });
      await createTestLoanReview(app.id, { reviewer: 'loan-market' });

      await db.delete(tables.loanApplications).where(eq(tables.loanApplications.id, app.id));

      const reviews = await db
        .select()
        .from(tables.loanReviews)
        .where(eq(tables.loanReviews.applicationId, app.id));
      expect(reviews).toHaveLength(0);
    });

    it('deleting application cascade-deletes messages', async () => {
      const app = await createTestLoanApplication(testUser.id);
      await createTestLoanMessage(app.id);
      await createTestLoanMessage(app.id);

      await db.delete(tables.loanApplications).where(eq(tables.loanApplications.id, app.id));

      const messages = await db
        .select()
        .from(tables.loanMessages)
        .where(eq(tables.loanMessages.applicationId, app.id));
      expect(messages).toHaveLength(0);
    });
  });

  describe('Reviews', () => {
    it('inserts review with all fields', async () => {
      const app = await createTestLoanApplication(testUser.id);
      const review = await createTestLoanReview(app.id, {
        reviewer: 'loan-market',
        decision: 'flagged',
        analysis: 'High LTV ratio needs review.',
        flags: ['LTV above 80%', 'Limited employment history'],
      });

      expect(review.reviewer).toBe('loan-market');
      expect(review.decision).toBe('flagged');
      expect(review.analysis).toBe('High LTV ratio needs review.');
      expect(review.flags).toEqual(['LTV above 80%', 'Limited employment history']);
    });

    it('supports multiple reviews per application', async () => {
      const app = await createTestLoanApplication(testUser.id);
      await createTestLoanReview(app.id, { reviewer: 'the-bank' });
      await createTestLoanReview(app.id, { reviewer: 'loan-market' });
      await createTestLoanReview(app.id, { reviewer: 'background-checks' });

      const reviews = await db
        .select()
        .from(tables.loanReviews)
        .where(eq(tables.loanReviews.applicationId, app.id));
      expect(reviews).toHaveLength(3);
    });

    it('flags JSON array round-trips correctly', async () => {
      const app = await createTestLoanApplication(testUser.id);
      const flags = ['flag one', 'flag two', 'flag with "quotes"'];
      await createTestLoanReview(app.id, { flags });

      const review = await db.query.loanReviews.findFirst({
        where: (r, { eq: e }) => e(r.applicationId, app.id),
      });
      expect(review!.flags).toEqual(flags);
    });
  });

  describe('Messages', () => {
    it('inserts loan message correctly', async () => {
      const app = await createTestLoanApplication(testUser.id);
      const msg = await createTestLoanMessage(app.id, {
        role: 'assistant',
        parts: [{ type: 'text', text: 'Welcome to your loan application.' }],
      });

      expect(msg.applicationId).toBe(app.id);
      expect(msg.role).toBe('assistant');
    });

    it('messages ordered by createdAt', async () => {
      const app = await createTestLoanApplication(testUser.id);
      const msg1 = await createTestLoanMessage(app.id, {
        role: 'user',
        parts: [{ type: 'text', text: 'First' }],
      });
      await new Promise((r) => setTimeout(r, 10));
      const msg2 = await createTestLoanMessage(app.id, {
        role: 'assistant',
        parts: [{ type: 'text', text: 'Second' }],
      });

      const messages = await db
        .select()
        .from(tables.loanMessages)
        .where(eq(tables.loanMessages.applicationId, app.id))
        .orderBy(desc(tables.loanMessages.createdAt));

      expect(messages).toHaveLength(2);
      expect(messages[0]!.id).toBe(msg2.id);
      expect(messages[1]!.id).toBe(msg1.id);
    });
  });
});
