/**
 * Composed-screen 5-word recall scorer (Claude Haiku). Parallels the
 * Mini-Cog 3-word scorer — same fuzzy-match rules, same defenses, just
 * five targets and a 0–5 total.
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';
import { MODEL_HAIKU } from '../../../../../blog/shared/models';
import type { ComposedRecallScore } from '../../../../../blog/shared/cog-playground/composed-types';
import { type AnthropicLike, callModelForJson, type ParseResult } from '../shared/anthropic-call';
import { extractJson } from '../shared/extract-json';
import { COMPOSED_RECALL_SYSTEM_PROMPT } from './prompts';

type RecallArgs = {
  model: string;
  max_tokens: number;
  temperature?: number;
  system?: string;
  messages: Array<{ role: 'user'; content: string }>;
};
export type ComposedRecallAnthropicLike = AnthropicLike<RecallArgs>;

const recallSchema = z.object({
  scores: z
    .array(
      z.object({
        word: z.string(),
        recalled: z.boolean(),
        evidence: z.string(),
      }),
    )
    .min(1)
    .max(5),
  totalRecalled: z.number().int().min(0).max(5),
});

export type ComposedRecallResult = ParseResult<ComposedRecallScore>;

export function parseComposedRecall(raw: string, targetWords: string[]): ComposedRecallResult {
  const json = extractJson(raw);
  if (!json) return { ok: false, reason: 'no JSON object in response' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, reason: 'invalid JSON' };
  }
  const result = recallSchema.safeParse(parsed);
  if (!result.success) {
    return { ok: false, reason: `schema: ${result.error.issues[0]?.message ?? 'invalid'}` };
  }
  const data = result.data;
  // Re-derive the count from booleans + drop invented words, identical
  // defensive pattern to the Mini-Cog 3-word scorer.
  const targetSet = new Set(targetWords.map((w) => w.toLowerCase()));
  const scores = data.scores.filter((s) => targetSet.has(s.word.toLowerCase()));
  if (scores.length !== targetWords.length) {
    return { ok: false, reason: 'response did not score every target word exactly once' };
  }
  const totalRecalled = scores.filter((s) => s.recalled).length;
  return { ok: true, data: { scores, totalRecalled } };
}

export async function scoreComposedRecall(
  input: { targetWords: string[]; spokenText: string },
  client?: ComposedRecallAnthropicLike,
): Promise<ComposedRecallResult> {
  if (!client && !process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }
  const ai = client ?? (getAnthropicClient() as unknown as ComposedRecallAnthropicLike);
  const userPrompt = [
    `TARGET words: ${JSON.stringify(input.targetWords)}`,
    `Transcription: ${JSON.stringify(input.spokenText)}`,
    'Score each target word and reply with ONLY the JSON object.',
  ].join('\n');

  return callModelForJson<RecallArgs, ComposedRecallScore>(
    ai,
    {
      model: MODEL_HAIKU,
      max_tokens: 700,
      temperature: 0,
      system: COMPOSED_RECALL_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    },
    (text) => parseComposedRecall(text, input.targetWords),
  );
}
