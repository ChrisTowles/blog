export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const db = useDrizzle();

  // Check if already seeded
  const existing = await db.query.phonicsUnits.findFirst();
  if (existing) {
    return { message: 'Already seeded', count: 0 };
  }

  const inserted = await db.insert(tables.phonicsUnits).values(PHONICS_SEED).returning();

  return { message: 'Seeded phonics units', count: inserted.length };
});
