<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { LessonRow, LessonCompleteResult } from '~~/shared/typing-types';

definePageMeta({
  layout: 'typing',
});

useHead({ title: 'Typing — Topic games' });

const lesson = ref<LessonRow | null>(null);
const { recordAttempt } = useTypingProgress();

function onGenerated(result: LessonRow) {
  lesson.value = result;
}

function onComplete(result: LessonCompleteResult) {
  recordAttempt({
    lessonId: lesson.value?.id ?? null,
    gameSlug: null,
    wpm: result.wpm,
    netWpm: result.netWpm,
    accuracy: result.accuracy,
    durationMs: result.durationMs,
    errorsByKey: result.errorsByKey,
    completedAt: new Date().toISOString(),
  });
}

function reset() {
  lesson.value = null;
}
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.TOPICS_PAGE" class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Topic games</h1>
      <p class="mt-2 text-slate-600 dark:text-slate-300">
        Type about anything you love — characters, hobbies, made-up worlds.
      </p>
    </header>

    <TypingTopicGameForm v-if="!lesson" @generated="onGenerated" />

    <div v-else class="space-y-4">
      <button
        type="button"
        class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        @click="reset"
      >
        &larr; New topic
      </button>
      <TypingLessonRunner
        :text="lesson.text"
        :title="lesson.title"
        :target-wpm="lesson.targetWpm"
        :target-accuracy="lesson.targetAccuracy"
        @complete="onComplete"
      />
    </div>
  </div>
</template>
