<script setup lang="ts">
import { LOAN_APPLICATION_FIELDS, type LoanApplicationData } from '~~/shared/loan-types';

const props = defineProps<{
  applicationData: LoanApplicationData;
}>();

const fields = computed(() =>
  LOAN_APPLICATION_FIELDS.map((field) => ({
    name: field,
    label: field.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase()),
    filled: props.applicationData[field] !== undefined && props.applicationData[field] !== null,
  })),
);

const progress = computed(() => {
  const filled = fields.value.filter((f) => f.filled).length;
  return Math.round((filled / fields.value.length) * 100);
});
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between text-sm">
      <span class="text-muted">Application Progress</span>
      <span class="font-medium">{{ progress }}%</span>
    </div>
    <UProgress :value="progress" color="primary" />
    <div class="flex flex-wrap gap-1.5">
      <UBadge
        v-for="field in fields"
        :key="field.name"
        :color="field.filled ? 'success' : 'neutral'"
        :variant="field.filled ? 'solid' : 'outline'"
        :label="field.label"
        size="xs"
      />
    </div>
  </div>
</template>
