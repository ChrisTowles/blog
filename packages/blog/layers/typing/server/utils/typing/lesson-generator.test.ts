/**
 * Unit tests for lesson-generator. The Anthropic client is passed in as
 * an injection parameter so tests don't depend on Vitest's vi.mock path
 * resolution (which can be flaky inside the Nuxt test environment).
 *
 * The integration test (`lesson-generator.integration.test.ts`) covers
 * the live model behind a `RUN_INTEGRATION` gate.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { unlockedKeysForStage } from './curriculum';
import {
  emphasisKeysForStage,
  emphasisMinCount,
  generateLesson,
  truncateWithinBounds,
  validateEmphasis,
  validateGeneratedText,
  type AnthropicLike,
} from './lesson-generator';
import { blockListCheck } from './lesson-safety';

describe('validateGeneratedText', () => {
  const stage5 = unlockedKeysForStage(5);

  it('passes when text uses only unlocked chars and length is in bounds', () => {
    const text = 'a sad lad has a flask; a flag has a glass; a flag has a glass; a glass';
    const result = validateGeneratedText(text, stage5, { min: 10, max: 200 });
    expect(result.ok).toBe(true);
  });

  it('rejects forbidden characters', () => {
    const text = 'cats and dogs and zebras and quetzals';
    const result = validateGeneratedText(text, stage5, { min: 10, max: 200 });
    expect(result.ok).toBe(false);
  });

  it('rejects too-short text', () => {
    const result = validateGeneratedText('a', stage5, { min: 50, max: 200 });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/too short/);
  });

  it('rejects too-long text', () => {
    const result = validateGeneratedText('a'.repeat(500), stage5, { min: 10, max: 200 });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/too long/);
  });
});

describe('truncateWithinBounds', () => {
  it('returns the trimmed text unchanged when already within bounds', () => {
    expect(truncateWithinBounds('hello world.', { min: 5, max: 50 })).toBe('hello world.');
  });

  it('cuts at the last sentence-ending punctuation within max', () => {
    const overflow = 'a sad lad has a flask. a flag has a glass. one more sentence keeps going';
    const result = truncateWithinBounds(overflow, { min: 15, max: 25 });
    expect(result).toBe('a sad lad has a flask.');
  });

  it('falls back to last space when no terminal punctuation fits', () => {
    const overflow = 'a sad lad has a flask and a flag and a glass and one more thing';
    const result = truncateWithinBounds(overflow, { min: 20, max: 30 });
    expect(result).toBe('a sad lad has a flask and a');
  });

  it('returns null when no punctuation or space falls within bounds', () => {
    const overflow = 'a'.repeat(40);
    const result = truncateWithinBounds(overflow, { min: 20, max: 22 });
    expect(result).toBeNull();
  });

  it('never returns a string longer than max — punctuation at the last valid index fits exactly', () => {
    const overflow = 'abcdef.xyz';
    const result = truncateWithinBounds(overflow, { min: 1, max: 7 });
    expect(result).toBe('abcdef.');
    expect(result?.length).toBe(7);
  });

  it('returns null rather than overshooting when punctuation only fits past the boundary', () => {
    // Period sits at index 7, but max=7 only allows positions 0..6.
    // Returning anything that includes the period would be 8 chars.
    const overflow = 'abcdefg.xyz';
    const result = truncateWithinBounds(overflow, { min: 1, max: 7 });
    expect(result).toBeNull();
  });
});

describe('blockListCheck', () => {
  it('passes innocuous text', () => {
    expect(blockListCheck('My Pokemon and Mario adventure').safe).toBe(true);
  });

  it('catches a block-list term anywhere in the string', () => {
    const result = blockListCheck('I love porn and games');
    expect(result.safe).toBe(false);
    if (!result.safe) expect(result.source).toBe('block-list');
  });
});

describe('generateLesson (stub Anthropic client)', () => {
  const create = vi.fn();
  const stub: AnthropicLike = { messages: { create } };

  beforeEach(() => {
    create.mockReset();
    process.env.ANTHROPIC_API_KEY = 'test-key';
  });

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  it('returns the generated text when validation + safety pass', async () => {
    create.mockResolvedValueOnce({
      content: [
        {
          type: 'text',
          text: 'a sad lad has a flask; a flag has a glass; a flag has a glass; a glass',
        },
      ],
    });
    create.mockResolvedValueOnce({
      content: [{ type: 'text', text: '{"safe": true}' }],
    });

    const result = await generateLesson(
      { stage: 5, topic: 'glass', kind: 'sentence', length: 'short' },
      stub,
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.text).toContain('flask');
  });

  it('retries on validation failure and eventually returns the valid attempt', async () => {
    create.mockResolvedValueOnce({
      content: [{ type: 'text', text: 'sentence with a Q character' }],
    });
    create.mockResolvedValueOnce({
      content: [
        {
          type: 'text',
          text: 'a sad lad has a flask; a flag has a glass; a flag has a glass; a glass',
        },
      ],
    });
    create.mockResolvedValueOnce({
      content: [{ type: 'text', text: '{"safe": true}' }],
    });

    const result = await generateLesson(
      { stage: 5, topic: 'glass', kind: 'sentence', length: 'short' },
      stub,
    );
    expect(result.ok).toBe(true);
    expect(create).toHaveBeenCalledTimes(3);
  });

  it('fails after retries if validation never passes', async () => {
    create.mockResolvedValue({
      content: [{ type: 'text', text: 'this has q and z and other forbidden letters' }],
    });

    const result = await generateLesson(
      { stage: 5, topic: 'animals', kind: 'sentence', length: 'short' },
      stub,
    );
    expect(result.ok).toBe(false);
  });

  it('recovers via truncation when the model overshoots the upper bound', async () => {
    // 240 chars, all stage-5 legal and rich in the new keys (g, h) so the
    // emphasis check passes post-truncation. Truncator falls back to a
    // last-space cut because the period isn't unlocked yet.
    const overflow = 'a glad lad has a glass; '.repeat(10);
    create.mockResolvedValueOnce({
      content: [{ type: 'text', text: overflow }],
    });
    create.mockResolvedValueOnce({
      content: [{ type: 'text', text: '{"safe": true}' }],
    });

    const result = await generateLesson(
      { stage: 5, topic: 'glass', kind: 'sentence', length: 'short' },
      stub,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.text.length).toBeLessThanOrEqual(160);
      expect(result.text.length).toBeGreaterThanOrEqual(60);
    }
    expect(create).toHaveBeenCalledTimes(2);
  });

  it('errors when ANTHROPIC_API_KEY is missing', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const result = await generateLesson(
      { stage: 5, topic: 'animals', kind: 'sentence', length: 'short' },
      stub,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/ANTHROPIC_API_KEY/);
  });

  it("retries when the stage's new keys are missing, then accepts a key-rich attempt", async () => {
    // Stage 5 introduces g and h. First reply is legal but never uses g —
    // generic prose that avoids locked letters isn't good enough.
    create.mockResolvedValueOnce({
      content: [
        {
          type: 'text',
          text: 'a sad lad has a flask; a sad lad has a flask; a sad lad has a flask',
        },
      ],
    });
    create.mockResolvedValueOnce({
      content: [
        {
          type: 'text',
          text: 'a glad lad has a glass; a flag has a glass; a glad lad has a flag',
        },
      ],
    });
    create.mockResolvedValueOnce({
      content: [{ type: 'text', text: '{"safe": true}' }],
    });

    const result = await generateLesson(
      { stage: 5, topic: 'glass', kind: 'sentence', length: 'short' },
      stub,
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.text).toContain('glad');
    expect(create).toHaveBeenCalledTimes(3);
  });

  it('skips the new-key emphasis when emphasizeNewKeys is false (spelling lessons)', async () => {
    create.mockResolvedValueOnce({
      content: [
        {
          type: 'text',
          text: 'a sad lad has a flask; a sad lad has a flask; a sad lad has a flask',
        },
      ],
    });
    create.mockResolvedValueOnce({
      content: [{ type: 'text', text: '{"safe": true}' }],
    });

    const result = await generateLesson(
      { stage: 5, topic: 'flask', kind: 'sentence', length: 'short', emphasizeNewKeys: false },
      stub,
    );
    expect(result.ok).toBe(true);
    expect(create).toHaveBeenCalledTimes(2);
  });
});

describe('emphasis helpers', () => {
  it('emphasisKeysForStage returns the new letters for letter stages only', () => {
    expect(emphasisKeysForStage(5)).toEqual(['g', 'h']);
    expect(emphasisKeysForStage(12)).toEqual(['c']); // comma is not a letter
    expect(emphasisKeysForStage(16)).toEqual([]); // capitals
    expect(emphasisKeysForStage(17)).toEqual([]); // digits
  });

  it('emphasisMinCount is higher for paragraphs', () => {
    expect(emphasisMinCount('sentence')).toBe(2);
    expect(emphasisMinCount('paragraph')).toBe(3);
  });

  it('validateEmphasis counts case-insensitively and reports the missing key', () => {
    expect(validateEmphasis('Go Get the doG', ['g'], 3).ok).toBe(true);
    const fail = validateEmphasis('a cat sat', ['g'], 2);
    expect(fail.ok).toBe(false);
    if (!fail.ok) expect(fail.reason).toContain('"g"');
    expect(validateEmphasis('anything', [], 2).ok).toBe(true);
  });
});
