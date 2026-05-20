/**
 * Mini-ACE 7-element address-recall scorer (Claude Haiku). The user
 * heard a 7-field fictional address earlier; here we grade their
 * delayed recall field-by-field with lenient phonetic/spelling matching.
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';
import { MODEL_HAIKU } from '../../../../../blog/shared/models';
import type {
  AddressRecallScore,
  MiniAceAddress,
} from '../../../../../blog/shared/cog-playground/mini-ace-types';
import { type AnthropicLike, callModelForJson, type ParseResult } from '../shared/anthropic-call';
import { extractJson } from '../shared/extract-json';
import { MINI_ACE_ADDRESS_SYSTEM_PROMPT } from './prompts';

type AddressArgs = {
  model: string;
  max_tokens: number;
  temperature?: number;
  system?: string;
  messages: Array<{ role: 'user'; content: string }>;
};
export type MiniAceAddressAnthropicLike = AnthropicLike<AddressArgs>;

const FIELD_NAMES = [
  'name',
  'houseNumber',
  'street',
  'area',
  'city',
  'state',
  'country',
] as const satisfies ReadonlyArray<keyof MiniAceAddress>;

const fieldEnum = z.enum(FIELD_NAMES);

// Schema allows duplicates (model occasionally emits the same field twice)
// — dedupe happens in code, then exactly-seven is enforced.
const addressSchema = z.object({
  scores: z
    .array(
      z.object({
        field: fieldEnum,
        recalled: z.boolean(),
        evidence: z.string(),
      }),
    )
    .min(1)
    .max(14),
  totalRecalled: z.number().int().min(0).max(7),
});

export type MiniAceAddressResult = ParseResult<AddressRecallScore>;

export function parseMiniAceAddress(raw: string): MiniAceAddressResult {
  const json = extractJson(raw);
  if (!json) return { ok: false, reason: 'no JSON object in response' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, reason: 'invalid JSON' };
  }
  const result = addressSchema.safeParse(parsed);
  if (!result.success) {
    return { ok: false, reason: `schema: ${result.error.issues[0]?.message ?? 'invalid'}` };
  }
  // De-dup by field name (model may emit duplicate entries) and require
  // all seven. Re-derive the total so the model can't disagree with
  // its own booleans.
  const seen = new Set<keyof MiniAceAddress>();
  const scores = result.data.scores.filter((s) => {
    if (seen.has(s.field)) return false;
    seen.add(s.field);
    return true;
  });
  if (scores.length !== FIELD_NAMES.length) {
    return { ok: false, reason: 'response did not score every field exactly once' };
  }
  return {
    ok: true,
    data: { scores, totalRecalled: scores.filter((s) => s.recalled).length },
  };
}

export async function scoreMiniAceAddress(
  input: { target: MiniAceAddress; spokenText: string },
  client?: MiniAceAddressAnthropicLike,
): Promise<MiniAceAddressResult> {
  if (!client && !process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }
  const ai = client ?? (getAnthropicClient() as unknown as MiniAceAddressAnthropicLike);
  const userPrompt = [
    `TARGET address: ${JSON.stringify(input.target)}`,
    `Transcription: ${JSON.stringify(input.spokenText)}`,
    'Score each field and reply with ONLY the JSON object.',
  ].join('\n');

  return callModelForJson<AddressArgs, AddressRecallScore>(
    ai,
    {
      model: MODEL_HAIKU,
      max_tokens: 800,
      temperature: 0,
      system: MINI_ACE_ADDRESS_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    },
    parseMiniAceAddress,
  );
}
