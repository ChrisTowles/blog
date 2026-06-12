<script setup lang="ts">
import {
  MINI_ACE_REFERENCE_URL,
  type MiniAceResultData,
} from '~~/shared/cog-playground/mini-ace-types';
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{
  result: MiniAceResultData;
  clockImage: string | null;
  suggestsFollowUp: boolean;
}>();
defineEmits<{ (e: 'restart'): void }>();

const CLOCK_LABELS: Record<string, string> = {
  closedCircle: 'Closed circular face',
  allNumbersPresent: 'All 12 numbers present',
  numbersCorrectlyPositioned: 'Numbers correctly positioned',
  twoHands: 'Two hands drawn',
  hourHandAt11: 'Hour hand toward 11',
  minuteHandAt2: 'Minute hand toward 2',
};

const clockRows = computed(() =>
  Object.entries(props.result.clock.criteria).map(([k, v]) => ({
    label: CLOCK_LABELS[k] ?? k,
    pass: v as boolean,
  })),
);

const ADDRESS_LABELS: Record<string, string> = {
  name: 'Name',
  houseNumber: 'House number',
  street: 'Street',
  area: 'Area',
  city: 'City',
  state: 'State',
  country: 'Country',
};

function downloadClockImage() {
  if (!props.clockImage) return;
  const a = document.createElement('a');
  a.href = props.clockImage;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.download = `mini-ace-clock-${stamp}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>

<template>
  <UCard :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.RESULT">
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Your check result</h2>
    </template>

    <div class="space-y-6">
      <div class="flex flex-col items-center gap-1 py-2">
        <span
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.RESULT_SCORE"
          class="font-mono text-5xl font-black tabular-nums text-(--ui-text-highlighted)"
        >
          {{ result.total
          }}<span class="text-2xl text-(--ui-text-muted)">/{{ result.maxTotal }}</span>
        </span>
        <p class="max-w-md text-center text-sm text-(--ui-text-toned)">
          Composite of five Mini-ACE-style tasks. <strong>This is not a diagnosis.</strong>
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
            Registration — {{ result.registration.totalRecalled }}/3
          </h3>
          <ul class="space-y-2 text-sm">
            <li
              v-for="s in result.registration.scores"
              :key="s.word"
              class="flex items-start gap-2"
            >
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
            Time orientation — {{ result.timeOrientation.total }}/5
          </h3>
          <ul class="space-y-1.5 text-sm">
            <li
              v-for="(f, key) in result.timeOrientation.fields"
              :key="key"
              class="flex items-center gap-2"
            >
              <UIcon
                :name="f.correct ? 'i-lucide-check' : 'i-lucide-x'"
                :class="f.correct ? 'text-(--ui-success)' : 'text-(--ui-error)'"
                class="size-4 shrink-0"
              />
              <span>
                <span class="capitalize">{{
                  String(key)
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                }}</span>
                <span class="text-(--ui-text-muted)">
                  ({{ f.given || '—' }} / expected {{ f.expected }})
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-(--ui-border) p-4">
          <h3 class="mb-2 font-semibold text-(--ui-text-highlighted)">
            Animal fluency — {{ result.fluency.bandedScore }}/7
          </h3>
          <p class="text-sm text-(--ui-text-toned)">
            {{ result.fluency.uniqueCount }} unique animal<span
              v-if="result.fluency.uniqueCount !== 1"
              >s</span
            >
            in 60s.
          </p>
          <p v-if="result.fluency.validAnimals.length" class="mt-2 text-xs text-(--ui-text-muted)">
            {{ result.fluency.validAnimals.join(', ') }}
          </p>
        </div>

        <div class="rounded-xl border border-(--ui-border) p-4">
          <h3 class="mb-2 font-semibold text-(--ui-text-highlighted)">
            Clock drawing — {{ result.clock.score }}/2
          </h3>

          <div v-if="clockImage" class="mb-3 space-y-2">
            <img
              :src="clockImage"
              alt="Your clock drawing"
              class="aspect-square w-full rounded-lg border border-(--ui-border) bg-white"
            />
            <UButton
              variant="soft"
              color="neutral"
              size="xs"
              icon="i-lucide-download"
              label="Download PNG"
              block
              @click="downloadClockImage"
            />
          </div>

          <ul class="space-y-1.5 text-sm">
            <li v-for="row in clockRows" :key="row.label" class="flex items-center gap-2">
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

        <div class="rounded-xl border border-(--ui-border) p-4 sm:col-span-2">
          <h3 class="mb-2 font-semibold text-(--ui-text-highlighted)">
            Address recall — {{ result.addressRecall.totalRecalled }}/7
          </h3>
          <ul class="grid gap-2 text-sm sm:grid-cols-2">
            <li
              v-for="s in result.addressRecall.scores"
              :key="s.field"
              class="flex items-start gap-2"
            >
              <UIcon
                :name="s.recalled ? 'i-lucide-check' : 'i-lucide-x'"
                :class="s.recalled ? 'text-(--ui-success)' : 'text-(--ui-error)'"
                class="mt-0.5 size-4 shrink-0"
              />
              <span>
                <strong>{{ ADDRESS_LABELS[s.field] ?? s.field }}</strong>
                <span class="block text-xs text-(--ui-text-muted)">{{ s.evidence }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-3 text-xs leading-relaxed text-(--ui-text-muted)"
      >
        Inspired by the Mini-ACE / ACE-III (Hodges et al.), used here under Hodges's explicit grant
        for non-commercial digital reimplementation. Our own 3-word lists and 7-element addresses —
        not the canonical instrument items. See
        <a
          :href="MINI_ACE_REFERENCE_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-(--ui-primary)"
          >published ACE-III documentation</a
        >
        for the original. Nothing from this attempt was stored.
      </div>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.RESTART_BUTTON"
        variant="soft"
        icon="i-lucide-rotate-ccw"
        label="Try again"
        @click="$emit('restart')"
      />
    </template>
  </UCard>
</template>
