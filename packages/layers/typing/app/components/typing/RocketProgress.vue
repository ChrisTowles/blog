<script setup lang="ts">
/**
 * RocketProgress — vertical launchpad progress meter for the lesson runner.
 *
 * The track grows from the bottom up. A rocket emoji rides the top of the
 * fill at `progress`% and animates per `mood`:
 *  - idle  : sits still
 *  - happy : bobs gently (mid-streak)
 *  - oops  : shakes briefly (wrong key)
 *  - launch: blasts up off-screen leaving a fading trail (lesson done)
 */

defineProps<{
  progress: number; // 0-100
  mood: 'idle' | 'happy' | 'oops' | 'launch';
}>();
</script>

<template>
  <div
    class="rocket-track relative w-14 flex-none overflow-hidden rounded-2xl bg-slate-200 shadow-inner dark:bg-slate-900/60"
    :aria-label="`Progress ${progress}%`"
    role="progressbar"
    :aria-valuenow="progress"
  >
    <div
      class="absolute inset-x-0 bottom-0 rounded-2xl bg-gradient-to-t from-sky-400 via-emerald-400 to-amber-400 transition-all duration-300 ease-out dark:from-sky-500 dark:via-emerald-500 dark:to-amber-500"
      :style="{ height: `${progress}%` }"
    />
    <span
      :class="[
        'rocket pointer-events-none absolute left-1/2 -translate-x-1/2 select-none text-3xl drop-shadow-md transition-all duration-300 ease-out',
        `rocket-${mood}`,
      ]"
      :style="{ bottom: `calc(${progress}% - 0.5rem)` }"
      aria-hidden="true"
    >
      🚀
    </span>
    <span
      v-if="mood === 'launch'"
      aria-hidden="true"
      class="rocket-trail pointer-events-none absolute left-1/2 -translate-x-1/2"
    />
    <span
      class="absolute inset-x-0 top-2 text-center text-xs font-bold text-slate-700 dark:text-slate-100"
    >
      {{ progress }}%
    </span>
  </div>
</template>

<style scoped>
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
  .rocket-happy,
  .rocket-oops,
  .rocket-launch,
  .rocket-trail {
    animation: none;
  }
}
</style>
