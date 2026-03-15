<script setup lang="ts">
import type { StoryWord } from '~~/shared/reading-types';

const props = defineProps<{
  words: StoryWord[];
  currentWordIndex: number;
}>();

const emit = defineEmits<{
  wordClick: [word: StoryWord, index: number];
}>();
</script>

<template>
  <p class="leading-relaxed text-2xl md:text-3xl">
    <span
      v-for="(word, i) in words"
      :key="i"
      class="cursor-pointer rounded-md px-1 py-0.5 transition-all duration-150 inline-block"
      :class="{
        'bg-yellow-300 dark:bg-yellow-500/40 scale-110': i === currentWordIndex,
        'text-purple-600 dark:text-purple-400 font-bold': word.sightWord,
      }"
      @click="emit('wordClick', word, i)"
    >
      {{ word.text }}
    </span>
  </p>
</template>
