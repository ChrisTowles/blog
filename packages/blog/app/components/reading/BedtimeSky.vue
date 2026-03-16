<script setup lang="ts">
const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: `${2 + Math.random() * 4}s`,
  delay: `${Math.random() * 5}s`,
  large: i < 8,
}));
</script>

<template>
  <div class="bedtime-sky" aria-hidden="true">
    <div class="bedtime-moon" />
    <div
      v-for="star in stars"
      :key="star.id"
      class="bedtime-star"
      :class="{ 'bedtime-star--large': star.large }"
      :style="{
        top: star.top,
        left: star.left,
        '--twinkle-duration': star.duration,
        '--twinkle-delay': star.delay,
      }"
    />
  </div>
</template>
