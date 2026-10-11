import { z } from 'zod';

const fetchErrorSchema = z.object({
  statusMessage: z.string().optional(),
  message: z.string().optional(),
  data: z.object({ statusMessage: z.string().optional() }).optional(),
});

/** The server's `statusMessage` when present; `useMessage` also accepts the error's own message. */
export function fetchErrorMessage(
  cause: unknown,
  fallback: string,
  { useMessage = false } = {},
): string {
  const parsed = fetchErrorSchema.safeParse(cause);

  if (!parsed.success) return fallback;
  const { statusMessage, message, data } = parsed.data;

  return statusMessage ?? data?.statusMessage ?? (useMessage ? message : undefined) ?? fallback;
}
