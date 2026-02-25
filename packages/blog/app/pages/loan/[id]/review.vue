<script setup lang="ts">
import type { ReviewDecision } from '~~/shared/loan-types';
import { REVIEW_DECISIONS, REVIEWER_DISPLAY_NAMES } from '~~/shared/loan-types';
import type { ReviewState } from '~/composables/useLoanReview';
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

useSeoMeta({
  title: 'Loan Review',
  description: 'AI-powered multi-agent loan review',
});

const route = useRoute();
const toast = useToast();
const id = route.params.id as string;

const { data } = await useFetch(`/api/loan/${id}`);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Application not found', fatal: true });
}

// If still in intake, redirect back to the application page
if (data.value.status === 'intake') {
  await navigateTo(`/loan/${id}`, { replace: true });
}

const hasExistingReviews = data.value.reviews.length > 0;

// Mode 2: Static display from DB data
const staticReviews: ReviewState[] = hasExistingReviews
  ? data.value.reviews
      .filter((r) => r.reviewer !== null)
      .map((r) => ({
        reviewer: r.reviewer!,
        displayName: REVIEWER_DISPLAY_NAMES[r.reviewer!],
        status: 'complete' as const,
        text: r.analysis || '',
        decision: r.decision as ReviewDecision,
        flags: r.flags || [],
      }))
  : [];

const staticOverallDecision: ReviewDecision | null = hasExistingReviews
  ? REVIEW_DECISIONS.includes(data.value.status as ReviewDecision)
    ? (data.value.status as ReviewDecision)
    : null
  : null;

// Mode 1: Fresh review via SSE streaming
const loanReview = !hasExistingReviews
  ? useLoanReview({
      applicationId: id,
      onError(error) {
        toast.add({ description: error.message, color: 'error' });
      },
    })
  : null;

// Unified computed refs for both modes
const reviews = computed(() =>
  hasExistingReviews ? staticReviews : (loanReview?.reviews.value ?? []),
);
const overallDecision = computed(() =>
  hasExistingReviews ? staticOverallDecision : (loanReview?.overallDecision.value ?? null),
);
const summaryText = computed(() => (hasExistingReviews ? '' : (loanReview?.summary.value ?? '')));

onMounted(() => {
  if (!hasExistingReviews && loanReview) {
    loanReview.startReview();
  }
});
</script>

<template>
  <UContainer class="py-8 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-highlighted">Loan Review</h1>
      <p class="text-muted mt-2">Multi-agent review of your loan application</p>
    </div>

    <div class="space-y-4">
      <LoanReviewCard
        v-for="r in reviews"
        :key="r.reviewer"
        :data-testid="TEST_IDS.LOAN.REVIEW_CARD"
        :review="r"
      />
    </div>

    <div
      v-if="overallDecision"
      :data-testid="TEST_IDS.LOAN.OVERALL_RESULT"
      class="mt-8 p-6 rounded-xl border-2"
      :class="{
        'border-success-500 bg-success-50 dark:bg-success-950': overallDecision === 'approved',
        'border-error-500 bg-error-50 dark:bg-error-950': overallDecision === 'denied',
        'border-warning-500 bg-warning-50 dark:bg-warning-950': overallDecision === 'flagged',
      }"
    >
      <div class="flex items-center gap-3 mb-2">
        <UIcon
          :name="
            overallDecision === 'approved'
              ? 'i-lucide-check-circle-2'
              : overallDecision === 'denied'
                ? 'i-lucide-x-circle'
                : 'i-lucide-alert-triangle'
          "
          class="text-2xl"
        />
        <h2 class="text-xl font-bold">
          {{
            overallDecision === 'approved'
              ? 'Application Approved'
              : overallDecision === 'denied'
                ? 'Application Denied'
                : 'Application Flagged for Review'
          }}
        </h2>
      </div>
      <p>{{ summaryText }}</p>
    </div>

    <div class="mt-8">
      <NuxtLink :to="`/loan/${id}`">
        <UButton label="Back to Application" variant="ghost" icon="i-lucide-arrow-left" />
      </NuxtLink>
    </div>
  </UContainer>
</template>
