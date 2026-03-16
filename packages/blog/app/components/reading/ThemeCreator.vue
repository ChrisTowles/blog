<script setup lang="ts">
import type { ThemeConfig } from '~/composables/useReadingTheme';

const { addTheme, setTheme } = useReadingTheme();

const PRESET_COLORS = [
  '#4da8da',
  '#ffb5c2',
  '#f4845f',
  '#7ec8a0',
  '#ffd166',
  '#a78bfa',
  '#f472b6',
  '#34d399',
  '#fb923c',
  '#60a5fa',
  '#f87171',
  '#facc15',
  '#2dd4bf',
  '#c084fc',
  '#818cf8',
  '#e879f9',
  '#4ade80',
  '#fbbf24',
  '#f97316',
  '#06b6d4',
];

const MASCOT_EMOJIS = [
  '🐶',
  '🐱',
  '🐻',
  '🦊',
  '🐼',
  '🐸',
  '🦄',
  '🐲',
  '🦋',
  '🐝',
  '🐢',
  '🐙',
  '🦁',
  '🐧',
  '🐨',
  '🐰',
  '🦖',
  '🐬',
  '🦩',
  '🐞',
  '🦉',
  '🐳',
  '🐯',
  '🐮',
];

const themeName = ref('');
const primaryColor = ref(PRESET_COLORS[0]!);
const secondaryColor = ref(PRESET_COLORS[1]!);
const accentColor = ref(PRESET_COLORS[2]!);
const successColor = ref(PRESET_COLORS[3]!);
const highlightColor = ref(PRESET_COLORS[4]!);
const mascotEmoji = ref('🦄');
const magicPrompt = ref('');
const isMagicLoading = ref(false);
const isEditing = ref(false);

function loadTheme(theme: ThemeConfig) {
  themeName.value = theme.label;
  primaryColor.value = theme.primaryColor;
  secondaryColor.value = theme.secondaryColor;
  accentColor.value = theme.accentColor;
  successColor.value = theme.successColor;
  highlightColor.value = theme.highlightColor;
  mascotEmoji.value = theme.mascotEmoji;
  isEditing.value = true;
}

defineExpose({ loadTheme });

type ColorKey = 'primary' | 'secondary' | 'accent' | 'success' | 'highlight';

const colorRefs: Record<ColorKey, Ref<string>> = {
  primary: primaryColor,
  secondary: secondaryColor,
  accent: accentColor,
  success: successColor,
  highlight: highlightColor,
};

function getColor(key: ColorKey): string {
  return colorRefs[key].value;
}

function setColor(key: ColorKey, value: string) {
  colorRefs[key].value = value;
}

const colorFields: { label: string; key: ColorKey }[] = [
  { label: 'Primary', key: 'primary' },
  { label: 'Secondary', key: 'secondary' },
  { label: 'Accent', key: 'accent' },
  { label: 'Success', key: 'success' },
  { label: 'Highlight', key: 'highlight' },
];

const activeFieldKey = ref<ColorKey>('primary');

const previewTheme = computed<ThemeConfig>(() => ({
  name: themeName.value.toLowerCase().replace(/\s+/g, '-') || 'custom',
  label: themeName.value || 'Custom Theme',
  primaryColor: primaryColor.value,
  secondaryColor: secondaryColor.value,
  accentColor: accentColor.value,
  successColor: successColor.value,
  highlightColor: highlightColor.value,
  backgroundColor: '#fff8f0',
  cardBackground: '#ffffff',
  textColor: '#2d3748',
  fontFamily: "'Nunito', 'Rounded Mplus 1c', sans-serif",
  borderRadius: '1rem',
  mascotEmoji: mascotEmoji.value,
}));

function saveTheme() {
  if (!themeName.value.trim()) return;
  const theme = previewTheme.value;
  addTheme(theme);
  setTheme(theme.name);
}

async function generateMagicTheme() {
  if (!magicPrompt.value.trim()) return;
  isMagicLoading.value = true;
  try {
    const result = await $fetch<{
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
      successColor: string;
      highlightColor: string;
      mascotEmoji: string;
      label: string;
    }>('/api/reading/theme/generate', {
      method: 'POST',
      body: { prompt: magicPrompt.value },
    });
    primaryColor.value = result.primaryColor;
    secondaryColor.value = result.secondaryColor;
    accentColor.value = result.accentColor;
    successColor.value = result.successColor;
    highlightColor.value = result.highlightColor;
    mascotEmoji.value = result.mascotEmoji;
    if (!themeName.value.trim()) {
      themeName.value = result.label;
    }
  } catch {
    // Silently fail — user can still pick colors manually
  } finally {
    isMagicLoading.value = false;
  }
}
</script>

<template>
  <div class="space-y-5">
    <h3
      class="text-lg font-bold text-[var(--reading-text)]"
      style="font-family: var(--reading-font-display)"
    >
      Create a Theme
    </h3>

    <!-- Magic Theme -->
    <div class="flex gap-2">
      <input
        v-model="magicPrompt"
        type="text"
        placeholder="Describe a theme... (e.g. ocean adventure)"
        class="flex-1 px-4 py-2 rounded-xl border-2 border-[var(--reading-secondary)]/30 bg-[var(--reading-card-bg)] text-sm focus:outline-none focus:border-[var(--reading-primary)]"
        @keydown.enter="generateMagicTheme"
      />
      <button
        class="reading-wobble-hover px-4 py-2 rounded-xl text-white text-sm font-bold transition-colors disabled:opacity-50"
        :style="{ backgroundColor: 'var(--reading-accent)' }"
        :disabled="isMagicLoading || !magicPrompt.trim()"
        @click="generateMagicTheme"
      >
        {{ isMagicLoading ? 'Thinking...' : '✨ Magic Theme' }}
      </button>
    </div>

    <!-- Theme Name -->
    <div>
      <label class="block text-sm font-semibold text-[var(--reading-text)] mb-1">Theme Name</label>
      <input
        v-model="themeName"
        type="text"
        placeholder="My Awesome Theme"
        class="w-full px-4 py-2 rounded-xl border-2 border-[var(--reading-secondary)]/30 bg-[var(--reading-card-bg)] text-sm focus:outline-none focus:border-[var(--reading-primary)]"
      />
    </div>

    <!-- Color Picker -->
    <div>
      <div class="flex gap-2 mb-2">
        <button
          v-for="field in colorFields"
          :key="field.key"
          class="px-3 py-1 rounded-full text-xs font-bold transition-all"
          :class="
            activeFieldKey === field.key
              ? 'text-white scale-105'
              : 'text-[var(--reading-text)] opacity-60'
          "
          :style="{
            backgroundColor: activeFieldKey === field.key ? getColor(field.key) : 'transparent',
          }"
          @click="activeFieldKey = field.key"
        >
          <span
            class="inline-block w-2 h-2 rounded-full mr-1"
            :style="{ backgroundColor: getColor(field.key) }"
          />
          {{ field.label }}
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in PRESET_COLORS"
          :key="color"
          class="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 cursor-pointer"
          :class="
            getColor(activeFieldKey) === color
              ? 'border-[var(--reading-text)] scale-110'
              : 'border-transparent'
          "
          :style="{ backgroundColor: color }"
          @click="setColor(activeFieldKey, color)"
        />
      </div>
    </div>

    <!-- Mascot Emoji Picker -->
    <div>
      <label class="block text-sm font-semibold text-[var(--reading-text)] mb-1">Mascot</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="emoji in MASCOT_EMOJIS"
          :key="emoji"
          class="w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-transform hover:scale-125 cursor-pointer"
          :class="
            mascotEmoji === emoji
              ? 'bg-[var(--reading-primary)]/20 scale-110 ring-2 ring-[var(--reading-primary)]'
              : ''
          "
          @click="mascotEmoji = emoji"
        >
          {{ emoji }}
        </button>
      </div>
    </div>

    <!-- Live Preview -->
    <div>
      <label class="block text-sm font-semibold text-[var(--reading-text)] mb-1">Preview</label>
      <div
        class="rounded-2xl p-4 border-2"
        :style="{
          backgroundColor: previewTheme.cardBackground,
          borderColor: previewTheme.primaryColor + '40',
        }"
      >
        <div class="flex items-center gap-3 mb-3">
          <span class="text-3xl">{{ previewTheme.mascotEmoji }}</span>
          <div>
            <p class="font-bold" :style="{ color: previewTheme.textColor }">
              {{ previewTheme.label }}
            </p>
            <div class="flex gap-1 mt-1">
              <span
                v-for="c in [
                  previewTheme.primaryColor,
                  previewTheme.secondaryColor,
                  previewTheme.accentColor,
                  previewTheme.successColor,
                  previewTheme.highlightColor,
                ]"
                :key="c"
                class="w-4 h-4 rounded-full"
                :style="{ backgroundColor: c }"
              />
            </div>
          </div>
        </div>
        <div class="flex gap-2">
          <span
            class="px-3 py-1 rounded-full text-xs text-white font-bold"
            :style="{ backgroundColor: previewTheme.primaryColor }"
          >
            Button
          </span>
          <span
            class="px-3 py-1 rounded-full text-xs font-bold"
            :style="{ backgroundColor: previewTheme.highlightColor, color: previewTheme.textColor }"
          >
            Highlight
          </span>
          <span
            class="px-3 py-1 rounded-full text-xs text-white font-bold"
            :style="{ backgroundColor: previewTheme.successColor }"
          >
            Success
          </span>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <button
      class="reading-wobble-hover w-full py-3 rounded-xl text-white font-bold text-sm transition-colors disabled:opacity-40"
      :style="{ backgroundColor: 'var(--reading-primary)' }"
      :disabled="!themeName.trim()"
      @click="saveTheme"
    >
      {{ isEditing ? 'Update & Apply Theme' : 'Save & Apply Theme' }}
    </button>
  </div>
</template>
