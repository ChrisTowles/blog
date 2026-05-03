import { describe, expect, it } from 'vitest';
import { createEngine } from './engine';
import type { Card } from './types';

function fixedDeck(): Card[] {
  // 52 cards in a fixed order so tests are deterministic. Order doesn't matter
  // for these structural assertions; we just need a consistent deck.
  const deck: Card[] = [];
  const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;
  const suits = ['h', 'd', 'c', 's'] as const;
  for (const s of suits) {
    for (const r of ranks) {
      deck.push({ rank: r, suit: s });
    }
  }
  return deck;
}

describe('PokerEngine', () => {
  it('starts a hand with proper blinds and turn order', () => {
    const e = createEngine({ dealDeck: fixedDeck });
    e.startHand();
    expect(e.state.handNumber).toBe(1);
    // Hand 1: dealer was 'ai' initially → rotates to 'player' on hand 1
    expect(e.state.dealer).toBe('player');
    // Player is SB, AI is BB
    expect(e.state.player.committed).toBe(10);
    expect(e.state.ai.committed).toBe(20);
    expect(e.state.toAct).toBe('player');
    expect(e.state.player.hole).toHaveLength(2);
    expect(e.state.ai.hole).toHaveLength(2);
  });

  it('preflop call -> BB has option to check', () => {
    const e = createEngine({ dealDeck: fixedDeck });
    e.startHand();
    // SB calls
    expect(e.apply('player', { kind: 'call' })).toBe(true);
    e.advanceIfReady();
    // BB now has the option
    expect(e.state.toAct).toBe('ai');
    expect(e.state.stage).toBe('preflop');
  });

  it('preflop call then BB check advances to flop', () => {
    const e = createEngine({ dealDeck: fixedDeck });
    e.startHand();
    e.apply('player', { kind: 'call' });
    e.advanceIfReady();
    e.apply('ai', { kind: 'check' });
    e.advanceIfReady();
    expect(e.state.stage).toBe('flop');
    expect(e.state.community).toHaveLength(3);
  });

  it('multiple consecutive hands keep correct turn order (regression: actedThisRound reset)', () => {
    const e = createEngine({ dealDeck: fixedDeck });
    // Hand 1: SB calls, BB checks, both check the rest, river → showdown.
    e.startHand();
    e.apply('player', { kind: 'call' });
    e.advanceIfReady();
    e.apply('ai', { kind: 'check' });
    e.advanceIfReady();
    // Flop: BB acts first
    expect(e.state.stage).toBe('flop');
    expect(e.state.toAct).toBe('ai');
    e.apply('ai', { kind: 'check' });
    e.advanceIfReady();
    e.apply('player', { kind: 'check' });
    e.advanceIfReady();
    expect(e.state.stage).toBe('turn');
    e.apply('ai', { kind: 'check' });
    e.advanceIfReady();
    e.apply('player', { kind: 'check' });
    e.advanceIfReady();
    expect(e.state.stage).toBe('river');
    e.apply('ai', { kind: 'check' });
    e.advanceIfReady();
    e.apply('player', { kind: 'check' });
    e.advanceIfReady();
    expect(e.state.handOver).toBe(true);

    // Hand 2: dealer should rotate to AI; AI is SB.
    e.startHand();
    expect(e.state.handNumber).toBe(2);
    expect(e.state.dealer).toBe('ai');
    expect(e.state.toAct).toBe('ai');
    // AI calls preflop → player should have option to check, NOT auto-advance to flop.
    e.apply('ai', { kind: 'call' });
    e.advanceIfReady();
    expect(e.state.stage).toBe('preflop');
    expect(e.state.toAct).toBe('player');
  });

  it('fold ends the hand and awards pot to opponent', () => {
    const e = createEngine({ dealDeck: fixedDeck });
    e.startHand();
    const startingChips = e.state.ai.chips;
    const potBefore = e.state.pot;
    e.apply('player', { kind: 'fold' });
    e.advanceIfReady();
    expect(e.state.handOver).toBe(true);
    expect(e.state.ai.chips).toBe(startingChips + potBefore);
  });

  it('rejects illegal actions', () => {
    const e = createEngine({ dealDeck: fixedDeck });
    e.startHand();
    // SB can't check facing the BB
    expect(e.apply('player', { kind: 'check' })).toBe(false);
    // AI can't act out of turn
    expect(e.apply('ai', { kind: 'call' })).toBe(false);
  });
});
