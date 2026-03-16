<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
definePageMeta({ layout: 'reading' });
</script>

<template>
  <div :data-testid="TEST_IDS.READING.LANDING_PAGE">
    <UPageHeader
      title="AI-Powered Reading Practice"
      description="Personalized decodable stories matched to your child's phonics level and interests."
    />
    <UPageBody>
      <div class="max-w-2xl mx-auto text-center space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 reading-stagger">
          <UCard class="reading-wobble-hover">
            <template #header><h3 class="font-semibold">Personalized Stories</h3></template>
            AI generates stories using only words your child can decode.
          </UCard>
          <UCard class="reading-wobble-hover">
            <template #header><h3 class="font-semibold">Spaced Repetition</h3></template>
            Science-backed flashcards for phonics patterns and sight words.
          </UCard>
          <UCard class="reading-wobble-hover">
            <template #header><h3 class="font-semibold">Read Along</h3></template>
            Word-by-word highlighting with text-to-speech at child-friendly pace.
          </UCard>
        </div>
        <div class="flex gap-4 justify-center">
          <UButton :data-testid="TEST_IDS.READING.LANDING_CTA" to="/reading/demo" size="xl"
            >Try a Story</UButton
          >
          <UButton to="/reading/onboarding" size="xl" variant="outline">Create Account</UButton>
        </div>
      </div>
    </UPageBody>
  </div>
</template>
