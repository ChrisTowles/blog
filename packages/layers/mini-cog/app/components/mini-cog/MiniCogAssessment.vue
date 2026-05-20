<script setup lang="ts">
/**
 * Root orchestrator for the Mini-Cog demo. Owns the state machine and
 * the two scoring API calls. Recall + clock are scored in parallel once
 * the delayed recall is submitted.
 */
import { TEST_IDS } from '~~/shared/test-ids';
import type { ClockScore, RecallScore, WordTriplet } from '~~/shared/mini-cog-types';

const s = useMiniCogState();

onMounted(() => {
  if (s.phase.value === 'idle') s.startIntro();
});

async function begin() {
  s.setError(null);
  try {
    const { words } = await $fetch<{ words: WordTriplet }>('/api/mini-cog/words');
    s.beginAssessment(words);
  } catch {
    s.setError('Could not start the screen. Please try again.');
  }
}

function onPresented() {
  s.toRegistrationCheck();
}

function onRegistrationRetry() {
  const { proceed } = s.registrationAttempt();
  if (proceed) s.toClockDrawing();
  else s.phase.value = 'presenting_words';
}

function onRegistrationDone() {
  s.registrationAttempt();
  s.toClockDrawing();
}

function onClockSubmit(dataUrl: string) {
  s.submitClock(dataUrl);
}

async function onRecall(spokenText: string) {
  s.setScoring(true);
  s.setError(null);
  const targetWords = [...(s.words.value ?? [])];
  try {
    const [recallRes, clockRes] = await Promise.all([
      $fetch<{ recall: RecallScore }>('/api/mini-cog/score-recall', {
        method: 'POST',
        body: { targetWords, spokenText },
      }),
      $fetch<{ clock: ClockScore }>('/api/mini-cog/score-clock', {
        method: 'POST',
        body: { imageBase64: s.clockImage.value },
      }),
    ]);
    s.setRecall(recallRes.recall);
    s.setClock(clockRes.clock);
    s.toResult();
  } catch {
    s.setError('Scoring failed. The AI service may be unavailable — please try again.');
    s.phase.value = 'delayed_recall';
  } finally {
    s.setScoring(false);
  }
}
</script>

<template>
  <div :data-testid="TEST_IDS.MINI_COG.PAGE" class="space-y-6">
    <MiniCogDisclaimerBanner />

    <UAlert
      v-if="s.error.value"
      color="error"
      variant="soft"
      icon="i-lucide-circle-alert"
      :description="s.error.value"
      :close="{ onClick: () => s.setError(null) }"
    />

    <MiniCogIntro v-if="s.phase.value === 'intro'" @begin="begin" />

    <MiniCogWordPresent
      v-else-if="s.phase.value === 'presenting_words' && s.words.value"
      :key="s.registrationAttempts.value"
      :words="s.words.value"
      @presented="onPresented"
    />

    <MiniCogRegistrationCheck
      v-else-if="s.phase.value === 'registration_check' && s.words.value"
      :words="s.words.value"
      :attempts-left="s.MAX_REGISTRATION_ATTEMPTS - s.registrationAttempts.value"
      @retry="onRegistrationRetry"
      @done="onRegistrationDone"
    />

    <MiniCogClockCanvas v-else-if="s.phase.value === 'clock_drawing'" @submit="onClockSubmit" />

    <MiniCogDelayedRecall v-else-if="s.phase.value === 'delayed_recall'" @recall="onRecall" />

    <UCard v-else-if="s.phase.value === 'scoring'">
      <div class="flex flex-col items-center gap-3 py-10">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-(--ui-primary)" />
        <p class="text-sm text-(--ui-text-muted)">Claude is scoring your recall and clock…</p>
      </div>
    </UCard>

    <MiniCogResult
      v-else-if="s.phase.value === 'result' && s.result.value"
      :result="s.result.value"
      :clock-image="s.clockImage.value"
      :suggests-follow-up="s.suggestsFollowUp.value"
      @restart="s.startIntro"
    />
  </div>
</template>
