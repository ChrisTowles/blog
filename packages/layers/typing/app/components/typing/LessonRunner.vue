<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { LessonCompleteResult } from '~~/shared/typing-types';

const props = defineProps<{
  text: string;
  title?: string;
  targetWpm?: number;
  targetAccuracy?: number;
  /**
   * Accept either case when comparing keystrokes. Stages 1-15 enable
   * this — capitals aren't introduced until stage 16 and kids fumble
   * shift / leave caps lock on. Stage 16+ pass false (the default) so
   * capital practice actually requires capitals.
   */
  caseInsensitive?: boolean;
}>();

const emit = defineEmits<{
  (e: 'complete', result: LessonCompleteResult): void;
}>();

const audio = useTypingAudio();

const engine = useTypingEngine({
  text: props.text,
  caseInsensitive: props.caseInsensitive,
  onComplete: (result) => {
    if (!result.cancelled) {
      audio.playFanfare();
      audio.playEncouragement();
    }
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

// Stop any scheduled tones (fanfare, streak chimes) when the runner
// unmounts — e.g. parent key-bumped on "Try again". Without this, the
// next lesson plays its first sound layered over leftover fanfare.
onScopeDispose(() => {
  audio.stopAll();
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

// Lesson text grouped into word/space tokens so the tile row wraps at word
// boundaries (never mid-word) and spaces render as a wide spacebar-shaped
// tile — the old '␣' glyph read as a lowercase "u" and kids typed the next
// letter while the engine waited for a space.
type LessonToken =
  | { type: 'word'; chars: Array<{ ch: string; idx: number }> }
  | { type: 'space'; idx: number };

const lessonTokens = computed<LessonToken[]>(() => {
  const tokens: LessonToken[] = [];
  let current: Array<{ ch: string; idx: number }> = [];
  Array.from(props.text).forEach((ch, idx) => {
    if (ch === ' ') {
      if (current.length > 0) tokens.push({ type: 'word', chars: current });
      current = [];
      tokens.push({ type: 'space', idx });
    } else {
      current.push({ ch, idx });
    }
  });
  if (current.length > 0) tokens.push({ type: 'word', chars: current });
  return tokens;
});

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
    class="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    @click="focusInput"
  >
    <!-- Streak banner — absolutely positioned in the empty background
         space ABOVE the card so growing/shrinking with tier doesn't
         push the lesson layout up and down. -->
    <div
      class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 -translate-x-1/2 whitespace-nowrap"
    >
      <TypingStreakBadge :streak="streak" :tier-up="tierUp" />
    </div>

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

            <!-- Spacebar-tile legend, only when a lesson contains spaces. -->
            <div
              v-if="hasSpace"
              class="flex items-center justify-end gap-2 text-sm text-slate-600 dark:text-slate-300"
            >
              <span
                class="flex h-7 w-12 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-700"
              >
                <span class="h-1 w-7 rounded-full bg-slate-500 dark:bg-slate-300"></span>
              </span>
              <span>means <strong>space bar</strong></span>
            </div>

            <!-- Lesson rendered as chunky tiles, grouped so words never
                 break across lines and spaces look like a mini spacebar. -->
            <div
              :data-testid="TEST_IDS.TYPING.LESSON_TEXT"
              class="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/50"
            >
              <template v-for="(token, tIdx) in lessonTokens" :key="tIdx">
                <span v-if="token.type === 'word'" class="flex gap-1.5">
                  <span
                    v-for="{ ch, idx } in token.chars"
                    :key="idx"
                    :data-char="ch"
                    :class="[
                      'flex h-10 min-w-[2.25rem] select-none items-center justify-center rounded-md font-mono text-xl font-bold transition-colors',
                      tileClass(idx),
                    ]"
                  >
                    {{ ch }}
                  </span>
                </span>
                <span
                  v-else
                  data-char=" "
                  :class="[
                    'flex h-10 w-12 select-none items-center justify-center rounded-md transition-colors',
                    tileClass(token.idx),
                  ]"
                >
                  <span class="h-1.5 w-7 rounded-full bg-current opacity-60"></span>
                </span>
              </template>
            </div>
          </div>

          <!-- Vertical rocket launchpad. Track grows from bottom up; rocket
               sits at progressPct of the way up. At 100% it animates off
               screen leaving a fading trail. -->
          <TypingRocketProgress :progress="progressPct" :mood="rocketMood" />
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

@media (prefers-reduced-motion: reduce) {
  .tile-current {
    animation: none;
  }
}
</style>
