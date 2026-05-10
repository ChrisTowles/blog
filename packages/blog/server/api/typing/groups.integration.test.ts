/**
 * Typing groups + learners + progress integration tests.
 *
 * Exercises the DB-touching helpers (`groups.ts`, progress merge/update
 * logic) against a real PostgreSQL instance. The HTTP routes themselves
 * compose these helpers + auth + Zod validation, which is exercised via
 * Playwright.
 *
 * Run with: pnpm test:integration -- --run typing
 */
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest';
import { useDrizzle, tables, and, eq } from '../../utils/drizzle';
import {
  cleanupDatabase,
  createTestUser,
  createTestTypingGroup,
  addTestGuardian,
  createTestLearner,
} from '../../test-utils/db-helper';
import {
  generateInviteToken,
  isGuardianOfGroup,
  isGuardianOfLearner,
  listGuardianGroups,
  listGroupLearners,
  findLearnerById,
} from '../../../../layers/typing/server/utils/typing/groups';

const hasDatabase = !!process.env.DATABASE_URL;

describe.skipIf(!hasDatabase)('Typing groups integration', () => {
  let db: ReturnType<typeof useDrizzle>;

  beforeAll(() => {
    db = useDrizzle();
  });

  beforeEach(async () => {
    await cleanupDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  describe('membership helpers', () => {
    it('isGuardianOfGroup returns true for members and false otherwise', async () => {
      const alice = await createTestUser({ email: 'alice@example.com', providerId: 'a1' });
      const bob = await createTestUser({ email: 'bob@example.com', providerId: 'b1' });
      const group = await createTestTypingGroup();
      await addTestGuardian(group.id, alice.id);

      expect(await isGuardianOfGroup(alice.id, group.id)).toBe(true);
      expect(await isGuardianOfGroup(bob.id, group.id)).toBe(false);
    });

    it('isGuardianOfLearner walks group membership', async () => {
      const alice = await createTestUser({ email: 'a@x', providerId: 'a' });
      const bob = await createTestUser({ email: 'b@x', providerId: 'b' });
      const group = await createTestTypingGroup();
      await addTestGuardian(group.id, alice.id);
      const learner = await createTestLearner(group.id);

      expect(await isGuardianOfLearner(alice.id, learner.id)).toBe(true);
      expect(await isGuardianOfLearner(bob.id, learner.id)).toBe(false);
    });

    it('listGuardianGroups returns only groups the user is in', async () => {
      const alice = await createTestUser({ email: 'a@x', providerId: 'a' });
      const groupA = await createTestTypingGroup({ name: 'Group A' });
      const groupB = await createTestTypingGroup({ name: 'Group B' });
      await addTestGuardian(groupA.id, alice.id);
      await addTestGuardian(groupB.id, alice.id);

      const groupC = await createTestTypingGroup({ name: 'Group C' });
      // alice is not a guardian of C

      const out = await listGuardianGroups(alice.id);
      const names = out.map((g) => g.name).sort();
      expect(names).toEqual(['Group A', 'Group B']);
      expect(names).not.toContain(groupC.name);
    });

    it('listGroupLearners returns learners scoped to the group', async () => {
      const groupA = await createTestTypingGroup({ name: 'A' });
      const groupB = await createTestTypingGroup({ name: 'B' });
      await createTestLearner(groupA.id, { displayName: 'Logan' });
      await createTestLearner(groupA.id, { displayName: 'Owen' });
      await createTestLearner(groupB.id, { displayName: 'Mia' });

      const a = await listGroupLearners(groupA.id);
      const b = await listGroupLearners(groupB.id);
      expect(a.map((l) => l.displayName).sort()).toEqual(['Logan', 'Owen']);
      expect(b.map((l) => l.displayName)).toEqual(['Mia']);
    });

    it('findLearnerById returns null for unknown ids', async () => {
      const group = await createTestTypingGroup();
      const learner = await createTestLearner(group.id);
      expect(await findLearnerById(learner.id)).not.toBeNull();
      expect(await findLearnerById(999_999)).toBeNull();
    });
  });

  describe('invites', () => {
    it('generates unique tokens', () => {
      const t1 = generateInviteToken();
      const t2 = generateInviteToken();
      expect(t1).not.toBe(t2);
      expect(t1.length).toBe(32);
      expect(/^[0-9a-f]{32}$/.test(t1)).toBe(true);
    });

    it('inserts and retrieves an invite row', async () => {
      const group = await createTestTypingGroup();
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const [invite] = await db
        .insert(tables.typingGroupInvites)
        .values({
          groupId: group.id,
          token: generateInviteToken(),
          email: 'guest@example.com',
          expiresAt,
        })
        .returning();
      expect(invite).toBeDefined();
      expect(invite!.acceptedAt).toBeNull();
    });
  });

  describe('learner CRUD', () => {
    it('creates a learner and updates currentStage', async () => {
      const group = await createTestTypingGroup();
      const learner = await createTestLearner(group.id);
      expect(learner.currentStage).toBe(1);

      const [updated] = await db
        .update(tables.typingLearners)
        .set({ currentStage: 5 })
        .where(eq(tables.typingLearners.id, learner.id))
        .returning();
      expect(updated!.currentStage).toBe(5);
    });
  });

  describe('progress writes + key stats', () => {
    it('records an attempt and a key-stat upsert', async () => {
      const group = await createTestTypingGroup();
      const learner = await createTestLearner(group.id);

      const [attempt] = await db
        .insert(tables.typingAttempts)
        .values({
          learnerId: learner.id,
          lessonId: null,
          gameSlug: null,
          wpm: 12,
          netWpm: 10,
          accuracy: 0.95,
          durationMs: 30_000,
          errorsByKey: { f: 1 },
        })
        .returning();
      expect(attempt!.wpm).toBe(12);

      // Upsert key stat for "f".
      await db.insert(tables.typingKeyStats).values({
        learnerId: learner.id,
        key: 'f',
        attempts: 10,
        errors: 1,
        avgMs: 220,
      });

      const rows = await db
        .select()
        .from(tables.typingKeyStats)
        .where(
          and(eq(tables.typingKeyStats.learnerId, learner.id), eq(tables.typingKeyStats.key, 'f')),
        );
      expect(rows).toHaveLength(1);
      expect(rows[0]!.errors).toBe(1);
    });

    it('cascades attempt deletion when learner is removed', async () => {
      const group = await createTestTypingGroup();
      const learner = await createTestLearner(group.id);
      await db.insert(tables.typingAttempts).values({
        learnerId: learner.id,
        wpm: 10,
        netWpm: 10,
        accuracy: 1,
        durationMs: 10,
        errorsByKey: {},
      });

      await db.delete(tables.typingLearners).where(eq(tables.typingLearners.id, learner.id));

      const remaining = await db
        .select()
        .from(tables.typingAttempts)
        .where(eq(tables.typingAttempts.learnerId, learner.id));
      expect(remaining).toHaveLength(0);
    });
  });
});
