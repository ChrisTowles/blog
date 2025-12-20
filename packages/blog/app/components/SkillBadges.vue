<script setup lang="ts">
const props = defineProps<{
  personaSlug: string
}>()

const { data: personaDetails } = await useFetch(`/api/personas/${props.personaSlug}`)
</script>

<template>
  <div v-if="personaDetails?.skills" class="flex flex-wrap gap-1">
    <UBadge
      v-for="skill in personaDetails.skills"
      :key="skill.slug"
      size="sm"
      color="neutral"
      variant="subtle"
      class="text-xs"
    >
      {{ skill.name }}
    </UBadge>
  </div>
</template>
