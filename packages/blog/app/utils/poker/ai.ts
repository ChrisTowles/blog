import { evaluateBest } from './hand-evaluator';
import { type Card, type GameState, type PlayerAction, type Rank } from './types';
import { buildDeck, shuffle } from './deck';

/**
 * Estimate AI win probability via Monte Carlo rollouts.
 * Used post-flop. Pre-flop we use a Chen-style hand strength heuristic instead.
 */
function monteCarloEquity(
  hole: Card[],
  community: Card[],
  trials: number,
  rng: () => number,
): number {
  const known = new Set([...hole, ...community].map((c) => `${c.rank}${c.suit}`));
  const deck = buildDeck().filter((c) => !known.has(`${c.rank}${c.suit}`));

  let wins = 0;
  let ties = 0;
  for (let t = 0; t < trials; t++) {
    const shuffled = shuffle(deck, rng);
    const oppHole = shuffled.slice(0, 2);
    const need = 5 - community.length;
    const board = [...community, ...shuffled.slice(2, 2 + need)];
    const aiHand = evaluateBest([...hole, ...board]);
    const oppHand = evaluateBest([...oppHole, ...board]);
    if (aiHand.score > oppHand.score) wins++;
    else if (aiHand.score === oppHand.score) ties++;
  }
  return (wins + ties / 2) / trials;
}

/** Chen-style preflop strength → maps to ~equity vs random hand. */
function preflopStrength(hole: Card[]): number {
  const [a, b] = hole.slice().sort((x, y) => y.rank - x.rank) as [Card, Card];
  const high: Rank = a.rank;
  const low: Rank = b.rank;
  const suited = a.suit === b.suit;
  const pair = high === low;

  // Base from highest card
  const baseMap: Partial<Record<Rank, number>> = {
    14: 10,
    13: 8,
    12: 7,
    11: 6,
  };
  let pts = baseMap[high] ?? high / 2;

  if (pair) {
    pts = Math.max(5, pts * 2);
    if (high === 5) pts = 6;
    if (high <= 4) pts = 5;
  }
  if (suited) pts += 2;

  const gap = high - low;
  if (!pair) {
    if (gap === 1) pts += 1;
    else if (gap === 2) pts -= 1;
    else if (gap === 3) pts -= 2;
    else if (gap >= 4) pts -= 4;
    if (gap <= 1 && high < 12) pts += 1;
  }

  // Map ~ -2..20 → 0.2..0.85
  const equity = Math.max(0.2, Math.min(0.85, 0.4 + pts * 0.025));
  return equity;
}

export interface AiDecisionInput {
  state: GameState;
  rng?: () => number;
}

/**
 * Decide what the AI should do. Returns a legal PlayerAction.
 * Strategy:
 *  - Estimate equity (preflop heuristic vs Monte Carlo postflop).
 *  - Pot odds determine call vs fold.
 *  - With strong equity, raise; weak, fold or check.
 *  - A small randomization layer keeps it from being entirely predictable.
 */
export function decideAi(input: AiDecisionInput): PlayerAction {
  const { state } = input;
  const rng = input.rng ?? Math.random;
  const ai = state.ai;

  const toCall = state.currentBet - ai.committed;
  const canCheck = toCall === 0;

  const equity =
    state.community.length === 0
      ? preflopStrength(ai.hole)
      : monteCarloEquity(ai.hole, state.community, 250, rng);

  // Pot odds = price / (pot + price)
  const price = toCall;
  const potAfterCall = state.pot + price;
  const potOdds = price === 0 ? 0 : price / (potAfterCall + price);

  // Add some jitter so the AI isn't fully solvable
  const jitter = (rng() - 0.5) * 0.06;
  const adjEquity = Math.max(0, Math.min(1, equity + jitter));

  const stack = ai.chips;
  const bigBlind = state.bigBlind;

  // Bluff occasionally with weak hand if opponent is checking
  const bluff = canCheck && rng() < 0.08 && state.community.length >= 3;

  if (canCheck) {
    if (adjEquity > 0.72 || (adjEquity > 0.55 && rng() < 0.6)) {
      const sizeMul = adjEquity > 0.85 ? 1.2 : adjEquity > 0.7 ? 0.75 : 0.5;
      const target = Math.max(bigBlind, Math.round(state.pot * sizeMul));
      const amount = Math.min(stack, target);
      if (amount <= 0) return { kind: 'check' };
      return { kind: 'bet', amount };
    }
    if (bluff) {
      const amount = Math.min(stack, Math.max(bigBlind, Math.round(state.pot * 0.5)));
      return { kind: 'bet', amount };
    }
    return { kind: 'check' };
  }

  // Facing a bet
  if (adjEquity < potOdds - 0.03) {
    return { kind: 'fold' };
  }

  // Strong hand → raise
  if (adjEquity > 0.78 && rng() < 0.85) {
    const raiseSize = Math.max(bigBlind * 2, Math.round(state.pot * 0.9));
    const toAmount = Math.min(ai.committed + toCall + raiseSize, ai.committed + stack);
    if (toAmount > state.currentBet) {
      return { kind: 'raise', toAmount };
    }
  }

  // Medium hand: sometimes raise, mostly call
  if (adjEquity > 0.62 && rng() < 0.35) {
    const raiseSize = Math.max(bigBlind * 2, Math.round(state.pot * 0.6));
    const toAmount = Math.min(ai.committed + toCall + raiseSize, ai.committed + stack);
    if (toAmount > state.currentBet) {
      return { kind: 'raise', toAmount };
    }
  }

  return { kind: 'call' };
}
