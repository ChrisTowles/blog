<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { WordTriplet } from '~~/shared/mini-cog-types';

const props = defineProps<{
  words: WordTriplet;
  attemptsLeft: number;
}>();
const emit = defineEmits<{
  (e: 'retry'): void;
  (e: 'done'): void;
}>();

const { listening, transcript, sttSupported, startListening, stopListening } = useSpeech();
const typed = ref('');

const said = computed(() => (sttSupported && transcript.value ? transcript.value : typed.value));

const allRepeated = computed(() => {
  const text = said.value.toLowerCase();
  return props.words.every((w) => text.includes(w.toLowerCase()));
});

function submit() {
  stopListening();
  if (allRepeated.value || props.attemptsLeft <= 0) {
    emit('done');
  } else {
    emit('retry');
  }
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Repeat the three words</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        This part is not scored — it just confirms you heard them. You'll be asked to recall them
        again later.
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
          :data-testid="TEST_IDS.MINI_COG.REGISTRATION_INPUT"
          :rows="2"
          placeholder="word one, word two, word three"
          class="w-full"
        />
      </UFormField>
    </div>

    <template #footer>
      <div class="flex items-center gap-3">
        <UButton
          :data-testid="TEST_IDS.MINI_COG.REGISTRATION_SUBMIT"
          :disabled="!said.trim()"
          size="lg"
          icon="i-lucide-arrow-right"
          label="Continue"
          @click="submit"
        />
        <span v-if="attemptsLeft > 0" class="text-xs text-(--ui-text-muted)">
          {{ attemptsLeft }} more attempt{{ attemptsLeft === 1 ? '' : 's' }} available if you didn't
          catch them
        </span>
      </div>
    </template>
  </UCard>
</template>
