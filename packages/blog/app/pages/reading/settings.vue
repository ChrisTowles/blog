<script setup lang="ts">
definePageMeta({
  layout: 'reading',
  middleware: 'auth',
});
</script>

<template>
  <div class="space-y-8 reading-pop">
    <h1
      class="text-3xl font-bold text-[var(--reading-text)]"
      style="font-family: var(--reading-font-display)"
    >
      Settings
    </h1>

    <div class="grid md:grid-cols-2 gap-8">
      <div
        class="rounded-2xl bg-[var(--reading-card-bg)] p-6 shadow-sm border border-[var(--reading-pink)]/20"
      >
        <ReadingThemePicker />
      </div>

      <div
        class="rounded-2xl bg-[var(--reading-card-bg)] p-6 shadow-sm border border-[var(--reading-pink)]/20"
      >
        <ReadingThemeCreator />
      </div>
    </div>
  </div>
</template>
