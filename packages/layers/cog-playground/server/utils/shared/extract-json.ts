/**
 * Pull the first balanced JSON object out of a model reply. Tolerates
 * leading/trailing prose. Returns the raw JSON substring, or null when
 * no balanced object can be found.
 *
 * Shared across the cog-playground scorers (recall, clock, fluency,
 * verbal) so each can be a thin caller of the model + parser pair.
 */
export function extractJson(text: string): string | null {
  const start = text.indexOf('{');
  if (start === -1) return null;
  let depth = 0;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}
