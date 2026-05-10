<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { GameResult, GameScene } from '../../../composables/useGameRunner';

const props = defineProps<{
  scene: GameScene;
  slug: 'letter-rain' | 'letter-tic-tac-toe' | 'lake-leap';
}>();

const emit = defineEmits<{
  (e: 'result', result: GameResult): void;
}>();

const containerRef = ref<HTMLDivElement | null>(null);

useGameRunner({
  containerRef,
  scene: props.scene,
  onResult: (r) => emit('result', r),
});

const testId = computed(() => {
  if (props.slug === 'letter-rain') return TEST_IDS.TYPING.GAME_LETTER_RAIN;
  if (props.slug === 'letter-tic-tac-toe') return TEST_IDS.TYPING.GAME_TIC_TAC_TOE;
  return TEST_IDS.TYPING.GAME_LAKE_LEAP;
});
</script>

<template>
  <div
    :data-testid="TEST_IDS.TYPING.GAME_STAGE"
    class="rounded-xl border border-slate-200 bg-slate-900 p-2 shadow-sm dark:border-slate-700"
  >
    <div ref="containerRef" :data-testid="testId" class="game-canvas" />
  </div>
</template>

<style scoped>
.game-canvas {
  width: 100%;
  height: 600px;
  border-radius: 0.75rem;
  overflow: hidden;
}
</style>
