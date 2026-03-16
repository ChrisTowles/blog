<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const props = defineProps<{
  front: string;
  back: string;
}>();

const emit = defineEmits<{
  rate: [rating: 1 | 3 | 4];
}>();

const revealed = ref(false);
const cardRef = ref<HTMLElement | null>(null);

function spawnConfetti() {
  const card = cardRef.value;
  if (!card) return;
  const colors = [
    'var(--reading-accent)',
    'var(--reading-highlight)',
    'var(--reading-secondary)',
    'var(--reading-success)',
    'var(--reading-primary)',
  ];
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'reading-confetti-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = '0';
    particle.style.backgroundColor = colors[i % colors.length]!;
    particle.style.animationDelay = `${Math.random() * 300}ms`;
    particle.style.animationDuration = `${600 + Math.random() * 600}ms`;
    card.appendChild(particle);
    setTimeout(() => particle.remove(), 1500);
  }
}

function handleRate(rating: 1 | 3 | 4) {
  if (rating === 4) spawnConfetti();
  emit('rate', rating);
}
</script>

<template>
  <div
    ref="cardRef"
    :data-testid="TEST_IDS.READING.CARD_REVIEW"
    class="max-w-md mx-auto text-center relative overflow-hidden rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-primary)]/20 p-8 md:p-10 shadow-xl shadow-[var(--reading-primary)]/10"
  >
    <!-- Decorative corner dots -->
    <div
      class="absolute top-4 left-4 w-3 h-3 rounded-full bg-[var(--reading-highlight)] opacity-40"
    />
    <div
      class="absolute top-4 right-4 w-3 h-3 rounded-full bg-[var(--reading-secondary)] opacity-40"
    />
    <div
      class="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[var(--reading-success)] opacity-40"
    />
    <div
      class="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[var(--reading-primary)] opacity-40"
    />

    <!-- Front (word) -->
    <div class="min-h-44 flex flex-col items-center justify-center gap-3">
      <div class="text-4xl">&#x1F4A1;</div>
      <p
        class="text-5xl md:text-6xl font-extrabold text-[var(--reading-text)] reading-pop"
        style="font-family: var(--reading-font-display)"
      >
        {{ front }}
      </p>
    </div>

    <!-- Revealed back + rating buttons -->
    <Transition name="reading-flip">
      <template v-if="revealed">
        <div>
          <div class="flex items-center gap-3 my-5">
            <div class="flex-1 h-0.5 rounded-full bg-[var(--reading-secondary)]/20" />
            <span class="text-lg text-[var(--reading-secondary)]/50">&#x2728;</span>
            <div class="flex-1 h-0.5 rounded-full bg-[var(--reading-secondary)]/20" />
          </div>

          <div class="min-h-24 flex items-center justify-center py-4">
            <p
              class="text-2xl md:text-3xl text-[var(--reading-text)]/80 font-semibold"
              style="font-family: var(--reading-font-display)"
            >
              {{ back }}
            </p>
          </div>

          <div class="flex justify-center gap-3 pt-6 reading-stagger">
            <button
              :data-testid="TEST_IDS.READING.CARD_RATE_AGAIN"
              class="reading-fab !w-auto !h-auto !px-6 !py-4 !rounded-2xl bg-[var(--reading-accent)] text-white font-bold text-lg flex flex-col items-center gap-1"
              style="font-family: var(--reading-font-display)"
              @click="handleRate(1)"
            >
              <span class="text-2xl">&#x1F504;</span>
              <span>Again</span>
            </button>
            <button
              :data-testid="TEST_IDS.READING.CARD_RATE_HARD"
              class="reading-fab !w-auto !h-auto !px-6 !py-4 !rounded-2xl bg-[var(--reading-highlight)] text-[var(--reading-text)] font-bold text-lg flex flex-col items-center gap-1"
              style="font-family: var(--reading-font-display)"
              @click="handleRate(3)"
            >
              <span class="text-2xl">&#x1F914;</span>
              <span>Hard</span>
            </button>
            <button
              :data-testid="TEST_IDS.READING.CARD_RATE_GOOD"
              class="reading-fab !w-auto !h-auto !px-6 !py-4 !rounded-2xl bg-[var(--reading-success)] text-white font-bold text-lg flex flex-col items-center gap-1"
              style="font-family: var(--reading-font-display)"
              @click="handleRate(4)"
            >
              <span class="text-2xl">&#x1F389;</span>
              <span>Got It!</span>
            </button>
          </div>
        </div>
      </template>
    </Transition>

    <!-- Reveal button -->
    <template v-if="!revealed">
      <div class="pt-6">
        <button
          :data-testid="TEST_IDS.READING.CARD_REVEAL"
          class="w-full reading-fab !w-full !h-auto !rounded-2xl !py-5 bg-[var(--reading-accent)] text-white font-bold text-xl"
          style="font-family: var(--reading-font-display)"
          @click="revealed = true"
        >
          &#x1F50D; Show Answer
        </button>
      </div>
    </template>
  </div>
</template>
