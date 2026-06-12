<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'submit', spokenText: string): void }>();

const { listening, transcript, sttSupported, startListening, stopListening } = useSpeech();
const typed = ref('');

const captured = computed(() =>
  sttSupported && transcript.value ? transcript.value : typed.value,
);

function submit() {
  stopListening();
  if (!captured.value.trim()) return;
  emit('submit', captured.value.trim());
}

onUnmounted(stopListening);
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Repeat the three words</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        Say or type them in any order. This is the registration step.
      </p>
    </template>

    <div class="space-y-4">
      <div v-if="sttSupported" class="flex flex-col items-center gap-3 py-2">
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
          "{{ transcript }}"
        </p>
      </div>

      <UFormField :label="sttSupported ? 'Or type the words' : 'Type the three words'">
        <UTextarea
          v-model="typed"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.REGISTRATION_INPUT"
          :rows="2"
          placeholder="word one, word two, word three"
          class="w-full"
        />
      </UFormField>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.REGISTRATION_SUBMIT"
        :disabled="!captured.trim()"
        size="lg"
        icon="i-lucide-check"
        label="Continue"
        @click="submit"
      />
    </template>
  </UCard>
</template>
