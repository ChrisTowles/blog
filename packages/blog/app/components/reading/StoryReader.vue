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
      <h1
        class="text-3xl md:text-4xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        {{ title }}
      </h1>
      <p class="text-sm text-[var(--reading-text)]/50 font-semibold">
        Page {{ currentPage + 1 }} of {{ totalPages }}
      </p>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center px-8 gap-4">
      <Transition name="reading-page" mode="out-in">
        <div :key="currentPage" class="flex flex-col items-center gap-4">
          <img
            v-if="currentIllustration"
            :src="currentIllustration"
            :alt="`Illustration for page ${currentPage + 1}`"
            class="max-h-48 md:max-h-64 rounded-3xl object-contain shadow-md"
          />
          <ReadingWordHighlighter
            :words="currentWords"
            :current-word-index="currentWordIndex"
            @word-click="handleWordClick"
          />
        </div>
      </Transition>
    </div>

    <div class="flex items-center justify-center gap-4 py-6">
      <UButton
        icon="i-heroicons-backward"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)]"
        :disabled="currentPage === 0"
        @click="prevPage"
      />

      <UButton
        v-if="!isSpeaking"
        icon="i-heroicons-play"
        size="xl"
        class="!rounded-full !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
        @click="playCurrentPage"
      />
      <UButton
        v-else-if="isPaused"
        icon="i-heroicons-play"
        size="xl"
        class="!rounded-full !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
        @click="resume"
      />
      <UButton
        v-else
        icon="i-heroicons-pause"
        size="xl"
        class="!rounded-full !bg-[var(--reading-highlight)] !text-[var(--reading-text)]"
        @click="pause"
      />

      <UButton
        icon="i-heroicons-stop"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)]"
        :disabled="!isSpeaking"
        @click="stop"
      />

      <UButton
        icon="i-heroicons-forward"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)]"
        :disabled="currentPage >= totalPages - 1"
        @click="nextPage"
      />
    </div>

    <div class="flex items-center justify-center gap-2 pb-4">
      <span class="text-xs text-[var(--reading-text)]/50 font-semibold">Speed</span>
      <input
        type="range"
        min="0.5"
        max="1.2"
        step="0.1"
        :value="rate"
        class="w-32 accent-[var(--reading-accent)]"
        @input="setRate(parseFloat(($event.target as HTMLInputElement).value))"
      />
      <span class="text-xs text-[var(--reading-text)]/50 font-semibold w-8">{{ rate }}x</span>
    </div>
  </div>
</template>
