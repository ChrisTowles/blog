/**
 * POST /api/cog-playground/mini-ace/score-registration
 *
 * Scores the immediate 3-word registration repeat.
 *
 * Privacy: the transcription is sent to Claude for scoring and is NOT
 * persisted — no DB write, no logging of the response text.
 */
import { z } from 'zod';
import { scoreMiniAceRegistration } from '../../../utils/mini-ace/registration-scorer';

const bodySchema = z.object({
  targetWords: z.array(z.string().min(1).max(40)).length(3),
  spokenText: z.string().max(2000),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreMiniAceRegistration(body);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { registration: result.data };
});
