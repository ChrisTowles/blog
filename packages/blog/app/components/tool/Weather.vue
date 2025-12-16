<script setup lang="ts">
import type { ToolUsePart, ToolResultPart } from '~~/shared/chat-types'
import type { WeatherResult } from '~~/server/utils/ai/tools'

const props = defineProps<{
  toolUse: ToolUsePart
  toolResult?: ToolResultPart
}>()

const isComplete = computed(() => !!props.toolResult)
const hasError = computed(() => {
  if (!props.toolResult) return false
  const result = props.toolResult.result as { error?: string }
  return !!result?.error
})

const weather = computed(() => {
  if (!props.toolResult) return null
  return props.toolResult.result as WeatherResult
})

const color = computed(() => {
  if (hasError.value) return 'bg-muted text-error'
  if (!isComplete.value) return 'bg-muted text-white'
  return 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 dark:from-sky-500 dark:via-blue-600 dark:to-indigo-700 text-white'
})
</script>

<template>
  <div class="rounded-xl px-5 py-4 my-5" :class="color">
    <!-- Loading state -->
    <div v-if="!isComplete" class="flex items-center justify-center h-44">
      <div class="text-center">
        <UIcon
          name="i-lucide-loader-circle"
          class="size-8 mx-auto mb-2 animate-spin"
        />
        <div class="text-sm">
          Loading weather for {{ toolUse.args.location }}...
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="hasError" class="flex items-center justify-center h-44">
      <div class="text-center">
        <UIcon
          name="i-lucide-triangle-alert"
          class="size-8 mx-auto mb-2"
        />
        <div class="text-sm">
          {{ (toolResult?.result as { error: string })?.error || 'Failed to get weather' }}
        </div>
      </div>
    </div>

    <!-- Weather display -->
    <template v-else-if="weather">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-baseline">
          <span class="text-4xl font-bold">{{ weather.temperature }}°</span>
          <span class="text-base text-white/80">C</span>
        </div>
        <div class="text-right">
          <div class="text-base font-medium mb-1">
            {{ weather.location }}
          </div>
          <div class="text-xs text-white/70">
            H:{{ weather.temperatureHigh }}° L:{{ weather.temperatureLow }}°
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <UIcon
            :name="weather.condition.icon"
            class="size-6 text-white"
          />
          <div class="text-sm font-medium">
            {{ weather.condition.text }}
          </div>
        </div>

        <div class="flex gap-3 text-xs">
          <div class="flex items-center gap-1">
            <UIcon name="i-lucide-droplets" class="size-3 text-blue-200" />
            <span>{{ weather.humidity }}%</span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon name="i-lucide-wind" class="size-3 text-blue-200" />
            <span>{{ weather.windSpeed }} km/h</span>
          </div>
        </div>
      </div>

      <div v-if="weather.dailyForecast.length > 0" class="flex items-center justify-between">
        <div
          v-for="(forecast, index) in weather.dailyForecast"
          :key="index"
          class="flex flex-col items-center gap-1.5"
        >
          <div class="text-xs text-white/70 font-medium">
            {{ forecast.day }}
          </div>
          <UIcon
            :name="forecast.condition.icon"
            class="size-5 text-white"
          />
          <div class="text-xs font-medium">
            <div>
              {{ forecast.high }}°
            </div>
            <div class="text-white/60">
              {{ forecast.low }}°
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
