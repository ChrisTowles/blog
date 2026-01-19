import { z } from 'zod';

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  const { input } = await readValidatedBody(
    event,
    z.object({
      input: z.string().min(1, 'Message cannot be empty'),
    }).parse,
  );
  const db = useDrizzle();

  const [chat] = await db
    .insert(tables.chats)
    .values({
      title: '',
      userId: session.user?.id || session.id,
    })
    .returning();
  if (!chat) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create chat' });
  }

  await db.insert(tables.messages).values({
    chatId: chat.id,
    role: 'user',
    parts: [{ type: 'text', text: input }],
  });

  return chat;
});
