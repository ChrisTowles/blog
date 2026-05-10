<script setup lang="ts">
import type { Finger } from '~~/shared/typing-types';
import type { KeyboardHint } from '../../composables/useVirtualKeyboard';

const props = defineProps<{
  hint: KeyboardHint | null;
  /** Briefly true after a wrong keystroke. Pulses the spotlight red. */
  wrongFlash?: boolean;
  /**
   * Increments on every correct keystroke. Bound via `:key` to the
   * animated nodes so the pop and +1 keyframes re-run even when the
   * next letter is the same as the previous one (e.g. "ffff").
   */
  pressTick?: number;
  /** Consecutive correct keystroke count; badge appears at 3+. */
  streak?: number;
  /** Increments at every milestone (3, 6, 9, ...). Drives the burst remount. */
  tierUp?: number;
}>();

type StreakStyle = {
  emoji: string;
  caption: string;
  badge: string;
  text: string;
};

const STREAK_TIERS: ReadonlyArray<StreakStyle> = [
  { emoji: '🔥', caption: 'in a row', badge: 'bg-amber-400 dark:bg-amber-500', text: 'text-xs' },
  {
    emoji: '🔥🔥',
    caption: 'streak!',
    badge: 'bg-amber-500 dark:bg-amber-400',
    text: 'text-sm',
  },
  {
    emoji: '🔥🔥🔥',
    caption: 'on fire!',
    badge:
      'bg-gradient-to-r from-orange-500 to-rose-500 dark:from-orange-400 dark:to-rose-400 text-white',
    text: 'text-base',
  },
  {
    emoji: '⚡⚡⚡',
    caption: 'unstoppable!',
    badge:
      'bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 dark:from-amber-300 dark:via-rose-400 dark:to-fuchsia-400 text-white',
    text: 'text-lg',
  },
  {
    emoji: '🚀',
    caption: 'legendary!',
    badge:
      'bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 dark:from-fuchsia-400 dark:via-violet-400 dark:to-sky-400 text-white',
    text: 'text-xl',
  },
];

const streakStyle = computed<StreakStyle | null>(() => {
  const s = props.streak ?? 0;
  if (s < 3) return null;
  const idx = Math.min(STREAK_TIERS.length - 1, Math.floor(s / 3) - 1);
  return STREAK_TIERS[idx] ?? null;
});

// Same finger palette as VirtualKeyboard / HandHint so the kid can
// connect the spotlight, the keyboard key, and the hand at a glance.
const FINGER_BG: Record<Finger, string> = {
  lp: 'bg-rose-300 dark:bg-rose-700',
  lr: 'bg-amber-300 dark:bg-amber-700',
  lm: 'bg-emerald-300 dark:bg-emerald-700',
  li: 'bg-sky-300 dark:bg-sky-700',
  thumb: 'bg-slate-300 dark:bg-slate-600',
  ri: 'bg-sky-300 dark:bg-sky-700',
  rm: 'bg-emerald-300 dark:bg-emerald-700',
  rr: 'bg-amber-300 dark:bg-amber-700',
  rp: 'bg-rose-300 dark:bg-rose-700',
};

const FINGER_LABEL: Record<Finger, string> = {
  lp: 'pinky',
  lr: 'ring finger',
  lm: 'middle finger',
  li: 'index finger',
  thumb: 'thumb',
  ri: 'index finger',
  rm: 'middle finger',
  rr: 'ring finger',
  rp: 'pinky',
};
</script>

<template>
  <div
    v-if="hint"
    :class="[
      'relative flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-colors',
      wrongFlash
        ? 'animate-pulse border-rose-500 bg-rose-100 dark:border-rose-400 dark:bg-rose-950/60'
        : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60',
    ]"
  >
    <div
      v-if="!wrongFlash && streakStyle"
      :key="`streak-${streak}`"
      :class="[
        'streak-badge absolute right-3 top-3 flex items-center gap-2 rounded-full px-3 py-1 font-bold text-amber-950 shadow-md',
        streakStyle.badge,
        streakStyle.text,
      ]"
    >
      <span aria-hidden="true">{{ streakStyle.emoji }}</span>
      <span>{{ streak }} {{ streakStyle.caption }}</span>
    </div>

    <TypingStreakBurst v-if="(tierUp ?? 0) > 0" :key="`burst-${tierUp}`" />

    <div class="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
      <template v-if="hint.nextKey === ' '">
        {{ wrongFlash ? 'Try again — press the space bar' : 'Press the space bar' }}
      </template>
      <template v-else>
        {{ wrongFlash ? 'Try again — type this letter' : 'Type this letter' }}
      </template>
    </div>
    <div class="relative">
      <div
        :key="pressTick ?? 0"
        :class="[
          'letter-tile flex h-32 w-32 items-center justify-center rounded-2xl font-mono text-7xl font-extrabold uppercase shadow-md',
          FINGER_BG[hint.finger],
          wrongFlash
            ? 'scale-105 ring-4 ring-rose-500'
            : 'ring-4 ring-amber-400 dark:ring-amber-500',
        ]"
      >
        {{ hint.nextKey === ' ' ? '␣' : hint.nextKey }}
      </div>
      <div
        v-if="!wrongFlash && (pressTick ?? 0) > 0"
        :key="`plus-${pressTick}`"
        class="plus-one pointer-events-none absolute -right-3 top-2 select-none font-mono text-2xl font-extrabold text-emerald-500 dark:text-emerald-400"
        aria-hidden="true"
      >
        +1
      </div>
    </div>
    <div class="text-base font-semibold text-slate-800 dark:text-slate-200">
      <template v-if="hint.nextKey === ' '">␣ = space</template>
      <template v-else>
        {{ hint.hand === 'left' ? 'Left' : 'Right' }} {{ FINGER_LABEL[hint.finger] }}
      </template>
    </div>
    <div v-if="hint.shiftRequired" class="text-sm text-amber-700 dark:text-amber-300">
      Hold <span class="font-mono font-semibold">Shift</span> + the key
    </div>
  </div>
</template>

<style scoped>
@keyframes letter-pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.18);
  }
  100% {
    transform: scale(1);
  }
}
.letter-tile {
  /* Keyed remount on pressTick re-runs this animation each press. */
  animation: letter-pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes plus-one-float {
  0% {
    opacity: 0;
    transform: translateY(0);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-2.25rem);
  }
}
.plus-one {
  animation: plus-one-float 700ms ease-out forwards;
}

@keyframes streak-pop {
  0% {
    transform: scale(0.7);
  }
  60% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}
.streak-badge {
  animation: streak-pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (prefers-reduced-motion: reduce) {
  .letter-tile,
  .plus-one,
  .streak-badge {
    animation: none;
  }
}
</style>
