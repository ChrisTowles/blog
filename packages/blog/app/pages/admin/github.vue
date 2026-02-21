<script setup lang="ts">
import type { GitHubDashboardData } from '~~/shared/github-types';

definePageMeta({
  middleware: 'auth',
});

const { data, status, refresh } = await useFetch<GitHubDashboardData>('/api/admin/github');

// --- Chart options ---

const issueFlowChartOption = computed(() => {
  if (!data.value) return {};

  const opened = data.value.opened_per_month;
  const closed = data.value.closed_per_month;

  // Merge and sort all month keys
  const allMonths = [...new Set([...Object.keys(opened), ...Object.keys(closed)])].sort();

  return {
    title: {
      text: 'Issues Opened vs Closed per Month',
      left: 'center',
      textStyle: { color: '#94a3b8' },
    },
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: '#94a3b8' } },
    grid: { left: 50, right: 30, top: 60, bottom: 50 },
    xAxis: {
      type: 'category',
      data: allMonths,
      axisLabel: { color: '#94a3b8', rotate: 45 },
    },
    yAxis: { type: 'value', axisLabel: { color: '#94a3b8' } },
    series: [
      {
        name: 'Opened',
        type: 'bar',
        data: allMonths.map((m) => opened[m] || 0),
        itemStyle: { color: '#38bdf8' }, // sky-400
      },
      {
        name: 'Closed',
        type: 'bar',
        data: allMonths.map((m) => closed[m] || 0),
        itemStyle: { color: '#22c55e' }, // green-500
      },
    ],
  };
});

const labelPieChartOption = computed(() => {
  if (!data.value) return {};

  const labelData = data.value.labels.slice(0, 12).map((l) => ({
    name: l.name,
    value: l.count,
    itemStyle: { color: l.color },
  }));

  return {
    title: { text: 'Issues by Label', left: 'center', textStyle: { color: '#94a3b8' } },
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { orient: 'vertical', left: 'left', textStyle: { color: '#94a3b8' } },
    series: [
      {
        type: 'pie',
        radius: ['30%', '65%'],
        center: ['55%', '55%'],
        data: labelData,
        label: { color: '#94a3b8' },
        emphasis: {
          itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0,0,0,0.5)' },
        },
      },
    ],
  };
});

const timeToCloseChartOption = computed(() => {
  if (!data.value) return {};

  const closed = data.value.issues
    .filter((i) => i.state === 'closed' && i.hours_to_close !== null)
    .sort((a, b) => new Date(a.closed_at!).getTime() - new Date(b.closed_at!).getTime());

  // Bucket into ranges for histogram
  const buckets = [
    { label: '< 1h', min: 0, max: 1 },
    { label: '1-4h', min: 1, max: 4 },
    { label: '4-24h', min: 4, max: 24 },
    { label: '1-3d', min: 24, max: 72 },
    { label: '3-7d', min: 72, max: 168 },
    { label: '1-2w', min: 168, max: 336 },
    { label: '2w-1m', min: 336, max: 720 },
    { label: '1m+', min: 720, max: Infinity },
  ];

  const bucketCounts = buckets.map((b) => ({
    label: b.label,
    count: closed.filter((i) => i.hours_to_close! >= b.min && i.hours_to_close! < b.max).length,
  }));

  return {
    title: { text: 'Time to Close Distribution', left: 'center', textStyle: { color: '#94a3b8' } },
    tooltip: { trigger: 'axis' },
    grid: { left: 50, right: 30, top: 60, bottom: 40 },
    xAxis: {
      type: 'category',
      data: bucketCounts.map((b) => b.label),
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      name: 'Issues',
      nameTextStyle: { color: '#94a3b8' },
      axisLabel: { color: '#94a3b8' },
    },
    series: [
      {
        type: 'bar',
        data: bucketCounts.map((b) => b.count),
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#38bdf8' },
              { offset: 1, color: '#0ea5e9' },
            ],
          },
        },
      },
    ],
  };
});

const closeTimeScatterOption = computed(() => {
  if (!data.value) return {};

  const closed = data.value.issues
    .filter((i) => i.state === 'closed' && i.hours_to_close !== null)
    .map((i) => ({
      value: [i.closed_at!, Math.min(i.hours_to_close!, 720)], // cap at 30 days for readability
      name: `#${i.number}: ${i.title}`,
      realHours: i.hours_to_close!,
    }));

  return {
    title: { text: 'Close Time Over Time', left: 'center', textStyle: { color: '#94a3b8' } },
    tooltip: {
      trigger: 'item',
      formatter: (params: { name: string; data: { realHours: number } }) => {
        const hours = params.data.realHours;
        const display = hours < 24 ? `${hours.toFixed(1)}h` : `${(hours / 24).toFixed(1)}d`;
        return `${params.name}<br/>Close time: ${display}`;
      },
    },
    grid: { left: 60, right: 30, top: 60, bottom: 40 },
    xAxis: {
      type: 'time',
      axisLabel: { color: '#94a3b8' },
    },
    yAxis: {
      type: 'value',
      name: 'Hours to close',
      nameTextStyle: { color: '#94a3b8' },
      axisLabel: { color: '#94a3b8' },
    },
    series: [
      {
        type: 'scatter',
        data: closed,
        symbolSize: 8,
        itemStyle: { color: '#38bdf8', opacity: 0.7 },
      },
    ],
  };
});

function formatDuration(hours: number | null): string {
  if (hours === null) return '-';
  if (hours < 1) return `${Math.round(hours * 60)}m`;
  if (hours < 24) return `${hours.toFixed(1)}h`;
  return `${(hours / 24).toFixed(1)}d`;
}
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <UIcon name="i-simple-icons-github" class="w-8 h-8 text-primary" />
          <div>
            <h1 class="text-2xl font-bold">GitHub Dashboard</h1>
            <p class="text-sm text-muted">{{ data?.repo }} - Issue analytics and metrics</p>
          </div>
        </div>
        <UButton
          icon="i-heroicons-arrow-path"
          variant="ghost"
          :loading="status === 'pending'"
          @click="refresh()"
        />
      </div>

      <!-- Loading -->
      <div v-if="status === 'pending' && !data" class="flex justify-center py-16">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
      </div>

      <template v-if="data">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">{{ data.summary.total_issues }}</div>
              <div class="text-sm text-muted">Total Issues</div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-warning">{{ data.summary.open_issues }}</div>
              <div class="text-sm text-muted">Open</div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-success">{{ data.summary.closed_issues }}</div>
              <div class="text-sm text-muted">Closed</div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold">
                {{ formatDuration(data.summary.avg_hours_to_close) }}
              </div>
              <div class="text-sm text-muted">Avg Close Time</div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold">
                {{ formatDuration(data.summary.median_hours_to_close) }}
              </div>
              <div class="text-sm text-muted">Median Close Time</div>
            </div>
          </UCard>
        </div>

        <!-- Charts Row 1: Issue Flow + Labels -->
        <div class="grid md:grid-cols-2 gap-6">
          <UCard>
            <ClientOnly>
              <VChart :option="issueFlowChartOption" style="height: 350px" autoresize />
            </ClientOnly>
          </UCard>
          <UCard>
            <ClientOnly>
              <VChart :option="labelPieChartOption" style="height: 350px" autoresize />
            </ClientOnly>
          </UCard>
        </div>

        <!-- Charts Row 2: Time to Close -->
        <div class="grid md:grid-cols-2 gap-6">
          <UCard>
            <ClientOnly>
              <VChart :option="timeToCloseChartOption" style="height: 350px" autoresize />
            </ClientOnly>
          </UCard>
          <UCard>
            <ClientOnly>
              <VChart :option="closeTimeScatterOption" style="height: 350px" autoresize />
            </ClientOnly>
          </UCard>
        </div>

        <!-- Recent Issues Table -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Recent Issues</h3>
          </template>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-muted">
                  <th class="text-left py-2 px-3">#</th>
                  <th class="text-left py-2 px-3">Title</th>
                  <th class="text-left py-2 px-3">Status</th>
                  <th class="text-left py-2 px-3">Labels</th>
                  <th class="text-left py-2 px-3">Close Time</th>
                  <th class="text-left py-2 px-3">Created</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="issue in data.issues.slice(0, 20)"
                  :key="issue.number"
                  class="border-b border-muted/50 hover:bg-muted/30"
                >
                  <td class="py-2 px-3 font-mono text-muted">{{ issue.number }}</td>
                  <td class="py-2 px-3">
                    <a
                      :href="`https://github.com/${data.repo}/issues/${issue.number}`"
                      target="_blank"
                      class="hover:text-primary transition-colors"
                    >
                      {{ issue.title }}
                    </a>
                  </td>
                  <td class="py-2 px-3">
                    <UBadge :color="issue.state === 'open' ? 'warning' : 'success'" size="xs">
                      {{ issue.state }}
                    </UBadge>
                  </td>
                  <td class="py-2 px-3">
                    <div class="flex flex-wrap gap-1">
                      <UBadge v-for="label in issue.labels" :key="label" size="xs" variant="subtle">
                        {{ label }}
                      </UBadge>
                    </div>
                  </td>
                  <td class="py-2 px-3 font-mono">
                    {{ formatDuration(issue.hours_to_close) }}
                  </td>
                  <td class="py-2 px-3 text-muted">
                    {{ new Date(issue.created_at).toLocaleDateString() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>

        <!-- Footer -->
        <div class="text-xs text-muted text-center">
          Data fetched at {{ new Date(data.fetched_at).toLocaleString() }}
          · Source: GitHub REST API
        </div>
      </template>
    </div>
  </UContainer>
</template>
