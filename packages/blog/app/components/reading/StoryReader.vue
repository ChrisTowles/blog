<script setup lang="ts">
import type { StoryContent, StoryWord } from '~~/shared/reading-types';

const props = defineProps<{
  title: string;
  content: StoryContent;
  illustrationUrls?: string[];
}>();

const {
  speak,
  speakWord,
  stop,
  pause,
  resume,
  isSpeaking,
  isPaused,
  currentWordIndex,
  rate,
  setRate,
} = useTTS();

const currentPage = ref(0);
const totalPages = computed(() => props.content.pages.length);
const currentWords = computed(() => props.content.pages[currentPage.value]?.words ?? []);
const currentIllustration = computed(() => {
  if (!props.illustrationUrls?.length) return null;
  // index 0 = cover (page 0), index 1+ = per-page
  return props.illustrationUrls[currentPage.value] ?? null;
});

function playCurrentPage() {
  const text = currentWords.value.map((w) => w.text).join(' ');
  speak(text);
}

function handleWordClick(word: StoryWord) {
  speakWord(word.text);
}

function nextPage() {
  stop();
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
}

function prevPage() {
  stop();
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

onUnmounted(() => {
  stop();
});
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="text-center py-4">
      <h1 class="text-3xl font-bold">{{ title }}</h1>
      <p class="text-sm text-gray-500">Page {{ currentPage + 1 }} of {{ totalPages }}</p>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center px-8 gap-4">
      <img
        v-if="currentIllustration"
        :src="currentIllustration"
        :alt="`Illustration for page ${currentPage + 1}`"
        class="max-h-48 md:max-h-64 rounded-xl object-contain"
      />
      <ReadingWordHighlighter
        :words="currentWords"
        :current-word-index="currentWordIndex"
        @word-click="handleWordClick"
      />
    </div>

    <div class="flex items-center justify-center gap-4 py-6">
      <UButton
        icon="i-heroicons-backward"
        variant="ghost"
        :disabled="currentPage === 0"
        @click="prevPage"
      />

      <UButton v-if="!isSpeaking" icon="i-heroicons-play" size="xl" @click="playCurrentPage" />
      <UButton v-else-if="isPaused" icon="i-heroicons-play" size="xl" @click="resume" />
      <UButton v-else icon="i-heroicons-pause" size="xl" @click="pause" />

      <UButton icon="i-heroicons-stop" variant="ghost" :disabled="!isSpeaking" @click="stop" />

      <UButton
        icon="i-heroicons-forward"
        variant="ghost"
        :disabled="currentPage >= totalPages - 1"
        @click="nextPage"
      />
    </div>

    <div class="flex items-center justify-center gap-2 pb-4">
      <span class="text-xs text-gray-500">Speed</span>
      <input
        type="range"
        min="0.5"
        max="1.2"
        step="0.1"
        :value="rate"
        class="w-32"
        @input="setRate(parseFloat(($event.target as HTMLInputElement).value))"
      />
      <span class="text-xs text-gray-500 w-8">{{ rate }}x</span>
    </div>
  </div>
</template>
