import { useDrizzle, tables } from '../utils/drizzle';

export async function cleanupDatabase() {
  const db = useDrizzle();
  await db.delete(tables.messages);
  await db.delete(tables.chats);
  await db.delete(tables.documentChunks);
  await db.delete(tables.documents);
  await db.delete(tables.users);
}

export async function createTestUser(overrides?: Partial<typeof tables.users.$inferInsert>) {
  const db = useDrizzle();
  const [user] = await db
    .insert(tables.users)
    .values({
      email: 'test@example.com',
      name: 'Test User',
      avatar: 'https://example.com/avatar.png',
      username: 'testuser',
      provider: 'github',
      providerId: '12345',
      ...overrides,
    })
    .returning();
  return user!;
}

export async function createTestChat(
  userId: string,
  overrides?: Partial<typeof tables.chats.$inferInsert>,
) {
  const db = useDrizzle();
  const [chat] = await db
    .insert(tables.chats)
    .values({
      title: 'Test Chat',
      userId,
      ...overrides,
    })
    .returning();
  return chat!;
}

export async function createTestMessage(
  chatId: string,
  overrides?: Partial<typeof tables.messages.$inferInsert>,
) {
  const db = useDrizzle();
  const [message] = await db
    .insert(tables.messages)
    .values({
      chatId,
      role: 'user',
      parts: [{ type: 'text', text: 'Test message' }],
      ...overrides,
    })
    .returning();
  return message!;
}
