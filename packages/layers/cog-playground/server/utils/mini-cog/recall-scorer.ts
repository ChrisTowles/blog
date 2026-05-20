/**
 * Recall scorer (Claude Haiku). Fuzzy-matches the spoken/typed recall
 * transcription against the three target words and returns a structured,
 * zod-validated breakdown.
 *
 * The Anthropic client is injectable (default: the Braintrust-wrapped
 * singleton) so unit tests can pass a stub — the same seam the typing
 * layer's lesson-generator uses.
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';
import { MODEL_HAIKU } from '../../../../../blog/shared/models';
import type { RecallScore } from '../../../../../blog/shared/cog-playground/mini-cog-types';
import { RECALL_SYSTEM_PROMPT } from './prompts';

export type RecallAnthropicLike = {
  messages: {
    create: (args: {
      model: string;
      max_tokens: number;
      temperature?: number;
      system?: string;
      messages: Array<{ role: 'user'; content: string }>;
    }) => Promise<{ content: Array<{ type: string; text?: string }> }>;
  };
};

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
    .max(3),
  totalRecalled: z.number().int().min(0).max(3),
});

export type RecallResult = { ok: true; data: RecallScore } | { ok: false; reason: string };

/** Pull the first balanced JSON object out of a model reply. */
export function extractJson(text: string): string | null {
  const start = text.indexOf('{');
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

export function parseRecall(raw: string, targetWords: string[]): RecallResult {
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
  // Re-derive the count from the booleans so a model arithmetic slip
  // can't inflate the score, and ignore any words it invented.
  const targetSet = new Set(targetWords.map((w) => w.toLowerCase()));
  const scores = data.scores.filter((s) => targetSet.has(s.word.toLowerCase()));
  if (scores.length !== targetWords.length) {
    return { ok: false, reason: 'response did not score every target word exactly once' };
  }
  const totalRecalled = scores.filter((s) => s.recalled).length;
  return { ok: true, data: { scores, totalRecalled } };
}

export async function scoreRecall(
  input: { targetWords: string[]; spokenText: string },
  client?: RecallAnthropicLike,
): Promise<RecallResult> {
  if (!client && !process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }
  const ai = client ?? (getAnthropicClient() as unknown as RecallAnthropicLike);
  const userPrompt = [
    `TARGET words: ${JSON.stringify(input.targetWords)}`,
    `Transcription: ${JSON.stringify(input.spokenText)}`,
    'Score each target word and reply with ONLY the JSON object.',
  ].join('\n');

  let lastReason = 'no attempts';
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await ai.messages.create({
        model: MODEL_HAIKU,
        max_tokens: 500,
        temperature: 0,
        system: RECALL_SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      });
      const block = response.content[0];
      if (!block || block.type !== 'text' || !block.text) {
        lastReason = 'no text response';
        continue;
      }
      const parsed = parseRecall(block.text, input.targetWords);
      if (parsed.ok) return parsed;
      lastReason = parsed.reason;
    } catch (err) {
      lastReason = `model request failed: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
  return { ok: false, reason: `failed after retries — last reason: ${lastReason}` };
}
