<script setup lang="ts">
import type { ReviewState } from '~/composables/useLoanReview';

const props = defineProps<{
  review: ReviewState;
}>();

const decisionColor = computed(() => {
  if (!props.review.decision) return 'neutral';
  return { approved: 'success', denied: 'error', flagged: 'warning' }[props.review.decision] || 'neutral';
});

const decisionLabel = computed(() => {
  if (!props.review.decision) return '';
  return { approved: 'Approved', denied: 'Denied', flagged: 'Flagged' }[props.review.decision] || '';
});

const statusIcon = computed(() => {
  if (props.review.status === 'pending') return 'i-lucide-clock';
  if (props.review.status === 'streaming') return 'i-lucide-loader';
  return props.review.decision === 'approved' ? 'i-lucide-check-circle' : 'i-lucide-alert-triangle';
});
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon :name="statusIcon" :class="{ 'animate-spin': review.status === 'streaming' }" />
          <span class="font-semibold">{{ review.displayName }}</span>
        </div>
        <UBadge v-if="review.decision" :color="decisionColor" :label="decisionLabel" />
      </div>
    </template>

    <div v-if="review.status === 'pending'" class="text-muted text-sm">
      Waiting...
    </div>

    <div v-else>
      <div v-if="review.text" class="prose prose-sm dark:prose-invert max-w-none mb-4 whitespace-pre-wrap">
        {{ review.text }}
      </div>

      <div v-if="review.flags.length > 0" class="space-y-2 mt-4">
        <div
          v-for="(flag, i) in review.flags"
          :key="i"
          class="flex items-start gap-2 p-3 rounded-lg bg-warning-50 dark:bg-warning-950 border border-warning-200 dark:border-warning-800"
        >
          <UIcon name="i-lucide-flag" class="text-warning-500 mt-0.5 shrink-0" />
          <span class="text-sm">{{ flag }}</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
