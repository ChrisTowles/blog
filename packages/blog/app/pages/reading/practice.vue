<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const { activeChildId } = useActiveChild();
</script>

<template>
  <UPageHeader title="Practice Cards" description="Review phonics patterns and sight words." />
  <UPageBody>
    <div class="max-w-md mx-auto">
      <div v-if="!activeChildId" class="text-center py-12">
        <p class="text-lg text-gray-500 mb-4">Select a child profile first.</p>
        <UButton to="/reading/onboarding">Set Up a Profile</UButton>
      </div>
      <div v-else class="text-center py-12">
        <p class="text-gray-500">Card review will load here once cards are due.</p>
        <UButton to="/reading/dashboard" variant="ghost" class="mt-4">Back to Dashboard</UButton>
      </div>
    </div>
  </UPageBody>
</template>
