<script setup lang="ts">
import type { LoanApplicationData } from '~~/shared/loan-types';
import { isApplicationComplete } from '~~/shared/loan-types';
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'default',
});

useSeoMeta({
  title: 'Home Loan Application Demo',
  description: 'AI-powered home loan application with multi-agent approval workflow',
});

const toast = useToast();
const { model } = useModels();

const applicationId = ref<string | null>(null);
const phase = ref<'start' | 'intake' | 'review'>('start');
const applicationData = ref<LoanApplicationData>({});
const input = ref('');
const loading = ref(false);

const canSubmit = computed(() => isApplicationComplete(applicationData.value));

const loanChat = shallowRef<ReturnType<typeof useLoanChat> | null>(null);
const loanReview = shallowRef<ReturnType<typeof useLoanReview> | null>(null);

async function startApplication() {
  loading.value = true;
  try {
    const result = await $fetch('/api/loan', { method: 'POST' });
    applicationId.value = result.id;

    loanChat.value = useLoanChat({
      id: result.id,
      model,
      onError(error) {
        toast.add({ description: error.message, color: 'error' });
      },
      onApplicationUpdate(data) {
        applicationData.value = data;
      },
    });

    phase.value = 'intake';
  } catch (error) {
    toast.add({
      description: error instanceof Error ? error.message : 'Failed to create application',
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
}

function handleSubmitMessage(e: Event) {
  e.preventDefault();
  if (input.value.trim() && loanChat.value) {
    loanChat.value.sendMessage(input.value);
    input.value = '';
  }
}

function submitForReview() {
  if (!applicationId.value) return;

  loanReview.value = useLoanReview({
    applicationId: applicationId.value,
    onError(error) {
      toast.add({ description: error.message, color: 'error' });
    },
    onComplete() {},
  });

  phase.value = 'review';
  loanReview.value.startReview();
}
</script>

<template>
  <UContainer :data-testid="TEST_IDS.LOAN.PAGE" class="py-8 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-highlighted">Home Loan Application</h1>
      <p class="text-muted mt-2">AI-powered loan application with multi-agent approval workflow</p>
    </div>

    <!-- Phase: Start -->
    <div v-if="phase === 'start'" class="flex flex-col items-center gap-6 py-16">
      <UIcon name="i-lucide-building-2" class="text-6xl text-primary" />
      <p class="text-lg text-center max-w-md">
        Start a conversation with our AI loan officer to apply for a home loan. Three independent
        reviewers will evaluate your application.
      </p>
      <UButton
        :data-testid="TEST_IDS.LOAN.START_BUTTON"
        label="Start Application"
        size="lg"
        :loading="loading"
        @click="startApplication"
      />
    </div>

    <!-- Phase: Intake Chat -->
    <div v-else-if="phase === 'intake'" class="space-y-6">
      <LoanProgress :application-data="applicationData" />

      <div v-if="loanChat">
        <UChatMessages
          :data-testid="TEST_IDS.LOAN.CHAT_MESSAGES"
          :messages="loanChat.messages.value"
          :status="loanChat.status.value"
          class="min-h-[400px] pb-4"
        >
          <template #content="{ message }">
            <div class="*:first:mt-0 *:last:mb-0">
              <template v-for="(part, index) in message.parts" :key="`${message.id}-${index}`">
                <div v-if="part.type === 'text'" class="whitespace-pre-wrap">{{ part.text }}</div>
              </template>
            </div>
          </template>
        </UChatMessages>

        <div class="sticky bottom-0 z-10 space-y-3">
          <UChatPrompt
            :data-testid="TEST_IDS.LOAN.CHAT_INPUT"
            v-model="input"
            variant="subtle"
            placeholder="Type your answer..."
            @submit="handleSubmitMessage"
          >
            <template #footer>
              <div class="flex items-center justify-between w-full">
                <ModelSelect v-model="model" />
                <div class="flex items-center gap-2">
                  <UButton
                    v-if="canSubmit"
                    :data-testid="TEST_IDS.LOAN.SUBMIT_REVIEW_BUTTON"
                    label="Submit for Review"
                    color="success"
                    variant="soft"
                    icon="i-lucide-send"
                    @click="submitForReview"
                  />
                  <UChatPromptSubmit color="neutral" />
                </div>
              </div>
            </template>
          </UChatPrompt>
        </div>
      </div>
    </div>

    <!-- Phase: Review -->
    <div v-else-if="phase === 'review'" class="space-y-6">
      <div v-if="loanReview">
        <div class="space-y-4">
          <LoanReviewCard
            v-for="r in loanReview.reviews.value"
            :key="r.reviewer"
            :data-testid="TEST_IDS.LOAN.REVIEW_CARD"
            :review="r"
          />
        </div>

        <div
          v-if="loanReview.status.value === 'complete'"
          :data-testid="TEST_IDS.LOAN.OVERALL_RESULT"
          class="mt-8 p-6 rounded-xl border-2"
          :class="{
            'border-success-500 bg-success-50 dark:bg-success-950':
              loanReview.overallDecision.value === 'approved',
            'border-error-500 bg-error-50 dark:bg-error-950':
              loanReview.overallDecision.value === 'denied',
            'border-warning-500 bg-warning-50 dark:bg-warning-950':
              loanReview.overallDecision.value === 'flagged',
          }"
        >
          <div class="flex items-center gap-3 mb-2">
            <UIcon
              :name="
                loanReview.overallDecision.value === 'approved'
                  ? 'i-lucide-check-circle-2'
                  : loanReview.overallDecision.value === 'denied'
                    ? 'i-lucide-x-circle'
                    : 'i-lucide-alert-triangle'
              "
              class="text-2xl"
            />
            <h2 class="text-xl font-bold">
              {{
                loanReview.overallDecision.value === 'approved'
                  ? 'Application Approved'
                  : loanReview.overallDecision.value === 'denied'
                    ? 'Application Denied'
                    : 'Application Flagged for Review'
              }}
            </h2>
          </div>
          <p>{{ loanReview.summary.value }}</p>
        </div>
      </div>
    </div>
  </UContainer>
</template>
