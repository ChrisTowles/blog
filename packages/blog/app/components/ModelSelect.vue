<script setup lang="ts">
import Anthropic from '@anthropic-ai/sdk';

const { model, models } = useModels()

const items = computed(() => models.map(model => ({
  label: model,
  value: model,
  icon: `i-simple-icons-${'anthropic'}`
})))
</script>

<template>
  <USelectMenu
    v-model="model"
    :items="items"
    :icon="`i-simple-icons-${'anthropic'}`"
    variant="ghost"
    value-key="value"
    class="hover:bg-default focus:bg-default data-[state=open]:bg-default"
    :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
    }"
  />
</template>
