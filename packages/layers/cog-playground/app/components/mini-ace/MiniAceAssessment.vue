<script setup lang="ts">
/**
 * Root orchestrator for the Mini-ACE-style screen. Owns the state
 * machine and fires the three AI scoring requests (fluency, clock,
 * address recall) in parallel after the user submits the delayed
 * address. Registration is scored synchronously at its own step.
 * Time orientation is scored locally.
 */
import type {
  AddressRecallScore,
  MiniAceAddress,
  MiniAceClockScore,
  MiniAceFluencyScore,
  MiniAceRegistrationScore,
  MiniAceWordTriplet,
} from '~~/shared/cog-playground/mini-ace-types';
import { TEST_IDS } from '~~/shared/test-ids';

const s = useMiniAceState();

onMounted(() => {
  if (s.phase.value === 'idle') s.startIntro();
});

async function begin() {
  s.setError(null);
  try {
    const [{ words }, { address }] = await Promise.all([
      $fetch<{ words: MiniAceWordTriplet }>('/api/cog-playground/mini-ace/words'),
      $fetch<{ address: MiniAceAddress }>('/api/cog-playground/mini-ace/address'),
    ]);
    s.beginAssessment(words, address);
  } catch {
    s.setError('Could not start the check. Please try again.');
  }
}

function onRegistrationPresented() {
  s.toRegistrationRepeat();
}

async function onRegistrationRepeatSubmit(spokenText: string) {
  s.setError(null);
  const targetWords = [...(s.words.value ?? [])];
  try {
    const { registration } = await $fetch<{ registration: MiniAceRegistrationScore }>(
      '/api/cog-playground/mini-ace/score-registration',
      { method: 'POST', body: { targetWords, spokenText } },
    );
    s.setRegistrationResult(registration);
  } catch {
    s.setError('Scoring failed. The AI service may be unavailable — please try again.');
  }
}

function onAddressPresented() {
  s.toFluency();
}

async function onAddressRecall(spokenText: string) {
  s.setScoring(true);
  s.setError(null);
  const target = s.address.value!;
  try {
    const [fluencyRes, clockRes, addressRes] = await Promise.all([
      $fetch<{ fluency: MiniAceFluencyScore }>('/api/cog-playground/mini-ace/score-fluency', {
        method: 'POST',
        body: { spokenText: s.fluencyText.value },
      }),
      $fetch<{ clock: MiniAceClockScore }>('/api/cog-playground/mini-ace/score-clock', {
        method: 'POST',
        body: { imageBase64: s.clockImage.value },
      }),
      $fetch<{ addressRecall: AddressRecallScore }>('/api/cog-playground/mini-ace/score-address', {
        method: 'POST',
        body: { target, spokenText },
      }),
    ]);
    s.setFluencyResult(fluencyRes.fluency);
    s.setClockResult(clockRes.clock);
    s.setAddressResult(addressRes.addressRecall);
    s.toResult();
  } catch {
    s.setError('Scoring failed. The AI service may be unavailable — please try again.');
    s.phase.value = 'address_recall';
  } finally {
    s.setScoring(false);
  }
}
</script>

<template>
  <div :data-testid="TEST_IDS.COG_PLAYGROUND.MINI_ACE.PAGE" class="space-y-6">
    <MiniAceDisclaimerBanner />

    <UAlert
      v-if="s.error.value"
      color="error"
      variant="soft"
      icon="i-lucide-circle-alert"
      :description="s.error.value"
      :close="{ onClick: () => s.setError(null) }"
    />

    <MiniAceIntro v-if="s.phase.value === 'intro'" @begin="begin" />

    <MiniAceRegistrationPresent
      v-else-if="s.phase.value === 'registration_present' && s.words.value"
      :words="s.words.value"
      @presented="onRegistrationPresented"
    />

    <MiniAceRegistrationRepeat
      v-else-if="s.phase.value === 'registration_repeat'"
      @submit="onRegistrationRepeatSubmit"
    />

    <MiniAceTimeOrientation
      v-else-if="s.phase.value === 'time_orientation'"
      @submit="(a) => s.submitTimeOrientation(a)"
    />

    <MiniAceAddressPresent
      v-else-if="s.phase.value === 'address_present' && s.address.value"
      :address="s.address.value"
      @presented="onAddressPresented"
    />

    <MiniAceFluency
      v-else-if="s.phase.value === 'fluency'"
      @submit="(t) => s.submitFluencyText(t)"
    />

    <MiniAceClockCanvas
      v-else-if="s.phase.value === 'clock_drawing'"
      @submit="(d) => s.submitClock(d)"
    />

    <MiniAceAddressRecall
      v-else-if="s.phase.value === 'address_recall'"
      @recall="onAddressRecall"
    />

    <UCard v-else-if="s.phase.value === 'scoring'">
      <div class="flex flex-col items-center gap-3 py-10">
        <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin text-(--ui-primary)" />
        <p class="text-sm text-(--ui-text-muted)">Claude is scoring your check…</p>
      </div>
    </UCard>

    <MiniAceResult
      v-else-if="s.phase.value === 'result' && s.result.value"
      :result="s.result.value"
      :clock-image="s.clockImage.value"
      :suggests-follow-up="s.suggestsFollowUp.value"
      @restart="s.startIntro"
    />
  </div>
</template>
