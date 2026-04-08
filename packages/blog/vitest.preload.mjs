// Preload script — runs before vitest via NODE_OPTIONS='--import'

// Suppress @nuxt/test-utils deprecation warning
// See: https://github.com/nuxt/test-utils/issues/1482
// TODO: Remove when @nuxt/test-utils fixes the transformMode deprecation
const originalWarn = console.warn;
console.warn = (...args) => {
  const msg = args[0];
  if (typeof msg === 'string' && msg.includes('transformMode') && msg.includes('deprecated')) {
    return;
  }
  originalWarn.apply(console, args);
};
