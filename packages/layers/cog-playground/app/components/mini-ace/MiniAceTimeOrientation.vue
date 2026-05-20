<script setup lang="ts">
import type { TimeOrientationAnswers } from '~~/shared/cog-playground/mini-ace-types';
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'submit', answers: TimeOrientationAnswers): void }>();

const dayOfWeek = ref('');
const date = ref('');
const season = ref('');

const canSubmit = computed(() => dayOfWeek.value.trim() && date.value && season.value.trim());

function submit() {
  if (!canSubmit.value) return;
  emit('submit', { dayOfWeek: dayOfWeek.value, date: date.value, season: season.value });
}
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">
        A few quick orientation questions
      </h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        Without checking a phone or calendar. It's fine to guess.
      </p>
    </template>

    <div class="space-y-4">
      <UFormField label="What day of the week is it?">
        <UInput
          v-model="dayOfWeek"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.TIME_DAY_OF_WEEK"
          placeholder="e.g. Monday"
          class="w-full"
        />
      </UFormField>

      <UFormField label="What is today's date?">
        <UInput
          v-model="date"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.TIME_DATE"
          type="date"
          class="w-full"
        />
      </UFormField>

      <UFormField label="What season is it?" hint="Spring, summer, fall (or autumn), winter">
        <UInput
          v-model="season"
          :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.TIME_SEASON"
          placeholder="e.g. spring"
          class="w-full"
        />
      </UFormField>
    </div>

    <template #footer>
      <UButton
        :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.TIME_SUBMIT"
        :disabled="!canSubmit"
        size="lg"
        icon="i-lucide-arrow-right"
        label="Continue"
        @click="submit"
      />
    </template>
  </UCard>
</template>
