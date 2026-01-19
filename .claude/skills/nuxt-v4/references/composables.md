# Composables - Advanced Patterns

Advanced patterns for writing production-ready composables in Nuxt 4.

## Table of Contents

- [Naming Conventions](#naming-conventions)
- [useState vs ref](#usestate-vs-ref)
- [SSR-Safe Patterns](#ssr-safe-patterns)
- [Error Handling](#error-handling)
- [TypeScript Patterns](#typescript-patterns)
- [Testing Composables](#testing-composables)
- [Advanced Patterns](#advanced-patterns)

## Naming Conventions

### Always Use `use` Prefix

```typescript
// ✅ Good
export const useAuth = () => {
  /* ... */
};
export const useCart = () => {
  /* ... */
};
export const useUserProfile = () => {
  /* ... */
};

// ❌ Bad
export const auth = () => {
  /* ... */
};
export const getCart = () => {
  /* ... */
};
```

### Be Specific and Descriptive

```typescript
// ✅ Good - Clear purpose
export const useUserAuthentication = () => {
  /* ... */
};
export const useShoppingCart = () => {
  /* ... */
};
export const useProductSearch = () => {
  /* ... */
};

// ❌ Bad - Vague names
export const useUser = () => {
  /* ... */
};
export const useData = () => {
  /* ... */
};
export const useStore = () => {
  /* ... */
};
```

### Namespace for Large Apps

```typescript
// Group related composables with consistent prefixes
// Auth-related
export const useAuthSession = () => {
  /* ... */
};
export const useAuthPermissions = () => {
  /* ... */
};
export const useAuthMFA = () => {
  /* ... */
};

// Cart-related
export const useCartItems = () => {
  /* ... */
};
export const useCartTotal = () => {
  /* ... */
};
export const useCartCheckout = () => {
  /* ... */
};
```

## useState vs ref

### The Golden Rule

> Use `useState` for **shared state** that persists across component unmounts.
> Use `ref` for **local state** specific to a single component instance.

### When to Use useState

```typescript
// ✅ Authentication - shared across all components
export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null);
  const isAuthenticated = computed(() => !!user.value);

  return { user, isAuthenticated };
};

// ✅ Shopping cart - persists during navigation
export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => []);
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  return { items, total };
};

// ✅ UI theme - global setting
export const useTheme = () => {
  const isDark = useState('theme-dark', () => false);
  const toggle = () => {
    isDark.value = !isDark.value;
  };

  return { isDark, toggle };
};

// ✅ Global notifications
export const useNotifications = () => {
  const notifications = useState<Notification[]>('notifications', () => []);

  const add = (notification: Notification) => {
    notifications.value.push(notification);
  };

  const remove = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return { notifications, add, remove };
};
```

### When to Use ref

```typescript
// ✅ Form input - local to component
export const useContactForm = () => {
  const name = ref('');
  const email = ref('');
  const message = ref('');
  const isSubmitting = ref(false);

  return { name, email, message, isSubmitting };
};

// ✅ Component visibility - local toggle
export const useModal = () => {
  const isOpen = ref(false);
  const open = () => {
    isOpen.value = true;
  };
  const close = () => {
    isOpen.value = false;
  };

  return { isOpen, open, close };
};

// ✅ Loading state - per-component
export const useLoading = () => {
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  return { isLoading, error };
};

// ✅ Temporary UI state
export const useDropdown = () => {
  const isExpanded = ref(false);
  const selectedIndex = ref(-1);

  return { isExpanded, selectedIndex };
};
```

### Common Mistake

```typescript
// ❌ WRONG: Using ref for shared state
export const useAuth = () => {
  const user = ref(null); // Creates new instance every call!
  return { user };
};

// Component A sets user
const { user } = useAuth();
user.value = { name: 'John' };

// Component B gets different instance!
const { user: user2 } = useAuth();
console.log(user2.value); // null - NOT 'John'!
```

## SSR-Safe Patterns

### Browser API Guards

```typescript
// ✅ Safe: Guard localStorage in useState initializer
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const data = useState<T>(key, () => {
    // Only access localStorage on client
    if (import.meta.client) {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    }
    return defaultValue;
  });

  // Watch and sync to localStorage
  watch(
    data,
    (newValue) => {
      if (import.meta.client) {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    { deep: true },
  );

  return data;
};
```

### Lifecycle Methods

```typescript
// ✅ Safe: Use onMounted for browser APIs
export const useWindowSize = () => {
  const width = ref(0);
  const height = ref(0);

  onMounted(() => {
    const updateSize = () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    onUnmounted(() => {
      window.removeEventListener('resize', updateSize);
    });
  });

  return { width, height };
};
```

### Storage Operations

```typescript
// ✅ Safe: Check environment before storage access
export const useSessionStorage = <T>(key: string, defaultValue: T) => {
  const data = ref<T>(defaultValue);

  onMounted(() => {
    const stored = sessionStorage.getItem(key);
    if (stored) {
      data.value = JSON.parse(stored);
    }
  });

  watch(
    data,
    (newValue) => {
      if (import.meta.client) {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    },
    { deep: true },
  );

  return data;
};
```

## Error Handling

### Expose Error State

```typescript
export const useApi = <T>(url: string) => {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  const execute = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      data.value = await $fetch<T>(url);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      throw err; // Re-throw for caller handling
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, execute };
};
```

### Authentication with Error Handling

```typescript
export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null);
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch<{ user: User }>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      user.value = response.user;
      return response;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Login failed');
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' });
      user.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Logout failed');
    }
  };

  return {
    user: readonly(user),
    error: readonly(error),
    isLoading: readonly(isLoading),
    login,
    logout,
  };
};
```

## TypeScript Patterns

### Full Type Safety

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  permissions: string[];
}

export const useAuth = () => {
  const state = useState<AuthState>('auth', () => ({
    user: null,
    isAuthenticated: false,
    permissions: [],
  }));

  const hasPermission = (permission: string): boolean => {
    return state.value.permissions.includes(permission);
  };

  const isAdmin = computed(() => state.value.user?.role === 'admin');

  return {
    ...toRefs(state.value),
    hasPermission,
    isAdmin,
  };
};
```

### Generic Composables

```typescript
export const usePagination = <T>(items: Ref<T[]>, options: { pageSize?: number } = {}) => {
  const { pageSize = 10 } = options;

  const currentPage = ref(1);
  const totalPages = computed(() => Math.ceil(items.value.length / pageSize));

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return items.value.slice(start, start + pageSize);
  });

  const goToPage = (page: number) => {
    currentPage.value = Math.max(1, Math.min(page, totalPages.value));
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage: () => goToPage(currentPage.value + 1),
    prevPage: () => goToPage(currentPage.value - 1),
  };
};
```

## Testing Composables

### Basic Test

```typescript
// composables/useCounter.test.ts
import { describe, it, expect } from 'vitest';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('starts at 0', () => {
    const { count } = useCounter();
    expect(count.value).toBe(0);
  });

  it('increments', () => {
    const { count, increment } = useCounter();
    increment();
    expect(count.value).toBe(1);
  });
});
```

### Async Composable Test

```typescript
// composables/useApi.test.ts
import { describe, it, expect, vi } from 'vitest';
import { useApi } from './useApi';

global.$fetch = vi.fn();

describe('useApi', () => {
  it('fetches data', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    global.$fetch.mockResolvedValue(mockData);

    const { data, execute } = useApi('/api/items');
    await execute();

    expect(data.value).toEqual(mockData);
  });

  it('handles errors', async () => {
    global.$fetch.mockRejectedValue(new Error('Network error'));

    const { error, execute } = useApi('/api/items');

    await expect(execute()).rejects.toThrow();
    expect(error.value?.message).toBe('Network error');
  });
});
```

## Advanced Patterns

### Polling

```typescript
export const usePolling = <T>(fetcher: () => Promise<T>, interval: number = 5000) => {
  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isPolling = ref(false);
  let timeoutId: NodeJS.Timeout | null = null;

  const poll = async () => {
    try {
      data.value = await fetcher();
      error.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    }

    if (isPolling.value) {
      timeoutId = setTimeout(poll, interval);
    }
  };

  const start = () => {
    isPolling.value = true;
    poll();
  };

  const stop = () => {
    isPolling.value = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  onUnmounted(stop);

  return { data, error, isPolling, start, stop };
};
```

### Debouncing

```typescript
export const useDebouncedRef = <T>(initialValue: T, delay: number = 300) => {
  const value = ref<T>(initialValue);
  const debouncedValue = ref<T>(initialValue);
  let timeoutId: NodeJS.Timeout | null = null;

  watch(value, (newValue) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue as T;
    }, delay);
  });

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });

  return { value, debouncedValue };
};
```

### Throttling

```typescript
export const useThrottle = <T extends (...args: any[]) => any>(fn: T, limit: number = 300) => {
  const lastRan = ref(0);
  const lastFunc = ref<NodeJS.Timeout | null>(null);

  const throttled = (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRan.value >= limit) {
      fn(...args);
      lastRan.value = now;
    } else {
      if (lastFunc.value) clearTimeout(lastFunc.value);

      lastFunc.value = setTimeout(
        () => {
          fn(...args);
          lastRan.value = Date.now();
        },
        limit - (now - lastRan.value),
      );
    }
  };

  onUnmounted(() => {
    if (lastFunc.value) clearTimeout(lastFunc.value);
  });

  return throttled;
};
```

### Async State Management

```typescript
export const useAsyncState = <T>(asyncFn: () => Promise<T>, initialValue: T) => {
  const state = ref<T>(initialValue);
  const isReady = ref(false);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      state.value = await asyncFn();
      isReady.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
    } finally {
      isLoading.value = false;
    }
  };

  return {
    state: readonly(state),
    isReady: readonly(isReady),
    isLoading: readonly(isLoading),
    error: readonly(error),
    execute,
  };
};
```

### Composable Composition

```typescript
// Combine multiple composables for complex features
export const useAuthenticatedCart = () => {
  const { user, isAuthenticated } = useAuth();
  const { items, addItem, removeItem, total } = useCart();
  const { showToast } = useNotifications();

  const authenticatedAddItem = async (product: Product) => {
    if (!isAuthenticated.value) {
      showToast({ type: 'error', message: 'Please log in to add items' });
      return navigateTo('/login');
    }

    addItem(product);
    showToast({ type: 'success', message: `${product.name} added to cart` });
  };

  return {
    user,
    isAuthenticated,
    items,
    total,
    addItem: authenticatedAddItem,
    removeItem,
  };
};
```

## Best Practices

1. **Consistent `use` naming** - Always prefix with `use`
2. **Strategic useState/ref selection** - Shared vs local state
3. **SSR environment guards** - Check `import.meta.client` for browser APIs
4. **Explicit error exposure** - Return error refs
5. **TypeScript implementation** - Full type safety
6. **Readonly ref returns** - Prevent external mutations
7. **Lifecycle cleanup** - Remove listeners in `onUnmounted`
8. **Isolated testing** - Mock dependencies
9. **Single responsibility** - One concern per composable
10. **JSDoc documentation** - Document parameters and return values

## Common Pitfalls

- Using `ref` for globally shared state
- Omitting SSR safety checks
- Failing to clean up event listeners
- Exposing mutable state incorrectly
- Missing error handling
- Skipping TypeScript
- Inadequate testing
- Overly complex implementations

---

**Last Updated**: 2025-11-09
