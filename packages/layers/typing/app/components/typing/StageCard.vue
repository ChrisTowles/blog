<script setup lang="ts">
/**
 * StageCard — one tile in the stage-select grid. Designed to read at a
 * glance: stage number huge, name small, key caps as a row of chips, and
 * a state ring (locked / current / completed).
 */

defineProps<{
  stage: number;
  name: string;
  keys: string[];
  targetWpm: number;
  status: 'completed' | 'current' | 'future';
  /** 0-100 — share of this stage's lessons the kid has at least attempted */
  progressPct: number;
  /** Row index 0-3 for the gradient family applied to this stage's tile. */
  family: 0 | 1 | 2 | 3;
  /** Visually selected (expanded panel below the grid is showing this stage). */
  selected: boolean;
}>();

const FAMILY_BG: Record<0 | 1 | 2 | 3, string> = {
  // Home row (1-5): sky / emerald — calm + foundational
  0: 'from-sky-500/30 via-emerald-500/20 to-sky-500/30',
  // Top row (6-10): amber / orange — warming up
  1: 'from-amber-500/30 via-orange-500/20 to-amber-500/30',
  // Bottom row (11-15): rose / fuchsia — getting bold
  2: 'from-rose-500/30 via-fuchsia-500/20 to-rose-500/30',
  // Capitals + numbers + symbols (16-20): violet / indigo — final boss tier
  3: 'from-violet-500/30 via-indigo-500/20 to-violet-500/30',
};

const FAMILY_RING: Record<0 | 1 | 2 | 3, string> = {
  0: 'ring-sky-300/60 dark:ring-sky-400/40',
  1: 'ring-amber-300/60 dark:ring-amber-400/40',
  2: 'ring-rose-300/60 dark:ring-rose-400/40',
  3: 'ring-violet-300/60 dark:ring-violet-400/40',
};
</script>

<template>
  <button
    type="button"
    :aria-pressed="selected"
    :class="[
      'stage-card group relative flex h-full w-full flex-col gap-2 rounded-2xl border-2 bg-gradient-to-br p-4 text-left shadow-lg transition-all duration-200',
      FAMILY_BG[family],
      status === 'future'
        ? 'border-slate-700/60 opacity-60 saturate-50 hover:opacity-80'
        : 'border-white/10 hover:scale-[1.02] hover:shadow-xl',
      status === 'current'
        ? `ring-4 ring-offset-2 ring-offset-slate-950 ${FAMILY_RING[family]} stage-card-current`
        : '',
      selected ? 'scale-[1.03] ring-4 ring-amber-300 dark:ring-amber-400' : '',
    ]"
  >
    <!-- Status pip in the corner -->
    <span
      v-if="status === 'completed'"
      aria-hidden="true"
      class="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400 text-sm font-extrabold text-emerald-950 shadow-md ring-2 ring-emerald-950 dark:ring-slate-900"
      >✓</span
    >
    <span
      v-else-if="status === 'current'"
      aria-hidden="true"
      class="absolute -right-2 -top-2 flex items-center gap-1 rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-950 shadow-md ring-2 ring-amber-950 dark:ring-slate-900"
      >You<span class="text-sm leading-none">⬇</span></span
    >
    <span
      v-else
      aria-hidden="true"
      class="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-700 text-base text-slate-300 shadow-md ring-2 ring-slate-950"
      >🔒</span
    >

    <!-- Stage number block -->
    <div class="flex items-baseline gap-2">
      <span
        class="font-mono text-3xl font-black tabular-nums leading-none text-white drop-shadow-md"
      >
        {{ stage.toString().padStart(2, '0') }}
      </span>
      <span class="text-xs font-bold uppercase tracking-widest text-white/70">Stage</span>
    </div>

    <!-- Name -->
    <div class="text-sm font-semibold leading-tight text-white">{{ name }}</div>

    <!-- Key caps (the new keys this stage introduces) -->
    <div class="mt-auto flex flex-wrap gap-1">
      <span
        v-for="k in keys.slice(0, 4)"
        :key="k"
        :class="[
          'inline-flex h-6 min-w-6 items-center justify-center rounded-md border border-white/30 bg-white/10 px-1.5 font-mono text-xs font-bold uppercase text-white backdrop-blur-sm',
        ]"
      >
        {{ k === ' ' ? '␣' : k }}
      </span>
      <span
        v-if="keys.length > 4"
        class="inline-flex h-6 items-center justify-center rounded-md border border-white/20 bg-white/5 px-1.5 font-mono text-xs font-bold text-white/70"
      >
        +{{ keys.length - 4 }}
      </span>
      <span
        v-if="keys.length === 0"
        class="inline-flex h-6 items-center justify-center rounded-md border border-white/20 bg-white/5 px-2 font-mono text-xs font-bold text-white/70"
      >
        Aa
      </span>
    </div>

    <!-- Bottom row: target WPM + progress -->
    <div class="flex items-center justify-between text-[11px] text-white/80">
      <span class="font-mono font-bold tabular-nums">{{ targetWpm }} wpm</span>
      <span v-if="progressPct > 0" class="font-mono font-bold tabular-nums">
        {{ progressPct }}%
      </span>
    </div>

    <!-- Progress sliver -->
    <div
      v-if="progressPct > 0 && status !== 'future'"
      class="absolute inset-x-3 bottom-2 h-1 overflow-hidden rounded-full bg-white/10"
    >
      <div
        class="h-full rounded-full bg-white/80 transition-all duration-300"
        :style="{ width: `${progressPct}%` }"
      />
    </div>
  </button>
</template>

<style scoped>
@keyframes stage-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.stage-card-current {
  animation: stage-bob 2.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .stage-card-current {
    animation: none;
  }
}
</style>
