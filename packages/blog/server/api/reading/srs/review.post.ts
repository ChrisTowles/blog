import { z } from 'zod';
import { FSRS, Rating, type Card, type Grade } from 'ts-fsrs';
import { requireChildOwner } from '../../../utils/reading/require-child-owner';

const bodySchema = z.object({
  cardId: z.number(),
  rating: z.union([z.literal(1), z.literal(3), z.literal(4)]),
});

const fsrs = new FSRS({
  request_retention: 0.85,
  maximum_interval: 180,
});

const RATING_MAP: Record<1 | 3 | 4, Grade> = {
  1: Rating.Again,
  3: Rating.Hard,
  4: Rating.Good,
};

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const db = useDrizzle();

  const card = await db.query.srsCards.findFirst({
    where: (c, { eq }) => eq(c.id, body.cardId),
  });
  if (!card) {
    throw createError({ statusCode: 404, message: 'Card not found' });
  }

  // Verify ownership
  await requireChildOwner(event, card.childId);

  // Build FSRS card from DB fields
  const fsrsCard: Card = {
    due: card.due,
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: 0,
    scheduled_days: 0,
    learning_steps: 0,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as Card['state'],
    last_review: card.lastReview ?? undefined,
  };

  const grade = RATING_MAP[body.rating];
  const result = fsrs.next(fsrsCard, new Date(), grade);
  const next = result.card;

  const [updated] = await db
    .update(tables.srsCards)
    .set({
      state: next.state,
      difficulty: next.difficulty,
      stability: next.stability,
      due: next.due,
      lastReview: next.last_review ?? new Date(),
      reps: next.reps,
      lapses: next.lapses,
    })
    .where(eq(tables.srsCards.id, body.cardId))
    .returning();

  return updated;
});
