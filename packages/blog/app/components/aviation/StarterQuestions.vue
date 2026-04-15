<script setup lang="ts">
/**
 * Pill grid of curated aviation starter questions. Rendered above the chat
 * input on zero-turn chats (plan line 563).
 *
 * Click flow:
 *   1. Emit `click` with the question text.
 *   2. Parent (chat page) creates a new chat (if on /chat index) or reuses
 *      the current chat (if on /chat/[id]) and fires a direct MCP tool-call
 *      via `useAviationMcp().callAsk(question)`.
 *   3. The resulting UiResourcePart is appended via `useChat().appendMessage`
 *      — NOT through the Anthropic agent loop (plan line 114).
 *
 * The list comes from the compile-time mirror at `./starter-questions.ts` —
 * avoids an extra round-trip at page load (plan line 563, product-lens).
 */

import { AVIATION_STARTER_QUESTIONS } from './starter-questions';
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
  <div
    class="flex flex-wrap gap-2"
    :data-testid="TEST_IDS.AVIATION.STARTER_QUESTIONS"
  >
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
