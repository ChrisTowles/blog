/**
 * POST /api/typing/groups/:slug/join
 *
 * Accepts a single-use invite token and adds the calling user as a guardian
 * of the group. The :slug here is actually the invite token (we use this
 * shape for symmetry with other group routes — `groupId` is read from the
 * invite row, not the URL).
 *
 * Token must:
 *   - exist
 *   - not be expired
 *   - not already accepted
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';

const paramsSchema = z.object({
  slug: z.string().min(1),
});

export default defineEventHandler(async (event) => {
  const { slug: token } = await getValidatedRouterParams(event, paramsSchema.parse);

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

  // Look up the group so the client can display name + use slug in any URL.
  const groupRows = await db
    .select({ slug: tables.typingGroups.slug, name: tables.typingGroups.name })
    .from(tables.typingGroups)
    .where(eq(tables.typingGroups.id, invite.groupId))
    .limit(1);
  const group = groupRows[0];

  return {
    ok: true,
    groupId: invite.groupId,
    groupSlug: group?.slug ?? null,
    groupName: group?.name ?? null,
  };
});
