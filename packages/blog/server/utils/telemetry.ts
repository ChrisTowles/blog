import { trace, SpanStatusCode, type Span, type Attributes } from '@opentelemetry/api';

const TRACER_NAME = 'blog-ai';

let _initialized = false;

/**
 * Initialize OpenTelemetry SDK if OTEL_ENABLED is set.
 * Called once from the Nitro plugin on server startup.
 * Must be called before any spans are created.
 */
export async function initTelemetry(): Promise<void> {
  if (_initialized) return;

  const enabled = process.env.OTEL_ENABLED === 'true';
  if (!enabled) {
    console.log('[telemetry] OpenTelemetry disabled (set OTEL_ENABLED=true to enable)');
    _initialized = true;
    return;
  }

  const { NodeSDK } = await import('@opentelemetry/sdk-node');
  const { SimpleSpanProcessor, ConsoleSpanExporter } =
    await import('@opentelemetry/sdk-trace-node');
  const { OTLPTraceExporter } = await import('@opentelemetry/exporter-trace-otlp-http');
  const { resourceFromAttributes } = await import('@opentelemetry/resources');
  const { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } =
    await import('@opentelemetry/semantic-conventions');

  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'blog-server',
    [ATTR_SERVICE_VERSION]: process.env.GIT_SHA || 'dev',
    'deployment.environment': process.env.NODE_ENV || 'development',
  });

  // Use OTLP exporter if endpoint configured, otherwise console
  const exporter = endpoint ? new OTLPTraceExporter({ url: endpoint }) : new ConsoleSpanExporter();

  const sdk = new NodeSDK({
    resource,
    spanProcessors: [new SimpleSpanProcessor(exporter)],
  });

  sdk.start();
  _initialized = true;

  const target = endpoint || 'console';
  console.log(`[telemetry] OpenTelemetry initialized (exporting to ${target})`);
}

/**
 * Get the AI tracer instance.
 * Returns a no-op tracer if OTel is not initialized.
 */
export function getTracer() {
  return trace.getTracer(TRACER_NAME);
}

/**
 * Wrap an async function in a span with standard AI attributes.
 * Automatically sets error status on failure.
 */
export async function withSpan<T>(
  name: string,
  attributes: Attributes,
  fn: (span: Span) => Promise<T>,
): Promise<T> {
  const tracer = getTracer();
  return tracer.startActiveSpan(name, { attributes }, async (span) => {
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : String(error),
      });
      if (error instanceof Error) {
        span.recordException(error);
      }
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Record token usage on a span.
 * Follows GenAI semantic conventions.
 */
export function recordTokenUsage(
  span: Span,
  usage: { input_tokens?: number; output_tokens?: number },
) {
  if (usage.input_tokens !== undefined) {
    span.setAttribute('gen_ai.usage.input_tokens', usage.input_tokens);
  }
  if (usage.output_tokens !== undefined) {
    span.setAttribute('gen_ai.usage.output_tokens', usage.output_tokens);
  }
  if (usage.input_tokens !== undefined && usage.output_tokens !== undefined) {
    span.setAttribute('gen_ai.usage.total_tokens', usage.input_tokens + usage.output_tokens);
  }
}

/**
 * Create standard attributes for an Anthropic API call.
 */
export function aiSpanAttributes(opts: {
  model: string;
  operation?: string;
  maxTokens?: number;
  streaming?: boolean;
}): Attributes {
  return {
    'gen_ai.system': 'anthropic',
    'gen_ai.request.model': opts.model,
    ...(opts.operation && { 'gen_ai.operation.name': opts.operation }),
    ...(opts.maxTokens && { 'gen_ai.request.max_tokens': opts.maxTokens }),
    ...(opts.streaming !== undefined && { 'gen_ai.request.streaming': opts.streaming }),
  };
}

export { SpanStatusCode };
export type { Span };
