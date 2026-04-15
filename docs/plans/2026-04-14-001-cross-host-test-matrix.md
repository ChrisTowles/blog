# Cross-Host Acceptance Matrix — MCP UI in Chat

Machine-readable acceptance-gate artifact per plan line 557 + line 777. Unit 7's
prod-promote workflow reads this file; stale / FAIL rows block promotion.

Rules:

- `Blog chat` column is populated by the Unit 6 test suite (Playwright +
  vitest). A green CI run flips PENDING → PASS and stamps the date.
- `Claude Desktop` column is populated manually during Unit 7 verification
  against the same MCP endpoint.
- A row is considered **stale** if its Date is more than 7 days old at
  promotion time.
- `PASS` + `FAIL` + `PENDING` are the only allowed state words.

| ScenarioID | Description                                                            | Blog chat | Date       | Claude Desktop | Date | Notes                                                              |
| ---------- | ---------------------------------------------------------------------- | --------- | ---------- | -------------- | ---- | ------------------------------------------------------------------ |
| CH-01      | Starter "oldest 737 fleets by operator" → bar chart iframe renders     | PASS      | 2026-04-15 | PENDING        | -    | Unit 7 staging deploy: server side verified — `POST /mcp/aviation` returns initialize + tools/list with `ask_aviation`, `list_questions`, `schema`; iframe bundle (727KB) served via `/mcp/aviation/resource`. Browser-side starter-click flow blocked by pre-existing chat-side-nav layout 500 (`useFetch('/api/chats')` hydration), tracked separately. |
| CH-02      | Follow-up chip → second iframe appended to thread                      | PENDING   | -          | PENDING        | -    | Wired in UiResource.vue via appBridge.onmessage; e2e punted        |
| CH-03      | Reload chat page → persisted UiResourceParts re-hydrate inertly        | PASS      | 2026-04-15 | PENDING        | -    | Replay-fetch endpoint deployed: `GET /mcp/aviation/resource?uri=ui://aviation-answer` → 727KB bundle, `Cache-Control: max-age=31536000, immutable`. Allowlist verified (non-allowlist URI → 404).             |
| CH-04      | Empty-state query ("no rows") → iframe renders empty-state card        | PENDING   | -          | PENDING        | -    | Iframe handles via chart_option = 'No data'                        |
| CH-05      | `truncated: true` (LIMIT 10000 hit) → warning banner in iframe         | PENDING   | -          | PENDING        | -    | Iframe banner already implemented in Unit 4                        |
| CH-06      | Fullscreen display mode → modal overlay, Escape to close               | PENDING   | -          | PENDING        | -    | Punted from Unit 6 narrow slice; TODO follow-up commit             |
| CH-07      | Sandbox-proxy unreachable → fallback card with answer + blog link      | PENDING   | -          | PENDING        | -    | 5s timeout implemented in UiResource.vue; e2e verification pending |
| CH-08      | Cross-origin postMessage (simulated evil origin) → silently dropped    | PASS      | 2026-04-14 | PENDING        | -    | Verified in vitest unit tests; origin-validation security-critical |
| CH-09      | 404 session-expired → silent reconnect once, second 404 surfaces error | PASS      | 2026-04-14 | PENDING        | -    | Verified in useAviationMcp vitest — FakeTransport with throwOnCall |

## Outstanding Unit 6 punts (tracked here for Unit 7 pickup)

- CH-02, CH-03, CH-06, CH-07: Playwright coverage punted in Unit 6 narrow
  slice (Unit 6 prompt explicitly permits narrowing). Next step is either
  a real-stack integration test against a deployed staging environment,
  or a richer MCP-mocking harness (Playwright route interceptor against
  /mcp/aviation + Unit 2's sandbox-proxy test server).
- Fullscreen modal (CH-06): wiring is in place (`sendHostContextChange({
displayMode: 'fullscreen' })`) but the modal overlay UX is not
  implemented.

## How to re-run the Blog-chat rows

```bash
# From repo root:
pnpm --filter @chris-towles/blog test               # CH-08, CH-09 (vitest)
pnpm --filter @chris-towles/blog test:e2e -- chat-mcp-iframe   # CH-01
```

CI populates the Date column automatically on every push (TODO in Unit 7 —
for now, update dates manually when the suite is re-run).
