<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'submit', dataUrl: string): void }>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const { hasDrawing, prepare, start, move, end, clear, toDataUrl } = useCanvasExport(canvasRef);

const SOFT_LIMIT = 120;
const secondsLeft = ref(SOFT_LIMIT);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  prepare();
  timer = setInterval(() => {
    if (secondsLeft.value > 0) secondsLeft.value--;
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function done() {
  emit('submit', toDataUrl());
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Draw a clock</h2>
          <p class="mt-1 text-sm text-(--ui-text-muted)">
            Draw a round clock face, put in all the numbers, and set the hands to
            <strong>ten past eleven</strong> (10 minutes past 11).
          </p>
        </div>
        <span
          class="shrink-0 rounded-lg bg-(--ui-bg-elevated) px-3 py-1 font-mono text-sm tabular-nums"
          :class="secondsLeft <= 15 ? 'text-(--ui-error)' : 'text-(--ui-text-muted)'"
        >
          {{ Math.floor(secondsLeft / 60) }}:{{ (secondsLeft % 60).toString().padStart(2, '0') }}
        </span>
      </div>
    </template>

    <div class="flex justify-center">
      <canvas
        ref="canvasRef"
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.CLOCK_CANVAS"
        width="600"
        height="600"
        class="aspect-square w-full max-w-md touch-none rounded-xl border-2 border-(--ui-border) bg-white"
        aria-label="Clock drawing canvas"
        @mousedown="start"
        @mousemove="move"
        @mouseup="end"
        @mouseleave="end"
        @touchstart.prevent="start"
        @touchmove.prevent="move"
        @touchend.prevent="end"
      />
    </div>

    <template #footer>
      <div class="flex items-center gap-3">
        <UButton
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.CLOCK_CLEAR"
          variant="soft"
          color="neutral"
          icon="i-lucide-eraser"
          label="Clear"
          @click="clear"
        />
        <UButton
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.CLOCK_SUBMIT"
          :disabled="!hasDrawing"
          size="lg"
          icon="i-lucide-check"
          label="Done — this is my clock"
          @click="done"
        />
        <span v-if="secondsLeft === 0" class="text-xs text-(--ui-text-muted)">
          Time's up — submit whenever you're ready.
        </span>
      </div>
    </template>
  </UCard>
</template>
