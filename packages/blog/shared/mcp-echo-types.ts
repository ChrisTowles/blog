export interface EchoToolResult {
  message: string;
  timestamp: string;
}

export const ECHO_UI_RESOURCE_URI = 'ui://echo-result';

export const ECHO_TOOL_NAMES = {
  ECHO: 'echo',
} as const;
