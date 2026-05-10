<script setup lang="ts">
import type { Finger } from '~~/shared/typing-types';
import type { KeyboardHint } from '../../composables/useVirtualKeyboard';

defineProps<{
  hint: KeyboardHint | null;
  /** Briefly true after a wrong keystroke. Pulses the spotlight red. */
  wrongFlash?: boolean;
}>();

// Same finger palette as VirtualKeyboard / HandHint so the kid can
// connect the spotlight, the keyboard key, and the hand at a glance.
const FINGER_BG: Record<Finger, string> = {
  lp: 'bg-rose-300 dark:bg-rose-700',
  lr: 'bg-amber-300 dark:bg-amber-700',
  lm: 'bg-emerald-300 dark:bg-emerald-700',
  li: 'bg-sky-300 dark:bg-sky-700',
  thumb: 'bg-slate-300 dark:bg-slate-600',
  ri: 'bg-sky-300 dark:bg-sky-700',
  rm: 'bg-emerald-300 dark:bg-emerald-700',
  rr: 'bg-amber-300 dark:bg-amber-700',
  rp: 'bg-rose-300 dark:bg-rose-700',
};

const FINGER_LABEL: Record<Finger, string> = {
  lp: 'pinky',
  lr: 'ring finger',
  lm: 'middle finger',
  li: 'index finger',
  thumb: 'thumb',
  ri: 'index finger',
  rm: 'middle finger',
  rr: 'ring finger',
  rp: 'pinky',
};
</script>

<template>
  <div
    v-if="hint"
    :class="[
      'flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-colors',
      wrongFlash
        ? 'animate-pulse border-rose-500 bg-rose-100 dark:border-rose-400 dark:bg-rose-950/60'
        : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60',
    ]"
  >
    <div class="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {{ wrongFlash ? 'Try again — type this letter' : 'Type this letter' }}
    </div>
    <div
      :class="[
        'flex h-32 w-32 items-center justify-center rounded-2xl font-mono text-7xl font-extrabold uppercase shadow-md transition-transform',
        FINGER_BG[hint.finger],
        wrongFlash ? 'scale-105 ring-4 ring-rose-500' : 'ring-4 ring-amber-400 dark:ring-amber-500',
      ]"
    >
      {{ hint.nextKey === ' ' ? '␣' : hint.nextKey }}
    </div>
    <div class="text-base font-semibold text-slate-800 dark:text-slate-200">
      {{ hint.hand === 'left' ? 'Left' : 'Right' }} {{ FINGER_LABEL[hint.finger] }}
    </div>
    <div v-if="hint.shiftRequired" class="text-sm text-amber-700 dark:text-amber-300">
      Hold <span class="font-mono font-semibold">Shift</span> + the key
    </div>
  </div>
</template>
