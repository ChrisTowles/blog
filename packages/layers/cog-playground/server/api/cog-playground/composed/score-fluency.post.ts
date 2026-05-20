/**
 * POST /api/cog-playground/composed/score-fluency
 *
 * Scores the 60-second animal-fluency task.
 *
 * Privacy: the transcription is sent to Claude for scoring and is NOT
 * persisted — no DB write, no logging of the response text.
 */
import { z } from 'zod';
import { scoreFluency } from '../../../utils/composed/fluency-scorer';

const bodySchema = z.object({
  spokenText: z.string().max(8000),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreFluency(body.spokenText);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { fluency: result.data };
});
