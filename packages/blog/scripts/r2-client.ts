/**
 * Minimal S3 SigV4 PUT for Cloudflare R2. The ETL only ever uploads whole files, so a signer
 * built on node:crypto replaces an AWS SDK dependency.
 */

import { createHash, createHmac } from 'node:crypto';

export interface R2Credentials {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface R2Target {
  /** Origin only, e.g. `https://<account>.r2.cloudflarestorage.com`. */
  endpoint: string;
  bucket: string;
  credentials: R2Credentials;
}

const REGION = 'auto';

const SERVICE = 's3';

export const UNSIGNED_PAYLOAD = 'UNSIGNED-PAYLOAD';

function sha256Hex(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

function hmac(key: string | Buffer, data: string): Buffer {
  return createHmac('sha256', key).update(data).digest();
}

function encodeSegment(segment: string): string {
  return encodeURIComponent(segment).replace(
    /[!'()*]/g,
    (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function amzDate(now: Date): string {
  return now.toISOString().replace(/[:-]|\.\d{3}/g, '');
}

/**
 * Returns the request headers with `authorization`, `x-amz-date` and `x-amz-content-sha256`
 * added. Every header present on `headers` is signed.
 */
export function signRequest(
  method: string,
  url: URL,
  headers: Headers,
  payloadHash: string,
  credentials: R2Credentials,
  now: Date,
  region: string = REGION,
): Headers {
  const signed = new Headers(headers);
  const stamp = amzDate(now);
  const day = stamp.slice(0, 8);

  signed.set('host', url.host);
  signed.set('x-amz-date', stamp);
  signed.set('x-amz-content-sha256', payloadHash);

  const names = [...signed.keys()].map((name) => name.toLowerCase()).toSorted();
  const canonicalHeaders = names.map((name) => `${name}:${signed.get(name)?.trim()}\n`).join('');
  const signedHeaders = names.join(';');
  const canonicalPath = url.pathname.split('/').map(encodeSegment).join('/');

  const canonicalQuery = [...url.searchParams.entries()]
    .map(([k, v]) => `${encodeSegment(k)}=${encodeSegment(v)}`)
    .toSorted()
    .join('&');

  const canonicalRequest = [
    method,
    canonicalPath,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const scope = `${day}/${region}/${SERVICE}/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', stamp, scope, sha256Hex(canonicalRequest)].join('\n');

  let signingKey: Buffer | string = `AWS4${credentials.secretAccessKey}`;

  for (const part of [day, region, SERVICE, 'aws4_request']) signingKey = hmac(signingKey, part);

  const signature = createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  signed.set(
    'authorization',
    `AWS4-HMAC-SHA256 Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
  );

  return signed;
}

export async function putObject(
  target: R2Target,
  key: string,
  body: Buffer<ArrayBuffer> | string,
  contentType: string,
  cacheControl: string,
): Promise<void> {
  const url = new URL(`/${target.bucket}/${key}`, target.endpoint);
  const headers = new Headers({ 'content-type': contentType, 'cache-control': cacheControl });
  const signed = signRequest('PUT', url, headers, UNSIGNED_PAYLOAD, target.credentials, new Date());
  signed.delete('host');

  const response = await fetch(url, { method: 'PUT', headers: signed, body });

  if (!response.ok) {
    throw new Error(`R2 PUT ${key} failed: ${response.status} ${await response.text()}`);
  }
}
