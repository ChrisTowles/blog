/**
 * POST /api/chats/:id/messages — persist a single message into the chat's
 * parts column WITHOUT running the Anthropic agent loop.
 *
 * This is the bypass path documented in the plan (Unit 6, line 114):
 *   "Blog runs its own MCP client; aviation queries bypass the Anthropic
 *    agent loop entirely."
 *
 * The aviation surface uses this to persist a UiResourcePart (plus optional
 * synthetic user text) against the same `messages` table the agent uses.
 * The existing `parts` JSON column tolerates arbitrary MessagePart shapes.
 *
 * Contract (intentionally minimal):
 *   body = { role: 'user' | 'assistant', parts: MessagePart[] }
 *   response = { id: string }
 */

import { z } from 'zod';
import type { MessagePart } from '~~/shared/chat-types';

const bodySchema = z.object({
  role: z.enum(['user', 'assistant']),
  /** Opaque array of parts; shape-widened (plan line 553): we trust the client. */
  parts: z.array(z.record(z.string(), z.unknown())).min(0),
});

defineRouteMeta({
  openAPI: {
    description:
      'Append a message to a chat without invoking the Anthropic agent loop. Used by the MCP aviation surface to persist ui-resource parts.',
    tags: ['ai', 'chat'],
  },
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const params = getRouterParams(event);
  const chatId = params.id;
  if (typeof chatId !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Chat id required' });
  }
  const body = await readValidatedBody(event, bodySchema.parse);

  const db = useDrizzle();

  // Ownership check.
  const chat = await db.query.chats.findFirst({
    where: (c, { eq, and }) => and(eq(c.id, chatId), eq(c.userId, session.user?.id || session.id)),
  });
  if (!chat) {
    throw createError({ statusCode: 404, statusMessage: 'Chat not found' });
  }

  const [inserted] = await db
    .insert(tables.messages)
    .values({
      chatId,
      role: body.role,
      // Cast through MessagePart[] — schema already widened to accept it.
      parts: body.parts as unknown as MessagePart[],
    })
    .returning({ id: tables.messages.id });

  if (!inserted) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to insert message' });
  }

  return { id: inserted.id };
});
