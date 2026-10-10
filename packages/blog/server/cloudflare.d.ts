import type * as CF from '@cloudflare/workers-types/index';

// Only the binding types are aliased into the global scope. Referencing the whole
// workers-types runtime would replace DOM `Response.json()` and friends with
// `unknown`-returning variants across every server file.
declare global {
  type D1Database = CF.D1Database;
  type R2Bucket = CF.R2Bucket;
  type VectorizeIndex = CF.VectorizeIndex;
  type RateLimit = CF.RateLimit;
  type Ai = CF.Ai;
  type Fetcher = CF.Fetcher;
  type ExecutionContext = CF.ExecutionContext;
  type IncomingRequestCfProperties = CF.IncomingRequestCfProperties;
}

declare module 'h3' {
  interface H3EventContext {
    cf: IncomingRequestCfProperties;
    cloudflare: {
      request: Request;
      env: Env;
      context: ExecutionContext;
    };
  }
}
