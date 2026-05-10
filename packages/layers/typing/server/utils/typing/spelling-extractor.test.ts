import { describe, it, expect, vi } from 'vitest';
import {
  extractSpellingWords,
  validateExtractedWords,
  type AnthropicVisionLike,
} from './spelling-extractor';

describe('validateExtractedWords', () => {
  it('accepts a normal list', () => {
    const result = validateExtractedWords(['cat', 'dog', 'fish']);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.words).toEqual(['cat', 'dog', 'fish']);
  });

  it("accepts apostrophes (e.g. don't, can't)", () => {
    const result = validateExtractedWords(["don't", "can't"]);
    expect(result.ok).toBe(true);
  });

  it('rejects when not an array', () => {
    const result = validateExtractedWords('not an array' as unknown);
    expect(result.ok).toBe(false);
  });

  it('rejects empty arrays', () => {
    const result = validateExtractedWords([]);
    expect(result.ok).toBe(false);
  });

  it('rejects > 30 words', () => {
    const tooMany = Array(31).fill('cat');
    const result = validateExtractedWords(tooMany);
    expect(result.ok).toBe(false);
  });

  it('rejects words with bad length', () => {
    expect(validateExtractedWords(['a']).ok).toBe(false);
    expect(validateExtractedWords(['x'.repeat(16)]).ok).toBe(false);
  });

  it('rejects words with non a-z chars', () => {
    expect(validateExtractedWords(['cat3']).ok).toBe(false);
    expect(validateExtractedWords(['CAT']).ok).toBe(false);
    expect(validateExtractedWords(['cät']).ok).toBe(false);
  });
});

describe('extractSpellingWords (mocked client)', () => {
  it('returns the parsed words on a happy path', async () => {
    const create = vi.fn().mockResolvedValueOnce({
      content: [{ type: 'text', text: '{"words": ["cat", "dog", "fish"]}' }],
    });
    const stub: AnthropicVisionLike = { messages: { create } };
    process.env.ANTHROPIC_API_KEY = 'k';
    try {
      const result = await extractSpellingWords('AAAA', 'image/png', stub);
      expect(result.ok).toBe(true);
      if (result.ok) expect(result.words).toEqual(['cat', 'dog', 'fish']);
    } finally {
      delete process.env.ANTHROPIC_API_KEY;
    }
  });

  it('returns an error if JSON is malformed', async () => {
    const create = vi.fn().mockResolvedValueOnce({
      content: [{ type: 'text', text: 'not json' }],
    });
    const stub: AnthropicVisionLike = { messages: { create } };
    process.env.ANTHROPIC_API_KEY = 'k';
    try {
      const result = await extractSpellingWords('AAAA', 'image/png', stub);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.raw).toBe('not json');
    } finally {
      delete process.env.ANTHROPIC_API_KEY;
    }
  });

  it('errors when ANTHROPIC_API_KEY is missing', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const result = await extractSpellingWords('AAAA', 'image/png', {
      messages: { create: vi.fn() },
    });
    expect(result.ok).toBe(false);
  });
});
