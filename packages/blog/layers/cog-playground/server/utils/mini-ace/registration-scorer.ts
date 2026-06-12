/**
 * Mini-ACE 3-word immediate-registration scorer (Claude Haiku). Mirrors
 * the Mini-Cog 3-word scorer but is graded at the registration step
 * (not after a delay).
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../server/utils/ai/anthropic';
import { MODEL_HAIKU } from '../../../../../shared/models';
import type { MiniAceRegistrationScore } from '../../../../../shared/cog-playground/mini-ace-types';
import { type AnthropicLike, callModelForJson, type ParseResult } from '../shared/anthropic-call';
import { extractJson } from '../shared/extract-json';
import { MINI_ACE_REGISTRATION_SYSTEM_PROMPT } from './prompts';

type RegistrationArgs = {
  model: string;
  max_tokens: number;
  temperature?: number;
  system?: string;
  messages: Array<{ role: 'user'; content: string }>;
};
export type MiniAceRegistrationAnthropicLike = AnthropicLike<RegistrationArgs>;

const registrationSchema = z.object({
  scores: z
    .array(
      z.object({
        word: z.string(),
        recalled: z.boolean(),
        evidence: z.string(),
      }),
    )
    .min(1)
    .max(3),
  totalRecalled: z.number().int().min(0).max(3),
});

export type MiniAceRegistrationResult = ParseResult<MiniAceRegistrationScore>;

export function parseMiniAceRegistration(
  raw: string,
  targetWords: string[],
): MiniAceRegistrationResult {
  const json = extractJson(raw);
  if (!json) return { ok: false, reason: 'no JSON object in response' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, reason: 'invalid JSON' };
  }
  const result = registrationSchema.safeParse(parsed);
  if (!result.success) {
    return { ok: false, reason: `schema: ${result.error.issues[0]?.message ?? 'invalid'}` };
  }
  const targetSet = new Set(targetWords.map((w) => w.toLowerCase()));
  const scores = result.data.scores.filter((s) => targetSet.has(s.word.toLowerCase()));
  if (scores.length !== targetWords.length) {
    return { ok: false, reason: 'response did not score every target word exactly once' };
  }
  return {
    ok: true,
    data: { scores, totalRecalled: scores.filter((s) => s.recalled).length },
  };
}

export async function scoreMiniAceRegistration(
  input: { targetWords: string[]; spokenText: string },
  client?: MiniAceRegistrationAnthropicLike,
): Promise<MiniAceRegistrationResult> {
  if (!client && !process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }
  const ai = client ?? (getAnthropicClient() as unknown as MiniAceRegistrationAnthropicLike);
  const userPrompt = [
    `TARGET words: ${JSON.stringify(input.targetWords)}`,
    `Transcription: ${JSON.stringify(input.spokenText)}`,
    'Score each target word and reply with ONLY the JSON object.',
  ].join('\n');

  return callModelForJson<RegistrationArgs, MiniAceRegistrationScore>(
    ai,
    {
      model: MODEL_HAIKU,
      max_tokens: 500,
      temperature: 0,
      system: MINI_ACE_REGISTRATION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    },
    (text) => parseMiniAceRegistration(text, input.targetWords),
  );
}
