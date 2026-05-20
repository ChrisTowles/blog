/**
 * POST /api/cog-playground/mini-ace/score-clock
 *
 * Reuses the Mini-Cog clock scorer (Shulman binary 0/2). The Mini-ACE
 * canonical instrument uses a 5-point clock — for this educational
 * demo the binary scorer keeps the result honest and reuses proven code.
 *
 * Privacy: the drawing is sent to Claude for scoring and is NOT
 * persisted — no DB write, no file storage, no logging of image bytes.
 */
import { z } from 'zod';
import { scoreClock } from '../../../utils/mini-cog/clock-scorer';

const bodySchema = z.object({
  imageBase64: z.string().min(100).max(12_000_000),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreClock(body.imageBase64);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { clock: result.data };
});
