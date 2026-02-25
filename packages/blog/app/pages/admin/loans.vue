<script setup lang="ts">
import type { LoanApplicationData, LoanStatus } from '~~/shared/loan-types';
import { REVIEWERS } from '~~/shared/loan-types';
import { extractErrorMessage } from '~~/shared/error-util';

definePageMeta({
  middleware: 'auth',
});

interface LoanApplication {
  id: string;
  userId: string;
  status: LoanStatus | null;
  applicationData: LoanApplicationData | null;
  createdAt: string;
  reviews: Array<{
    id: string;
    applicationId: string;
    reviewer: string | null;
    decision: string | null;
    analysis: string | null;
    flags: string[] | null;
    createdAt: string;
  }>;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const { data, status, refresh } = await useFetch<{ applications: LoanApplication[] }>(
  '/api/admin/loans',
);

const applications = computed(() => data.value?.applications ?? []);

const creating = ref(false);
const toast = useToast();

async function createLoan() {
  creating.value = true;
  try {
    const result = await $fetch<{ id: string }>('/api/loan', { method: 'POST' });
    await navigateTo(`/loan/${result.id}`);
  } catch (err) {
    toast.add({
      title: 'Failed to create loan',
      description: extractErrorMessage(err),
      icon: 'i-heroicons-exclamation-triangle',
      color: 'error',
    });
  } finally {
    creating.value = false;
  }
}

const totalCount = computed(() => applications.value.length);

function countByStatus(s: LoanStatus) {
  return applications.value.filter((a) => a.status === s).length;
}

const statusBadgeColor: Record<string, 'success' | 'error' | 'warning' | 'primary' | 'neutral'> = {
  approved: 'success',
  denied: 'error',
  flagged: 'warning',
  reviewing: 'primary',
  intake: 'neutral',
};

function badgeColor(s: string | null) {
  return statusBadgeColor[s ?? 'intake'] ?? 'neutral';
}

const columns = [
  { key: 'status', label: 'Status' },
  { key: 'applicant', label: 'Applicant' },
  { key: 'date', label: 'Date' },
  { key: 'reviews', label: 'Reviews' },
  { key: 'action', label: '' },
];
</script>

<template>
  <UContainer class="py-8">
    <div class="max-w-6xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <UIcon name="i-lucide-building-2" class="w-8 h-8 text-primary" />
        <div class="flex-1">
          <h1 class="text-2xl font-bold">Loan Applications</h1>
          <p class="text-sm text-muted">All loan applications and review status</p>
        </div>
        <UButton
          icon="i-heroicons-plus"
          label="New Application"
          :loading="creating"
          @click="createLoan"
        />
      </div>

      <!-- Loading -->
      <div v-if="status === 'pending'" class="text-center py-8">
        <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin" />
      </div>

      <template v-else>
        <!-- Stats Row -->
        <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">{{ totalCount }}</div>
              <div class="text-sm text-muted">Total</div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold">{{ countByStatus('intake') }}</div>
              <div class="text-sm text-muted">
                <UBadge color="neutral" size="xs">Intake</UBadge>
              </div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-primary">{{ countByStatus('reviewing') }}</div>
              <div class="text-sm text-muted">
                <UBadge color="primary" size="xs">Reviewing</UBadge>
              </div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-success">{{ countByStatus('approved') }}</div>
              <div class="text-sm text-muted">
                <UBadge color="success" size="xs">Approved</UBadge>
              </div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-error">{{ countByStatus('denied') }}</div>
              <div class="text-sm text-muted">
                <UBadge color="error" size="xs">Denied</UBadge>
              </div>
            </div>
          </UCard>
          <UCard>
            <div class="text-center">
              <div class="text-3xl font-bold text-warning">{{ countByStatus('flagged') }}</div>
              <div class="text-sm text-muted">
                <UBadge color="warning" size="xs">Flagged</UBadge>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Applications Table -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Applications ({{ totalCount }})</h3>
          </template>

          <div v-if="!applications.length" class="text-center py-8 text-muted">
            No loan applications yet.
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b text-left">
                  <th
                    v-for="col in columns"
                    :key="col.key"
                    class="py-2 px-3 font-medium text-muted"
                  >
                    {{ col.label }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="app in applications"
                  :key="app.id"
                  class="border-b last:border-0 hover:bg-muted/50 transition-colors"
                >
                  <td class="py-3 px-3">
                    <UBadge :color="badgeColor(app.status)" size="xs">
                      {{ app.status ?? 'intake' }}
                    </UBadge>
                  </td>
                  <td class="py-3 px-3">
                    <div class="font-medium">{{ app.user.name }}</div>
                    <div class="text-xs text-muted">{{ app.user.email }}</div>
                  </td>
                  <td class="py-3 px-3 text-muted">
                    {{ new Date(app.createdAt).toLocaleDateString() }}
                  </td>
                  <td class="py-3 px-3">{{ app.reviews.length }}/{{ REVIEWERS.length }}</td>
                  <td class="py-3 px-3">
                    <UButton
                      size="xs"
                      variant="soft"
                      label="Review"
                      icon="i-heroicons-arrow-right"
                      trailing
                      :to="`/loan/${app.id}/review`"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>
      </template>
    </div>
  </UContainer>
</template>
