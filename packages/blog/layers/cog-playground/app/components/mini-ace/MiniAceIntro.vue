<script setup lang="ts">
import { MINI_ACE_REFERENCE_URL } from '~~/shared/cog-playground/mini-ace-types';
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'begin'): void }>();
const consent = ref(false);
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        The Mini-ACE-style brain check
      </h1>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        Five short tasks: repeat three words, time orientation, animal fluency, draw a clock, and
        recall a short address. About five minutes.
      </p>
    </template>

    <div class="space-y-4 text-sm text-(--ui-text-toned)">
      <div>
        <h2 class="mb-1 font-semibold text-(--ui-text-highlighted)">What happens</h2>
        <ol class="list-decimal space-y-1 pl-5">
          <li>You hear and read three unrelated words, then immediately repeat them.</li>
          <li>You answer a few quick time-orientation questions.</li>
          <li>You hear a short fictional name + address. You'll be asked to recall it later.</li>
          <li>Name as many animals as you can in 60 seconds.</li>
          <li>Draw a clock face and set the hands to ten past eleven.</li>
          <li>Recall the address from earlier.</li>
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
          The Mini-ACE is © Professor John Hodges, who has
          <strong>explicitly granted</strong> non-commercial use in digital formats provided the
          implementation remains free. We use our own 3-word lists and 7-element addresses (not the
          canonical Mini-ACE items). See
          <a
            :href="MINI_ACE_REFERENCE_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-(--ui-primary)"
            >the published ACE-III documentation</a
          >
          for the original instrument.
        </p>
      </div>

      <label class="flex cursor-pointer items-start gap-3">
        <UCheckbox
          v-model="consent"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.CONSENT_CHECKBOX"
          aria-label="I understand this is an educational demo"
        />
        <span class="text-sm">
          I understand this is an educational demonstration, not a medical test or diagnosis.
        </span>
      </label>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.START_BUTTON"
        :disabled="!consent"
        size="lg"
        icon="i-lucide-play"
        label="Start the check"
        @click="emit('begin')"
      />
    </template>
  </UCard>
</template>
