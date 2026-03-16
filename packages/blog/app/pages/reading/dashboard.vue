<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const { activeChildId } = useActiveChild();

const { progress: phonicsProgress } = usePhonics(computed(() => activeChildId.value ?? null));

const { data: sessions } = useFetch('/api/reading/sessions', {
  query: { childId: activeChildId },
  default: () => [],
  watch: [activeChildId],
});

const { data: srsStats } = useFetch('/api/reading/srs/stats', {
  query: { childId: activeChildId },
  watch: [activeChildId],
});

const { data: achievements } = useFetch('/api/reading/achievements', {
  query: { childId: activeChildId },
  default: () => [],
  watch: [activeChildId],
});
</script>

<template>
  <div :data-testid="TEST_IDS.READING.DASHBOARD_PAGE" class="space-y-10">
    <!-- Hero header with gradient accent -->
    <div class="text-center space-y-4 reading-float-in">
      <div class="inline-block mb-2">
        <span class="text-5xl reading-bounce inline-block">📖</span>
      </div>
      <h1
        class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-[var(--reading-primary)] via-[var(--reading-accent)] to-[var(--reading-pink)] bg-clip-text text-transparent"
        style="font-family: var(--reading-font-display)"
      >
        Reading Dashboard
      </h1>
      <p
        class="text-xl md:text-2xl text-[var(--reading-text)]/60 max-w-md mx-auto"
        style="font-family: var(--reading-font-body)"
      >
        Track progress and start reading sessions!
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div
        v-if="!activeChildId"
        :data-testid="TEST_IDS.READING.NO_CHILD_PROMPT"
        class="text-center py-16 reading-float-in"
      >
        <div
          class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[var(--reading-yellow)]/30 to-[var(--reading-orange)]/20 mb-6"
        >
          <span class="text-5xl">👋</span>
        </div>
        <p
          class="text-2xl md:text-3xl text-[var(--reading-text)]/70 mb-8"
          style="font-family: var(--reading-font-display)"
        >
          No child profile selected.
        </p>
        <UButton
          to="/reading/onboarding"
          class="!rounded-full !px-10 !py-4 !text-xl !font-bold !bg-gradient-to-r !from-[var(--reading-accent)] !to-[var(--reading-orange)] hover:!shadow-lg hover:!shadow-[var(--reading-accent)]/30 !text-white !transition-all !duration-300 hover:!scale-105"
        >
          Set Up a Profile
        </UButton>
      </div>

      <div v-else class="space-y-10 reading-stagger">
        <!-- Quick actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Stories card -->
          <div
            class="group reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-sky-blue)]/30 p-8 shadow-lg shadow-[var(--reading-sky-blue)]/10 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--reading-sky-blue)]/20 hover:border-[var(--reading-sky-blue)]/50 hover:-translate-y-1"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--reading-sky-blue)]/15 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            >
              <span class="text-4xl">📚</span>
            </div>
            <h3
              class="text-2xl md:text-3xl font-bold text-[var(--reading-primary)] mb-3"
              style="font-family: var(--reading-font-display)"
            >
              Stories
            </h3>
            <p class="text-lg md:text-xl text-[var(--reading-text)]/60 mb-6 leading-relaxed">
              Read AI-generated stories matched to your level.
            </p>
            <UButton
              :to="`/reading/child/${activeChildId}`"
              class="!rounded-full !px-8 !py-3 !text-lg !font-bold !bg-gradient-to-r !from-[var(--reading-primary)] !to-[var(--reading-sky-blue)] hover:!shadow-md hover:!shadow-[var(--reading-primary)]/30 !text-white !transition-all !duration-300"
            >
              Browse Stories
            </UButton>
          </div>

          <!-- Practice cards card -->
          <div
            class="group reading-wobble-hover rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-orange)]/30 p-8 shadow-lg shadow-[var(--reading-orange)]/10 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--reading-orange)]/20 hover:border-[var(--reading-orange)]/50 hover:-translate-y-1"
          >
            <div
              class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--reading-orange)]/15 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            >
              <span class="text-4xl">🃏</span>
            </div>
            <h3
              class="text-2xl md:text-3xl font-bold text-[var(--reading-accent)] mb-3"
              style="font-family: var(--reading-font-display)"
            >
              Practice Cards
            </h3>
            <p class="text-lg md:text-xl text-[var(--reading-text)]/60 mb-6 leading-relaxed">
              Review phonics and sight word flashcards.
            </p>
            <UButton
              to="/reading/practice"
              class="!rounded-full !px-8 !py-3 !text-lg !font-bold !bg-gradient-to-r !from-[var(--reading-accent)] !to-[var(--reading-orange)] hover:!shadow-md hover:!shadow-[var(--reading-accent)]/30 !text-white !transition-all !duration-300"
            >
              Start Practice
            </UButton>
          </div>
        </div>

        <!-- Achievements -->
        <ReadingAchievementList :achievements="achievements ?? []" />

        <!-- Reading Streak Calendar -->
        <ReadingStreakCalendar :sessions="sessions ?? []" />

        <!-- Progress Charts -->
        <ReadingProgressChart
          :sessions="sessions ?? []"
          :phonics-progress="phonicsProgress"
          :srs-stats="srsStats ?? null"
        />
      </div>
    </div>
  </div>
</template>
