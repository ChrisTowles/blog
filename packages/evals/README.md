# Blog Prompts Evaluation Suite

Promptfoo-based evaluation suite for testing AI prompts used in the blog.

## Quick Start with UI

Promptfoo has a built-in web UI for interactive test viewing and iteration:

```bash
# Terminal 1: Run tests in watch mode (auto-runs on file changes)
pnpm eval:watch

# Terminal 2: View results in browser UI
pnpm eval:view
```

The UI provides:

- ✅ Interactive test results with pass/fail status
- 📊 Full prompt/response pairs for each test
- 📈 Token usage stats and cost tracking
- 🔍 Side-by-side comparisons across model versions
- 📝 Detailed assertion results

**Workflow**: Edit prompts or tests → watch auto-runs → refresh browser to see results

## Usage

### Run evaluations

```bash
# From packages/evals
pnpm eval

# Or from root
pnpm --filter @chris-towles/evals eval
```

### Watch mode (auto-run on changes)

```bash
pnpm eval:watch
```

### CI mode (outputs JSON)

```bash
pnpm eval:ci
```

### View results

```bash
pnpm eval:view
```

## Structure

```
packages/evals/
├── promptfooconfig.yaml    # Main configuration
├── prompts/
│   └── chatbot-system.txt  # Chatbot system prompt
├── test-cases/             # Test case definitions (YAML)
├── tools/                  # Tool implementations for testing
└── outputs/                # Test results (gitignored)
```

## Prompts

### Chatbot System Prompt

**Source**: `packages/blog/server/utils/ai/agent.ts:11-38`
**Version**: 2026-01-03
**File**: `prompts/chatbot-system.txt`

Key requirements:

- ALWAYS use searchBlogContent tool first
- NO markdown headings (#, ##, etc.)
- Use **bold** for emphasis instead
- Friendly, professional tone

## Test Cases

Test cases are defined in `test-cases/*.yaml` and cover:

- **Functional behavior**: Tool calling accuracy, format validation
- **Regression tests**: Real user queries, edge cases
- **Quality checks**: Response relevance, coherence

## Phase 1 Status: ✅ COMPLETE

- [x] Package structure created
- [x] Dependencies installed (promptfoo, @anthropic-ai/sdk)
- [x] Promptfoo configured for Claude Haiku 4.5
- [x] Chatbot system prompt extracted
- [x] Basic test case added
- [x] Can run `pnpm eval` (requires API key)

## Next Steps (Phase 2)

- [ ] Create comprehensive test suite (`test-cases/chatbot-functional.yaml`)
- [ ] Add regression test dataset
- [ ] Implement real tool execution for testing
- [ ] Add LLM-as-judge quality assertions

## Model Configuration

**Baseline**: Claude Sonnet 4 (claude-sonnet-4-20250514)
**Comparison**: Haiku 4.5, Opus 4 (for cost/quality benchmarking)

See `promptfooconfig.yaml` for provider configuration.

## Troubleshooting

### API Key not found

Make sure `ANTHROPIC_API_KEY` is set in your environment or `.env` file.

### Promptfoo command not found

Run `pnpm install` to install dependencies including promptfoo CLI.

## Resources

- [Promptfoo Documentation](https://www.promptfoo.dev/)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [Project Plan](../../docs/tasks/2026-01-03-promptfoo-integration/plan.md)
