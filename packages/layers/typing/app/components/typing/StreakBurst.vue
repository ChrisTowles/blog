<script setup lang="ts">
/**
 * StreakBurst — a one-shot confetti ring that radiates outward + fades.
 * Re-runs by being remounted via `:key="tierUp"`, so each milestone
 * (3, 6, 9, ... in a row) gets its own burst.
 */

const props = withDefaults(
  defineProps<{
    /** How many particles to fire. */
    count?: number;
  }>(),
  { count: 16 },
);

const COLORS = ['#fb7185', '#f59e0b', '#10b981', '#0ea5e9', '#8b5cf6', '#ec4899', '#facc15'];

// Pre-compute particle directions, distances, and colors once at mount.
// Slight randomness keeps the burst from looking gridded.
const particles = computed(() =>
  Array.from({ length: props.count }, (_, i) => {
    const angle = (i / props.count) * 360 + (Math.random() * 18 - 9);
    const distance = 70 + Math.round(Math.random() * 28);
    const color = COLORS[i % COLORS.length] ?? '#fff';
    return { angle, distance, color, delay: Math.round(Math.random() * 60) };
  }),
);
</script>

<template>
  <div
    class="streak-burst pointer-events-none absolute inset-0 overflow-visible"
    aria-hidden="true"
  >
    <span
      v-for="(p, i) in particles"
      :key="i"
      class="particle"
      :style="{
        '--angle': `${p.angle}deg`,
        '--distance': `${p.distance}px`,
        '--delay': `${p.delay}ms`,
        backgroundColor: p.color,
      }"
    />
  </div>
</template>

<style scoped>
.streak-burst {
  /* Centered emitter; particles fly outward from this point. */
  display: grid;
  place-items: center;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  opacity: 0;
  transform: translate(0, 0) scale(0.4);
  animation: streak-particle 720ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes streak-particle {
  0% {
    opacity: 0;
    transform: rotate(var(--angle)) translateX(0) scale(0.4);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angle)) translateX(var(--distance)) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .particle {
    animation: none;
    opacity: 0;
  }
}
</style>
