<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { WordTriplet } from '~~/shared/mini-cog-types';

const props = defineProps<{ words: WordTriplet }>();
const emit = defineEmits<{ (e: 'presented'): void }>();

const { speak, ttsSupported } = useSpeech();
const spoken = ref(false);

async function present() {
  await speak('Listen carefully. Please remember these three words.');
  for (const w of props.words) {
    await speak(w, { rate: 0.8 });
    await new Promise((r) => setTimeout(r, 350));
  }
  await speak('Now repeat the three words back to me.');
  spoken.value = true;
}

onMounted(() => {
  void present();
});
</script>

<template>
  <UCard :data-testid="TEST_IDS.MINI_COG.WORD_PRESENT">
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Remember these three words</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        {{
          ttsSupported
            ? 'Listen, read along, then repeat them back.'
            : 'Read these, then repeat them back.'
        }}
      </p>
    </template>

    <div class="flex flex-wrap justify-center gap-3 py-6">
      <span
        v-for="w in words"
        :key="w"
        class="rounded-xl border-2 border-(--ui-primary)/40 bg-(--ui-primary)/10 px-6 py-4 text-2xl font-bold tracking-wide text-(--ui-text-highlighted)"
      >
        {{ w }}
      </span>
    </div>

    <template #footer>
      <div class="flex items-center gap-3">
        <UButton variant="soft" icon="i-lucide-volume-2" label="Hear again" @click="present" />
        <UButton
          :disabled="!spoken"
          size="lg"
          icon="i-lucide-arrow-right"
          label="I'm ready to repeat them"
          @click="emit('presented')"
        />
      </div>
    </template>
  </UCard>
</template>
