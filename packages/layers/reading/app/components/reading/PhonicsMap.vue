<script setup lang="ts">
import type { PhonicsMapUnit, PhonicsPhase } from '../../../shared/reading-types';

const props = defineProps<{ childId: number }>();

const { data: units, status } = useFetch<PhonicsMapUnit[]>('/api/reading/phonics/progress', {
  query: { childId: props.childId },
});

const PHASE_LABELS: Record<PhonicsPhase, string> = {
  1: 'Foundations',
  2: 'Building Up',
  3: 'Intermediate',
  4: 'Advanced',
};

const PHASE_EMOJIS: Record<PhonicsPhase, string> = {
  1: '🌱',
  2: '🌿',
  3: '🌳',
  4: '🏆',
};

const unitsByPhase = computed(() => {
  if (!units.value) return new Map<PhonicsPhase, PhonicsMapUnit[]>();
  const map = new Map<PhonicsPhase, PhonicsMapUnit[]>();
  for (const unit of units.value) {
    const list = map.get(unit.phase) ?? [];
    list.push(unit);
    map.set(unit.phase, list);
  }
  return map;
});

const selectedUnit = ref<PhonicsMapUnit | null>(null);
const popoverAnchor = ref<HTMLElement | null>(null);

function selectUnit(unit: PhonicsMapUnit, event: MouseEvent) {
  if (selectedUnit.value?.id === unit.id) {
    selectedUnit.value = null;
    return;
  }
  selectedUnit.value = unit;
  popoverAnchor.value = event.currentTarget as HTMLElement;
}

function closePopover() {
  selectedUnit.value = null;
}

function formatPatterns(patterns: string[]): string[] {
  return patterns.map((p) => {
    const parts = p.split('-');
    return parts.slice(1).join('-');
  });
}

const popoverStyle = computed(() => {
  if (!popoverAnchor.value || !import.meta.client) return {};
  const rect = popoverAnchor.value.getBoundingClientRect();
  return {
    top: `${Math.min(rect.bottom + 8, globalThis.innerHeight - 300)}px`,
    left: `${Math.min(Math.max(rect.left - 100, 16), globalThis.innerWidth - 320)}px`,
  };
});
</script>

<template>
  <div class="space-y-6">
    <!-- Loading -->
    <div v-if="status === 'pending'" class="text-center py-12">
      <div class="text-4xl reading-bounce-in">📖</div>
      <p
        class="text-xl text-[var(--reading-text)]/60 mt-4"
        style="font-family: var(--reading-font-display)"
      >
        Loading your phonics adventure...
      </p>
    </div>

    <!-- Map -->
    <template v-else-if="units">
      <div v-for="[phase, phaseUnits] in unitsByPhase" :key="phase" class="reading-float-in">
        <!-- Phase header -->
        <div class="flex items-center gap-3 mb-4">
          <span class="text-3xl">{{ PHASE_EMOJIS[phase] }}</span>
          <h3
            class="text-xl font-bold text-[var(--reading-text)]"
            style="font-family: var(--reading-font-display)"
          >
            Phase {{ phase }}: {{ PHASE_LABELS[phase] }}
          </h3>
          <div class="flex-1 h-0.5 bg-[var(--reading-primary)]/20 rounded-full" />
        </div>

        <!-- Units trail -->
        <div class="flex flex-wrap gap-3 mb-8 pl-4">
          <button
            v-for="(unit, idx) in phaseUnits"
            :key="unit.id"
            class="phonics-node relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl border-3 transition-all cursor-pointer text-2xl md:text-3xl select-none"
            :class="[
              unit.status === 'mastered'
                ? 'border-[var(--reading-success)] bg-[var(--reading-success)]/15 shadow-lg shadow-[var(--reading-success)]/25 phonics-mastered'
                : unit.status === 'active'
                  ? 'border-[var(--reading-primary)] bg-[var(--reading-primary)]/15 shadow-lg shadow-[var(--reading-primary)]/25 phonics-active'
                  : 'border-gray-300 bg-gray-100 opacity-60',
            ]"
            :aria-label="`${unit.name} - ${unit.status}`"
            @click="selectUnit(unit, $event)"
          >
            <!-- Connector line -->
            <div
              v-if="idx > 0"
              class="absolute -left-3 top-1/2 w-3 h-0.5 -translate-y-1/2"
              :class="unit.status === 'locked' ? 'bg-gray-300' : 'bg-[var(--reading-primary)]/40'"
            />

            <!-- Icon -->
            <span v-if="unit.status === 'mastered'">✅</span>
            <span v-else-if="unit.status === 'active'">▶️</span>
            <span v-else>🔒</span>

            <!-- Order badge -->
            <span
              class="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full text-[10px] md:text-xs font-bold flex items-center justify-center"
              :class="
                unit.status === 'mastered'
                  ? 'bg-[var(--reading-success)] text-white'
                  : unit.status === 'active'
                    ? 'bg-[var(--reading-primary)] text-white'
                    : 'bg-gray-300 text-gray-600'
              "
            >
              {{ unit.orderIndex }}
            </span>
          </button>
        </div>
      </div>

      <!-- Popover -->
      <Teleport to="body">
        <div v-if="selectedUnit" class="fixed inset-0 z-40" @click="closePopover" />
        <div
          v-if="selectedUnit"
          class="fixed z-50 w-72 md:w-80 rounded-3xl bg-[var(--reading-card-bg)] border-2 shadow-xl p-5 reading-float-in"
          :class="
            selectedUnit.status === 'mastered'
              ? 'border-[var(--reading-success)]/50'
              : selectedUnit.status === 'active'
                ? 'border-[var(--reading-primary)]/50'
                : 'border-gray-300'
          "
          :style="popoverStyle"
        >
          <!-- Status badge -->
          <div class="flex items-center justify-between mb-3">
            <span
              class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide"
              :class="
                selectedUnit.status === 'mastered'
                  ? 'bg-[var(--reading-success)]/20 text-[var(--reading-success)]'
                  : selectedUnit.status === 'active'
                    ? 'bg-[var(--reading-primary)]/20 text-[var(--reading-primary)]'
                    : 'bg-gray-200 text-gray-500'
              "
            >
              {{ selectedUnit.status }}
            </span>
            <button
              class="text-[var(--reading-text)]/40 hover:text-[var(--reading-text)] text-xl leading-none"
              @click="closePopover"
            >
              &times;
            </button>
          </div>

          <!-- Unit name -->
          <h4
            class="text-lg font-bold text-[var(--reading-text)] mb-2"
            style="font-family: var(--reading-font-display)"
          >
            {{ selectedUnit.name }}
          </h4>

          <p class="text-sm text-[var(--reading-text)]/70 mb-3">
            {{ selectedUnit.description }}
          </p>

          <!-- Patterns -->
          <div v-if="selectedUnit.patterns.length" class="mb-4">
            <p class="text-xs font-bold text-[var(--reading-text)]/50 uppercase tracking-wide mb-2">
              Patterns
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="pattern in formatPatterns(selectedUnit.patterns)"
                :key="pattern"
                class="px-2 py-0.5 rounded-lg text-sm font-mono font-bold"
                :class="
                  selectedUnit.status === 'mastered'
                    ? 'bg-[var(--reading-success)]/15 text-[var(--reading-success)]'
                    : selectedUnit.status === 'active'
                      ? 'bg-[var(--reading-primary)]/15 text-[var(--reading-primary)]'
                      : 'bg-gray-100 text-gray-500'
                "
              >
                {{ pattern }}
              </span>
            </div>
          </div>

          <!-- Mastered date -->
          <p v-if="selectedUnit.masteredAt" class="text-xs text-[var(--reading-success)]/70 mb-3">
            Mastered {{ new Date(selectedUnit.masteredAt).toLocaleDateString() }}
          </p>

          <!-- Practice button for active units -->
          <UButton
            v-if="selectedUnit.status === 'active'"
            to="/reading/practice"
            class="!w-full !rounded-full !py-2.5 !font-bold !text-lg !bg-[var(--reading-primary)] hover:!bg-[var(--reading-primary)]/85 !text-white !justify-center"
          >
            ▶ Practice
          </UButton>
        </div>
      </Teleport>
    </template>
  </div>
</template>

<style scoped>
.phonics-mastered {
  animation: mastered-glow 2s ease-in-out infinite alternate;
}

@keyframes mastered-glow {
  from {
    box-shadow: 0 0 8px var(--reading-success, #22c55e);
  }
  to {
    box-shadow: 0 0 20px var(--reading-success, #22c55e);
  }
}

.phonics-active {
  animation: active-pulse 1.5s ease-in-out infinite;
}

@keyframes active-pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 8px var(--reading-primary, #3b82f6);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 16px var(--reading-primary, #3b82f6);
  }
}

.border-3 {
  border-width: 3px;
}
</style>
