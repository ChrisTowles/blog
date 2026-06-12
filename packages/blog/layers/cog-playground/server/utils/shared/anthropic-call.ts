/**
 * Shared "call Claude for a JSON answer" helper for the cog-playground
 * scorers.
 *
 * Three responsibilities collapsed into one place so each scorer is a
 * thin "request payload + parser" pair:
 *
 *   1. Wrap the SDK call in `withAnthropicSpan` per the project's
 *      observability convention (CLAUDE.md "Wrapper rule" — never call
 *      `client.messages.create(...)` directly at a site that should be
 *      traced). The Braintrust singleton inside `getAnthropicClient()`
 *      is a parallel observability layer and unaffected.
 *   2. Catch any SDK throw (spend cap, transient 5xx, network) and
 *      convert it to a graceful `{ ok: false, reason }` instead of an
 *      unhandled 500 with a stack-trace dump.
 *   3. Bounded retries: if the model returns an empty/non-text block or
 *      the caller's `parse` rejects the body, try again (default 2
 *      attempts).
 *
 * The Anthropic client is injectable so unit tests can pass a stub —
 * same seam as the typing layer's `lesson-generator`.
 */
import { withAnthropicSpan } from '../../../../../server/utils/observability/anthropic';

export type ParseResult<T> = { ok: true; data: T } | { ok: false; reason: string };
export type ParseFn<T> = (text: string) => ParseResult<T>;

/**
 * Minimal shape the helper needs from a Claude client. Lets test stubs
 * return only `{ content: [...] }` without satisfying the full SDK
 * response type — same approach the scorer-specific `*AnthropicLike`
 * types used before this extraction.
 */
export type AnthropicLike<TArgs extends { model: string }> = {
  messages: {
    create: (args: TArgs) => Promise<{ content: Array<{ type: string; text?: string }> }>;
  };
};

export type CallModelForJsonOptions = {
  /** Number of attempts (default: 2). One failed parse uses one attempt. */
  attempts?: number;
  /** Span `operation` label (default: 'chat'), per OTel GenAI semconv. */
  operation?: string;
};

/**
 * Call the model, extract a single text block, hand it to `parse`. On
 * any thrown SDK error, empty response, or failed parse, retry up to
 * `opts.attempts` times. Returns the parsed value on success or a
 * `{ ok: false, reason }` describing the last failure.
 *
 * The span ends after each attempt regardless of success — re-attempts
 * start a fresh span so each call site shows up cleanly in traces.
 */
export async function callModelForJson<TArgs extends { model: string }, T>(
  client: AnthropicLike<TArgs>,
  args: TArgs,
  parse: ParseFn<T>,
  opts: CallModelForJsonOptions = {},
): Promise<ParseResult<T>> {
  const attempts = opts.attempts ?? 2;
  const operation = opts.operation ?? 'chat';
  let lastReason = 'no attempts';
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await withAnthropicSpan(operation, args.model, () =>
        client.messages.create(args),
      );
      const block = response.content[0];
      if (!block || block.type !== 'text' || !block.text) {
        lastReason = 'no text response';
        continue;
      }
      const parsed = parse(block.text);
      if (parsed.ok) return parsed;
      lastReason = parsed.reason;
    } catch (err) {
      lastReason = `model request failed: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
  return { ok: false, reason: `failed after retries — last reason: ${lastReason}` };
}
