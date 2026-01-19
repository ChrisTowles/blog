<script setup lang="ts">
import type { ToolUsePart, ToolResultPart } from '~~/shared/chat-types';
import type { DiceResult } from '~~/server/utils/ai/tools';

const props = defineProps<{
  toolUse: ToolUsePart;
  toolResult?: ToolResultPart;
}>();

const isComplete = computed(() => !!props.toolResult);
const hasError = computed(() => {
  if (!props.toolResult) return false;
  const result = props.toolResult.result as { error?: string };
  return !!result?.error;
});

const dice = computed(() => {
  if (!props.toolResult) return null;
  return props.toolResult.result as DiceResult;
});

const bgColor = computed(() => {
  if (hasError.value) return 'bg-muted';
  if (!isComplete.value) return 'bg-muted';
  if (dice.value?.isCriticalHit)
    return 'bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500';
  if (dice.value?.isCriticalMiss) return 'bg-gradient-to-br from-red-500 via-red-600 to-red-700';
  return 'bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700';
});

function getDiceIcon(sides: number): string {
  const icons: Record<number, string> = {
    4: 'i-lucide-triangle',
    6: 'i-lucide-dice-1',
    8: 'i-lucide-octagon',
    10: 'i-lucide-pentagon',
    12: 'i-lucide-hexagon',
    20: 'i-lucide-circle',
  };
  return icons[sides] || 'i-lucide-dice-5';
}
</script>

<template>
  <div class="rounded-xl px-5 py-4 my-5 text-white" :class="bgColor">
    <!-- Loading state -->
    <div v-if="!isComplete" class="flex items-center justify-center h-24">
      <div class="text-center">
        <UIcon name="i-lucide-dice-5" class="size-8 mx-auto mb-2 animate-bounce" />
        <div class="text-sm">Rolling {{ toolUse.args.notation }}...</div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" class="flex items-center justify-center h-24">
      <div class="text-center text-error">
        <UIcon name="i-lucide-triangle-alert" class="size-8 mx-auto mb-2" />
        <div class="text-sm">
          {{ (toolResult?.result as { error: string })?.error || 'Failed to roll dice' }}
        </div>
      </div>
    </div>

    <!-- Dice result -->
    <template v-else-if="dice">
      <!-- Label if provided -->
      <div v-if="dice.label" class="text-sm text-white/80 mb-2 font-medium">
        {{ dice.label }}
      </div>

      <!-- Main result -->
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3">
          <UIcon :name="getDiceIcon(dice.rolls[0]?.sides || 6)" class="size-8" />
          <div>
            <div class="text-xs text-white/70 uppercase tracking-wide">
              {{ dice.notation }}
            </div>
            <div class="text-3xl font-bold">
              {{ dice.total }}
            </div>
          </div>
        </div>

        <!-- Crit indicator -->
        <div v-if="dice.isCriticalHit" class="text-right">
          <div class="text-2xl font-bold animate-pulse">NAT 20!</div>
          <div class="text-xs text-white/80">Critical Hit!</div>
        </div>
        <div v-else-if="dice.isCriticalMiss" class="text-right">
          <div class="text-2xl font-bold">NAT 1</div>
          <div class="text-xs text-white/80">Critical Miss!</div>
        </div>
      </div>

      <!-- Individual dice -->
      <div class="flex flex-wrap gap-2 mb-3">
        <div
          v-for="(roll, index) in dice.rolls"
          :key="index"
          class="flex items-center justify-center size-10 rounded-lg font-bold text-lg"
          :class="[
            roll.kept ? 'bg-white/20' : 'bg-white/5 line-through opacity-50',
            roll.result === roll.sides && 'ring-2 ring-white/50',
            roll.result === 1 && roll.sides === 20 && 'ring-2 ring-red-300',
          ]"
        >
          {{ roll.result }}
        </div>
      </div>

      <!-- Breakdown -->
      <div class="text-sm text-white/70 font-mono">
        {{ dice.breakdown }}
      </div>
    </template>
  </div>
</template>
