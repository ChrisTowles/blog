import Anthropic from '@anthropic-ai/sdk';
import { getTools, executeToolCall } from '../tools/loan-tools';

class LoanProvider {
  private client: Anthropic;
  private model: string;
  private maxTokens: number;

  constructor(options: { id?: string; config?: { model?: string; max_tokens?: number } }) {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

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
    return 'loan-provider';
  }

  async callApi(prompt: string, context?: { vars?: Record<string, string> }) {
    const tools = getTools();

    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user',
        content: context?.vars?.query || prompt,
      },
    ];

    let response = await this.client.messages.create({
      model: this.model,
      max_tokens: this.maxTokens,
      system: prompt,
      messages,
      tools,
    });

    while (response.stop_reason === 'tool_use') {
      const toolUseBlocks = response.content.filter(
        (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
      );

      messages.push({
        role: 'assistant',
        content: response.content,
      });

      const toolResultBlocks = [];
      for (const toolUse of toolUseBlocks) {
        const result = executeToolCall(toolUse.name, toolUse.input as Record<string, unknown>);
        toolResultBlocks.push({
          type: 'tool_result' as const,
          tool_use_id: toolUse.id,
          content: JSON.stringify(result),
        });
      }

      messages.push({
        role: 'user',
        content: toolResultBlocks,
      });

      response = await this.client.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        system: prompt,
        messages,
        tools,
      });
    }

    const textBlocks = response.content.filter(
      (block): block is Anthropic.TextBlock => block.type === 'text',
    );
    const textOutput = textBlocks.map((block) => block.text).join('\n\n');

    const allToolCalls: Anthropic.ToolUseBlock[] = [];
    for (const msg of messages) {
      if (msg.role === 'assistant' && Array.isArray(msg.content)) {
        const toolUses = (msg.content as Anthropic.ContentBlock[]).filter(
          (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
        );
        allToolCalls.push(...toolUses);
      }
    }

    const output = JSON.stringify({
      text: textOutput,
      tool_calls: allToolCalls,
      stop_reason: response.stop_reason,
      model: response.model,
      usage: response.usage,
    });

    return {
      output,
      tokenUsage: {
        total: response.usage.input_tokens + response.usage.output_tokens,
        prompt: response.usage.input_tokens,
        completion: response.usage.output_tokens,
      },
    };
  }
}

export default LoanProvider;
