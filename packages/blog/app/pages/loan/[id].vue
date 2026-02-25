<script setup lang="ts">
import type { DefineComponent } from 'vue';
import type { LoanApplicationData } from '~~/shared/loan-types';
import { isApplicationComplete } from '~~/shared/loan-types';
import { TEST_IDS } from '~~/shared/test-ids';
import ProsePre from '../../components/prose/ProsePre.vue';

const components = {
  pre: ProsePre as unknown as DefineComponent,
};

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

useSeoMeta({
  title: 'Home Loan Application',
  description: 'AI-powered home loan intake chat',
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
  <UContainer :data-testid="TEST_IDS.LOAN.PAGE" class="py-8 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-highlighted">Home Loan Application</h1>
      <p class="text-muted mt-2">AI-powered loan application with multi-agent approval workflow</p>
    </div>

    <div class="space-y-6">
      <LoanProgress :application-data="applicationData" />

      <UChatMessages
        should-auto-scroll
        :data-testid="TEST_IDS.LOAN.CHAT_MESSAGES"
        :messages="loanChat.messages.value"
        :status="loanChat.status.value"
        class="min-h-[400px] pb-4"
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
                <UChatPromptSubmit
                  :status="loanChat.status.value"
                  color="neutral"
                  @stop="loanChat.stop()"
                />
              </div>
            </div>
          </template>
        </UChatPrompt>
      </div>
    </div>
  </UContainer>
</template>
