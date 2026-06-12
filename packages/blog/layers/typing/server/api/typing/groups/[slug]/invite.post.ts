/**
 * POST /api/typing/groups/:slug/invite
 *
 * Generates a single-use invite token (7-day TTL). Caller must be a guardian.
 * Returns `{ token, url, expiresAt }` so the client can copy or send.
 */
import { z } from 'zod';
import { requireGuardian } from '../../../../utils/typing/require-guardian';
import { findGroupBySlug, generateInviteToken } from '../../../../utils/typing/groups';

const paramsSchema = z.object({
  slug: z.string().min(1).max(96),
});

const bodySchema = z
  .object({
    email: z.string().email().optional(),
  })
  .default({});

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, paramsSchema.parse);
  const group = await findGroupBySlug(slug);
  if (!group) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }
  await requireGuardian(event, { groupId: group.id });

  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const token = generateInviteToken();
  const expiresAt = new Date(Date.now() + SEVEN_DAYS_MS);

  const [invite] = await db
    .insert(tables.typingGroupInvites)
    .values({
      groupId: group.id,
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
