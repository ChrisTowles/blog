const BEDTIME_STORAGE_KEY = 'reading-bedtime-mode';

export function useBedtimeMode() {
  const isActive = useState<boolean>('bedtime-mode', () => false);
  const { setTheme, activeThemeName } = useReadingTheme();

  const previousTheme = useState<string>('bedtime-previous-theme', () => 'bluey');

  const isBedtimeHour = computed(() => {
    if (!import.meta.client) return false;
    return new Date().getHours() >= 19;
  });

  const shouldSuggest = computed(() => {
    if (!import.meta.client) return false;
    if (isActive.value) return false;
    if (!isBedtimeHour.value) return false;
    const dismissed = sessionStorage.getItem('bedtime-suggestion-dismissed');
    return !dismissed;
  });

  function activate() {
    previousTheme.value = activeThemeName.value;
    isActive.value = true;
    setTheme('bedtime');
    if (import.meta.client) {
      localStorage.setItem(BEDTIME_STORAGE_KEY, 'true');
    }
  }

  function deactivate() {
    isActive.value = false;
    setTheme(previousTheme.value);
    if (import.meta.client) {
      localStorage.removeItem(BEDTIME_STORAGE_KEY);
    }
  }

  function toggle() {
    if (isActive.value) {
      deactivate();
    } else {
      activate();
    }
  }

  function dismissSuggestion() {
    if (import.meta.client) {
      sessionStorage.setItem('bedtime-suggestion-dismissed', 'true');
    }
  }

  function initBedtimeMode() {
    if (!import.meta.client) return;
    const stored = localStorage.getItem(BEDTIME_STORAGE_KEY);
    if (stored === 'true') {
      activate();
    }
  }

  return {
    isActive: readonly(isActive),
    isBedtimeHour,
    shouldSuggest,
    activate,
    deactivate,
    toggle,
    dismissSuggestion,
    initBedtimeMode,
  };
}
