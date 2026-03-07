import Anthropic from '@anthropic-ai/sdk';
import { wrapAnthropic, initLogger } from 'braintrust';
import { withSpan, aiSpanAttributes, recordTokenUsage, type Span } from '../telemetry';

let _client: Anthropic | null = null;
let _logger: ReturnType<typeof initLogger> | null = null;

/**
 * Get Braintrust logger for custom traces.
 * Use logger.log() for custom traces (e.g., multimodal inputs, metadata)
 */
export function getBraintrustLogger() {
  if (!_logger) {
    const result = envSchema.parse(process.env);
    _logger = initLogger({
      projectName: result.BRAINTRUST_PROJECT_NAME,
      apiKey: result.BRAINTRUST_API_KEY,
    });
  }
  return _logger;
}

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const result = envSchema.parse(process.env);
    const rawClient = new Anthropic({
      apiKey: result.ANTHROPIC_API_KEY,
    });

    // Wrap with Braintrust observability
    getBraintrustLogger();
    _client = wrapAnthropic(rawClient);
  }
  return _client;
}

/**
 * Create an Anthropic message with OpenTelemetry tracing.
 * Wraps the API call in a span that tracks model, tokens, latency, and tool use.
 */
export async function createTracedMessage(
  params: Anthropic.MessageCreateParamsNonStreaming,
): Promise<Anthropic.Message> {
  return withSpan(
    'anthropic.messages.create',
    aiSpanAttributes({
      model: params.model,
      operation: 'chat',
      maxTokens: params.max_tokens,
      streaming: false,
    }),
    async (span: Span) => {
      const client = getAnthropicClient();
      const response = await client.messages.create(params);

      // Record token usage
      recordTokenUsage(span, {
        input_tokens: response.usage?.input_tokens,
        output_tokens: response.usage?.output_tokens,
      });

      // Record response metadata
      span.setAttribute('gen_ai.response.model', response.model);
      span.setAttribute('gen_ai.response.stop_reason', response.stop_reason || 'unknown');

      // Track tool use
      const toolUseBlocks = response.content.filter((b) => b.type === 'tool_use');
      if (toolUseBlocks.length > 0) {
        span.setAttribute('gen_ai.tool_call.count', toolUseBlocks.length);
        span.setAttribute(
          'gen_ai.tool_call.names',
          toolUseBlocks.map((b) => (b.type === 'tool_use' ? b.name : '')),
        );
      }

      return response;
    },
  );
}
