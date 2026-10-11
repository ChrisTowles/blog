/**
 * Spelling-worksheet image extraction (typing-ai).
 *
 * Sends the worksheet image to Claude Sonnet 4 with a strict-JSON
 * prompt and validates the result before returning it.
 *
 * Output: { ok: true, words } | { ok: false, reason, raw? }
 */
import { z } from 'zod';
import { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';
import type { AnthropicLike } from './anthropic-like';

export const imageMediaTypeSchema = z.enum(['image/png', 'image/jpeg', 'image/webp']);

const extractionSchema = z.object({ words: z.array(z.string()) });

const VISION_MODEL = 'claude-sonnet-4-5-20251022';

const PROMPT = `You are reading a child's spelling worksheet. Extract every spelling word printed on the worksheet, in the order they appear. Output strict JSON: { "words": ["word1", "word2"] }. Lowercase. No proper nouns unless clearly intended as spelling words. No example sentences, no instructions, no headers. Reply with the JSON only — no prose, no markdown, no code fences.`;

export type ExtractResult =
  | { ok: true; words: string[] }
  | { ok: false; reason: string; raw?: string };

export function validateExtractedWords(words: string[]): ExtractResult {
  if (words.length === 0) {
    return { ok: false, reason: 'no words extracted' };
  }

  if (words.length > 30) {
    return { ok: false, reason: `too many words: ${words.length}` };
  }

  const out: string[] = [];

  for (const w of words) {
    const trimmed = w.trim();

    if (trimmed.length < 2 || trimmed.length > 15) {
      return { ok: false, reason: `bad length: ${JSON.stringify(trimmed)}` };
    }

    if (!/^[a-z']+$/.test(trimmed)) {
      return { ok: false, reason: `bad chars: ${JSON.stringify(trimmed)}` };
    }

    out.push(trimmed);
  }

  return { ok: true, words: out };
}

export async function extractSpellingWords(
  imageBase64: string,
  imageMediaType: z.infer<typeof imageMediaTypeSchema>,
  client?: AnthropicLike,
): Promise<ExtractResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }

  const ai = client ?? getAnthropicClient();

  const response = await ai.messages.create({
    model: VISION_MODEL,
    max_tokens: 600,
    temperature: 0,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: imageMediaType, data: imageBase64 },
          },
          { type: 'text', text: PROMPT },
        ],
      },
    ],
  });

  const block = response.content[0];

  if (!block || block.type !== 'text') {
    return { ok: false, reason: 'no text response' };
  }

  const raw = block.text.trim();
  let json;

  try {
    json = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'unparseable JSON', raw };
  }

  const parsed = extractionSchema.safeParse(json);

  if (!parsed.success) {
    return { ok: false, reason: 'words is not an array of strings', raw };
  }

  const validation = validateExtractedWords(parsed.data.words);

  if (!validation.ok) return { ...validation, raw };

  return validation;
}
