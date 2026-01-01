# Research: Braintrust + Claude Code Observability

## Summary

Yes, you can wire up Braintrust to capture Claude Code sessions. There are **three main approaches** with different tradeoffs:

1. **Braintrust Claude Plugin** - Official bidirectional integration
2. **Native Claude Code Hooks** - Built-in telemetry with OTEL
3. **Generic Telemetry Wrappers** - Third-party solutions like `claude_telemetry`

---

## Option 1: Braintrust Claude Plugin (Recommended)

### What It Does
Two-way plugin that:
- **Outbound**: Automatically captures sessions as hierarchical traces (conversations, tool calls, intermediate steps)
- **Inbound**: Query Braintrust data from terminal (logs, experiments, evaluations)

### Setup
```bash
# Install from marketplace
claude plugin marketplace add braintrustdata/braintrust-claude-plugin
claude plugin install trace-claude-code@braintrust-claude-plugin
claude plugin install braintrust@braintrust-claude-plugin

# Configure credentials
~/.claude/plugins/marketplaces/braintrust-claude-plugin/skills/trace-claude-code/setup.sh
```

### Config (in `~/.claude/settings.local.json`)
- `BRAINTRUST_CC_PROJECT`: Project name (default: "claude-code")
- `BRAINTRUST_API_KEY`: Auth credentials
- `BRAINTRUST_CC_DEBUG`: "true" for verbose logging
- `TRACE_TO_BRAINTRUST`: "false" to disable

### Prerequisites
- Claude Code installed
- `jq` (`brew install jq`)
- Braintrust API key

### What Gets Captured
- Full conversations
- Tool calls with inputs/outputs
- Intermediate reasoning steps
- Session metadata
- Hierarchical trace structure

### Sources
- [Braintrust Claude Code Integration Blog](https://www.braintrust.dev/blog/claude-code-braintrust-integration)
- [Setup Docs](https://www.braintrust.dev/docs/integrations/sdk-integrations/claude-code)

---

## Option 2: Native Claude Code Hooks + OpenTelemetry

Claude Code has built-in OTEL support - no wrappers needed.

### Enable Telemetry
```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_EXPORTER_OTLP_ENDPOINT=https://your-collector:4318
```

### Available Metrics
- `claude_code.cost.usage` - Session cost in USD
- `claude_code.token.usage` - Tokens consumed
- `claude_code.code_edit_tool.decision` - Accept/reject decisions
- `claude_code.active_time.total` - Active session time (seconds)

### Hook Events for Custom Logging
Configure in `~/.claude/settings.json` or `.claude/settings.json`:

| Event | When | Use Case |
|-------|------|----------|
| `SessionStart` | Session begins | Initialize context, set env vars |
| `SessionEnd` | Session ends | Cleanup, final logging |
| `UserPromptSubmit` | User sends prompt | Track inputs |
| `PreToolUse` | Before tool runs | Validate, block dangerous ops |
| `PostToolUse` | After tool completes | Log tool executions |
| `Stop` | Claude finishes | Record completion |
| `SubagentStop` | Subagent (Task) finishes | Track agent hierarchies |

### Hook Input (JSON via stdin)
```json
{
  "session_id": "abc123",
  "transcript_path": "/path/to/conversation.jsonl",
  "cwd": "/project/dir",
  "tool_name": "Bash",
  "tool_input": {...},
  "tool_response": {...}
}
```

### Example: PostToolUse Logger
```python
#!/usr/bin/env python3
import json, sys, datetime

data = json.load(sys.stdin)
with open("/var/log/claude-tools.log", "a") as f:
    f.write(f"{datetime.datetime.now()} | {data['session_id']} | {data.get('tool_name')}\n")
exit(0)
```

### Sources
- [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
- [SigNoz OpenTelemetry Guide](https://signoz.io/blog/claude-code-monitoring-with-opentelemetry/)

---

## Option 3: claude_telemetry Package

Third-party OTEL wrapper for multi-backend support.

### Install
```bash
pip install claude_telemetry
# or with Logfire
pip install "claude_telemetry[logfire]"
```

### Supported Backends
- Logfire (`LOGFIRE_TOKEN`)
- Sentry (`SENTRY_DSN`)
- Honeycomb
- Datadog
- Any OTLP-compatible backend

### What Gets Captured
Per execution:
- Prompt and system instructions
- Model used
- Token counts (input/output/total)
- Cost in USD
- Tool call count
- Execution time
- Errors

Per tool call:
- Tool name
- Inputs/outputs
- Execution time
- Success/failure

### Source
- [claude_telemetry GitHub](https://github.com/TechNickAI/claude_telemetry)

---

## Comparison Matrix

| Feature | Braintrust Plugin | Native OTEL | claude_telemetry |
|---------|------------------|-------------|------------------|
| Setup complexity | Low | Medium | Low |
| Query data from CLI | Yes | No | No |
| Hierarchical traces | Yes | Partial | Yes |
| Multi-backend | No (Braintrust only) | Yes | Yes |
| Token/cost tracking | Yes | Yes | Yes |
| Tool execution logs | Yes | Via hooks | Yes |
| Bidirectional | Yes | No | No |
| Vendor lock-in | Braintrust | None | None |

---

## Current Codebase State

Your blog repo has **zero LLM observability**:
- Anthropic SDK used directly without wrappers
- Agent SDK sessions not tracked
- `total_cost_usd` calculated but never persisted
- No token counting, latency metrics, or tool performance tracking
- Only `console.error()` for errors

Key files:
- `packages/blog/server/utils/ai/anthropic.ts` - Direct client, no tracing
- `packages/blog/server/utils/ai/agent.ts` - Agent SDK without logging
- `packages/blog/server/api/chats/[id].post.ts` - Streaming handler, no metrics

---

## Gaps & Opportunities

### For Claude Code Sessions (Personal Dev Workflow)
- Braintrust plugin gives immediate visibility
- Native hooks let you build custom dashboards
- Can export to existing monitoring (Grafana, Datadog)

### For Blog's AI Features (Production)
Would need separate integration:
- `wrapAnthropic()` around SDK client
- Schema updates for token/cost storage
- OTEL spans for RAG pipeline
- Error aggregation (Sentry?)

---

## Recommendations

### Quick Win: Install Braintrust Plugin
Get session visibility immediately without code changes.

### For Deeper Integration
1. Native hooks for custom metrics
2. `wrapAnthropic()` for Anthropic SDK calls in your app
3. OTEL exporter to your preferred backend

### Trade-offs
- Braintrust: Best UX, but vendor-specific
- Native OTEL: Most flexible, more setup
- claude_telemetry: Good middle ground for multi-backend

---

## Next Steps

Run the plan command to interview and build implementation:

```bash
/plan "docs/tasks/2026-01-01-braintrust-claude-code-observability/research.md"
```
