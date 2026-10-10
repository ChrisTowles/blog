// Nitro auto-imports are globals at runtime. Stub the two the integration tests reach:
// `useEvent` hands `useDrizzle()` a D1 binding, `useRuntimeConfig` feeds the AWS clients.
import { afterAll, vi } from 'vitest';
import { createTestD1 } from './server/test-utils/d1';

const { db, dispose } = await createTestD1();

vi.stubGlobal('useEvent', () => ({ context: { cloudflare: { env: { DB: db } } } }));

vi.stubGlobal('useRuntimeConfig', () => ({ awsRegion: process.env.AWS_REGION || 'us-east-1' }));

afterAll(dispose);
