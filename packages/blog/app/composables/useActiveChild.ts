export function useActiveChild() {
  const activeChildId = useState<number | null>('activeChildId', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('reading:activeChildId');
      return stored ? parseInt(stored, 10) : null;
    }
    return null;
  });

  function setActiveChild(childId: number) {
    activeChildId.value = childId;
    if (import.meta.client) {
      localStorage.setItem('reading:activeChildId', String(childId));
    }
  }

  function clearActiveChild() {
    activeChildId.value = null;
    if (import.meta.client) {
      localStorage.removeItem('reading:activeChildId');
    }
  }

  return {
    activeChildId: readonly(activeChildId),
    setActiveChild,
    clearActiveChild,
  };
}
