import { z } from 'zod';
import { requireChildOwner } from '../../../utils/reading/require-child-owner';

export default defineEventHandler(async (event) => {
  const { childId } = await getValidatedQuery(
    event,
    z.object({ childId: z.coerce.number() }).parse,
  );

  await requireChildOwner(event, childId);
  const db = useDrizzle();

  const sessions = await db.query.readingSessions.findMany({
    where: (s, { eq }) => eq(s.childId, childId),
    orderBy: (s, { desc }) => [desc(s.completedAt)],
    limit: 50,
  });

  return sessions;
});
