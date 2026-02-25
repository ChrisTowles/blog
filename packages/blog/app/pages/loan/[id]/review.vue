<script setup lang="ts">
import type { ReviewDecision, LoanApplicationData, LoanStatus } from '~~/shared/loan-types';
import {
  REVIEW_DECISIONS,
  REVIEWER_DISPLAY_NAMES,
  LOAN_APPLICATION_FIELDS,
  isApplicationComplete,
} from '~~/shared/loan-types';
import type { ReviewState } from '~/composables/useLoanReview';
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'loan',
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

// If still in intake and application is incomplete, redirect back
if (
  data.value.status === 'intake' &&
  !isApplicationComplete(data.value.applicationData as LoanApplicationData)
) {
  await navigateTo(`/loan/${id}`, { replace: true });
}

const applicationData = data.value.applicationData as LoanApplicationData;
const showAppData = ref(false);

const appDataFields = computed(() =>
  LOAN_APPLICATION_FIELDS.map((field) => ({
    label: field.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
    value: applicationData[field],
  })).filter((f) => f.value !== undefined && f.value !== null),
);

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

const rereviewing = ref(false);

async function requestReReview() {
  rereviewing.value = true;
  try {
    await $fetch(`/api/loan/${id}/re-review`, { method: 'POST' });
    // Full reload to bust useFetch cache — client-side nav would use stale status
    await navigateTo(`/loan/${id}`, { external: true });
  } catch (err) {
    toast.add({
      description: err instanceof Error ? err.message : 'Re-review failed',
      color: 'error',
    });
  } finally {
    rereviewing.value = false;
  }
}

const updatingStatus = ref(false);

async function setStatus(status: LoanStatus) {
  updatingStatus.value = true;
  try {
    await $fetch(`/api/loan/${id}/status`, { method: 'PATCH', body: { status } });
    // Full reload to bust useFetch cache
    await navigateTo(`/loan/${id}/review`, { external: true });
  } catch (err) {
    toast.add({
      description: err instanceof Error ? err.message : 'Status update failed',
      color: 'error',
    });
  } finally {
    updatingStatus.value = false;
  }
}

onMounted(() => {
  if (!hasExistingReviews && loanReview) {
    loanReview.startReview();
  }
});
</script>

<template>
  <div class="h-full overflow-y-auto">
    <UContainer class="py-8 max-w-4xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-highlighted">Loan Review</h1>
        <p class="text-muted mt-2">Multi-agent review of your loan application</p>
      </div>

      <!-- Application Data Summary -->
      <div class="mb-6 rounded-lg border border-default">
        <button
          class="flex items-center justify-between w-full text-left px-4 py-3"
          @click="showAppData = !showAppData"
        >
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-semibold">Application Details</span>
              <span v-if="!showAppData" class="text-sm text-muted truncate">
                — {{ applicationData.fullName }}
                <template v-if="applicationData.loanAmount">
                  &middot; ${{ applicationData.loanAmount.toLocaleString() }}
                </template>
                <template v-if="applicationData.propertyType">
                  &middot; {{ applicationData.propertyType }}
                </template>
              </span>
            </div>
          </div>
          <UIcon
            :name="showAppData ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            class="text-muted shrink-0 ml-2"
          />
        </button>
        <div
          v-if="showAppData"
          class="px-4 pb-4 grid grid-cols-2 md:grid-cols-3 gap-4 border-t border-default pt-4"
        >
          <div v-for="field in appDataFields" :key="field.label">
            <div class="text-xs text-muted">{{ field.label }}</div>
            <div class="font-medium">{{ field.value }}</div>
          </div>
        </div>
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

        <!-- Manual override controls -->
        <div class="mt-4 flex items-center gap-2">
          <span class="text-sm text-muted mr-1">Override:</span>
          <UButton
            v-if="overallDecision !== 'approved'"
            size="xs"
            variant="soft"
            color="success"
            label="Approve"
            icon="i-lucide-check"
            :loading="updatingStatus"
            @click="setStatus('approved')"
          />
          <UButton
            v-if="overallDecision !== 'denied'"
            size="xs"
            variant="soft"
            color="error"
            label="Deny"
            icon="i-lucide-x"
            :loading="updatingStatus"
            @click="setStatus('denied')"
          />
          <UButton
            v-if="overallDecision !== 'flagged'"
            size="xs"
            variant="soft"
            color="warning"
            label="Flag"
            icon="i-lucide-flag"
            :loading="updatingStatus"
            @click="setStatus('flagged')"
          />
        </div>
      </div>

      <div class="mt-8 flex items-center gap-3">
        <UButton label="Back to Loans" variant="ghost" icon="i-lucide-arrow-left" to="/loan" />
        <UButton
          v-if="overallDecision"
          label="Re-review"
          variant="soft"
          color="warning"
          icon="i-lucide-refresh-cw"
          :loading="rereviewing"
          @click="requestReReview"
        />
      </div>
    </UContainer>
  </div>
</template>
