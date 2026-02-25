<script setup lang="ts">
import { extractErrorMessage } from '~~/shared/error-util';
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

useSeoMeta({
  title: 'Home Loan Application Demo',
  description: 'AI-powered home loan application with multi-agent approval workflow',
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
      <h1 class="text-3xl font-bold text-highlighted">Home Loan Application</h1>
      <p class="text-muted mt-2">AI-powered loan application with multi-agent approval workflow</p>
    </div>

    <div class="flex flex-col items-center gap-6 py-16">
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
  </UContainer>
</template>
