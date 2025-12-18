<script setup lang="ts">
// Sound indicator - shows continuous (blue oval) or stop (red dot) sounds
// Continuous sounds can be held: "mmm", "sss", "fff"
// Stop sounds are quick: "b", "t", "p", "k"

interface Props {
  type: 'continuous' | 'stop'
  active?: boolean
  width?: number // width as percentage of container
}

withDefaults(defineProps<Props>(), {
  active: false,
  width: 100
})
</script>

<template>
  <div
    class="h-3 transition-all duration-150"
    :class="[
      type === 'continuous'
        ? 'bg-[#4a7bc9] rounded-full'
        : 'bg-[#e85d5d] rounded-full w-3 mx-auto',
      active ? 'opacity-100 scale-110' : 'opacity-80'
    ]"
    :style="type === 'continuous' ? { width: `${width}%` } : {}"
  />
</template>
