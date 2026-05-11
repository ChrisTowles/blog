/**
 * Group / learner membership helpers.
 *
 * The typing app's "act-as learner" model means most write routes need to
 * answer one of two questions:
 *   1. Is the calling user a guardian of this group?
 *   2. Is the calling user a guardian of the group that owns this learner?
 *
 * These helpers consolidate the lookups so individual routes stay terse.
 */
import { and, eq } from 'drizzle-orm';
import { useDrizzle, tables } from '../../../../../blog/server/utils/drizzle';

export async function isGuardianOfGroup(userId: string, groupId: number): Promise<boolean> {
  const db = useDrizzle();
  const rows = await db
    .select({ groupId: tables.typingGroupMembers.groupId })
    .from(tables.typingGroupMembers)
    .where(
      and(
        eq(tables.typingGroupMembers.userId, userId),
        eq(tables.typingGroupMembers.groupId, groupId),
      ),
    )
    .limit(1);
  return rows.length > 0;
}

export async function isGuardianOfLearner(userId: string, learnerId: number): Promise<boolean> {
  const db = useDrizzle();
  const rows = await db
    .select({ groupId: tables.typingLearners.groupId })
    .from(tables.typingLearners)
    .innerJoin(
      tables.typingGroupMembers,
      eq(tables.typingGroupMembers.groupId, tables.typingLearners.groupId),
    )
    .where(
      and(eq(tables.typingLearners.id, learnerId), eq(tables.typingGroupMembers.userId, userId)),
    )
    .limit(1);
  return rows.length > 0;
}

export async function listGuardianGroups(userId: string) {
  const db = useDrizzle();
  return db
    .select({
      id: tables.typingGroups.id,
      slug: tables.typingGroups.slug,
      name: tables.typingGroups.name,
      kind: tables.typingGroups.kind,
      createdAt: tables.typingGroups.createdAt,
      updatedAt: tables.typingGroups.updatedAt,
    })
    .from(tables.typingGroups)
    .innerJoin(
      tables.typingGroupMembers,
      eq(tables.typingGroupMembers.groupId, tables.typingGroups.id),
    )
    .where(eq(tables.typingGroupMembers.userId, userId));
}

export async function findGroupBySlug(slug: string) {
  const db = useDrizzle();
  const rows = await db
    .select()
    .from(tables.typingGroups)
    .where(eq(tables.typingGroups.slug, slug))
    .limit(1);
  return rows[0] ?? null;
}

/**
 * Build a public group slug from the creating user's id plus the group name.
 * Format: <first-6-of-userId>-<slug(name)>. Collisions are resolved by
 * appending `-2`, `-3`, ... via the caller's uniqueness check.
 */
export function buildGroupSlug(userId: string, name: string): string {
  const prefix = userId.replace(/-/g, '').slice(0, 6).toLowerCase();
  const namePart = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${prefix}-${namePart || 'group'}`;
}

export async function generateUniqueGroupSlug(userId: string, name: string): Promise<string> {
  const db = useDrizzle();
  const base = buildGroupSlug(userId, name);
  let candidate = base;
  let suffix = 2;
  // Tiny loop: collisions are rare (same user, same group name).
  while (true) {
    const existing = await db
      .select({ id: tables.typingGroups.id })
      .from(tables.typingGroups)
      .where(eq(tables.typingGroups.slug, candidate))
      .limit(1);
    if (existing.length === 0) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function listGroupLearners(groupId: number) {
  const db = useDrizzle();
  return db.select().from(tables.typingLearners).where(eq(tables.typingLearners.groupId, groupId));
}

export async function findLearnerById(learnerId: number) {
  const db = useDrizzle();
  const rows = await db
    .select()
    .from(tables.typingLearners)
    .where(eq(tables.typingLearners.id, learnerId))
    .limit(1);
  return rows[0] ?? null;
}

export function generateInviteToken(): string {
  // 32 hex chars = 128 bits of entropy.
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
