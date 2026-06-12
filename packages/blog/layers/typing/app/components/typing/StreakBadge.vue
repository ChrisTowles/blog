<script setup lang="ts">
/**
 * StreakBadge — celebratory pill banner that escalates with the streak.
 *
 * Lives above the lesson grid so it can grow freely horizontally — earlier
 * versions sat in the spotlight's top-right corner and overflowed at high
 * tiers ("⚡⚡⚡ 14 unstoppable!" pushed off the left edge). Higher tiers
 * use bigger text, a denser emoji cluster, and a richer gradient so a
 * legendary streak genuinely looks different from a 3-in-a-row.
 *
 * pressTick parent re-renders are kept reactive; the burst keyframe
 * replays via :key="tierUp" so each milestone gets its own pop.
 */

const props = defineProps<{
  streak: number;
  tierUp?: number;
}>();

type Tier = {
  emoji: string;
  caption: string;
  badge: string;
  size: string;
  scale: string;
};

const TIERS: ReadonlyArray<Tier> = [
  {
    emoji: '🔥',
    caption: 'in a row',
    badge: 'bg-gradient-to-r from-amber-400 to-amber-300 text-amber-950',
    size: 'text-sm',
    scale: 'scale-100',
  },
  {
    emoji: '🔥🔥',
    caption: 'streak!',
    badge: 'bg-gradient-to-r from-orange-400 to-amber-400 text-amber-950',
    size: 'text-base',
    scale: 'scale-105',
  },
  {
    emoji: '🔥🔥🔥',
    caption: 'on fire!',
    badge: 'bg-gradient-to-r from-orange-500 via-rose-500 to-amber-400 text-white',
    size: 'text-lg',
    scale: 'scale-110',
  },
  {
    emoji: '⚡⚡⚡',
    caption: 'unstoppable!',
    badge:
      'bg-gradient-to-r from-amber-400 via-rose-500 to-fuchsia-500 text-white shadow-rose-500/50',
    size: 'text-xl',
    scale: 'scale-110',
  },
  {
    emoji: '🚀',
    caption: 'legendary!',
    badge:
      'bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 text-white shadow-violet-500/60',
    size: 'text-2xl',
    scale: 'scale-110',
  },
];

const tier = computed<Tier | null>(() => {
  const s = props.streak;
  if (s < 3) return null;
  const idx = Math.min(TIERS.length - 1, Math.floor(s / 3) - 1);
  return TIERS[idx] ?? null;
});
</script>

<template>
  <Transition name="streak-pop">
    <div v-if="tier" :key="`streak-${tierUp ?? 0}`" class="flex justify-center" aria-live="polite">
      <div
        :class="[
          'streak-pill inline-flex items-center gap-3 rounded-full px-6 py-2 font-extrabold shadow-lg ring-2 ring-white/30 transition-all duration-200',
          tier.badge,
          tier.size,
          tier.scale,
        ]"
      >
        <span aria-hidden="true" class="streak-glow tracking-widest">{{ tier.emoji }}</span>
        <span class="font-mono tabular-nums text-2xl drop-shadow-sm">{{ streak }}</span>
        <span class="uppercase tracking-wider">{{ tier.caption }}</span>
        <span aria-hidden="true" class="streak-glow tracking-widest">{{ tier.emoji }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.streak-pill {
  /* Slight playful tilt — arcade-banner energy without going Comic Sans. */
  transform-origin: center;
}

@keyframes streak-shine {
  0%,
  100% {
    filter: brightness(1) drop-shadow(0 0 0 transparent);
  }
  50% {
    filter: brightness(1.12) drop-shadow(0 0 6px currentColor);
  }
}
.streak-glow {
  animation: streak-shine 1.6s ease-in-out infinite;
}

.streak-pop-enter-active {
  animation: streak-enter 360ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.streak-pop-leave-active {
  animation: streak-enter 220ms cubic-bezier(0.34, 1.56, 0.64, 1) reverse;
}
@keyframes streak-enter {
  0% {
    opacity: 0;
    transform: translateY(-6px) scale(0.7);
  }
  60% {
    opacity: 1;
    transform: translateY(0) scale(1.08);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .streak-glow,
  .streak-pop-enter-active,
  .streak-pop-leave-active {
    animation: none;
  }
}
</style>
