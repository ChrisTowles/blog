<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
definePageMeta({ layout: 'reading', middleware: 'auth' });

const { activeChildId } = useActiveChild();
</script>

<template>
  <div :data-testid="TEST_IDS.READING.DASHBOARD_PAGE" class="space-y-8">
    <div class="text-center space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        Reading Dashboard
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">
        Track progress and start reading sessions.
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div
        v-if="!activeChildId"
        :data-testid="TEST_IDS.READING.NO_CHILD_PROMPT"
        class="text-center py-16 reading-float-in"
      >
        <div class="text-5xl mb-4">👋</div>
        <p
          class="text-2xl text-[var(--reading-text)]/70 mb-6"
          style="font-family: var(--reading-font-display)"
        >
          No child profile selected.
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-8 !py-3 !text-lg !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
        >
          Set Up a Profile
        </UButton>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 reading-stagger">
        <div
          class="reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-sky-blue)]/30 p-8 shadow-md shadow-[var(--reading-sky-blue)]/10"
        >
          <div class="text-4xl mb-3">📚</div>
          <h3
            class="text-2xl font-bold text-[var(--reading-primary)] mb-3"
            style="font-family: var(--reading-font-display)"
          >
            Stories
          </h3>
          <p class="text-lg text-[var(--reading-text)]/70 mb-6">
            Read AI-generated stories matched to your level.
          </p>
          <UButton
            :to="`/reading/child/${activeChildId}`"
            class="!rounded-full !px-6 !font-bold !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white"
          >
            Browse Stories
          </UButton>
        </div>

        <div
          class="reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-orange)]/30 p-8 shadow-md shadow-[var(--reading-orange)]/10"
        >
          <div class="text-4xl mb-3">🃏</div>
          <h3
            class="text-2xl font-bold text-[var(--reading-accent)] mb-3"
            style="font-family: var(--reading-font-display)"
          >
            Practice Cards
          </h3>
          <p class="text-lg text-[var(--reading-text)]/70 mb-6">
            Review phonics and sight word flashcards.
          </p>
          <UButton
            to="/reading/practice"
            class="!rounded-full !px-6 !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
          >
            Start Practice
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
