import { Container } from '@cloudflare/containers';
import { AVIATION_S3_HOST, handleAviationS3, type AviationS3Env } from './aviation-r2-s3';

export { ContainerProxy } from '@cloudflare/containers';

/**
 * DuckDB over R2 Parquet (`services/aviation`). The container has no credentials and no
 * internet: its S3 client talks plain HTTP to a fake host that the Worker answers from the
 * `MEDIA` bucket binding (see `aviation-r2-s3.ts`). It only accepts SELECTs under `aviation://`.
 */
export class AviationContainer extends Container<AviationS3Env> {
  override defaultPort = 8080;

  override sleepAfter = '10m';

  override enableInternet = false;

  // Assigned, not declared: a static field would shadow the base class setter that fills the
  // registry ContainerProxy reads.
  static {
    AviationContainer.outboundByHost = {
      [AVIATION_S3_HOST]: (request: Request, env: AviationS3Env) => handleAviationS3(request, env),
    };
  }

  constructor(ctx: ConstructorParameters<typeof Container>[0], env: AviationS3Env) {
    super(ctx, env);

    if (!env.R2_BUCKET) throw new Error('aviation: R2_BUCKET var is missing from this environment');

    this.envVars = { R2_BUCKET: env.R2_BUCKET };
  }
}
