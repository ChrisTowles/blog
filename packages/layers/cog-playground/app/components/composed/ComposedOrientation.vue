<script setup lang="ts">
import type { OrientationAnswers } from '~~/shared/cog-playground/composed-types';
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'submit', answers: OrientationAnswers): void }>();

const date = ref('');
const place = ref('');

const canSubmit = computed(() => date.value.length > 0 && place.value.trim().length > 0);

function submit() {
  if (!canSubmit.value) return;
  emit('submit', { date: date.value, place: place.value });
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">A couple of quick questions</h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        Without checking a phone or calendar. It's fine to guess.
      </p>
    </template>

    <div class="space-y-4">
      <UFormField label="What is today's date?">
        <UInput
          v-model="date"
          :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.ORIENTATION_DATE"
          type="date"
          class="w-full"
        />
      </UFormField>

      <UFormField
        label="Where are you right now?"
        hint="City, state, country, or building — your choice."
      >
        <UInput
          v-model="place"
          :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.ORIENTATION_PLACE"
          placeholder="e.g. Portland, Oregon"
          class="w-full"
        />
      </UFormField>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.ORIENTATION_SUBMIT"
        :disabled="!canSubmit"
        size="lg"
        icon="i-lucide-arrow-right"
        label="Continue"
        @click="submit"
      />
    </template>
  </UCard>
</template>
