<script lang="ts">
const COLORS = {
  skyBlue: '#4da8da',
  orange: '#f4845f',
  green: '#7ec8a0',
  yellow: '#ffd166',
  pink: '#ffb5c2',
};
</script>

<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { PhonicsMapUnit, SrsStatsResponse } from '../../../shared/reading-types';

const props = defineProps<{
  sessions: ReadonlyArray<{ completedAt: string; wcpm: number | null; accuracy: number | null }>;
  phonicsProgress: ReadonlyArray<{ status: string; name?: string }>;
  srsStats: SrsStatsResponse | null | undefined;
}>();

// WCPM trend line chart
const wcpmOption = computed(() => {
  const sessionsWithWcpm = props.sessions
    .filter((s) => s.wcpm != null)
    .sort((a, b) => a.completedAt.localeCompare(b.completedAt));

  const dates = sessionsWithWcpm.map((s) => {
    const d = new Date(s.completedAt);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  });
  const wcpmValues = sessionsWithWcpm.map((s) => s.wcpm ?? 0);
  const accuracyValues = sessionsWithWcpm.map((s) =>
    s.accuracy != null ? Math.round(s.accuracy * 100) : null,
  );

  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Words/Min', 'Accuracy %'],
      bottom: 0,
      textStyle: { fontSize: 12, color: '#666' },
    },
    grid: {
      top: 10,
      left: 45,
      right: 45,
      bottom: 35,
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: { fontSize: 10, color: '#666' },
    },
    yAxis: [
      {
        type: 'value',
        name: 'WCPM',
        nameTextStyle: { fontSize: 10, color: '#666' },
        axisLabel: { fontSize: 10, color: '#666' },
        splitLine: { lineStyle: { color: '#eee' } },
      },
      {
        type: 'value',
        name: '%',
        max: 100,
        nameTextStyle: { fontSize: 10, color: '#666' },
        axisLabel: { fontSize: 10, color: '#666' },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Words/Min',
        type: 'line',
        data: wcpmValues,
        smooth: true,
        lineStyle: { color: COLORS.skyBlue, width: 3 },
        itemStyle: { color: COLORS.skyBlue },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${COLORS.skyBlue}40` },
              { offset: 1, color: `${COLORS.skyBlue}05` },
            ],
          },
        },
      },
      {
        name: 'Accuracy %',
        type: 'line',
        yAxisIndex: 1,
        data: accuracyValues,
        smooth: true,
        lineStyle: { color: COLORS.green, width: 2, type: 'dashed' },
        itemStyle: { color: COLORS.green },
      },
    ],
  };
});

// Phonics mastery stacked bar
const phonicsCounts = computed(() => {
  const mastered = props.phonicsProgress.filter((p) => p.status === 'mastered').length;
  const active = props.phonicsProgress.filter((p) => p.status === 'active').length;
  const locked = props.phonicsProgress.filter((p) => p.status === 'locked').length;
  const total = mastered + active + locked;
  return { mastered, active, locked, total };
});

const phonicsOption = computed(() => {
  const { mastered, active, locked } = phonicsCounts.value;
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: {
      top: 5,
      left: 10,
      right: 10,
      bottom: 30,
    },
    xAxis: {
      type: 'value',
      show: false,
      max: mastered + active + locked || 1,
    },
    yAxis: {
      type: 'category',
      data: ['Phonics'],
      show: false,
    },
    legend: {
      bottom: 0,
      textStyle: { fontSize: 11, color: '#666' },
    },
    series: [
      {
        name: 'Mastered',
        type: 'bar',
        stack: 'phonics',
        data: [mastered],
        itemStyle: { color: COLORS.green, borderRadius: [5, 0, 0, 5] },
        barWidth: 28,
      },
      {
        name: 'Active',
        type: 'bar',
        stack: 'phonics',
        data: [active],
        itemStyle: { color: COLORS.skyBlue },
        barWidth: 28,
      },
      {
        name: 'Locked',
        type: 'bar',
        stack: 'phonics',
        data: [locked],
        itemStyle: { color: '#e2e8f0', borderRadius: [0, 5, 5, 0] },
        barWidth: 28,
      },
    ],
  };
});
</script>

<template>
  <div :data-testid="TEST_IDS.READING.PROGRESS_CHART" class="space-y-6">
    <!-- WCPM Trend -->
    <div
      class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-success)]/30 p-6 shadow-md shadow-[var(--reading-success)]/10"
    >
      <h3
        class="text-xl font-bold text-[var(--reading-success)] mb-4"
        style="font-family: var(--reading-font-display)"
      >
        📈 Reading Speed
      </h3>
      <div v-if="sessions.some((s) => s.wcpm != null)">
        <ClientOnly>
          <VChart :option="wcpmOption" autoresize style="height: 220px" />
        </ClientOnly>
      </div>
      <p
        v-else
        class="text-center text-[var(--reading-text)]/50 py-8"
        style="font-family: var(--reading-font-display)"
      >
        Complete some reading sessions to see your speed chart!
      </p>
    </div>

    <!-- Phonics Mastery -->
    <div
      class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/30 p-6 shadow-md shadow-[var(--reading-primary)]/10"
    >
      <div class="flex items-center justify-between mb-3">
        <h3
          class="text-xl font-bold text-[var(--reading-primary)]"
          style="font-family: var(--reading-font-display)"
        >
          🔤 Phonics Progress
        </h3>
        <span
          v-if="phonicsCounts.total > 0"
          class="text-sm font-semibold text-[var(--reading-success)]"
        >
          {{ phonicsCounts.mastered }}/{{ phonicsCounts.total }} mastered
        </span>
      </div>
      <div v-if="phonicsCounts.total > 0">
        <ClientOnly>
          <VChart :option="phonicsOption" autoresize style="height: 80px" />
        </ClientOnly>
      </div>
      <p
        v-else
        class="text-center text-[var(--reading-text)]/50 py-4"
        style="font-family: var(--reading-font-display)"
      >
        Phonics progress will appear once units are available.
      </p>
    </div>

    <!-- SRS Stats -->
    <div
      v-if="srsStats"
      :data-testid="TEST_IDS.READING.SRS_STATS_SUMMARY"
      class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-accent)]/30 p-6 shadow-md shadow-[var(--reading-accent)]/10"
    >
      <h3
        class="text-xl font-bold text-[var(--reading-accent)] mb-4"
        style="font-family: var(--reading-font-display)"
      >
        🃏 Flashcard Stats
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div class="rounded-2xl bg-[var(--reading-accent)]/10 p-3">
          <div class="text-2xl font-bold text-[var(--reading-accent)]">
            {{ srsStats.due }}
          </div>
          <div class="text-xs text-[var(--reading-text)]/60 font-semibold">Due Now</div>
        </div>
        <div class="rounded-2xl bg-[var(--reading-primary)]/10 p-3">
          <div class="text-2xl font-bold text-[var(--reading-primary)]">
            {{ srsStats.newCards }}
          </div>
          <div class="text-xs text-[var(--reading-text)]/60 font-semibold">New</div>
        </div>
        <div class="rounded-2xl bg-[var(--reading-success)]/10 p-3">
          <div class="text-2xl font-bold text-[var(--reading-success)]">
            {{ srsStats.mastered }}
          </div>
          <div class="text-xs text-[var(--reading-text)]/60 font-semibold">Mastered</div>
        </div>
        <div class="rounded-2xl bg-[var(--reading-highlight)]/10 p-3">
          <div class="text-2xl font-bold text-[var(--reading-text)]">
            {{ srsStats.total }}
          </div>
          <div class="text-xs text-[var(--reading-text)]/60 font-semibold">Total</div>
        </div>
      </div>
    </div>
  </div>
</template>
