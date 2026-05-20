/**
 * Clock Drawing Test scorer (Claude Opus, vision). Evaluates a PNG of
 * the user's clock drawing against the six binary Shulman/Mini-Cog
 * criteria and returns a structured, zod-validated result.
 *
 * Client is injectable for unit tests, same seam as the recall scorer.
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';
import { MODEL_OPUS } from '../../../../../blog/shared/models';
import type { ClockScore } from '../../../../../blog/shared/cog-playground/mini-cog-types';
import { CLOCK_SYSTEM_PROMPT } from './prompts';
import { extractJson } from './recall-scorer';

type ImageBlock = {
  type: 'image';
  source: { type: 'base64'; media_type: 'image/png'; data: string };
};
type TextBlock = { type: 'text'; text: string };

export type VisionAnthropicLike = {
  messages: {
    create: (args: {
      model: string;
      max_tokens: number;
      temperature?: number;
      system?: string;
      messages: Array<{ role: 'user'; content: Array<ImageBlock | TextBlock> }>;
    }) => Promise<{ content: Array<{ type: string; text?: string }> }>;
  };
};

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

export type ClockResult = { ok: true; data: ClockScore } | { ok: false; reason: string };

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

  let lastReason = 'no attempts';
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await ai.messages.create({
        model: MODEL_OPUS,
        max_tokens: 700,
        temperature: 0,
        system: CLOCK_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: { type: 'base64', media_type: 'image/png', data },
              },
              {
                type: 'text',
                text: 'Score this clock drawing. Reply with ONLY the JSON object.',
              },
            ],
          },
        ],
      });
      const block = response.content[0];
      if (!block || block.type !== 'text' || !block.text) {
        lastReason = 'no text response';
        continue;
      }
      const parsed = parseClock(block.text);
      if (parsed.ok) return parsed;
      lastReason = parsed.reason;
    } catch (err) {
      lastReason = `model request failed: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
  return { ok: false, reason: `failed after retries — last reason: ${lastReason}` };
}
