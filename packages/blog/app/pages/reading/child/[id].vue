<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const route = useRoute();
const childId = computed(() => Number(route.params.id));
</script>

<template>
  <UPageHeader title="Child Profile" :description="`Manage profile for child #${childId}`" />
  <UPageBody>
    <div class="max-w-2xl mx-auto">
      <UCard>
        <p class="text-gray-500">Child profile management will be available here.</p>
        <template #footer>
          <UButton to="/reading/dashboard" variant="ghost">Back to Dashboard</UButton>
        </template>
      </UCard>
    </div>
  </UPageBody>
</template>
