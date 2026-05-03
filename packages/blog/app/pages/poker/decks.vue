<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { DECKS, cardCode } from '~~/shared/poker/decks';
import { RANKS, SUITS } from '~/utils/poker/types';

useSeoMeta({
  title: 'Poker decks',
  description: 'Pre-generated poker card decks — visual reference of every card in every theme.',
});

definePageMeta({
  layout: 'default',
});

interface CardSlot {
  code: string;
  url: string;
  label: string;
}

const decks = DECKS.map((deck) => {
  const back = { code: 'back', url: `/poker/decks/${deck.id}/back.svg`, label: 'Back' };
  const cards: CardSlot[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      const code = cardCode({ rank, suit });
      cards.push({
        code,
        url: `/poker/decks/${deck.id}/${code}.svg`,
        label: code,
      });
    }
  }
  return { ...deck, back, cards };
});
</script>

<template>
  <div class="decks-page" :data-testid="TEST_IDS.POKER.DECKS_PAGE">
    <UContainer class="py-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-(--ui-text-highlighted)">Card decks</h1>
        <p class="text-sm text-(--ui-text-muted) mt-1">
          Every card in every theme — pre-generated as SVG at build time (<code class="font-mono"
            >pnpm gen:cards</code
          >) and served from <code class="font-mono">/public/poker/decks/</code>.
          <NuxtLink to="/poker" class="text-(--ui-primary) underline"> Back to game </NuxtLink>
        </p>
      </div>

      <section
        v-for="deck in decks"
        :key="deck.id"
        class="mb-12"
        :data-testid="`${TEST_IDS.POKER.DECK_SECTION}-${deck.id}`"
      >
        <div class="flex items-baseline justify-between mb-3">
          <div class="flex items-center gap-2">
            <UIcon :name="deck.icon" class="size-5" />
            <h2 class="text-xl font-bold text-(--ui-text-highlighted)">
              {{ deck.name }}
            </h2>
            <span class="text-xs text-(--ui-text-muted)">— {{ deck.tagline }}</span>
          </div>
          <span class="text-xs font-mono text-(--ui-text-muted)">
            {{ deck.id }} · {{ deck.width }}×{{ deck.height }}
          </span>
        </div>

        <div class="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3 mb-3">
          <!-- Card back first -->
          <div class="flex flex-col items-center gap-1">
            <img
              :src="deck.back.url"
              :alt="`${deck.name} card back`"
              class="w-full rounded-md shadow"
            />
            <span class="text-[10px] font-mono text-(--ui-text-muted)">back</span>
          </div>
          <div v-for="card in deck.cards" :key="card.code" class="flex flex-col items-center gap-1">
            <img
              :src="card.url"
              :alt="`${deck.name} ${card.label}`"
              class="w-full rounded-md shadow"
              loading="lazy"
            />
            <span class="text-[10px] font-mono text-(--ui-text-muted)">{{ card.label }}</span>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>

<style scoped>
.decks-page {
  min-height: calc(100vh - 4rem);
}
</style>
