<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { ACHIEVEMENT_DEFINITIONS } from '../../../shared/reading-types';
import type { AchievementType, AchievementResponse } from '../../../shared/reading-types';

const props = defineProps<{
  achievements: AchievementResponse[];
}>();

const allTypes = Object.keys(ACHIEVEMENT_DEFINITIONS) as AchievementType[];
const earnedTypes = computed(() => new Set(props.achievements.map((a) => a.type)));
</script>

<template>
  <div :data-testid="TEST_IDS.READING.ACHIEVEMENT_LIST">
    <h2
      class="text-2xl font-bold text-[var(--reading-text)] mb-4"
      style="font-family: var(--reading-font-display)"
    >
      Achievements
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 reading-stagger">
      <ReadingAchievementBadge
        v-for="type in allTypes"
        :key="type"
        :type="type"
        :earned="earnedTypes.has(type)"
      />
    </div>
  </div>
</template>
