<script setup lang="ts">
import type { StoryContent, StoryWord, ReadingMode, ReadingMiscue } from '~~/shared/reading-types';
import type { WordFeedback } from '~/composables/useSpeechRecognition';

const props = defineProps<{
  title: string;
  content: StoryContent;
  illustrationUrls?: string[];
  storyId?: number;
  childId?: number;
}>();

const emit = defineEmits<{
  sessionComplete: [
    data: {
      mode: ReadingMode;
      wcpm: number;
      accuracy: number;
      duration: number;
      miscues: ReadingMiscue[];
    },
  ];
}>();

const mode = ref<ReadingMode>('listen');

const {
  speak,
  speakWord,
  stop: stopTTS,
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
const expectedWordTexts = computed(() => currentWords.value.map((w) => w.text));
const currentIllustration = computed(() => {
  if (!props.illustrationUrls?.length) return null;
  return props.illustrationUrls[currentPage.value] ?? null;
});

// Guided mode speech recognition
const {
  isSupported: speechSupported,
  isListening,
  wordFeedbacks,
  currentExpectedIndex,
  miscues: pageMiscues,
  isComplete: pageComplete,
  start: startListening,
  stop: stopListening,
} = useSpeechRecognition({
  expectedWords: expectedWordTexts,
});

const sessionStartTime = ref(0);
const allMiscues = ref<ReadingMiscue[]>([]);
const pagesCompleted = ref(0);

// Watch for page completion in guided mode
watch(pageComplete, async (complete) => {
  if (!complete || mode.value !== 'guided') return;

  // Collect miscues from this page
  for (const m of pageMiscues.value) {
    allMiscues.value.push({
      ...m,
      wordIndex: m.wordIndex + pagesCompleted.value,
      type: m.type,
    });
  }
  pagesCompleted.value += currentWords.value.length;

  stopListening();

  // Auto-advance or finish
  if (currentPage.value < totalPages.value - 1) {
    await nextTick();
    currentPage.value++;
    // Small delay before starting recognition on next page
    setTimeout(() => startListening(), 500);
  } else {
    finishGuidedSession();
  }
});

function finishGuidedSession() {
  const duration = Math.round((Date.now() - sessionStartTime.value) / 1000);
  const totalWords = props.content.pages.reduce((sum, p) => sum + p.words.length, 0);
  const totalCorrect = totalWords - allMiscues.value.length;
  const accuracy = totalWords > 0 ? totalCorrect / totalWords : 0;
  const wcpm = duration > 0 ? Math.round((totalWords / duration) * 60) : 0;

  const sessionData = {
    mode: 'guided' as ReadingMode,
    wcpm,
    accuracy,
    duration,
    miscues: allMiscues.value,
  };

  emit('sessionComplete', sessionData);

  // POST to API if we have IDs
  if (props.storyId && props.childId) {
    $fetch('/api/reading/sessions', {
      method: 'POST',
      body: {
        childId: props.childId,
        storyId: props.storyId,
        ...sessionData,
      },
    }).catch((err) => console.error('Failed to save reading session:', err));
  }
}

function setMode(newMode: ReadingMode) {
  stopTTS();
  stopListening();
  mode.value = newMode;
  allMiscues.value = [];
  pagesCompleted.value = 0;
  sessionStartTime.value = 0;
}

function playCurrentPage() {
  const text = currentWords.value.map((w) => w.text).join(' ');
  speak(text);
}

function startGuidedReading() {
  sessionStartTime.value = Date.now();
  allMiscues.value = [];
  pagesCompleted.value = 0;
  startListening();
}

function handleWordClick(word: StoryWord) {
  speakWord(word.text);
}

function nextPage() {
  stopTTS();
  if (mode.value === 'guided') stopListening();
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    if (mode.value === 'guided' && isListening.value) {
      setTimeout(() => startListening(), 300);
    }
  }
}

function prevPage() {
  stopTTS();
  if (mode.value === 'guided') stopListening();
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

onUnmounted(() => {
  stopTTS();
  stopListening();
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

    <!-- Mode selector -->
    <div class="flex items-center justify-center gap-2 py-2">
      <UButton
        v-for="m in ['listen', 'guided', 'independent'] as const"
        :key="m"
        size="sm"
        :variant="mode === m ? 'solid' : 'outline'"
        :class="
          mode === m
            ? '!bg-[var(--reading-primary)] !text-white'
            : '!text-[var(--reading-primary)] !border-[var(--reading-primary)]'
        "
        class="!rounded-full capitalize"
        @click="setMode(m)"
      >
        {{ m === 'listen' ? 'Listen' : m === 'guided' ? 'Read Aloud' : 'Read Alone' }}
      </UButton>
    </div>

    <!-- Speech not supported warning -->
    <div
      v-if="mode === 'guided' && !speechSupported"
      class="mx-8 p-3 rounded-2xl bg-[var(--reading-highlight)]/30 text-center text-sm text-[var(--reading-text)]"
    >
      Speech recognition is not available in this browser. Try Chrome or Edge.
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
            :current-word-index="mode === 'guided' ? currentExpectedIndex : currentWordIndex"
            :word-feedbacks="mode === 'guided' ? [...wordFeedbacks] : undefined"
            @word-click="handleWordClick"
          />
        </div>
      </Transition>
    </div>

    <!-- Listen mode controls -->
    <div v-if="mode === 'listen'" class="flex items-center justify-center gap-4 py-6">
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
        @click="stopTTS"
      />

      <UButton
        icon="i-heroicons-forward"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)]"
        :disabled="currentPage >= totalPages - 1"
        @click="nextPage"
      />
    </div>

    <!-- Guided mode controls -->
    <div v-else-if="mode === 'guided'" class="flex flex-col items-center gap-3 py-6">
      <div v-if="speechSupported" class="flex items-center gap-4">
        <UButton
          icon="i-heroicons-backward"
          variant="ghost"
          class="!rounded-full !text-[var(--reading-primary)]"
          :disabled="currentPage === 0"
          @click="prevPage"
        />

        <UButton
          v-if="!isListening"
          icon="i-heroicons-microphone"
          size="xl"
          class="!rounded-full !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
          @click="startGuidedReading"
        />
        <UButton
          v-else
          icon="i-heroicons-stop"
          size="xl"
          class="!rounded-full !bg-red-500 hover:!bg-red-600 !text-white reading-pulse"
          @click="stopListening"
        />

        <UButton
          icon="i-heroicons-forward"
          variant="ghost"
          class="!rounded-full !text-[var(--reading-primary)]"
          :disabled="currentPage >= totalPages - 1"
          @click="nextPage"
        />
      </div>

      <p v-if="isListening" class="text-sm text-[var(--reading-text)]/60 font-semibold">
        Read the words aloud!
      </p>
    </div>

    <!-- Independent mode controls -->
    <div v-else class="flex items-center justify-center gap-4 py-6">
      <UButton
        icon="i-heroicons-backward"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)]"
        :disabled="currentPage === 0"
        @click="prevPage"
      />
      <UButton
        icon="i-heroicons-forward"
        size="xl"
        class="!rounded-full !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
        :disabled="currentPage >= totalPages - 1"
        @click="nextPage"
      />
    </div>

    <!-- Speed control (listen mode only) -->
    <div v-if="mode === 'listen'" class="flex items-center justify-center gap-2 pb-4">
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
