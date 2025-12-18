<script setup lang="ts">
import type { Word } from '~/data/reading/words'
import { getPhonemeById } from '~/data/reading/phonemes'

interface Props {
  word: Word
}

const props = defineProps<Props>()

const emit = defineEmits<{
  phonemeSelected: [index: number]
  sequenceComplete: []
  reset: []
}>()

const sliderRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const currentPhonemeIndex = ref(-1)
const completedPhonemes = ref<Set<number>>(new Set())

// Get phoneme details for each segment
const phonemeButtons = computed(() => {
  return props.word.phonemes.map((wp, index) => {
    const phoneme = getPhonemeById(wp.phonemeId)
    return {
      index,
      letters: wp.letters,
      category: phoneme?.category ?? 'slow',
      color: phoneme?.color ?? 'blue'
    }
  })
})

// Calculate if all phonemes have been selected in sequence
const isSequenceComplete = computed(() => {
  return currentPhonemeIndex.value >= phonemeButtons.value.length
})

// Get the phoneme at a given position
function getPhonemeAtPosition(x: number, y: number): number {
  if (!sliderRef.value) return -1

  const buttons = sliderRef.value.querySelectorAll('.phoneme-button')
  for (let i = 0; i < buttons.length; i++) {
    const element = buttons[i] as HTMLElement
    const rect = element.getBoundingClientRect()
    if (
      x >= rect.left
      && x <= rect.right
      && y >= rect.top
      && y <= rect.bottom
    ) {
      return i
    }
  }
  return -1
}

// Handle drag start
function onDragStart(event: MouseEvent | TouchEvent) {
  isDragging.value = true
  currentPhonemeIndex.value = 0
  completedPhonemes.value.clear()

  // Get position
  const clientX = 'touches' in event ? event.touches[0]?.clientX ?? 0 : event.clientX
  const clientY = 'touches' in event ? event.touches[0]?.clientY ?? 0 : event.clientY

  const index = getPhonemeAtPosition(clientX, clientY)
  if (index === 0) {
    selectPhoneme(0)
  }
}

// Handle drag move
function onDragMove(event: MouseEvent | TouchEvent) {
  if (!isDragging.value) return

  event.preventDefault()

  const clientX = 'touches' in event ? event.touches[0]?.clientX ?? 0 : event.clientX
  const clientY = 'touches' in event ? event.touches[0]?.clientY ?? 0 : event.clientY

  const index = getPhonemeAtPosition(clientX, clientY)

  // Only advance to next phoneme in sequence
  if (index !== -1 && index === currentPhonemeIndex.value) {
    selectPhoneme(index)
  }
}

// Handle drag end
function onDragEnd() {
  isDragging.value = false

  // Check if sequence was completed
  if (isSequenceComplete.value) {
    emit('sequenceComplete')
  }
}

// Select a phoneme
function selectPhoneme(index: number) {
  if (completedPhonemes.value.has(index)) return

  completedPhonemes.value.add(index)
  currentPhonemeIndex.value = index + 1
  emit('phonemeSelected', index)

  // Haptic feedback on supported devices
  if ('vibrate' in navigator) {
    navigator.vibrate(10)
  }
}

// Reset the slider
function reset() {
  currentPhonemeIndex.value = -1
  completedPhonemes.value.clear()
  emit('reset')
}

// Set up event listeners
onMounted(() => {
  if (!sliderRef.value) return

  // Mouse events
  sliderRef.value.addEventListener('mousedown', onDragStart as EventListener)
  document.addEventListener('mousemove', onDragMove as EventListener)
  document.addEventListener('mouseup', onDragEnd)

  // Touch events
  sliderRef.value.addEventListener('touchstart', onDragStart as EventListener, { passive: false })
  document.addEventListener('touchmove', onDragMove as EventListener, { passive: false })
  document.addEventListener('touchend', onDragEnd)
})

// Clean up event listeners
onUnmounted(() => {
  document.removeEventListener('mousemove', onDragMove as EventListener)
  document.removeEventListener('mouseup', onDragEnd)
  document.removeEventListener('touchmove', onDragMove as EventListener)
  document.removeEventListener('touchend', onDragEnd)
})

// Expose reset method
defineExpose({
  reset
})
</script>

<template>
  <div class="sound-slider">
    <div class="slider-instruction">
      {{ isDragging ? 'Keep going! 👉' : 'Drag across the sounds 👇' }}
    </div>

    <div
      ref="sliderRef"
      class="slider-track"
      :class="{ dragging: isDragging, complete: isSequenceComplete }"
    >
      <button
        v-for="button in phonemeButtons"
        :key="button.index"
        class="phoneme-button"
        :class="[
          `phoneme-${button.color}`,
          {
            active: button.index === currentPhonemeIndex - 1,
            completed: completedPhonemes.has(button.index)
          }
        ]"
        :data-index="button.index"
      >
        <span class="phoneme-letter">{{ button.letters }}</span>
      </button>
    </div>

    <div v-if="!isDragging && !isSequenceComplete" class="slider-hint">
      <div class="hint-arrow">
        👆
      </div>
      <div class="hint-text">
        Start here
      </div>
    </div>

    <button
      v-if="isSequenceComplete"
      class="reset-button"
      @click="reset"
    >
      Try again 🔄
    </button>
  </div>
</template>

<style scoped>
.sound-slider {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
    border-radius: 1.5rem;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
}

.slider-instruction {
    font-size: 1.5rem;
    font-weight: 700;
    color: #6b21a8;
    text-align: center;
}

.slider-track {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    min-height: 80px;
    align-items: center;
}

.slider-track.dragging {
    box-shadow: 0 0 0 4px #a78bfa;
}

.slider-track.complete {
    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
    animation: celebrate 0.6s ease-out;
}

/* Phoneme buttons */
.phoneme-button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    min-height: 60px;
    padding: 1rem;
    border-radius: 0.75rem;
    font-size: 2rem;
    font-weight: 800;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Color coding */
.phoneme-blue {
    background: #dbeafe;
    color: #1e40af;
}

.phoneme-red {
    background: #fee2e2;
    color: #991b1b;
}

.phoneme-orange {
    background: #ffedd5;
    color: #9a3412;
}

/* Active state (currently being hovered/dragged over) */
.phoneme-button.active {
    transform: scale(1.2);
    z-index: 10;
}

.phoneme-blue.active {
    background: #3b82f6;
    color: white;
    box-shadow: 0 0 20px #3b82f6;
}

.phoneme-red.active {
    background: #ef4444;
    color: white;
    box-shadow: 0 0 20px #ef4444;
}

.phoneme-orange.active {
    background: #f97316;
    color: white;
    box-shadow: 0 0 20px #f97316;
}

/* Completed state */
.phoneme-button.completed {
    opacity: 0.6;
}

.phoneme-letter {
    font-family: 'Segoe UI', 'Arial Rounded MT Bold', sans-serif;
}

/* Hint */
.slider-hint {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    animation: bounce 1s infinite;
}

.hint-arrow {
    font-size: 2rem;
}

.hint-text {
    font-size: 1.125rem;
    font-weight: 600;
    color: #64748b;
}

@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

/* Reset button */
.reset-button {
    all: unset;
    padding: 0.75rem 2rem;
    background: #8b5cf6;
    color: white;
    border-radius: 0.75rem;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

.reset-button:hover {
    background: #7c3aed;
    transform: translateY(-2px);
    box-shadow: 0 6px 8px -1px rgb(0 0 0 / 0.15);
}

.reset-button:active {
    transform: translateY(0);
}

/* Tablet optimization */
@media (min-width: 768px) and (max-width: 1024px) {
    .phoneme-button {
        min-width: 55px;
        min-height: 55px;
        font-size: 1.75rem;
    }

    .slider-instruction {
        font-size: 1.25rem;
    }
}

/* Mobile */
@media (max-width: 767px) {
    .sound-slider {
        padding: 1rem;
    }

    .slider-track {
        gap: 0.5rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .phoneme-button {
        min-width: 50px;
        min-height: 50px;
        font-size: 1.5rem;
        padding: 0.75rem;
    }

    .slider-instruction {
        font-size: 1.125rem;
    }

    .hint-arrow {
        font-size: 1.5rem;
    }
}
</style>
