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

const storyEmojis = ['🐱', '🐶', '🦊', '🐻', '🐰', '🦁'];
</script>

<template>
  <div v-if="!isReading" class="space-y-10">
    <!-- Header with playful styling -->
    <div class="text-center space-y-4">
      <div class="text-5xl md:text-6xl reading-bounce">🎮</div>
      <h1
        class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[var(--reading-accent)] to-[var(--reading-pink)] bg-clip-text text-transparent"
        style="font-family: var(--reading-font-display)"
      >
        Try It Out
      </h1>
      <p class="text-2xl text-[var(--reading-text)]/70 max-w-xl mx-auto leading-relaxed">
        Read a story with word-by-word highlighting and text-to-speech. Click any word to hear it!
      </p>
    </div>

    <div class="max-w-4xl mx-auto space-y-10">
      <!-- Story cards with bigger, more colorful design -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 reading-stagger">
        <button
          v-for="(story, index) in DEMO_STORIES"
          :key="story.id"
          class="text-left cursor-pointer reading-wobble-hover rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-primary)]/25 p-7 shadow-lg hover:border-[var(--reading-primary)]/70 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          @click="selectStory(story.id)"
        >
          <!-- Story emoji avatar -->
          <div class="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {{ storyEmojis[index % storyEmojis.length] }}
          </div>
          <h3
            class="text-2xl font-bold text-[var(--reading-text)] mb-2 group-hover:text-[var(--reading-primary)] transition-colors"
            style="font-family: var(--reading-font-display)"
          >
            {{ story.title }}
          </h3>
          <p class="text-lg text-[var(--reading-text)]/60 mb-4 capitalize">{{ story.theme }}</p>
          <div class="flex flex-wrap gap-2 mb-3">
            <span
              v-for="pattern in story.patterns"
              :key="pattern"
              class="text-sm px-3 py-1 rounded-full bg-[var(--reading-highlight)]/40 text-[var(--reading-text)]/80 font-semibold border border-[var(--reading-highlight)]/50"
            >
              {{ pattern }}
            </span>
          </div>
          <p class="text-base text-[var(--reading-text)]/50 font-medium">
            Phase {{ story.phase }} &middot; {{ story.content.pages.length }} pages
          </p>

          <!-- Read button hint on hover -->
          <div class="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span
              class="inline-flex items-center gap-1 text-base font-bold text-[var(--reading-primary)] bg-[var(--reading-primary)]/10 px-4 py-2 rounded-full"
            >
              📖 Read this story
            </span>
          </div>
        </button>
      </div>

      <!-- Upsell CTA with more visual prominence -->
      <div
        class="text-center rounded-[2rem] bg-gradient-to-r from-[var(--reading-sky-blue)]/10 via-[var(--reading-pink)]/10 to-[var(--reading-orange)]/10 border-2 border-[var(--reading-pink)]/30 p-8"
      >
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-4"
          style="font-family: var(--reading-font-display)"
        >
          ✨ Want personalized stories matched to your child's level?
        </p>
        <UButton
          to="/reading/onboarding"
          size="xl"
          class="!rounded-full !px-8 !py-3 !text-lg !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white !font-bold !shadow-md hover:!shadow-lg !transition-all !duration-300 hover:!scale-105 !min-h-[52px]"
        >
          🎉 Create a Free Account
        </UButton>
      </div>
    </div>
  </div>

  <!-- Reading mode -->
  <div v-else class="reading-theme min-h-[80vh] relative">
    <div class="absolute top-4 left-4 z-10">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        size="lg"
        class="!rounded-full !text-[var(--reading-primary)] !font-bold !text-lg !px-5 !py-3 hover:!bg-[var(--reading-primary)]/10 !transition-all !duration-200 !min-h-[48px]"
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
    <div class="text-center py-6">
      <UButton
        to="/reading/onboarding"
        class="!rounded-full !px-8 !py-3 !bg-[var(--reading-secondary)] hover:!bg-[var(--reading-secondary)]/85 !text-[var(--reading-text)] !font-bold !shadow-md hover:!shadow-lg !transition-all !duration-300 hover:!scale-105 !min-h-[48px] !text-lg"
        size="lg"
      >
        ✨ Sign up for personalized stories
      </UButton>
    </div>
  </div>
</template>
