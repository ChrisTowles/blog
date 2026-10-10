<script setup lang="ts">
import { outputSchemaSchema } from '../../../shared/workflow-schemas';
import type {
  OutputSchema,
  OutputSchemaProperty,
  SchemaField,
} from '../../../shared/workflow-types';

const props = defineProps<{
  schema: OutputSchema;
  readonly?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:schema', schema: OutputSchema): void;
}>();

const FIELD_TYPES: readonly SchemaField['type'][] = [
  'string',
  'number',
  'boolean',
  'array',
  'object',
];

const TYPE_OPTIONS = FIELD_TYPES.map((value) => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value,
}));

function fieldType(type: string): SchemaField['type'] {
  return FIELD_TYPES.find((t) => t === type) ?? 'string';
}

function schemaToFields(schema: OutputSchema): SchemaField[] {
  const required = schema.required ?? [];

  return Object.entries(schema.properties).map(([name, def]) => ({
    name,
    type: fieldType(def.type),
    description: def.description ?? '',
    required: required.includes(name),
    enumValues: def.enum ?? [],
  }));
}

const fields = ref<SchemaField[]>(schemaToFields(props.schema));

const showRaw = ref(false);

const rawJson = ref('');

const rawError = ref('');

// UButton's onClick requires a void return; inline toggle returns boolean
function toggleRaw() {
  showRaw.value = !showRaw.value;
}

watch(
  () => props.schema,
  (s) => {
    fields.value = schemaToFields(s);
  },
  { deep: true },
);

function fieldToProperty(f: SchemaField): OutputSchemaProperty {
  const property: OutputSchemaProperty = { type: f.type, description: f.description };

  if (f.enumValues?.length) property.enum = f.enumValues;

  return property;
}

const computedSchema = computed(
  (): OutputSchema => ({
    type: 'object',
    properties: Object.fromEntries(fields.value.map((f) => [f.name, fieldToProperty(f)])),
    required: fields.value.filter((f) => f.required).map((f) => f.name),
  }),
);

watch(
  computedSchema,
  (s) => {
    emit('update:schema', s);
    rawJson.value = JSON.stringify(s, null, 2);
  },
  { deep: true, immediate: true },
);

function addField() {
  fields.value.push({
    name: `field${fields.value.length}`,
    type: 'string',
    description: '',
    required: false,
  });
}

function parseEnumInput(value: string): string[] {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean);
}

function removeField(i: number) {
  fields.value.splice(i, 1);
}

function onRawBlur() {
  try {
    const parsed = outputSchemaSchema.safeParse(JSON.parse(rawJson.value));

    if (!parsed.success) {
      rawError.value = 'Must have type: "object" and properties';

      return;
    }

    rawError.value = '';
    fields.value = schemaToFields(parsed.data);
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
      <UButton size="xs" variant="ghost" @click="toggleRaw">
        {{ showRaw ? 'Form view' : 'View JSON' }}
      </UButton>
    </div>

    <!-- JSON raw editor -->
    <div v-if="showRaw">
      <UTextarea v-model="rawJson" :rows="8" class="font-mono text-xs" @blur="onRawBlur" />
      <p v-if="rawError" class="text-xs text-red-500 mt-1">{{ rawError }}</p>
    </div>

    <!-- Visual field editor -->
    <fieldset v-else class="space-y-2" :disabled="readonly">
      <div
        v-for="(field, i) in fields"
        :key="field.name || i"
        class="rounded border border-gray-200 dark:border-gray-700 p-2 space-y-1.5"
      >
        <div class="flex items-center gap-2">
          <UInput v-model="field.name" placeholder="fieldName" size="xs" class="flex-1 font-mono" />
          <USelect v-model="field.type" :options="TYPE_OPTIONS" size="xs" class="w-28" />
          <UButton
            v-if="!readonly"
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
            @input="field.enumValues = parseEnumInput(($event.target as HTMLInputElement).value)"
          />
        </div>
      </div>

      <UButton
        v-if="!readonly"
        size="xs"
        variant="outline"
        icon="i-lucide-plus"
        block
        @click="addField"
      >
        Add field
      </UButton>
    </fieldset>
  </div>
</template>
