export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  const db = useDrizzle();

  return await db
    .delete(tables.chats)
    .where(eq(tables.chats.userId, session.user?.id || session.id))
    .returning();
});
