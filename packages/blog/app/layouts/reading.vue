<script setup lang="ts">
// Reading app layout - completely isolated from main blog
// No AppHeader, AppFooter, or shared blog components

const route = useRoute()

// Reading app navigation items (simple and kid-friendly)
const navItems = [
  {
    label: 'Practice',
    to: '/reading/practice',
    icon: 'i-lucide-book-open'
  },
  {
    label: 'Profile',
    to: '/reading/profile',
    icon: 'i-lucide-user'
  },
  {
    label: 'Home',
    to: '/reading',
    icon: 'i-lucide-home'
  }
]

// Check if we're on a specific route
const isActivePath = (path: string) => {
  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <div class="reading-app">
    <!-- Simple kid-friendly navigation bar -->
    <nav class="reading-nav">
      <div class="reading-nav-container">
        <div class="reading-logo">
          📚 KidsReader
        </div>

        <div class="reading-nav-items">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="reading-nav-link"
            :class="{ active: isActivePath(item.to) }"
          >
            <UIcon :name="item.icon" class="reading-nav-icon" />
            <span class="reading-nav-label">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Main content area -->
    <main class="reading-main">
      <slot />
    </main>

    <!-- Optional footer with simple info -->
    <footer class="reading-footer">
      <div class="reading-footer-content">
        <p>Keep practicing! 🌟</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Reset and base styles for reading app */
.reading-app {
  /* Complete style reset to prevent inheritance */
  all: initial;
  display: block;
  min-height: 100vh;

  /* Kid-friendly color scheme */
  background: linear-gradient(to bottom, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%);
  font-family: 'Segoe UI', 'Comic Sans MS', 'Arial Rounded MT Bold', 'Chalkboard SE', 'Helvetica Neue', sans-serif;
  color: #1e293b;

  /* Custom CSS variables for reading app */
  --reading-color-slow: #3b82f6;
  --reading-color-fast: #ef4444;
  --reading-color-sight: #f97316;
  --reading-color-success: #10b981;
  --reading-color-primary: #8b5cf6;
  --reading-color-bg: #ffffff;
  --reading-spacing-sm: 0.5rem;
  --reading-spacing-md: 1rem;
  --reading-spacing-lg: 2rem;
  --reading-border-radius: 1rem;
  --reading-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --reading-touch-min: 44px;
}

/* Navigation bar */
.reading-nav {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: var(--reading-spacing-md);
  position: sticky;
  top: 0;
  z-index: 50;
}

.reading-nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--reading-spacing-lg);
}

.reading-logo {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--reading-color-primary);
  user-select: none;
}

.reading-nav-items {
  display: flex;
  gap: var(--reading-spacing-sm);
}

.reading-nav-link {
  all: unset;
  display: flex;
  align-items: center;
  gap: var(--reading-spacing-sm);
  padding: var(--reading-spacing-sm) var(--reading-spacing-md);
  border-radius: var(--reading-border-radius);
  background: #f1f5f9;
  color: #475569;
  font-weight: 600;
  font-size: 1rem;
  min-height: var(--reading-touch-min);
  min-width: var(--reading-touch-min);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.reading-nav-link:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
  box-shadow: var(--reading-shadow);
}

.reading-nav-link.active {
  background: var(--reading-color-primary);
  color: white;
}

.reading-nav-icon {
  font-size: 1.25rem;
}

.reading-nav-label {
  font-size: 1rem;
}

/* Main content area */
.reading-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--reading-spacing-lg);
  min-height: calc(100vh - 180px);
}

/* Footer */
.reading-footer {
  background: white;
  padding: var(--reading-spacing-lg);
  text-align: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.reading-footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.reading-footer-content p {
  all: unset;
  display: block;
  font-size: 1.125rem;
  color: #64748b;
  font-weight: 500;
  margin: 0;
}

/* Responsive design for tablets and mobile */
@media (max-width: 768px) {
  .reading-nav-label {
    display: none;
  }

  .reading-main {
    padding: var(--reading-spacing-md);
  }

  .reading-logo {
    font-size: 1.25rem;
  }
}

/* Tablet landscape optimization (primary target) */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .reading-main {
    padding: var(--reading-spacing-lg) var(--reading-spacing-md);
  }

  .reading-logo {
    font-size: 1.75rem;
  }
}

/* Prevent double-tap zoom on touch devices */
@media (hover: none) and (pointer: coarse) {
  .reading-nav-link,
  .reading-app * {
    touch-action: manipulation;
  }
}
</style>
