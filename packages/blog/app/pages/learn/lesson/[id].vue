<script setup lang="ts">
import { parseWord, LESSONS } from '~/composables/useLearnProgress'

definePageMeta({
  layout: 'learn'
})

const route = useRoute()
const lessonId = computed(() => Number(route.params.id) || 1)

const currentLesson = computed(() => LESSONS[lessonId.value] ?? LESSONS[1]!)
const words = computed(() => currentLesson.value!.words.map(parseWord))

// Current word index
const currentWordIndex = ref(0)
const currentWord = computed(() => words.value[currentWordIndex.value]!)
const sliderRef = ref<{ reset: () => void } | null>(null)

// Handle word completion
function handleWordComplete() {
  if (currentWordIndex.value < words.value.length - 1) {
    // Move to next word after short delay
    setTimeout(() => {
      currentWordIndex.value++
      sliderRef.value?.reset()
    }, 500)
  }
}

// Navigation
function goToNextWord() {
  if (currentWordIndex.value < words.value.length - 1) {
    currentWordIndex.value++
    sliderRef.value?.reset()
  }
}

function goToPrevWord() {
  if (currentWordIndex.value > 0) {
    currentWordIndex.value--
    sliderRef.value?.reset()
  }
}

function closeLesson() {
  navigateTo('/learn')
}
</script>

<template>
  <div class="relative w-full max-w-4xl mx-auto px-4 py-8">
    <!-- Close button -->
    <button
      class="absolute top-4 left-4 text-[#1a1a2e] hover:opacity-70 transition-opacity"
      aria-label="Close lesson"
      @click="closeLesson"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>

    <!-- Tips button -->
    <button
      class="absolute top-4 right-4 px-4 py-2 bg-white/50 rounded-full text-[#1a1a2e] text-sm font-medium hover:bg-white/70 transition-colors"
    >
      tips
    </button>

    <!-- Instruction -->
    <div class="text-center mb-12">
      <div class="inline-block bg-white/90 px-6 py-3 rounded-full text-[#1a1a2e] font-medium">
        Sound out this word.
      </div>
    </div>

    <!-- Progress dots (left side) -->
    <div class="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      <div
        v-for="(_, index) in words"
        :key="index"
        class="w-3 h-3 rounded-full transition-colors"
        :class="index <= currentWordIndex ? 'bg-white' : 'bg-white/30'"
      />
    </div>

    <!-- Navigation arrows (right side) -->
    <div class="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      <button
        class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors disabled:opacity-30"
        :disabled="currentWordIndex === 0"
        aria-label="Previous word"
        @click="goToPrevWord"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-[#1a1a2e]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <button
        class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors disabled:opacity-30"
        :disabled="currentWordIndex === words.length - 1"
        aria-label="Next word"
        @click="goToNextWord"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-[#1a1a2e]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>

    <!-- Main slider -->
    <div class="flex items-center justify-center min-h-[300px]">
      <LearnWordSlider
        ref="sliderRef"
        :word="currentWord"
        @complete="handleWordComplete"
      />
    </div>

    <!-- Hint text -->
    <div class="text-center mt-8 text-[#1a1a2e]/70 text-sm">
      Hint: Help your child recall and blend each sound if needed
    </div>

    <!-- Progress indicator -->
    <div class="text-center mt-4 text-[#1a1a2e]/50 text-sm">
      {{ currentWordIndex + 1 }} / {{ words.length }}
    </div>
  </div>
</template>
