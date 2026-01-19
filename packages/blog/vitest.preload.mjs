// Preload script to suppress @nuxt/test-utils deprecation warning from 2026-01-04
// Must run before vitest loads to catch environment init warnings
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
