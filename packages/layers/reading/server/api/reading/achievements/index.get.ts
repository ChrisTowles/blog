import { z } from 'zod';

const querySchema = z.object({
  childId: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
  const { childId } = await getValidatedQuery(event, querySchema.parse);
  await requireChildOwner(event, childId);

  const db = useDrizzle();
  const rows = await db
    .select()
    .from(tables.achievements)
    .where(eq(tables.achievements.childId, childId))
    .orderBy(desc(tables.achievements.earnedAt));

  return rows.map((a) => ({
    id: a.id,
    childId: a.childId,
    type: a.type,
    earnedAt: a.earnedAt.toISOString(),
    meta: a.meta ?? null,
  }));
});
