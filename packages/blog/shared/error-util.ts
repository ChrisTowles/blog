export function extractErrorMessage(cause: unknown): string {
  if (!(cause instanceof Error) || !cause.message) {
    return 'An unexpected error occurred';
  }

  // Try to parse as JSON error
  if (cause.message.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(cause.message);

      return parsed.message || cause.message;
    } catch {
      // Fall through to return original message
    }
  }

  return cause.message;
}
