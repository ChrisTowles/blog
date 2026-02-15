import { z } from 'zod';
import type {
  ArtifactSSEEvent,
  ArtifactFile,
} from '~~/shared/artifact-types';

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

function sendSSE(controller: ReadableStreamDefaultController, event: ArtifactSSEEvent) {
  const encoder = new TextEncoder();
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
}

export default defineEventHandler(async (event) => {
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

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const client = getAnthropicClient();

        // Build container config
        const containerConfig: Record<string, unknown> = {};
        if (containerId) {
          containerConfig.id = containerId;
        }
        if (skills && skills.length > 0) {
          containerConfig.skills = skills.map((s) => ({
            type: s.type,
            skill_id: s.skillId,
            version: s.version || 'latest',
          }));
        }

        // Call Anthropic Messages API with code execution tool
        const response = await (client as any).beta.messages.create({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 16000,
          system: SYSTEM_PROMPT,
          betas: ['code-execution-2025-08-25', ...(skills?.length ? ['skills-2025-10-02'] : [])],
          ...(Object.keys(containerConfig).length > 0 ? { container: containerConfig } : {}),
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
        const files: ArtifactFile[] = [];

        for (const block of response.content) {
          if (block.type === 'text') {
            sendSSE(controller, { type: 'artifact_text', text: block.text });
          } else if (block.type === 'server_tool_use' && block.name === 'code_execution') {
            // Code execution was requested
            sendSSE(controller, { type: 'artifact_execution_start' });
            if (block.input?.code) {
              sendSSE(controller, {
                type: 'artifact_code',
                code: block.input.code as string,
                language: (block.input.language as string) || 'python',
              });
            }
          } else if (block.type === 'code_execution_tool_result') {
            // Code execution completed
            sendSSE(controller, {
              type: 'artifact_execution_result',
              stdout: block.content?.stdout || '',
              stderr: block.content?.stderr || '',
              exitCode: block.content?.return_code ?? 0,
            });
          } else if (block.type === 'code_execution_tool_result_file') {
            // A file was generated
            const file: ArtifactFile = {
              fileId: block.file_id,
              fileName: block.file_name || 'output',
              mediaType: block.media_type || 'application/octet-stream',
              url: `/api/artifacts/files/${block.file_id}`,
            };
            files.push(file);
            sendSSE(controller, { type: 'artifact_file', file });
          }
        }

        // Check for files referenced in content blocks (alternative structure)
        if (response.content) {
          for (const block of response.content) {
            if (block.type === 'code_execution_tool_result') {
              // Check for nested file content
              if (Array.isArray(block.content)) {
                for (const item of block.content) {
                  if (item.type === 'file' && item.file_id) {
                    const existingFile = files.find((f) => f.fileId === item.file_id);
                    if (!existingFile) {
                      const file: ArtifactFile = {
                        fileId: item.file_id,
                        fileName: item.file_name || 'output',
                        mediaType: item.media_type || 'application/octet-stream',
                        url: `/api/artifacts/files/${item.file_id}`,
                      };
                      files.push(file);
                      sendSSE(controller, { type: 'artifact_file', file });
                    }
                  }
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
