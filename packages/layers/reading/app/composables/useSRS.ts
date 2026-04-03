import type { SrsReviewRequest, SrsCardResponse } from '../../shared/reading-types';

export function useSRS(childId: Ref<number | null>) {
  const dueCards = ref<SrsCardResponse[]>([]);
  const currentIndex = ref(0);
  const isLoading = ref(false);

  const currentCard = computed(() => dueCards.value[currentIndex.value] ?? null);
  const remaining = computed(() => Math.max(0, dueCards.value.length - currentIndex.value));

  async function fetchDueCards() {
    if (!childId.value) return;
    isLoading.value = true;
    try {
      const cards = await $fetch('/api/reading/srs/due', {
        params: { childId: childId.value },
      });
      dueCards.value = cards;
      currentIndex.value = 0;
    } finally {
      isLoading.value = false;
    }
  }

  async function submitReview(rating: 1 | 3 | 4) {
    if (!currentCard.value) return;

    await $fetch('/api/reading/srs/review', {
      method: 'POST',
      body: {
        cardId: currentCard.value.id,
        rating,
      } satisfies SrsReviewRequest,
    });

    currentIndex.value++;

    // If no more cards, refresh
    if (currentIndex.value >= dueCards.value.length) {
      await fetchDueCards();
    }
  }

  watch(
    childId,
    () => {
      if (childId.value) fetchDueCards();
    },
    { immediate: true },
  );

  return {
    dueCards: readonly(dueCards),
    currentCard,
    remaining,
    isLoading: readonly(isLoading),
    fetchDueCards,
    submitReview,
  };
}
