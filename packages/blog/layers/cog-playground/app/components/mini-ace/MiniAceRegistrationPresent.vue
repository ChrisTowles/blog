<script setup lang="ts">
import type { MiniAceWordTriplet } from '~~/shared/cog-playground/mini-ace-types';
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{ words: MiniAceWordTriplet }>();
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
  <UCard :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.REGISTRATION_WORDS">
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Listen and read three words</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        You'll repeat them immediately on the next screen.
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
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.REGISTRATION_PRESENT_CONTINUE"
          size="lg"
          icon="i-lucide-arrow-right"
          label="I'm ready to repeat them"
          @click="emit('presented')"
        />
      </div>
    </template>
  </UCard>
</template>
