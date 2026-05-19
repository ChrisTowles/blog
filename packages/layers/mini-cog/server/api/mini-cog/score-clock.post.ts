/**
 * POST /api/mini-cog/score-clock
 *
 * Scores the clock drawing via Claude vision.
 *
 * Privacy: the drawing is sent to Claude for scoring and is NOT
 * persisted — no DB write, no file storage, no logging of image bytes.
 */
import { z } from 'zod';
import { scoreClock } from '../../utils/mini-cog/clock-scorer';

// ~12 MB of base64 ceiling — a 600x600 PNG is well under this.
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
