<script setup lang="ts">
definePageMeta({
  layout: 'reading',
  middleware: 'auth',
});
</script>

<template>
  <div class="space-y-10 reading-pop">
    <!-- Hero header -->
    <div class="text-center space-y-4 reading-float-in">
      <div class="inline-block mb-2">
        <span class="text-5xl reading-bounce inline-block">🎨</span>
      </div>
      <h1
        class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--reading-pink)] via-[var(--reading-primary)] to-[var(--reading-green)] bg-clip-text text-transparent"
        style="font-family: var(--reading-font-display)"
      >
        Settings
      </h1>
      <p
        class="text-xl md:text-2xl text-[var(--reading-text)]/60 max-w-md mx-auto"
        style="font-family: var(--reading-font-body)"
      >
        Make it yours! Pick colors and themes.
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto reading-stagger">
      <!-- Theme picker card -->
      <div
        class="group rounded-3xl bg-[var(--reading-card-bg)] p-8 shadow-lg shadow-[var(--reading-pink)]/10 border-2 border-[var(--reading-pink)]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--reading-pink)]/15 hover:border-[var(--reading-pink)]/40"
      >
        <div class="flex items-center gap-3 mb-6">
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--reading-pink)]/15 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          >
            <span class="text-2xl">🎭</span>
          </div>
          <h2
            class="text-2xl font-bold text-[var(--reading-text)]"
            style="font-family: var(--reading-font-display)"
          >
            Pick a Theme
          </h2>
        </div>
        <ReadingThemePicker />
      </div>

      <!-- Theme creator card -->
      <div
        class="group rounded-3xl bg-[var(--reading-card-bg)] p-8 shadow-lg shadow-[var(--reading-primary)]/10 border-2 border-[var(--reading-primary)]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--reading-primary)]/15 hover:border-[var(--reading-primary)]/40"
      >
        <div class="flex items-center gap-3 mb-6">
          <div
            class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--reading-primary)]/15 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          >
            <span class="text-2xl">✨</span>
          </div>
          <h2
            class="text-2xl font-bold text-[var(--reading-text)]"
            style="font-family: var(--reading-font-display)"
          >
            Create Your Own
          </h2>
        </div>
        <ReadingThemeCreator />
      </div>
    </div>
  </div>
</template>
