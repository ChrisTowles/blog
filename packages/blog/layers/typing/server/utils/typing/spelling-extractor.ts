/**
 * Spelling-worksheet image extraction (typing-ai).
 *
 * Sends the worksheet image to Claude Sonnet 4 with a strict-JSON
 * prompt and validates the result before returning it.
 *
 * Output: { ok: true, words } | { ok: false, reason, raw? }
 */
import { getAnthropicClient } from '../../../../../server/utils/ai/anthropic';

export type AnthropicVisionLike = {
  messages: {
    create: (args: {
      model: string;
      max_tokens: number;
      temperature?: number;
      messages: Array<{
        role: 'user';
        content: Array<
          | { type: 'text'; text: string }
          | { type: 'image'; source: { type: 'base64'; media_type: string; data: string } }
        >;
      }>;
    }) => Promise<{ content: Array<{ type: string; text: string }> }>;
  };
};

const VISION_MODEL = 'claude-sonnet-4-5-20251022';

const PROMPT = `You are reading a child's spelling worksheet. Extract every spelling word printed on the worksheet, in the order they appear. Output strict JSON: { "words": ["word1", "word2"] }. Lowercase. No proper nouns unless clearly intended as spelling words. No example sentences, no instructions, no headers. Reply with the JSON only — no prose, no markdown, no code fences.`;

export type ExtractResult =
  | { ok: true; words: string[] }
  | { ok: false; reason: string; raw?: string };

export function validateExtractedWords(words: unknown): ExtractResult {
  if (!Array.isArray(words)) {
    return { ok: false, reason: 'words is not an array' };
  }
  if (words.length === 0) {
    return { ok: false, reason: 'no words extracted' };
  }
  if (words.length > 30) {
    return { ok: false, reason: `too many words: ${words.length}` };
  }
  const out: string[] = [];
  for (const w of words) {
    if (typeof w !== 'string') {
      return { ok: false, reason: 'non-string in words array' };
    }
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
  imageMediaType: string,
  client?: AnthropicVisionLike,
): Promise<ExtractResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }
  const ai = client ?? (getAnthropicClient() as unknown as AnthropicVisionLike);
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
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'unparseable JSON', raw };
  }
  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, reason: 'parsed is not an object', raw };
  }
  const validation = validateExtractedWords((parsed as { words?: unknown }).words);
  if (!validation.ok) return { ...validation, raw };
  return validation;
}
