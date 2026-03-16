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
  <div v-if="!isReading" class="space-y-10 relative pb-8">
    <ReadingBedtimeSky />

    <!-- Header -->
    <div class="text-center space-y-4 relative z-10 pt-8">
      <div
        class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#c9a84c]/15 mb-2"
      >
        <span class="text-5xl">&#x1F319;</span>
      </div>
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[#e8dcc8] bedtime-text-glow"
        style="font-family: var(--reading-font-display)"
      >
        Bedtime Stories
      </h1>
      <p
        class="text-xl text-[#e8dcc8]/50 font-semibold max-w-md mx-auto"
        style="font-family: var(--reading-font-display)"
      >
        Slow, soothing stories with warm colors and gentle narration to help you drift off to sleep.
      </p>
    </div>

    <!-- Story cards -->
    <div class="max-w-3xl mx-auto relative z-10 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 reading-stagger">
        <button
          v-for="story in DEMO_STORIES"
          :key="story.id"
          class="text-left bedtime-cozy-card reading-wobble-hover rounded-3xl p-6 transition-all cursor-pointer group"
          @click="selectStory(story.id)"
        >
          <!-- Story icon -->
          <div
            class="w-14 h-14 rounded-2xl bg-[#c9a84c]/15 flex items-center justify-center mb-4 group-hover:bg-[#c9a84c]/25 transition-colors"
          >
            <span class="text-3xl">&#x1F4D6;</span>
          </div>

          <h3
            class="text-xl font-extrabold text-[#e8dcc8] mb-2 group-hover:text-[#ffeeb5] transition-colors"
            style="font-family: var(--reading-font-display)"
          >
            {{ story.title }}
          </h3>
          <p
            class="text-base text-[#e8dcc8]/40 mb-4 font-semibold"
            style="font-family: var(--reading-font-display)"
          >
            {{ story.theme }}
          </p>

          <!-- Footer -->
          <div class="flex items-center justify-between">
            <span class="text-sm text-[#c9a84c]/60 font-bold">
              {{ story.content.pages.length }} pages
            </span>
            <span
              class="text-sm font-bold text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Read &#x2192;
            </span>
          </div>
        </button>
      </div>
    </div>

    <!-- Cozy footer message -->
    <div class="text-center relative z-10 pt-4">
      <p class="text-sm text-[#e8dcc8]/25 font-semibold">
        &#x2728; Stories read slower with warm, gentle tones &#x2728;
      </p>
    </div>
  </div>

  <!-- Reading view -->
  <div v-else class="reading-immersive relative">
    <div class="fixed top-4 left-4 z-30">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="!rounded-full !text-[#c9a84c] !font-bold !bg-[#1a2540]/80 !backdrop-blur-sm !shadow-md !px-5 !py-2.5 hover:!bg-[#1a2540] !text-base !border !border-[#c9a84c]/20"
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
