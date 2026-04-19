<script setup lang="ts">
/**
 * Pill grid of curated aviation starter questions; emits `click` with the
 * selected question text.
 */

import { AVIATION_STARTER_QUESTIONS } from '~/utils/aviation-starter-questions';
import { TEST_IDS } from '~~/shared/test-ids';

defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'click', question: string): void;
}>();

function onClick(q: string) {
  emit('click', q);
}
</script>

<template>
  <div class="flex flex-wrap gap-2" :data-testid="TEST_IDS.AVIATION.STARTER_QUESTIONS">
    <UButton
      v-for="q in AVIATION_STARTER_QUESTIONS"
      :key="q"
      :label="q"
      icon="i-lucide-plane"
      size="sm"
      color="neutral"
      variant="outline"
      class="rounded-full"
      :disabled="disabled"
      :data-testid="TEST_IDS.AVIATION.STARTER_QUESTION_BUTTON"
      @click="onClick(q)"
    />
  </div>
</template>
