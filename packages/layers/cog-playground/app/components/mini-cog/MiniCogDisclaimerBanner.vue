<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
</script>

<template>
  <div
    :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.DISCLAIMER_BANNER"
    role="note"
    class="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
  >
    <UIcon name="i-lucide-triangle-alert" class="mt-0.5 size-5 shrink-0" />
    <p class="leading-snug">
      <strong>Educational demo — not a medical diagnosis.</strong>
      This is an interactive illustration of the Mini-Cog screening test. It does not diagnose
      anything and is no substitute for a qualified clinician. If you have memory concerns, talk to
      a doctor.
    </p>
  </div>
</template>
