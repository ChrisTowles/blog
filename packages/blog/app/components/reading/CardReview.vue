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
    'var(--reading-orange)',
    'var(--reading-yellow)',
    'var(--reading-pink)',
    'var(--reading-green)',
    'var(--reading-sky-blue)',
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
  <UCard
    ref="cardRef"
    :data-testid="TEST_IDS.READING.CARD_REVIEW"
    class="max-w-md mx-auto text-center relative overflow-hidden"
  >
    <div class="min-h-40 flex items-center justify-center">
      <p class="text-3xl font-bold reading-pop">{{ front }}</p>
    </div>

    <Transition name="reading-flip">
      <template v-if="revealed">
        <div>
          <UDivider />
          <div class="min-h-20 flex items-center justify-center py-4">
            <p class="text-xl">{{ back }}</p>
          </div>
          <div class="flex justify-center gap-4 pt-4 reading-stagger">
            <UButton
              :data-testid="TEST_IDS.READING.CARD_RATE_AGAIN"
              color="error"
              variant="soft"
              size="lg"
              @click="handleRate(1)"
            >
              Again
            </UButton>
            <UButton
              :data-testid="TEST_IDS.READING.CARD_RATE_HARD"
              color="warning"
              variant="soft"
              size="lg"
              @click="handleRate(3)"
            >
              Hard
            </UButton>
            <UButton
              :data-testid="TEST_IDS.READING.CARD_RATE_GOOD"
              color="success"
              variant="soft"
              size="lg"
              @click="handleRate(4)"
            >
              Got It!
            </UButton>
          </div>
        </div>
      </template>
    </Transition>

    <template v-if="!revealed">
      <div class="pt-4">
        <UButton
          :data-testid="TEST_IDS.READING.CARD_REVEAL"
          size="xl"
          block
          @click="revealed = true"
          >Show Answer</UButton
        >
      </div>
    </template>
  </UCard>
</template>
