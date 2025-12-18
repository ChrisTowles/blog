<script setup lang="ts">
import { getRandomWords } from '~/data/reading/words'
import type { Word } from '~/data/reading/words'

definePageMeta({
  layout: 'reading'
})

// Practice session state
const wordList = ref<Word[]>([])
const currentWordIndex = ref(0)
const currentPhonemeIndex = ref(-1)
const sessionStats = ref({
  wordsCompleted: 0,
  totalWords: 0,
  startTime: Date.now()
})

// Slider reference
const sliderRef = ref<{ reset: () => void } | null>(null)

// Current word being practiced
const currentWord = computed(() => {
  return wordList.value[currentWordIndex.value]
})

// Progress percentage
const progress = computed(() => {
  if (sessionStats.value.totalWords === 0) return 0
  return Math.round((sessionStats.value.wordsCompleted / sessionStats.value.totalWords) * 100)
})

// Initialize practice session
function startSession(wordCount: number = 10, level: number = 1) {
  wordList.value = getRandomWords(wordCount, { level })
  currentWordIndex.value = 0
  currentPhonemeIndex.value = -1
  sessionStats.value = {
    wordsCompleted: 0,
    totalWords: wordList.value.length,
    startTime: Date.now()
  }
}

// Handle phoneme selection from slider
function onPhonemeSelected(index: number) {
  currentPhonemeIndex.value = index
}

// Handle sequence completion (all phonemes selected)
function onSequenceComplete() {
  // Mark word as completed
  sessionStats.value.wordsCompleted++

  // Show completion briefly before moving to next word
  setTimeout(() => {
    nextWord()
  }, 1500)
}

// Move to next word
function nextWord() {
  if (currentWordIndex.value < wordList.value.length - 1) {
    currentWordIndex.value++
    currentPhonemeIndex.value = -1

    // Reset slider
    if (sliderRef.value) {
      sliderRef.value.reset()
    }
  } else {
    // Session complete
    completeSession()
  }
}

// Skip current word
function skipWord() {
  nextWord()
}

// Reset current word
function resetWord() {
  currentPhonemeIndex.value = -1
  if (sliderRef.value) {
    sliderRef.value.reset()
  }
}

// Complete session
function completeSession() {
  // TODO: Save progress to database
  // For now, just navigate back to home
  navigateTo('/reading')
}

// Start session on mount
onMounted(() => {
  startSession()
})
</script>

<template>
  <div class="practice-page">
    <!-- Progress header -->
    <div class="practice-header">
      <div class="progress-bar-container">
        <div class="progress-bar-label">
          Progress: {{ sessionStats.wordsCompleted }} / {{ sessionStats.totalWords }}
        </div>
        <div class="progress-bar">
          <div
            class="progress-bar-fill"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>

      <button
        class="skip-button"
        @click="skipWord"
      >
        Skip ⏭️
      </button>
    </div>

    <!-- Word practice area -->
    <div v-if="currentWord" class="practice-area">
      <!-- Word display -->
      <ReadingCoreWordDisplay
        :word="currentWord"
        :current-phoneme-index="currentPhonemeIndex"
      />

      <!-- Sound slider -->
      <ReadingCoreSoundSlider
        ref="sliderRef"
        :word="currentWord"
        @phoneme-selected="onPhonemeSelected"
        @sequence-complete="onSequenceComplete"
      />

      <!-- Action buttons -->
      <div class="action-buttons">
        <button
          class="action-button action-button-secondary"
          @click="resetWord"
        >
          Reset 🔄
        </button>
      </div>
    </div>

    <!-- Session complete -->
    <div v-else class="session-complete">
      <div class="complete-icon">
        🎉
      </div>
      <h2 class="complete-title">
        Amazing work!
      </h2>
      <p class="complete-message">
        You completed {{ sessionStats.wordsCompleted }} words!
      </p>
      <button
        class="action-button action-button-primary"
        @click="startSession()"
      >
        Practice More 📚
      </button>
      <button
        class="action-button action-button-secondary"
        @click="navigateTo('/reading')"
      >
        Back Home 🏠
      </button>
    </div>
  </div>
</template>

<style scoped>
.practice-page {
    max-width: 900px;
    margin: 0 auto;
    padding: 1rem;
}

/* Header with progress */
.practice-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
}

.progress-bar-container {
    flex: 1;
}

.progress-bar-label {
    font-size: 1.125rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 0.5rem;
}

.progress-bar {
    height: 12px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
}

.progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%);
    transition: width 0.3s ease;
}

.skip-button {
    all: unset;
    padding: 0.75rem 1.5rem;
    background: #f1f5f9;
    color: #475569;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
}

.skip-button:hover {
    background: #e2e8f0;
    transform: translateY(-2px);
}

/* Practice area */
.practice-area {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

/* Action buttons */
.action-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
}

.action-button {
    all: unset;
    padding: 0.75rem 2rem;
    border-radius: 0.75rem;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    text-align: center;
}

.action-button-primary {
    background: #8b5cf6;
    color: white;
}

.action-button-primary:hover {
    background: #7c3aed;
    transform: translateY(-2px);
}

.action-button-secondary {
    background: #f1f5f9;
    color: #475569;
}

.action-button-secondary:hover {
    background: #e2e8f0;
    transform: translateY(-2px);
}

/* Session complete */
.session-complete {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 4rem 2rem;
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.complete-icon {
    font-size: 6rem;
    animation: celebrate 0.6s ease-out;
}

@keyframes celebrate {
    0% {
        transform: scale(0) rotate(0deg);
    }
    50% {
        transform: scale(1.2) rotate(180deg);
    }
    100% {
        transform: scale(1) rotate(360deg);
    }
}

.complete-title {
    all: unset;
    display: block;
    font-size: 3rem;
    font-weight: 800;
    color: #8b5cf6;
    text-align: center;
}

.complete-message {
    all: unset;
    display: block;
    font-size: 1.5rem;
    color: #64748b;
    text-align: center;
}

/* Tablet optimization */
@media (min-width: 768px) and (max-width: 1024px) {
    .complete-icon {
        font-size: 5rem;
    }

    .complete-title {
        font-size: 2.5rem;
    }

    .complete-message {
        font-size: 1.25rem;
    }
}

/* Mobile */
@media (max-width: 767px) {
    .practice-header {
        flex-direction: column;
    }

    .skip-button {
        width: 100%;
    }

    .action-buttons {
        flex-direction: column;
    }

    .action-button {
        width: 100%;
    }

    .complete-icon {
        font-size: 4rem;
    }

    .complete-title {
        font-size: 2rem;
    }

    .complete-message {
        font-size: 1.125rem;
    }

    .session-complete {
        padding: 2rem 1rem;
    }
}
</style>
