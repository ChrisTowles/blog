import { describe, it, expect } from 'vitest';
import { buildDrillText, buildFallbackSentence } from './spelling-lessons';

describe('spelling-lessons', () => {
  describe('buildDrillText', () => {
    it('repeats each word three times, joined by spaces', () => {
      expect(buildDrillText(['cat', 'dog'])).toBe('cat cat cat dog dog dog');
    });

    it('returns an empty string for an empty list', () => {
      expect(buildDrillText([])).toBe('');
    });

    it('handles single-word lists', () => {
      expect(buildDrillText(['fish'])).toBe('fish fish fish');
    });
  });

  describe('buildFallbackSentence', () => {
    it('returns a friendly sentence for one word', () => {
      expect(buildFallbackSentence(['cat'])).toBe('cat is the word.');
    });

    it('joins multiple words with commas', () => {
      expect(buildFallbackSentence(['cat', 'bat', 'hat'])).toBe(
        'here are the words: cat, bat, hat.',
      );
    });

    it('returns an empty string for an empty list', () => {
      expect(buildFallbackSentence([])).toBe('');
    });
  });
});
