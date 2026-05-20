/**
 * POST /api/cog-playground/composed/score-recall
 *
 * Scores the five-word delayed recall.
 *
 * Privacy: the transcription is sent to Claude for scoring and is NOT
 * persisted — no DB write, no logging of the response text.
 */
import { z } from 'zod';
import { scoreComposedRecall } from '../../../utils/composed/recall-scorer';

const bodySchema = z.object({
  targetWords: z.array(z.string().min(1).max(40)).length(5),
  spokenText: z.string().max(4000),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreComposedRecall(body);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { recall: result.data };
});
