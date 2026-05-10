/**
 * POST /api/typing/groups/:id/invite
 *
 * Generates a single-use invite token (7-day TTL). Caller must be a guardian.
 * Returns `{ token, url, expiresAt }` so the client can copy or send.
 */
import { z } from 'zod';
import { requireGuardian } from '../../../../utils/typing/require-guardian';
import { generateInviteToken } from '../../../../utils/typing/groups';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
  email: z.string().email().optional(),
});

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default defineEventHandler(async (event) => {
  const { id: groupId } = await getValidatedRouterParams(event, paramsSchema.parse);
  await requireGuardian(event, { groupId });

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const token = generateInviteToken();
  const expiresAt = new Date(Date.now() + SEVEN_DAYS_MS);

  const [invite] = await db
    .insert(tables.typingGroupInvites)
    .values({
      groupId,
      token,
      email: body.email ?? null,
      expiresAt,
    })
    .returning();

  if (!invite) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to create invite' });
  }

  return {
    token: invite.token,
    expiresAt: invite.expiresAt.toISOString(),
    url: `/typing/join/${invite.token}`,
  };
});
