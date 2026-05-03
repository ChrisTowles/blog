import { reactive, ref, computed } from 'vue';
import { createEngine, freshGameState, type PokerEngine } from '~/utils/poker/engine';
import { decideAi } from '~/utils/poker/ai';
import { HAND_CATEGORY_LABEL, type GameState, type PlayerAction } from '~/utils/poker/types';
import { usePokerBanter } from '~/composables/usePokerBanter';
import type { BanterEvent } from '~~/shared/poker/personas';
import { DEFAULT_PERSONA_ID } from '~~/shared/poker/personas';

/**
 * Drives a single PokerEngine instance and orchestrates the AI's turn.
 * Also fires banter triggers on meaningful game events.
 */
export function usePokerGame() {
  const stateRef = reactive<GameState>(freshGameState());
  const engine: PokerEngine = createEngine({ state: stateRef });
  const aiThinking = ref(false);
  const personaId = ref(DEFAULT_PERSONA_ID);
  const banter = usePokerBanter(() => personaId.value);

  function situation(): string {
    return [
      `stage=${stateRef.stage}`,
      `pot=${stateRef.pot}`,
      `ai_chips=${stateRef.ai.chips}`,
      `player_chips=${stateRef.player.chips}`,
      `to_call=${stateRef.currentBet - stateRef.ai.committed}`,
      `community=${stateRef.community.length}`,
    ].join(' ');
  }

  function fire(event: BanterEvent, extra = '') {
    void banter.trigger(event, `${situation()}${extra ? ' | ' + extra : ''}`);
  }

  function newHand() {
    if (stateRef.player.chips <= 0 || stateRef.ai.chips <= 0) {
      stateRef.player.chips = 1000;
      stateRef.ai.chips = 1000;
    }
    banter.clear();
    engine.startHand();
    fire('hand-start');
    void maybeAiAct();
  }

  async function maybeAiAct() {
    while (stateRef.toAct === 'ai' && !stateRef.handOver) {
      aiThinking.value = true;
      await new Promise<void>((r) => setTimeout(r, 700));
      const action = decideAi({ state: stateRef });
      const ok = engine.apply('ai', action);
      if (!ok) {
        engine.apply('ai', {
          kind: stateRef.currentBet - stateRef.ai.committed > 0 ? 'fold' : 'check',
        });
      }
      // Trigger banter for AI actions before the state advances to a new street.
      switch (action.kind) {
        case 'bet':
          fire('ai-bet', `bet=${action.amount}`);
          break;
        case 'raise':
          fire('ai-raise', `raise_to=${action.toAmount}`);
          break;
        case 'call':
          fire('ai-call');
          break;
        case 'check':
          fire('ai-check');
          break;
        case 'fold':
          fire('ai-fold');
          break;
      }
      engine.advanceIfReady();
      aiThinking.value = false;
      maybeFireResult();
      if (stateRef.toAct === 'ai' && !stateRef.handOver) {
        await new Promise<void>((r) => setTimeout(r, 400));
      }
    }
  }

  function maybeFireResult() {
    if (!stateRef.handOver || !stateRef.result) return;
    const r = stateRef.result;
    if (r.winner === 'split') {
      fire('split');
      return;
    }
    if (r.winner === 'ai') {
      fire(
        r.revealAi ? 'win-showdown' : 'win-fold',
        r.aiHand ? `ai_hand=${HAND_CATEGORY_LABEL[r.aiHand.category]}` : '',
      );
    } else {
      fire(
        'lose-showdown',
        r.playerHand ? `player_hand=${HAND_CATEGORY_LABEL[r.playerHand.category]}` : '',
      );
    }
  }

  async function playerAct(action: PlayerAction) {
    if (stateRef.toAct !== 'player' || stateRef.handOver) return;
    const ok = engine.apply('player', action);
    if (!ok) return;
    // Trigger banter for player actions
    switch (action.kind) {
      case 'bet':
        fire(stateRef.player.chips === 0 ? 'player-all-in' : 'player-bet', `bet=${action.amount}`);
        break;
      case 'raise':
        fire(
          stateRef.player.chips === 0 ? 'player-all-in' : 'player-raise',
          `raise_to=${action.toAmount}`,
        );
        break;
      case 'fold':
        fire('player-fold');
        break;
    }
    engine.advanceIfReady();
    maybeFireResult();
    await maybeAiAct();
  }

  const playerLegal = computed(() => engine.legalActions('player'));
  const matchOver = computed(() => stateRef.player.chips <= 0 || stateRef.ai.chips <= 0);

  return {
    state: stateRef,
    aiThinking,
    playerLegal,
    matchOver,
    personaId,
    banter,
    newHand,
    playerAct,
  };
}
