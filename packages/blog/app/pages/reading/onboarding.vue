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
  { id: 'dinosaurs', label: 'Dinosaurs', icon: 'i-heroicons-fire' },
  { id: 'space', label: 'Space', icon: 'i-heroicons-rocket-launch' },
  { id: 'animals', label: 'Animals', icon: 'i-heroicons-heart' },
  { id: 'sports', label: 'Sports', icon: 'i-heroicons-trophy' },
  { id: 'ocean', label: 'Ocean', icon: 'i-heroicons-globe-americas' },
  { id: 'robots', label: 'Robots', icon: 'i-heroicons-cpu-chip' },
  { id: 'fairy tales', label: 'Fairy Tales', icon: 'i-heroicons-sparkles' },
  { id: 'cooking', label: 'Cooking', icon: 'i-heroicons-cake' },
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
</script>

<template>
  <div :data-testid="TEST_IDS.READING.ONBOARDING_PAGE" class="space-y-8">
    <div class="text-center space-y-3">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        Set Up Reading Profile
      </h1>
      <p class="text-xl text-[var(--reading-text)]/70">
        Create a profile for your child to get started.
      </p>
    </div>

    <div class="max-w-lg mx-auto">
      <!-- Progress indicator -->
      <div class="flex items-center justify-center gap-3 mb-8">
        <div
          v-for="s in 3"
          :key="s"
          class="h-3 rounded-full transition-all duration-300"
          :class="
            s <= step ? 'bg-[var(--reading-accent)] w-14' : 'bg-[var(--reading-pink)]/40 w-10'
          "
        />
      </div>

      <!-- Step 1: Child Info -->
      <Transition name="reading-page" mode="out-in">
        <div
          v-if="step === 1"
          key="step1"
          class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-sky-blue)]/30 p-8 shadow-md"
        >
          <h2
            class="text-3xl font-bold text-[var(--reading-primary)] mb-6"
            style="font-family: var(--reading-font-display)"
          >
            About Your Child
          </h2>
          <div class="space-y-6">
            <div>
              <label
                class="block text-lg font-semibold text-[var(--reading-text)] mb-2"
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
                class="!rounded-2xl"
              />
            </div>
            <div>
              <label
                class="block text-lg font-semibold text-[var(--reading-text)] mb-2"
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
                class="!rounded-2xl"
              />
            </div>
          </div>
          <div class="flex justify-end mt-8">
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_NEXT"
              size="xl"
              :disabled="!step1Valid"
              class="!rounded-full !px-8 !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
              @click="step = 2"
            >
              Next
            </UButton>
          </div>
        </div>

        <!-- Step 2: Interests -->
        <div
          v-else-if="step === 2"
          key="step2"
          class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-orange)]/30 p-8 shadow-md"
        >
          <h2
            class="text-3xl font-bold text-[var(--reading-accent)] mb-2"
            style="font-family: var(--reading-font-display)"
          >
            What Does {{ name }} Like?
          </h2>
          <p class="text-lg text-[var(--reading-text)]/60 mb-6">
            Pick as many as you want. Stories will be themed around these interests.
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 reading-stagger">
            <button
              v-for="interest in interests"
              :key="interest.id"
              :data-testid="TEST_IDS.READING.ONBOARDING_INTEREST_CARD"
              class="reading-wobble-hover flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 min-h-[90px] cursor-pointer"
              :class="
                selectedInterests.has(interest.id)
                  ? 'border-[var(--reading-accent)] bg-[var(--reading-accent)]/10 scale-105'
                  : 'border-[var(--reading-pink)]/30 hover:border-[var(--reading-accent)]/50'
              "
              @click="toggleInterest(interest.id)"
            >
              <UIcon :name="interest.icon" class="text-3xl" />
              <span
                class="text-lg font-semibold text-[var(--reading-text)]"
                style="font-family: var(--reading-font-display)"
              >
                {{ interest.label }}
              </span>
            </button>
          </div>
          <div class="flex justify-between mt-8">
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_BACK"
              size="xl"
              variant="outline"
              class="!rounded-full !px-8 !font-bold !border-[var(--reading-primary)] !text-[var(--reading-primary)]"
              @click="step = 1"
            >
              Back
            </UButton>
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_NEXT"
              size="xl"
              class="!rounded-full !px-8 !font-bold !bg-[var(--reading-accent)] hover:!bg-[var(--reading-accent)]/85 !text-white"
              @click="step = 3"
            >
              Next
            </UButton>
          </div>
        </div>

        <!-- Step 3: Confirmation -->
        <div
          v-else
          key="step3"
          class="rounded-3xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-green)]/30 p-8 shadow-md"
        >
          <h2
            class="text-3xl font-bold text-[var(--reading-success)] mb-6"
            style="font-family: var(--reading-font-display)"
          >
            Confirm Profile
          </h2>
          <div class="space-y-4">
            <div class="rounded-2xl bg-[var(--reading-bg)] p-5 space-y-2">
              <p class="text-lg"><strong>Name:</strong> {{ name }}</p>
              <p class="text-lg"><strong>Birth Year:</strong> {{ birthYear }}</p>
              <p class="text-lg">
                <strong>Interests:</strong>
                {{
                  selectedInterests.size > 0 ? [...selectedInterests].join(', ') : 'None selected'
                }}
              </p>
            </div>

            <hr class="border-[var(--reading-pink)]/30" />

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="termsAccepted"
                :data-testid="TEST_IDS.READING.ONBOARDING_TERMS_CHECKBOX"
                type="checkbox"
                class="mt-1 h-5 w-5 rounded accent-[var(--reading-accent)]"
              />
              <span class="text-base text-[var(--reading-text)]/80">
                I am this child's parent or guardian and I acknowledge that AI-generated stories
                will be created for my child. Content is reviewed for safety but parental
                supervision is recommended.
              </span>
            </label>

            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          </div>
          <div class="flex justify-between mt-8">
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_BACK"
              size="xl"
              variant="outline"
              class="!rounded-full !px-8 !font-bold !border-[var(--reading-primary)] !text-[var(--reading-primary)]"
              @click="step = 2"
            >
              Back
            </UButton>
            <UButton
              :data-testid="TEST_IDS.READING.ONBOARDING_SUBMIT"
              size="xl"
              :disabled="!step3Valid || submitting"
              :loading="submitting"
              class="!rounded-full !px-8 !font-bold !bg-[var(--reading-success)] hover:!bg-[var(--reading-success)]/85 !text-white"
              @click="submit"
            >
              Create Profile
            </UButton>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
