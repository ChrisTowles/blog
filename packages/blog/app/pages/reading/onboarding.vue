<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({ layout: 'reading', middleware: 'auth' });

const step = ref(1);
const name = ref('');
const birthYear = ref<number | undefined>();
const selectedInterests = ref(new Set<string>());
const termsAccepted = ref(false);
const submitting = ref(false);
const error = ref('');

const { setActiveChild } = useActiveChild();

const interests = [
  { id: 'dinosaurs', label: 'Dinosaurs', emoji: '🦕', icon: 'i-heroicons-fire' },
  { id: 'space', label: 'Space', emoji: '🚀', icon: 'i-heroicons-rocket-launch' },
  { id: 'animals', label: 'Animals', emoji: '🐾', icon: 'i-heroicons-heart' },
  { id: 'sports', label: 'Sports', emoji: '⚽', icon: 'i-heroicons-trophy' },
  { id: 'ocean', label: 'Ocean', emoji: '🐠', icon: 'i-heroicons-globe-americas' },
  { id: 'robots', label: 'Robots', emoji: '🤖', icon: 'i-heroicons-cpu-chip' },
  { id: 'fairy tales', label: 'Fairy Tales', emoji: '🧚', icon: 'i-heroicons-sparkles' },
  { id: 'cooking', label: 'Cooking', emoji: '🧁', icon: 'i-heroicons-cake' },
];

const step1Valid = computed(() => {
  return (
    name.value.trim().length > 0 &&
    birthYear.value !== undefined &&
    birthYear.value >= 2010 &&
    birthYear.value <= 2025
  );
});

const step3Valid = computed(() => termsAccepted.value);

function toggleInterest(id: string) {
  if (selectedInterests.value.has(id)) {
    selectedInterests.value.delete(id);
  } else {
    selectedInterests.value.add(id);
  }
}

async function submit() {
  submitting.value = true;
  error.value = '';
  try {
    const child = await $fetch('/api/reading/children', {
      method: 'POST',
      body: {
        name: name.value.trim(),
        birthYear: birthYear.value,
        interests: [...selectedInterests.value],
      },
    });
    setActiveChild(child.id);
    navigateTo('/reading/dashboard');
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to create profile. Please try again.';
  } finally {
    submitting.value = false;
  }
}

const stepLabels = ['About', 'Interests', 'Confirm'];
</script>

<template>
  <div :data-testid="TEST_IDS.READING.ONBOARDING_PAGE" class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-4">
      <div class="text-5xl md:text-6xl reading-bounce">
        {{ step === 1 ? '👋' : step === 2 ? '🎨' : '🎉' }}
      </div>
      <h1
        class="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[var(--reading-primary)] via-[var(--reading-accent)] to-[var(--reading-success)] bg-clip-text text-transparent"
        style="font-family: var(--reading-font-display)"
      >
        Set Up Reading Profile
      </h1>
      <p class="text-2xl text-[var(--reading-text)]/70">
        Create a profile for your child to get started.
      </p>
    </div>

    <div class="max-w-lg mx-auto">
      <!-- Progress indicator with labels -->
      <div class="flex items-center justify-center gap-4 mb-10">
        <div v-for="s in 3" :key="s" class="flex flex-col items-center gap-2">
          <div
            class="h-4 rounded-full transition-all duration-500 ease-out"
            :class="
              s <= step
                ? 'bg-gradient-to-r from-[var(--reading-accent)] to-[var(--reading-secondary)] w-16 shadow-md shadow-[var(--reading-accent)]/30'
                : 'bg-[var(--reading-secondary)]/30 w-10'
            "
          />
          <span
            class="text-sm font-bold transition-colors duration-300"
            :class="s <= step ? 'text-[var(--reading-accent)]' : 'text-[var(--reading-text)]/40'"
            style="font-family: var(--reading-font-display)"
          >
            {{ stepLabels[s - 1] }}
          </span>
        </div>
      </div>

      <!-- Step 1: Child Info -->
      <Transition name="reading-page" mode="out-in">
        <div
          v-if="step === 1"
          key="step1"
          class="rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-primary)]/40 p-8 md:p-10 shadow-lg shadow-[var(--reading-primary)]/10"
        >
          <h2
            class="text-3xl md:text-4xl font-bold text-[var(--reading-primary)] mb-8"
            style="font-family: var(--reading-font-display)"
          >
            👶 About Your Child
          </h2>
          <div class="space-y-8">
            <div>
              <label
                class="block text-xl font-semibold text-[var(--reading-text)] mb-3"
                style="font-family: var(--reading-font-display)"
              >
                Child's First Name
              </label>
              <UInput
                v-model="name"
                :data-testid="TEST_IDS.READING.ONBOARDING_NAME_INPUT"
                placeholder="Enter name"
                size="xl"
                :maxlength="100"
                class="!rounded-2xl !text-xl"
              />
            </div>
            <div>
              <label
                class="block text-xl font-semibold text-[var(--reading-text)] mb-3"
                style="font-family: var(--reading-font-display)"
              >
                Birth Year
              </label>
              <UInput
                v-model.number="birthYear"
                :data-testid="TEST_IDS.READING.ONBOARDING_BIRTH_YEAR_INPUT"
                type="number"
                placeholder="e.g. 2018"
                size="xl"
                :min="2010"
                :max="2025"
                class="!rounded-2xl !text-xl"
              />
            </div>
          </div>
          <div class="flex justify-end mt-10">
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_NEXT"
              size="xl"
              :disabled="!step1Valid"
              class="!rounded-full !px-10 !py-4 !text-xl !font-bold !bg-gradient-to-r !from-[var(--reading-accent)] !to-[var(--reading-accent)] hover:!brightness-110 !text-white !shadow-md hover:!shadow-lg !transition-all !duration-300 hover:!scale-105 !min-h-[52px]"
              @click="step = 2"
            >
              Next →
            </UButton>
          </div>
        </div>

        <!-- Step 2: Interests -->
        <div
          v-else-if="step === 2"
          key="step2"
          class="rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-accent)]/40 p-8 md:p-10 shadow-lg shadow-[var(--reading-accent)]/10"
        >
          <h2
            class="text-3xl md:text-4xl font-bold text-[var(--reading-accent)] mb-3"
            style="font-family: var(--reading-font-display)"
          >
            🎨 What Does {{ name }} Like?
          </h2>
          <p class="text-xl text-[var(--reading-text)]/60 mb-8">
            Pick as many as you want! Stories will be themed around these interests.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-5 reading-stagger">
            <button
              v-for="interest in interests"
              :key="interest.id"
              :data-testid="TEST_IDS.READING.ONBOARDING_INTEREST_CARD"
              class="reading-wobble-hover flex flex-col items-center justify-center gap-3 p-5 rounded-[1.5rem] border-3 transition-all duration-300 min-h-[110px] cursor-pointer group"
              :class="
                selectedInterests.has(interest.id)
                  ? 'border-[var(--reading-accent)] bg-[var(--reading-accent)]/15 scale-105 shadow-md shadow-[var(--reading-accent)]/20'
                  : 'border-[var(--reading-secondary)]/30 hover:border-[var(--reading-accent)]/50 hover:bg-[var(--reading-accent)]/5'
              "
              @click="toggleInterest(interest.id)"
            >
              <span class="text-4xl group-hover:scale-110 transition-transform duration-200">
                {{ interest.emoji }}
              </span>
              <span
                class="text-lg font-bold text-[var(--reading-text)]"
                style="font-family: var(--reading-font-display)"
              >
                {{ interest.label }}
              </span>
              <!-- Selected checkmark -->
              <span
                v-if="selectedInterests.has(interest.id)"
                class="text-sm font-bold text-[var(--reading-accent)] reading-pop"
              >
                ✓ picked!
              </span>
            </button>
          </div>
          <div class="flex justify-between mt-10">
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_BACK"
              size="xl"
              variant="outline"
              class="!rounded-full !px-10 !py-4 !text-xl !font-bold !border-3 !border-[var(--reading-primary)] !text-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/10 !transition-all !duration-300 !min-h-[52px]"
              @click="step = 1"
            >
              ← Back
            </UButton>
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_NEXT"
              size="xl"
              class="!rounded-full !px-10 !py-4 !text-xl !font-bold !bg-gradient-to-r !from-[var(--reading-accent)] !to-[var(--reading-accent)] hover:!brightness-110 !text-white !shadow-md hover:!shadow-lg !transition-all !duration-300 hover:!scale-105 !min-h-[52px]"
              @click="step = 3"
            >
              Next →
            </UButton>
          </div>
        </div>

        <!-- Step 3: Confirmation -->
        <div
          v-else
          key="step3"
          class="rounded-[2rem] bg-[var(--reading-card-bg)] border-3 border-[var(--reading-success)]/40 p-8 md:p-10 shadow-lg shadow-[var(--reading-success)]/10"
        >
          <h2
            class="text-3xl md:text-4xl font-bold text-[var(--reading-success)] mb-8"
            style="font-family: var(--reading-font-display)"
          >
            🎉 Confirm Profile
          </h2>
          <div class="space-y-6">
            <div
              class="rounded-[1.5rem] bg-gradient-to-br from-[var(--reading-bg)] to-[var(--reading-secondary)]/10 p-6 md:p-8 space-y-4 border border-[var(--reading-secondary)]/20"
            >
              <p class="text-xl" style="font-family: var(--reading-font-display)">
                <strong class="text-[var(--reading-primary)]">Name:</strong>
                <span class="ml-2">{{ name }}</span>
              </p>
              <p class="text-xl" style="font-family: var(--reading-font-display)">
                <strong class="text-[var(--reading-primary)]">Birth Year:</strong>
                <span class="ml-2">{{ birthYear }}</span>
              </p>
              <p class="text-xl" style="font-family: var(--reading-font-display)">
                <strong class="text-[var(--reading-primary)]">Interests:</strong>
                <span class="ml-2">
                  {{
                    selectedInterests.size > 0 ? [...selectedInterests].join(', ') : 'None selected'
                  }}
                </span>
              </p>
            </div>

            <hr class="border-[var(--reading-secondary)]/30" />

            <label
              class="flex items-start gap-4 cursor-pointer p-4 rounded-2xl hover:bg-[var(--reading-bg)] transition-colors duration-200 min-h-[52px]"
            >
              <input
                v-model="termsAccepted"
                :data-testid="TEST_IDS.READING.ONBOARDING_TERMS_CHECKBOX"
                type="checkbox"
                class="mt-1 h-6 w-6 rounded-lg accent-[var(--reading-accent)] cursor-pointer"
              />
              <span class="text-lg text-[var(--reading-text)]/80 leading-relaxed">
                I am this child's parent or guardian and I acknowledge that AI-generated stories
                will be created for my child. Content is reviewed for safety but parental
                supervision is recommended.
              </span>
            </label>

            <p
              v-if="error"
              class="text-red-500 text-lg font-semibold rounded-xl bg-[var(--reading-accent)]/10 border border-[var(--reading-accent)]/30 p-4"
            >
              {{ error }}
            </p>
          </div>
          <div class="flex justify-between mt-10">
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_BACK"
              size="xl"
              variant="outline"
              class="!rounded-full !px-10 !py-4 !text-xl !font-bold !border-3 !border-[var(--reading-primary)] !text-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/10 !transition-all !duration-300 !min-h-[52px]"
              @click="step = 2"
            >
              ← Back
            </UButton>
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_SUBMIT"
              size="xl"
              :disabled="!step3Valid || submitting"
              :loading="submitting"
              class="!rounded-full !px-10 !py-4 !text-xl !font-bold !bg-gradient-to-r !from-[var(--reading-success)] !to-[var(--reading-success)] hover:!brightness-110 !text-white !shadow-md hover:!shadow-lg !transition-all !duration-300 hover:!scale-105 !min-h-[52px]"
              @click="submit"
            >
              🚀 Create Profile
            </UButton>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
