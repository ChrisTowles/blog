<script setup lang="ts">
import type { Finger } from '~~/shared/typing-types';
import type { KeyboardHint } from '../../composables/useVirtualKeyboard';

defineProps<{
  hint: KeyboardHint | null;
}>();

type Row = ReadonlyArray<{ key: string; w?: number; label?: string }>;

const ROWS: ReadonlyArray<Row> = [
  [
    { key: '1' },
    { key: '2' },
    { key: '3' },
    { key: '4' },
    { key: '5' },
    { key: '6' },
    { key: '7' },
    { key: '8' },
    { key: '9' },
    { key: '0' },
  ],
  [
    { key: 'q' },
    { key: 'w' },
    { key: 'e' },
    { key: 'r' },
    { key: 't' },
    { key: 'y' },
    { key: 'u' },
    { key: 'i' },
    { key: 'o' },
    { key: 'p' },
  ],
  [
    { key: 'a' },
    { key: 's' },
    { key: 'd' },
    { key: 'f' },
    { key: 'g' },
    { key: 'h' },
    { key: 'j' },
    { key: 'k' },
    { key: 'l' },
    { key: ';' },
  ],
  [
    { key: 'z' },
    { key: 'x' },
    { key: 'c' },
    { key: 'v' },
    { key: 'b' },
    { key: 'n' },
    { key: 'm' },
    { key: ',' },
    { key: '.' },
    { key: '/' },
  ],
  [{ key: ' ', w: 8, label: 'space' }],
];

const FINGER_OF: Record<string, Finger> = {
  '1': 'lp',
  '2': 'lr',
  '3': 'lm',
  '4': 'li',
  '5': 'li',
  '6': 'ri',
  '7': 'ri',
  '8': 'rm',
  '9': 'rr',
  '0': 'rp',
  q: 'lp',
  w: 'lr',
  e: 'lm',
  r: 'li',
  t: 'li',
  y: 'ri',
  u: 'ri',
  i: 'rm',
  o: 'rr',
  p: 'rp',
  a: 'lp',
  s: 'lr',
  d: 'lm',
  f: 'li',
  g: 'li',
  h: 'ri',
  j: 'ri',
  k: 'rm',
  l: 'rr',
  ';': 'rp',
  z: 'lp',
  x: 'lr',
  c: 'lm',
  v: 'li',
  b: 'li',
  n: 'ri',
  m: 'ri',
  ',': 'rm',
  '.': 'rr',
  '/': 'rp',
  ' ': 'thumb',
};

const FINGER_BG: Record<Finger, string> = {
  lp: 'bg-rose-200 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100',
  lr: 'bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100',
  lm: 'bg-emerald-200 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100',
  li: 'bg-sky-200 dark:bg-sky-900/40 text-sky-900 dark:text-sky-100',
  thumb: 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100',
  ri: 'bg-sky-200 dark:bg-sky-900/40 text-sky-900 dark:text-sky-100',
  rm: 'bg-emerald-200 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100',
  rr: 'bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100',
  rp: 'bg-rose-200 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100',
};
</script>

<template>
  <div
    class="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3 shadow-inner dark:border-slate-700 dark:bg-slate-900/60"
    aria-label="Virtual keyboard"
  >
    <div v-for="(row, rIdx) in ROWS" :key="rIdx" class="flex justify-center gap-1">
      <button
        v-for="cell in row"
        :key="cell.key"
        type="button"
        tabindex="-1"
        :class="[
          'flex h-10 select-none items-center justify-center rounded-md border border-slate-300 font-mono text-sm font-semibold uppercase shadow-sm transition-all dark:border-slate-700',
          FINGER_BG[FINGER_OF[cell.key] ?? 'thumb'],
          hint && hint.expected === cell.key
            ? 'scale-110 ring-4 ring-amber-400 dark:ring-amber-500'
            : 'opacity-90',
        ]"
        :style="{ width: `${(cell.w ?? 1) * 2.25}rem` }"
      >
        {{ cell.label ?? cell.key }}
      </button>
    </div>
    <div
      v-if="hint?.shiftRequired"
      class="pt-1 text-center text-xs text-amber-700 dark:text-amber-300"
    >
      Hold <span class="font-mono font-semibold">Shift</span> for
      <span class="font-mono font-semibold">{{ hint.nextKey }}</span>
    </div>
  </div>
</template>
