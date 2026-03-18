<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { PHONICS_SEED, SIGHT_WORDS_BY_PHASE } from '~~/server/utils/reading/phonics-seed';
import type { PhonicsPhase, PhonicsProgressResponse } from '~~/shared/reading-types';

definePageMeta({ layout: 'reading' });

const { activeChildId } = useActiveChild();

// Fetch child progress if a child is selected
const { data: progress } = useFetch<PhonicsProgressResponse[]>('/api/reading/phonics/progress', {
  query: { childId: activeChildId },
  watch: [activeChildId],
  immediate: true,
});

// Group units by phase
const phases = computed(() => {
  const grouped = new Map<PhonicsPhase, typeof PHONICS_SEED>();
  for (const unit of PHONICS_SEED) {
    const phase = unit.phase;
    if (!grouped.has(phase)) grouped.set(phase, []);
    grouped.get(phase)!.push(unit);
  }
  return Array.from(grouped.entries()).map(([phase, units]) => ({
    phase,
    units: units.sort((a, b) => a.orderIndex - b.orderIndex),
  }));
});

const phaseLabels: Record<PhonicsPhase, string> = {
  1: 'Foundations',
  2: 'Building Complexity',
  3: 'Intermediate Patterns',
  4: 'Advanced Decoding',
};

const phaseEmojis: Record<PhonicsPhase, string> = {
  1: '\u{1F331}',
  2: '\u{1F333}',
  3: '\u{1F308}',
  4: '\u{1F680}',
};

const route = useRoute();
const router = useRouter();

// Track which phases are expanded — initialize from URL or default to phase 1
const initialPhases = route.query.open
  ? (String(route.query.open)
      .split(',')
      .map(Number)
      .filter((n) => n >= 1 && n <= 4) as PhonicsPhase[])
  : [1 as PhonicsPhase];
const expandedPhases = ref<Set<PhonicsPhase>>(new Set(initialPhases));

function togglePhase(phase: PhonicsPhase) {
  const s = new Set(expandedPhases.value);
  if (s.has(phase)) s.delete(phase);
  else s.add(phase);
  expandedPhases.value = s;
}

watch(expandedPhases, (phases) => {
  const sorted = Array.from(phases).sort();
  const isDefault = sorted.length === 1 && sorted[0] === 1;
  router.replace({ query: { ...route.query, open: isDefault ? undefined : sorted.join(',') } });
});

function statusBadgeFor(
  status: 'locked' | 'active' | 'mastered' | null,
): { label: string; color: string; emoji: string } | null {
  if (!status) return null;
  if (status === 'mastered')
    return { label: 'Mastered', color: 'var(--reading-success)', emoji: '\u2705' };
  if (status === 'active')
    return { label: 'Learning', color: 'var(--reading-highlight)', emoji: '\u{1F4D6}' };
  return { label: 'Locked', color: 'var(--reading-text)', emoji: '\u{1F512}' };
}

// Pre-compute status badges for all units to avoid repeated O(n) lookups in the template
const unitBadges = computed(() => {
  const map = new Map<number, ReturnType<typeof statusBadgeFor>>();
  for (let i = 0; i < PHONICS_SEED.length; i++) {
    let status: 'locked' | 'active' | 'mastered' | null = null;
    if (progress.value && activeChildId.value) {
      const p = progress.value.find((pr) => pr.phonicsUnitId === i + 1);
      status = p?.status ?? null;
    }
    map.set(i, statusBadgeFor(status));
  }
  return map;
});

// Map pattern codes to friendly descriptions
function friendlyPattern(pattern: string): string {
  const map: Record<string, string> = {
    'CVC-short-a': 'cat, hat, man',
    'CVC-short-i': 'sit, hit, pin',
    'CVC-short-o': 'hot, dog, mop',
    'CVC-short-u': 'cup, bug, sun',
    'CVC-short-e': 'bed, red, pet',
    'DG-sh': 'ship, fish',
    'DG-th': 'thin, math',
    'DG-ch': 'chop, much',
    'DG-ck': 'back, duck',
    'VCe-a': 'bake, name',
    'VCe-i': 'ride, bike',
    'VCe-o': 'bone, home',
    'VCe-u': 'cute, tube',
    'VCe-e': 'theme, Pete',
    'VT-ai': 'rain, wait',
    'VT-ay': 'day, play',
    'VT-ee': 'tree, free',
    'VT-ea': 'read, beat',
    'VT-oa': 'boat, road',
    'VT-oe': 'toe, doe',
    'VT-oo': 'moon, book',
    'VT-ou': 'out, shout',
    'VT-ow': 'cow, snow',
    'RC-ar': 'car, far',
    'RC-or': 'for, door',
    'RC-er': 'her, term',
    'RC-ir': 'bird, girl',
    'RC-ur': 'burn, turn',
    'DI-oi': 'coin, join',
    'DI-oy': 'boy, joy',
    'DI-ou': 'loud, house',
    'DI-ow': 'cow, brown',
    'SL-kn': 'knot, know',
    'SL-wr': 'write, wrap',
    'SL-mb': 'lamb, climb',
    'SL-igh': 'night, high',
  };
  return map[pattern] || pattern;
}

// Get a few example words for a unit
function getExampleWords(patterns: string[]): string {
  const examples = patterns
    .slice(0, 3)
    .map((p) => friendlyPattern(p))
    .filter(Boolean);
  return examples.join(', ');
}

const sightWordsByPhase = SIGHT_WORDS_BY_PHASE;
</script>

<template>
  <div :data-testid="TEST_IDS.READING.CURRICULUM_PAGE" class="space-y-8 pb-8">
    <!-- Header -->
    <div class="text-center space-y-3 reading-float-in pt-8">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-[var(--reading-text)]"
        style="font-family: var(--reading-font-display)"
      >
        &#x1F4DA; Phonics Curriculum
      </h1>
      <p
        class="text-xl text-[var(--reading-text)]/60 max-w-lg mx-auto"
        style="font-family: var(--reading-font-body)"
      >
        A structured phonics progression across 4 phases, from letter sounds to advanced decoding.
      </p>
    </div>

    <!-- Toolbar -->
    <div class="max-w-3xl mx-auto flex items-center gap-3 px-4">
      <UButton
        to="/reading/dashboard"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="!rounded-full !text-[var(--reading-primary)] !font-bold"
      >
        Dashboard
      </UButton>
    </div>

    <!-- Phases -->
    <div class="max-w-3xl mx-auto space-y-6 px-4">
      <div v-for="{ phase, units } in phases" :key="phase" class="reading-float-in">
        <!-- Phase header (accordion toggle) -->
        <button
          class="w-full flex items-center gap-4 p-5 rounded-2xl bg-[var(--reading-card-bg)] border-2 border-[var(--reading-primary)]/15 shadow-sm transition-all active:scale-[0.99] cursor-pointer"
          @click="togglePhase(phase)"
        >
          <span class="text-4xl">{{ phaseEmojis[phase] }}</span>
          <div class="flex-1 text-left">
            <h2
              class="text-2xl font-extrabold text-[var(--reading-text)]"
              style="font-family: var(--reading-font-display)"
            >
              Phase {{ phase }}: {{ phaseLabels[phase] }}
            </h2>
            <p class="text-sm text-[var(--reading-text)]/50 mt-1">{{ units.length }} units</p>
          </div>
          <span
            class="text-2xl text-[var(--reading-primary)] transition-transform duration-300"
            :class="{ 'rotate-180': expandedPhases.has(phase) }"
          >
            &#x25BC;
          </span>
        </button>

        <!-- Phase units -->
        <Transition name="reading-flip">
          <div v-if="expandedPhases.has(phase)" class="mt-3 space-y-3 pl-2">
            <!-- Sight words for this phase -->
            <div
              class="rounded-2xl bg-[var(--reading-secondary)]/10 border border-[var(--reading-secondary)]/20 p-4"
            >
              <h3
                class="text-lg font-bold text-[var(--reading-secondary)] mb-2"
                style="font-family: var(--reading-font-display)"
              >
                &#x1F31F; Phase {{ phase }} Sight Words
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="word in sightWordsByPhase[phase]"
                  :key="word"
                  class="inline-block px-3 py-1 rounded-full text-sm font-bold bg-[var(--reading-secondary)]/20 text-[var(--reading-text)]"
                >
                  {{ word }}
                </span>
              </div>
            </div>

            <!-- Units list -->
            <div
              v-for="(unit, idx) in units"
              :key="unit.orderIndex"
              class="rounded-2xl bg-[var(--reading-card-bg)] border border-[var(--reading-primary)]/10 p-5 transition-all"
            >
              <div class="flex items-start gap-3">
                <!-- Unit number circle -->
                <div
                  class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-extrabold text-white"
                  :style="{ backgroundColor: 'var(--reading-primary)' }"
                >
                  {{ unit.orderIndex }}
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3
                      class="text-lg font-bold text-[var(--reading-text)]"
                      style="font-family: var(--reading-font-display)"
                    >
                      {{ unit.name }}
                    </h3>
                    <!-- Progress badge if child selected -->
                    <template v-if="activeChildId">
                      <span
                        v-if="unitBadges.get(PHONICS_SEED.indexOf(unit))"
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold"
                        :style="{
                          backgroundColor: unitBadges.get(PHONICS_SEED.indexOf(unit))!.color + '22',
                          color: unitBadges.get(PHONICS_SEED.indexOf(unit))!.color,
                        }"
                      >
                        {{ unitBadges.get(PHONICS_SEED.indexOf(unit))!.emoji }}
                        {{ unitBadges.get(PHONICS_SEED.indexOf(unit))!.label }}
                      </span>
                    </template>
                  </div>
                  <p class="text-sm text-[var(--reading-text)]/60 mt-1">
                    {{ unit.description }}
                  </p>
                  <!-- Example words -->
                  <div v-if="getExampleWords(unit.patterns)" class="mt-2">
                    <span class="text-xs font-semibold text-[var(--reading-text)]/40"
                      >Examples:
                    </span>
                    <span class="text-sm text-[var(--reading-text)]/70 italic">
                      {{ getExampleWords(unit.patterns) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
