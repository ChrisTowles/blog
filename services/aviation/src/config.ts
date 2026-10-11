import { z } from 'zod';

const envSchema = z.object({
  R2_BUCKET: z.string().min(1),
  // The Worker intercepts this fake host; no real network endpoint is involved.
  AVIATION_S3_ENDPOINT: z.string().min(1).default('r2.internal'),
  PORT: z.coerce.number().int().positive().default(8080),
  DUCKDB_EXTENSION_DIR: z.string().min(1).optional(),
  AVIATION_DUCKDB_MEMORY_LIMIT: z.string().min(1).default('2GB'),
  AVIATION_DUCKDB_THREADS: z.coerce.number().int().positive().default(2),
});

export interface AviationConfig {
  port: number;
  bucket: string;
  endpoint: string;
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

  return {
    port: e.PORT,
    bucket: e.R2_BUCKET,
    endpoint: e.AVIATION_S3_ENDPOINT,
    extensionDir: e.DUCKDB_EXTENSION_DIR,
    memoryLimit: e.AVIATION_DUCKDB_MEMORY_LIMIT,
    threads: e.AVIATION_DUCKDB_THREADS,
  };
}
