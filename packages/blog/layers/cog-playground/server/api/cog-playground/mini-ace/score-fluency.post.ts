/**
 * POST /api/cog-playground/mini-ace/score-fluency
 *
 * Reuses the composed-screen fluency scorer (animal-naming, Haiku),
 * then re-bands the unique count on the Mini-ACE 0–7 scale per the
 * instrument's wider subscore weight.
 *
 * Privacy: the transcription is sent to Claude for scoring and is NOT
 * persisted — no DB write, no logging of the response text.
 */
import { z } from 'zod';
import type { MiniAceFluencyScore } from '../../../../../../shared/cog-playground/mini-ace-types';
import { scoreFluency } from '../../../utils/composed/fluency-scorer';

const bodySchema = z.object({
  spokenText: z.string().max(8000),
});

function bandMiniAce(uniqueCount: number): MiniAceFluencyScore['bandedScore'] {
  // Mini-ACE-inspired wider spread for the fluency subscore.
  // Tuned for adult community norms: ~18+ animals/min is typical;
  // dropping off significantly is a soft signal.
  if (uniqueCount >= 21) return 7;
  if (uniqueCount >= 18) return 6;
  if (uniqueCount >= 15) return 5;
  if (uniqueCount >= 12) return 4;
  if (uniqueCount >= 9) return 3;
  if (uniqueCount >= 6) return 2;
  if (uniqueCount >= 3) return 1;
  return 0;
}

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const result = await scoreFluency(body.spokenText);
  if (!result.ok) {
    throw createError({ statusCode: 422, statusMessage: result.reason });
  }
  const { validAnimals, rejected, duplicates, uniqueCount } = result.data;
  const fluency: MiniAceFluencyScore = {
    validAnimals,
    rejected,
    duplicates,
    uniqueCount,
    bandedScore: bandMiniAce(uniqueCount),
  };
  return { fluency };
});
