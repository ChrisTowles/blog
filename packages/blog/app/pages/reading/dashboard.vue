<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
definePageMeta({ middleware: 'auth' });

const { activeChildId } = useActiveChild();
</script>

<template>
  <div :data-testid="TEST_IDS.READING.DASHBOARD_PAGE">
    <UPageHeader
      title="Reading Dashboard"
      description="Track progress and start reading sessions."
    />
    <UPageBody>
      <div class="max-w-4xl mx-auto space-y-6">
        <div
          v-if="!activeChildId"
          :data-testid="TEST_IDS.READING.NO_CHILD_PROMPT"
          class="text-center py-12"
        >
          <p class="text-lg text-gray-500 mb-4">No child profile selected.</p>
          <UButton to="/reading/onboarding">Set Up a Profile</UButton>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard>
            <template #header><h3 class="font-semibold">Stories</h3></template>
            <p class="text-gray-500 mb-4">Read AI-generated stories matched to your level.</p>
            <UButton :to="`/reading/child/${activeChildId}`" variant="soft">Browse Stories</UButton>
          </UCard>
          <UCard>
            <template #header><h3 class="font-semibold">Practice Cards</h3></template>
            <p class="text-gray-500 mb-4">Review phonics and sight word flashcards.</p>
            <UButton to="/reading/practice" variant="soft">Start Practice</UButton>
          </UCard>
        </div>
      </div>
    </UPageBody>
  </div>
</template>
