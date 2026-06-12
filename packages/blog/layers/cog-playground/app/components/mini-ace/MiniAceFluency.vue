<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'submit', spokenText: string): void }>();

const DURATION_SECONDS = 60;
const { listening, transcript, sttSupported, startListening, stopListening } = useSpeech();
const typed = ref('');
const started = ref(false);
const secondsLeft = ref(DURATION_SECONDS);
let timer: ReturnType<typeof setInterval> | null = null;

const captured = computed(() =>
  sttSupported && transcript.value ? transcript.value : typed.value,
);

function tick() {
  if (secondsLeft.value > 0) {
    secondsLeft.value--;
    if (secondsLeft.value === 0) {
      stopListening();
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  }
}

function start() {
  if (started.value) return;
  started.value = true;
  secondsLeft.value = DURATION_SECONDS;
  timer = setInterval(tick, 1000);
  if (sttSupported) startListening();
}

function submit() {
  if (!started.value || !captured.value.trim()) return;
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  stopListening();
  emit('submit', captured.value.trim());
}

onUnmounted(() => {
  if (timer) clearInterval(timer);
  stopListening();
});
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <div>
          <h2 class="text-xl font-bold text-(--ui-text-highlighted)">
            Name as many animals as you can
          </h2>
          <p class="mt-1 text-sm text-(--ui-text-muted)">
            You have 60 seconds. Don't repeat. Say (or type) them as they come.
          </p>
        </div>
        <span
          class="shrink-0 rounded-lg bg-(--ui-bg-elevated) px-3 py-1 font-mono text-sm tabular-nums"
          :class="secondsLeft <= 15 && started ? 'text-(--ui-error)' : 'text-(--ui-text-muted)'"
        >
          0:{{ secondsLeft.toString().padStart(2, '0') }}
        </span>
      </div>
    </template>

    <div class="space-y-4">
      <div v-if="!started" class="flex justify-center py-4">
        <UButton
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.FLUENCY_START"
          size="lg"
          icon="i-lucide-play"
          label="Start the 60-second timer"
          @click="start"
        />
      </div>

      <div v-else class="space-y-3">
        <div v-if="sttSupported" class="flex flex-col items-center gap-3 py-2">
          <UButton
            :color="listening ? 'error' : 'primary'"
            :icon="listening ? 'i-lucide-mic-off' : 'i-lucide-mic'"
            size="lg"
            :label="listening ? 'Pause mic' : 'Resume mic'"
            @click="listening ? stopListening() : startListening()"
          />
          <p
            v-if="transcript"
            class="max-h-24 w-full overflow-y-auto rounded-lg bg-(--ui-bg-elevated) px-3 py-2 text-sm text-(--ui-text-toned)"
          >
            "{{ transcript }}"
          </p>
        </div>

        <UFormField
          :label="
            sttSupported
              ? 'Or type animals (one per line or comma-separated)'
              : 'Type animals (one per line or comma-separated)'
          "
        >
          <UTextarea
            v-model="typed"
            :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.FLUENCY_INPUT"
            :rows="3"
            placeholder="dog, cat, horse, ..."
            class="w-full"
          />
        </UFormField>
      </div>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.FLUENCY_SUBMIT"
        :disabled="!started || !captured.trim()"
        size="lg"
        icon="i-lucide-check"
        :label="secondsLeft === 0 ? 'Done' : 'I\'m done early'"
        @click="submit"
      />
    </template>
  </UCard>
</template>
