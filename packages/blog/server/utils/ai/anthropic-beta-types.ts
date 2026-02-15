/**
 * Type definitions for Anthropic beta APIs (Code Execution, Files).
 * These beta response shapes are not yet in the official SDK types.
 *
 * Response format reference (code_execution_20250825):
 * - bash_code_execution_tool_result → { type, stdout, stderr, return_code, content: file[] }
 * - text_editor_code_execution_tool_result → { type, ... }
 * - server_tool_use with name "bash_code_execution" or "text_editor_code_execution"
 */

/** Content block types from the Code Execution beta response */
export interface CodeExecutionTextBlock {
  type: 'text';
  text: string;
}

export interface CodeExecutionToolUseBlock {
  type: 'server_tool_use';
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: Record<string, any>;
}

export interface CodeExecutionToolResultBlock {
  type: 'bash_code_execution_tool_result' | 'text_editor_code_execution_tool_result';
  tool_use_id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
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

/** Typed wrapper for the Anthropic beta client methods we use */
export interface AnthropicBetaClient {
  beta: {
    messages: {
      create(params: Record<string, unknown>): Promise<CodeExecutionResponse>;
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
