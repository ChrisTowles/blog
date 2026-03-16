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
</script>

<template>
  <UCard :data-testid="TEST_IDS.READING.CARD_REVIEW" class="max-w-md mx-auto text-center">
    <div class="min-h-40 flex items-center justify-center">
      <p class="text-3xl font-bold">{{ front }}</p>
    </div>

    <template v-if="revealed">
      <UDivider />
      <div class="min-h-20 flex items-center justify-center py-4">
        <p class="text-xl">{{ back }}</p>
      </div>
      <div class="flex justify-center gap-4 pt-4">
        <UButton
          :data-testid="TEST_IDS.READING.CARD_RATE_AGAIN"
          color="error"
          variant="soft"
          size="lg"
          @click="emit('rate', 1)"
        >
          Again
        </UButton>
        <UButton
          :data-testid="TEST_IDS.READING.CARD_RATE_HARD"
          color="warning"
          variant="soft"
          size="lg"
          @click="emit('rate', 3)"
        >
          Hard
        </UButton>
        <UButton
          :data-testid="TEST_IDS.READING.CARD_RATE_GOOD"
          color="success"
          variant="soft"
          size="lg"
          @click="emit('rate', 4)"
        >
          Got It!
        </UButton>
      </div>
    </template>

    <template v-else>
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
