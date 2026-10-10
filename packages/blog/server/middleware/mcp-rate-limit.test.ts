import { describe, expect, it, vi } from 'vitest';
import { isAllowed } from './mcp-rate-limit';

describe('mcp rate limit', () => {
  it('passes the caller key to the binding and returns its verdict', async () => {
    const limit = vi.fn().mockResolvedValueOnce({ success: true }).mockResolvedValue({
      success: false,
    });

    expect(await isAllowed({ limit }, '1.2.3.4')).toBe(true);
    expect(await isAllowed({ limit }, '1.2.3.4')).toBe(false);
    expect(limit).toHaveBeenCalledWith({ key: '1.2.3.4' });
  });
});
