<script setup lang="ts">
// WordSlider - core mechanic for phonics learning
// Child drags handle across slider, sounds activate sequentially

export interface Sound {
  letter: string
  type: 'continuous' | 'stop'
}

export interface Word {
  text: string
  sounds: Sound[]
}

interface Props {
  word: Word
}

const props = defineProps<Props>()

const emit = defineEmits<{
  complete: []
}>()

// Slider state
const sliderRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const sliderProgress = ref(0) // 0 to 100
const currentSoundIndex = ref(-1)

// Calculate which sound is active based on progress
const activeSoundIndex = computed(() => {
  if (sliderProgress.value === 0) return -1
  const soundCount = props.word.sounds.length
  const progressPerSound = 100 / soundCount
  return Math.min(
    Math.floor(sliderProgress.value / progressPerSound),
    soundCount - 1
  )
})

// Watch for sound changes
watch(activeSoundIndex, (newIndex) => {
  currentSoundIndex.value = newIndex
})

// Handle drag start
function handleDragStart(e: MouseEvent | TouchEvent) {
  isDragging.value = true
  updateProgress(e)
}

// Handle drag move
function handleDragMove(e: MouseEvent | TouchEvent) {
  if (!isDragging.value) return
  updateProgress(e)
}

// Handle drag end
function handleDragEnd() {
  if (!isDragging.value) return
  isDragging.value = false

  // If completed (progress > 95%), emit complete
  if (sliderProgress.value > 95) {
    sliderProgress.value = 100
    emit('complete')
  }
}

// Update progress based on position
function updateProgress(e: MouseEvent | TouchEvent) {
  if (!sliderRef.value) return

  const rect = sliderRef.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
  const x = clientX - rect.left
  const progress = Math.max(0, Math.min(100, (x / rect.width) * 100))
  sliderProgress.value = progress
}

// Reset slider
function reset() {
  sliderProgress.value = 0
  currentSoundIndex.value = -1
}

defineExpose({ reset })

// Add document-level listeners for drag
onMounted(() => {
  document.addEventListener('mousemove', handleDragMove)
  document.addEventListener('mouseup', handleDragEnd)
  document.addEventListener('touchmove', handleDragMove, { passive: true })
  document.addEventListener('touchend', handleDragEnd)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleDragMove)
  document.removeEventListener('mouseup', handleDragEnd)
  document.removeEventListener('touchmove', handleDragMove)
  document.removeEventListener('touchend', handleDragEnd)
})
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <!-- Word display -->
    <div class="text-6xl md:text-7xl font-bold text-[#1a1a2e] tracking-wider">
      <span
        v-for="(sound, index) in word.sounds"
        :key="index"
        :class="[
          index <= currentSoundIndex ? 'opacity-100' : 'opacity-60',
          'transition-opacity duration-150'
        ]"
      >{{ sound.letter }}</span>
    </div>

    <!-- Slider container -->
    <div class="relative w-80 md:w-96 mt-4">
      <!-- Sound indicators track -->
      <div
        ref="sliderRef"
        class="flex gap-2 h-6 rounded-full p-1 cursor-pointer"
        style="background-color: #e8e0f8;"
        @mousedown="handleDragStart"
        @touchstart.passive="handleDragStart"
      >
        <div
          v-for="(sound, index) in word.sounds"
          :key="index"
          class="flex-1 flex items-center justify-center"
        >
          <LearnSoundIndicator
            :type="sound.type"
            :active="index <= currentSoundIndex"
            :width="sound.type === 'continuous' ? 85 : 100"
          />
        </div>
      </div>

      <!-- Draggable handle -->
      <div
        class="absolute top-1/2 -translate-y-1/2 w-14 h-16 rounded-2xl shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform border-2 border-gray-200"
        style="background-color: white;"
        :class="isDragging ? 'scale-110' : ''"
        :style="{ left: `calc(${sliderProgress}% - 28px)`, backgroundColor: 'white' }"
        @mousedown="handleDragStart"
        @touchstart.passive="handleDragStart"
      >
        <!-- Handle lines -->
        <div class="flex flex-col gap-1.5">
          <div class="w-6 h-1 rounded" style="background-color: #b8a9e8;" />
          <div class="w-6 h-1 rounded" style="background-color: #b8a9e8;" />
          <div class="w-6 h-1 rounded" style="background-color: #b8a9e8;" />
        </div>
      </div>
    </div>
  </div>
</template>
