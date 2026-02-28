# Blog Prompts Evaluation Suite

Promptfoo-based evaluation suite for testing all AI prompts used in the blog.

## Quick Start

```bash
# Run chatbot eval
pnpm eval

# Run a specific eval
pnpm eval:title
pnpm eval:artifacts
pnpm eval:loan
pnpm eval:redteam

# Run all evals
pnpm eval:all

# Watch mode + UI
pnpm eval:watch   # Terminal 1
pnpm eval:view    # Terminal 2

# Run sync tests (no API key needed)
pnpm test
```

## Structure

```
packages/evals/
├── promptfooconfig.yaml           # Chatbot eval (main)
├── promptfooconfig.title.yaml     # Title generation eval
├── promptfooconfig.artifacts.yaml # Code execution eval
├── promptfooconfig.loan.yaml      # Loan intake eval
├── promptfooconfig.redteam.yaml   # Red-team security eval
├── promptfooconfig.test.yaml      # Echo smoke test (no API key)
├── prompts/
│   ├── chatbot-system.txt         # Blog chatbot system prompt
│   ├── title-gen.txt              # Title generation prompt (sync source)
│   ├── title-gen-eval.txt         # Title gen with {{query}} for eval
│   ├── artifacts.txt              # Artifacts prompt (sync source)
│   ├── artifacts-eval.txt         # Artifacts with {{query}} for eval
│   └── loan-intake.txt            # Loan intake prompt (sync source)
├── providers/
│   └── loan-provider.ts           # Custom provider with loan tool calling
├── provider-anthropic.ts          # Custom provider with blog tool calling
├── tools/
│   ├── blog-tools.ts              # Blog search, weather, dice tools
│   └── loan-tools.ts              # Loan updateApplication, checkCompleteness
├── test-cases/
│   ├── chatbot-functional.yaml    # Chatbot behavior tests
│   ├── chatbot-regression.yaml    # Chatbot regression tests
│   ├── title-gen.yaml             # Title generation tests
│   ├── artifacts.yaml             # Code execution tests
│   └── loan-intake.yaml           # Loan intake tests
├── prompt-sync.test.ts            # Vitest: prompt file ↔ source sync
├── run-eval.ts                    # Eval runner with .env loading
└── outputs/                       # Results (gitignored)
```

## Prompt Sync Tests

Each prompt text file has a corresponding sync test that verifies it matches the source module. Run `pnpm test` to check — no API key required.

| Prompt file | Source module |
|---|---|
| `chatbot-system.txt` | `server/utils/ai/agent.ts` → `SYSTEM_PROMPT` |
| `title-gen.txt` | `server/utils/ai/chat-prompts.ts` → `TITLE_GENERATION_PROMPT` |
| `artifacts.txt` | `server/utils/ai/artifacts-prompts.ts` → `ARTIFACTS_SYSTEM_PROMPT` |
| `loan-intake.txt` | `server/utils/ai/loan-system-prompt.ts` → `LOAN_INTAKE_SYSTEM_PROMPT` |

## Eval Configs

| Config | Provider | Tests | Description |
|---|---|---|---|
| `promptfooconfig.yaml` | Custom (blog tools) | Functional + regression | Main chatbot eval |
| `promptfooconfig.title.yaml` | Built-in Haiku 4.5 | 5 deterministic | Title ≤30 chars, no punctuation |
| `promptfooconfig.artifacts.yaml` | Built-in Haiku 4.5 | 4 deterministic | Code blocks, print, file output |
| `promptfooconfig.loan.yaml` | Custom (loan tools) | 6 mixed | Tool calls, SSN refusal, tone |
| `promptfooconfig.redteam.yaml` | Custom (blog tools) | Auto-generated | Security: jailbreak, PII, injection |

## CI

The `prompt-eval.yml` workflow runs:
- **sync-check** on PRs touching evals or prompt source files
- **full-eval** weekly (Monday 6am UTC) and on manual dispatch

## Troubleshooting

**API Key not found**: Set `ANTHROPIC_API_KEY` in `.env` at repo root.

**Promptfoo not found**: Run `pnpm install`.
