/**
 * Braintrust eval: Chatbot response quality
 *
 * Tests chatbot responses for:
 * - Correct tool selection
 * - Format compliance (no markdown headings)
 * - Response relevance
 * - Token usage tracking
 */
import Anthropic from '@anthropic-ai/sdk';
import { Eval } from 'braintrust';
import { ClosedQA } from 'autoevals';
import { chatbotDataset } from './datasets.ts';
import { getTools } from '../tools/blog-tools.ts';
import { runToolLoop } from '../utils/tool-loop.ts';
import { loadSystemPrompt } from './utils.ts';

interface ChatbotOutput {
  text: string;
  toolCalls: Array<{ name: string; input: Record<string, unknown> }>;
  usage: { inputTokens: number; outputTokens: number };
  model: string;
}

/**
 * Run the chatbot with tool use loop, returning structured output.
 */
async function runChatbot(input: string): Promise<ChatbotOutput> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const systemPrompt = loadSystemPrompt();
  const tools = getTools();
  const model = 'claude-haiku-4-5';
  const maxTokens = 1024;

  const result = await runToolLoop({
    client,
    model,
    maxTokens,
    system: systemPrompt,
    userInput: input,
    tools: tools as Anthropic.Tool[],
  });

  return {
    text: result.text,
    toolCalls: result.toolCalls,
    usage: { inputTokens: result.usage.input, outputTokens: result.usage.output },
    model: result.model,
  };
}

export async function runChatbotEval() {
  return Eval('blog-chatbot', {
    data: () =>
      chatbotDataset.map((c) => ({
        input: c.input,
        expected: c.expected,
      })),

    task: async (input: string) => {
      const result = await runChatbot(input);
      return result;
    },

    scores: [
      // Tool selection accuracy
      ({ output, expected }) => {
        if (!expected?.shouldCallTool) {
          return { name: 'ToolSelection', score: 1 };
        }
        const called = (output as ChatbotOutput).toolCalls.some((tc) =>
          tc.name.includes(expected.shouldCallTool!),
        );
        return { name: 'ToolSelection', score: called ? 1 : 0 };
      },

      // Format compliance: no markdown headings
      ({ output }) => {
        const text = (output as ChatbotOutput).text;
        const hasHeadings = /\n#{1,6}\s/.test(text) || /^#{1,6}\s/.test(text);
        return { name: 'NoMarkdownHeadings', score: hasHeadings ? 0 : 1 };
      },

      // Format compliance: uses bold for emphasis
      ({ output }) => {
        const text = (output as ChatbotOutput).text;
        const hasBold = text.includes('**');
        return { name: 'UsesBoldEmphasis', score: hasBold ? 1 : 0.5 };
      },

      // Forbidden content check
      ({ output, expected }) => {
        if (!expected?.shouldNotContain?.length) {
          return { name: 'ForbiddenContent', score: 1 };
        }
        const text = (output as ChatbotOutput).text;
        const hasForbidden = expected.shouldNotContain.some((s: string) => text.includes(s));
        return { name: 'ForbiddenContent', score: hasForbidden ? 0 : 1 };
      },

      // Topic mention check
      ({ output, expected }) => {
        if (!expected?.shouldMentionTopic) {
          return { name: 'TopicRelevance', score: 1 };
        }
        const text = (output as ChatbotOutput).text.toLowerCase();
        const mentioned = text.includes(expected.shouldMentionTopic.toLowerCase());
        return { name: 'TopicRelevance', score: mentioned ? 1 : 0.5 };
      },

      // Token usage tracking (informational, always passes)
      ({ output }) => {
        const { usage } = output as ChatbotOutput;
        const totalTokens = usage.inputTokens + usage.outputTokens;
        // Score based on efficiency: penalize responses over 2000 total tokens
        const score = totalTokens <= 2000 ? 1 : Math.max(0, 1 - (totalTokens - 2000) / 3000);
        return {
          name: 'TokenEfficiency',
          score,
          metadata: {
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens,
          },
        };
      },

      // LLM-as-judge: response quality (via autoevals)
      async ({ input, output }) => {
        const text = (output as ChatbotOutput).text;
        if (!input || !text) {
          return { name: 'ResponseQuality', score: 0.5 };
        }
        const result = await ClosedQA({
          input: input as string,
          output: text,
          criteria:
            'The response is helpful, relevant to the question, well-structured, and maintains a friendly professional tone.',
        });
        return { name: 'ResponseQuality', score: result.score ?? 0 };
      },
    ],
  });
}
