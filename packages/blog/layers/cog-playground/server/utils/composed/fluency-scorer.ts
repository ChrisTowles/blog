/**
 * Animal-fluency scorer (Claude Haiku). The user names animals for 60s;
 * the model dedupes, normalizes, flags non-animals and repeats. We then
 * derive a 0–3 banded score from `validAnimals.length` so the model
 * can't disagree with its own list.
 *
 * Norms (informal, community/clinical): adults reach 15–20+ animals/min;
 * ≤10/min is a soft prompt to talk to a clinician. Bands chosen for
 * meaningful spread without overstating accuracy.
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../server/utils/ai/anthropic';
import { MODEL_HAIKU } from '../../../../../shared/models';
import type { FluencyScore } from '../../../../../shared/cog-playground/composed-types';
import { type AnthropicLike, callModelForJson, type ParseResult } from '../shared/anthropic-call';
import { extractJson } from '../shared/extract-json';
import { COMPOSED_FLUENCY_SYSTEM_PROMPT } from './prompts';

type FluencyArgs = {
  model: string;
  max_tokens: number;
  temperature?: number;
  system?: string;
  messages: Array<{ role: 'user'; content: string }>;
};
export type FluencyAnthropicLike = AnthropicLike<FluencyArgs>;

const fluencySchema = z.object({
  validAnimals: z.array(z.string()).max(200),
  rejected: z
    .array(
      z.object({
        word: z.string(),
        reason: z.string(),
      }),
    )
    .max(200),
  duplicates: z.array(z.string()).max(200),
});

export type FluencyResult = ParseResult<FluencyScore>;

function bandScore(uniqueCount: number): 0 | 1 | 2 | 3 {
  if (uniqueCount >= 15) return 3;
  if (uniqueCount >= 10) return 2;
  if (uniqueCount >= 5) return 1;
  return 0;
}

export function parseFluency(raw: string): FluencyResult {
  const json = extractJson(raw);
  if (!json) return { ok: false, reason: 'no JSON object in response' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, reason: 'invalid JSON' };
  }
  const result = fluencySchema.safeParse(parsed);
  if (!result.success) {
    return { ok: false, reason: `schema: ${result.error.issues[0]?.message ?? 'invalid'}` };
  }
  // Defensive dedupe at our boundary too — model is supposed to dedupe,
  // but if it slips a repeat through `validAnimals` we drop it.
  const seen = new Set<string>();
  const validAnimals: string[] = [];
  for (const w of result.data.validAnimals) {
    const key = w.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    validAnimals.push(key);
  }
  const uniqueCount = validAnimals.length;
  return {
    ok: true,
    data: {
      validAnimals,
      rejected: result.data.rejected,
      duplicates: result.data.duplicates,
      uniqueCount,
      bandedScore: bandScore(uniqueCount),
    },
  };
}

export async function scoreFluency(
  spokenText: string,
  client?: FluencyAnthropicLike,
): Promise<FluencyResult> {
  if (!client && !process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }
  const ai = client ?? (getAnthropicClient() as unknown as FluencyAnthropicLike);

  return callModelForJson<FluencyArgs, FluencyScore>(
    ai,
    {
      model: MODEL_HAIKU,
      max_tokens: 1000,
      temperature: 0,
      system: COMPOSED_FLUENCY_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Transcription: ${JSON.stringify(spokenText)}\nReply with ONLY the JSON object.`,
        },
      ],
    },
    parseFluency,
  );
}
