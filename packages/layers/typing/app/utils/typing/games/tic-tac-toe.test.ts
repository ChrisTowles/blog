import { describe, it, expect } from 'vitest';
import { aiLevelForStage, chooseAIMove, emptyBoard, winner } from './tic-tac-toe';

describe('tic-tac-toe', () => {
  describe('winner', () => {
    it('detects rows', () => {
      const b = emptyBoard();
      b[0] = 'p';
      b[1] = 'p';
      b[2] = 'p';
      expect(winner(b)).toBe('p');
    });
    it('detects columns', () => {
      const b = emptyBoard();
      b[0] = 'a';
      b[3] = 'a';
      b[6] = 'a';
      expect(winner(b)).toBe('a');
    });
    it('detects diagonals', () => {
      const b = emptyBoard();
      b[0] = 'p';
      b[4] = 'p';
      b[8] = 'p';
      expect(winner(b)).toBe('p');
    });
    it('returns tie when full and no winner', () => {
      const b: ('p' | 'a' | null)[] = ['p', 'a', 'p', 'p', 'a', 'p', 'a', 'p', 'a'];
      expect(winner(b)).toBe('tie');
    });
    it('returns null mid-game', () => {
      const b = emptyBoard();
      b[0] = 'p';
      expect(winner(b)).toBeNull();
    });
  });

  describe('chooseAIMove', () => {
    it('random picks an empty cell', () => {
      const b = emptyBoard();
      b[0] = 'p';
      const move = chooseAIMove(b, 'random');
      expect(move).not.toBe(0);
      expect(b[move]).toBeNull();
    });

    it('minimax blocks an immediate player win', () => {
      // Player has 0 and 1; minimax must take 2.
      const b: ('p' | 'a' | null)[] = ['p', 'p', null, null, null, null, null, null, null];
      const move = chooseAIMove(b, 'minimax');
      expect(move).toBe(2);
    });

    it('minimax takes the immediate winning move', () => {
      const b: ('p' | 'a' | null)[] = ['a', 'a', null, 'p', 'p', null, null, null, null];
      const move = chooseAIMove(b, 'minimax');
      expect(move).toBe(2);
    });

    it('weighted picks center on first move', () => {
      // Statistical test: with weights [3,2,3,2,4,2,3,2,3] the center cell
      // is sampled at ~16.7% vs ~12.5% per corner. At 500 trials a corner
      // can occasionally edge out the center; bump the sample size so the
      // gap is many sigma above noise.
      const tally = Array(9).fill(0);
      for (let i = 0; i < 5000; i++) {
        const move = chooseAIMove(emptyBoard(), 'weighted');
        tally[move]++;
      }
      const max = Math.max(...tally);
      expect(tally[4]).toBe(max);
    });

    it('returns -1 on a full board', () => {
      const b: ('p' | 'a' | null)[] = ['p', 'a', 'p', 'p', 'a', 'p', 'a', 'p', 'a'];
      expect(chooseAIMove(b, 'minimax')).toBe(-1);
    });
  });

  describe('aiLevelForStage', () => {
    it('uses random at low stages', () => {
      expect(aiLevelForStage(1)).toBe('random');
      expect(aiLevelForStage(2)).toBe('random');
    });
    it('weighted at mid stages', () => {
      expect(aiLevelForStage(3)).toBe('weighted');
      expect(aiLevelForStage(4)).toBe('weighted');
    });
    it('minimax at high stages', () => {
      expect(aiLevelForStage(5)).toBe('minimax');
      expect(aiLevelForStage(20)).toBe('minimax');
    });
  });
});
