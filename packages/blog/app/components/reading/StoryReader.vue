<script setup lang="ts">
import type { StoryContent, StoryWord, ReadingMode, ReadingMiscue } from '~~/shared/reading-types';

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

const route = useRoute();
const router = useRouter();

const initialMode = (['listen', 'guided', 'independent', 'read-together'] as const).includes(
  route.query.mode as ReadingMode,
)
  ? (route.query.mode as ReadingMode)
  : 'listen';
const mode = ref<ReadingMode>(initialMode);

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

const initialPage = route.query.page ? Math.max(0, Number(route.query.page) - 1) : 0;
const currentPage = ref(initialPage);
const totalPages = computed(() => props.content.pages.length);
const currentWords = computed(() => props.content.pages[currentPage.value]?.words ?? []);
const expectedWordTexts = computed(() => currentWords.value.map((w) => w.text));
const currentIllustration = computed(() => {
  if (!props.illustrationUrls?.length) return null;
  return props.illustrationUrls[currentPage.value] ?? null;
});

setRate(0.8);

// Sync page and mode to URL query params
watch(currentPage, (page) => {
  router.replace({ query: { ...route.query, page: page === 0 ? undefined : page + 1 } });
});

watch(mode, (m) => {
  router.replace({ query: { ...route.query, mode: m === 'listen' ? undefined : m } });
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

function modeIcon(m: ReadingMode): string {
  if (m === 'listen') return 'i-heroicons-speaker-wave';
  if (m === 'guided') return 'i-heroicons-microphone';
  if (m === 'independent') return 'i-heroicons-eye';
  return 'i-heroicons-user-group';
}

function setMode(newMode: ReadingMode) {
  stopTTS();
  stopListening();
  mode.value = newMode;
  allMiscues.value = [];
  pagesCompleted.value = 0;
  sessionStartTime.value = 0;
  togetherActive.value = false;
  togetherChildWordCount.value = 0;
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

// Phonics slider state
const sliderWord = ref<StoryWord | null>(null);
const sliderWordIndex = ref(-1);

function handleWordClick(word: StoryWord, index: number) {
  // Toggle slider: if tapping the same word, dismiss; otherwise show for new word
  if (sliderWord.value && sliderWordIndex.value === index) {
    sliderWord.value = null;
    sliderWordIndex.value = -1;
  } else if (word.pattern && !word.sightWord) {
    sliderWord.value = word;
    sliderWordIndex.value = index;
  } else {
    sliderWord.value = null;
    sliderWordIndex.value = -1;
    speakWord(word.text);
  }
}

function dismissSlider() {
  sliderWord.value = null;
  sliderWordIndex.value = -1;
}

function nextPage() {
  stopTTS();
  dismissSlider();
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
  dismissSlider();
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
  <div class="reading-immersive relative">
    <!-- Title bar -->
    <div class="text-center pt-6 pb-2 relative z-10">
      <h1
        class="font-extrabold text-[var(--reading-text)] text-3xl md:text-4xl"
        style="font-family: var(--reading-font-display)"
      >
        {{ title }}
      </h1>

      <!-- Page progress dots -->
      <div class="flex items-center justify-center gap-1.5 mt-3">
        <div
          v-for="p in totalPages"
          :key="p"
          class="rounded-full transition-all duration-300"
          :class="
            p - 1 === currentPage
              ? 'w-8 h-3 bg-[var(--reading-accent)]'
              : p - 1 < currentPage
                ? 'w-3 h-3 bg-[var(--reading-success)]'
                : 'w-3 h-3 bg-[var(--reading-primary)]/20'
          "
        />
      </div>
      <p class="text-xs text-[var(--reading-text)]/40 font-semibold mt-1">
        Page {{ currentPage + 1 }} of {{ totalPages }}
      </p>
    </div>

    <!-- Mode selector - pill style -->
    <div class="flex items-center justify-center py-3 relative z-10">
      <div class="inline-flex rounded-full p-1.5 gap-1 bg-[var(--reading-primary)]/10">
        <button
          v-for="m in modeOptions"
          :key="m"
          class="rounded-full px-4 py-2 text-sm font-bold transition-all flex items-center gap-1.5"
          :class="
            mode === m
              ? 'bg-[var(--reading-primary)] text-white shadow-md'
              : 'text-[var(--reading-primary)]/60 hover:text-[var(--reading-primary)]'
          "
          style="font-family: var(--reading-font-display)"
          @click="setMode(m)"
        >
          <UIcon :name="modeIcon(m)" class="text-base" />
          <span class="hidden sm:inline">{{ modeLabel(m) }}</span>
        </button>
      </div>
    </div>

    <!-- Speech not supported warning -->
    <div
      v-if="(mode === 'guided' || mode === 'read-together') && !speechSupported"
      class="mx-auto max-w-md p-4 rounded-2xl bg-[var(--reading-highlight)]/30 text-center text-sm text-[var(--reading-text)] font-semibold relative z-10"
    >
      &#x1F399;&#xFE0F; Speech recognition is not available in this browser. Try Chrome or Edge.
    </div>

    <!-- Read Together turn indicator -->
    <div
      v-if="mode === 'read-together' && togetherActive"
      class="mx-auto max-w-md p-4 rounded-2xl text-center font-bold relative z-10 reading-bounce"
      :class="
        isParentTurn
          ? 'bg-[var(--reading-primary)]/15 text-[var(--reading-primary)] border-2 border-[var(--reading-primary)]/25'
          : 'bg-[var(--reading-accent)]/15 text-[var(--reading-accent)] border-2 border-[var(--reading-accent)]/25'
      "
    >
      <span class="text-xl mr-2">{{ isParentTurn ? '&#x1F9D1;' : '&#x1F476;' }}</span>
      {{
        isParentTurn
          ? "Parent's Turn -- Read this page aloud!"
          : "Child's Turn -- Your turn to read!"
      }}
    </div>

    <!-- Main reading area -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 md:px-8 gap-6 relative z-10">
      <Transition name="reading-page" mode="out-in">
        <div
          :key="currentPage"
          class="flex flex-col md:flex-row items-center md:items-stretch gap-6 w-full max-w-5xl"
        >
          <!-- Text area — left on desktop, below on mobile -->
          <div
            class="w-full md:w-[55%] order-2 md:order-1 rounded-3xl p-6 md:p-8 bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/10 shadow-sm flex flex-col justify-center"
          >
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
              :class="
                mode === 'read-together' && isParentTurn && togetherActive
                  ? 'text-[var(--reading-primary)]'
                  : ''
              "
              @word-click="handleWordClick"
            />

            <!-- Phonics sounding-out slider -->
            <ReadingPhonicsSlider v-if="sliderWord" :word="sliderWord" @dismiss="dismissSlider" />
          </div>

          <!-- Illustration — right on desktop, top on mobile -->
          <div
            v-if="currentIllustration"
            class="w-full md:w-[45%] order-1 md:order-2 rounded-3xl overflow-hidden shadow-lg shadow-[var(--reading-primary)]/15"
          >
            <img
              :src="currentIllustration"
              :alt="`Illustration for page ${currentPage + 1}`"
              class="w-full aspect-square object-cover"
            />
          </div>
        </div>
      </Transition>
    </div>

    <!-- Controls area - sticky at bottom -->
    <div
      class="sticky bottom-0 pb-6 pt-4 relative z-10 bg-gradient-to-t from-[var(--reading-bg)] via-[var(--reading-bg)]/95 to-transparent"
    >
      <!-- Listen mode controls -->
      <div v-if="mode === 'listen'" class="flex items-center justify-center gap-3 md:gap-5">
        <button
          class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
          :class="{ 'opacity-30 pointer-events-none': currentPage === 0 }"
          @click="prevPage"
        >
          <UIcon name="i-heroicons-backward" class="text-xl" />
        </button>

        <button
          v-if="!isSpeaking"
          class="reading-fab bg-[var(--reading-accent)] text-white"
          @click="playCurrentPage"
        >
          <UIcon name="i-heroicons-play" class="text-2xl" />
        </button>
        <button
          v-else-if="isPaused"
          class="reading-fab bg-[var(--reading-accent)] text-white"
          @click="resume"
        >
          <UIcon name="i-heroicons-play" class="text-2xl" />
        </button>
        <button
          v-else
          class="reading-fab bg-[var(--reading-highlight)] text-[var(--reading-text)]"
          @click="pause"
        >
          <UIcon name="i-heroicons-pause" class="text-2xl" />
        </button>

        <button
          class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
          :class="{ 'opacity-30 pointer-events-none': !isSpeaking }"
          @click="stopTTS"
        >
          <UIcon name="i-heroicons-stop" class="text-xl" />
        </button>

        <button
          class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
          :class="{ 'opacity-30 pointer-events-none': currentPage >= totalPages - 1 }"
          @click="nextPage"
        >
          <UIcon name="i-heroicons-forward" class="text-xl" />
        </button>
      </div>

      <!-- Guided mode controls -->
      <div v-else-if="mode === 'guided'" class="flex flex-col items-center gap-3">
        <div v-if="speechSupported" class="flex items-center gap-3 md:gap-5">
          <button
            class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
            :class="{ 'opacity-30 pointer-events-none': currentPage === 0 }"
            @click="prevPage"
          >
            <UIcon name="i-heroicons-backward" class="text-xl" />
          </button>

          <button
            v-if="!isListening"
            class="reading-fab bg-[var(--reading-accent)] text-white"
            @click="startGuidedReading"
          >
            <UIcon name="i-heroicons-microphone" class="text-2xl" />
          </button>
          <button
            v-else
            class="reading-fab bg-red-500 text-white reading-pulse"
            @click="stopListening"
          >
            <UIcon name="i-heroicons-stop" class="text-2xl" />
          </button>

          <button
            class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
            :class="{ 'opacity-30 pointer-events-none': currentPage >= totalPages - 1 }"
            @click="nextPage"
          >
            <UIcon name="i-heroicons-forward" class="text-xl" />
          </button>
        </div>

        <p
          v-if="isListening"
          class="text-base text-[var(--reading-accent)] font-bold reading-bounce"
          style="font-family: var(--reading-font-display)"
        >
          &#x1F3A4; Read the words aloud!
        </p>
      </div>

      <!-- Read Together mode controls -->
      <div v-else-if="mode === 'read-together'" class="flex flex-col items-center gap-3">
        <div v-if="!togetherActive" class="flex items-center gap-4">
          <button
            class="reading-fab !w-auto !px-8 bg-[var(--reading-accent)] text-white font-bold text-lg"
            style="font-family: var(--reading-font-display)"
            @click="startTogetherReading"
          >
            &#x1F91D; Start Reading Together
          </button>
        </div>
        <div v-else class="flex items-center gap-3 md:gap-5">
          <button
            class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
            :class="{ 'opacity-30 pointer-events-none': currentPage === 0 }"
            @click="togetherPrevPage"
          >
            <UIcon name="i-heroicons-backward" class="text-xl" />
          </button>

          <button
            v-if="isParentTurn"
            class="reading-fab !w-auto !px-6 bg-[var(--reading-primary)] text-white font-bold"
            style="font-family: var(--reading-font-display)"
            @click="togetherNextPage"
          >
            Done &#x2192; Child's Turn
          </button>
          <template v-else>
            <button
              v-if="!isListening"
              class="reading-fab bg-[var(--reading-accent)] text-white"
              @click="startListening"
            >
              <UIcon name="i-heroicons-microphone" class="text-2xl" />
            </button>
            <button
              v-else
              class="reading-fab bg-red-500 text-white reading-pulse"
              @click="stopListening"
            >
              <UIcon name="i-heroicons-stop" class="text-2xl" />
            </button>
          </template>

          <button
            class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
            :class="{ 'opacity-30 pointer-events-none': currentPage >= totalPages - 1 }"
            @click="togetherNextPage"
          >
            <UIcon name="i-heroicons-forward" class="text-xl" />
          </button>
        </div>
        <p
          v-if="togetherActive && isChildTurn && isListening"
          class="text-base text-[var(--reading-accent)] font-bold reading-bounce"
          style="font-family: var(--reading-font-display)"
        >
          &#x1F3A4; Read the words aloud!
        </p>
      </div>

      <!-- Independent mode controls -->
      <div v-else class="flex items-center justify-center gap-3 md:gap-5">
        <button
          class="reading-fab !w-12 !h-12 bg-[var(--reading-card-bg)] text-[var(--reading-primary)]"
          :class="{ 'opacity-30 pointer-events-none': currentPage === 0 }"
          @click="prevPage"
        >
          <UIcon name="i-heroicons-backward" class="text-xl" />
        </button>
        <button
          class="reading-fab bg-[var(--reading-accent)] text-white"
          :class="{ 'opacity-30 pointer-events-none': currentPage >= totalPages - 1 }"
          @click="nextPage"
        >
          <UIcon name="i-heroicons-forward" class="text-2xl" />
        </button>
      </div>

      <!-- Speed control (listen mode only) -->
      <div v-if="mode === 'listen'" class="flex items-center justify-center gap-3 mt-4">
        <span class="text-xs text-[var(--reading-text)]/40 font-bold">&#x1F422;</span>
        <input
          type="range"
          min="0.5"
          max="1.2"
          step="0.1"
          :value="rate"
          class="w-28 accent-[var(--reading-accent)] h-2 rounded-full"
          @input="setRate(parseFloat(($event.target as HTMLInputElement).value))"
        />
        <span class="text-xs text-[var(--reading-text)]/40 font-bold">&#x1F407;</span>
        <span
          class="text-xs font-bold rounded-full px-2 py-0.5 bg-[var(--reading-accent)]/15 text-[var(--reading-accent)]"
        >
          {{ rate }}x
        </span>
      </div>
    </div>
  </div>
</template>
