/**
 * Shared tool-use loop for Anthropic API calls.
 * Used by both the Braintrust eval and the Promptfoo provider.
 */
import Anthropic from '@anthropic-ai/sdk';
import { executeToolCall } from '../tools/blog-tools.ts';

interface ToolLoopOptions {
  client: Anthropic;
  model: string;
  maxTokens: number;
  system: string;
  userInput: string;
  tools: Anthropic.Tool[];
  maxTurns?: number;
}

interface ToolLoopResult {
  text: string;
  toolCalls: Array<{ name: string; input: Record<string, unknown> }>;
  usage: { input: number; output: number };
  model: string;
}

export async function runToolLoop(opts: ToolLoopOptions): Promise<ToolLoopResult> {
  const { client, model, maxTokens, system, userInput, tools, maxTurns = 10 } = opts;

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userInput || '(empty message)' },
  ];

  const allToolCalls: Array<{ name: string; input: Record<string, unknown> }> = [];
  let totalInput = 0;
  let totalOutput = 0;
  let turns = 0;

  let response = await client.messages.create({
    model,
    max_tokens: maxTokens,
    system,
    messages,
    tools,
  });

  totalInput += response.usage.input_tokens;
  totalOutput += response.usage.output_tokens;

  while (response.stop_reason === 'tool_use' && turns < maxTurns) {
    turns++;

    const toolUseBlocks = response.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use',
    );

    messages.push({ role: 'assistant', content: response.content });

    // Execute tool calls in parallel
    const toolResults = await Promise.all(
      toolUseBlocks.map(async (toolUse) => {
        allToolCalls.push({
          name: toolUse.name,
          input: toolUse.input as Record<string, unknown>,
        });
        const result = await executeToolCall(toolUse.name, toolUse.input);
        return {
          type: 'tool_result' as const,
          tool_use_id: toolUse.id,
          content: JSON.stringify(result),
        };
      }),
    );

    messages.push({ role: 'user', content: toolResults });

    response = await client.messages.create({
      model,
      max_tokens: maxTokens,
      system,
      messages,
      tools,
    });

    totalInput += response.usage.input_tokens;
    totalOutput += response.usage.output_tokens;
  }

  const textBlocks = response.content.filter(
    (block): block is Anthropic.TextBlock => block.type === 'text',
  );

  return {
    text: textBlocks.map((b) => b.text).join('\n\n'),
    toolCalls: allToolCalls,
    usage: { input: totalInput, output: totalOutput },
    model: response.model,
  };
}
