/**
 * PUT /api/typing/groups/:id
 *
 * Updates name and/or kind. Guardian-only.
 */
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import type { TypingGroup, TypingGroupKind } from '../../../../../../blog/shared/typing-types';
import { requireGuardian } from '../../../utils/typing/require-guardian';

const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const bodySchema = z.object({
  name: z.string().min(1).max(120).optional(),
  kind: z.enum(['family', 'classroom']).optional(),
});

export default defineEventHandler(async (event) => {
  const { id: groupId } = await getValidatedRouterParams(event, paramsSchema.parse);
  await requireGuardian(event, { groupId });

  const body = await readValidatedBody(event, bodySchema.parse);
  if (!body.name && !body.kind) {
    throw createError({ statusCode: 400, statusMessage: 'Nothing to update' });
  }

  const db = useDrizzle();
  const [updated] = await db
    .update(tables.typingGroups)
    .set({ ...(body.name ? { name: body.name } : {}), ...(body.kind ? { kind: body.kind } : {}) })
    .where(eq(tables.typingGroups.id, groupId))
    .returning();

  if (!updated) {
    throw createError({ statusCode: 404, statusMessage: 'Group not found' });
  }

  const out: TypingGroup = {
    id: updated.id,
    name: updated.name,
    kind: updated.kind as TypingGroupKind,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
  };
  return { group: out };
});
