import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';
import { z } from 'zod';
import type {
  ChatMessage,
  CodeExecutionPart,
  FilePart,
  MessagePart,
  SSEEvent,
} from '~~/shared/chat-types';
import type { AnthropicBetaClient, BetaStreamEvent } from '~~/server/utils/ai/anthropic-beta-types';
import { getSkillsForAPI, getSkillsSystemPrompt } from '~~/server/utils/ai/skills-loader';

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai'],
  },
});

const SYSTEM_PROMPT = `You are a helpful AI assistant on Chris Towles's blog. You can help with questions about the blog content, programming, AI/ML, Vue/Nuxt, DevOps, and general topics.

You have access to tools that let you search the blog for relevant content. Use these when the user asks about topics that might be covered in blog posts.

**FORMATTING RULES (CRITICAL):**
- ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
- NO underline-style headings with === or ---
- Use **bold text** for emphasis and section labels instead
- Start all responses with content, never with a heading

**RESPONSE QUALITY:**
- Be concise yet comprehensive
- Use examples when helpful
- Break down complex topics into digestible parts
- Maintain a friendly, professional tone`;

function convertToAnthropicMessages(messages: ChatMessage[]): MessageParam[] {
  return messages.map((msg) => {
    const textContent = msg.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('\n');

    return {
      role: msg.role,
      content: textContent || ' ',
    };
  });
}

const encoder = new TextEncoder();

function sendSSE(controller: ReadableStreamDefaultController, event: SSEEvent): void {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
}

async function resolveFileMetadata(
  betaClient: AnthropicBetaClient,
  fileId: string,
): Promise<FilePart> {
  let fileName = 'output';
  let mediaType = 'application/octet-stream';
  try {
    const meta = await betaClient.beta.files.retrieveMetadata(fileId, {
      betas: ['files-api-2025-04-14'],
    });
    fileName = meta.filename || fileName;
    mediaType = meta.mime_type || mediaType;
  } catch (e) {
    console.warn(`[chat] Failed to fetch file metadata for ${fileId}:`, e);
  }

  return {
    type: 'file',
    fileId,
    fileName,
    mediaType,
    url: `/api/artifacts/files/${fileId}`,
  };
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  const config = useRuntimeConfig();
  const { id } = await getValidatedRouterParams(
    event,
    z.object({
      id: z.string(),
    }).parse,
  );

  const { model, messages } = await readValidatedBody(
    event,
    z.object({
      model: z.string(),
      messages: z.array(z.custom<ChatMessage>()),
    }).parse,
  );

  const db = useDrizzle();

  const chat = await db.query.chats.findFirst({
    where: (chat, { eq }) =>
      and(eq(chat.id, id as string), eq(chat.userId, session.user?.id || session.id)),
    with: {
      messages: true,
    },
  });

  if (!chat) {
    throw createError({ statusCode: 404, statusMessage: 'Chat not found' });
  }

  // Generate title if needed
  let generatedTitle: string | null = null;
  if (!chat.title && messages.length > 0) {
    const client = getAnthropicClient();
    const titleResponse = await client.messages.create({
      model: config.public.model_fast as string,
      max_tokens: 50,
      system: `You are a title generator for a chat:
- Generate a short title based on the first user's message
- The title should be less than 30 characters long
- The title should be a summary of the user's message
- Do not use quotes (' or ") or colons (:) or any other punctuation
- Do not use markdown, just plain text`,
      messages: [{ role: 'user', content: JSON.stringify(messages[0]?.parts ?? '') }],
    });

    const titleContent = titleResponse.content[0];
    if (titleContent?.type === 'text') {
      generatedTitle = titleContent.text.slice(0, 30);
      await db
        .update(tables.chats)
        .set({ title: generatedTitle })
        .where(eq(tables.chats.id, id as string));
    }
  }

  // Save the last user message
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.role === 'user' && messages.length > 1) {
    await db.insert(tables.messages).values({
      chatId: id as string,
      role: 'user',
      parts: lastMessage.parts,
    });
  }

  // Hoist base URL before stream callback (where `event` gets shadowed)
  const requestUrl = getRequestURL(event);
  const baseUrl = `${requestUrl.protocol}//${requestUrl.host}`;

  const skills = getSkillsForAPI();
  const skillsPrompt = getSkillsSystemPrompt();
  const fullSystemPrompt = `${SYSTEM_PROMPT}\n\n${skillsPrompt}`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (generatedTitle) {
          sendSSE(controller, { type: 'title', title: generatedTitle });
        }

        const client = getAnthropicClient();
        const betaClient = client as unknown as AnthropicBetaClient;
        const anthropicMessages = convertToAnthropicMessages(messages);

        let fullText = '';
        let reasoningText = '';
        const messageId = crypto.randomUUID();
        let currentToolUseId: string | null = null;
        let currentToolName: string | null = null;
        let toolInputJson = '';
        let currentServerToolName: string | null = null;
        let currentServerToolInput = '';
        let isServerToolBlock = false;

        const codeExecutions: CodeExecutionPart[] = [];
        const fileParts: FilePart[] = [];
        const seenFileIds = new Set<string>();

        let turnCount = 0;
        const maxTurns = 5;
        let currentMessages = [...anthropicMessages];

        // Container config — reuse from previous turns in this chat
        let containerId = chat.containerId || undefined;

        while (turnCount < maxTurns) {
          turnCount++;

          const streamResponse = betaClient.beta.messages.stream({
            model,
            max_tokens: 16000,
            system: fullSystemPrompt,
            messages: currentMessages,
            betas: ['code-execution-2025-08-25', 'files-api-2025-04-14', 'skills-2025-10-02'],
            tools: [
              ...chatTools,
              {
                type: 'code_execution_20250825',
                name: 'code_execution',
              },
            ],
            container: {
              ...(containerId ? { id: containerId } : {}),
              skills,
            },
            thinking: {
              type: 'enabled',
              budget_tokens: 4096,
            },
          });

          let hasToolUse = false;
          let turnThinking = '';
          let turnThinkingSignature = '';
          const toolResults: { type: 'tool_result'; tool_use_id: string; content: string }[] = [];
          const toolUses: { id: string; name: string; input: Record<string, unknown> }[] = [];

          for await (const streamEvent of streamResponse as AsyncIterable<BetaStreamEvent>) {
            if (streamEvent.type === 'message_start') {
              const msgContainerId = streamEvent.message?.container?.id;
              if (msgContainerId && msgContainerId !== containerId) {
                containerId = msgContainerId;
                sendSSE(controller, { type: 'container', containerId: msgContainerId });
              }
            } else if (streamEvent.type === 'content_block_start') {
              const block = streamEvent.content_block;

              if (block.type === 'tool_use') {
                currentToolUseId = block.id || null;
                currentToolName = block.name || null;
                toolInputJson = '';
                hasToolUse = true;
                isServerToolBlock = false;
              } else if (block.type === 'server_tool_use') {
                currentServerToolName = block.name || null;
                currentServerToolInput = '';
                isServerToolBlock = true;
              } else if (
                block.type === 'bash_code_execution_tool_result' ||
                block.type === 'text_editor_code_execution_tool_result'
              ) {
                const result = block.content;
                const stdout = result?.stdout || '';
                const stderr = result?.stderr || '';
                const exitCode = result?.return_code ?? 0;

                const resultFiles: FilePart[] = [];
                if (Array.isArray(result?.content)) {
                  for (const item of result.content) {
                    if (item.file_id && !seenFileIds.has(item.file_id)) {
                      seenFileIds.add(item.file_id);
                      const filePart = await resolveFileMetadata(betaClient, item.file_id);
                      resultFiles.push(filePart);
                      fileParts.push(filePart);
                    }
                  }
                }

                const lastRunning = codeExecutions.findLast((ce) => ce.state === 'running');
                if (lastRunning) {
                  lastRunning.stdout = stdout;
                  lastRunning.stderr = stderr;
                  lastRunning.exitCode = exitCode;
                  lastRunning.state = 'done';
                }

                sendSSE(controller, {
                  type: 'code_result',
                  stdout,
                  stderr,
                  exitCode,
                  files: resultFiles,
                });
              }
            } else if (streamEvent.type === 'content_block_delta') {
              const delta = streamEvent.delta;

              if (delta.type === 'thinking_delta') {
                reasoningText += delta.thinking;
                turnThinking += delta.thinking;
                sendSSE(controller, { type: 'reasoning', text: delta.thinking });
              } else if (delta.type === 'signature_delta') {
                turnThinkingSignature += delta.signature;
              } else if (delta.type === 'text_delta') {
                fullText += delta.text;
                sendSSE(controller, { type: 'text', text: delta.text });
              } else if (delta.type === 'input_json_delta') {
                if (isServerToolBlock) {
                  currentServerToolInput += delta.partial_json;
                } else {
                  toolInputJson += delta.partial_json;
                }
              }
            } else if (streamEvent.type === 'content_block_stop') {
              if (isServerToolBlock && currentServerToolName) {
                let code = '';
                let language = 'bash';
                try {
                  const input = currentServerToolInput ? JSON.parse(currentServerToolInput) : {};
                  if (
                    currentServerToolName === 'bash_code_execution' ||
                    currentServerToolName === 'bash'
                  ) {
                    code = input.command || '';
                    language = 'bash';
                  } else if (
                    currentServerToolName === 'text_editor_code_execution' ||
                    currentServerToolName === 'text_editor'
                  ) {
                    code = input.file_text || '';
                    language = (input.path as string)?.split('.').pop() || 'python';
                  }
                } catch {
                  // Input parsing failed — still send what we have
                }

                if (code) {
                  sendSSE(controller, { type: 'code_start', code, language });
                  codeExecutions.push({
                    type: 'code-execution',
                    code,
                    language,
                    stdout: '',
                    stderr: '',
                    exitCode: 0,
                    state: 'running',
                  });
                }

                currentServerToolName = null;
                currentServerToolInput = '';
                isServerToolBlock = false;
              } else if (currentToolUseId && currentToolName) {
                let toolArgs: Record<string, unknown> = {};
                try {
                  if (toolInputJson) {
                    toolArgs = JSON.parse(toolInputJson);
                  }
                } catch (parseError) {
                  console.error('Failed to parse tool input JSON:', {
                    toolName: currentToolName,
                    toolUseId: currentToolUseId,
                    rawInput: toolInputJson?.substring(0, 200),
                    error: parseError,
                  });
                  toolResults.push({
                    type: 'tool_result',
                    tool_use_id: currentToolUseId!,
                    content: `Error: Failed to parse tool arguments`,
                  });
                  currentToolUseId = null;
                  currentToolName = null;
                  toolInputJson = '';
                  continue;
                }

                toolUses.push({
                  id: currentToolUseId,
                  name: currentToolName,
                  input: toolArgs,
                });

                sendSSE(controller, {
                  type: 'tool_start',
                  tool: currentToolName,
                  toolCallId: currentToolUseId,
                  args: toolArgs,
                });

                let toolResult: unknown;
                try {
                  toolResult = await executeTool(currentToolName, toolArgs, { baseUrl });
                } catch (toolError) {
                  console.error(`Tool "${currentToolName}" execution failed:`, toolError);
                  const errorMsg =
                    toolError instanceof Error ? toolError.message : 'Tool execution failed';
                  toolResult = { error: errorMsg };
                }
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: currentToolUseId,
                  content: JSON.stringify(toolResult),
                });

                sendSSE(controller, {
                  type: 'tool_end',
                  tool: currentToolName,
                  toolCallId: currentToolUseId,
                  result: toolResult,
                });

                currentToolUseId = null;
                currentToolName = null;
                toolInputJson = '';
              }
            }
          }

          try {
            const finalMessage = await streamResponse.finalMessage();
            if (finalMessage.container?.id && finalMessage.container.id !== containerId) {
              containerId = finalMessage.container.id;
              sendSSE(controller, { type: 'container', containerId: finalMessage.container.id });
            }
          } catch (e) {
            // finalMessage() may fail if the stream was incomplete — log and continue
            console.warn('[chat] Failed to process final message:', e);
          }

          if (!hasToolUse || toolResults.length === 0) {
            break;
          }

          const assistantContent: Array<
            | { type: 'thinking'; thinking: string; signature: string }
            | { type: 'text'; text: string }
            | { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
          > = [
            ...(turnThinking && turnThinkingSignature
              ? [
                  {
                    type: 'thinking' as const,
                    thinking: turnThinking,
                    signature: turnThinkingSignature,
                  },
                ]
              : []),
            ...(fullText ? [{ type: 'text' as const, text: fullText }] : []),
            ...toolUses.map((t) => ({
              type: 'tool_use' as const,
              id: t.id,
              name: t.name,
              input: t.input,
            })),
          ];

          currentMessages = [
            ...currentMessages,
            {
              role: 'assistant' as const,
              content:
                assistantContent.length > 0
                  ? assistantContent
                  : [{ type: 'text' as const, text: ' ' }],
            },
            { role: 'user' as const, content: toolResults },
          ];

          fullText = '';
        }

        if (containerId && containerId !== chat.containerId) {
          await db.update(tables.chats).set({ containerId }).where(eq(tables.chats.id, chat.id));
        }

        const messageParts: MessagePart[] = [
          ...(reasoningText
            ? [{ type: 'reasoning' as const, text: reasoningText, state: 'done' as const }]
            : []),
          ...codeExecutions,
          ...fileParts,
          ...(fullText ? [{ type: 'text' as const, text: fullText }] : []),
        ];

        await db.insert(tables.messages).values({
          chatId: chat.id,
          role: 'assistant',
          parts: messageParts,
        });

        sendSSE(controller, { type: 'done', messageId });
        controller.close();
      } catch (error) {
        console.error('Stream error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        sendSSE(controller, { type: 'error', error: errorMessage });
        controller.close();
      }
    },
  });

  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');

  return stream;
});
