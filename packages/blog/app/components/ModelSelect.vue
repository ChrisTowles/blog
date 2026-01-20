<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const { model, models } = useModels();

const model_icon = 'anthropic'; // now hardcoded to anthropic since only model available

const items = computed(() =>
  models.map((model) => ({
    label: model,
    value: model,
    icon: `i-simple-icons-${model_icon}`,
  })),
);
</script>

<template>
  <USelectMenu
    v-model="model"
    :items="items"
    :icon="`i-simple-icons-${model_icon}`"
    variant="ghost"
    value-key="value"
    :data-testid="TEST_IDS.SHARED.MODEL_SELECT"
    class="hover:bg-default focus:bg-default data-[state=open]:bg-default"
    :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
    }"
  />
</template>
