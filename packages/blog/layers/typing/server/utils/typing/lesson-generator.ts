/**
 * AI lesson generator (typing-ai).
 *
 * Calls Claude Haiku at temp 0.3 to produce a kid-friendly typing lesson
 * about `topic`, constrained to the unlocked key set for the active
 * stage. Up to 2 retries on regex validation failure (the model
 * occasionally slips a comma or apostrophe through).
 */
import { getAnthropicClient } from '../../../../../server/utils/ai/anthropic';
import { getStage, unlockedKeysForStage } from './curriculum';
import { reviewLesson } from './lesson-safety';

// Test seam — callers (and tests) may pass a stub client.
export type AnthropicLike = {
  messages: {
    create: (args: {
      model: string;
      max_tokens: number;
      temperature?: number;
      messages: Array<{ role: 'user'; content: string }>;
    }) => Promise<{ content: Array<{ type: string; text: string }> }>;
  };
};

export type GeneratedLessonResult = { ok: true; text: string } | { ok: false; reason: string };

const GENERATOR_MODEL = 'claude-haiku-4-5-20251001';

const LENGTH_BOUNDS: Record<'short' | 'medium', { min: number; max: number }> = {
  short: { min: 60, max: 160 },
  medium: { min: 160, max: 320 },
};

const KIND_HINTS: Record<'sentence' | 'paragraph', string> = {
  sentence: 'one sentence',
  paragraph: 'a short paragraph (2-4 sentences)',
};

export type GenerateLessonInput = {
  stage: number;
  topic: string;
  kind: 'sentence' | 'paragraph';
  length: 'short' | 'medium';
  /**
   * The learner's weakest keys (from their error heatmap). Woven into the
   * prompt as a soft request — no occurrence count is enforced, unlike the
   * stage's newly introduced keys.
   */
  trickyKeys?: string[];
  /**
   * Set false to skip the new-key emphasis requirement — spelling-list
   * sentences target the list's words, not the stage's newest letters.
   * Defaults to true (topic lessons should practice the new keys).
   */
  emphasizeNewKeys?: boolean;
};

/**
 * Letters introduced AT this stage — the skill the lesson should target.
 * Only letter keys count; capitals/digit/symbol stages (16+) get softer
 * prompt guidance instead of an enforced occurrence count.
 */
export function emphasisKeysForStage(stage: number): string[] {
  if (stage >= 16) return [];
  return (getStage(stage)?.keys ?? []).filter((k) => /^[a-z]$/.test(k));
}

/** Minimum times each emphasized letter must appear in valid output. */
export function emphasisMinCount(kind: 'sentence' | 'paragraph'): number {
  return kind === 'paragraph' ? 3 : 2;
}

function buildPrompt(input: GenerateLessonInput, unlocked: string[]): string {
  const allowed = unlocked.join('');
  const bounds = LENGTH_BOUNDS[input.length];
  const kindHint = KIND_HINTS[input.kind];
  const target = Math.round((bounds.min + bounds.max) / 2);

  const emphasis = input.emphasizeNewKeys === false ? [] : emphasisKeysForStage(input.stage);
  const minCount = emphasisMinCount(input.kind);
  const emphasisLine =
    emphasis.length > 0
      ? `\nSkill focus: the student JUST learned the letter${emphasis.length > 1 ? 's' : ''} ${emphasis
          .map((k) => `"${k}"`)
          .join(
            ' and ',
          )}. Feature ${emphasis.length > 1 ? 'them' : 'it'} heavily — each must appear at least ${minCount} times across different words.`
      : '';

  const tricky = (input.trickyKeys ?? []).filter((k) => /^[a-z]$/.test(k)).slice(0, 3);
  const trickyLine =
    tricky.length > 0
      ? `\nThe student often mistypes ${tricky.map((k) => `"${k}"`).join(', ')} — work in a few extra words that use ${tricky.length > 1 ? 'these letters' : 'this letter'}.`
      : '';

  return `You are writing a typing exercise for a child age 7 who is learning to type.

Topic: ${input.topic}
Format: ${kindHint}.
Length: aim for ~${target} characters; HARD MAX ${bounds.max} characters total. Going over ${bounds.max} characters is a failure.
Allowed characters (CRITICAL — every character in your reply must be one of these): "${allowed}".${emphasisLine}${trickyLine}

Hard rules:
- ONLY use characters from the allowed set. Letters not in the set are FORBIDDEN.
- No proper nouns that introduce new letters. Pick simple words.
- No quotes, no emoji, no smart punctuation, no newlines, no markdown.
- DO NOT exceed ${bounds.max} characters. Count before you reply.
- One short kid-friendly text on the topic. Reply with ONLY the typing text — no preamble, no explanation, no quotation marks.`;
}

/**
 * Checks that each emphasized letter appears at least minCount times.
 * Exported for tests; returns ok when `keys` is empty.
 */
export function validateEmphasis(
  text: string,
  keys: string[],
  minCount: number,
): { ok: true } | { ok: false; reason: string } {
  for (const key of keys) {
    const count = [...text.toLowerCase()].filter((ch) => ch === key).length;
    if (count < minCount) {
      return {
        ok: false,
        reason: `emphasis: "${key}" appears ${count}x, need ${minCount}`,
      };
    }
  }
  return { ok: true };
}

/**
 * If the model overshoots the upper bound, try to recover deterministically
 * by cutting at the last sentence-ending punctuation (or last space) that
 * still falls within bounds. Returns null if no usable cut exists.
 */
export function truncateWithinBounds(
  text: string,
  bounds: { min: number; max: number },
): string | null {
  const trimmed = text.trim();
  if (trimmed.length <= bounds.max) return trimmed;
  const window = trimmed.slice(0, bounds.max);
  const punct = Math.max(window.lastIndexOf('.'), window.lastIndexOf('!'), window.lastIndexOf('?'));
  if (punct >= bounds.min - 1) {
    return window.slice(0, punct + 1).trim();
  }
  const space = window.lastIndexOf(' ');
  if (space >= bounds.min) {
    return window.slice(0, space).trim();
  }
  return null;
}

export function validateGeneratedText(
  text: string,
  unlocked: string[],
  bounds: { min: number; max: number },
): { ok: true } | { ok: false; reason: string } {
  const trimmed = text.trim();
  if (trimmed.length < bounds.min) {
    return { ok: false, reason: `too short (${trimmed.length} < ${bounds.min})` };
  }
  if (trimmed.length > bounds.max) {
    return { ok: false, reason: `too long (${trimmed.length} > ${bounds.max})` };
  }
  const allowedSet = new Set(unlocked);
  for (const ch of trimmed) {
    if (!allowedSet.has(ch)) {
      return { ok: false, reason: `disallowed character: ${JSON.stringify(ch)}` };
    }
  }
  return { ok: true };
}

export async function generateLesson(
  input: GenerateLessonInput,
  client?: AnthropicLike,
): Promise<GeneratedLessonResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: 'ANTHROPIC_API_KEY not configured' };
  }

  const unlocked = unlockedKeysForStage(input.stage);
  if (unlocked.length === 0) {
    return { ok: false, reason: `unknown stage: ${input.stage}` };
  }
  const bounds = LENGTH_BOUNDS[input.length];
  const prompt = buildPrompt(input, unlocked);
  const ai = client ?? (getAnthropicClient() as unknown as AnthropicLike);

  let lastReason = 'no attempts';
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await ai.messages.create({
      model: GENERATOR_MODEL,
      max_tokens: 600,
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
    });
    const block = response.content[0];
    if (!block || block.type !== 'text') {
      lastReason = 'no text response';
      continue;
    }
    let text = block.text.trim();
    let valid = validateGeneratedText(text, unlocked, bounds);
    if (!valid.ok && valid.reason.startsWith('too long')) {
      const truncated = truncateWithinBounds(text, bounds);
      if (truncated) {
        const reValid = validateGeneratedText(truncated, unlocked, bounds);
        if (reValid.ok) {
          text = truncated;
          valid = reValid;
        }
      }
    }
    if (!valid.ok) {
      lastReason = `validation: ${valid.reason}`;
      continue;
    }
    // The lesson must actually practice the stage's new letters, not just
    // avoid locked ones — otherwise topic lessons are generic prose.
    const emphasis = validateEmphasis(
      text,
      input.emphasizeNewKeys === false ? [] : emphasisKeysForStage(input.stage),
      emphasisMinCount(input.kind),
    );
    if (!emphasis.ok) {
      lastReason = `validation: ${emphasis.reason}`;
      continue;
    }
    const safety = await reviewLesson(text, input.topic, ai);
    if (!safety.safe) {
      lastReason = `safety: ${safety.reason}`;
      continue;
    }
    return { ok: true, text };
  }

  return { ok: false, reason: `failed after retries — last reason: ${lastReason}` };
}
