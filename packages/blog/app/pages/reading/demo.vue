<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { DEMO_STORIES } from '~/data/demo-stories';

definePageMeta({ layout: 'default' });

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
  <div v-if="!isReading">
    <UPageHeader
      title="Try It Out"
      description="Read a story with word-by-word highlighting and text-to-speech. Click any word to hear it. No account needed."
    />
    <UPageBody>
      <div class="max-w-3xl mx-auto space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 reading-stagger">
          <UCard
            v-for="story in DEMO_STORIES"
            :key="story.id"
            class="cursor-pointer hover:ring-2 hover:ring-primary transition-all reading-wobble-hover"
            @click="selectStory(story.id)"
          >
            <template #header>
              <h3 class="font-semibold text-lg">{{ story.title }}</h3>
            </template>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">{{ story.theme }}</p>
              <div class="flex flex-wrap gap-1">
                <UBadge v-for="pattern in story.patterns" :key="pattern" variant="subtle" size="xs">
                  {{ pattern }}
                </UBadge>
              </div>
              <p class="text-xs text-gray-400">
                Phase {{ story.phase }} &middot; {{ story.content.pages.length }} pages
              </p>
            </div>
          </UCard>
        </div>

        <div class="text-center pt-4">
          <p class="text-sm text-gray-500 mb-2">
            Want personalized stories matched to your child's level?
          </p>
          <UButton to="/reading/onboarding" variant="soft">Create a Free Account</UButton>
        </div>
      </div>
    </UPageBody>
  </div>

  <div v-else class="h-screen bg-white dark:bg-gray-950">
    <div class="absolute top-4 left-4 z-10">
      <UButton icon="i-heroicons-arrow-left" variant="ghost" @click="isReading = false">
        Back to Stories
      </UButton>
    </div>
    <ReadingStoryReader
      :title="selectedStory.title"
      :content="selectedStory.content"
      :illustration-urls="selectedStory.illustrationUrls"
    />
    <div class="absolute bottom-20 left-0 right-0 text-center">
      <UButton to="/reading/onboarding" variant="soft" size="sm">
        Sign up for personalized stories
      </UButton>
    </div>
  </div>
</template>
