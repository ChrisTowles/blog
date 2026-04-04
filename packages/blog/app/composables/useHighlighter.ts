import type { Highlighter } from 'shiki';
import { createHighlighter } from 'shiki';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

let highlighter: Highlighter | null = null;
let promise: Promise<Highlighter> | null = null;

export async function useHighlighter(): Promise<Highlighter> {
  if (!promise) {
    promise = createHighlighter({
      // note: mermaid is not supported in shiki web bundle, and issue with full bundle.
      langs: ['vue', 'js', 'ts', 'css', 'html', 'json', 'yaml', 'markdown', 'bash', 'python'],
      themes: ['material-theme-palenight', 'material-theme-lighter'],
      engine: createJavaScriptRegexEngine(),
    });
  }
  if (!highlighter) {
    highlighter = await promise;
  }

  return highlighter;
}
