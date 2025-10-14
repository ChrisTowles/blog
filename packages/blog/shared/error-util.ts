export function extractErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') {
    return 'An unexpected error occurred'
  }

  const err = error as { message?: string }
  if (!err.message) {
    return 'An unexpected error occurred'
  }

  // Try to parse as JSON error
  if (err.message.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(err.message)
      return parsed.message || err.message
    } catch {
      // Fall through to return original message
    }
  }

  return err.message
}
