<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { LessonCompleteResult } from '~~/shared/typing-types';
import { getBuiltInLessons } from '../../../../server/utils/typing/curriculum';

definePageMeta({
  layout: 'typing',
});

const route = useRoute();
const router = useRouter();
const slug = computed(() => String(route.params.slug ?? ''));

const allLessons = getBuiltInLessons();
const lesson = computed(() => allLessons.find((l) => l.slug === slug.value));
const nextLesson = computed(() => {
  const idx = allLessons.findIndex((l) => l.slug === slug.value);
  if (idx < 0 || idx === allLessons.length - 1) return null;
  return allLessons[idx + 1] ?? null;
});

useHead(() => ({
  title: lesson.value ? `${lesson.value.title} — Typing` : 'Lesson — Typing',
  meta: [
    {
      name: 'description',
      content: lesson.value
        ? `Practice typing: ${lesson.value.title}. Stage ${lesson.value.stage} ${lesson.value.kind}.`
        : 'Typing lesson runner — works without an account.',
    },
  ],
}));

const { recordAttempt, recordLessonBest } = useTypingProgress();
const toast = useToast();
const isNewBest = ref(false);
const previousBest = ref<{ wpm: number; accuracy: number } | null>(null);

const AUTO_ADVANCE_SECONDS = 5;
const lastResult = ref<LessonCompleteResult | null>(null);
const advanceCountdown = ref<number | null>(null);
const runnerKey = ref(0);
const lessonDone = computed(() => lastResult.value !== null);
// True once goToNextLesson has been called this run, false until slug
// changes. Prevents Enter/Space spam from firing router.push twice
// before lastResult clears via watch(slug).
const navigating = ref(false);
let advanceTimer: ReturnType<typeof setInterval> | null = null;

function clearAdvance() {
  advanceCountdown.value = null;
  if (advanceTimer) {
    clearInterval(advanceTimer);
    advanceTimer = null;
  }
}

function goToNextLesson() {
  if (navigating.value) return;
  clearAdvance();
  if (nextLesson.value) {
    navigating.value = true;
    router.push(`/typing/lesson/${nextLesson.value.slug}`);
  }
}

function tryAgain() {
  clearAdvance();
  lastResult.value = null;
  isNewBest.value = false;
  previousBest.value = null;
  navigating.value = false;
  runnerKey.value++;
}

function startAutoAdvance() {
  clearAdvance();
  if (!nextLesson.value) return;
  advanceCountdown.value = AUTO_ADVANCE_SECONDS;
  advanceTimer = setInterval(() => {
    if (advanceCountdown.value === null) return;
    // Background tabs keep firing setInterval; skip the tick rather than
    // silently navigating the kid away while they're looking elsewhere.
    if (import.meta.client && document.visibilityState === 'hidden') return;
    advanceCountdown.value--;
    if (advanceCountdown.value <= 0) goToNextLesson();
  }, 1000);
}

const passed = computed(() => {
  if (!lesson.value || !lastResult.value) return false;
  return (
    lastResult.value.accuracy >= lesson.value.targetAccuracy &&
    lastResult.value.wpm >= lesson.value.targetWpm
  );
});

watch(slug, () => {
  lastResult.value = null;
  isNewBest.value = false;
  previousBest.value = null;
  navigating.value = false;
  clearAdvance();
});

function onComplete(result: LessonCompleteResult) {
  // Cancelled runs (Escape) report bogus stats — one correct char in
  // 100ms reads as 120 WPM. Don't record the attempt, don't update PRs,
  // don't auto-advance. Treat it as a no-op except for resetting the
  // engine on the next remount.
  if (result.cancelled) return;
  lastResult.value = result;
  const outcome = recordAttempt({
    lessonId: null,
    gameSlug: null,
    wpm: result.wpm,
    netWpm: result.netWpm,
    accuracy: result.accuracy,
    durationMs: result.durationMs,
    errorsByKey: result.errorsByKey,
    completedAt: new Date().toISOString(),
  });
  if (outcome.stageAdvanced) {
    toast.add({
      title: `Stage ${outcome.currentStage} unlocked! 🎉`,
      description: `You cleared stage ${outcome.previousStage}. New keys are ready for you.`,
      color: 'success',
      icon: 'i-lucide-key-round',
      duration: 6000,
    });
  }
  const best = recordLessonBest(slug.value, {
    wpm: result.wpm,
    accuracy: result.accuracy,
    durationMs: result.durationMs,
  });
  isNewBest.value = best.isNewBest;
  previousBest.value = best.previous
    ? { wpm: best.previous.wpm, accuracy: best.previous.accuracy }
    : null;
  if (best.isNewBest && best.previous) {
    toast.add({
      title: 'New personal best! 🏆',
      description: `${Math.round(result.wpm)} WPM beats your previous ${Math.round(best.previous.wpm)} WPM.`,
      color: 'success',
      icon: 'i-lucide-trophy',
      duration: 5000,
    });
  }
  if (passed.value && nextLesson.value) startAutoAdvance();
}

// Once a lesson is done, Enter / Space jump straight to the next one
// so a kid can blow through a stage without ever reaching for the mouse.
function onKeydown(e: KeyboardEvent) {
  if (!lessonDone.value || !nextLesson.value) return;
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    goToNextLesson();
  }
}

onMounted(() => {
  if (import.meta.client) window.addEventListener('keydown', onKeydown);
});
onUnmounted(() => {
  if (import.meta.client) window.removeEventListener('keydown', onKeydown);
  clearAdvance();
});

function backToList() {
  router.push('/typing');
}
</script>

<template>
  <div v-if="lesson" class="space-y-6">
    <header class="flex items-baseline justify-between">
      <div>
        <NuxtLink
          to="/typing"
          class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          &larr; All lessons
        </NuxtLink>
      </div>
    </header>
    <TypingLessonRunner
      :key="runnerKey"
      :text="lesson.text"
      :title="lesson.title"
      :target-wpm="lesson.targetWpm"
      :target-accuracy="lesson.targetAccuracy"
      @complete="onComplete"
    />
    <div
      v-if="lessonDone && nextLesson"
      :class="[
        'flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 p-4',
        passed
          ? 'border-emerald-400 bg-emerald-50 text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-100'
          : 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500 dark:bg-amber-950/30 dark:text-amber-100',
      ]"
    >
      <div class="flex flex-col gap-1">
        <span class="text-base">
          <span v-if="passed" class="font-bold">Nice work! 🎉</span>
          <span v-else class="font-bold">Lesson finished!</span>
          <span class="ml-1"
            >Next up: <strong>{{ nextLesson.title }}</strong></span
          >
        </span>
        <span class="flex flex-wrap items-center gap-2 text-xs">
          <span
            v-if="isNewBest && previousBest && lastResult"
            class="rounded-full bg-amber-200 px-2 py-0.5 font-bold text-amber-950 dark:bg-amber-300"
            >🏆 new best · +{{ Math.round(lastResult.wpm - previousBest.wpm) }} WPM</span
          >
          <span
            v-else-if="isNewBest"
            class="rounded-full bg-amber-200 px-2 py-0.5 font-bold text-amber-950 dark:bg-amber-300"
            >🏆 first run logged</span
          >
          <span v-else-if="previousBest" class="opacity-70">
            best so far: {{ Math.round(previousBest.wpm) }} WPM ·
            {{ Math.round(previousBest.accuracy * 100) }}% accuracy
          </span>
          <span class="opacity-80">
            <span v-if="advanceCountdown !== null"
              >Auto-advancing in {{ advanceCountdown }}s ·
            </span>
            Press <kbd class="rounded border border-current px-1 font-mono text-xs">Enter</kbd> to
            continue
          </span>
        </span>
      </div>
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-full bg-emerald-500 px-5 py-2 text-base font-bold text-white shadow-md hover:bg-emerald-600 dark:bg-emerald-400 dark:text-emerald-950 dark:hover:bg-emerald-300"
          @click="goToNextLesson"
        >
          Next lesson →
        </button>
        <button
          type="button"
          class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          @click="tryAgain"
        >
          Try again
        </button>
      </div>
    </div>
    <div
      v-else-if="lessonDone && !nextLesson"
      class="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-4 text-center text-emerald-900 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-100"
    >
      <span class="font-bold">All done! 🏁</span> You finished the last lesson on this list.
      <button
        type="button"
        class="ml-3 rounded-full border border-emerald-400 bg-white px-3 py-1 text-sm font-semibold hover:bg-emerald-100 dark:border-emerald-600 dark:bg-emerald-900/40 dark:hover:bg-emerald-800"
        @click="backToList"
      >
        Back to lessons
      </button>
    </div>
  </div>
  <div
    v-else
    class="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800"
  >
    <p :data-testid="TEST_IDS.TYPING.LESSON_RUNNER" class="text-slate-700 dark:text-slate-300">
      Lesson not found.
    </p>
    <button
      class="mt-4 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white"
      @click="backToList"
    >
      Back to lessons
    </button>
  </div>
</template>
