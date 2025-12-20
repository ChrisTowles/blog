<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids'

interface Persona {
  slug: string
  name: string
  description: string
  icon: string
  isDefault: boolean
}

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { data: personas } = await useFetch<Persona[]>('/api/personas')

const selected = computed({
  get: () => props.modelValue || personas.value?.find(p => p.isDefault)?.slug || 'blog-guide',
  set: (value: string) => emit('update:modelValue', value)
})

const selectedPersona = computed(() => {
  return personas.value?.find(p => p.slug === selected.value)
})

const items = computed(() => (personas.value || []).map(p => ({
  label: p.name,
  value: p.slug,
  icon: p.icon
})))
</script>

<template>
  <div :data-testid="TEST_IDS.CHAT.PERSONA_SELECT">
    <USelectMenu
      v-model="selected"
      :items="items"
      :icon="selectedPersona?.icon"
      variant="ghost"
      value-key="value"
      class="hover:bg-default focus:bg-default data-[state=open]:bg-default"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
    />
  </div>
</template>
