<script setup lang="ts">
const props = defineProps<{
    runningTaskId: string | null
    queuedTaskIds: string[]
}>()

const hasQueuedTasks = computed(() => props.queuedTaskIds.length > 0)
const queueCount = computed(() => props.queuedTaskIds.length)
</script>

<template>
    <div v-if="hasQueuedTasks" class="flex items-center gap-2 text-sm text-muted">
        <UIcon name="i-lucide-list-ordered" class="size-4" />
        <span>{{ queueCount }} task{{ queueCount > 1 ? 's' : '' }} queued</span>
    </div>
</template>
