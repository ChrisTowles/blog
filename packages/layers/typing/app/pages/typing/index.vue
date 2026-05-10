<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { SpellingList, SpellingProgress } from '~~/shared/typing-types';
import { getBuiltInLessons, getStages } from '../../../server/utils/typing/curriculum';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Practice',
  meta: [
    {
      name: 'description',
      content:
        'Kid-friendly typing tutor. Pick a stage, run a drill, or jump into Letter Rain, Letter Tic-Tac-Toe, or Lake Leap — works without an account.',
    },
  ],
});

const stages = getStages();
const lessons = getBuiltInLessons();

const stageOptions = computed(() =>
  stages.map((s) => ({
    label: `Stage ${s.stage}: ${s.name}`,
    value: s.stage,
  })),
);

const { progress } = useTypingProgress();
const selectedStage = ref(progress.value.currentStage);

const lessonsForStage = computed(() => lessons.filter((l) => l.stage === selectedStage.value));

const route = useRoute();
const router = useRouter();

// Sync stage selection to URL.
onMounted(() => {
  const q = Number(route.query.stage);
  if (q >= 1 && q <= 20) selectedStage.value = q;
});

watch(selectedStage, (val) => {
  router.replace({ query: { ...route.query, stage: val } });
});

// Active spelling list (most recent week) for the active learner.
const { active } = useActiveLearner();
const activeSpellingList = ref<SpellingList | null>(null);
const activeSpellingProgress = ref<SpellingProgress[]>([]);

watchEffect(async () => {
  if (!active.value) {
    activeSpellingList.value = null;
    activeSpellingProgress.value = [];
    return;
  }
  try {
    const result = await $fetch<{
      lists: SpellingList[];
      progressByList: Record<number, SpellingProgress[]>;
    }>('/api/typing/spelling', {
      params: { learnerId: active.value.id },
    });
    activeSpellingList.value = result.lists[0] ?? null;
    activeSpellingProgress.value = activeSpellingList.value
      ? (result.progressByList[activeSpellingList.value.id] ?? [])
      : [];
  } catch {
    activeSpellingList.value = null;
    activeSpellingProgress.value = [];
  }
});

const masteredWordsForActive = computed(() =>
  activeSpellingProgress.value.filter((p) => p.mastered).map((p) => p.word),
);
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.LANDING_PAGE" class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Typing practice</h1>
      <p class="mt-2 text-slate-600 dark:text-slate-300">
        Pick a stage and run a drill — works without an account.
      </p>
    </header>

    <section v-if="activeSpellingList" class="space-y-2">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">This week's spelling</h2>
      <TypingSpellingMasteryCard
        :list="activeSpellingList"
        :mastered-words="masteredWordsForActive"
      />
    </section>

    <section :data-testid="TEST_IDS.TYPING.STAGE_MAP" class="space-y-3">
      <label class="block text-sm font-medium text-slate-700 dark:text-slate-200" for="stage-pick">
        Stage
      </label>
      <select
        id="stage-pick"
        v-model.number="selectedStage"
        class="w-full max-w-md rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
      >
        <option v-for="opt in stageOptions" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
    </section>

    <section aria-labelledby="games-heading" class="space-y-3">
      <h2 id="games-heading" class="text-lg font-semibold text-slate-900 dark:text-slate-100">
        Games
      </h2>
      <div class="grid gap-3 md:grid-cols-3">
        <NuxtLink
          :to="`/typing/game/letter-rain?stage=${selectedStage}`"
          class="rounded-xl border border-amber-300 bg-amber-50 p-4 hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-950/40"
        >
          <h3 class="font-semibold text-amber-900 dark:text-amber-200">Letter Rain</h3>
          <p class="text-sm text-amber-900 dark:text-amber-300">
            Type falling letters to zap them.
          </p>
        </NuxtLink>
        <NuxtLink
          :to="`/typing/game/letter-tic-tac-toe?stage=${selectedStage}`"
          class="rounded-xl border border-emerald-300 bg-emerald-50 p-4 hover:bg-emerald-100 dark:border-emerald-700 dark:bg-emerald-950/40"
        >
          <h3 class="font-semibold text-emerald-900 dark:text-emerald-200">Letter Tic-Tac-Toe</h3>
          <p class="text-sm text-emerald-900 dark:text-emerald-300">Strategy + key practice.</p>
        </NuxtLink>
        <NuxtLink
          :to="`/typing/game/lake-leap?stage=${selectedStage}&mode=curriculum`"
          class="rounded-xl border border-sky-300 bg-sky-50 p-4 hover:bg-sky-100 dark:border-sky-700 dark:bg-sky-950/40"
        >
          <h3 class="font-semibold text-sky-900 dark:text-sky-200">Lake Leap</h3>
          <p class="text-sm text-sky-900 dark:text-sky-300">Type words to leap across.</p>
        </NuxtLink>
      </div>
    </section>

    <section :data-testid="TEST_IDS.TYPING.LESSON_PICKER" aria-labelledby="lessons-heading">
      <h2
        id="lessons-heading"
        class="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100"
      >
        Lessons
      </h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="lesson in lessonsForStage"
          :key="lesson.slug"
          :data-testid="TEST_IDS.TYPING.LESSON_CARD"
          class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        >
          <header class="mb-2 flex items-center justify-between">
            <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
              {{ lesson.title }}
            </h3>
            <span
              class="rounded-full bg-slate-100 px-2 py-0.5 text-xs uppercase tracking-wide text-slate-700 dark:bg-slate-700 dark:text-slate-200"
            >
              {{ lesson.kind }}
            </span>
          </header>
          <p class="mb-3 line-clamp-2 font-mono text-xs text-slate-600 dark:text-slate-300">
            {{ lesson.text }}
          </p>
          <NuxtLink
            :to="`/typing/lesson/${lesson.slug}`"
            class="inline-flex items-center gap-1 rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
          >
            Start lesson
          </NuxtLink>
        </article>
      </div>
    </section>
  </div>
</template>
