<script setup lang="ts">
import type { StoryContent } from '~~/shared/reading-types';

definePageMeta({ layout: false });

const route = useRoute();
const { data: story } = await useFetch<{
  id: number;
  title: string;
  content: StoryContent;
  illustrationUrls: string[];
}>(`/api/reading/stories/${route.params.id}`);
</script>

<template>
  <div class="h-screen bg-white dark:bg-gray-950">
    <div class="absolute top-4 left-4 z-10">
      <UButton to="/reading/dashboard" icon="i-heroicons-arrow-left" variant="ghost" />
    </div>
    <ReadingStoryReader
      v-if="story"
      :title="story.title"
      :content="story.content"
      :illustration-urls="story.illustrationUrls"
    />
    <div v-else class="flex items-center justify-center h-full">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl" />
    </div>
  </div>
</template>
