import { evaluateBest } from './hand-evaluator';
import { buildDeck, shuffle } from './deck';
import {
  type Actor,
  type Card,
  type GameState,
  HAND_CATEGORY_LABEL,
  type PlayerAction,
  type PlayerState,
  type Stage,
  cardLabel,
} from './types';

const STARTING_CHIPS = 1000;
const SMALL_BLIND = 10;
const BIG_BLIND = 20;

function freshPlayer(chips: number): PlayerState {
  return {
    chips,
    hole: [],
    committed: 0,
    hasFolded: false,
    isAllIn: false,
  };
}

export interface EngineDeps {
  rng?: () => number;
  /** Provides a shuffled deck. Override in tests. */
  dealDeck?: () => Card[];
  /**
   * Optional external state object — pass a Vue `reactive()` wrapper here so
   * mutations through the engine trigger Vue reactivity. If omitted, a plain
   * object is used (fine for tests / non-Vue contexts).
   */
  state?: GameState;
}

export function freshGameState(): GameState {
  return {
    player: freshPlayer(STARTING_CHIPS),
    ai: freshPlayer(STARTING_CHIPS),
    community: [],
    pot: 0,
    currentBet: 0,
    stage: 'preflop',
    toAct: null,
    dealer: 'ai',
    smallBlind: SMALL_BLIND,
    bigBlind: BIG_BLIND,
    log: [],
    handNumber: 0,
    handOver: false,
  };
}

export interface PokerEngine {
  state: GameState;
  /** Start a new hand, rotating dealer. Resets per-hand state but preserves chip counts. */
  startHand(): void;
  /** Apply a player action. Returns true if accepted. */
  apply(actor: Actor, action: PlayerAction): boolean;
  /** Advance to next stage when both players are settled (no more action needed). */
  advanceIfReady(): void;
  legalActions(actor: Actor): {
    canCheck: boolean;
    canCall: boolean;
    callAmount: number;
    minBet: number;
    minRaiseTo: number;
    maxBetTo: number;
    canBet: boolean;
    canRaise: boolean;
    canFold: boolean;
  };
}

export function createEngine(deps: EngineDeps = {}): PokerEngine {
  const rng = deps.rng ?? Math.random;
  const dealDeck = deps.dealDeck ?? (() => shuffle(buildDeck(), rng));

  let deck: Card[] = [];

  // Use externally-provided (e.g. Vue reactive) state if given, so mutations
  // here propagate to consumers. Default to a plain object for tests.
  const state: GameState = deps.state ?? freshGameState();
  if (deps.state) {
    Object.assign(state, freshGameState());
  }

  function log(who: Actor | 'system', text: string) {
    state.log.push({ who, text });
    if (state.log.length > 60) state.log.shift();
  }

  function postBlind(actor: Actor, amount: number) {
    const p = state[actor];
    const post = Math.min(amount, p.chips);
    p.chips -= post;
    p.committed += post;
    if (p.chips === 0) p.isAllIn = true;
    state.pot += post;
    state.currentBet = Math.max(state.currentBet, p.committed);
    log(actor, `posts ${post}`);
  }

  function startHand() {
    state.handNumber += 1;
    state.handOver = false;
    state.result = undefined;
    state.community = [];
    state.pot = 0;
    state.currentBet = 0;
    state.stage = 'preflop';

    state.player.hole = [];
    state.player.committed = 0;
    state.player.hasFolded = false;
    state.player.isAllIn = false;
    state.ai.hole = [];
    state.ai.committed = 0;
    state.ai.hasFolded = false;
    state.ai.isAllIn = false;

    // Reset round-tracking — leftover entries from the previous hand would
    // make the first action of this hand close the preflop round prematurely.
    resetActedThisRound();

    // Rotate dealer
    state.dealer = state.dealer === 'ai' ? 'player' : 'ai';

    deck = dealDeck();
    // Deal hole cards: 1 to each, then 1 to each (standard order)
    const order: Actor[] = state.dealer === 'player' ? ['ai', 'player'] : ['player', 'ai'];
    for (let pass = 0; pass < 2; pass++) {
      for (const actor of order) {
        state[actor].hole.push(deck.shift()!);
      }
    }

    // Heads-up blinds: dealer posts SB, other posts BB
    const sbActor: Actor = state.dealer;
    const bbActor: Actor = state.dealer === 'player' ? 'ai' : 'player';
    postBlind(sbActor, SMALL_BLIND);
    postBlind(bbActor, BIG_BLIND);

    log('system', `--- Hand #${state.handNumber} ---`);
    log('system', `Blinds: SB ${SMALL_BLIND} / BB ${BIG_BLIND}`);

    // Heads-up preflop: SB (dealer) acts first
    state.toAct = sbActor;
  }

  function dealStreet() {
    if (state.stage === 'preflop') {
      // Burn 1, deal 3
      deck.shift();
      const flop: Card[] = [];
      for (let i = 0; i < 3; i++) flop.push(deck.shift()!);
      state.community.push(...flop);
      state.stage = 'flop';
      log('system', `Flop: ${flop.map(cardLabel).join(' ')}`);
    } else if (state.stage === 'flop') {
      deck.shift();
      const turn = deck.shift()!;
      state.community.push(turn);
      state.stage = 'turn';
      log('system', `Turn: ${cardLabel(turn)}`);
    } else if (state.stage === 'turn') {
      deck.shift();
      const river = deck.shift()!;
      state.community.push(river);
      state.stage = 'river';
      log('system', `River: ${cardLabel(river)}`);
    } else if (state.stage === 'river') {
      state.stage = 'showdown';
    }

    // Reset per-street betting
    state.currentBet = 0;
    state.player.committed = 0;
    state.ai.committed = 0;

    // Postflop: BB (non-dealer) acts first; if dealer is player, AI acts first.
    const firstToAct: Actor = state.dealer === 'player' ? 'ai' : 'player';
    state.toAct = firstToAct;
  }

  function settleByFold(winner: Actor) {
    state[winner].chips += state.pot;
    const won = state.pot;
    state.handOver = true;
    state.toAct = null;
    state.result = {
      winner,
      revealAi: false,
      chipsWon: won,
      summary: `${winner === 'player' ? 'You' : 'AI'} won ${won} (opponent folded)`,
    };
    log('system', state.result.summary);
  }

  function settleShowdown() {
    const playerHand = evaluateBest([...state.player.hole, ...state.community]);
    const aiHand = evaluateBest([...state.ai.hole, ...state.community]);
    let winner: Actor | 'split';
    if (playerHand.score > aiHand.score) winner = 'player';
    else if (aiHand.score > playerHand.score) winner = 'ai';
    else winner = 'split';

    let summary = '';
    let chipsWon = 0;
    if (winner === 'split') {
      const half = Math.floor(state.pot / 2);
      state.player.chips += half;
      state.ai.chips += state.pot - half; // odd chip to non-acting? simpler: AI gets remainder
      summary = `Split pot — both have ${HAND_CATEGORY_LABEL[playerHand.category]}`;
      chipsWon = half;
    } else if (winner === 'player') {
      state.player.chips += state.pot;
      chipsWon = state.pot;
      summary = `You win ${chipsWon} with ${HAND_CATEGORY_LABEL[playerHand.category]}`;
    } else {
      state.ai.chips += state.pot;
      chipsWon = state.pot;
      summary = `AI wins ${chipsWon} with ${HAND_CATEGORY_LABEL[aiHand.category]}`;
    }

    state.handOver = true;
    state.toAct = null;
    state.result = {
      winner,
      playerHand,
      aiHand,
      revealAi: true,
      chipsWon,
      summary,
    };
    log('system', summary);
  }

  /** After both players have committed equal and at least one full action cycle, advance. */
  function bothSettled(): boolean {
    const p = state.player;
    const a = state.ai;
    if (p.hasFolded || a.hasFolded) return true;
    if (p.committed !== a.committed) return false;

    // At least one action must have occurred OR we reached check-check.
    // We track via `toAct === null` meaning the current betting round closed.
    return state.toAct === null;
  }

  function passTurnAfterAction(actor: Actor) {
    const other: Actor = actor === 'player' ? 'ai' : 'player';
    if (state[other].hasFolded) {
      state.toAct = null;
      return;
    }
    // If both committed equal AND opponent has acted at least once this round,
    // the round is closed.
    if (state.player.committed === state.ai.committed && roundClosed(actor)) {
      state.toAct = null;
      return;
    }
    state.toAct = other;
  }

  // Track who has acted this round to know when checks settle
  let actedThisRound: Set<Actor> = new Set();

  function roundClosed(lastActor: Actor): boolean {
    actedThisRound.add(lastActor);
    // Round closes when both have acted and committed amounts are equal
    return actedThisRound.has('player') && actedThisRound.has('ai');
  }

  function resetActedThisRound() {
    actedThisRound = new Set();
  }

  function bettingClosed(): boolean {
    // Either player all-in with the other matched → no more bets possible
    if (state.player.hasFolded || state.ai.hasFolded) return true;
    if (state.player.committed !== state.ai.committed) return false;
    return state.player.isAllIn || state.ai.isAllIn;
  }

  function advanceIfReady() {
    if (state.handOver) return;
    if (state.player.hasFolded) {
      settleByFold('ai');
      return;
    }
    if (state.ai.hasFolded) {
      settleByFold('player');
      return;
    }
    if (!bothSettled()) return;

    // If river betting is settled, go to showdown.
    if (state.stage === 'river') {
      settleShowdown();
      return;
    }

    // Advance one street.
    resetActedThisRound();
    dealStreet();

    // If betting can no longer happen (all-in matched), fast-forward to showdown.
    while (bettingClosed() && (state.stage as Stage) !== 'river') {
      resetActedThisRound();
      dealStreet();
    }
    if (bettingClosed() && (state.stage as Stage) === 'river') {
      settleShowdown();
    }
  }

  function legalActions(actor: Actor) {
    const me = state[actor];
    const toCall = state.currentBet - me.committed;
    const canCheck = toCall === 0 && !me.hasFolded && !me.isAllIn;
    const canCall = toCall > 0 && me.chips > 0;
    const minBet = state.bigBlind;
    const minRaiseTo = state.currentBet + Math.max(state.bigBlind, state.currentBet);
    const maxBetTo = me.committed + me.chips;
    const canBet = state.currentBet === 0 && me.chips > 0;
    const canRaise = state.currentBet > 0 && me.chips - toCall > 0;
    const canFold = !me.hasFolded;
    return {
      canCheck,
      canCall,
      callAmount: Math.max(0, Math.min(toCall, me.chips)),
      minBet,
      minRaiseTo,
      maxBetTo,
      canBet,
      canRaise,
      canFold,
    };
  }

  function apply(actor: Actor, action: PlayerAction): boolean {
    if (state.handOver) return false;
    if (state.toAct !== actor) return false;
    const me = state[actor];

    switch (action.kind) {
      case 'fold': {
        me.hasFolded = true;
        log(actor, 'folds');
        state.toAct = null;
        return true;
      }
      case 'check': {
        if (state.currentBet !== me.committed) return false;
        log(actor, 'checks');
        passTurnAfterAction(actor);
        return true;
      }
      case 'call': {
        const toCall = state.currentBet - me.committed;
        if (toCall <= 0) return false;
        const amount = Math.min(toCall, me.chips);
        me.chips -= amount;
        me.committed += amount;
        state.pot += amount;
        if (me.chips === 0) me.isAllIn = true;
        log(actor, `calls ${amount}`);
        passTurnAfterAction(actor);
        return true;
      }
      case 'bet': {
        if (state.currentBet !== 0) return false;
        if (action.amount <= 0) return false;
        const amount = Math.min(action.amount, me.chips);
        me.chips -= amount;
        me.committed += amount;
        state.pot += amount;
        state.currentBet = me.committed;
        if (me.chips === 0) me.isAllIn = true;
        log(actor, `bets ${amount}`);
        // After a bet, opponent must respond
        const other: Actor = actor === 'player' ? 'ai' : 'player';
        actedThisRound.add(actor);
        actedThisRound.delete(other);
        state.toAct = other;
        return true;
      }
      case 'raise': {
        const toAmount = action.toAmount;
        if (toAmount <= state.currentBet) return false;
        const delta = toAmount - me.committed;
        if (delta > me.chips) return false;
        me.chips -= delta;
        me.committed += delta;
        state.pot += delta;
        state.currentBet = me.committed;
        if (me.chips === 0) me.isAllIn = true;
        log(actor, `raises to ${toAmount}`);
        const other: Actor = actor === 'player' ? 'ai' : 'player';
        actedThisRound.add(actor);
        actedThisRound.delete(other);
        state.toAct = other;
        return true;
      }
    }
    return false;
  }

  return { state, startHand, apply, advanceIfReady, legalActions };
}
