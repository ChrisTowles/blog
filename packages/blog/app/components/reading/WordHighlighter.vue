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
  if (fb === 'correct') return 'bg-[var(--reading-success)]/30 text-[var(--reading-success)]';
  if (fb === 'incorrect') return 'bg-red-200 text-red-600';
  return '';
}
</script>

<template>
  <p class="leading-relaxed text-2xl md:text-3xl">
    <span
      v-for="(word, i) in words"
      :key="i"
      class="cursor-pointer rounded-md px-1 py-0.5 transition-all duration-150 inline-block reading-wobble-hover"
      :class="[
        feedbackClass(i),
        {
          'bg-[var(--reading-highlight)] scale-110 reading-bounce':
            i === currentWordIndex && !wordFeedbacks,
          'text-[var(--reading-primary)] font-bold': word.sightWord && !wordFeedbacks?.[i],
          'ring-2 ring-[var(--reading-accent)] scale-105':
            wordFeedbacks && wordFeedbacks[i] === 'pending' && i === currentWordIndex,
        },
      ]"
      @click="emit('wordClick', word, i)"
    >
      {{ word.text }}
    </span>
  </p>
</template>
