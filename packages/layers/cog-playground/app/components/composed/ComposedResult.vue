<script setup lang="ts">
import type { ComposedResultData } from '~~/shared/cog-playground/composed-types';
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{
  result: ComposedResultData;
  clockImage: string | null;
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

function downloadClockImage() {
  if (!props.clockImage) return;
  const a = document.createElement('a');
  a.href = props.clockImage;
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  a.download = `cog-playground-clock-${stamp}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>

<template>
  <UCard :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.RESULT">
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Your check result</h2>
    </template>

    <div class="space-y-6">
      <div class="flex flex-col items-center gap-1 py-2">
        <span
          :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.RESULT_SCORE"
          class="font-mono text-5xl font-black tabular-nums text-(--ui-text-highlighted)"
        >
          {{ result.total
          }}<span class="text-2xl text-(--ui-text-muted)">/{{ result.maxTotal }}</span>
        </span>
        <p class="max-w-md text-center text-sm text-(--ui-text-toned)">
          Composite of five short tasks. <strong>This is not a diagnosis.</strong>
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
            Orientation — {{ result.orientation.total }}/4
          </h3>
          <ul class="space-y-1.5 text-sm">
            <li class="flex items-center gap-2">
              <UIcon
                :name="result.orientation.fields.day.correct ? 'i-lucide-check' : 'i-lucide-x'"
                :class="
                  result.orientation.fields.day.correct
                    ? 'text-(--ui-success)'
                    : 'text-(--ui-error)'
                "
                class="size-4 shrink-0"
              />
              <span>
                Day
                <span class="text-(--ui-text-muted)">
                  ({{ result.orientation.fields.day.given || '—' }} / expected
                  {{ result.orientation.fields.day.expected }})
                </span>
              </span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon
                :name="result.orientation.fields.month.correct ? 'i-lucide-check' : 'i-lucide-x'"
                :class="
                  result.orientation.fields.month.correct
                    ? 'text-(--ui-success)'
                    : 'text-(--ui-error)'
                "
                class="size-4 shrink-0"
              />
              <span>
                Month
                <span class="text-(--ui-text-muted)">
                  ({{ result.orientation.fields.month.given || '—' }} / expected
                  {{ result.orientation.fields.month.expected }})
                </span>
              </span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon
                :name="result.orientation.fields.year.correct ? 'i-lucide-check' : 'i-lucide-x'"
                :class="
                  result.orientation.fields.year.correct
                    ? 'text-(--ui-success)'
                    : 'text-(--ui-error)'
                "
                class="size-4 shrink-0"
              />
              <span>
                Year
                <span class="text-(--ui-text-muted)">
                  ({{ result.orientation.fields.year.given || '—' }} / expected
                  {{ result.orientation.fields.year.expected }})
                </span>
              </span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon
                :name="result.orientation.fields.place.provided ? 'i-lucide-check' : 'i-lucide-x'"
                :class="
                  result.orientation.fields.place.provided
                    ? 'text-(--ui-success)'
                    : 'text-(--ui-error)'
                "
                class="size-4 shrink-0"
              />
              <span>
                Place
                <span v-if="result.orientation.fields.place.given" class="text-(--ui-text-muted)">
                  ("{{ result.orientation.fields.place.given }}")
                </span>
              </span>
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-(--ui-border) p-4">
          <h3 class="mb-2 font-semibold text-(--ui-text-highlighted)">
            Word recall — {{ result.recall.totalRecalled }}/5
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
            Animal fluency — {{ result.fluency.bandedScore }}/3
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
          <p
            v-if="result.fluency.rejected.length"
            class="mt-2 text-xs italic text-(--ui-text-muted)"
          >
            Skipped: {{ result.fluency.rejected.map((r) => r.word).join(', ') }}
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

        <div class="rounded-xl border border-(--ui-border) p-4 sm:col-span-2">
          <h3 class="mb-2 font-semibold text-(--ui-text-highlighted)">
            Digit span — {{ result.digitSpan.total }}/3
          </h3>
          <ul class="space-y-1 text-sm">
            <li>
              Forward span: <strong>{{ result.digitSpan.forwardSpan }}</strong> digits
            </li>
            <li>
              Backward span: <strong>{{ result.digitSpan.backwardSpan }}</strong> digits
            </li>
          </ul>
        </div>
      </div>

      <div
        class="rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-3 text-xs leading-relaxed text-(--ui-text-muted)"
      >
        This screen composes well-known public-domain cognitive task paradigms — clock drawing,
        category fluency, digit span, delayed recall, orientation — under a transparent rubric. It
        is not a validated clinical instrument and not tied to any branded screener. Nothing from
        this attempt was stored.
      </div>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.RESTART_BUTTON"
        variant="soft"
        icon="i-lucide-rotate-ccw"
        label="Try again"
        @click="$emit('restart')"
      />
    </template>
  </UCard>
</template>
