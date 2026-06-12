<script setup lang="ts">
import type { KeyboardHint } from '../../composables/useVirtualKeyboard';
import { FINGER_BG_SOFT, FINGER_LABEL } from '../../utils/typing/finger-colors';

defineProps<{
  hint: KeyboardHint | null;
  /** Briefly true after a wrong keystroke. Pulses the spotlight red. */
  wrongFlash?: boolean;
  /**
   * Increments on every correct keystroke. Bound via `:key` to the
   * animated nodes so the pop and +1 keyframes re-run even when the
   * next letter is the same as the previous one (e.g. "ffff").
   */
  pressTick?: number;
  /** Increments at every milestone (3, 6, 9, ...). Drives the burst remount. */
  tierUp?: number;
}>();
</script>

<template>
  <div
    v-if="hint"
    :class="[
      'relative flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-colors',
      wrongFlash
        ? 'animate-pulse border-rose-500 bg-rose-100 dark:border-rose-400 dark:bg-rose-950/60'
        : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60',
    ]"
  >
    <TypingStreakBurst v-if="(tierUp ?? 0) > 0" :key="`burst-${tierUp}`" />

    <div class="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
      <template v-if="hint.nextKey === ' '">
        {{ wrongFlash ? 'Try again — press the space bar' : 'Press the space bar' }}
      </template>
      <template v-else>
        {{ wrongFlash ? 'Try again — type this letter' : 'Type this letter' }}
      </template>
    </div>
    <div
      :key="pressTick ?? 0"
      :class="[
        'letter-tile relative flex h-32 w-32 items-center justify-center rounded-2xl font-mono text-7xl font-extrabold uppercase shadow-md lg:h-44 lg:w-44 lg:text-8xl',
        FINGER_BG_SOFT[hint.finger],
        wrongFlash ? 'scale-105 ring-4 ring-rose-500' : 'ring-4 ring-amber-400 dark:ring-amber-500',
      ]"
    >
      <!-- Spaces render as a spacebar-shaped bar — the '␣' glyph reads as
           a lowercase "u" and sends kids hunting for a u key. -->
      <span
        v-if="hint.nextKey === ' '"
        class="h-4 w-24 rounded-full bg-current opacity-70 lg:h-5 lg:w-32"
      ></span>
      <template v-else>{{ hint.nextKey }}</template>
      <span
        v-if="!wrongFlash && (pressTick ?? 0) > 0"
        :key="`plus-${pressTick}`"
        class="plus-one pointer-events-none absolute -right-3 top-2 select-none font-mono text-2xl font-extrabold text-emerald-500 dark:text-emerald-400"
        aria-hidden="true"
      >
        +1
      </span>
    </div>
    <div class="text-base font-semibold text-slate-800 dark:text-slate-200">
      <template v-if="hint.nextKey === ' '">the long bar — use your thumb</template>
      <template v-else>
        {{ hint.hand === 'left' ? 'Left' : 'Right' }} {{ FINGER_LABEL[hint.finger] }}
      </template>
    </div>
    <div v-if="hint.shiftRequired" class="text-sm text-amber-700 dark:text-amber-300">
      Hold <span class="font-mono font-semibold">Shift</span> + the key
    </div>
  </div>
</template>

<style scoped>
@keyframes letter-pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.18);
  }
  100% {
    transform: scale(1);
  }
}
.letter-tile {
  /* Keyed remount on pressTick re-runs this animation each press. */
  animation: letter-pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes plus-one-float {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-2.25rem);
  }
}
.plus-one {
  animation: plus-one-float 700ms ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .letter-tile,
  .plus-one {
    animation: none;
  }
}
</style>
