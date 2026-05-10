<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import {
  isCaseInsensitiveStage,
  type LessonCompleteResult,
  type LessonRow,
} from '~~/shared/typing-types';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Topic games',
  meta: [{ name: 'description', content: 'Generate kid-safe typing games on any topic.' }],
});

const lesson = ref<LessonRow | null>(null);
const { recordAttempt } = useTypingProgress();
const toast = useToast();

function onGenerated(result: LessonRow) {
  lesson.value = result;
}

function onComplete(result: LessonCompleteResult) {
  const outcome = recordAttempt({
    lessonId: lesson.value?.id ?? null,
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
        :case-insensitive="isCaseInsensitiveStage(lesson.stage)"
        @complete="onComplete"
      />
    </div>
  </div>
</template>
