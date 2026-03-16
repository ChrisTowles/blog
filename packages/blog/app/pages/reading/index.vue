<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
definePageMeta({ layout: 'reading' });
</script>

<template>
  <div :data-testid="TEST_IDS.READING.LANDING_PAGE" class="text-center space-y-10">
    <div class="space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        AI-Powered Reading Practice
      </h1>
      <p class="text-xl md:text-2xl text-[var(--reading-text)]/70">
        Personalized decodable stories matched to your child's phonics level and interests.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 reading-stagger max-w-3xl mx-auto">
      <div
        class="reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-sky-blue)]/30 p-6 shadow-md shadow-[var(--reading-sky-blue)]/10"
      >
        <div class="text-4xl mb-3">📖</div>
        <h3
          class="text-xl font-bold text-[var(--reading-primary)] mb-2"
          style="font-family: var(--reading-font-display)"
        >
          Personalized Stories
        </h3>
        <p class="text-lg text-[var(--reading-text)]/80">
          AI generates stories using only words your child can decode.
        </p>
      </div>
      <div
        class="reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-orange)]/30 p-6 shadow-md shadow-[var(--reading-orange)]/10"
      >
        <div class="text-4xl mb-3">🧠</div>
        <h3
          class="text-xl font-bold text-[var(--reading-accent)] mb-2"
          style="font-family: var(--reading-font-display)"
        >
          Spaced Repetition
        </h3>
        <p class="text-lg text-[var(--reading-text)]/80">
          Science-backed flashcards for phonics patterns and sight words.
        </p>
      </div>
      <div
        class="reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-green)]/30 p-6 shadow-md shadow-[var(--reading-green)]/10"
      >
        <div class="text-4xl mb-3">🔊</div>
        <h3
          class="text-xl font-bold text-[var(--reading-success)] mb-2"
          style="font-family: var(--reading-font-display)"
        >
          Read Along
        </h3>
        <p class="text-lg text-[var(--reading-text)]/80">
          Word-by-word highlighting with text-to-speech at child-friendly pace.
        </p>
      </div>
    </div>

    <div class="flex gap-4 justify-center reading-stagger">
      <UButton
        :data-testid="TEST_IDS.READING.LANDING_CTA"
        to="/reading/demo"
        size="xl"
        class="!rounded-full !px-8 !py-3 !text-lg !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
      >
        Try a Story
      </UButton>
      <UButton
        to="/reading/onboarding"
        size="xl"
        variant="outline"
        class="!rounded-full !px-8 !py-3 !text-lg !font-bold !border-[var(--reading-primary)] !text-[var(--reading-primary)]"
      >
        Create Account
      </UButton>
    </div>
  </div>
</template>
