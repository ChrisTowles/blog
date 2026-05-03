import { describe, expect, it } from 'vitest';
import { evaluateBest } from './hand-evaluator';
import type { Card, Rank, Suit } from './types';

function c(s: string): Card {
  // e.g. "Ah" -> ace of hearts, "Td" -> ten of diamonds, "5c" -> five of clubs
  const rankMap: Record<string, Rank> = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
  };
  const r = rankMap[s[0] as string] as Rank;
  const suit = s[1] as Suit;
  return { rank: r, suit };
}

function hand(...cs: string[]): Card[] {
  return cs.map(c);
}

describe('hand evaluator', () => {
  it('detects high card', () => {
    const h = evaluateBest(hand('Ah', 'Kd', '9c', '7s', '3h'));
    expect(h.category).toBe('high-card');
  });

  it('detects pair', () => {
    const h = evaluateBest(hand('Ah', 'Ad', '9c', '7s', '3h'));
    expect(h.category).toBe('pair');
  });

  it('detects two pair', () => {
    const h = evaluateBest(hand('Ah', 'Ad', '9c', '9s', '3h'));
    expect(h.category).toBe('two-pair');
  });

  it('detects three of a kind', () => {
    const h = evaluateBest(hand('Ah', 'Ad', 'Ac', '9s', '3h'));
    expect(h.category).toBe('three-of-a-kind');
  });

  it('detects straight', () => {
    const h = evaluateBest(hand('5h', '6d', '7c', '8s', '9h'));
    expect(h.category).toBe('straight');
  });

  it('detects wheel straight (A-2-3-4-5)', () => {
    const h = evaluateBest(hand('Ah', '2d', '3c', '4s', '5h'));
    expect(h.category).toBe('straight');
  });

  it('detects flush', () => {
    const h = evaluateBest(hand('Ah', '9h', '7h', '4h', '2h'));
    expect(h.category).toBe('flush');
  });

  it('detects full house', () => {
    const h = evaluateBest(hand('Ah', 'Ad', 'As', '9s', '9h'));
    expect(h.category).toBe('full-house');
  });

  it('detects four of a kind', () => {
    const h = evaluateBest(hand('Ah', 'Ad', 'Ac', 'As', '9h'));
    expect(h.category).toBe('four-of-a-kind');
  });

  it('detects straight flush', () => {
    const h = evaluateBest(hand('5h', '6h', '7h', '8h', '9h'));
    expect(h.category).toBe('straight-flush');
  });

  it('finds best 5 from 7', () => {
    // 7 cards with a flush hidden
    const h = evaluateBest(hand('Ah', '9h', '7h', '4h', '2h', 'Kd', '3s'));
    expect(h.category).toBe('flush');
  });

  it('higher pair beats lower pair', () => {
    const a = evaluateBest(hand('Ah', 'Ad', '9c', '7s', '3h'));
    const b = evaluateBest(hand('Kh', 'Kd', '9c', '7s', '3h'));
    expect(a.score).toBeGreaterThan(b.score);
  });

  it('full house beats flush', () => {
    const fh = evaluateBest(hand('Ah', 'Ad', 'As', '9s', '9h'));
    const fl = evaluateBest(hand('Ac', 'Kc', '9c', '4c', '2c'));
    expect(fh.score).toBeGreaterThan(fl.score);
  });

  it('straight flush beats four of a kind', () => {
    const sf = evaluateBest(hand('5h', '6h', '7h', '8h', '9h'));
    const fk = evaluateBest(hand('Ah', 'Ad', 'Ac', 'As', '2h'));
    expect(sf.score).toBeGreaterThan(fk.score);
  });

  it('higher straight beats lower straight', () => {
    const a = evaluateBest(hand('Th', 'Jd', 'Qc', 'Ks', 'Ah'));
    const b = evaluateBest(hand('5h', '6d', '7c', '8s', '9h'));
    expect(a.score).toBeGreaterThan(b.score);
  });
});
