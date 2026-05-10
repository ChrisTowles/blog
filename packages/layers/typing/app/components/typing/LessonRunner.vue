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

const engine = useTypingEngine({
  text: props.text,
  onComplete: (result) => emit('complete', result),
});

const { hint } = useVirtualKeyboard({ nextChar: engine.nextChar });

const inputEl = ref<HTMLInputElement | null>(null);

function focusInput() {
  inputEl.value?.focus();
}

onMounted(() => {
  focusInput();
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

const charClasses = computed(() => {
  return props.text.split('').map((_, idx) => {
    if (idx < engine.cursor.value) {
      return 'text-emerald-700 dark:text-emerald-400';
    }
    if (idx === engine.cursor.value) {
      return 'rounded bg-amber-200 px-0.5 text-slate-900 dark:bg-amber-300 dark:text-slate-900';
    }
    return 'text-slate-500 dark:text-slate-400';
  });
});

const wpmRounded = computed(() => Math.round(engine.wpm.value));
const accuracyPct = computed(() => Math.round(engine.accuracy.value * 100));
</script>

<template>
  <div
    :data-testid="TEST_IDS.TYPING.LESSON_RUNNER"
    class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    @click="focusInput"
  >
    <div v-if="title" class="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
      {{ title }}
    </div>

    <div
      v-if="targetWpm"
      class="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300"
    >
      <span>Target: {{ targetWpm }} WPM</span>
      <span v-if="targetAccuracy">Accuracy goal: {{ Math.round(targetAccuracy * 100) }}%</span>
    </div>

    <div
      :data-testid="TEST_IDS.TYPING.LESSON_TEXT"
      class="mb-6 select-none break-words font-mono text-2xl leading-relaxed md:text-3xl"
    >
      <span v-for="(ch, idx) in props.text.split('')" :key="idx" :class="charClasses[idx]">{{
        ch === ' ' ? '·' : ch
      }}</span>
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

    <div class="grid grid-cols-3 gap-4 text-center">
      <div :data-testid="TEST_IDS.TYPING.WPM_METER">
        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">WPM</div>
        <div class="font-mono text-2xl text-slate-900 dark:text-slate-100">
          {{ wpmRounded }}
        </div>
      </div>
      <div :data-testid="TEST_IDS.TYPING.ACCURACY_METER">
        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Accuracy
        </div>
        <div class="font-mono text-2xl text-slate-900 dark:text-slate-100">{{ accuracyPct }}%</div>
      </div>
      <div>
        <div class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Errors</div>
        <div class="font-mono text-2xl text-slate-900 dark:text-slate-100">
          {{ engine.errors.value }}
        </div>
      </div>
    </div>

    <div v-if="hint" class="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
      <span :data-testid="TEST_IDS.TYPING.NEXT_KEY_HIGHLIGHT">
        Next key:
        <span class="font-mono text-base font-semibold text-amber-700 dark:text-amber-300">
          {{ hint.nextKey === ' ' ? 'space' : hint.nextKey }}
        </span>
        ({{ hint.hand }} {{ hint.finger }})
      </span>
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
