import type { LocationQueryValue } from 'vue-router';

export function firstQueryValue(
  value: LocationQueryValue | LocationQueryValue[] | undefined,
): string | undefined {
  const first = Array.isArray(value) ? value[0] : value;

  return first ?? undefined;
}
