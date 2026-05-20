/**
 * Clock Drawing Test scorer (Claude Sonnet, vision). Evaluates a PNG of
 * the user's clock drawing against the six binary Shulman/Mini-Cog
 * criteria and returns a structured, zod-validated result.
 *
 * Sonnet is plenty for this task — six booleans about a freehand clock
 * sketch, not frontier reasoning. Opus was the original default and was
 * dropped to halve cost and latency on a user-blocking call.
 *
 * Thin caller of the shared `callModelForJson` helper — observability,
 * retry, and graceful error handling all live there.
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';
import { MODEL_SONNET } from '../../../../../blog/shared/models';
import type { ClockScore } from '../../../../../blog/shared/cog-playground/mini-cog-types';
import { type AnthropicLike, callModelForJson, type ParseResult } from '../shared/anthropic-call';
import { extractJson } from '../shared/extract-json';
import { CLOCK_SYSTEM_PROMPT } from './prompts';

type ImageBlock = {
  type: 'image';
  source: { type: 'base64'; media_type: 'image/png'; data: string };
};
type TextBlock = { type: 'text'; text: string };

type VisionArgs = {
  model: string;
  max_tokens: number;
  temperature?: number;
  system?: string;
  messages: Array<{ role: 'user'; content: Array<ImageBlock | TextBlock> }>;
};
export type VisionAnthropicLike = AnthropicLike<VisionArgs>;

const clockSchema = z.object({
  criteria: z.object({
    closedCircle: z.boolean(),
    allNumbersPresent: z.boolean(),
    numbersCorrectlyPositioned: z.boolean(),
    twoHands: z.boolean(),
    hourHandAt11: z.boolean(),
    minuteHandAt2: z.boolean(),
  }),
  normal: z.boolean(),
  score: z.union([z.literal(0), z.literal(2)]),
  explanation: z.string(),
});

export type ClockResult = ParseResult<ClockScore>;

/** Strip an optional `data:image/png;base64,` prefix. */
export function stripDataUrl(input: string): string {
  const comma = input.indexOf(',');
  return input.startsWith('data:') && comma !== -1 ? input.slice(comma + 1) : input;
}

export function parseClock(raw: string): ClockResult {
  const json = extractJson(raw);
  if (!json) return { ok: false, reason: 'no JSON object in response' };
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, reason: 'invalid JSON' };
  }
  const result = clockSchema.safeParse(parsed);
  if (!result.success) {
    return { ok: false, reason: `schema: ${result.error.issues[0]?.message ?? 'invalid'}` };
  }
  const c = result.data.criteria;
  // Derive normal/score from the criteria so the model can't disagree
  // with its own breakdown.
  const normal =
    c.closedCircle &&
    c.allNumbersPresent &&
    c.numbersCorrectlyPositioned &&
    c.twoHands &&
    c.hourHandAt11 &&
    c.minuteHandAt2;
  return {
    ok: true,
    data: { ...result.data, normal, score: normal ? 2 : 0 },
  };
}

export async function scoreClock(
  imageBase64: string,
  client?: VisionAnthropicLike,
): Promise<ClockResult> {
  if (!client && !process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }
  const data = stripDataUrl(imageBase64);
  if (data.length < 100) {
    return { ok: false, reason: 'image data too small / empty canvas' };
  }
  const ai = client ?? (getAnthropicClient() as unknown as VisionAnthropicLike);

  return callModelForJson<VisionArgs, ClockScore>(
    ai,
    {
      model: MODEL_SONNET,
      max_tokens: 700,
      temperature: 0,
      system: CLOCK_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: 'image/png', data } },
            { type: 'text', text: 'Score this clock drawing. Reply with ONLY the JSON object.' },
          ],
        },
      ],
    },
    parseClock,
  );
}
