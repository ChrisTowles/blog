/**
 * POST /api/chats/:id/messages — persist one message into the chat's `parts`
 * column *without* running the Anthropic agent loop. The aviation surface takes
 * this bypass to store a UiResourcePart (plus optional synthetic user text) in
 * the same table the agent uses.
 */

import { z } from 'zod';
import type { MessagePart } from '~~/shared/chat-types';

const jsonObjectSchema = z.record(z.string(), z.json());

const messagePartSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), text: z.string() }),
  z.object({
    type: z.literal('reasoning'),
    text: z.string(),
    state: z.enum(['streaming', 'done']),
  }),
  z.object({
    type: z.literal('tool-use'),
    toolName: z.string(),
    toolCallId: z.string(),
    args: jsonObjectSchema,
  }),
  z.object({ type: z.literal('tool-result'), toolCallId: z.string(), result: z.unknown() }),
  z.object({
    type: z.literal('code-execution'),
    code: z.string(),
    language: z.string(),
    stdout: z.string(),
    stderr: z.string(),
    exitCode: z.number(),
    state: z.enum(['running', 'done']),
  }),
  z.object({
    type: z.literal('file'),
    fileId: z.string(),
    fileName: z.string(),
    mediaType: z.string(),
    url: z.string(),
  }),
  z.object({
    type: z.literal('ui-resource'),
    toolCallId: z.string(),
    uiResourceUri: z.string(),
    structuredContent: jsonObjectSchema,
    csp: z
      .object({
        connectDomains: z.array(z.string()).optional(),
        resourceDomains: z.array(z.string()).optional(),
        frameDomains: z.array(z.string()).optional(),
      })
      .optional(),
    permissions: jsonObjectSchema.optional(),
    error: z.boolean().optional(),
  }),
]) satisfies z.ZodType<MessagePart>;

const bodySchema = z.object({
  role: z.enum(['user', 'assistant']),
  parts: z.array(messagePartSchema),
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

  const { id: chatId } = await getValidatedRouterParams(
    event,
    z.object({ id: z.string().min(1) }).parse,
  );

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
      parts: body.parts,
    })
    .returning({ id: tables.messages.id });

  if (!inserted) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to insert message' });
  }

  return { id: inserted.id };
});
