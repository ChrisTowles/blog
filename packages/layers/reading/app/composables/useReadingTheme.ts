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
  system?: boolean; // system themes can't be edited or deleted
}

const SYSTEM_THEMES: ThemeConfig[] = [
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
    system: true,
  },
  {
    name: 'princess',
    label: 'Princess',
    primaryColor: '#e91e8c',
    secondaryColor: '#c084fc',
    accentColor: '#f472b6',
    successColor: '#a78bfa',
    highlightColor: '#fbbf24',
    backgroundColor: '#fdf2f8',
    cardBackground: '#ffffff',
    textColor: '#831843',
    fontFamily: "'Nunito', 'Rounded Mplus 1c', sans-serif",
    borderRadius: '1.25rem',
    mascotEmoji: '👸',
    system: true,
  },
];

const THEME_STORAGE_KEY = 'reading-theme';
const USER_THEMES_STORAGE_KEY = 'reading-user-themes';

export function useReadingTheme() {
  const activeThemeName = useState<string>('reading-theme-name', () => 'bluey');
  const userThemes = useState<ThemeConfig[]>('reading-user-themes', () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(USER_THEMES_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch {}
    }
    return [];
  });

  const themes = computed(() => [...SYSTEM_THEMES, ...userThemes.value]);

  const activeTheme = computed(
    () => themes.value.find((t) => t.name === activeThemeName.value) ?? SYSTEM_THEMES[0]!,
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

  function saveUserThemes() {
    if (import.meta.client) {
      localStorage.setItem(USER_THEMES_STORAGE_KEY, JSON.stringify(userThemes.value));
    }
  }

  function addTheme(theme: ThemeConfig) {
    // Can't overwrite system themes
    if (SYSTEM_THEMES.some((t) => t.name === theme.name)) return;

    const userTheme = { ...theme, system: false };
    const existing = userThemes.value.findIndex((t) => t.name === theme.name);
    if (existing >= 0) {
      userThemes.value[existing] = userTheme;
    } else {
      userThemes.value.push(userTheme);
    }
    saveUserThemes();
  }

  function removeTheme(name: string) {
    if (isSystem(name)) return;
    userThemes.value = userThemes.value.filter((t) => t.name !== name);
    saveUserThemes();
    if (activeThemeName.value === name) {
      setTheme('bluey');
    }
  }

  function isSystem(name: string) {
    return SYSTEM_THEMES.some((t) => t.name === name);
  }

  function initTheme() {
    if (!import.meta.client) return;
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && themes.value.some((t) => t.name === stored)) {
      setTheme(stored);
    }
  }

  return {
    themes,
    activeTheme,
    activeThemeName: computed(() => activeThemeName.value),
    setTheme,
    addTheme,
    removeTheme,
    isSystem,
    initTheme,
  };
}
