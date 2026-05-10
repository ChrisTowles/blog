<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { LessonKind, SpellingList, SpellingProgress } from '~~/shared/typing-types';
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

const { progress, getLessonBest } = useTypingProgress();

const route = useRoute();
const router = useRouter();

const selectedStage = ref<number>(progress.value.currentStage);

onMounted(() => {
  const q = Number(route.query.stage);
  if (q >= 1 && q <= 20) selectedStage.value = q;
});

watch(selectedStage, (val) => {
  router.replace({ query: { ...route.query, stage: val } });
});

// --- Derived state per stage --------------------------------------------

type StageStatus = 'completed' | 'current' | 'future';

type StageRow = {
  stage: number;
  name: string;
  keys: string[];
  targetWpm: number;
  status: StageStatus;
  progressPct: number;
  family: 0 | 1 | 2 | 3;
};

function familyForStage(stage: number): 0 | 1 | 2 | 3 {
  if (stage <= 5) return 0; // home row
  if (stage <= 10) return 1; // top row
  if (stage <= 15) return 2; // bottom row
  return 3; // capitals + numbers + symbols
}

const stageRows = computed<StageRow[]>(() => {
  const current = progress.value.currentStage;
  return stages.map((s) => {
    const stageLessons = lessons.filter((l) => l.stage === s.stage);
    const attempted = stageLessons.filter((l) => getLessonBest(l.slug) !== null).length;
    const progressPct =
      stageLessons.length > 0 ? Math.round((attempted / stageLessons.length) * 100) : 0;
    const status: StageStatus =
      s.stage < current ? 'completed' : s.stage === current ? 'current' : 'future';
    return {
      stage: s.stage,
      name: s.name,
      keys: s.keys,
      targetWpm: s.targetWpm,
      status,
      progressPct,
      family: familyForStage(s.stage),
    };
  });
});

// --- Selected stage detail ----------------------------------------------

const selectedStageDef = computed(() => stages.find((s) => s.stage === selectedStage.value));
const lessonsForSelected = computed(() => lessons.filter((l) => l.stage === selectedStage.value));

// Friendly labels + icon glyphs for lesson kinds (drill/bigram/word/sentence/paragraph).
const KIND_META: Record<LessonKind, { label: string; icon: string; accent: string }> = {
  drill: { label: 'Letters', icon: '✦', accent: 'from-sky-500/40 to-sky-500/10 border-sky-400/40' },
  bigram: {
    label: 'Pairs',
    icon: '◇◇',
    accent: 'from-emerald-500/40 to-emerald-500/10 border-emerald-400/40',
  },
  word: {
    label: 'Words',
    icon: '◯',
    accent: 'from-amber-500/40 to-amber-500/10 border-amber-400/40',
  },
  sentence: {
    label: 'Sentence',
    icon: '“ ”',
    accent: 'from-rose-500/40 to-rose-500/10 border-rose-400/40',
  },
  paragraph: {
    label: 'Paragraph',
    icon: '¶',
    accent: 'from-violet-500/40 to-violet-500/10 border-violet-400/40',
  },
  topic: {
    label: 'Topic',
    icon: '★',
    accent: 'from-fuchsia-500/40 to-fuchsia-500/10 border-fuchsia-400/40',
  },
  'spelling-drill': {
    label: 'Spelling',
    icon: '✎',
    accent: 'from-teal-500/40 to-teal-500/10 border-teal-400/40',
  },
  'spelling-sentence': {
    label: 'Spelling sentence',
    icon: '✎',
    accent: 'from-teal-500/40 to-teal-500/10 border-teal-400/40',
  },
  accumulation: {
    label: 'Mixed practice',
    icon: '✦◇',
    accent: 'from-cyan-500/40 to-cyan-500/10 border-cyan-400/40',
  },
  consolidation: {
    label: 'Row review',
    icon: '★★',
    accent: 'from-violet-500/40 to-violet-500/10 border-violet-400/40',
  },
};

// --- Spelling card (kept from prior implementation) ----------------------

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
  <div :data-testid="TEST_IDS.TYPING.LANDING_PAGE" class="space-y-10">
    <!-- Hero: name the journey, name the current stage -->
    <header class="space-y-3">
      <div class="flex items-baseline gap-3">
        <h1 class="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Typing journey
        </h1>
        <span
          class="rounded-full border border-amber-300/60 bg-amber-100/60 px-3 py-0.5 text-sm font-bold text-amber-950 dark:border-amber-500/60 dark:bg-amber-500/20 dark:text-amber-200"
        >
          You're on stage {{ progress.currentStage }}
        </span>
      </div>
      <p class="max-w-prose text-slate-600 dark:text-slate-300">
        Tap a stage to see its lessons. Every stage adds new keys — finish lessons to unlock the
        next one.
      </p>
    </header>

    <!-- Spelling card surfaces above the grid when set -->
    <section v-if="activeSpellingList" class="space-y-2">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">This week's spelling</h2>
      <TypingSpellingMasteryCard
        :list="activeSpellingList"
        :mastered-words="masteredWordsForActive"
      />
    </section>

    <!-- THE GRID -->
    <section :data-testid="TEST_IDS.TYPING.STAGE_MAP" class="space-y-5">
      <div class="flex items-baseline justify-between">
        <h2 class="text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Stages
        </h2>
        <div class="flex items-center gap-3 text-xs">
          <span class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
            Done
          </span>
          <span class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span class="inline-block h-2.5 w-2.5 rounded-full bg-amber-300"></span>
            You're here
          </span>
          <span class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <span class="inline-block h-2.5 w-2.5 rounded-full bg-slate-600"></span>
            Coming up
          </span>
        </div>
      </div>

      <div class="grid auto-rows-fr gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5" role="list">
        <div
          v-for="(row, idx) in stageRows"
          :key="row.stage"
          role="listitem"
          class="stage-card-enter"
          :style="{ animationDelay: `${idx * 35}ms` }"
        >
          <TypingStageCard
            :stage="row.stage"
            :name="row.name"
            :keys="row.keys"
            :target-wpm="row.targetWpm"
            :status="row.status"
            :progress-pct="row.progressPct"
            :family="row.family"
            :selected="selectedStage === row.stage"
            @click="selectedStage = row.stage"
          />
        </div>
      </div>
    </section>

    <!-- Inline lesson panel for the selected stage. Inline (not modal)
         so kids see the relationship between the stage tile and its
         lessons. -->
    <section v-if="selectedStageDef" :data-testid="TEST_IDS.TYPING.LESSON_PICKER">
      <div
        class="rounded-2xl border-2 border-amber-400/40 bg-gradient-to-br from-amber-50 to-white p-5 shadow-lg dark:border-amber-500/40 dark:from-amber-950/30 dark:to-slate-900"
      >
        <header class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            <span class="font-mono tabular-nums opacity-60">{{
              selectedStage.toString().padStart(2, '0')
            }}</span>
            <span class="ml-2">{{ selectedStageDef.name }}</span>
          </h2>
          <div class="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
            <span class="rounded-full bg-slate-100 px-2 py-1 font-bold dark:bg-slate-800">
              Target: {{ selectedStageDef.targetWpm }} WPM
            </span>
            <span class="rounded-full bg-slate-100 px-2 py-1 font-bold dark:bg-slate-800">
              Accuracy: {{ Math.round(selectedStageDef.targetAccuracy * 100) }}%
            </span>
          </div>
        </header>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="lesson in lessonsForSelected"
            :key="lesson.slug"
            :data-testid="TEST_IDS.TYPING.LESSON_CARD"
            :to="`/typing/lesson/${lesson.slug}`"
            :class="[
              'group relative overflow-hidden rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-md',
              KIND_META[lesson.kind].accent,
            ]"
          >
            <!-- PR badge if completed -->
            <span
              v-if="getLessonBest(lesson.slug)"
              class="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-extrabold text-emerald-950 shadow-sm"
              aria-label="Personal best"
            >
              <span aria-hidden="true">✓</span>
              {{ Math.round(getLessonBest(lesson.slug)?.wpm ?? 0) }} wpm
            </span>

            <div class="mb-2 font-mono text-2xl font-extrabold text-slate-700 dark:text-slate-200">
              {{ KIND_META[lesson.kind].icon }}
            </div>
            <div
              class="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
            >
              {{ KIND_META[lesson.kind].label }}
            </div>
            <p class="mt-1 line-clamp-1 font-mono text-xs text-slate-600 dark:text-slate-300">
              {{ lesson.text }}
            </p>
            <div class="mt-3 flex items-center justify-between text-xs">
              <span class="text-slate-500 dark:text-slate-400">
                {{ lesson.text.length }} chars
              </span>
              <span
                class="rounded-full bg-amber-700 px-3 py-1 font-bold text-white transition-colors group-hover:bg-amber-800"
              >
                Start →
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Games: arcade-style row -->
    <section aria-labelledby="games-heading" class="space-y-3">
      <h2
        id="games-heading"
        class="text-lg font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
      >
        Games
      </h2>
      <div class="grid gap-3 md:grid-cols-3">
        <NuxtLink
          :to="`/typing/game/letter-rain?stage=${selectedStage}`"
          class="group relative overflow-hidden rounded-2xl border-2 border-amber-400/50 bg-gradient-to-br from-amber-500/30 to-orange-500/20 p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
        >
          <div class="text-3xl">☔</div>
          <h3 class="mt-2 font-extrabold text-amber-50 drop-shadow-md">Letter Rain</h3>
          <p class="mt-1 text-sm text-amber-100/90">Zap falling letters before they land.</p>
        </NuxtLink>
        <NuxtLink
          :to="`/typing/game/letter-tic-tac-toe?stage=${selectedStage}`"
          class="group relative overflow-hidden rounded-2xl border-2 border-emerald-400/50 bg-gradient-to-br from-emerald-500/30 to-teal-500/20 p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
        >
          <div class="text-3xl">⊞</div>
          <h3 class="mt-2 font-extrabold text-emerald-50 drop-shadow-md">Letter Tic-Tac-Toe</h3>
          <p class="mt-1 text-sm text-emerald-100/90">Type a square to claim it.</p>
        </NuxtLink>
        <NuxtLink
          :to="`/typing/game/lake-leap?stage=${selectedStage}&mode=curriculum`"
          class="group relative overflow-hidden rounded-2xl border-2 border-sky-400/50 bg-gradient-to-br from-sky-500/30 to-cyan-500/20 p-5 shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
        >
          <div class="text-3xl">▲</div>
          <h3 class="mt-2 font-extrabold text-sky-50 drop-shadow-md">Lake Leap</h3>
          <p class="mt-1 text-sm text-sky-100/90">Type the word to jump.</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes stage-card-enter {
  0% {
    opacity: 0;
    transform: translateY(8px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.stage-card-enter {
  animation: stage-card-enter 320ms ease-out backwards;
}

@media (prefers-reduced-motion: reduce) {
  .stage-card-enter {
    animation: none;
  }
}
</style>
