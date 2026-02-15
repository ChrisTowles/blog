import { z } from 'zod';
import type { ArtifactSSEEvent, ArtifactFile } from '~~/shared/artifact-types';
import type { AnthropicBetaClient } from '~~/server/utils/ai/anthropic-beta-types';

defineRouteMeta({
  openAPI: {
    description: 'Execute code in an isolated Anthropic container via the Code Execution Tool.',
    tags: ['artifacts'],
  },
});

const SYSTEM_PROMPT = `You are a code execution assistant embedded in a blog. Users will ask you to create visualizations, process data, generate files, or run code.

**Rules:**
- Always write code that produces visible output (print results, save files, generate images)
- For visualizations, use matplotlib and save to files (PNG preferred)
- For data processing, print clear summaries of results
- When creating files, use descriptive filenames
- Keep explanations brief — focus on running the code and producing output
- If the user provides initial code, execute it directly (fix obvious errors if needed)`;

const encoder = new TextEncoder();

function sendSSE(controller: ReadableStreamDefaultController, event: ArtifactSSEEvent) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
}

export default defineEventHandler(async (event) => {
  await getUserSession(event);

  const { prompt, code, language, containerId, skills } = await readValidatedBody(
    event,
    z.object({
      prompt: z.string().min(1),
      code: z.string().optional(),
      language: z.string().optional(),
      containerId: z.string().optional(),
      skills: z
        .array(
          z.object({
            type: z.enum(['anthropic', 'custom']),
            skillId: z.string(),
            version: z.string().optional(),
          }),
        )
        .optional(),
    }).parse,
  );

  // Build the user message
  let userContent = prompt;
  if (code) {
    const lang = language || 'python';
    userContent = `${prompt}\n\nHere is the code to execute:\n\`\`\`${lang}\n${code}\n\`\`\``;
  }

  const config = useRuntimeConfig();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const client = getAnthropicClient();

        // Build container config (only included if there's something to set)
        const hasContainer = containerId || (skills && skills.length > 0);
        const containerConfig = hasContainer
          ? {
              ...(containerId ? { id: containerId } : {}),
              ...(skills?.length
                ? {
                    skills: skills.map((s) => ({
                      type: s.type,
                      skill_id: s.skillId,
                      version: s.version || 'latest',
                    })),
                  }
                : {}),
            }
          : undefined;

        // Call Anthropic Messages API with code execution tool
        const betaClient = client as unknown as AnthropicBetaClient;
        const response = await betaClient.beta.messages.create({
          model: config.public.model as string,
          max_tokens: 16000,
          system: SYSTEM_PROMPT,
          betas: [
            'code-execution-2025-08-25',
            'files-api-2025-04-14',
            ...(skills?.length ? ['skills-2025-10-02'] : []),
          ],
          ...(containerConfig ? { container: containerConfig } : {}),
          tools: [
            {
              type: 'code_execution_20250825',
              name: 'code_execution',
            },
          ],
          messages: [{ role: 'user', content: userContent }],
        });

        // Extract container ID from response for reuse
        const responseContainerId = response.container?.id;
        if (responseContainerId) {
          sendSSE(controller, {
            type: 'artifact_container',
            containerId: responseContainerId,
          });
        }

        // Process response content blocks
        const seenFileIds = new Set<string>();

        async function emitFile(fileId: string) {
          if (seenFileIds.has(fileId)) return;
          seenFileIds.add(fileId);
          // Fetch actual metadata from the Files API
          let fileName = 'output';
          let mediaType = 'application/octet-stream';
          try {
            const meta = await betaClient.beta.files.retrieveMetadata(fileId, {
              betas: ['files-api-2025-04-14'],
            });
            fileName = meta.filename || fileName;
            mediaType = meta.mime_type || mediaType;
          } catch (e) {
            console.warn(`[artifact] Failed to fetch metadata for file ${fileId}:`, e);
          }
          const file: ArtifactFile = {
            fileId,
            fileName,
            mediaType,
            url: `/api/artifacts/files/${fileId}`,
          };
          sendSSE(controller, { type: 'artifact_file', file });
        }

        for (const block of response.content) {
          if (block.type === 'text') {
            sendSSE(controller, { type: 'artifact_text', text: block.text });
          } else if (block.type === 'server_tool_use') {
            // Handle both bash and text_editor tool use blocks
            sendSSE(controller, { type: 'artifact_execution_start' });
            if (block.name === 'bash_code_execution' && block.input?.command) {
              sendSSE(controller, {
                type: 'artifact_code',
                code: block.input.command as string,
                language: 'bash',
              });
            } else if (block.name === 'text_editor_code_execution' && block.input?.file_text) {
              sendSSE(controller, {
                type: 'artifact_code',
                code: block.input.file_text as string,
                language: (block.input.path as string)?.split('.').pop() || 'text',
              });
            }
          } else if (
            block.type === 'bash_code_execution_tool_result' ||
            block.type === 'text_editor_code_execution_tool_result'
          ) {
            const result = block.content;
            if (result?.stdout !== undefined || result?.stderr !== undefined) {
              sendSSE(controller, {
                type: 'artifact_execution_result',
                stdout: result.stdout || '',
                stderr: result.stderr || '',
                exitCode: result.return_code ?? 0,
              });
            }
            // Files are nested in result.content[] array
            if (Array.isArray(result?.content)) {
              for (const item of result.content) {
                if (item.file_id) {
                  await emitFile(item.file_id);
                }
              }
            }
          }
        }

        sendSSE(controller, { type: 'artifact_done' });
        controller.close();
      } catch (err) {
        console.error('Artifact execution error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        sendSSE(controller, { type: 'artifact_error', error: errorMessage });
        controller.close();
      }
    },
  });

  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');

  return stream;
});
