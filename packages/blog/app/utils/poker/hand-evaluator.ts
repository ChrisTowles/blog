import { type Card, type HandCategory, type HandRank, type Rank } from './types';

const CATEGORY_BASE: Record<HandCategory, number> = {
  'high-card': 0,
  pair: 1,
  'two-pair': 2,
  'three-of-a-kind': 3,
  straight: 4,
  flush: 5,
  'full-house': 6,
  'four-of-a-kind': 7,
  'straight-flush': 8,
};

/**
 * Encode (category, [tiebreakers]) into a comparable integer.
 * Each tiebreaker rank fits in 4 bits (max 15), category in upper bits.
 */
function encodeScore(category: HandCategory, tiebreakers: number[]): number {
  let score = CATEGORY_BASE[category];
  for (const t of tiebreakers) {
    score = score * 16 + t;
  }
  // Pad to fixed length (5 tiebreakers) so categories don't collide on short tb arrays
  for (let i = tiebreakers.length; i < 5; i++) {
    score = score * 16;
  }
  return score;
}

function combinations<T>(arr: T[], k: number): T[][] {
  const out: T[][] = [];
  const n = arr.length;
  if (k > n) return out;
  const idx = Array.from({ length: k }, (_, i) => i);
  while (true) {
    out.push(idx.map((i) => arr[i]!));
    let i = k - 1;
    while (i >= 0 && idx[i] === i + n - k) i--;
    if (i < 0) break;
    idx[i]!++;
    for (let j = i + 1; j < k; j++) idx[j] = idx[j - 1]! + 1;
  }
  return out;
}

function evaluateFive(cards: Card[]): HandRank {
  const sortedDesc = cards.slice().sort((a, b) => b.rank - a.rank);
  const ranks = sortedDesc.map((c) => c.rank);
  const suits = sortedDesc.map((c) => c.suit);

  const isFlush = suits.every((s) => s === suits[0]);

  // Straight detection (also handles wheel A-2-3-4-5)
  const uniqRanks = Array.from(new Set(ranks));
  let straightHigh: Rank | null = null;
  if (uniqRanks.length === 5) {
    if (uniqRanks[0]! - uniqRanks[4]! === 4) {
      straightHigh = uniqRanks[0]!;
    } else if (
      uniqRanks[0] === 14 &&
      uniqRanks[1] === 5 &&
      uniqRanks[2] === 4 &&
      uniqRanks[3] === 3 &&
      uniqRanks[4] === 2
    ) {
      straightHigh = 5 as Rank;
    }
  }

  if (isFlush && straightHigh !== null) {
    return {
      category: 'straight-flush',
      score: encodeScore('straight-flush', [straightHigh]),
      bestFive: sortedDesc,
    };
  }

  // Group by rank
  const counts = new Map<Rank, number>();
  for (const r of ranks) counts.set(r, (counts.get(r) ?? 0) + 1);
  const groups = Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || b[0] - a[0]);
  const [g0, g1, g2] = groups;

  if (g0 && g0[1] === 4) {
    const four = g0[0];
    const kicker = g1![0];
    return {
      category: 'four-of-a-kind',
      score: encodeScore('four-of-a-kind', [four, kicker]),
      bestFive: sortedDesc,
    };
  }
  if (g0 && g0[1] === 3 && g1 && g1[1] === 2) {
    return {
      category: 'full-house',
      score: encodeScore('full-house', [g0[0], g1[0]]),
      bestFive: sortedDesc,
    };
  }
  if (isFlush) {
    return {
      category: 'flush',
      score: encodeScore('flush', ranks),
      bestFive: sortedDesc,
    };
  }
  if (straightHigh !== null) {
    return {
      category: 'straight',
      score: encodeScore('straight', [straightHigh]),
      bestFive: sortedDesc,
    };
  }
  if (g0 && g0[1] === 3) {
    const trip = g0[0];
    const kickers = ranks.filter((r) => r !== trip);
    return {
      category: 'three-of-a-kind',
      score: encodeScore('three-of-a-kind', [trip, ...kickers.slice(0, 2)]),
      bestFive: sortedDesc,
    };
  }
  if (g0 && g0[1] === 2 && g1 && g1[1] === 2) {
    const hi = Math.max(g0[0], g1[0]);
    const lo = Math.min(g0[0], g1[0]);
    const kicker = g2![0];
    return {
      category: 'two-pair',
      score: encodeScore('two-pair', [hi, lo, kicker]),
      bestFive: sortedDesc,
    };
  }
  if (g0 && g0[1] === 2) {
    const pair = g0[0];
    const kickers = ranks.filter((r) => r !== pair);
    return {
      category: 'pair',
      score: encodeScore('pair', [pair, ...kickers.slice(0, 3)]),
      bestFive: sortedDesc,
    };
  }
  return {
    category: 'high-card',
    score: encodeScore('high-card', ranks),
    bestFive: sortedDesc,
  };
}

/** Evaluate the best 5-card hand from any 5..7 cards. */
export function evaluateBest(cards: Card[]): HandRank {
  if (cards.length < 5) {
    throw new Error(`evaluateBest needs >= 5 cards, got ${cards.length}`);
  }
  if (cards.length === 5) return evaluateFive(cards);
  let best: HandRank | null = null;
  for (const five of combinations(cards, 5)) {
    const hr = evaluateFive(five);
    if (!best || hr.score > best.score) best = hr;
  }
  return best!;
}

/** Compare two hand ranks; positive means a wins, negative means b wins, 0 split. */
export function compareHands(a: HandRank, b: HandRank): number {
  return a.score - b.score;
}
