<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Progress',
  meta: [
    {
      name: 'description',
      content: 'Your typing progress — stages cleared, key heatmap, recent attempts.',
    },
  ],
});

const { progress, reset } = useTypingProgress();

const totalAttempts = computed(() => progress.value.attempts.length);
const recentAttempts = computed(() => progress.value.attempts.slice(-5).reverse());
const lastWpm = computed(() => {
  const a = progress.value.attempts.at(-1);
  return a ? Math.round(a.wpm) : null;
});
const avgAccuracy = computed(() => {
  const xs = progress.value.attempts;
  if (xs.length === 0) return null;
  const sum = xs.reduce((acc, a) => acc + a.accuracy, 0);
  return Math.round((sum / xs.length) * 100);
});

function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.PROGRESS_PAGE" class="space-y-8">
    <header class="flex flex-wrap items-baseline justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Your progress</h1>
        <p class="mt-2 text-slate-600 dark:text-slate-300">
          Tracks every drill you've completed in this browser.
        </p>
      </div>
      <button
        v-if="totalAttempts > 0"
        type="button"
        class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
        @click="reset"
      >
        Reset progress
      </button>
    </header>

    <section class="grid grid-cols-3 gap-4">
      <div
        class="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Attempts
        </div>
        <div class="mt-1 font-mono text-2xl text-slate-900 dark:text-slate-100">
          {{ totalAttempts }}
        </div>
      </div>
      <div
        class="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Last WPM
        </div>
        <div class="mt-1 font-mono text-2xl text-slate-900 dark:text-slate-100">
          {{ lastWpm ?? '—' }}
        </div>
      </div>
      <div
        class="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Avg accuracy
        </div>
        <div class="mt-1 font-mono text-2xl text-slate-900 dark:text-slate-100">
          {{ avgAccuracy !== null ? `${avgAccuracy}%` : '—' }}
        </div>
      </div>
    </section>

    <TypingStageMap :current-stage="progress.currentStage" />

    <TypingKeyHeatmap :key-stats="progress.keyStats" />

    <section v-if="recentAttempts.length > 0" class="space-y-3">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Recent attempts</h2>
      <ul
        class="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800"
      >
        <li
          v-for="attempt in recentAttempts"
          :key="attempt.completedAt"
          class="flex items-center justify-between gap-4 px-4 py-3 text-sm"
        >
          <span class="text-slate-600 dark:text-slate-300">{{
            formatTime(attempt.completedAt)
          }}</span>
          <span class="font-mono text-slate-900 dark:text-slate-100">
            {{ Math.round(attempt.wpm) }} WPM · {{ Math.round(attempt.accuracy * 100) }}%
          </span>
        </li>
      </ul>
    </section>

    <section
      v-else
      class="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-600 dark:bg-slate-800"
    >
      <p class="text-slate-600 dark:text-slate-300">
        No attempts yet. Pick a stage and run a lesson to start tracking your progress.
      </p>
      <NuxtLink
        to="/typing"
        class="mt-4 inline-flex items-center rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
      >
        Start a lesson
      </NuxtLink>
    </section>
  </div>
</template>
