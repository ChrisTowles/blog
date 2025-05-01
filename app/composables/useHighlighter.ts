import { createHighlighter, createJavaScriptRegexEngine, type HighlighterGeneric } from 'shiki'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let highlighter: HighlighterGeneric<any, any> | null = null
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let promise: Promise<HighlighterGeneric<any, any>> | null = null

export const useHighlighter = async () => {
  if (!promise) {
    promise = createHighlighter({
      // note: mermaid is not supported in shiki web bundle, and issue with full bundle.
      langs: ['vue', 'js', 'ts', 'css', 'html', 'json', 'yaml', 'markdown', 'bash', 'python'],
      themes: ['material-theme-palenight', 'material-theme-lighter'],
      engine: createJavaScriptRegexEngine()
    })
  }
  if (!highlighter) {
    highlighter = await promise
  }

  return highlighter
}
