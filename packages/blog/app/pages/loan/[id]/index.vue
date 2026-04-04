<script lang="ts">
import type { DefineComponent } from 'vue';
import ProsePre from '../../../components/prose/ProsePre.vue';

const components = {
  pre: ProsePre as unknown as DefineComponent,
};
</script>

<script setup lang="ts">
import type { LoanApplicationData } from '~~/shared/loan-types';
import { isApplicationComplete } from '~~/shared/loan-types';
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'loan',
  middleware: 'auth',
});

useSeoMeta({
  title: 'Agentic Loan Workflow — Intake',
  description: 'Demo: AI-powered conversational data collection for loan applications',
});

const route = useRoute();
const toast = useToast();
const { model } = useModels();

const { data } = await useFetch(`/api/loan/${route.params.id}`);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Application not found', fatal: true });
}

if (data.value.status !== 'intake') {
  await navigateTo(`/loan/${route.params.id}/review`, { replace: true });
}

const applicationData = ref<LoanApplicationData>(
  (data.value.applicationData as LoanApplicationData) || {},
);
const input = ref('');

const canSubmit = computed(() => isApplicationComplete(applicationData.value));

const loanChat = useLoanChat({
  id: route.params.id as string,
  model,
  onError(error) {
    toast.add({ description: error.message, color: 'error' });
  },
  onApplicationUpdate(appData) {
    applicationData.value = appData;
  },
});

function handleSubmitMessage(e: Event) {
  e.preventDefault();
  if (input.value.trim()) {
    loanChat.sendMessage(input.value);
    input.value = '';
  }
}

function submitForReview() {
  navigateTo(`/loan/${route.params.id}/review`);
}
</script>

<template>
  <div :data-testid="TEST_IDS.LOAN.PAGE" class="flex flex-col h-full">
    <!-- Fixed header -->
    <div class="shrink-0 border-b border-default px-4 py-4">
      <UContainer class="max-w-4xl">
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <UBadge color="warning" variant="subtle" label="Demo" size="sm" />
            <h1 class="text-3xl font-bold text-highlighted">Agentic Loan Workflow</h1>
          </div>
          <p class="text-muted mt-1 text-sm">
            Step 1: AI collects your application via chat. Answer naturally — the agent extracts
            structured data.
          </p>
        </div>
        <LoanProgress :application-data="applicationData" />
      </UContainer>
    </div>

    <!-- Scrollable chat messages -->
    <div class="flex-1 overflow-y-auto">
      <UContainer class="max-w-4xl">
        <UChatMessages
          should-auto-scroll
          :data-testid="TEST_IDS.LOAN.CHAT_MESSAGES"
          :messages="loanChat.messages.value as any"
          :status="loanChat.status.value"
          class="pb-4"
        >
          <template #content="{ message }">
            <div class="*:first:mt-0 *:last:mb-0">
              <template v-for="(part, index) in message.parts" :key="`${message.id}-${index}`">
                <MDCCached
                  v-if="part.type === 'text'"
                  :value="part.text"
                  :cache-key="`${message.id}-${index}`"
                  :components="components"
                  :parser-options="{ highlight: false }"
                  class="*:first:mt-0 *:last:mb-0"
                />
              </template>
            </div>
          </template>
        </UChatMessages>
      </UContainer>
    </div>

    <!-- Fixed chat input -->
    <div class="shrink-0 border-t border-default px-4 pb-4 pt-2">
      <UContainer class="max-w-4xl">
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
                <UChatPromptSubmit
                  :status="loanChat.status.value"
                  color="neutral"
                  @stop="loanChat.stop()"
                />
              </div>
            </div>
          </template>
        </UChatPrompt>
      </UContainer>
    </div>
  </div>
</template>
