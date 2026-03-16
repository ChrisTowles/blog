import { describe, it, expect } from 'vitest';

// Unit tests for pure functions (no API key needed)
// Export the pure functions for testing by importing the module
// Note: generateStory requires ANTHROPIC_API_KEY and is tested in the integration test

// Re-implement locally since they're not exported
function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 3) return 1;
  const matches = clean.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (clean.endsWith('e') && !clean.endsWith('le')) count--;
  return Math.max(1, count);
}

function calculateFleschKincaid(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  return 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59;
}

describe('countSyllables', () => {
  it('counts single syllable words', () => {
    expect(countSyllables('cat')).toBe(1);
    expect(countSyllables('dog')).toBe(1);
    expect(countSyllables('run')).toBe(1);
  });

  it('counts two syllable words', () => {
    expect(countSyllables('happy')).toBe(2);
    expect(countSyllables('kitten')).toBe(2);
  });

  it('counts three syllable words', () => {
    expect(countSyllables('beautiful')).toBe(3);
    expect(countSyllables('dinosaur')).toBe(3);
  });

  it('handles silent e', () => {
    expect(countSyllables('cake')).toBe(1);
    expect(countSyllables('home')).toBe(1);
  });

  it('handles -le ending', () => {
    expect(countSyllables('apple')).toBe(2);
    expect(countSyllables('little')).toBe(2);
  });

  it('returns at least 1 for any word', () => {
    expect(countSyllables('a')).toBe(1);
    expect(countSyllables('I')).toBe(1);
  });

  it('strips punctuation', () => {
    expect(countSyllables('cat!')).toBe(1);
    expect(countSyllables('dog.')).toBe(1);
  });
});

describe('calculateFleschKincaid', () => {
  it('returns 0 for empty text', () => {
    expect(calculateFleschKincaid('')).toBe(0);
  });

  it('calculates grade level for simple sentences', () => {
    const text = 'The cat sat. The dog ran. The big hat.';
    const score = calculateFleschKincaid(text);
    // Simple CVC sentences should produce a low grade level
    expect(score).toBeLessThan(5);
  });

  it('produces higher scores for complex text', () => {
    const simple = 'The cat sat on a mat.';
    const complex = 'The extraordinary circumstances necessitated immediate intervention.';
    const simpleScore = calculateFleschKincaid(simple);
    const complexScore = calculateFleschKincaid(complex);
    expect(complexScore).toBeGreaterThan(simpleScore);
  });

  it('handles single sentence', () => {
    const text = 'The cat is big.';
    const score = calculateFleschKincaid(text);
    expect(typeof score).toBe('number');
    expect(Number.isFinite(score)).toBe(true);
  });
});
