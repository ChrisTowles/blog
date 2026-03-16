<script setup lang="ts">
definePageMeta({ layout: 'reading', middleware: 'auth' });

const { activeChildId } = useActiveChild();
</script>

<template>
  <div class="space-y-10">
    <!-- Hero header -->
    <div class="text-center space-y-4 reading-float-in">
      <div class="inline-block mb-2">
        <span class="text-5xl reading-bounce inline-block">🎴</span>
      </div>
      <h1
        class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--reading-accent)] via-[var(--reading-pink)] to-[var(--reading-primary)] bg-clip-text text-transparent"
        style="font-family: var(--reading-font-display)"
      >
        Practice Cards
      </h1>
      <p
        class="text-xl md:text-2xl text-[var(--reading-text)]/60 max-w-md mx-auto"
        style="font-family: var(--reading-font-body)"
      >
        Review phonics patterns and sight words!
      </p>
    </div>

    <div class="max-w-lg mx-auto">
      <!-- No child selected -->
      <div v-if="!activeChildId" class="text-center py-12 reading-float-in">
        <div
          class="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[var(--reading-yellow)]/30 to-[var(--reading-pink)]/20 mb-6 shadow-lg shadow-[var(--reading-yellow)]/10"
        >
          <span class="text-6xl">📝</span>
        </div>
        <p
          class="text-2xl md:text-3xl text-[var(--reading-text)]/70 mb-8"
          style="font-family: var(--reading-font-display)"
        >
          Select a child profile first.
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-10 !py-4 !text-xl !font-bold !bg-gradient-to-r !from-[var(--reading-accent)] !to-[var(--reading-orange)] hover:!shadow-lg hover:!shadow-[var(--reading-accent)]/30 !text-white !transition-all !duration-300 hover:!scale-105"
        >
          Set Up a Profile
        </UButton>
      </div>

      <!-- Cards placeholder -->
      <div v-else class="reading-float-in">
        <div
          class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/20 p-10 shadow-xl shadow-[var(--reading-primary)]/10 text-center"
        >
          <!-- Decorative dots -->
          <div class="flex justify-center gap-3 mb-6">
            <span class="w-4 h-4 rounded-full bg-[var(--reading-orange)] opacity-60" />
            <span class="w-4 h-4 rounded-full bg-[var(--reading-yellow)] opacity-60" />
            <span class="w-4 h-4 rounded-full bg-[var(--reading-green)] opacity-60" />
            <span class="w-4 h-4 rounded-full bg-[var(--reading-sky-blue)] opacity-60" />
            <span class="w-4 h-4 rounded-full bg-[var(--reading-pink)] opacity-60" />
          </div>

          <div
            class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--reading-primary)]/20 to-[var(--reading-sky-blue)]/10 mb-6"
          >
            <span class="text-5xl">🎴</span>
          </div>

          <p
            class="text-2xl md:text-3xl text-[var(--reading-text)]/70 mb-4 leading-relaxed"
            style="font-family: var(--reading-font-display)"
          >
            Card review will load here once cards are due.
          </p>
          <p class="text-lg text-[var(--reading-text)]/50 mb-8">
            Check back soon for your next practice session!
          </p>

          <UButton
            to="/reading/dashboard"
            class="!rounded-full !px-8 !py-3 !text-lg !font-bold !border-2 !border-[var(--reading-primary)] !text-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/10 !transition-all !duration-300 hover:!scale-105"
            variant="outline"
          >
            Back to Dashboard
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
