<script setup lang="ts">
import type { SchemaField } from '~~/shared/workflow-types';

const props = defineProps<{
  schema: Record<string, unknown>;
}>();

const emit = defineEmits<{
  (e: 'update:schema', schema: Record<string, unknown>): void;
}>();

const TYPE_OPTIONS = [
  { label: 'String', value: 'string' },
  { label: 'Number', value: 'number' },
  { label: 'Boolean', value: 'boolean' },
  { label: 'Array', value: 'array' },
  { label: 'Object', value: 'object' },
];

function schemaToFields(schema: Record<string, unknown>): SchemaField[] {
  const properties =
    (schema?.properties as Record<
      string,
      { type: string; description?: string; enum?: string[] }
    >) ?? {};
  const required = (schema?.required as string[]) ?? [];
  return Object.entries(properties).map(([name, def]) => ({
    name,
    type: (def.type as SchemaField['type']) ?? 'string',
    description: def.description ?? '',
    required: required.includes(name),
    enumValues: def.enum ?? [],
  }));
}

const fields = ref<SchemaField[]>(schemaToFields(props.schema));
const showRaw = ref(false);
const rawJson = ref('');
const rawError = ref('');

watch(
  () => props.schema,
  (s) => {
    fields.value = schemaToFields(s);
  },
  { deep: true },
);

const computedSchema = computed(() => ({
  type: 'object' as const,
  properties: Object.fromEntries(
    fields.value.map((f) => [
      f.name,
      {
        type: f.type,
        description: f.description,
        ...(f.enumValues?.length ? { enum: f.enumValues } : {}),
      },
    ]),
  ),
  required: fields.value.filter((f) => f.required).map((f) => f.name),
}));

watch(
  computedSchema,
  (s) => {
    emit('update:schema', s);
    rawJson.value = JSON.stringify(s, null, 2);
  },
  { deep: true, immediate: true },
);

function addField() {
  fields.value.push({ name: '', type: 'string', description: '', required: false });
}

function removeField(i: number) {
  fields.value.splice(i, 1);
}

function onRawBlur() {
  try {
    const parsed = JSON.parse(rawJson.value);
    if (parsed.type !== 'object' || !parsed.properties) {
      rawError.value = 'Must have type: "object" and properties';
      return;
    }
    rawError.value = '';
    fields.value = schemaToFields(parsed);
  } catch {
    rawError.value = 'Invalid JSON';
  }
}
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-xs text-gray-500"
        >{{ fields.length }} field{{ fields.length !== 1 ? 's' : '' }}</span
      >
      <UButton size="xs" variant="ghost" @click="showRaw = !showRaw">
        {{ showRaw ? 'Form view' : 'View JSON' }}
      </UButton>
    </div>

    <!-- JSON raw editor -->
    <div v-if="showRaw">
      <UTextarea v-model="rawJson" :rows="8" class="font-mono text-xs" @blur="onRawBlur" />
      <p v-if="rawError" class="text-xs text-red-500 mt-1">{{ rawError }}</p>
    </div>

    <!-- Visual field editor -->
    <div v-else class="space-y-2">
      <div
        v-for="(field, i) in fields"
        :key="i"
        class="rounded border border-gray-200 dark:border-gray-700 p-2 space-y-1.5"
      >
        <div class="flex items-center gap-2">
          <UInput v-model="field.name" placeholder="fieldName" size="xs" class="flex-1 font-mono" />
          <USelect v-model="field.type" :options="TYPE_OPTIONS" size="xs" class="w-28" />
          <UButton
            size="xs"
            color="error"
            variant="ghost"
            icon="i-lucide-x"
            @click="removeField(i)"
          />
        </div>
        <UInput v-model="field.description" placeholder="Description" size="xs" />
        <div class="flex items-center gap-2">
          <UToggle v-model="field.required" size="xs" />
          <span class="text-xs text-gray-500">Required</span>
        </div>
        <div v-if="field.type === 'string'" class="text-xs">
          <UInput
            :value="field.enumValues?.join(', ')"
            placeholder="Enum values (comma-separated)"
            size="xs"
            @input="
              field.enumValues = ($event.target as HTMLInputElement).value
                .split(',')
                .map((v: string) => v.trim())
                .filter(Boolean)
            "
          />
        </div>
      </div>

      <UButton size="xs" variant="outline" icon="i-lucide-plus" block @click="addField">
        Add field
      </UButton>
    </div>
  </div>
</template>
