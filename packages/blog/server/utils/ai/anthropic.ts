import Anthropic from '@anthropic-ai/sdk';
import { wrapAnthropic, initLogger } from 'braintrust';

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
    // const config = useRuntimeConfig()
    // had issues with useRuntimeConfig in this file, so parse from env directly
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
