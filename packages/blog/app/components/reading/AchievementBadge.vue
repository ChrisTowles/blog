<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { ACHIEVEMENT_DEFINITIONS } from '~~/shared/reading-types';
import type { AchievementType } from '~~/shared/reading-types';

const props = defineProps<{
  type: AchievementType;
  earned: boolean;
  isNew?: boolean;
}>();

const definition = computed(() => ACHIEVEMENT_DEFINITIONS[props.type]);
</script>

<template>
  <div
    :data-testid="TEST_IDS.READING.ACHIEVEMENT_BADGE"
    :data-achievement-type="type"
    class="relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300"
    :class="
      earned
        ? 'border-[var(--reading-accent)] bg-[var(--reading-accent)]/10 shadow-md shadow-[var(--reading-accent)]/15'
        : 'border-[var(--reading-text)]/10 bg-[var(--reading-card-bg)] opacity-40 grayscale'
    "
  >
    <!-- New badge pulse -->
    <div
      v-if="isNew"
      :data-testid="TEST_IDS.READING.ACHIEVEMENT_NEW"
      class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--reading-orange)] animate-ping"
    />
    <div
      v-if="isNew"
      class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[var(--reading-orange)] flex items-center justify-center"
    >
      <span class="text-white text-[10px] font-bold">!</span>
    </div>

    <!-- Emoji icon -->
    <span class="text-4xl" :class="{ 'reading-float-in': earned }">
      {{ definition.emoji }}
    </span>

    <!-- Label -->
    <span
      class="text-sm font-bold text-center text-[var(--reading-text)]"
      style="font-family: var(--reading-font-display)"
    >
      {{ definition.label }}
    </span>

    <!-- Description (only when earned) -->
    <span
      v-if="earned"
      class="text-xs text-center text-[var(--reading-text)]/60"
      style="font-family: var(--reading-font-body)"
    >
      {{ definition.description }}
    </span>
  </div>
</template>
