<script setup lang="ts">
import type { StoryContent } from '~~/shared/reading-types';

definePageMeta({ layout: 'reading' });

const route = useRoute();
const { data: story } = await useFetch<{
  id: number;
  title: string;
  content: StoryContent;
  illustrationUrls: string[];
}>(`/api/reading/stories/${route.params.id}`);
</script>

<template>
  <div class="min-h-[70vh] relative">
    <div class="mb-4">
      <UButton
        to="/reading/dashboard"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)] !font-bold"
      >
        Back to Dashboard
      </UButton>
    </div>
    <ReadingStoryReader
      v-if="story"
      :title="story.title"
      :content="story.content"
      :illustration-urls="story.illustrationUrls"
    />
    <div v-else class="flex flex-col items-center justify-center h-[60vh] reading-float-in">
      <UIcon
        name="i-heroicons-arrow-path"
        class="animate-spin text-5xl text-[var(--reading-primary)]"
      />
      <p
        class="mt-4 text-xl text-[var(--reading-text)]/60"
        style="font-family: var(--reading-font-display)"
      >
        Loading story...
      </p>
    </div>
  </div>
</template>
