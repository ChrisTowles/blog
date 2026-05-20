<script setup lang="ts">
import type { MiniAceAddress } from '~~/shared/cog-playground/mini-ace-types';
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{ address: MiniAceAddress }>();
const emit = defineEmits<{ (e: 'presented'): void }>();

const lines = computed(() => [
  props.address.name,
  `${props.address.houseNumber} ${props.address.street}`,
  props.address.area,
  `${props.address.city}, ${props.address.state}`,
  props.address.country,
]);

function speakAll() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  for (const line of lines.value) {
    const u = new SpeechSynthesisUtterance(line);
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

onMounted(speakAll);
</script>

<template>
  <UCard :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.ADDRESS_PRESENT">
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">Listen and read this address</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        You'll be asked to recall it after a few more tasks. Try to remember all seven parts: name,
        number, street, neighbourhood, city, state, country.
      </p>
    </template>

    <div
      class="flex flex-col items-center gap-1 py-4 text-center font-mono text-lg text-(--ui-text-highlighted)"
    >
      <p v-for="(line, i) in lines" :key="i">{{ line }}</p>
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
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.ADDRESS_PRESENT_CONTINUE"
          size="lg"
          icon="i-lucide-arrow-right"
          label="I've got it"
          @click="emit('presented')"
        />
      </div>
    </template>
  </UCard>
</template>
