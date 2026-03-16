export interface ThemeConfig {
  name: string;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  successColor: string;
  highlightColor: string;
  backgroundColor: string;
  cardBackground: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  mascotEmoji: string;
}

const BUILT_IN_THEMES: ThemeConfig[] = [
  {
    name: 'bluey',
    label: 'Bluey',
    primaryColor: '#4da8da',
    secondaryColor: '#ffb5c2',
    accentColor: '#f4845f',
    successColor: '#7ec8a0',
    highlightColor: '#ffd166',
    backgroundColor: '#fff8f0',
    cardBackground: '#ffffff',
    textColor: '#2d3748',
    fontFamily: "'Nunito', 'Rounded Mplus 1c', sans-serif",
    borderRadius: '1rem',
    mascotEmoji: '🐶',
  },
  {
    name: 'bedtime',
    label: 'Bedtime',
    primaryColor: '#c9a84c',
    secondaryColor: '#7b8fb2',
    accentColor: '#d4a44c',
    successColor: '#6b9b7a',
    highlightColor: '#e8c55a',
    backgroundColor: '#0f1729',
    cardBackground: '#1a2540',
    textColor: '#e8dcc8',
    fontFamily: "'Nunito', 'Rounded Mplus 1c', sans-serif",
    borderRadius: '1rem',
    mascotEmoji: '🌙',
  },
];

const THEME_STORAGE_KEY = 'reading-theme';

export function useReadingTheme() {
  const activeThemeName = useState<string>('reading-theme-name', () => 'bluey');
  const themes = useState<ThemeConfig[]>('reading-themes', () => [...BUILT_IN_THEMES]);

  const activeTheme = computed(
    () => themes.value.find((t) => t.name === activeThemeName.value) ?? BUILT_IN_THEMES[0]!,
  );

  function applyTheme(theme: ThemeConfig) {
    if (!import.meta.client) return;
    const el = document.querySelector('.reading-theme') as HTMLElement | null;
    if (!el) return;
    // Set BOTH raw palette AND semantic tokens so all components update
    el.style.setProperty('--reading-sky-blue', theme.primaryColor);
    el.style.setProperty('--reading-pink', theme.secondaryColor);
    el.style.setProperty('--reading-orange', theme.accentColor);
    el.style.setProperty('--reading-green', theme.successColor);
    el.style.setProperty('--reading-yellow', theme.highlightColor);
    el.style.setProperty('--reading-cream', theme.backgroundColor);
    el.style.setProperty('--reading-white', theme.cardBackground);
    el.style.setProperty('--reading-text', theme.textColor);
    // Also set semantic tokens directly for components that use them
    el.style.setProperty('--reading-primary', theme.primaryColor);
    el.style.setProperty('--reading-secondary', theme.secondaryColor);
    el.style.setProperty('--reading-accent', theme.accentColor);
    el.style.setProperty('--reading-success', theme.successColor);
    el.style.setProperty('--reading-highlight', theme.highlightColor);
    el.style.setProperty('--reading-bg', theme.backgroundColor);
    el.style.setProperty('--reading-card-bg', theme.cardBackground);
    el.style.setProperty('--reading-font-display', theme.fontFamily);
    el.style.setProperty('--reading-font-body', theme.fontFamily);
    el.style.setProperty('--reading-radius', theme.borderRadius);
    el.style.setProperty('--reading-radius-lg', `calc(${theme.borderRadius} * 1.5)`);
  }

  function setTheme(name: string) {
    activeThemeName.value = name;
    const theme = themes.value.find((t) => t.name === name);
    if (theme) {
      applyTheme(theme);
      if (import.meta.client) {
        localStorage.setItem(THEME_STORAGE_KEY, name);
      }
    }
  }

  function addTheme(theme: ThemeConfig) {
    const existing = themes.value.findIndex((t) => t.name === theme.name);
    if (existing >= 0) {
      themes.value[existing] = theme;
    } else {
      themes.value.push(theme);
    }
  }

  function initTheme() {
    if (!import.meta.client) return;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && themes.value.some((t) => t.name === stored)) {
      setTheme(stored);
    }
  }

  function removeTheme(name: string) {
    // Can't remove built-in themes
    if (BUILT_IN_THEMES.some((t) => t.name === name)) return;
    themes.value = themes.value.filter((t) => t.name !== name);
    if (activeThemeName.value === name) {
      setTheme('bluey');
    }
  }

  function isBuiltIn(name: string) {
    return BUILT_IN_THEMES.some((t) => t.name === name);
  }

  return {
    themes: computed(() => themes.value),
    activeTheme,
    activeThemeName: computed(() => activeThemeName.value),
    setTheme,
    addTheme,
    removeTheme,
    isBuiltIn,
    initTheme,
  };
}
