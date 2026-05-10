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
    audio.playFanfare();
    audio.playEncouragement();
    emit('complete', result);
  },
});

const { hint } = useVirtualKeyboard({ nextChar: engine.nextChar });

// Centralized typing feedback: per-key blip on correct, buzz + red
// flash on wrong, streak chimes on tier-up. See useTypingFeedback.
const { wrongFlash, pressTick, streak, tierUp } = useTypingFeedback(engine, audio, {
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
const lessonChars = computed(() => Array.from(props.text));
const hasSpace = computed(() => props.text.includes(' '));

// Rocket mood: bobs while streaking, dips on wrong, blasts off when done.
const rocketMood = computed<'idle' | 'happy' | 'oops' | 'launch'>(() => {
  if (engine.state.value === 'done') return 'launch';
  if (wrongFlash.value) return 'oops';
  if (streak.value >= 3) return 'happy';
  return 'idle';
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
      <div class="lg:col-span-3">
        <div class="flex gap-4">
          <div class="flex flex-1 flex-col gap-3">
            <!-- Stats chip strip -->
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

            <!-- Space-glyph legend, only when a lesson contains spaces. -->
            <div
              v-if="hasSpace"
              class="flex items-center justify-end gap-2 text-sm text-slate-600 dark:text-slate-300"
            >
              <span
                class="flex h-7 w-9 items-center justify-center rounded-md bg-slate-200 font-mono text-base font-bold dark:bg-slate-700"
                >␣</span
              >
              <span>means <strong>space bar</strong></span>
            </div>

            <!-- Lesson rendered as chunky tiles. -->
            <div
              :data-testid="TEST_IDS.TYPING.LESSON_TEXT"
              class="flex flex-wrap gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50"
            >
              <span
                v-for="(ch, idx) in lessonChars"
                :key="idx"
                :class="[
                  'flex h-10 min-w-[2.25rem] select-none items-center justify-center rounded-md font-mono text-xl font-bold transition-colors',
                  tileClass(idx),
                ]"
              >
                {{ ch === ' ' ? '␣' : ch }}
              </span>
            </div>
          </div>

          <!-- Vertical rocket launchpad. Track grows from bottom up; rocket
               sits at progressPct of the way up. At 100% it animates off
               screen leaving a fading trail. -->
          <div
            class="rocket-track relative w-14 flex-none overflow-hidden rounded-2xl bg-slate-200 shadow-inner dark:bg-slate-900/60"
            :aria-label="`Progress ${progressPct}%`"
            role="progressbar"
            :aria-valuenow="progressPct"
          >
            <div
              class="absolute inset-x-0 bottom-0 rounded-2xl bg-gradient-to-t from-sky-400 via-emerald-400 to-amber-400 transition-all duration-300 ease-out dark:from-sky-500 dark:via-emerald-500 dark:to-amber-500"
              :style="{ height: `${progressPct}%` }"
            />
            <span
              :class="[
                'rocket pointer-events-none absolute left-1/2 -translate-x-1/2 select-none text-3xl drop-shadow-md transition-all duration-300 ease-out',
                `rocket-${rocketMood}`,
              ]"
              :style="{ bottom: `calc(${progressPct}% - 0.5rem)` }"
              aria-hidden="true"
            >
              🚀
            </span>
            <span
              v-if="rocketMood === 'launch'"
              aria-hidden="true"
              class="rocket-trail pointer-events-none absolute left-1/2 -translate-x-1/2"
            />
            <span
              class="absolute inset-x-0 top-2 text-center text-xs font-bold text-slate-700 dark:text-slate-100"
            >
              {{ progressPct }}%
            </span>
          </div>
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

    <!-- Lesson cleared celebration: confetti shower over the whole card -->
    <div
      v-if="engine.state.value === 'done'"
      :data-testid="TEST_IDS.TYPING.LESSON_COMPLETE"
      class="relative mt-6 overflow-visible rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5 text-center text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-100"
    >
      <TypingStreakBurst :count="36" />
      <div class="text-2xl font-extrabold">🎉 Lesson cleared!</div>
      <div class="mt-1 text-sm opacity-80">{{ wpmRounded }} WPM · {{ accuracyPct }}% accuracy</div>
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

.rocket-track {
  /* Tall enough to feel like a launchpad without dominating the layout. */
  min-height: 16rem;
}

@keyframes rocket-bob {
  0%,
  100% {
    transform: translate(-50%, 0) rotate(-3deg);
  }
  50% {
    transform: translate(-50%, -4px) rotate(3deg);
  }
}
.rocket-happy {
  animation: rocket-bob 0.6s ease-in-out infinite;
}

@keyframes rocket-shake {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  25% {
    transform: translate(calc(-50% - 4px), 0);
  }
  75% {
    transform: translate(calc(-50% + 4px), 0);
  }
}
.rocket-oops {
  animation: rocket-shake 180ms ease-in-out 1;
}

@keyframes rocket-blastoff {
  0% {
    transform: translate(-50%, 0) scale(1);
    opacity: 1;
  }
  20% {
    transform: translate(-50%, -1rem) scale(1.1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -28rem) scale(1.4);
    opacity: 0;
  }
}
.rocket-launch {
  animation: rocket-blastoff 1.4s cubic-bezier(0.5, 0, 0.6, 1) forwards;
}

@keyframes trail-rise {
  0% {
    height: 0;
    opacity: 0.9;
    bottom: 0;
  }
  60% {
    height: 8rem;
    opacity: 0.6;
    bottom: 0;
  }
  100% {
    height: 12rem;
    opacity: 0;
    bottom: 0;
  }
}
.rocket-trail {
  width: 1.5rem;
  background: linear-gradient(to top, rgba(251, 191, 36, 0.7), rgba(251, 113, 133, 0));
  border-radius: 0.75rem;
  animation: trail-rise 1.4s ease-out forwards;
}

@media (prefers-reduced-motion: reduce) {
  .tile-current,
  .rocket-happy,
  .rocket-oops,
  .rocket-launch,
  .rocket-trail {
    animation: none;
  }
}
</style>
