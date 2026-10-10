// Nitro auto-imports are globals at runtime. Stub the one the integration tests reach:
// `useEvent` hands `useDrizzle()` a D1 binding.
import { afterAll, vi } from 'vitest';
import { createTestD1 } from './server/test-utils/d1';

const { db, dispose } = await createTestD1();

vi.stubGlobal('useEvent', () => ({ context: { cloudflare: { env: { DB: db } } } }));

afterAll(dispose);
