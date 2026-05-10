<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { getStages } from '../../../server/utils/typing/curriculum';

const props = defineProps<{
  currentStage: number;
}>();

const stages = getStages();
</script>

<template>
  <section :data-testid="TEST_IDS.TYPING.STAGE_MAP" class="space-y-3">
    <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Stage map</h2>
    <p class="text-sm text-slate-600 dark:text-slate-300">
      You're on stage
      <span class="font-semibold">{{ props.currentStage }}</span>
      of 20.
    </p>
    <ol class="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-5">
      <li
        v-for="s in stages"
        :key="s.stage"
        :data-testid="TEST_IDS.TYPING.STAGE_TILE"
        class="rounded-lg border p-3 text-sm"
        :class="
          s.stage < props.currentStage
            ? 'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200'
            : s.stage === props.currentStage
              ? 'border-amber-400 bg-amber-50 text-amber-900 dark:border-amber-500 dark:bg-amber-950/40 dark:text-amber-200'
              : 'border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
        "
      >
        <div class="flex items-baseline justify-between">
          <span class="font-mono text-xs">Stage {{ s.stage }}</span>
          <span v-if="s.stage < props.currentStage" class="text-xs">done</span>
          <span v-else-if="s.stage === props.currentStage" class="text-xs">active</span>
        </div>
        <div class="mt-1 text-xs leading-snug">{{ s.name }}</div>
      </li>
    </ol>
  </section>
</template>
