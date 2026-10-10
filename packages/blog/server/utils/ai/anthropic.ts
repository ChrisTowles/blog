import Anthropic from '@anthropic-ai/sdk';
import { wrapAnthropic, initLogger } from 'braintrust';
import { envSchema } from '../env-config';

const anthropicEnvSchema = envSchema.pick({
  ANTHROPIC_API_KEY: true,
  BRAINTRUST_API_KEY: true,
  BRAINTRUST_PROJECT_NAME: true,
  NUXT_ANTHROPIC_BASE_URL: true,
});

let _client: Anthropic | null = null;

let _logger: ReturnType<typeof initLogger> | null = null;

/**
 * Get Braintrust logger for custom traces.
 * Use logger.log() for custom traces (e.g., multimodal inputs, metadata)
 */
export function getBraintrustLogger() {
  if (!_logger) {
    const result = anthropicEnvSchema.parse(process.env);
    _logger = initLogger({
      projectName: result.BRAINTRUST_PROJECT_NAME,
      apiKey: result.BRAINTRUST_API_KEY,
    });
  }

  return _logger;
}

/**
 * `NUXT_ANTHROPIC_BASE_URL` routes calls through a proxy such
 * as Cloudflare AI Gateway's Anthropic endpoint. Unset means api.anthropic.com.
 */
export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const result = anthropicEnvSchema.parse(process.env);

    const rawClient = new Anthropic({
      apiKey: result.ANTHROPIC_API_KEY,
      baseURL: result.NUXT_ANTHROPIC_BASE_URL || undefined,
      // happy-dom in Vitest sets window, which triggers the Anthropic browser guard.
      // This is a server-side client — allow it in test environments.
      dangerouslyAllowBrowser: !!process.env.VITEST,
    });

    // Wrap with Braintrust observability
    getBraintrustLogger();
    _client = wrapAnthropic(rawClient);
  }

  return _client;
}
