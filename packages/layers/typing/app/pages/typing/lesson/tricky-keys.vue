<script setup lang="ts">
/**
 * Adaptive review lesson built from the learner's own error heatmap.
 *
 * Static route — Nuxt prefers it over the [slug] catch-all. Content is
 * client-only because the key stats live in localStorage. Counts as a
 * gate-eligible pass at the learner's current stage (the practice text is
 * stage-constrained and long enough), so fixing your weak keys moves you
 * forward instead of being a side quest.
 */
import {
  STAGE_TARGET_ACCURACY,
  isCaseInsensitiveStage,
  stageTargetWpm,
  type LessonCompleteResult,
} from '~~/shared/typing-types';
import { unlockedKeysForStage } from '../../../../server/utils/typing/curriculum';
import { trickyKeysText } from '../../../../server/utils/typing/lesson-texts';
import { pickTrickyKeys } from '../../../utils/typing/tricky-keys';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Tricky keys — Typing',
  meta: [
    {
      name: 'description',
      content: 'Practice the keys that trip you up most, picked from your own typing stats.',
    },
  ],
});

const router = useRouter();
const { progress, recordAttempt, recordLessonBest } = useTypingProgress();
const toast = useToast();

const currentStage = computed(() => progress.value.currentStage);
const unlocked = computed(() => unlockedKeysForStage(currentStage.value));
const trickyKeys = computed(() => pickTrickyKeys(progress.value.keyStats, unlocked.value));

const textSeed = ref(1);
onMounted(() => {
  textSeed.value = 1 + Math.floor(Math.random() * 2_000_000_000);
});

const text = computed(() =>
  trickyKeysText(
    trickyKeys.value.map((k) => k.key),
    unlocked.value,
    textSeed.value,
  ),
);

const targetWpm = computed(() => stageTargetWpm(currentStage.value));
const runnerKey = ref(0);
const lastResult = ref<LessonCompleteResult | null>(null);

function onComplete(result: LessonCompleteResult) {
  if (result.cancelled) return;
  lastResult.value = result;
  const outcome = recordAttempt({
    lessonId: null,
    gameSlug: null,
    lesson: {
      slug: 'tricky-keys',
      stage: currentStage.value,
      kind: 'drill',
      textLength: text.value.length,
    },
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
  recordLessonBest('tricky-keys', {
    wpm: result.wpm,
    accuracy: result.accuracy,
    durationMs: result.durationMs,
  });
}

function tryAgain() {
  lastResult.value = null;
  textSeed.value = 1 + Math.floor(Math.random() * 2_000_000_000);
  runnerKey.value++;
}

function backToList() {
  router.push('/typing');
}
</script>

<template>
  <div class="space-y-6">
    <header class="flex items-baseline justify-between">
      <NuxtLink
        to="/typing"
        class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        &larr; All lessons
      </NuxtLink>
    </header>

    <ClientOnly>
      <template v-if="trickyKeys.length > 0">
        <div
          class="flex flex-wrap items-center gap-2 rounded-xl border-2 border-sky-400/40 bg-sky-50 p-4 text-sm text-sky-950 dark:border-sky-500/40 dark:bg-sky-950/30 dark:text-sky-100"
        >
          <span class="font-bold">Your tricky keys:</span>
          <span
            v-for="k in trickyKeys"
            :key="k.key"
            class="rounded-md border border-sky-400/60 bg-white px-2 py-0.5 font-mono text-base font-extrabold dark:bg-slate-900"
          >
            {{ k.key }}
          </span>
          <span class="opacity-70">picked from your own typing stats — let's smooth them out</span>
        </div>

        <TypingLessonRunner
          :key="runnerKey"
          :text="text"
          title="Tricky keys practice"
          :target-wpm="targetWpm"
          :target-accuracy="STAGE_TARGET_ACCURACY"
          :case-insensitive="isCaseInsensitiveStage(currentStage)"
          @complete="onComplete"
        />

        <div
          v-if="lastResult"
          class="flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-sky-400 bg-sky-50 p-4 text-sky-900 dark:border-sky-500 dark:bg-sky-950/40 dark:text-sky-100"
        >
          <span class="font-bold">Nice work on the hard stuff! 💪</span>
          <div class="flex gap-2">
            <button
              type="button"
              class="rounded-full bg-sky-500 px-5 py-2 text-base font-bold text-white shadow-md hover:bg-sky-600 dark:bg-sky-400 dark:text-sky-950 dark:hover:bg-sky-300"
              @click="tryAgain"
            >
              Another round
            </button>
            <button
              type="button"
              class="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              @click="backToList"
            >
              Back to lessons
            </button>
          </div>
        </div>
      </template>

      <div
        v-else
        class="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800"
      >
        <p class="text-slate-700 dark:text-slate-300">
          No tricky keys yet! Keep practicing lessons and games — once a few keys start tripping you
          up, this page builds a practice round just for them.
        </p>
        <button
          class="mt-4 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white"
          @click="backToList"
        >
          Back to lessons
        </button>
      </div>
    </ClientOnly>
  </div>
</template>
