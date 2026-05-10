<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { LessonCompleteResult } from '~~/shared/typing-types';

const props = defineProps<{
  text: string;
  title?: string;
  targetWpm?: number;
  targetAccuracy?: number;
}>();

const emit = defineEmits<{
  (e: 'complete', result: LessonCompleteResult): void;
}>();

const audio = useTypingAudio();

const engine = useTypingEngine({
  text: props.text,
  onComplete: (result) => {
    audio.playEncouragement();
    emit('complete', result);
  },
});

const { hint } = useVirtualKeyboard({ nextChar: engine.nextChar });

// Centralized typing feedback: per-key audio on correct, buzz + red
// flash on wrong. See useTypingFeedback for the rules — every typing
// surface should reuse this composable.
const { wrongFlash, pressTick, streak, tierUp } = useTypingFeedback(engine, audio, {
  lessonText: props.text,
  onWrong: () => {
    // Speak the expected letter so a learner who can't read the cue
    // hears what they need to press.
    const expected = engine.nextChar.value;
    if (expected) void audio.play(expected.toLowerCase());
  },
});

const inputEl = ref<HTMLInputElement | null>(null);

function focusInput() {
  inputEl.value?.focus();
}

onMounted(() => {
  focusInput();
  void audio.preload();
});

function onKeydown(e: KeyboardEvent) {
  // Prevent the browser's default tab navigation while running.
  if (e.key === 'Tab') {
    e.preventDefault();
    return;
  }
  if (e.key === 'Backspace') {
    e.preventDefault();
    engine.feed({ key: 'Backspace', at: Date.now() });
    return;
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    engine.cancel();
    return;
  }
  if (e.key.length === 1) {
    e.preventDefault();
    engine.feed({ key: e.key, at: Date.now() });
  }
}

function tileClass(idx: number) {
  if (idx < engine.cursor.value) {
    return 'bg-emerald-300 text-emerald-950 dark:bg-emerald-500 dark:text-emerald-50';
  }
  if (idx === engine.cursor.value) {
    return wrongFlash.value
      ? 'bg-rose-400 text-white ring-4 ring-rose-500 animate-pulse'
      : 'bg-amber-300 text-amber-950 ring-4 ring-amber-400 dark:bg-amber-400 dark:text-amber-950 tile-current';
  }
  return 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400';
}

const wpmRounded = computed(() => Math.round(engine.wpm.value));
const accuracyPct = computed(() => Math.round(engine.accuracy.value * 100));
const progressPct = computed(() => {
  if (props.text.length === 0) return 0;
  return Math.min(100, Math.round((engine.cursor.value / props.text.length) * 100));
});
</script>

<template>
  <div
    :data-testid="TEST_IDS.TYPING.LESSON_RUNNER"
    class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    @click="focusInput"
  >
    <header class="mb-4 flex flex-wrap items-baseline justify-between gap-3">
      <h2 v-if="title" class="text-xl font-semibold text-slate-900 dark:text-slate-100">
        {{ title }}
      </h2>
      <div
        v-if="targetWpm"
        class="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300"
      >
        <span>Target: {{ targetWpm }} WPM</span>
        <span v-if="targetAccuracy">Accuracy goal: {{ Math.round(targetAccuracy * 100) }}%</span>
      </div>
    </header>

    <div class="grid gap-6 lg:grid-cols-5 lg:items-start">
      <!-- LEFT: what to press -->
      <div class="lg:col-span-2">
        <TypingNextLetterSpotlight
          v-if="hint && engine.state.value !== 'done'"
          :hint="hint"
          :wrong-flash="wrongFlash"
          :press-tick="pressTick"
          :streak="streak"
          :tier-up="tierUp"
        />
      </div>

      <!-- RIGHT: where you are + how you're doing -->
      <div class="space-y-4 lg:col-span-3">
        <!-- Stats chip strip — single horizontal line -->
        <div
          class="flex flex-wrap items-center gap-x-5 gap-y-1 rounded-full bg-slate-100 px-5 py-2 text-sm text-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
        >
          <span :data-testid="TEST_IDS.TYPING.WPM_METER" class="flex items-baseline gap-1">
            <strong class="font-mono text-base">{{ wpmRounded }}</strong>
            <span class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >WPM</span
            >
          </span>
          <span :data-testid="TEST_IDS.TYPING.ACCURACY_METER" class="flex items-baseline gap-1">
            <strong class="font-mono text-base">{{ accuracyPct }}%</strong>
            <span class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >accuracy</span
            >
          </span>
          <span class="flex items-baseline gap-1">
            <strong class="font-mono text-base">{{ engine.errors.value }}</strong>
            <span class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400"
              >errors</span
            >
          </span>
        </div>

        <!-- Lesson rendered as chunky tiles -->
        <div
          :data-testid="TEST_IDS.TYPING.LESSON_TEXT"
          class="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50"
        >
          <span
            v-for="(ch, idx) in props.text.split('')"
            :key="idx"
            :class="[
              'flex h-10 min-w-[2.25rem] select-none items-center justify-center rounded-md font-mono text-xl font-bold transition-colors',
              tileClass(idx),
            ]"
          >
            {{ ch === ' ' ? '·' : ch }}
          </span>
        </div>

        <!-- Progress race-track with mascot -->
        <div
          class="relative h-9 overflow-visible rounded-full bg-slate-200 shadow-inner dark:bg-slate-900/60"
          :aria-label="`Progress ${progressPct}%`"
          role="progressbar"
          :aria-valuenow="progressPct"
        >
          <div
            class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-400 transition-all duration-200 ease-out dark:from-sky-500 dark:via-emerald-500 dark:to-amber-500"
            :style="{ width: `${progressPct}%` }"
          />
          <span
            class="mascot pointer-events-none absolute -top-2 select-none text-3xl drop-shadow"
            :style="{ left: `calc(${progressPct}% - 1.1rem)` }"
            aria-hidden="true"
          >
            🚀
          </span>
          <span
            class="absolute right-3 top-1.5 text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200"
          >
            {{ progressPct }}%
          </span>
        </div>
      </div>
    </div>

    <input
      ref="inputEl"
      :data-testid="TEST_IDS.TYPING.LESSON_INPUT"
      class="sr-only"
      type="text"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      @keydown="onKeydown"
    />

    <div v-if="hint" class="mt-6">
      <span :data-testid="TEST_IDS.TYPING.NEXT_KEY_HIGHLIGHT" class="sr-only">
        Next key: {{ hint.nextKey === ' ' ? 'space' : hint.nextKey }} ({{ hint.hand }}
        {{ hint.finger }})
      </span>
      <TypingVirtualKeyboard :hint="hint" />
    </div>

    <div
      v-if="engine.state.value === 'done'"
      :data-testid="TEST_IDS.TYPING.LESSON_COMPLETE"
      class="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200"
    >
      Nice work! {{ wpmRounded }} WPM at {{ accuracyPct }}% accuracy.
    </div>
  </div>
</template>

<style scoped>
@keyframes tile-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}
.tile-current {
  animation: tile-bob 1s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .tile-current {
    animation: none;
  }
}
</style>
