<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
</script>

<template>
  <UPageHeader
    title="Set Up Reading Profile"
    description="Create a profile for your child to get started."
  />
  <UPageBody>
    <div class="max-w-lg mx-auto">
      <UCard>
        <p class="text-gray-500 mb-4">
          The onboarding wizard will guide you through creating a child profile, selecting
          interests, and running an initial phonics assessment.
        </p>
        <UButton to="/reading/dashboard">Skip to Dashboard</UButton>
      </UCard>
    </div>
  </UPageBody>
</template>
