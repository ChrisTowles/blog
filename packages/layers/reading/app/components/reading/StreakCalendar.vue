<script lang="ts">
const COLORS = {
  skyBlue: '#4da8da',
  orange: '#f4845f',
  green: '#7ec8a0',
  yellow: '#ffd166',
  cream: '#fff8f0',
};
</script>

<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{
  sessions: Array<{ completedAt: string }>;
}>();

const now = new Date();
const year = now.getFullYear();
const rangeStart = `${year}-01-01`;
const rangeEnd = `${year}-12-31`;

const heatmapData = computed(() => {
  const counts = new Map<string, number>();
  for (const s of props.sessions) {
    const day = s.completedAt.slice(0, 10);
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }
  return [...counts.entries()].map(([date, count]) => [date, count]);
});

const maxCount = computed(() => {
  const vals = heatmapData.value.map((d) => d[1] as number);
  return Math.max(1, ...vals);
});

const option = computed(() => ({
  tooltip: {
    formatter(params: { value: [string, number] }) {
      return `${params.value[0]}: ${params.value[1]} session${params.value[1] === 1 ? '' : 's'}`;
    },
  },
  visualMap: {
    show: false,
    min: 0,
    max: maxCount.value,
    inRange: {
      color: [COLORS.cream, COLORS.yellow, COLORS.orange, COLORS.green],
    },
  },
  calendar: {
    range: [rangeStart, rangeEnd],
    cellSize: ['auto', 16],
    top: 30,
    left: 40,
    right: 10,
    bottom: 5,
    itemStyle: {
      borderWidth: 2,
      borderColor: '#fff8f0',
      borderRadius: 3,
    },
    yearLabel: { show: false },
    dayLabel: {
      fontSize: 10,
      color: '#666',
      nameMap: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    },
    monthLabel: {
      fontSize: 11,
      color: '#666',
    },
    splitLine: { show: false },
  },
  series: [
    {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: heatmapData.value,
      itemStyle: {
        borderRadius: 3,
      },
    },
  ],
}));

const currentStreak = computed(() => {
  const sessionDays = new Set(props.sessions.map((s) => s.completedAt.slice(0, 10)));
  let streak = 0;
  const d = new Date();
  // Check today first, then go back
  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (sessionDays.has(key)) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else if (streak === 0) {
      // Today might not have a session yet, check yesterday
      d.setDate(d.getDate() - 1);
      const yesterdayKey = d.toISOString().slice(0, 10);
      if (sessionDays.has(yesterdayKey)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return streak;
});
</script>

<template>
  <div
    :data-testid="TEST_IDS.READING.STREAK_CALENDAR"
    class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/30 p-6 shadow-md shadow-[var(--reading-primary)]/10"
  >
    <div class="flex items-center justify-between mb-4">
      <h3
        class="text-xl font-bold text-[var(--reading-primary)]"
        style="font-family: var(--reading-font-display)"
      >
        Reading Streak
      </h3>
      <div
        class="flex items-center gap-2 rounded-full bg-[var(--reading-highlight)]/20 px-4 py-1.5"
      >
        <span class="text-2xl">🔥</span>
        <span
          class="text-lg font-bold text-[var(--reading-text)]"
          style="font-family: var(--reading-font-display)"
        >
          {{ currentStreak }} day{{ currentStreak === 1 ? '' : 's' }}
        </span>
      </div>
    </div>
    <ClientOnly>
      <VChart :option="option" autoresize style="height: 180px" />
    </ClientOnly>
  </div>
</template>
