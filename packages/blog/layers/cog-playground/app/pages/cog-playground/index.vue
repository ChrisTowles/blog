<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'cog-playground',
});

// Educational-demo umbrella — keep it out of search indexes.
useHead({
  title: 'Cog Playground — Educational AI Cognitive Screens',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    {
      name: 'description',
      content:
        'Three AI-administered cognitive screens (Mini-Cog, a custom composed check, and a Mini-ACE-inspired check). Educational demos, not medical diagnoses.',
    },
  ],
});

type ScreenCard = {
  to: string;
  testId: string;
  title: string;
  duration: string;
  scoreOutOf: string;
  description: string;
  attribution: string;
};

const screens: ScreenCard[] = [
  {
    to: '/cog-playground/composed',
    testId: TEST_IDS.COG_PLAYGROUND.LANDING_LINK_COMPOSED,
    title: 'Composed (custom)',
    duration: '~5 min',
    scoreOutOf: '0–17',
    description:
      'Five public-domain tasks I assembled myself — orientation, 5-word recall, animal fluency, clock drawing, digit span. AI-native scoring against transparent rules. No instrument-name claims.',
    attribution: 'Original composition of public-domain task paradigms.',
  },
  {
    to: '/cog-playground/mini-ace',
    testId: TEST_IDS.COG_PLAYGROUND.LANDING_LINK_MINI_ACE,
    title: 'Mini-ACE-inspired',
    duration: '~5 min',
    scoreOutOf: '0–24',
    description:
      'Inspired by the Mini-ACE / ACE-III (Hodges): 3-word registration, time orientation, animal fluency, clock drawing, and a 7-element address recall. My own words and addresses, not the canonical items.',
    attribution: 'Based on the ACE-III / Mini-ACE by John R. Hodges et al.',
  },
  {
    to: '/cog-playground/mini-cog',
    testId: TEST_IDS.COG_PLAYGROUND.LANDING_LINK_MINI_COG,
    title: 'Mini-Cog',
    duration: '~3 min',
    scoreOutOf: '0–5',
    description:
      'Reimplementation of the Mini-Cog screen (Borson & Scanlan): three-word recall and clock drawing. The shortest of the three. Was the first thing I built — kept here for reference.',
    attribution: 'Mini-Cog© 2000, 2004 Soo Borson & James Scanlan.',
  },
];
</script>

<template>
  <div :data-testid="TEST_IDS.COG_PLAYGROUND.LANDING_PAGE" class="space-y-6">
    <div
      role="note"
      class="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
    >
      <UIcon name="i-lucide-triangle-alert" class="mt-0.5 size-5 shrink-0" />
      <p class="leading-snug">
        <strong>Educational demos — not medical diagnoses.</strong>
        These are interactive demos of cognitive screening tasks, administered and scored by Claude.
        They will not tell you whether anything is wrong. If you have memory concerns, talk to a
        doctor.
      </p>
    </div>

    <UCard>
      <template #header>
        <h1 class="text-2xl font-bold text-(--ui-text-highlighted)">Cog Playground</h1>
        <p class="mt-1 text-sm text-(--ui-text-muted)">
          Three short AI-administered cognitive screens, side by side. Pick one.
        </p>
      </template>

      <div class="space-y-4">
        <NuxtLink
          v-for="s in screens"
          :key="s.to"
          :data-testid="s.testId"
          :to="s.to"
          class="group block rounded-xl border border-(--ui-border) p-4 transition-colors hover:border-(--ui-primary) hover:bg-(--ui-bg-elevated)"
        >
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h2
              class="text-lg font-semibold text-(--ui-text-highlighted) group-hover:text-(--ui-primary)"
            >
              {{ s.title }}
            </h2>
            <span class="text-xs text-(--ui-text-muted)">
              {{ s.duration }} · scores {{ s.scoreOutOf }}
            </span>
          </div>
          <p class="mt-2 text-sm text-(--ui-text-toned)">{{ s.description }}</p>
          <p class="mt-2 text-xs text-(--ui-text-muted)">
            <UIcon name="i-lucide-book-open" class="-mt-0.5 inline-block size-3.5" />
            {{ s.attribution }}
          </p>
        </NuxtLink>
      </div>

      <template #footer>
        <p class="text-xs text-(--ui-text-muted)">
          Nothing you say, type, or draw on any of these is stored. Audio, text, and clock images
          are sent to Claude only to score the current attempt, then discarded. No database, no
          analytics, no account needed.
        </p>
      </template>
    </UCard>
  </div>
</template>
