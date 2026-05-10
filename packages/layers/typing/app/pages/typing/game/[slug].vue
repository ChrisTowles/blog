<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { GameResult, GameScene } from '../../../composables/useGameRunner';
import { createLetterRain } from '../../../components/typing/games/LetterRain';
import { createLetterTicTacToe } from '../../../components/typing/games/LetterTicTacToe';
import { createLakeLeap } from '../../../components/typing/games/LakeLeap';
import { unlockedKeysForStage } from '../../../../server/utils/typing/curriculum';
import type { LakeLeapMode } from '../../../utils/typing/games/lake-leap';

definePageMeta({
  layout: 'typing',
});

const route = useRoute();
const slug = computed(() => String(route.params.slug ?? ''));
const stage = computed(() => Number(route.query.stage ?? 5));
const mode = computed<LakeLeapMode>(
  () => (route.query.mode as LakeLeapMode | undefined) ?? 'curriculum',
);
const sourceWords = computed(() => {
  const raw = route.query.words;
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === 'string' && raw.length > 0) {
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  }
  return [];
});

useHead(() => ({
  title: `Typing — ${slug.value}`,
}));

const scene = computed<GameScene | null>(() => {
  const unlocked = unlockedKeysForStage(stage.value).filter((c) => /^[a-z]$/.test(c));
  if (slug.value === 'letter-rain') {
    return createLetterRain({
      letters: unlocked.length > 0 ? unlocked : undefined,
    });
  }
  if (slug.value === 'letter-tic-tac-toe') {
    const cells = (unlocked.length >= 9 ? unlocked.slice(0, 9) : unlocked).slice();
    return createLetterTicTacToe({ stage: stage.value, letters: cells });
  }
  if (slug.value === 'lake-leap') {
    return createLakeLeap({
      mode: mode.value,
      source: sourceWords.value,
      count: 10,
    });
  }
  return null;
});

const { recordGameAttempt } = useTypingProgress();
const lastResult = ref<GameResult | null>(null);

function onResult(result: GameResult) {
  lastResult.value = result;
  recordGameAttempt({
    gameSlug: result.gameSlug,
    wpm: result.wpm,
    netWpm: result.netWpm,
    accuracy: result.accuracy,
    durationMs: result.durationMs,
    errorsByKey: result.errorsByKey,
    completedAt: new Date().toISOString(),
  });
}
</script>

<template>
  <div class="space-y-4">
    <header class="flex items-baseline justify-between gap-4">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
        {{ slug.replaceAll('-', ' ') }}
      </h1>
      <NuxtLink
        to="/typing"
        class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        &larr; Lessons
      </NuxtLink>
    </header>

    <ClientOnly>
      <TypingGamesGameStage
        v-if="scene"
        :slug="slug as 'letter-rain' | 'letter-tic-tac-toe' | 'lake-leap'"
        :scene="scene"
        @result="onResult"
      />
      <p
        v-else
        :data-testid="TEST_IDS.TYPING.GAME_STAGE"
        class="rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
      >
        Unknown game.
      </p>
    </ClientOnly>

    <div
      v-if="lastResult"
      class="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
    >
      Recorded. {{ Math.round(lastResult.wpm) }} WPM · {{ Math.round(lastResult.accuracy * 100) }}%
      accuracy.
    </div>
  </div>
</template>
