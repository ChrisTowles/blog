<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { DEMO_STORIES } from '~/data/demo-stories';

definePageMeta({ layout: 'reading' });

const selectedStory = ref(DEMO_STORIES[0]!);
const isReading = ref(false);

function selectStory(id: string) {
  const story = DEMO_STORIES.find((s) => s.id === id);
  if (story) {
    selectedStory.value = story;
    isReading.value = true;
  }
}
</script>

<template>
  <div v-if="!isReading" class="space-y-8">
    <div class="text-center space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        Try It Out
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">
        Read a story with word-by-word highlighting and text-to-speech. Click any word to hear it.
      </p>
    </div>

    <div class="max-w-3xl mx-auto space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 reading-stagger">
        <div
          v-for="story in DEMO_STORIES"
          :key="story.id"
          class="cursor-pointer reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/20 p-5 shadow-md hover:border-[var(--reading-primary)]/60 hover:shadow-lg transition-all"
          @click="selectStory(story.id)"
        >
          <h3
            class="text-xl font-bold text-[var(--reading-text)] mb-2"
            style="font-family: var(--reading-font-display)"
          >
            {{ story.title }}
          </h3>
          <p class="text-base text-[var(--reading-text)]/60 mb-3">{{ story.theme }}</p>
          <div class="flex flex-wrap gap-1 mb-2">
            <span
              v-for="pattern in story.patterns"
              :key="pattern"
              class="text-xs px-2 py-0.5 rounded-full bg-[var(--reading-highlight)]/30 text-[var(--reading-text)]/80 font-medium"
            >
              {{ pattern }}
            </span>
          </div>
          <p class="text-sm text-[var(--reading-text)]/50">
            Phase {{ story.phase }} &middot; {{ story.content.pages.length }} pages
          </p>
        </div>
      </div>

      <div class="text-center">
        <p class="text-lg text-[var(--reading-text)]/60 mb-3">
          Want personalized stories matched to your child's level?
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-6 !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white !font-bold"
        >
          Create a Free Account
        </UButton>
      </div>
    </div>
  </div>

  <div v-else class="reading-theme min-h-[80vh] relative">
    <div class="absolute top-4 left-4 z-10">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)] !font-bold"
        @click="isReading = false"
      >
        Back to Stories
      </UButton>
    </div>
    <ReadingStoryReader
      :title="selectedStory.title"
      :content="selectedStory.content"
      :illustration-urls="selectedStory.illustrationUrls"
    />
    <div class="text-center py-4">
      <UButton
        to="/reading/onboarding"
        class="!rounded-full !px-6 !bg-[var(--reading-secondary)] hover:!bg-[var(--reading-secondary)]/85 !text-[var(--reading-text)] !font-bold"
        size="sm"
      >
        Sign up for personalized stories
      </UButton>
    </div>
  </div>
</template>
