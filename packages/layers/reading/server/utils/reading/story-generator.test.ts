import { describe, it, expect } from 'vitest';
import { countSyllables, calculateFleschKincaid, buildStoryPromptExtras } from './story-generator';

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

  it('handles empty-ish input', () => {
    expect(countSyllables('')).toBe(1);
    expect(countSyllables('...')).toBe(1);
  });
});

describe('calculateFleschKincaid', () => {
  it('returns 0 for empty text', () => {
    expect(calculateFleschKincaid('')).toBe(0);
  });

  it('calculates grade level for simple sentences', () => {
    const text = 'The cat sat. The dog ran. The big hat.';
    const score = calculateFleschKincaid(text);
    expect(score).toBeLessThan(5);
  });

  it('produces higher scores for complex text', () => {
    const simple = 'The cat sat on a mat.';
    const complex = 'The extraordinary circumstances necessitated immediate intervention.';
    expect(calculateFleschKincaid(complex)).toBeGreaterThan(calculateFleschKincaid(simple));
  });

  it('handles single sentence', () => {
    const score = calculateFleschKincaid('The cat is big.');
    expect(typeof score).toBe('number');
    expect(Number.isFinite(score)).toBe(true);
  });

  it('handles text with only punctuation-separated fragments', () => {
    const score = calculateFleschKincaid('Run! Jump! Go!');
    expect(Number.isFinite(score)).toBe(true);
  });
});

describe('buildStoryPromptExtras', () => {
  it('returns empty string with no options', () => {
    expect(buildStoryPromptExtras({})).toBe('');
  });

  it('includes character when who is set', () => {
    const result = buildStoryPromptExtras({ who: 'Rex the dog' });
    expect(result).toContain('MAIN CHARACTER: Rex the dog');
  });

  it('includes idea when set', () => {
    const result = buildStoryPromptExtras({ idea: 'a trip to the park' });
    expect(result).toContain('STORY IDEA: a trip to the park');
  });

  it('includes selected preview', () => {
    const result = buildStoryPromptExtras({
      selectedPreview: { title: 'Fun Day', summary: 'A fun day at the beach' },
    });
    expect(result).toContain('USE THIS STORY CONCEPT');
    expect(result).toContain('Fun Day');
    expect(result).toContain('A fun day at the beach');
  });

  it('combines all options with newlines', () => {
    const result = buildStoryPromptExtras({
      who: 'Cat',
      idea: 'adventure',
      selectedPreview: { title: 'T', summary: 'S' },
    });
    const lines = result.split('\n');
    expect(lines).toHaveLength(3);
  });
});
