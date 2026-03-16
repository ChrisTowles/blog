import { z } from 'zod';
import { eq, asc } from 'drizzle-orm';
import { requireChildOwner } from '../../../utils/reading/require-child-owner';
import type { PhonicsMapUnit, PhonicsProgressStatus } from '~~/shared/reading-types';

export default defineEventHandler(async (event) => {
  const { childId } = await getValidatedQuery(
    event,
    z.object({ childId: z.coerce.number() }).parse,
  );

  await requireChildOwner(event, childId);
  const db = useDrizzle();

  // Get all phonics units sorted by phase + orderIndex
  const units = await db
    .select()
    .from(tables.phonicsUnits)
    .orderBy(asc(tables.phonicsUnits.phase), asc(tables.phonicsUnits.orderIndex));

  // Get child's progress for all units
  const progress = await db
    .select()
    .from(tables.childPhonicsProgress)
    .where(eq(tables.childPhonicsProgress.childId, childId));

  const progressByUnit = new Map(progress.map((p) => [p.phonicsUnitId, p]));

  const result: PhonicsMapUnit[] = units.map((unit) => {
    const p = progressByUnit.get(unit.id);
    return {
      id: unit.id,
      phase: unit.phase as PhonicsMapUnit['phase'],
      orderIndex: unit.orderIndex,
      name: unit.name,
      patterns: unit.patterns,
      description: unit.description,
      status: (p?.status ?? 'locked') as PhonicsProgressStatus,
      masteredAt: p?.masteredAt?.toISOString() ?? null,
    };
  });

  return result;
});
