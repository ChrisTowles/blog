import { z } from 'zod';
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages';
import type { ChatMessage, SSEEvent } from '~~/shared/chat-types';
import type { LoanApplicationData } from '~~/shared/loan-types';
import { loanChatTools, executeLoanTool } from '~~/server/utils/ai/loan-tools';
import { LOAN_INTAKE_SYSTEM_PROMPT } from '~~/server/utils/ai/loan-system-prompt';

defineRouteMeta({
  openAPI: {
    description: 'Loan intake chat — SSE streaming.',
    tags: ['loan'],
  },
});

function convertToAnthropicMessages(messages: ChatMessage[]): MessageParam[] {
  return messages.map((msg) => {
    const textContent = msg.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('\n');
    return { role: msg.role, content: textContent || ' ' };
  });
}

const encoder = new TextEncoder();

function sendSSE(
  controller: ReadableStreamDefaultController,
  event: SSEEvent | { type: 'application_update'; data: LoanApplicationData },
): void {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session.user?.id) {
    throw createError({ statusCode: 401, statusMessage: 'Login required' });
  }
  const userId = session.user.id;

  const { id } = await getValidatedRouterParams(event, z.object({ id: z.string() }).parse);
  const { model, messages } = await readValidatedBody(
    event,
    z.object({
      model: z.string(),
      messages: z.array(z.custom<ChatMessage>()),
    }).parse,
  );

  const db = useDrizzle();
  const application = await db.query.loanApplications.findFirst({
    where: (app, { eq: e }) => and(e(app.id, id), e(app.userId, userId)),
  });

  if (!application) {
    throw createError({ statusCode: 404, statusMessage: 'Application not found' });
  }

  if (application.status !== 'intake') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Application is no longer accepting input',
    });
  }

  // Save user message
  const lastMessage = messages[messages.length - 1];
  if (lastMessage?.role === 'user') {
    await db.insert(tables.loanMessages).values({
      applicationId: id,
      role: 'user',
      parts: lastMessage.parts,
    });
  }

  let applicationData: LoanApplicationData =
    (application.applicationData as LoanApplicationData) || {};

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const client = getAnthropicClient();
        const anthropicMessages = convertToAnthropicMessages(messages);
        const config = useRuntimeConfig();

        let fullText = '';
        const messageId = crypto.randomUUID();
        let currentToolUseId: string | null = null;
        let currentToolName: string | null = null;
        let toolInputJson = '';

        let turnCount = 0;
        const maxTurns = 5;
        let currentMessages = [...anthropicMessages];

        while (turnCount < maxTurns) {
          turnCount++;

          const streamResponse = client.messages.stream({
            model: model || (config.public.model as string),
            max_tokens: 4096,
            system: LOAN_INTAKE_SYSTEM_PROMPT,
            messages: currentMessages,
            tools: loanChatTools,
          });

          let hasToolUse = false;
          const toolResults: { type: 'tool_result'; tool_use_id: string; content: string }[] = [];
          const toolUses: { id: string; name: string; input: Record<string, unknown> }[] = [];

          for await (const streamEvent of streamResponse) {
            if (streamEvent.type === 'content_block_start') {
              const block = streamEvent.content_block;
              if (block.type === 'tool_use') {
                currentToolUseId = block.id || null;
                currentToolName = block.name || null;
                toolInputJson = '';
                hasToolUse = true;
              }
            } else if (streamEvent.type === 'content_block_delta') {
              const delta = streamEvent.delta;
              if (delta.type === 'text_delta') {
                fullText += delta.text;
                sendSSE(controller, { type: 'text', text: delta.text });
              } else if (delta.type === 'input_json_delta') {
                toolInputJson += delta.partial_json;
              }
            } else if (streamEvent.type === 'content_block_stop') {
              if (currentToolUseId && currentToolName) {
                let toolArgs: Record<string, unknown> = {};
                try {
                  if (toolInputJson) toolArgs = JSON.parse(toolInputJson);
                } catch {
                  toolResults.push({
                    type: 'tool_result',
                    tool_use_id: currentToolUseId,
                    content: 'Error: Failed to parse tool arguments',
                  });
                  currentToolUseId = null;
                  currentToolName = null;
                  toolInputJson = '';
                  continue;
                }

                toolUses.push({ id: currentToolUseId, name: currentToolName, input: toolArgs });

                sendSSE(controller, {
                  type: 'tool_start',
                  tool: currentToolName,
                  toolCallId: currentToolUseId,
                  args: toolArgs,
                });

                const toolResult = executeLoanTool(currentToolName, toolArgs, { applicationData });

                if (currentToolName === 'updateApplication' && toolResult.updated) {
                  applicationData = {
                    ...applicationData,
                    ...(toolResult.updated as LoanApplicationData),
                  };
                  await db
                    .update(tables.loanApplications)
                    .set({ applicationData })
                    .where(eq(tables.loanApplications.id, id));
                  sendSSE(controller, {
                    type: 'application_update',
                    data: applicationData,
                  } as never);
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

          if (!hasToolUse || toolResults.length === 0) break;

          currentMessages = [
            ...currentMessages,
            {
              role: 'assistant' as const,
              content: [
                ...(fullText ? [{ type: 'text' as const, text: fullText }] : []),
                ...toolUses.map((t) => ({
                  type: 'tool_use' as const,
                  id: t.id,
                  name: t.name,
                  input: t.input,
                })),
              ],
            },
            { role: 'user' as const, content: toolResults },
          ];

          fullText = '';
        }

        await db.insert(tables.loanMessages).values({
          applicationId: id,
          role: 'assistant',
          parts: [...(fullText ? [{ type: 'text' as const, text: fullText }] : [])],
        });

        sendSSE(controller, { type: 'done', messageId });
        controller.close();
      } catch (error) {
        console.error('Loan chat stream error:', error);
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
