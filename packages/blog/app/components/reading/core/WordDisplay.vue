<script setup lang="ts">
import type { Word } from '~/data/reading/words'
import { getPhonemeById } from '~/data/reading/phonemes'

interface Props {
  word: Word
  currentPhonemeIndex?: number
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  currentPhonemeIndex: -1,
  size: 'lg'
})

// Get phoneme details for each segment
const phonemeSegments = computed(() => {
  return props.word.phonemes.map((wp, index) => {
    const phoneme = getPhonemeById(wp.phonemeId)
    return {
      letters: wp.letters,
      category: phoneme?.category ?? 'slow',
      highlighted: index === props.currentPhonemeIndex
    }
  })
})

// Check if word is completed (all phonemes have been highlighted)
const isCompleted = computed(() => {
  return props.currentPhonemeIndex >= props.word.phonemes.length
})
</script>

<template>
  <div class="word-display" :class="{ completed: isCompleted }">
    <div class="word-container">
      <ReadingCorePhonemeSegment
        v-for="(segment, index) in phonemeSegments"
        :key="index"
        :letters="segment.letters"
        :category="segment.category"
        :highlighted="segment.highlighted"
        :size="size"
      />
    </div>

    <!-- Success indicator when word is completed -->
    <div v-if="isCompleted" class="completion-badge">
      <div class="completion-icon">
        ✨
      </div>
      <div class="completion-text">
        Great job!
      </div>
    </div>
  </div>
</template>

<style scoped>
.word-display {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    min-height: 200px;
    justify-content: center;
}

.word-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}

.word-display.completed {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    animation: celebrate 0.6s ease-out;
}

@keyframes celebrate {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

/* Completion badge */
.completion-badge {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    animation: slideUp 0.4s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.completion-icon {
    font-size: 3rem;
    animation: spin 0.6s ease-out;
}

@keyframes spin {
    from {
        transform: rotate(0deg) scale(0);
    }
    to {
        transform: rotate(360deg) scale(1);
    }
}

.completion-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #059669;
}

/* Tablet optimization */
@media (min-width: 768px) and (max-width: 1024px) {
    .word-display {
        padding: 1.5rem;
        min-height: 180px;
    }

    .completion-icon {
        font-size: 2.5rem;
    }

    .completion-text {
        font-size: 1.25rem;
    }
}

/* Mobile */
@media (max-width: 767px) {
    .word-display {
        padding: 1rem;
        min-height: 150px;
    }

    .word-container {
        gap: 0.25rem;
    }

    .completion-icon {
        font-size: 2rem;
    }

    .completion-text {
        font-size: 1.125rem;
    }
}
</style>
