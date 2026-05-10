/**
 * POST /api/typing/groups/:id/join
 *
 * Accepts a single-use invite token and adds the calling user as a guardian
 * of the group. The :id in the URL is the invite token (we use the same
 * route shape as other group routes for symmetry — `groupId` is read from
 * the invite row, not the URL).
 *
 * Token must:
 *   - exist
 *   - not be expired
 *   - not already accepted
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const paramsSchema = z.object({
  id: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  const { id: token } = await getValidatedRouterParams(event, paramsSchema.parse);

  const session = await getUserSession(event);
  const userId = session.user?.id;
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Sign in required' });
  }

  const db = useDrizzle();
  const inviteRows = await db
    .select()
    .from(tables.typingGroupInvites)
    .where(eq(tables.typingGroupInvites.token, token))
    .limit(1);
  const invite = inviteRows[0];
  if (!invite) {
    throw createError({ statusCode: 404, statusMessage: 'Invite not found' });
  }
  if (invite.acceptedAt) {
    throw createError({ statusCode: 410, statusMessage: 'Invite already used' });
  }
  if (invite.expiresAt.getTime() < Date.now()) {
    throw createError({ statusCode: 410, statusMessage: 'Invite expired' });
  }

  // Add as guardian (idempotent — onConflictDoNothing on PK).
  await db
    .insert(tables.typingGroupMembers)
    .values({
      groupId: invite.groupId,
      userId,
      role: 'guardian',
      invitedBy: null,
    })
    .onConflictDoNothing();

  await db
    .update(tables.typingGroupInvites)
    .set({ acceptedAt: new Date(), acceptedBy: userId })
    .where(eq(tables.typingGroupInvites.id, invite.id));

  return { ok: true, groupId: invite.groupId };
});
