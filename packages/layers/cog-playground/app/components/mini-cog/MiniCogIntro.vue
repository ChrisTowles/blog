<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'begin'): void }>();

const consent = ref(false);
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">
        The Mini-Cog, administered by AI
      </h1>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        A two-part cognitive screen: remember three words, draw a clock. Claude administers and
        scores it. It takes about three minutes.
      </p>
    </template>

    <div class="space-y-4 text-sm text-(--ui-text-toned)">
      <div>
        <h2 class="mb-1 font-semibold text-(--ui-text-highlighted)">What happens</h2>
        <ol class="list-decimal space-y-1 pl-5">
          <li>You hear and see three unrelated words, then repeat them back.</li>
          <li>You draw a clock face on screen and set the hands to ten past eleven.</li>
          <li>You recall the three words from memory.</li>
          <li>Claude scores the recall and the clock and shows a 0–5 result.</li>
        </ol>
      </div>

      <div
        class="rounded-lg border border-(--ui-border) bg-(--ui-bg-elevated) p-3 text-xs leading-relaxed text-(--ui-text-muted)"
      >
        <p class="mb-1 font-semibold text-(--ui-text-toned)">Privacy & licensing</p>
        <p>
          Nothing you say, type, or draw is stored. Audio and the clock image are sent to the AI
          only to score this attempt, then discarded — no database, no analytics, no account needed.
        </p>
        <p class="mt-2">
          The Mini-Cog<sup>©</sup> is © 2000, 2004 Soo Borson &amp; James Scanlan. This is an
          independent educational demonstration,
          <strong>not affiliated with or endorsed by</strong> the test's authors. See
          <a
            href="https://mini-cog.com"
            target="_blank"
            rel="noopener noreferrer"
            class="underline hover:text-(--ui-primary)"
            >mini-cog.com</a
          >.
        </p>
      </div>

      <label class="flex cursor-pointer items-start gap-3">
        <UCheckbox
          v-model="consent"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.CONSENT_CHECKBOX"
          aria-label="I understand this is an educational demo"
        />
        <span class="text-sm">
          I understand this is an educational demonstration, not a medical test or diagnosis.
        </span>
      </label>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.START_BUTTON"
        :disabled="!consent"
        size="lg"
        icon="i-lucide-play"
        label="Start the screen"
        @click="emit('begin')"
      />
    </template>
  </UCard>
</template>
