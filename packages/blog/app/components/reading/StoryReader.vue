<script setup lang="ts">
import type { StoryContent, StoryWord, ReadingMode, ReadingMiscue } from '~~/shared/reading-types';
import type { WordFeedback } from '~/composables/useSpeechRecognition';

const props = defineProps<{
  title: string;
  content: StoryContent;
  illustrationUrls?: string[];
  storyId?: number;
  childId?: number;
  bedtime?: boolean;
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

const {
  isActive: bedtimeActive,
  toggle: toggleBedtime,
  shouldSuggest: bedtimeShouldSuggest,
  activate: activateBedtime,
  dismissSuggestion: dismissBedtimeSuggestion,
} = useBedtimeMode();

// Auto-activate bedtime if prop is set
if (props.bedtime) {
  activateBedtime();
}

const currentPage = ref(0);
const totalPages = computed(() => props.content.pages.length);
const currentWords = computed(() => props.content.pages[currentPage.value]?.words ?? []);
const expectedWordTexts = computed(() => currentWords.value.map((w) => w.text));
const currentIllustration = computed(() => {
  if (!props.illustrationUrls?.length) return null;
  return props.illustrationUrls[currentPage.value] ?? null;
});

// Bedtime mode: auto-advance after TTS finishes with 5s pause
const bedtimeAutoAdvanceTimer = ref<ReturnType<typeof setTimeout> | null>(null);

watch(isSpeaking, (speaking) => {
  if (!speaking && bedtimeActive.value && mode.value === 'listen') {
    if (currentPage.value < totalPages.value - 1) {
      bedtimeAutoAdvanceTimer.value = setTimeout(() => {
        currentPage.value++;
        setTimeout(() => playCurrentPage(), 400);
      }, 5000);
    }
  }
});

function clearBedtimeTimer() {
  if (bedtimeAutoAdvanceTimer.value) {
    clearTimeout(bedtimeAutoAdvanceTimer.value);
    bedtimeAutoAdvanceTimer.value = null;
  }
}

watch(
  bedtimeActive,
  (active) => {
    setRate(active ? 0.6 : 0.8);
  },
  { immediate: true },
);

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

// Read Together mode: odd pages (0-indexed: 0,2,4) = parent, even pages (1,3,5) = child
const isParentTurn = computed(() => currentPage.value % 2 === 0);
const isChildTurn = computed(() => !isParentTurn.value);
const togetherActive = ref(false);
const togetherChildWordCount = ref(0);

// Watch for page completion in guided mode and read-together child turns
watch(pageComplete, async (complete) => {
  if (!complete) return;

  const isGuidedMode = mode.value === 'guided';
  const isTogetherChildTurn = mode.value === 'read-together' && isChildTurn.value;
  if (!isGuidedMode && !isTogetherChildTurn) return;

  // Collect miscues from this page
  for (const m of pageMiscues.value) {
    allMiscues.value.push({
      ...m,
      wordIndex: m.wordIndex + pagesCompleted.value,
      type: m.type,
    });
  }
  pagesCompleted.value += currentWords.value.length;
  if (isTogetherChildTurn) {
    togetherChildWordCount.value += currentWords.value.length;
  }

  stopListening();

  // Auto-advance or finish
  if (currentPage.value < totalPages.value - 1) {
    await nextTick();
    currentPage.value++;
    if (isGuidedMode) {
      setTimeout(() => startListening(), 500);
    }
    // In read-together, child turns auto-start recognition after page flip
    if (mode.value === 'read-together' && isChildTurn.value && togetherActive.value) {
      setTimeout(() => startListening(), 500);
    }
  } else {
    if (isGuidedMode) {
      finishGuidedSession();
    }
    if (mode.value === 'read-together') {
      finishTogetherSession();
    }
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
  saveSession(sessionData);
}

function finishTogetherSession() {
  togetherActive.value = false;
  const duration = Math.round((Date.now() - sessionStartTime.value) / 1000);

  // Parent session: listen mode, covers parent pages (even-indexed: 0,2,4...)
  const parentSession = {
    mode: 'listen' as ReadingMode,
    wcpm: 0,
    accuracy: 1,
    duration,
    miscues: [] as ReadingMiscue[],
  };
  emit('sessionComplete', parentSession);
  saveSession(parentSession);

  // Child session: guided mode, covers child pages (odd-indexed: 1,3,5...)
  const childWords = togetherChildWordCount.value;
  const childCorrect = childWords - allMiscues.value.length;
  const accuracy = childWords > 0 ? childCorrect / childWords : 0;
  const wcpm = duration > 0 ? Math.round((childWords / duration) * 60) : 0;
  const childSession = {
    mode: 'guided' as ReadingMode,
    wcpm,
    accuracy,
    duration,
    miscues: allMiscues.value,
  };
  emit('sessionComplete', childSession);
  saveSession(childSession);
}

function saveSession(sessionData: {
  mode: ReadingMode;
  wcpm: number;
  accuracy: number;
  duration: number;
  miscues: ReadingMiscue[];
}) {
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

const modeOptions = ['listen', 'guided', 'independent', 'read-together'] as const;

function modeLabel(m: ReadingMode): string {
  if (m === 'listen') return 'Listen';
  if (m === 'guided') return 'Read Aloud';
  if (m === 'independent') return 'Read Alone';
  return 'Read Together';
}

function setMode(newMode: ReadingMode) {
  stopTTS();
  stopListening();
  clearBedtimeTimer();
  mode.value = newMode;
  allMiscues.value = [];
  pagesCompleted.value = 0;
  sessionStartTime.value = 0;
  togetherActive.value = false;
  togetherChildWordCount.value = 0;
}

function playCurrentPage() {
  clearBedtimeTimer();
  const text = currentWords.value.map((w) => w.text).join(' ');
  speak(text);
}

function startGuidedReading() {
  sessionStartTime.value = Date.now();
  allMiscues.value = [];
  pagesCompleted.value = 0;
  startListening();
}

function startTogetherReading() {
  sessionStartTime.value = Date.now();
  allMiscues.value = [];
  pagesCompleted.value = 0;
  togetherChildWordCount.value = 0;
  togetherActive.value = true;
  currentPage.value = 0;
  // First page is parent's turn — no speech recognition needed
}

function togetherNextPage() {
  stopTTS();
  stopListening();
  if (currentPage.value >= totalPages.value - 1) {
    finishTogetherSession();
    return;
  }
  currentPage.value++;
  // If next page is child's turn, start speech recognition
  if (isChildTurn.value && togetherActive.value) {
    setTimeout(() => startListening(), 500);
  }
}

function togetherPrevPage() {
  stopTTS();
  stopListening();
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

function handleWordClick(word: StoryWord) {
  speakWord(word.text);
}

function nextPage() {
  stopTTS();
  clearBedtimeTimer();
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
  clearBedtimeTimer();
  if (mode.value === 'guided') stopListening();
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

onUnmounted(() => {
  stopTTS();
  stopListening();
  clearBedtimeTimer();
});
</script>

<template>
  <div class="flex flex-col h-full relative">
    <!-- Bedtime sky ambiance -->
    <ReadingBedtimeSky v-if="bedtimeActive" />

    <!-- Bedtime suggestion banner -->
    <div
      v-if="bedtimeShouldSuggest && !bedtimeActive"
      class="mx-4 mb-2 p-3 rounded-2xl bg-[#1a2540] border border-[#c9a84c]/30 text-center text-sm text-[#e8dcc8] flex items-center justify-center gap-3 relative z-10"
    >
      <span>It's getting late — switch to bedtime mode?</span>
      <UButton
        size="xs"
        class="!rounded-full !bg-[#c9a84c] !text-[#0f1729] !font-bold"
        @click="activateBedtime"
      >
        Enable
      </UButton>
      <UButton
        size="xs"
        variant="ghost"
        class="!text-[#e8dcc8]/60"
        @click="dismissBedtimeSuggestion"
      >
        Dismiss
      </UButton>
    </div>

    <div class="text-center py-4 relative z-10">
      <div class="flex items-center justify-center gap-3">
        <h1
          class="font-extrabold text-[var(--reading-text)]"
          :class="bedtimeActive ? 'text-4xl md:text-5xl bedtime-text-glow' : 'text-3xl md:text-4xl'"
          style="font-family: var(--reading-font-display)"
        >
          {{ title }}
        </h1>
        <button
          class="text-xl opacity-60 hover:opacity-100 transition-opacity"
          :title="bedtimeActive ? 'Exit bedtime mode' : 'Enter bedtime mode'"
          @click="toggleBedtime"
        >
          {{ bedtimeActive ? '☀️' : '🌙' }}
        </button>
      </div>
      <p class="text-sm text-[var(--reading-text)]/50 font-semibold">
        Page {{ currentPage + 1 }} of {{ totalPages }}
      </p>
    </div>

    <!-- Mode selector -->
    <div class="flex items-center justify-center gap-2 py-2 flex-wrap relative z-10">
      <UButton
        v-for="m in modeOptions"
        :key="m"
        size="sm"
        :variant="mode === m ? 'solid' : 'outline'"
        :class="
          mode === m
            ? '!bg-[var(--reading-primary)] !text-white'
            : '!text-[var(--reading-primary)] !border-[var(--reading-primary)]'
        "
        class="!rounded-full"
        @click="setMode(m)"
      >
        {{ modeLabel(m) }}
      </UButton>
    </div>

    <!-- Speech not supported warning -->
    <div
      v-if="(mode === 'guided' || mode === 'read-together') && !speechSupported"
      class="mx-8 p-3 rounded-2xl bg-[var(--reading-highlight)]/30 text-center text-sm text-[var(--reading-text)]"
    >
      Speech recognition is not available in this browser. Try Chrome or Edge.
    </div>

    <!-- Read Together turn indicator -->
    <div
      v-if="mode === 'read-together' && togetherActive"
      class="mx-8 p-3 rounded-2xl text-center text-sm font-bold"
      :class="
        isParentTurn
          ? 'bg-[var(--reading-primary)]/20 text-[var(--reading-primary)]'
          : 'bg-[var(--reading-accent)]/20 text-[var(--reading-accent)]'
      "
    >
      {{
        isParentTurn ? "Parent's Turn — Read this page aloud!" : "Child's Turn — Your turn to read!"
      }}
    </div>

    <!-- Bedtime auto-advance indicator -->
    <div
      v-if="
        bedtimeActive &&
        mode === 'listen' &&
        !isSpeaking &&
        bedtimeAutoAdvanceTimer &&
        currentPage < totalPages - 1
      "
      class="mx-8 p-2 rounded-2xl text-center text-xs text-[var(--reading-text)]/40 font-semibold relative z-10"
    >
      Next page in a moment...
    </div>

    <div class="flex-1 flex flex-col items-center justify-center px-8 gap-4 relative z-10">
      <Transition name="reading-page" mode="out-in">
        <div
          :key="currentPage"
          class="flex flex-col items-center gap-4"
          :class="bedtimeActive ? 'bedtime-text-glow' : ''"
        >
          <img
            v-if="currentIllustration"
            :src="currentIllustration"
            :alt="`Illustration for page ${currentPage + 1}`"
            class="max-h-48 md:max-h-64 rounded-3xl object-contain shadow-md"
            :class="bedtimeActive ? 'brightness-75' : ''"
          />
          <ReadingWordHighlighter
            :words="currentWords"
            :current-word-index="
              mode === 'guided' || (mode === 'read-together' && isChildTurn)
                ? currentExpectedIndex
                : currentWordIndex
            "
            :word-feedbacks="
              mode === 'guided' || (mode === 'read-together' && isChildTurn)
                ? [...wordFeedbacks]
                : undefined
            "
            :class="[
              mode === 'read-together' && isParentTurn && togetherActive
                ? 'text-[var(--reading-primary)]'
                : '',
              bedtimeActive ? 'text-2xl md:text-3xl' : '',
            ]"
            @word-click="handleWordClick"
          />
        </div>
      </Transition>
    </div>

    <!-- Listen mode controls -->
    <div v-if="mode === 'listen'" class="flex items-center justify-center gap-4 py-6 relative z-10">
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
    <div v-else-if="mode === 'guided'" class="flex flex-col items-center gap-3 py-6 relative z-10">
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

    <!-- Read Together mode controls -->
    <div
      v-else-if="mode === 'read-together'"
      class="flex flex-col items-center gap-3 py-6 relative z-10"
    >
      <div v-if="!togetherActive" class="flex items-center gap-4">
        <UButton
          size="xl"
          class="!rounded-full !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
          @click="startTogetherReading"
        >
          Start Reading Together
        </UButton>
      </div>
      <div v-else class="flex items-center gap-4">
        <UButton
          icon="i-heroicons-backward"
          variant="ghost"
          class="!rounded-full !text-[var(--reading-primary)]"
          :disabled="currentPage === 0"
          @click="togetherPrevPage"
        />

        <UButton
          v-if="isParentTurn"
          icon="i-heroicons-forward"
          size="xl"
          class="!rounded-full !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white"
          @click="togetherNextPage"
        >
          Done — Child's Turn
        </UButton>
        <template v-else>
          <UButton
            v-if="!isListening"
            icon="i-heroicons-microphone"
            size="xl"
            class="!rounded-full !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
            @click="startListening"
          />
          <UButton
            v-else
            icon="i-heroicons-stop"
            size="xl"
            class="!rounded-full !bg-red-500 hover:!bg-red-600 !text-white reading-pulse"
            @click="stopListening"
          />
        </template>

        <UButton
          icon="i-heroicons-forward"
          variant="ghost"
          class="!rounded-full !text-[var(--reading-primary)]"
          :disabled="currentPage >= totalPages - 1"
          @click="togetherNextPage"
        />
      </div>
      <p
        v-if="togetherActive && isChildTurn && isListening"
        class="text-sm text-[var(--reading-text)]/60 font-semibold"
      >
        Read the words aloud!
      </p>
    </div>

    <!-- Independent mode controls -->
    <div v-else class="flex items-center justify-center gap-4 py-6 relative z-10">
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
