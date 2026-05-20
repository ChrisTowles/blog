/**
 * POST /api/cog-playground/mini-ace/score-address
 *
 * Scores the delayed recall of the 7-element address.
 *
 * Privacy: the transcription is sent to Claude for scoring and is NOT
 * persisted — no DB write, no logging of the response text.
 */
import { z } from 'zod';
import { scoreMiniAceAddress } from '../../../utils/mini-ace/address-scorer';

const addressSchema = z.object({
  name: z.string().min(1).max(80),
  houseNumber: z.string().min(1).max(20),
  street: z.string().min(1).max(80),
  area: z.string().min(1).max(80),
  city: z.string().min(1).max(80),
  state: z.string().min(1).max(80),
  country: z.string().min(1).max(80),
});

const bodySchema = z.object({
  target: addressSchema,
  spokenText: z.string().max(4000),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreMiniAceAddress(body);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  return { addressRecall: result.data };
});
