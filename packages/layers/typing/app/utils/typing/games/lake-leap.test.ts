import { describe, it, expect } from 'vitest';
import { pickWordsForRound, summarize } from './lake-leap';

describe('lake-leap', () => {
  describe('pickWordsForRound', () => {
    it('returns the requested count from the source pool', () => {
      const words = pickWordsForRound({
        mode: 'spelling',
        source: ['apple', 'banana'],
        count: 5,
      });
      expect(words).toHaveLength(5);
      for (const w of words) {
        expect(['apple', 'banana']).toContain(w);
      }
    });

    it('falls back to defaults when source is empty', () => {
      const words = pickWordsForRound({ mode: 'curriculum', source: [], count: 3 });
      expect(words).toHaveLength(3);
      for (const w of words) {
        expect(typeof w).toBe('string');
        expect(w.length).toBeGreaterThan(0);
      }
    });
  });

  describe('summarize', () => {
    it('marks perfect rounds at <= 2 wrongs', () => {
      expect(summarize({ cleared: 10, wrongs: 0, startedAt: 0, endedAt: 1000 }).perfect).toBe(true);
      expect(summarize({ cleared: 10, wrongs: 2, startedAt: 0, endedAt: 1000 }).perfect).toBe(true);
    });
    it('marks rounds with > 2 wrongs as imperfect', () => {
      expect(summarize({ cleared: 10, wrongs: 3, startedAt: 0, endedAt: 1000 }).perfect).toBe(
        false,
      );
    });
    it('returns the duration', () => {
      expect(summarize({ cleared: 10, wrongs: 0, startedAt: 100, endedAt: 1100 }).durationMs).toBe(
        1000,
      );
    });
  });
});
