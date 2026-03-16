<script setup lang="ts">
import { DEMO_STORIES } from '~/data/demo-stories';

definePageMeta({ layout: 'reading' });

const { activate: activateBedtime } = useBedtimeMode();

onMounted(() => {
  activateBedtime();
});

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
  <div v-if="!isReading" class="space-y-8 relative">
    <ReadingBedtimeSky />

    <div class="text-center space-y-3 relative z-10">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)] bedtime-text-glow"
        style="font-family: var(--reading-font-display)"
      >
        Bedtime Stories
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">
        Slow, soothing stories with warm colors and gentle narration.
      </p>
    </div>

    <div class="max-w-3xl mx-auto relative z-10">
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
          <p class="text-sm text-[var(--reading-text)]/50">
            {{ story.content.pages.length }} pages
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="min-h-[80vh] relative">
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
      bedtime
    />
  </div>
</template>
