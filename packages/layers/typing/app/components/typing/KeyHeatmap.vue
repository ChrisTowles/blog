<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { LocalKeyStat } from '~~/shared/typing-types';

const props = defineProps<{
  keyStats: Record<string, LocalKeyStat>;
}>();

// Standard QWERTY rows. Space drawn separately at the bottom.
const rows: string[][] = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
];

function colorFor(key: string): string {
  const stat = props.keyStats[key];
  if (!stat || stat.attempts === 0) {
    return 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500';
  }
  const errorRate = stat.errors / Math.max(1, stat.attempts);
  if (errorRate >= 0.25) {
    return 'bg-rose-200 text-rose-900 dark:bg-rose-900/60 dark:text-rose-100';
  }
  if (errorRate >= 0.1) {
    return 'bg-amber-200 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100';
  }
  return 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-100';
}

function tooltip(key: string): string {
  const stat = props.keyStats[key];
  if (!stat) return key;
  return `${key}: ${stat.attempts} attempts, ${stat.errors} errors, ${Math.round(stat.avgMs)}ms avg`;
}
</script>

<template>
  <section :data-testid="TEST_IDS.TYPING.KEY_HEATMAP" class="space-y-3">
    <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Key heatmap</h2>
    <p class="text-sm text-slate-600 dark:text-slate-300">
      Green keys are reliable. Amber keys need a little practice. Rose keys are tripping you up.
    </p>
    <div class="space-y-2">
      <div v-for="(row, idx) in rows" :key="idx" class="flex justify-center gap-1">
        <div
          v-for="key in row"
          :key="key"
          :title="tooltip(key)"
          class="flex h-10 w-10 items-center justify-center rounded font-mono text-sm shadow-sm"
          :class="colorFor(key)"
        >
          {{ key }}
        </div>
      </div>
      <div class="flex justify-center">
        <div
          :title="tooltip(' ')"
          class="flex h-10 w-64 items-center justify-center rounded font-mono text-sm shadow-sm"
          :class="colorFor(' ')"
        >
          space
        </div>
      </div>
    </div>
  </section>
</template>
