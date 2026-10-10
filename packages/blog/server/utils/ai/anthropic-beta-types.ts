/**
 * Type definitions for Anthropic beta APIs (Code Execution, Files).
 * These beta response shapes are not yet in the official SDK types.
 *
 * Response format reference (code_execution_20250825):
 * - bash_code_execution_tool_result → { type, stdout, stderr, return_code, content: file[] }
 * - text_editor_code_execution_tool_result → { type, ... }
 * - server_tool_use with name "bash_code_execution" or "text_editor_code_execution"
 */

import type Anthropic from '@anthropic-ai/sdk';

/** Content block types from the Code Execution beta response */
export interface CodeExecutionTextBlock {
  type: 'text';
  text: string;
}

/** Input of a server-side bash or text editor tool call */
export interface CodeExecutionToolInput {
  command?: string;
  file_text?: string;
  path?: string;
}

export interface CodeExecutionToolUseBlock {
  type: 'server_tool_use';
  name: string;
  input: CodeExecutionToolInput;
}

/** Result payload of a bash or text editor tool call */
export interface CodeExecutionResult {
  stdout?: string;
  stderr?: string;
  return_code?: number;
  content?: Array<{ file_id?: string }>;
}

export interface CodeExecutionToolResultBlock {
  type: 'bash_code_execution_tool_result' | 'text_editor_code_execution_tool_result';
  tool_use_id: string;
  content?: CodeExecutionResult | null;
}

export type CodeExecutionContentBlock =
  | CodeExecutionTextBlock
  | CodeExecutionToolUseBlock
  | CodeExecutionToolResultBlock;

/** Response shape from beta messages.create with code execution */
export interface CodeExecutionResponse {
  container?: { id: string };
  content: CodeExecutionContentBlock[];
}

/** File metadata from the Files API beta */
export interface BetaFileMeta {
  id: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
}

/** Response-like object that may have a readable body */
export interface StreamableResponse {
  body?: ReadableStream | null;
}

/** Stream event types from the beta messages.stream() API */
export type BetaStartedBlock =
  | { type: 'tool_use' | 'server_tool_use'; id?: string; name?: string }
  | {
      type: 'bash_code_execution_tool_result' | 'text_editor_code_execution_tool_result';
      content?: CodeExecutionResult | null;
    }
  | { type: 'text' | 'thinking' | 'redacted_thinking' };

export interface BetaContentBlockStart {
  type: 'content_block_start';
  index: number;
  content_block: BetaStartedBlock;
}

export type BetaBlockDelta =
  | { type: 'thinking_delta'; thinking: string }
  | { type: 'signature_delta'; signature: string }
  | { type: 'text_delta'; text: string }
  | { type: 'input_json_delta'; partial_json: string };

export interface BetaContentBlockDelta {
  type: 'content_block_delta';
  index: number;
  delta: BetaBlockDelta;
}

export interface BetaContentBlockStop {
  type: 'content_block_stop';
  index: number;
}

export interface BetaMessageStart {
  type: 'message_start';
  message: { container?: { id: string } };
}

export interface BetaMessageDelta {
  type: 'message_delta';
  delta: { stop_reason?: string | null; stop_sequence?: string | null };
  usage?: { input_tokens?: number | null; output_tokens?: number | null };
}

export type BetaStreamEvent =
  | BetaContentBlockStart
  | BetaContentBlockDelta
  | BetaContentBlockStop
  | BetaMessageStart
  | BetaMessageDelta;

/** Stream response from beta.messages.stream() */
export interface BetaStreamResponse extends AsyncIterable<BetaStreamEvent> {
  finalMessage(): Promise<CodeExecutionResponse>;
}

/** Typed wrapper for the Anthropic beta client methods we use */
export interface AnthropicBetaClient {
  beta: {
    messages: {
      create(
        params: Anthropic.Beta.Messages.MessageCreateParamsNonStreaming,
      ): Promise<CodeExecutionResponse>;
      stream(params: Anthropic.Beta.Messages.MessageCreateParamsNonStreaming): BetaStreamResponse;
    };
    files: {
      download(
        id: string,
        options: { betas: string[] },
      ): Promise<Response | ArrayBuffer | ArrayBufferView | StreamableResponse>;
      retrieveMetadata(id: string, options: { betas: string[] }): Promise<BetaFileMeta>;
    };
  };
}
