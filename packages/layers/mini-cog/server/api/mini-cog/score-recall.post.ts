/**
 * POST /api/mini-cog/score-recall
 *
 * Scores the three-word recall.
 *
 * Privacy: the transcription is sent to Claude for scoring and is NOT
 * persisted anywhere — no DB write, no logging of the response text.
 */
import { z } from 'zod';
import { scoreRecall } from '../../utils/mini-cog/recall-scorer';

const bodySchema = z.object({
  targetWords: z.array(z.string().min(1).max(40)).length(3),
  spokenText: z.string().max(2000),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreRecall(body);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { recall: result.data };
});
