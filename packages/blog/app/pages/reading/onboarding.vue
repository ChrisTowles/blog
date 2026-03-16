<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({ middleware: 'auth' });

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
  <div :data-testid="TEST_IDS.READING.ONBOARDING_PAGE">
    <UPageHeader
      title="Set Up Reading Profile"
      description="Create a profile for your child to get started."
    />
    <UPageBody>
      <div class="max-w-lg mx-auto">
        <!-- Progress indicator -->
        <div class="flex items-center justify-center gap-2 mb-8">
          <div
            v-for="s in 3"
            :key="s"
            class="h-2 rounded-full transition-all duration-300"
            :class="s <= step ? 'bg-primary w-12' : 'bg-gray-300 dark:bg-gray-700 w-8'"
          />
        </div>

        <!-- Step 1: Child Info -->
        <UCard v-if="step === 1">
          <template #header>
            <h2 class="text-2xl font-bold">About Your Child</h2>
          </template>
          <div class="space-y-6">
            <div>
              <label class="block text-lg font-medium mb-2">Child's First Name</label>
              <UInput
                v-model="name"
                :data-testid="TEST_IDS.READING.ONBOARDING_NAME_INPUT"
                placeholder="Enter name"
                size="xl"
                :maxlength="100"
              />
            </div>
            <div>
              <label class="block text-lg font-medium mb-2">Birth Year</label>
              <UInput
                v-model.number="birthYear"
                :data-testid="TEST_IDS.READING.ONBOARDING_BIRTH_YEAR_INPUT"
                type="number"
                placeholder="e.g. 2018"
                size="xl"
                :min="2010"
                :max="2025"
              />
            </div>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <UButton
                :data-testid="TEST_IDS.READING.ONBOARDING_NEXT"
                size="xl"
                :disabled="!step1Valid"
                @click="step = 2"
              >
                Next
              </UButton>
            </div>
          </template>
        </UCard>

        <!-- Step 2: Interests -->
        <UCard v-if="step === 2">
          <template #header>
            <h2 class="text-2xl font-bold">What Does {{ name }} Like?</h2>
            <p class="text-gray-500 mt-1">
              Pick as many as you want. Stories will be themed around these interests.
            </p>
          </template>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              v-for="interest in interests"
              :key="interest.id"
              :data-testid="TEST_IDS.READING.ONBOARDING_INTEREST_CARD"
              class="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 min-h-[80px] cursor-pointer"
              :class="
                selectedInterests.has(interest.id)
                  ? 'border-primary bg-primary/10 scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
              "
              @click="toggleInterest(interest.id)"
            >
              <UIcon :name="interest.icon" class="text-3xl" />
              <span class="text-lg font-medium">{{ interest.label }}</span>
            </button>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <UButton
                :data-testid="TEST_IDS.READING.ONBOARDING_BACK"
                size="xl"
                variant="outline"
                @click="step = 1"
              >
                Back
              </UButton>
              <UButton :data-testid="TEST_IDS.READING.ONBOARDING_NEXT" size="xl" @click="step = 3">
                Next
              </UButton>
            </div>
          </template>
        </UCard>

        <!-- Step 3: Confirmation -->
        <UCard v-if="step === 3">
          <template #header>
            <h2 class="text-2xl font-bold">Confirm Profile</h2>
          </template>
          <div class="space-y-4">
            <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-2">
              <p class="text-lg"><strong>Name:</strong> {{ name }}</p>
              <p class="text-lg"><strong>Birth Year:</strong> {{ birthYear }}</p>
              <p class="text-lg">
                <strong>Interests:</strong>
                {{
                  selectedInterests.size > 0 ? [...selectedInterests].join(', ') : 'None selected'
                }}
              </p>
            </div>

            <UDivider />

            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="termsAccepted"
                :data-testid="TEST_IDS.READING.ONBOARDING_TERMS_CHECKBOX"
                type="checkbox"
                class="mt-1 h-5 w-5 rounded"
              />
              <span class="text-base">
                I am this child's parent or guardian and I acknowledge that AI-generated stories
                will be created for my child. Content is reviewed for safety but parental
                supervision is recommended.
              </span>
            </label>

            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <UButton
                :data-testid="TEST_IDS.READING.ONBOARDING_BACK"
                size="xl"
                variant="outline"
                @click="step = 2"
              >
                Back
              </UButton>
              <UButton
                :data-testid="TEST_IDS.READING.ONBOARDING_SUBMIT"
                size="xl"
                :disabled="!step3Valid || submitting"
                :loading="submitting"
                @click="submit"
              >
                Create Profile
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </UPageBody>
  </div>
</template>
