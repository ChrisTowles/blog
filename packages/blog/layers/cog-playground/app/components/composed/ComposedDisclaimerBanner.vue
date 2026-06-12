<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
</script>

<template>
  <div
    :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.DISCLAIMER_BANNER"
    role="note"
    class="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
  >
    <UIcon name="i-lucide-triangle-alert" class="mt-0.5 size-5 shrink-0" />
    <p class="leading-snug">
      <strong>Educational demo — not a medical diagnosis.</strong>
      This is an AI-administered cognitive check inspired by the standard public-domain
      neuropsychology tasks. It is not a validated clinical instrument and does not diagnose
      anything. If you have memory concerns, talk to a doctor.
    </p>
  </div>
</template>
