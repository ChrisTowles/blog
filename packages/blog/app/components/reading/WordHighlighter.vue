<script setup lang="ts">
import type { StoryWord } from '~~/shared/reading-types';
import type { WordFeedback } from '~/composables/useSpeechRecognition';

const props = defineProps<{
  words: StoryWord[];
  currentWordIndex: number;
  wordFeedbacks?: readonly WordFeedback[];
}>();

const emit = defineEmits<{
  wordClick: [word: StoryWord, index: number];
}>();

function feedbackClass(index: number): string {
  if (!props.wordFeedbacks) return '';
  const fb = props.wordFeedbacks[index];
  if (fb === 'correct')
    return 'bg-[var(--reading-success)]/25 text-[var(--reading-success)] ring-2 ring-[var(--reading-success)]/30';
  if (fb === 'incorrect') return 'bg-red-100 text-red-500 ring-2 ring-red-300/50';
  return '';
}
</script>

<template>
  <p
    class="leading-loose text-2xl md:text-3xl text-center"
    style="font-family: var(--reading-font-display); word-spacing: 0.15em"
  >
    <span
      v-for="(word, i) in words"
      :key="i"
      class="cursor-pointer rounded-xl px-2 py-1 transition-all duration-200 inline-block reading-wobble-hover"
      :class="[
        feedbackClass(i),
        {
          'bg-[var(--reading-highlight)] scale-115 reading-bounce shadow-md shadow-[var(--reading-highlight)]/30':
            i === currentWordIndex && !wordFeedbacks,
          'text-[var(--reading-accent)] font-extrabold': word.sightWord && !wordFeedbacks?.[i],
          'ring-2 ring-[var(--reading-accent)] scale-110 bg-[var(--reading-accent)]/10':
            wordFeedbacks && wordFeedbacks[i] === 'pending' && i === currentWordIndex,
        },
      ]"
      @click="emit('wordClick', word, i)"
    >
      {{ word.text }}
    </span>
  </p>
</template>
