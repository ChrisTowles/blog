/**
 * Lesson safety review for AI-generated typing exercises.
 *
 * Two-stage check:
 *   1. Block list — fast lowercase substring scan rejects obvious matches.
 *   2. Claude Haiku safety review (temp 0) — answers "is this kid-safe?".
 *
 * The route caller decides what to do on failure; this module only
 * inspects.
 */
import { getAnthropicClient } from '../../../../../blog/server/utils/ai/anthropic';

type AnthropicLike = {
  messages: {
    create: (args: {
      model: string;
      max_tokens: number;
      temperature?: number;
      messages: Array<{ role: 'user'; content: string }>;
    }) => Promise<{ content: Array<{ type: string; text: string }> }>;
  };
};

const BLOCK_LIST = [
  // Profanity / slurs (deliberately short — vision is for typos in topic
  // names like "f**k", not a comprehensive dictionary).
  'fuck',
  'shit',
  'bitch',
  'asshole',
  'dick',
  'pussy',
  'cunt',
  'whore',
  // Adult themes that have no place in a kid app.
  'porn',
  'sex',
  'rape',
  'incest',
  // Self-harm / violence.
  'suicide',
  'kill yourself',
  'hang yourself',
  'cut yourself',
  // Drugs.
  'cocaine',
  'heroin',
  'meth',
  'crack pipe',
];

export type SafetyCheckResult =
  | { safe: true }
  | { safe: false; reason: string; source: 'block-list' | 'ai-review' };

export function blockListCheck(text: string): SafetyCheckResult {
  const lower = text.toLowerCase();
  for (const term of BLOCK_LIST) {
    if (lower.includes(term)) {
      return { safe: false, reason: `blocked term: ${term}`, source: 'block-list' };
    }
  }
  return { safe: true };
}

const SAFETY_MODEL = 'claude-haiku-4-5-20251001';

export async function aiSafetyReview(
  text: string,
  topic: string,
  client?: AnthropicLike,
): Promise<SafetyCheckResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    // No API key — best we can do is the block list, which already passed.
    return { safe: true };
  }
  const ai = client ?? (getAnthropicClient() as unknown as AnthropicLike);
  const prompt = `You are a content safety reviewer for a children's typing app for kids aged 6-10.

Topic: "${topic}"
Text to review:
"""
${text}
"""

Is this text appropriate for a 7-year-old to read while learning to type? Reply with strict JSON: {"safe": true} or {"safe": false, "reason": "..."}. Reject anything with violence, sexual content, scary horror, drug references, profanity, slurs, or self-harm. Pop culture (Pokemon, Minecraft, Mario, etc.) is fine. Mild silliness is fine. Reply with the JSON only — no prose, no markdown.`;

  const response = await ai.messages.create({
    model: SAFETY_MODEL,
    max_tokens: 100,
    temperature: 0,
    messages: [{ role: 'user', content: prompt }],
  });

  const block = response.content[0];
  if (!block || block.type !== 'text') {
    return { safe: false, reason: 'no response from safety model', source: 'ai-review' };
  }
  const raw = block.text.trim();
  try {
    const parsed = JSON.parse(raw) as { safe?: boolean; reason?: string };
    if (parsed.safe === true) return { safe: true };
    return {
      safe: false,
      reason: parsed.reason ?? 'AI marked unsafe',
      source: 'ai-review',
    };
  } catch {
    return { safe: false, reason: `unparseable safety response: ${raw}`, source: 'ai-review' };
  }
}

export async function reviewLesson(
  text: string,
  topic: string,
  client?: AnthropicLike,
): Promise<SafetyCheckResult> {
  const block = blockListCheck(text);
  if (!block.safe) return block;
  return aiSafetyReview(text, topic, client);
}
