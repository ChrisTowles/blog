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
import { validateGeneratedText, generateLesson, type AnthropicLike } from './lesson-generator';
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

  it('errors when ANTHROPIC_API_KEY is missing', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const result = await generateLesson(
      { stage: 5, topic: 'animals', kind: 'sentence', length: 'short' },
      stub,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toMatch(/ANTHROPIC_API_KEY/);
  });
});
