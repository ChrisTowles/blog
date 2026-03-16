import { and, eq, count, sql, gte } from 'drizzle-orm';
import type { AchievementType, AchievementResponse } from '~~/shared/reading-types';

/**
 * Check and award any newly-earned achievements for a child.
 * Called after reading sessions and SRS reviews.
 * Returns newly awarded achievements (empty array if none).
 */
export async function checkAchievements(childId: number): Promise<AchievementResponse[]> {
  const db = useDrizzle();

  // Load existing achievements for this child
  const existing = await db
    .select({ type: tables.achievements.type })
    .from(tables.achievements)
    .where(eq(tables.achievements.childId, childId));

  const earned = new Set(existing.map((a) => a.type));
  const newAchievements: AchievementType[] = [];

  // first_story: at least 1 reading session
  if (!earned.has('first_story')) {
    const [result] = await db
      .select({ total: count() })
      .from(tables.readingSessions)
      .where(eq(tables.readingSessions.childId, childId));
    if ((result?.total ?? 0) >= 1) newAchievements.push('first_story');
  }

  // fifty_stories: at least 50 reading sessions
  if (!earned.has('fifty_stories')) {
    const [result] = await db
      .select({ total: count() })
      .from(tables.readingSessions)
      .where(eq(tables.readingSessions.childId, childId));
    if ((result?.total ?? 0) >= 50) newAchievements.push('fifty_stories');
  }

  // ten_words: at least 10 mastered SRS cards
  if (!earned.has('ten_words')) {
    const [result] = await db
      .select({ total: count() })
      .from(tables.srsCards)
      .where(and(eq(tables.srsCards.childId, childId), gte(tables.srsCards.reps, 3)));
    if ((result?.total ?? 0) >= 10) newAchievements.push('ten_words');
  }

  // seven_day_streak: sessions on 7 consecutive days
  if (!earned.has('seven_day_streak')) {
    const hasStreak = await checkSevenDayStreak(childId);
    if (hasStreak) newAchievements.push('seven_day_streak');
  }

  // phase_complete: any phonics phase fully mastered
  if (!earned.has('phase_complete')) {
    const hasPhase = await checkPhaseComplete(childId);
    if (hasPhase) newAchievements.push('phase_complete');
  }

  if (newAchievements.length === 0) return [];

  // Insert all new achievements
  const inserted = await db
    .insert(tables.achievements)
    .values(newAchievements.map((type) => ({ childId, type })))
    .returning();

  return inserted.map((a) => ({
    id: a.id,
    childId: a.childId,
    type: a.type,
    earnedAt: a.earnedAt.toISOString(),
    meta: a.meta ?? null,
  }));
}

async function checkSevenDayStreak(childId: number): Promise<boolean> {
  const db = useDrizzle();

  // Get distinct session dates in the last 30 days, ordered descending
  const rows = await db
    .selectDistinct({
      day: sql<string>`DATE(${tables.readingSessions.completedAt})`,
    })
    .from(tables.readingSessions)
    .where(
      and(
        eq(tables.readingSessions.childId, childId),
        gte(tables.readingSessions.completedAt, sql`NOW() - INTERVAL '30 days'`),
      ),
    )
    .orderBy(sql`DATE(${tables.readingSessions.completedAt}) DESC`);

  if (rows.length < 7) return false;

  // Check for 7 consecutive days anywhere in the result
  let streak = 1;
  for (let i = 1; i < rows.length; i++) {
    const prev = new Date(rows[i - 1]!.day);
    const curr = new Date(rows[i]!.day);
    const diffMs = prev.getTime() - curr.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      streak++;
      if (streak >= 7) return true;
    } else {
      streak = 1;
    }
  }

  return false;
}

async function checkPhaseComplete(childId: number): Promise<boolean> {
  const db = useDrizzle();

  // Check if all units in any phase are mastered
  const result = await db.execute(sql`
    SELECT pu.phase
    FROM phonics_units pu
    LEFT JOIN child_phonics_progress cpp
      ON cpp.phonics_unit_id = pu.id AND cpp.child_id = ${childId}
    GROUP BY pu.phase
    HAVING COUNT(*) = COUNT(CASE WHEN cpp.status = 'mastered' THEN 1 END)
    LIMIT 1
  `);

  return result.rows.length > 0;
}
