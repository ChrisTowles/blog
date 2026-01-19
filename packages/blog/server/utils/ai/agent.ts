import { query } from '@anthropic-ai/claude-agent-sdk';
import { blogToolsServer, blogToolNames } from './tools/index';
import { getSkillSources, getProjectRoot, defaultSkillConfig } from './skill-config';
import type { AgentMessage } from './stream-adapter';

// TODO: get promptfoot integration working for these prompts

/**
 * System prompt for the blog chatbot
 */
const SYSTEM_PROMPT = `You are a knowledgeable and helpful AI assistant on Chris Towles's Blog. Try to be funny but helpful.
Your goal is to provide clear, accurate, and well-structured responses.

**CRITICAL: USE THE SEARCH TOOL**
- ALWAYS use the searchBlogContent tool FIRST when users ask about:
  * AI, Claude, LLMs, context engineering, prompts
  * Vue, Nuxt, TypeScript, JavaScript
  * DevOps, Terraform, GCP, AWS, Docker
  * Best practices, testing, code review
  * Any technical topic that might be covered in the blog
- Do NOT answer from memory alone - search the blog first!
- When citing results, use markdown links: [Post Title](/blog/post-slug)

**FORMATTING RULES (CRITICAL):**
- ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
- NO underline-style headings with === or ---
- Use **bold text** for emphasis and section labels instead
- Start all responses with content, never with a heading

**RESPONSE QUALITY:**
- Be concise yet comprehensive
- Use examples when helpful
- Break down complex topics into digestible parts
- Maintain a friendly, professional tone

**SKILLS:**
- You have access to skills that provide specialized knowledge
- When a query matches a skill's domain, use it for better responses`;

/**
 * Options for running the agent
 */
export interface AgentOptions {
  /** User's message/prompt */
  prompt: string;
  /** Model to use (defaults to runtime config) */
  model?: string;
  /** Maximum turns for tool use loop */
  maxTurns?: number;
  /** Maximum thinking tokens for extended thinking */
  maxThinkingTokens?: number;
  /** Enable/disable skill sources */
  skillConfig?: {
    project?: boolean;
    global?: boolean;
  };
  /** Session ID to resume (for multi-turn conversations) */
  resumeSessionId?: string;
}

/**
 * Run the blog chatbot agent
 * Returns an async generator of Agent SDK messages
 */
export function runAgent(options: AgentOptions): AsyncIterable<AgentMessage> {
  const config = useRuntimeConfig();

  // Determine skill sources based on config
  const skillSources = getSkillSources({
    ...defaultSkillConfig,
    enabled: {
      project: options.skillConfig?.project ?? true,
      global: options.skillConfig?.global ?? true,
    },
  });

  // Build allowed tools list
  const allowedTools = [
    ...blogToolNames,
    'Skill', // Enable skill invocation
  ];

  return query({
    prompt: options.prompt,
    options: {
      // Working directory for skill discovery
      cwd: getProjectRoot(),

      // Model selection
      model: options.model || (config.public.model as string) || 'sonnet',

      // System prompt with custom append
      systemPrompt: {
        type: 'preset',
        preset: 'claude_code',
        append: SYSTEM_PROMPT,
      },

      // Skill sources for progressive loading
      settingSources: skillSources,

      // Custom tools via MCP server
      mcpServers: {
        'blog-tools': blogToolsServer,
      },

      // Allowed tools
      allowedTools,

      // Extended thinking
      maxThinkingTokens: options.maxThinkingTokens ?? 4096,

      // Execution limits
      maxTurns: options.maxTurns ?? 5,

      // Permission mode - allow tool execution
      permissionMode: 'bypassPermissions',

      // Resume session for multi-turn conversations
      ...(options.resumeSessionId && { resume: options.resumeSessionId }),
    },
  }) as AsyncIterable<AgentMessage>;
}

/**
 * Run agent and collect all messages
 * Useful for non-streaming use cases
 */
export async function runAgentSync(options: AgentOptions): Promise<{
  result: string;
  messages: AgentMessage[];
}> {
  const messages: AgentMessage[] = [];
  let result = '';

  for await (const message of runAgent(options)) {
    messages.push(message);
    if (message.type === 'result') {
      result = message.result;
    }
  }

  return { result, messages };
}
