import { z } from 'zod';
import { requireChildOwner } from '../../../utils/reading/require-child-owner';

const bodySchema = z.object({
  childId: z.number(),
});

export default defineEventHandler(async (event) => {
  const { childId } = await readValidatedBody(event, bodySchema.parse);
  await requireChildOwner(event, childId);

  const newAchievements = await checkAchievements(childId);
  return { newAchievements };
});
