<script setup lang="ts">
import type { StoryContent } from '../../../../shared/reading-types';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const route = useRoute();
const { data: story } = await useFetch<{
  id: number;
  title: string;
  content: StoryContent;
  illustrationUrls: string[];
}>(`/api/reading/stories/${route.params.id}`);
</script>

<template>
  <div class="reading-immersive">
    <!-- Floating back button -->
    <div class="fixed top-4 left-4 z-30">
      <UButton
        to="/reading/dashboard"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)] !font-bold !bg-[var(--reading-card-bg)]/80 !backdrop-blur-sm !shadow-md !px-5 !py-2.5 hover:!bg-[var(--reading-card-bg)] !text-base"
      >
        Back
      </UButton>
    </div>

    <!-- Story content -->
    <ReadingStoryReader
      v-if="story"
      :title="story.title"
      :content="story.content"
      :illustration-urls="story.illustrationUrls"
    />

    <!-- Loading state -->
    <div v-else class="flex flex-col items-center justify-center flex-1 reading-float-in gap-6">
      <div class="relative">
        <div
          class="w-24 h-24 rounded-full bg-[var(--reading-primary)]/10 flex items-center justify-center"
        >
          <UIcon
            name="i-heroicons-arrow-path"
            class="animate-spin text-5xl text-[var(--reading-primary)]"
          />
        </div>
        <div
          class="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[var(--reading-highlight)] flex items-center justify-center text-lg shadow-md"
        >
          <span class="reading-bounce">&#x1F4D6;</span>
        </div>
      </div>
      <p
        class="text-2xl text-[var(--reading-text)]/60 font-bold"
        style="font-family: var(--reading-font-display)"
      >
        Getting your story ready...
      </p>
    </div>
  </div>
</template>
