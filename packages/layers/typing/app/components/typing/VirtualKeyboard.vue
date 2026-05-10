<script setup lang="ts">
import type { Finger } from '~~/shared/typing-types';
import { FINGER_MAP, type KeyboardHint } from '../../composables/useVirtualKeyboard';
import { FINGER_BG_KEY, FINGER_BG_SOLID } from '../../utils/typing/finger-colors';

defineProps<{
  hint: KeyboardHint | null;
}>();

type Row = ReadonlyArray<{ key: string; w?: number; label?: string }>;

const HOME_ROW_KEYS = new Set(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';']);
const NUB_KEYS = new Set(['f', 'j']);

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

// One bar per finger (8 long fingers + 2 thumbs). Index fingers each
// span 2 home-row keys (F+G left, H+J right) so we render them as
// double-wide bars sitting between the two keys they cover. Widths
// are expressed in keyboard columns; gap-1 (0.25rem) between cells
// makes the total width match the 10-key home row exactly.
const HOME_FINGERS: ReadonlyArray<{ finger: Finger; cols: 1 | 2 }> = [
  { finger: 'lp', cols: 1 },
  { finger: 'lr', cols: 1 },
  { finger: 'lm', cols: 1 },
  { finger: 'li', cols: 2 },
  { finger: 'ri', cols: 2 },
  { finger: 'rm', cols: 1 },
  { finger: 'rr', cols: 1 },
  { finger: 'rp', cols: 1 },
];

function cellWidthRem(cols: 1 | 2): string {
  // 2.25rem per key + 0.25rem inter-key gap absorbed for multi-col cells.
  const total = cols * 2.25 + (cols - 1) * 0.25;
  return `${total}rem`;
}
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
          'relative flex h-10 select-none items-center justify-center rounded-md border font-mono text-sm font-semibold uppercase shadow-sm transition-all',
          HOME_ROW_KEYS.has(cell.key)
            ? 'border-2 border-slate-500 dark:border-slate-400'
            : 'border-slate-300 dark:border-slate-700',
          FINGER_BG_KEY[FINGER_MAP[cell.key] ?? 'thumb'],
          hint && hint.expected === cell.key
            ? 'scale-110 ring-4 ring-amber-400 dark:ring-amber-500'
            : 'opacity-90',
        ]"
        :style="{ width: `${(cell.w ?? 1) * 2.25}rem` }"
      >
        {{ cell.label ?? cell.key }}
        <span
          v-if="NUB_KEYS.has(cell.key)"
          aria-hidden="true"
          class="absolute bottom-1 left-1/2 h-1 w-2 -translate-x-1/2 rounded-full bg-slate-700 dark:bg-slate-200"
        />
      </button>
    </div>
    <!-- Hand strip — 8 long fingers aligned to home-row columns plus a
         single thumb centered under the space bar. Index fingers span
         two keys (F+G left, H+J right) so they render double-wide. The
         active finger pops to full opacity and grows taller with an
         amber ring. -->
    <div
      class="flex flex-col items-center gap-1 pt-2"
      aria-label="Hand position"
      role="presentation"
    >
      <div class="flex justify-center gap-1">
        <div
          v-for="cell in HOME_FINGERS"
          :key="`finger-${cell.finger}`"
          class="flex justify-center"
          :style="{ width: cellWidthRem(cell.cols) }"
        >
          <div
            :class="[
              'rounded-b-full transition-all duration-200',
              cell.cols === 2 ? 'w-14' : 'w-7',
              FINGER_BG_SOLID[cell.finger],
              hint && hint.finger === cell.finger
                ? 'h-12 opacity-100 ring-2 ring-amber-400 dark:ring-amber-300'
                : 'h-7 opacity-25',
            ]"
          />
        </div>
      </div>
      <div
        :class="[
          'w-12 rounded-b-full transition-all duration-200',
          FINGER_BG_SOLID.thumb,
          hint && hint.finger === 'thumb'
            ? 'h-10 opacity-100 ring-2 ring-amber-400 dark:ring-amber-300'
            : 'h-6 opacity-25',
        ]"
      />
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
