<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { MiniCogResultData } from '~~/shared/cog-playground/mini-cog-types';

const props = defineProps<{
  result: MiniCogResultData;
  suggestsFollowUp: boolean;
}>();
defineEmits<{ (e: 'restart'): void }>();

const CRITERIA_LABELS: Record<string, string> = {
  closedCircle: 'Closed circular face',
  allNumbersPresent: 'All 12 numbers present',
  numbersCorrectlyPositioned: 'Numbers correctly positioned',
  twoHands: 'Two hands drawn',
  hourHandAt11: 'Hour hand toward 11',
  minuteHandAt2: 'Minute hand toward 2',
};

const criteriaRows = computed(() =>
  Object.entries(props.result.clock.criteria).map(([k, v]) => ({
    label: CRITERIA_LABELS[k] ?? k,
    pass: v as boolean,
  })),
);
</script>

<template>
  <UCard :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.RESULT">
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Your screen result</h2>
    </template>

    <div class="space-y-6">
      <div class="flex flex-col items-center gap-1 py-2">
        <span
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.RESULT_SCORE"
          class="font-mono text-5xl font-black tabular-nums text-(--ui-text-highlighted)"
        >
          {{ result.total }}<span class="text-2xl text-(--ui-text-muted)">/5</span>
        </span>
        <p class="max-w-md text-center text-sm text-(--ui-text-toned)">
          Your screen score was {{ result.total }}/5. A score below 3 may suggest a conversation
          with a professional could be worthwhile. <strong>This is not a diagnosis.</strong>
        </p>
      </div>

      <UAlert
        :color="suggestsFollowUp ? 'warning' : 'info'"
        variant="soft"
        icon="i-lucide-stethoscope"
        title="Talk to a doctor about any memory concerns"
        description="This educational demo cannot tell you whether anything is wrong. Only a qualified clinician can evaluate memory or thinking concerns."
      />

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-(--ui-border) p-4">
          <h3 class="mb-2 font-semibold text-(--ui-text-highlighted)">
            Word recall — {{ result.recall.totalRecalled }}/3
          </h3>
          <ul class="space-y-2 text-sm">
            <li v-for="s in result.recall.scores" :key="s.word" class="flex items-start gap-2">
              <UIcon
                :name="s.recalled ? 'i-lucide-check' : 'i-lucide-x'"
                :class="s.recalled ? 'text-(--ui-success)' : 'text-(--ui-error)'"
                class="mt-0.5 size-4 shrink-0"
              />
              <span>
                <strong>{{ s.word }}</strong>
                <span class="block text-xs text-(--ui-text-muted)">{{ s.evidence }}</span>
              </span>
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-(--ui-border) p-4">
          <h3 class="mb-2 font-semibold text-(--ui-text-highlighted)">
            Clock drawing — {{ result.clock.score }}/2
          </h3>
          <ul class="space-y-1.5 text-sm">
            <li v-for="row in criteriaRows" :key="row.label" class="flex items-center gap-2">
              <UIcon
                :name="row.pass ? 'i-lucide-check' : 'i-lucide-x'"
                :class="row.pass ? 'text-(--ui-success)' : 'text-(--ui-error)'"
                class="size-4 shrink-0"
              />
              <span>{{ row.label }}</span>
            </li>
          </ul>
          <p class="mt-3 text-xs italic text-(--ui-text-muted)">
            {{ result.clock.explanation }}
          </p>
        </div>
      </div>

      <div
        class="rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-3 text-xs leading-relaxed text-(--ui-text-muted)"
      >
        References: Borson S, et al.
        <em>The Mini-Cog as a screen for dementia.</em> J Am Geriatr Soc. 2003. The Mini-Cog<sup
          >©</sup
        >
        is © 2000, 2004 Soo Borson &amp; James Scanlan —
        <a
          href="https://mini-cog.com"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-(--ui-primary)"
          >mini-cog.com</a
        >. Independent educational demonstration, not affiliated with or endorsed by the authors.
        Nothing from this attempt was stored.
      </div>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.RESTART_BUTTON"
        variant="soft"
        icon="i-lucide-rotate-ccw"
        label="Try again"
        @click="$emit('restart')"
      />
    </template>
  </UCard>
</template>
