/**
 * Custom Anthropic provider for Promptfoo
 * Handles tool calling with proper message format
 */
import Anthropic from '@anthropic-ai/sdk';
import { getTools } from './tools/blog-tools.ts';
import { runToolLoop } from './utils/tool-loop.ts';

class AnthropicProvider {
  private client: Anthropic;
  private model: string;
  private maxTokens: number;

  constructor(options: { id?: string; config?: { model?: string; max_tokens?: number } }) {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Store config from constructor
    if (!options?.config?.model) {
      throw new Error('Model must be specified in provider config');
    }
    if (!options?.config?.max_tokens) {
      throw new Error('max_tokens must be specified in provider config');
    }

    this.model = options.config.model;
    this.maxTokens = options.config.max_tokens;
  }

  id() {
    return 'anthropic-custom';
  }

  async callApi(prompt: string, context?: { vars?: Record<string, any> }) {
    const tools = getTools();

    const result = await runToolLoop({
      client: this.client,
      model: this.model,
      maxTokens: this.maxTokens,
      system: prompt,
      userInput: context?.vars?.query || prompt,
      tools: tools as Anthropic.Tool[],
    });

    // Return in format tests expect (JSON with tool_calls)
    const output = JSON.stringify({
      text: result.text,
      tool_calls: result.toolCalls,
      stop_reason: 'end_turn',
      model: result.model,
      usage: { input_tokens: result.usage.input, output_tokens: result.usage.output },
    });

    return {
      output,
      tokenUsage: {
        total: result.usage.input + result.usage.output,
        prompt: result.usage.input,
        completion: result.usage.output,
      },
    };
  }
}

export default AnthropicProvider;
