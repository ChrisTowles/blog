<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'begin'): void }>();
const consent = ref(false);
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        An AI-administered brain check
      </h1>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        Five short tasks: orientation questions, naming animals, drawing a clock, repeating numbers,
        and recalling words. Claude scores each one. About five minutes.
      </p>
    </template>

    <div class="space-y-4 text-sm text-(--ui-text-toned)">
      <div>
        <h2 class="mb-1 font-semibold text-(--ui-text-highlighted)">What happens</h2>
        <ol class="list-decimal space-y-1 pl-5">
          <li>You see five unrelated words. Try to remember them.</li>
          <li>Quick orientation questions: today's date and where you are.</li>
          <li>Name as many animals as you can in 60 seconds.</li>
          <li>Draw a clock face and set the hands to ten past eleven.</li>
          <li>Repeat short number sequences forward, then backward.</li>
          <li>Recall the five words from the beginning.</li>
        </ol>
      </div>

      <div
        class="rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-3 text-xs leading-relaxed text-(--ui-text-muted)"
      >
        <p class="mb-1 font-semibold text-(--ui-text-toned)">Privacy & framing</p>
        <p>
          Nothing you say, type, or draw is stored. Audio, text, and the clock image are sent to the
          AI only to score this attempt, then discarded — no database, no analytics, no account
          needed.
        </p>
        <p class="mt-2">
          This screen is not a validated clinical instrument. It composes well-known public-domain
          cognitive task paradigms — clock drawing, category fluency, digit span, delayed recall,
          orientation — and gates the AI scoring against simple, transparent rules. It will not tell
          you whether anything is wrong. Only a qualified clinician can.
        </p>
      </div>

      <label class="flex cursor-pointer items-start gap-3">
        <UCheckbox
          v-model="consent"
          :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.CONSENT_CHECKBOX"
          aria-label="I understand this is an educational demo"
        />
        <span class="text-sm">
          I understand this is an educational demonstration, not a medical test or diagnosis.
        </span>
      </label>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.START_BUTTON"
        :disabled="!consent"
        size="lg"
        icon="i-lucide-play"
        label="Start the check"
        @click="emit('begin')"
      />
    </template>
  </UCard>
</template>
