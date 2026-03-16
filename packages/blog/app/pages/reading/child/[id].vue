<script setup lang="ts">
definePageMeta({ layout: 'reading', middleware: 'auth' });

const route = useRoute();
const childId = computed(() => Number(route.params.id));
</script>

<template>
  <div class="space-y-8">
    <div class="text-center space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        Child Profile
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">Manage profile for child #{{ childId }}</p>
    </div>

    <div class="max-w-2xl mx-auto">
      <div
        class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/20 p-8 shadow-md reading-float-in"
      >
        <div class="text-4xl mb-3">👤</div>
        <p class="text-lg text-[var(--reading-text)]/70 mb-6">
          Child profile management will be available here.
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
