export function toolText(result: { content: ReadonlyArray<{ type: string; text?: string }> }) {
  const text = result.content[0]?.text;

  if (text === undefined) throw new Error('expected a text content block');

  return text;
}
