<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { getBuiltInLessons, getStages } from '../../../server/utils/typing/curriculum';

definePageMeta({
  layout: 'typing',
});

useHead({ title: 'Typing — Practice' });

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
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.LANDING_PAGE" class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Typing practice</h1>
      <p class="mt-2 text-slate-600 dark:text-slate-300">
        Pick a stage and run a drill — works without an account.
      </p>
    </header>

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

    <section
      :data-testid="TEST_IDS.TYPING.LESSON_PICKER"
      class="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      <article
        v-for="lesson in lessonsForStage"
        :key="lesson.slug"
        :data-testid="TEST_IDS.TYPING.LESSON_CARD"
        class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <header class="mb-2 flex items-center justify-between">
          <h2 class="text-base font-semibold text-slate-900 dark:text-slate-100">
            {{ lesson.title }}
          </h2>
          <span
            class="rounded-full bg-slate-100 px-2 py-0.5 text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-700 dark:text-slate-300"
          >
            {{ lesson.kind }}
          </span>
        </header>
        <p class="mb-3 line-clamp-2 font-mono text-xs text-slate-500 dark:text-slate-400">
          {{ lesson.text }}
        </p>
        <NuxtLink
          :to="`/typing/lesson/${lesson.slug}`"
          class="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
        >
          Start lesson
        </NuxtLink>
      </article>
    </section>
  </div>
</template>
