<script setup lang="ts">
import type { DefineComponent } from 'vue';
import type { ReviewState } from '~/composables/useLoanReview';
import { TEST_IDS } from '~~/shared/test-ids';
import ProsePre from '~/components/prose/ProsePre.vue';

const components = {
  pre: ProsePre as unknown as DefineComponent,
};

const props = defineProps<{
  review: ReviewState;
}>();

const showRaw = ref(false);

const decisionColor = computed(() => {
  if (!props.review.decision) return 'neutral' as const;
  const map = { approved: 'success', denied: 'error', flagged: 'warning' } as const;
  return map[props.review.decision] ?? ('neutral' as const);
});

const decisionLabel = computed(() => {
  if (!props.review.decision) return '';
  return (
    { approved: 'Approved', denied: 'Denied', flagged: 'Flagged' }[props.review.decision] || ''
  );
});

const statusIcon = computed(() => {
  if (props.review.status === 'pending') return 'i-lucide-clock';
  if (props.review.status === 'streaming') return 'i-lucide-loader';
  return props.review.decision === 'approved' ? 'i-lucide-check-circle' : 'i-lucide-alert-triangle';
});

const rawJsonMarkdown = computed(() => {
  const json = JSON.stringify(
    { decision: props.review.decision, flags: props.review.flags, analysis: props.review.text },
    null,
    2,
  );
  return '```json\n' + json + '\n```';
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
        <UBadge
          v-if="review.decision"
          :data-testid="TEST_IDS.LOAN.REVIEW_DECISION"
          :color="decisionColor"
          :label="decisionLabel"
        />
      </div>
    </template>

    <div v-if="review.status === 'pending'" class="text-muted text-sm">Waiting...</div>

    <div v-else class="min-w-0 overflow-hidden">
      <!-- Streaming: plain wrapping text (raw LLM output contains JSON, not worth rendering as markdown) -->
      <div
        v-if="review.status === 'streaming' && review.text"
        class="text-sm text-muted mb-4 whitespace-pre-wrap break-words"
      >
        {{ review.text }}
      </div>

      <!-- Complete: show clean analysis as markdown -->
      <MDCCached
        v-else-if="review.status === 'complete' && review.text"
        :value="review.text"
        :cache-key="`review-${review.reviewer}-complete`"
        :components="components"
        :parser-options="{ highlight: false }"
        class="prose prose-sm dark:prose-invert max-w-none mb-4 *:first:mt-0 *:last:mb-0"
      />

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

      <!-- Debug: raw JSON toggle -->
      <div v-if="review.status === 'complete'" class="mt-4">
        <button
          class="text-xs text-muted hover:text-default transition-colors"
          @click="showRaw = !showRaw"
        >
          {{ showRaw ? 'Hide' : 'Show' }} raw response
        </button>
        <MDCCached
          v-if="showRaw"
          :value="rawJsonMarkdown"
          :cache-key="`review-${review.reviewer}-raw`"
          :components="components"
          :parser-options="{ highlight: false }"
          class="raw-json mt-2 prose prose-sm dark:prose-invert max-w-none *:first:mt-0 *:last:mb-0"
        />
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.raw-json :deep(pre) {
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
