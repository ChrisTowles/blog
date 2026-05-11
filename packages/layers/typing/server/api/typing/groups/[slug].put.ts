/**
 * PUT /api/typing/groups/:slug
 *
 * Updates name and/or kind. Guardian-only. Slug is immutable.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import type { TypingGroup, TypingGroupKind } from '../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';
import { findGroupBySlug } from '../../../utils/typing/groups';

const paramsSchema = z.object({
  slug: z.string().min(1).max(96),
});

const bodySchema = z.object({
  name: z.string().min(1).max(120).optional(),
  kind: z.enum(['family', 'classroom']).optional(),
});

export default defineEventHandler(async (event) => {
  const { slug } = await getValidatedRouterParams(event, paramsSchema.parse);
  const group = await findGroupBySlug(slug);
  if (!group) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }
  await requireGuardian(event, { groupId: group.id });

  const body = await readValidatedBody(event, bodySchema.parse);
  if (!body.name && !body.kind) {
    throw createError({ statusCode: 400, statusMessage: 'Nothing to update' });
  }

  const db = useDrizzle();
  const [updated] = await db
    .update(tables.typingGroups)
    .set({ ...(body.name ? { name: body.name } : {}), ...(body.kind ? { kind: body.kind } : {}) })
    .where(eq(tables.typingGroups.id, group.id))
    .returning();

  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }

  const out: TypingGroup = {
    id: updated.id,
    slug: updated.slug,
    name: updated.name,
    kind: updated.kind as TypingGroupKind,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
  return { group: out };
});
