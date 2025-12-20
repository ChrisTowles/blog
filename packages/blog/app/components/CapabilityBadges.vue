<script setup lang="ts">
const props = defineProps<{
  personaSlug: string
}>()

const { data: personaDetails } = await useFetch(`/api/personas/${props.personaSlug}`)
</script>

<template>
  <div v-if="personaDetails?.capabilities" class="flex flex-wrap gap-1">
    <UBadge
      v-for="capability in personaDetails.capabilities"
      :key="capability.slug"
      size="sm"
      color="neutral"
      variant="subtle"
      class="text-xs"
    >
      {{ capability.name }}
    </UBadge>
  </div>
</template>
