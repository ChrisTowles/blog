<script setup lang="ts">
definePageMeta({ layout: 'reading', middleware: 'auth' });

const { activeChildId } = useActiveChild();
</script>

<template>
  <div class="space-y-8">
    <div class="text-center space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        Practice Cards
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">Review phonics patterns and sight words.</p>
    </div>

    <div class="max-w-md mx-auto">
      <div v-if="!activeChildId" class="text-center py-16 reading-float-in">
        <div class="text-5xl mb-4">📝</div>
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-6"
          style="font-family: var(--reading-font-display)"
        >
          Select a child profile first.
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-8 !py-3 !text-lg !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
        >
          Set Up a Profile
        </UButton>
      </div>

      <div v-else class="text-center py-16 reading-float-in">
        <div class="text-5xl mb-4">🎴</div>
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-6"
          style="font-family: var(--reading-font-display)"
        >
          Card review will load here once cards are due.
        </p>
        <UButton
          to="/reading/dashboard"
          class="!rounded-full !px-6 !font-bold !border-[var(--reading-primary)] !text-[var(--reading-primary)]"
          variant="outline"
        >
          Back to Dashboard
        </UButton>
      </div>
    </div>
  </div>
</template>
