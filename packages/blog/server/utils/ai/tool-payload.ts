export type ToolPayload =
  | string
  | number
  | boolean
  | null
  | undefined
  | ToolPayload[]
  | { [key: string]: ToolPayload };
