<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
definePageMeta({ layout: 'reading' });
</script>

<template>
  <div :data-testid="TEST_IDS.READING.LANDING_PAGE" class="text-center space-y-12 py-4">
    <!-- Hero section with gradient text -->
    <div class="space-y-4">
      <div class="text-6xl md:text-7xl mb-2 reading-bounce">📚</div>
      <h1
        class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[var(--reading-primary)] via-[var(--reading-accent)] to-[var(--reading-secondary)] bg-clip-text text-transparent"
        style="font-family: var(--reading-font-display)"
      >
        AI-Powered Reading Practice
      </h1>
      <p
        class="text-2xl md:text-3xl text-[var(--reading-text)]/70 max-w-2xl mx-auto leading-relaxed"
        style="font-family: var(--reading-font-body)"
      >
        Personalized decodable stories matched to your child's phonics level and interests.
      </p>
    </div>

    <!-- Feature cards with emoji headers and gradient borders -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reading-stagger max-w-4xl mx-auto">
      <div
        class="reading-wobble-hover rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-primary)]/40 p-8 shadow-lg shadow-[var(--reading-primary)]/15 hover:shadow-xl hover:shadow-[var(--reading-primary)]/25 hover:-translate-y-1 transition-all duration-300"
      >
        <div class="text-6xl mb-4 reading-float-in">📖</div>
        <h3
          class="text-2xl font-bold text-[var(--reading-primary)] mb-3"
          style="font-family: var(--reading-font-display)"
        >
          Personalized Stories
        </h3>
        <p class="text-xl text-[var(--reading-text)]/80 leading-relaxed">
          AI generates stories using only words your child can decode.
        </p>
      </div>
      <div
        class="reading-wobble-hover rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-accent)]/40 p-8 shadow-lg shadow-[var(--reading-accent)]/15 hover:shadow-xl hover:shadow-[var(--reading-accent)]/25 hover:-translate-y-1 transition-all duration-300"
      >
        <div class="text-6xl mb-4 reading-float-in" style="animation-delay: 100ms">🧠</div>
        <h3
          class="text-2xl font-bold text-[var(--reading-accent)] mb-3"
          style="font-family: var(--reading-font-display)"
        >
          Spaced Repetition
        </h3>
        <p class="text-xl text-[var(--reading-text)]/80 leading-relaxed">
          Science-backed flashcards for phonics patterns and sight words.
        </p>
      </div>
      <div
        class="reading-wobble-hover rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-success)]/40 p-8 shadow-lg shadow-[var(--reading-success)]/15 hover:shadow-xl hover:shadow-[var(--reading-success)]/25 hover:-translate-y-1 transition-all duration-300"
      >
        <div class="text-6xl mb-4 reading-float-in" style="animation-delay: 200ms">🔊</div>
        <h3
          class="text-2xl font-bold text-[var(--reading-success)] mb-3"
          style="font-family: var(--reading-font-display)"
        >
          Read Along
        </h3>
        <p class="text-xl text-[var(--reading-text)]/80 leading-relaxed">
          Word-by-word highlighting with text-to-speech at child-friendly pace.
        </p>
      </div>
    </div>

    <!-- CTA buttons with bigger touch targets and playful styling -->
    <div class="flex flex-col sm:flex-row gap-5 justify-center items-center reading-stagger">
      <UButton
        :data-testid="TEST_IDS.READING.LANDING_CTA"
        to="/reading/demo"
        size="xl"
        class="!rounded-full !px-10 !py-4 !text-xl !font-bold !bg-gradient-to-r !from-[var(--reading-accent)] !to-[var(--reading-accent)] hover:!brightness-110 !text-white !shadow-lg !shadow-[var(--reading-accent)]/30 hover:!shadow-xl hover:!shadow-[var(--reading-accent)]/40 !transition-all !duration-300 hover:!scale-105 !min-h-[56px] !min-w-[200px]"
      >
        🎉 Try a Story
      </UButton>
      <UButton
        to="/reading/onboarding"
        size="xl"
        variant="outline"
        class="!rounded-full !px-10 !py-4 !text-xl !font-bold !border-3 !border-[var(--reading-primary)] !text-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/10 !transition-all !duration-300 hover:!scale-105 !min-h-[56px] !min-w-[200px]"
      >
        ✨ Create Account
      </UButton>
    </div>

    <!-- Decorative bottom wave accent -->
    <div class="relative h-8 overflow-hidden opacity-30 max-w-3xl mx-auto">
      <div
        class="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-r from-[var(--reading-primary)] via-[var(--reading-secondary)] to-[var(--reading-accent)] rounded-full blur-sm"
      />
    </div>
  </div>
</template>
