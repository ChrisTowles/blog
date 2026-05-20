<script setup lang="ts">
/**
 * Root orchestrator for the composed screen. Owns the state machine and
 * fires the three AI scoring requests (recall, fluency, clock) in
 * parallel after the user submits the delayed recall. Orientation and
 * digit span are scored locally during their respective tasks.
 */
import type {
  ComposedClockScore,
  ComposedRecallScore,
  ComposedWordList,
  FluencyScore,
} from '~~/shared/cog-playground/composed-types';
import { TEST_IDS } from '~~/shared/test-ids';

const s = useComposedState();

onMounted(() => {
  if (s.phase.value === 'idle') s.startIntro();
});

async function begin() {
  s.setError(null);
  try {
    const { words } = await $fetch<{ words: ComposedWordList }>(
      '/api/cog-playground/composed/words',
    );
    s.beginAssessment(words);
  } catch {
    s.setError('Could not start the check. Please try again.');
  }
}

function onWordsPresented() {
  s.toOrientation();
}

async function onRecall(spokenText: string) {
  s.setScoring(true);
  s.setError(null);
  const targetWords = [...(s.words.value ?? [])];
  try {
    const [recallRes, fluencyRes, clockRes] = await Promise.all([
      $fetch<{ recall: ComposedRecallScore }>('/api/cog-playground/composed/score-recall', {
        method: 'POST',
        body: { targetWords, spokenText },
      }),
      $fetch<{ fluency: FluencyScore }>('/api/cog-playground/composed/score-fluency', {
        method: 'POST',
        body: { spokenText: s.fluencyText.value },
      }),
      $fetch<{ clock: ComposedClockScore }>('/api/cog-playground/composed/score-clock', {
        method: 'POST',
        body: { imageBase64: s.clockImage.value },
      }),
    ]);
    s.setRecallResult(recallRes.recall);
    s.setFluencyResult(fluencyRes.fluency);
    s.setClockResult(clockRes.clock);
    s.toResult();
  } catch {
    s.setError('Scoring failed. The AI service may be unavailable — please try again.');
    s.phase.value = 'recall';
  } finally {
    s.setScoring(false);
  }
}
</script>

<template>
  <div :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.PAGE" class="space-y-6">
    <ComposedDisclaimerBanner />

    <UAlert
      v-if="s.error.value"
      color="error"
      variant="soft"
      icon="i-lucide-circle-alert"
      :description="s.error.value"
      :close="{ onClick: () => s.setError(null) }"
    />

    <ComposedIntro v-if="s.phase.value === 'intro'" @begin="begin" />

    <ComposedWordPresent
      v-else-if="s.phase.value === 'presenting_words' && s.words.value"
      :words="s.words.value"
      @presented="onWordsPresented"
    />

    <ComposedOrientation
      v-else-if="s.phase.value === 'orientation'"
      @submit="(a) => s.submitOrientation(a)"
    />

    <ComposedFluency
      v-else-if="s.phase.value === 'fluency'"
      @submit="(t) => s.submitFluencyText(t)"
    />

    <ComposedClockCanvas
      v-else-if="s.phase.value === 'clock_drawing'"
      @submit="(d) => s.submitClock(d)"
    />

    <ComposedDigitSpan
      v-else-if="s.phase.value === 'digit_span'"
      @submit="(f, b) => s.submitDigitSpan(f, b)"
    />

    <ComposedRecall v-else-if="s.phase.value === 'recall'" @recall="onRecall" />

    <UCard v-else-if="s.phase.value === 'scoring'">
      <div class="flex flex-col items-center gap-3 py-10">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-(--ui-primary)" />
        <p class="text-sm text-(--ui-text-muted)">Claude is scoring your check…</p>
      </div>
    </UCard>

    <ComposedResult
      v-else-if="s.phase.value === 'result' && s.result.value"
      :result="s.result.value"
      :clock-image="s.clockImage.value"
      :suggests-follow-up="s.suggestsFollowUp.value"
      @restart="s.startIntro"
    />
  </div>
</template>
