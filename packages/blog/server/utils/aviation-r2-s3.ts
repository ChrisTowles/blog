/**
 * The slice of S3 that DuckDB's httpfs sends, answered from an R2 bucket binding. The aviation
 * container has no R2 credentials: its S3 endpoint is a fake host the Worker intercepts, so
 * SigV4 headers are ignored and access is limited to reads under `aviation/`.
 */

export const AVIATION_S3_HOST = 'r2.internal';

const ALLOWED_PREFIX = 'aviation/';

const MAX_KEYS = 1000;

interface R2Meta {
  key: string;
  size: number;
  httpEtag: string;
  uploaded: Date;
}

interface R2Body extends R2Meta {
  arrayBuffer(): Promise<ArrayBuffer>;
}

/** The subset of `R2Bucket` used here, so tests can supply an in-memory bucket. */
export interface AviationR2Source {
  head(key: string): Promise<R2Meta | null>;
  get(key: string, options: { range: { offset: number; length: number } }): Promise<R2Body | null>;
  list(options: { prefix: string; limit: number; cursor?: string }): Promise<{
    objects: R2Meta[];
    truncated: boolean;
    cursor?: string;
  }>;
}

export interface AviationS3Env {
  R2_BUCKET?: string;
  MEDIA: AviationR2Source;
}

function xml(status: number, body: string): Response {
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>${body}`, {
    status,
    headers: { 'content-type': 'application/xml' },
  });
}

function s3Error(status: number, code: string, message: string): Response {
  return xml(status, `<Error><Code>${code}</Code><Message>${escapeXml(message)}</Message></Error>`);
}

function escapeXml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function isAllowedKey(key: string): boolean {
  return key.startsWith(ALLOWED_PREFIX) && !key.split('/').includes('..');
}

function objectHeaders(meta: R2Meta): Headers {
  return new Headers({
    ETag: meta.httpEtag,
    'Last-Modified': meta.uploaded.toUTCString(),
    'Accept-Ranges': 'bytes',
  });
}

type ByteRange = { offset: number; length: number } | 'unsatisfiable';

/** Single `bytes=a-b`, `bytes=a-` or `bytes=-n` ranges; DuckDB never sends multi-range. */
function parseRange(header: string, size: number): ByteRange | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header);

  if (!match || (match[1] === '' && match[2] === '')) return null;

  if (match[1] === '') {
    const suffix = Math.min(Number(match[2]), size);

    return suffix === 0 ? 'unsatisfiable' : { offset: size - suffix, length: suffix };
  }

  const start = Number(match[1]);
  const end = match[2] === '' ? size - 1 : Math.min(Number(match[2]), size - 1);

  if (start >= size || end < start) return 'unsatisfiable';

  return { offset: start, length: end - start + 1 };
}

async function readObject(
  bucket: AviationR2Source,
  key: string,
  request: Request,
): Promise<Response> {
  const meta = await bucket.head(key);

  if (!meta) return s3Error(404, 'NoSuchKey', 'The specified key does not exist.');

  const headers = objectHeaders(meta);
  const header = request.headers.get('range');
  const range = header ? parseRange(header, meta.size) : null;

  if (range === 'unsatisfiable') {
    headers.set('Content-Range', `bytes */${meta.size}`);

    return new Response(null, { status: 416, headers });
  }

  const length = range ? range.length : meta.size;

  headers.set('Content-Length', String(length));
  headers.set('Content-Type', 'application/octet-stream');

  if (range) {
    headers.set('Content-Range', `bytes ${range.offset}-${range.offset + length - 1}/${meta.size}`);
  }

  const status = range ? 206 : 200;

  if (request.method === 'HEAD') return new Response(null, { status, headers });

  const object = await bucket.get(key, { range: range ?? { offset: 0, length: meta.size } });

  if (!object) return s3Error(404, 'NoSuchKey', 'The specified key does not exist.');

  return new Response(await object.arrayBuffer(), { status, headers });
}

async function listObjects(bucket: AviationR2Source, name: string, url: URL): Promise<Response> {
  const prefix = url.searchParams.get('prefix') ?? '';

  if (!isAllowedKey(prefix)) {
    return s3Error(403, 'AccessDenied', `Listing is limited to ${ALLOWED_PREFIX}`);
  }

  const requested = Number(url.searchParams.get('max-keys') ?? MAX_KEYS);

  const limit =
    Number.isInteger(requested) && requested > 0 ? Math.min(requested, MAX_KEYS) : MAX_KEYS;

  const token = url.searchParams.get('continuation-token') ?? undefined;
  const page = await bucket.list({ prefix, limit, cursor: token });

  const encode = url.searchParams.get('encoding-type') === 'url';
  const keyText = (key: string) => (encode ? encodeURIComponent(key) : escapeXml(key));

  const contents = page.objects
    .map(
      (object) =>
        `<Contents><Key>${keyText(object.key)}</Key>` +
        `<LastModified>${object.uploaded.toISOString()}</LastModified>` +
        `<ETag>${escapeXml(object.httpEtag)}</ETag><Size>${object.size}</Size>` +
        `<StorageClass>STANDARD</StorageClass></Contents>`,
    )
    .join('');

  const next =
    page.truncated && page.cursor
      ? `<NextContinuationToken>${escapeXml(page.cursor)}</NextContinuationToken>`
      : '';

  return xml(
    200,
    `<ListBucketResult xmlns="http://s3.amazonaws.com/doc/2006-03-01/">` +
      `<Name>${escapeXml(name)}</Name><Prefix>${keyText(prefix)}</Prefix>` +
      `<KeyCount>${page.objects.length}</KeyCount><MaxKeys>${limit}</MaxKeys>` +
      (encode ? '<EncodingType>url</EncodingType>' : '') +
      `<IsTruncated>${page.truncated}</IsTruncated>${next}${contents}</ListBucketResult>`,
  );
}

/** Outbound handler for `r2.internal`: path-style `/<bucket>/<key>` reads and `ListObjectsV2`. */
export async function handleAviationS3(request: Request, env: AviationS3Env): Promise<Response> {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return s3Error(405, 'MethodNotAllowed', 'Only GET and HEAD are supported.');
  }

  const url = new URL(request.url);
  const [encodedBucket = '', ...rest] = url.pathname.slice(1).split('/');
  const bucketName = decodeURIComponent(encodedBucket);

  if (bucketName !== env.R2_BUCKET) {
    return s3Error(403, 'AccessDenied', 'Unknown bucket.');
  }

  const key = decodeURIComponent(rest.join('/'));

  if (key === '') {
    if (url.searchParams.get('list-type') !== '2') {
      return s3Error(400, 'InvalidRequest', 'Only ListObjectsV2 is supported.');
    }

    return listObjects(env.MEDIA, bucketName, url);
  }

  if (!isAllowedKey(key))
    return s3Error(403, 'AccessDenied', `Access is limited to ${ALLOWED_PREFIX}`);

  return readObject(env.MEDIA, key, request);
}
