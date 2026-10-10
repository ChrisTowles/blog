import { z } from 'zod';

const envSchema = z.object({
  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET: z.string().min(1),
  // Only for tests against a local S3 server; production derives it from the account id.
  R2_ENDPOINT: z.url().optional(),
  PORT: z.coerce.number().int().positive().default(8080),
  DUCKDB_EXTENSION_DIR: z.string().min(1).optional(),
  AVIATION_DUCKDB_MEMORY_LIMIT: z.string().min(1).default('2GB'),
  AVIATION_DUCKDB_THREADS: z.coerce.number().int().positive().default(2),
});

export interface AviationConfig {
  port: number;
  bucket: string;
  endpoint: string;
  useSsl: boolean;
  keyId: string;
  secret: string;
  extensionDir: string | undefined;
  memoryLimit: string;
  threads: number;
}

export function readConfig(env: NodeJS.ProcessEnv): AviationConfig {
  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    const missing = parsed.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(`aviation container: invalid environment (${missing})`);
  }

  const e = parsed.data;
  const origin = new URL(e.R2_ENDPOINT ?? `https://${e.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`);

  return {
    port: e.PORT,
    bucket: e.R2_BUCKET,
    endpoint: origin.host,
    useSsl: origin.protocol === 'https:',
    keyId: e.R2_ACCESS_KEY_ID,
    secret: e.R2_SECRET_ACCESS_KEY,
    extensionDir: e.DUCKDB_EXTENSION_DIR,
    memoryLimit: e.AVIATION_DUCKDB_MEMORY_LIMIT,
    threads: e.AVIATION_DUCKDB_THREADS,
  };
}
