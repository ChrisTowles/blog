<script setup lang="ts">
import type { Finger, Hand } from '~~/shared/typing-types';
import type { KeyboardHint } from '../../composables/useVirtualKeyboard';

defineProps<{
  hint: KeyboardHint | null;
}>();

const LEFT_FINGERS: ReadonlyArray<{ id: Finger; label: string }> = [
  { id: 'lp', label: 'pinky' },
  { id: 'lr', label: 'ring' },
  { id: 'lm', label: 'middle' },
  { id: 'li', label: 'index' },
];

const RIGHT_FINGERS: ReadonlyArray<{ id: Finger; label: string }> = [
  { id: 'ri', label: 'index' },
  { id: 'rm', label: 'middle' },
  { id: 'rr', label: 'ring' },
  { id: 'rp', label: 'pinky' },
];

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

function isActive(hint: KeyboardHint | null, hand: Hand, finger: Finger) {
  if (!hint) return false;
  if (hint.finger === 'thumb') return finger === 'thumb';
  return hint.hand === hand && hint.finger === finger;
}
</script>

<template>
  <div
    class="flex items-end justify-center gap-8 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
    aria-label="Hand hint"
  >
    <div class="flex flex-col items-center gap-2">
      <div class="flex items-end gap-1">
        <div
          v-for="f in LEFT_FINGERS"
          :key="f.id"
          :class="[
            'h-12 w-6 rounded-t-full transition-all',
            FINGER_BG[f.id],
            isActive(hint, 'left', f.id)
              ? 'h-16 ring-4 ring-amber-400 dark:ring-amber-500'
              : 'opacity-70',
          ]"
        />
      </div>
      <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Left</div>
    </div>

    <div
      :class="[
        'mb-4 flex h-8 w-16 items-center justify-center rounded-full text-xs uppercase tracking-wide transition-all',
        FINGER_BG.thumb,
        hint?.finger === 'thumb' ? 'ring-4 ring-amber-400 dark:ring-amber-500' : 'opacity-70',
      ]"
    >
      thumb
    </div>

    <div class="flex flex-col items-center gap-2">
      <div class="flex items-end gap-1">
        <div
          v-for="f in RIGHT_FINGERS"
          :key="f.id"
          :class="[
            'h-12 w-6 rounded-t-full transition-all',
            FINGER_BG[f.id],
            isActive(hint, 'right', f.id)
              ? 'h-16 ring-4 ring-amber-400 dark:ring-amber-500'
              : 'opacity-70',
          ]"
        />
      </div>
      <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Right</div>
    </div>
  </div>
</template>
