interface ModelEntry {
  name: string
  // cost: string;
  max_tokens: number
}
export const modelsList = {
  // https://docs.anthropic.com/en/docs/about-claude/models/all-models
  models: [
    // TODO, only use for logged in users.
    { name: `claude-3-7-sonnet-latest`, max_tokens: 10_000 }, // cost: $3 / MTok
    { name: `claude-3-5-haiku-latest`, max_tokens: 8192 } // cost: $0.80 / MTok

  ] satisfies ModelEntry[],
  default_model: 'claude-3-5-haiku-latest'
}
