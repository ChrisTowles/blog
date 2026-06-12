<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'recall', spokenText: string): void }>();

const { listening, transcript, sttSupported, startListening, stopListening } = useSpeech();
const typed = ref('');

const captured = computed(() =>
  sttSupported && transcript.value ? transcript.value : typed.value,
);

function submit() {
  stopListening();
  if (!captured.value.trim()) return;
  emit('recall', captured.value.trim());
}

onUnmounted(stopListening);
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Recall the address</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        From the beginning of the check. As many parts as you can remember — name, number, street,
        neighbourhood, city, state, country.
      </p>
    </template>

    <div class="space-y-4">
      <div v-if="sttSupported" class="flex flex-col items-center gap-3 py-2">
        <UButton
          :color="listening ? 'error' : 'primary'"
          :icon="listening ? 'i-lucide-mic-off' : 'i-lucide-mic'"
          size="lg"
          :label="listening ? 'Stop' : 'Tap and say the address'"
          @click="listening ? stopListening() : startListening()"
        />
        <p
          v-if="transcript"
          class="rounded-lg bg-(--ui-bg-elevated) px-4 py-2 text-center text-lg text-(--ui-text-toned)"
        >
          "{{ transcript }}"
        </p>
      </div>

      <UFormField :label="sttSupported ? 'Or type the address' : 'Type the address'">
        <UTextarea
          v-model="typed"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.ADDRESS_RECALL_INPUT"
          :rows="4"
          placeholder="Name, number, street, area, city, state, country..."
          class="w-full"
        />
      </UFormField>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.ADDRESS_RECALL_SUBMIT"
        :disabled="!captured.trim()"
        size="lg"
        icon="i-lucide-stars"
        label="Score my check"
        @click="submit"
      />
    </template>
  </UCard>
</template>
