<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const { activeChildId } = useActiveChild();
const childIdRef = computed(() => activeChildId.value);
const { currentCard, remaining, isLoading, fetchDueCards, submitReview, dueCards } =
  useSRS(childIdRef);

// Session tracking
const sessionStartTime = ref<number | null>(null);
const reviewedCount = ref(0);
const againCount = ref(0);
const hardCount = ref(0);
const goodCount = ref(0);
const sessionComplete = ref(false);
const totalInSession = ref(0);

// Start session when cards are loaded
watch(
  dueCards,
  (cards) => {
    if (cards.length > 0 && !sessionStartTime.value) {
      sessionStartTime.value = Date.now();
      totalInSession.value = cards.length;
    }
  },
  { immediate: true },
);

const elapsedSeconds = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    if (sessionStartTime.value && !sessionComplete.value) {
      elapsedSeconds.value = Math.floor((Date.now() - sessionStartTime.value) / 1000);
    }
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const elapsedFormatted = computed(() => {
  const m = Math.floor(elapsedSeconds.value / 60);
  const s = elapsedSeconds.value % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
});

const progressPercent = computed(() => {
  if (totalInSession.value === 0) return 0;
  return Math.round((reviewedCount.value / totalInSession.value) * 100);
});

async function handleRate(rating: 1 | 3 | 4) {
  reviewedCount.value++;
  if (rating === 1) againCount.value++;
  else if (rating === 3) hardCount.value++;
  else goodCount.value++;

  await submitReview(rating);

  // Check if session is complete (no more cards after review)
  if (remaining.value <= 0 && !currentCard.value) {
    sessionComplete.value = true;
  }
}

function startNewSession() {
  sessionComplete.value = false;
  reviewedCount.value = 0;
  againCount.value = 0;
  hardCount.value = 0;
  goodCount.value = 0;
  sessionStartTime.value = null;
  totalInSession.value = 0;
  elapsedSeconds.value = 0;
  fetchDueCards();
}
</script>

<template>
  <div class="space-y-8 pb-8">
    <!-- Hero header -->
    <div class="text-center space-y-4 reading-float-in pt-8">
      <div class="inline-block mb-2">
        <span class="text-5xl reading-bounce inline-block">&#x1F3B4;</span>
      </div>
      <h1
        class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--reading-accent)] via-[var(--reading-secondary)] to-[var(--reading-primary)] bg-clip-text text-transparent"
        style="font-family: var(--reading-font-display)"
      >
        Practice Cards
      </h1>
    </div>

    <div class="max-w-lg mx-auto">
      <!-- No child selected -->
      <div
        v-if="!activeChildId"
        :data-testid="TEST_IDS.READING.NO_CHILD_PROMPT"
        class="text-center py-12 reading-float-in"
      >
        <div
          class="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[var(--reading-highlight)]/30 to-[var(--reading-secondary)]/20 mb-6 shadow-lg shadow-[var(--reading-highlight)]/10"
        >
          <span class="text-6xl">&#x1F4DD;</span>
        </div>
        <p
          class="text-2xl md:text-3xl text-[var(--reading-text)]/70 mb-8"
          style="font-family: var(--reading-font-display)"
        >
          Select a child profile first.
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-10 !py-4 !text-xl !font-bold !bg-gradient-to-r !from-[var(--reading-accent)] !to-[var(--reading-accent)] !text-white !transition-all !duration-300 active:!scale-95"
        >
          Set Up a Profile
        </UButton>
      </div>

      <!-- Loading state -->
      <div v-else-if="isLoading" class="text-center py-16 reading-float-in">
        <div
          class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--reading-primary)]/20 to-[var(--reading-primary)]/10 mb-6 animate-pulse"
        >
          <span class="text-5xl">&#x1F3B4;</span>
        </div>
        <p
          class="text-2xl text-[var(--reading-text)]/60"
          style="font-family: var(--reading-font-display)"
        >
          Loading your cards...
        </p>
      </div>

      <!-- Session complete -->
      <div v-else-if="sessionComplete" class="reading-float-in text-center space-y-6">
        <div
          class="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-[var(--reading-success)]/30 to-[var(--reading-highlight)]/20 mb-4"
        >
          <span class="text-6xl reading-bounce">&#x1F389;</span>
        </div>
        <h2
          class="text-3xl md:text-4xl font-extrabold text-[var(--reading-text)]"
          style="font-family: var(--reading-font-display)"
        >
          All Done!
        </h2>
        <p
          class="text-xl text-[var(--reading-text)]/60"
          style="font-family: var(--reading-font-body)"
        >
          Great practice session!
        </p>

        <!-- Stats grid -->
        <div class="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          <div
            class="rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/15 p-4 text-center"
          >
            <p class="text-3xl font-extrabold text-[var(--reading-primary)]">
              {{ reviewedCount }}
            </p>
            <p class="text-sm text-[var(--reading-text)]/60 font-semibold">Cards Reviewed</p>
          </div>
          <div
            class="rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/15 p-4 text-center"
          >
            <p class="text-3xl font-extrabold text-[var(--reading-primary)]">
              {{ elapsedFormatted }}
            </p>
            <p class="text-sm text-[var(--reading-text)]/60 font-semibold">Time</p>
          </div>
          <div
            class="rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-success)]/15 p-4 text-center"
          >
            <p class="text-3xl font-extrabold text-[var(--reading-success)]">{{ goodCount }}</p>
            <p class="text-sm text-[var(--reading-text)]/60 font-semibold">Got It!</p>
          </div>
          <div
            class="rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-accent)]/15 p-4 text-center"
          >
            <p class="text-3xl font-extrabold text-[var(--reading-accent)]">{{ againCount }}</p>
            <p class="text-sm text-[var(--reading-text)]/60 font-semibold">Try Again</p>
          </div>
        </div>

        <div class="flex flex-col gap-3 pt-4">
          <UButton
            class="!rounded-full !px-8 !py-4 !text-lg !font-bold !bg-[var(--reading-primary)] !text-white !transition-all !duration-300 active:!scale-95"
            style="font-family: var(--reading-font-display)"
            @click="startNewSession"
          >
            Practice Again
          </UButton>
          <UButton
            to="/reading/dashboard"
            variant="outline"
            class="!rounded-full !px-8 !py-3 !text-lg !font-bold !border-2 !border-[var(--reading-primary)] !text-[var(--reading-primary)] !transition-all !duration-300 active:!scale-95"
          >
            Back to Dashboard
          </UButton>
        </div>
      </div>

      <!-- No cards due -->
      <div v-else-if="!currentCard && !isLoading" class="reading-float-in text-center">
        <div
          class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-success)]/20 p-10 shadow-xl shadow-[var(--reading-success)]/10"
        >
          <div
            class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--reading-success)]/20 to-[var(--reading-success)]/10 mb-6"
          >
            <span class="text-5xl">&#x2705;</span>
          </div>
          <h2
            class="text-2xl md:text-3xl font-extrabold text-[var(--reading-text)] mb-3"
            style="font-family: var(--reading-font-display)"
          >
            All caught up!
          </h2>
          <p
            class="text-lg text-[var(--reading-text)]/50 mb-8"
            style="font-family: var(--reading-font-body)"
          >
            No cards due right now. Come back later for more practice!
          </p>
          <UButton
            to="/reading/dashboard"
            variant="outline"
            class="!rounded-full !px-8 !py-3 !text-lg !font-bold !border-2 !border-[var(--reading-primary)] !text-[var(--reading-primary)] !transition-all !duration-300 active:!scale-95"
          >
            Back to Dashboard
          </UButton>
        </div>
      </div>

      <!-- Active review session -->
      <div v-else class="space-y-6 reading-float-in">
        <!-- Progress bar -->
        <div class="space-y-2">
          <div
            class="flex items-center justify-between text-sm font-bold text-[var(--reading-text)]/60"
          >
            <span>Card {{ reviewedCount + 1 }} of {{ totalInSession }}</span>
            <span>{{ elapsedFormatted }}</span>
          </div>
          <div
            class="h-3 rounded-full bg-[var(--reading-bg)] border border-[var(--reading-primary)]/10 overflow-hidden"
          >
            <div
              class="h-full rounded-full bg-gradient-to-r from-[var(--reading-primary)] to-[var(--reading-accent)] transition-all duration-500 ease-out"
              :style="{ width: `${progressPercent}%` }"
            />
          </div>
        </div>

        <!-- Card review component -->
        <ReadingCardReview
          v-if="currentCard"
          :key="currentCard.id"
          :front="currentCard.front"
          :back="currentCard.back"
          @rate="handleRate"
        />
      </div>
    </div>
  </div>
</template>
