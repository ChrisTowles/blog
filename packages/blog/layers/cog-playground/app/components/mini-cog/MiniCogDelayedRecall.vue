<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'recall', spokenText: string): void }>();

const { listening, transcript, sttSupported, speak, startListening, stopListening } = useSpeech();
const typed = ref('');

const said = computed(() => {
  const parts = [transcript.value, typed.value].filter(Boolean);
  return parts.join(' ').trim();
});

onMounted(() => {
  void speak('What were the three words I asked you to remember?');
});

function submit() {
  stopListening();
  emit('recall', said.value);
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">What were the three words?</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        Say or type the three words you were asked to remember earlier. Any order is fine.
      </p>
    </template>

    <div class="space-y-4">
      <div v-if="sttSupported" class="flex flex-col items-center gap-3 py-4">
        <UButton
          :color="listening ? 'error' : 'primary'"
          :icon="listening ? 'i-lucide-mic-off' : 'i-lucide-mic'"
          size="lg"
          :label="listening ? 'Stop' : 'Tap and say the words'"
          @click="listening ? stopListening() : startListening()"
        />
        <p
          v-if="transcript"
          class="rounded-lg bg-(--ui-bg-elevated) px-4 py-2 text-center text-lg text-(--ui-text-toned)"
        >
          “{{ transcript }}”
        </p>
      </div>

      <UFormField :label="sttSupported ? 'Or type what you remember' : 'Type the three words'">
        <UTextarea
          v-model="typed"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.RECALL_INPUT"
          :rows="2"
          placeholder="the three words you remember"
          class="w-full"
        />
      </UFormField>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_COG.RECALL_SUBMIT"
        :disabled="!said"
        size="lg"
        icon="i-lucide-sparkles"
        label="Score my screen"
        @click="submit"
      />
    </template>
  </UCard>
</template>
