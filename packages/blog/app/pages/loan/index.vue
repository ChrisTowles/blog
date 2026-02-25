<script setup lang="ts">
import { extractErrorMessage } from '~~/shared/error-util';
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

useSeoMeta({
  title: 'Agentic Loan Workflow Demo',
  description: 'Demo: multi-agent AI orchestration with human-in-the-loop approval for home loans',
});

const toast = useToast();
const loading = ref(false);

async function startApplication() {
  loading.value = true;
  try {
    const result = await $fetch('/api/loan', { method: 'POST' });
    await navigateTo(`/loan/${result.id}`);
  } catch (error) {
    toast.add({
      description: extractErrorMessage(error),
      icon: 'i-lucide-alert-circle',
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <UContainer :data-testid="TEST_IDS.LOAN.PAGE" class="py-8 max-w-4xl">
    <div class="mb-8">
      <div class="flex items-center gap-2 mb-1">
        <UBadge color="warning" variant="subtle" label="Demo" size="sm" />
        <h1 class="text-3xl font-bold text-highlighted">Agentic Loan Workflow</h1>
      </div>
      <p class="text-muted mt-2">
        A demo of multi-agent AI orchestration with human-in-the-loop approval
      </p>
    </div>

    <div class="flex flex-col items-center gap-6 py-12">
      <UIcon name="i-lucide-bot" class="text-6xl text-primary" />
      <div class="text-center max-w-lg space-y-3">
        <p class="text-lg">
          This demo showcases an agentic workflow where AI collects data via chat, three independent
          AI agents review the application, and a human makes the final decision.
        </p>
        <div class="flex flex-wrap justify-center gap-2 text-sm">
          <UBadge color="neutral" variant="outline" label="Conversational intake" />
          <UBadge color="neutral" variant="outline" label="3 AI reviewers" />
          <UBadge color="neutral" variant="outline" label="Real-time SSE streaming" />
          <UBadge color="neutral" variant="outline" label="Human-in-the-loop" />
        </div>
      </div>
      <UButton
        :data-testid="TEST_IDS.LOAN.START_BUTTON"
        label="Try the Demo"
        size="lg"
        icon="i-lucide-play"
        :loading="loading"
        @click="startApplication"
      />
      <p class="text-xs text-muted">
        No real financial data is processed. This is a technical demo.
      </p>
    </div>
  </UContainer>
</template>
