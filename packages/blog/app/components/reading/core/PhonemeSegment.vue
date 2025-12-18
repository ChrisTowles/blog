<script setup lang="ts">
import type { PhonemeCategory } from '~/data/reading/phonemes'

interface Props {
  letters: string
  category: PhonemeCategory
  highlighted?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  highlighted: false,
  size: 'lg'
})

const colorClass = computed(() => {
  switch (props.category) {
    case 'slow':
      return 'phoneme-slow'
    case 'fast':
      return 'phoneme-fast'
    case 'sight':
      return 'phoneme-sight'
    default:
      return 'phoneme-slow'
  }
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'phoneme-sm'
    case 'md':
      return 'phoneme-md'
    case 'lg':
      return 'phoneme-lg'
    default:
      return 'phoneme-lg'
  }
})
</script>

<template>
  <span
    class="phoneme-segment"
    :class="[colorClass, sizeClass, { highlighted }]"
  >
    {{ letters }}
  </span>
</template>

<style scoped>
.phoneme-segment {
    display: inline-block;
    font-weight: 800;
    font-family: 'Segoe UI', 'Arial Rounded MT Bold', sans-serif;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
    position: relative;
    padding: 0.25rem;
}

/* Size variants */
.phoneme-sm {
    font-size: 2rem;
}

.phoneme-md {
    font-size: 3rem;
}

.phoneme-lg {
    font-size: 4rem;
}

/* Color coding based on phoneme category */
.phoneme-slow {
    color: #3b82f6; /* Blue for continuous sounds */
}

.phoneme-fast {
    color: #ef4444; /* Red for stop sounds */
}

.phoneme-sight {
    color: #f97316; /* Orange for sight words */
}

/* Highlighted state (when slider passes over) */
.phoneme-segment.highlighted {
    transform: scale(1.2);
    text-shadow: 0 0 20px currentColor;
    animation: pulse 0.3s ease-in-out;
}

.phoneme-slow.highlighted {
    color: #2563eb;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border-radius: 0.5rem;
}

.phoneme-fast.highlighted {
    color: #dc2626;
    background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
    border-radius: 0.5rem;
}

.phoneme-sight.highlighted {
    color: #ea580c;
    background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
    border-radius: 0.5rem;
}

@keyframes pulse {
    0%, 100% {
        transform: scale(1.2);
    }
    50% {
        transform: scale(1.3);
    }
}

/* Tablet optimization */
@media (min-width: 768px) and (max-width: 1024px) {
    .phoneme-sm {
        font-size: 1.75rem;
    }

    .phoneme-md {
        font-size: 2.5rem;
    }

    .phoneme-lg {
        font-size: 3.5rem;
    }
}

/* Mobile */
@media (max-width: 767px) {
    .phoneme-sm {
        font-size: 1.5rem;
    }

    .phoneme-md {
        font-size: 2rem;
    }

    .phoneme-lg {
        font-size: 3rem;
    }
}
</style>
