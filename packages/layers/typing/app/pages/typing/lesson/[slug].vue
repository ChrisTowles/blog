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

const lesson = computed(() => getBuiltInLessons().find((l) => l.slug === slug.value));

useHead(() => ({
  title: lesson.value ? `${lesson.value.title} — Typing` : 'Lesson — Typing',
}));

const { recordAttempt } = useTypingProgress();
const toast = useToast();

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
  </div>
  <div
    v-else
    class="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800"
  >
    <p :data-testid="TEST_IDS.TYPING.LESSON_RUNNER" class="text-slate-700 dark:text-slate-300">
      Lesson not found.
    </p>
    <button
      class="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white"
      @click="backToList"
    >
      Back to lessons
    </button>
  </div>
</template>
