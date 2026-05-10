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

const { recordAttempt } = useTypingProgress();
const toast = useToast();

const AUTO_ADVANCE_SECONDS = 5;
const advanceCountdown = ref<number | null>(null);
let advanceTimer: ReturnType<typeof setInterval> | null = null;

function clearAdvance() {
  advanceCountdown.value = null;
  if (advanceTimer) {
    clearInterval(advanceTimer);
    advanceTimer = null;
  }
}

function goToNextLesson() {
  clearAdvance();
  if (nextLesson.value) router.push(`/typing/lesson/${nextLesson.value.slug}`);
}

function startAutoAdvance() {
  clearAdvance();
  if (!nextLesson.value) return;
  advanceCountdown.value = AUTO_ADVANCE_SECONDS;
  advanceTimer = setInterval(() => {
    if (advanceCountdown.value === null) return;
    advanceCountdown.value--;
    if (advanceCountdown.value <= 0) {
      goToNextLesson();
    }
  }, 1000);
}

onUnmounted(clearAdvance);

function onComplete(result: LessonCompleteResult) {
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
  const passed =
    lesson.value !== undefined &&
    result.accuracy >= lesson.value.targetAccuracy &&
    result.wpm >= lesson.value.targetWpm;
  if (passed && nextLesson.value) {
    startAutoAdvance();
  }
}

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
      :text="lesson.text"
      :title="lesson.title"
      :target-wpm="lesson.targetWpm"
      :target-accuracy="lesson.targetAccuracy"
      @complete="onComplete"
    />
    <div
      v-if="advanceCountdown !== null && nextLesson"
      class="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
    >
      <span>
        Next up: <strong>{{ nextLesson.title }}</strong>
        <span class="ml-2 opacity-70">in {{ advanceCountdown }}s…</span>
      </span>
      <span class="flex gap-2">
        <button
          type="button"
          class="rounded-full border border-emerald-400 bg-white px-4 py-1.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 dark:border-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-100 dark:hover:bg-emerald-800"
          @click="goToNextLesson"
        >
          Next now →
        </button>
        <button
          type="button"
          class="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          @click="clearAdvance"
        >
          Stay here
        </button>
      </span>
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
