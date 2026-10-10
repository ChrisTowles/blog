import { Container } from '@cloudflare/containers';

/** Bindings the Worker passes through to the container. Secrets come from `wrangler secret put`. */
export interface AviationContainerEnv {
  R2_ACCOUNT_ID: string;
  R2_BUCKET: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
}

/**
 * DuckDB over R2 Parquet (`services/aviation`). Egress stays on because DuckDB reaches R2 through
 * its public S3 endpoint; the container itself only accepts SELECTs under `aviation://`.
 */
export class AviationContainer extends Container<AviationContainerEnv> {
  override defaultPort = 8080;

  override sleepAfter = '10m';

  constructor(ctx: ConstructorParameters<typeof Container>[0], env: AviationContainerEnv) {
    super(ctx, env);
    this.envVars = {
      R2_ACCOUNT_ID: env.R2_ACCOUNT_ID,
      R2_BUCKET: env.R2_BUCKET,
      R2_ACCESS_KEY_ID: env.R2_ACCESS_KEY_ID,
      R2_SECRET_ACCESS_KEY: env.R2_SECRET_ACCESS_KEY,
    };
  }
}
