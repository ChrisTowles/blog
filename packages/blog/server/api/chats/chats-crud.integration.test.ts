/**
 * Chat CRUD Integration Tests
 *
 * Tests chat database operations against a real PostgreSQL database.
 * Requires DATABASE_URL environment variable pointing to a running PostgreSQL instance.
 *
 * Run with: pnpm test:integration -- --run chats-crud
 */
import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import { useDrizzle, tables, eq, and, desc } from '../../utils/drizzle';
import {
  cleanupDatabase,
  createTestUser,
  createTestChat,
  createTestMessage,
} from '../../test-utils/db-helper';

const hasDatabase = !!process.env.DATABASE_URL;

describe.skipIf(!hasDatabase)('Chat CRUD Integration', () => {
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

  describe('List chats (GET /api/chats)', () => {
    it('returns empty array when user has no chats', async () => {
      const chats = await db
        .select()
        .from(tables.chats)
        .where(eq(tables.chats.userId, testUser.id))
        .orderBy(desc(tables.chats.createdAt));

      expect(chats).toEqual([]);
    });

    it('returns chats ordered by createdAt descending', async () => {
      const chat1 = await createTestChat(testUser.id, { title: 'First' });
      // Small delay to ensure different timestamps
      await new Promise((r) => setTimeout(r, 10));
      const chat2 = await createTestChat(testUser.id, { title: 'Second' });

      const chats = await db
        .select()
        .from(tables.chats)
        .where(eq(tables.chats.userId, testUser.id))
        .orderBy(desc(tables.chats.createdAt));

      expect(chats).toHaveLength(2);
      expect(chats[0]!.id).toBe(chat2.id);
      expect(chats[1]!.id).toBe(chat1.id);
    });

    it('only returns chats for the requesting user', async () => {
      const otherUser = await createTestUser({
        email: 'other@example.com',
        username: 'otheruser',
        providerId: '99999',
      });

      await createTestChat(testUser.id, { title: 'My Chat' });
      await createTestChat(otherUser.id, { title: 'Their Chat' });

      const myChats = await db
        .select()
        .from(tables.chats)
        .where(eq(tables.chats.userId, testUser.id));

      expect(myChats).toHaveLength(1);
      expect(myChats[0]!.title).toBe('My Chat');
    });
  });

  describe('Create chat (POST /api/chats)', () => {
    it('creates a chat with empty title and initial message', async () => {
      const [chat] = await db
        .insert(tables.chats)
        .values({
          title: '',
          userId: testUser.id,
        })
        .returning();

      expect(chat).toBeDefined();
      expect(chat!.title).toBe('');
      expect(chat!.userId).toBe(testUser.id);
      expect(chat!.id).toBeTruthy();

      // Create initial message like the route does
      const [message] = await db
        .insert(tables.messages)
        .values({
          chatId: chat!.id,
          role: 'user',
          parts: [{ type: 'text', text: 'Hello AI' }],
        })
        .returning();

      expect(message).toBeDefined();
      expect(message!.chatId).toBe(chat!.id);
      expect(message!.role).toBe('user');
    });

    it('generates unique chat IDs', async () => {
      const chat1 = await createTestChat(testUser.id);
      const chat2 = await createTestChat(testUser.id);

      expect(chat1.id).not.toBe(chat2.id);
    });
  });

  describe('Get chat with messages (GET /api/chats/:id)', () => {
    it('returns chat with its messages', async () => {
      const chat = await createTestChat(testUser.id, { title: 'Test Chat' });
      await createTestMessage(chat.id, {
        role: 'user',
        parts: [{ type: 'text', text: 'Hello' }],
      });
      await createTestMessage(chat.id, {
        role: 'assistant',
        parts: [{ type: 'text', text: 'Hi there!' }],
      });

      const result = await db.query.chats.findFirst({
        where: (c, { eq: e }) => and(e(c.id, chat.id), e(c.userId, testUser.id)),
        with: {
          messages: true,
        },
      });

      expect(result).toBeDefined();
      expect(result!.title).toBe('Test Chat');
      expect(result!.messages).toHaveLength(2);
      expect(result!.messages[0]!.role).toBe('user');
      expect(result!.messages[1]!.role).toBe('assistant');
    });

    it('returns undefined for non-existent chat', async () => {
      const result = await db.query.chats.findFirst({
        where: (c, { eq: e }) => and(e(c.id, 'non-existent-id'), e(c.userId, testUser.id)),
        with: {
          messages: true,
        },
      });

      expect(result).toBeUndefined();
    });

    it('does not return another user chat', async () => {
      const otherUser = await createTestUser({
        email: 'other@example.com',
        username: 'otheruser',
        providerId: '99999',
      });
      const otherChat = await createTestChat(otherUser.id, { title: 'Secret Chat' });

      const result = await db.query.chats.findFirst({
        where: (c, { eq: e }) => and(e(c.id, otherChat.id), e(c.userId, testUser.id)),
        with: {
          messages: true,
        },
      });

      expect(result).toBeUndefined();
    });
  });

  describe('Delete single chat (DELETE /api/chats/:id)', () => {
    it('deletes a chat and returns it', async () => {
      const chat = await createTestChat(testUser.id, { title: 'To Delete' });

      const deleted = await db
        .delete(tables.chats)
        .where(and(eq(tables.chats.id, chat.id), eq(tables.chats.userId, testUser.id)))
        .returning();

      expect(deleted).toHaveLength(1);
      expect(deleted[0]!.id).toBe(chat.id);

      // Verify it's gone
      const remaining = await db.select().from(tables.chats).where(eq(tables.chats.id, chat.id));
      expect(remaining).toHaveLength(0);
    });

    it('cascade-deletes associated messages', async () => {
      const chat = await createTestChat(testUser.id);
      await createTestMessage(chat.id);
      await createTestMessage(chat.id);

      await db
        .delete(tables.chats)
        .where(and(eq(tables.chats.id, chat.id), eq(tables.chats.userId, testUser.id)));

      const messages = await db
        .select()
        .from(tables.messages)
        .where(eq(tables.messages.chatId, chat.id));
      expect(messages).toHaveLength(0);
    });

    it('returns empty array when deleting non-existent chat', async () => {
      const deleted = await db
        .delete(tables.chats)
        .where(and(eq(tables.chats.id, 'non-existent'), eq(tables.chats.userId, testUser.id)))
        .returning();

      expect(deleted).toHaveLength(0);
    });

    it('does not delete another user chat', async () => {
      const otherUser = await createTestUser({
        email: 'other@example.com',
        username: 'otheruser',
        providerId: '99999',
      });
      const otherChat = await createTestChat(otherUser.id);

      const deleted = await db
        .delete(tables.chats)
        .where(and(eq(tables.chats.id, otherChat.id), eq(tables.chats.userId, testUser.id)))
        .returning();

      expect(deleted).toHaveLength(0);

      // Verify the other user's chat still exists
      const remaining = await db
        .select()
        .from(tables.chats)
        .where(eq(tables.chats.id, otherChat.id));
      expect(remaining).toHaveLength(1);
    });
  });

  describe('Delete all user chats (DELETE /api/chats)', () => {
    it('deletes all chats for a user', async () => {
      await createTestChat(testUser.id, { title: 'Chat 1' });
      await createTestChat(testUser.id, { title: 'Chat 2' });
      await createTestChat(testUser.id, { title: 'Chat 3' });

      const deleted = await db
        .delete(tables.chats)
        .where(eq(tables.chats.userId, testUser.id))
        .returning();

      expect(deleted).toHaveLength(3);
    });

    it('does not delete other users chats', async () => {
      const otherUser = await createTestUser({
        email: 'other@example.com',
        username: 'otheruser',
        providerId: '99999',
      });

      await createTestChat(testUser.id, { title: 'My Chat' });
      await createTestChat(otherUser.id, { title: 'Their Chat' });

      await db.delete(tables.chats).where(eq(tables.chats.userId, testUser.id));

      const remaining = await db
        .select()
        .from(tables.chats)
        .where(eq(tables.chats.userId, otherUser.id));
      expect(remaining).toHaveLength(1);
      expect(remaining[0]!.title).toBe('Their Chat');
    });

    it('returns empty array when user has no chats', async () => {
      const deleted = await db
        .delete(tables.chats)
        .where(eq(tables.chats.userId, testUser.id))
        .returning();

      expect(deleted).toHaveLength(0);
    });
  });
});
