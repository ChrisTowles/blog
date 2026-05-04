<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import PokerTable from '~/components/poker/PokerTable.vue';
import { HAND_CATEGORY_LABEL } from '~/utils/poker/types';
import { POKER_PERSONAS, getPersona } from '~~/shared/poker/personas';

useSeoMeta({
  title: 'Poker — Heads-Up vs the Computer',
  description: "Play heads-up Texas Hold'em against an AI opponent. Built with PixiJS v8.",
});

definePageMeta({
  layout: 'default',
});

const { state, playerLegal, matchOver, personaId, banter, newHand, playerAct } = usePokerGame();
const currentPersona = computed(() => getPersona(personaId.value));

const betAmount = ref(0);
const minBetSlider = computed(() => Math.max(state.bigBlind, playerLegal.value.minBet));
const maxBetSlider = computed(() => playerLegal.value.maxBetTo - state.player.committed);
const minRaiseToSlider = computed(() => playerLegal.value.minRaiseTo);
const maxRaiseToSlider = computed(() => playerLegal.value.maxBetTo);

watch(
  () => [state.toAct, state.currentBet, state.stage] as const,
  () => {
    if (state.toAct === 'player') {
      if (state.currentBet === 0) {
        const pot = state.pot || state.bigBlind * 2;
        betAmount.value = Math.min(maxBetSlider.value, Math.max(minBetSlider.value, pot));
      } else {
        const desired = Math.round(state.currentBet * 2.5);
        betAmount.value = Math.min(
          maxRaiseToSlider.value,
          Math.max(minRaiseToSlider.value, desired),
        );
      }
    }
  },
  { immediate: true },
);

function startMatch() {
  newHand();
}

function nextHand() {
  newHand();
}

function fold() {
  playerAct({ kind: 'fold' });
}
function check() {
  playerAct({ kind: 'check' });
}
function call() {
  playerAct({ kind: 'call' });
}
function bet() {
  playerAct({ kind: 'bet', amount: betAmount.value });
}
function raise() {
  playerAct({ kind: 'raise', toAmount: betAmount.value });
}
function allIn() {
  if (state.currentBet === 0) {
    playerAct({ kind: 'bet', amount: state.player.chips });
  } else {
    playerAct({ kind: 'raise', toAmount: state.player.committed + state.player.chips });
  }
}

const hasStarted = computed(() => state.handNumber > 0);
const showResult = computed(() => state.handOver && !!state.result);

const recentLog = computed(() => state.log.slice(-12));
</script>

<template>
  <div class="poker-page" :data-testid="TEST_IDS.POKER.PAGE">
    <UContainer class="py-8">
      <div class="text-center mb-6">
        <h1 class="text-3xl font-bold text-(--ui-text-highlighted)">Heads-Up Hold'em</h1>
        <p class="text-sm text-(--ui-text-muted) mt-1">
          You vs. the computer. No-limit Texas Hold'em. Stacks reset at 1000.
          <NuxtLink to="/poker/decks" class="text-(--ui-primary) underline ml-2">
            View decks →
          </NuxtLink>
        </p>
      </div>

      <div class="grid lg:grid-cols-[1fr_320px] gap-6">
        <div class="relative">
          <PokerTable :state="state" :reveal-ai="state.result?.revealAi ?? false" />

          <!-- Start overlay (persona picker) -->
          <div
            v-if="!hasStarted"
            class="absolute inset-0 flex items-center justify-center bg-black/55 rounded-2xl backdrop-blur-sm p-4"
          >
            <div class="text-center max-w-md w-full">
              <h2 class="text-2xl font-bold text-white mb-1">Pick your opponent</h2>
              <p class="text-xs text-zinc-300 mb-4">
                Each persona plays the same; only the trash-talk changes.
              </p>
              <div
                class="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4"
                :data-testid="TEST_IDS.POKER.PERSONA_GRID"
              >
                <button
                  v-for="p in POKER_PERSONAS"
                  :key="p.id"
                  type="button"
                  class="rounded-lg p-2 text-left border transition-colors"
                  :class="
                    personaId === p.id
                      ? 'bg-(--ui-primary)/20 border-(--ui-primary) text-white'
                      : 'bg-black/30 border-white/10 text-zinc-200 hover:bg-black/50'
                  "
                  :data-testid="`${TEST_IDS.POKER.PERSONA_OPTION}-${p.id}`"
                  @click="personaId = p.id"
                >
                  <div class="flex items-center gap-2">
                    <UIcon :name="p.icon" class="size-5 shrink-0" />
                    <span class="font-semibold text-sm">{{ p.name }}</span>
                  </div>
                  <div class="text-[11px] text-zinc-400 mt-1 leading-tight">
                    {{ p.tagline }}
                  </div>
                </button>
              </div>
              <UButton
                size="xl"
                color="primary"
                :data-testid="TEST_IDS.POKER.START_BUTTON"
                @click="startMatch"
              >
                Deal first hand vs. {{ currentPersona.name }}
              </UButton>
            </div>
          </div>

          <!-- Speech bubble (banter) — top-right corner of the felt -->
          <Transition name="banter">
            <div
              v-if="hasStarted && !showResult && banter.currentLine.value"
              class="absolute top-3 right-3 max-w-[220px] rounded-2xl bg-white/95 text-zinc-900 px-3 py-2 text-xs shadow-lg border border-zinc-200 z-10 pointer-events-none backdrop-blur-sm"
              :data-testid="TEST_IDS.POKER.BANTER_BUBBLE"
            >
              <div
                class="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold mb-0.5 flex items-center gap-1"
              >
                <UIcon :name="currentPersona.icon" class="size-3" />
                {{ currentPersona.name }}
              </div>
              <div class="leading-snug">
                {{ banter.currentLine.value.text }}
              </div>
              <!-- Tail pointing down-left toward the AI seat -->
              <div
                class="absolute -bottom-1.5 left-6 w-3 h-3 bg-white/95 border-r border-b border-zinc-200 rotate-45"
              />
            </div>
          </Transition>

          <!-- Hand result overlay -->
          <div
            v-if="hasStarted && showResult"
            class="absolute inset-x-0 bottom-24 mx-auto max-w-md rounded-xl bg-black/70 text-white p-4 text-center backdrop-blur-sm"
            :data-testid="TEST_IDS.POKER.RESULT"
          >
            <div class="text-lg font-bold">
              {{ state.result?.summary }}
            </div>
            <div
              v-if="state.result?.playerHand && state.result?.aiHand"
              class="text-xs text-zinc-300 mt-1"
            >
              You: {{ HAND_CATEGORY_LABEL[state.result.playerHand.category] }} · AI:
              {{ HAND_CATEGORY_LABEL[state.result.aiHand.category] }}
            </div>
            <UButton
              v-if="!matchOver"
              class="mt-3"
              color="primary"
              :data-testid="TEST_IDS.POKER.NEXT_HAND"
              @click="nextHand"
            >
              Next hand →
            </UButton>
            <UButton v-else class="mt-3" color="primary" @click="nextHand">
              Reset stacks · new match
            </UButton>
          </div>
        </div>

        <div class="flex flex-col gap-4">
          <!-- Action panel -->
          <div
            v-if="hasStarted && !showResult"
            class="rounded-xl border border-(--ui-border) p-4 bg-(--ui-bg-elevated)"
          >
            <div class="text-xs uppercase tracking-wider text-(--ui-text-muted) mb-2">
              Your action
            </div>

            <div
              v-if="state.toAct === 'player'"
              class="space-y-3"
              :data-testid="TEST_IDS.POKER.ACTION_PANEL"
            >
              <div class="grid grid-cols-2 gap-2">
                <UButton
                  block
                  color="error"
                  variant="soft"
                  :disabled="!playerLegal.canFold"
                  :data-testid="TEST_IDS.POKER.FOLD"
                  @click="fold"
                >
                  Fold
                </UButton>
                <UButton
                  v-if="playerLegal.canCheck"
                  block
                  color="neutral"
                  variant="soft"
                  :data-testid="TEST_IDS.POKER.CHECK"
                  @click="check"
                >
                  Check
                </UButton>
                <UButton
                  v-else
                  block
                  color="info"
                  variant="soft"
                  :disabled="!playerLegal.canCall"
                  :data-testid="TEST_IDS.POKER.CALL"
                  @click="call"
                >
                  Call {{ playerLegal.callAmount }}
                </UButton>
              </div>

              <div v-if="playerLegal.canBet || playerLegal.canRaise" class="space-y-2">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-(--ui-text-muted)">
                    {{ playerLegal.canBet ? 'Bet' : 'Raise to' }}
                  </span>
                  <span class="font-mono font-semibold">{{ betAmount }}</span>
                </div>
                <input
                  v-model.number="betAmount"
                  type="range"
                  :min="playerLegal.canBet ? minBetSlider : minRaiseToSlider"
                  :max="playerLegal.canBet ? maxBetSlider : maxRaiseToSlider"
                  step="5"
                  class="w-full accent-(--ui-primary)"
                  :data-testid="TEST_IDS.POKER.BET_SLIDER"
                />
                <div class="grid grid-cols-3 gap-2">
                  <UButton
                    v-if="playerLegal.canBet"
                    block
                    color="primary"
                    :data-testid="TEST_IDS.POKER.BET"
                    @click="bet"
                  >
                    Bet {{ betAmount }}
                  </UButton>
                  <UButton
                    v-else
                    block
                    color="primary"
                    :data-testid="TEST_IDS.POKER.RAISE"
                    @click="raise"
                  >
                    Raise to {{ betAmount }}
                  </UButton>
                  <UButton block color="warning" variant="soft" @click="allIn"> All-in </UButton>
                </div>
              </div>
            </div>

            <div v-else class="text-(--ui-text-muted) italic text-sm">Waiting for AI…</div>
          </div>

          <!-- Stage / blinds -->
          <div class="rounded-xl border border-(--ui-border) p-4 bg-(--ui-bg-elevated) text-sm">
            <div class="flex justify-between mb-1">
              <span class="text-(--ui-text-muted)">Opponent</span>
              <span class="font-semibold flex items-center gap-1.5">
                <UIcon :name="currentPersona.icon" class="size-4" />
                {{ currentPersona.name }}
              </span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-(--ui-text-muted)">Hand</span>
              <span class="font-mono">#{{ state.handNumber }}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-(--ui-text-muted)">Stage</span>
              <span class="font-mono uppercase">{{ state.stage }}</span>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-(--ui-text-muted)">Blinds</span>
              <span class="font-mono">{{ state.smallBlind }} / {{ state.bigBlind }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-(--ui-text-muted)">Dealer</span>
              <span class="font-mono">{{
                state.dealer === 'player' ? 'You (SB)' : 'AI (SB)'
              }}</span>
            </div>
          </div>

          <!-- Action log -->
          <div class="rounded-xl border border-(--ui-border) p-4 bg-(--ui-bg-elevated) text-xs">
            <div class="text-xs uppercase tracking-wider text-(--ui-text-muted) mb-2">
              Action log
            </div>
            <ol class="space-y-0.5 font-mono">
              <li
                v-for="(entry, i) in recentLog"
                :key="i"
                :class="{
                  'text-(--ui-text-muted)': entry.who === 'system',
                  'text-(--ui-primary)': entry.who === 'player',
                  'text-rose-400': entry.who === 'ai',
                }"
              >
                <span v-if="entry.who === 'player'">YOU</span>
                <span v-else-if="entry.who === 'ai'">AI</span>
                <span v-else>—</span>
                <span class="ml-2">{{ entry.text }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.poker-page {
  min-height: calc(100vh - 4rem);
}

.banter-enter-active,
.banter-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}
.banter-enter-from,
.banter-leave-to {
  opacity: 0;
  transform: translate(8px, -4px);
}
</style>
