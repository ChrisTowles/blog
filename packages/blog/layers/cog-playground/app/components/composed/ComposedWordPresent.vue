<script setup lang="ts">
import type { ComposedWordList } from '~~/shared/cog-playground/composed-types';
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{ words: ComposedWordList }>();
const emit = defineEmits<{ (e: 'presented'): void }>();

function speakAll() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  for (const w of props.words) {
    const u = new SpeechSynthesisUtterance(w);
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

onMounted(speakAll);
</script>

<template>
  <UCard :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.WORD_PRESENT">
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Remember these five words</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        Read them and listen. You'll be asked to recall them in a few minutes.
      </p>
    </template>

    <div class="flex flex-wrap justify-center gap-4 py-4">
      <span
        v-for="w in words"
        :key="w"
        class="rounded-xl bg-(--ui-bg-elevated) px-5 py-3 text-2xl font-bold text-(--ui-text-highlighted)"
        >{{ w }}</span
      >
    </div>

    <template #footer>
      <div class="flex flex-wrap items-center gap-3">
        <UButton
          variant="soft"
          color="neutral"
          icon="i-lucide-volume-2"
          label="Hear again"
          @click="speakAll"
        />
        <UButton
          :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.WORD_PRESENT_CONTINUE"
          size="lg"
          icon="i-lucide-arrow-right"
          label="I've got them"
          @click="emit('presented')"
        />
      </div>
    </template>
  </UCard>
</template>
