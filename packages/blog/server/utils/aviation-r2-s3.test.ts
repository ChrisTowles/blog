import { describe, expect, it } from 'vitest';
import { handleAviationS3, type AviationR2Source, type AviationS3Env } from './aviation-r2-s3';

const UPLOADED = new Date('2026-01-02T03:04:05Z');

function createBucket(files: Record<string, string>): AviationR2Source {
  const meta = (key: string) => ({
    key,
    size: files[key]!.length,
    httpEtag: `"etag-${key}"`,
    uploaded: UPLOADED,
  });

  return {
    async head(key) {
      return key in files ? meta(key) : null;
    },
    async get(key, { range }) {
      if (!(key in files)) return null;

      const bytes = new TextEncoder().encode(
        files[key]!.slice(range.offset, range.offset + range.length),
      );

      return { ...meta(key), arrayBuffer: async () => bytes.buffer };
    },
    async list({ prefix, limit, cursor }) {
      const keys = Object.keys(files)
        .filter((key) => key.startsWith(prefix))
        .toSorted();

      const start = cursor ? keys.indexOf(cursor) : 0;
      const page = keys.slice(start, start + limit);
      const next = keys[start + limit];

      return { objects: page.map(meta), truncated: next !== undefined, cursor: next };
    },
  };
}

const env: AviationS3Env = {
  R2_BUCKET: 'media',
  MEDIA: createBucket({
    'aviation/a.parquet': '0123456789',
    'aviation/dims/b.parquet': 'abcdef',
    'aviation/dims/c.parquet': 'xyz',
    'secrets/key.txt': 'nope',
  }),
};

function call(path: string, init: RequestInit = {}) {
  return handleAviationS3(new Request(`http://r2.internal${path}`, init), env);
}

describe('handleAviationS3 reads', () => {
  it('returns a whole object with validators', async () => {
    const res = await call('/media/aviation/a.parquet');

    expect(res.status).toBe(200);
    expect(res.headers.get('content-length')).toBe('10');
    expect(res.headers.get('etag')).toBe('"etag-aviation/a.parquet"');
    expect(res.headers.get('last-modified')).toBe(UPLOADED.toUTCString());
    expect(await res.text()).toBe('0123456789');
  });

  it('serves a bounded range as 206 with Content-Range', async () => {
    const res = await call('/media/aviation/a.parquet', { headers: { range: 'bytes=2-5' } });

    expect(res.status).toBe(206);
    expect(res.headers.get('content-range')).toBe('bytes 2-5/10');
    expect(res.headers.get('content-length')).toBe('4');
    expect(await res.text()).toBe('2345');
  });

  it('clamps an end past the object and supports open-ended and suffix ranges', async () => {
    const open = await call('/media/aviation/a.parquet', { headers: { range: 'bytes=7-' } });
    const clamped = await call('/media/aviation/a.parquet', { headers: { range: 'bytes=8-99' } });
    const suffix = await call('/media/aviation/a.parquet', { headers: { range: 'bytes=-3' } });

    expect(await open.text()).toBe('789');
    expect(clamped.headers.get('content-range')).toBe('bytes 8-9/10');
    expect(suffix.headers.get('content-range')).toBe('bytes 7-9/10');
    expect(await suffix.text()).toBe('789');
  });

  it('answers 416 when the range starts past the end', async () => {
    const res = await call('/media/aviation/a.parquet', { headers: { range: 'bytes=10-12' } });

    expect(res.status).toBe(416);
    expect(res.headers.get('content-range')).toBe('bytes */10');
  });

  it('HEAD returns size and validators without a body', async () => {
    const res = await call('/media/aviation/a.parquet', { method: 'HEAD' });

    expect(res.status).toBe(200);
    expect(res.headers.get('content-length')).toBe('10');
    expect(await res.text()).toBe('');
  });

  it('404s a missing key with an S3 error body', async () => {
    const res = await call('/media/aviation/missing.parquet');

    expect(res.status).toBe(404);
    expect(await res.text()).toContain('<Code>NoSuchKey</Code>');
  });
});

describe('handleAviationS3 listing', () => {
  it('lists keys under a prefix as ListObjectsV2 XML', async () => {
    const res = await call('/media/?list-type=2&prefix=aviation%2Fdims%2F');
    const body = await res.text();

    expect(res.status).toBe(200);
    expect(body).toContain('<IsTruncated>false</IsTruncated>');
    expect(body).toContain('<Key>aviation/dims/b.parquet</Key>');
    expect(body).toContain('<Size>3</Size>');
    expect(body).not.toContain('aviation/a.parquet');
  });

  it('url-encodes keys when encoding-type=url is requested', async () => {
    const res = await call('/media?list-type=2&encoding-type=url&prefix=aviation%2Fdims%2F');

    expect(await res.text()).toContain('<Key>aviation%2Fdims%2Fb.parquet</Key>');
  });

  it('paginates with continuation tokens', async () => {
    const first = await (await call('/media/?list-type=2&prefix=aviation%2F&max-keys=2')).text();

    expect(first).toContain('<IsTruncated>true</IsTruncated>');
    expect(first).toContain('<KeyCount>2</KeyCount>');

    const token = /<NextContinuationToken>(.+?)<\/NextContinuationToken>/.exec(first)![1]!;

    const second = await (
      await call(`/media/?list-type=2&prefix=aviation%2F&max-keys=2&continuation-token=${token}`)
    ).text();

    expect(second).toContain('<IsTruncated>false</IsTruncated>');
    expect(second).toContain('<Key>aviation/dims/c.parquet</Key>');
    expect(second).not.toContain('<Key>aviation/a.parquet</Key>');
  });

  it('refuses prefixes outside aviation/', async () => {
    for (const prefix of ['', 'secrets%2F', 'aviation', 'aviation%2F..%2F']) {
      const res = await call(`/media/?list-type=2&prefix=${prefix}`);

      expect(res.status, prefix).toBe(403);
    }
  });
});

describe('handleAviationS3 guards', () => {
  it('rejects keys outside aviation/ and traversal', async () => {
    for (const path of [
      '/media/secrets/key.txt',
      '/media/aviation/../secrets/key.txt',
      '/media/aviationx/a.parquet',
    ]) {
      const res = await call(path);

      expect(res.status, path).toBe(403);
    }
  });

  it('rejects other buckets', async () => {
    expect((await call('/other/aviation/a.parquet')).status).toBe(403);
    expect((await call('/?list-type=2&prefix=aviation%2F')).status).toBe(403);
  });

  it('rejects every method except GET and HEAD', async () => {
    for (const method of ['PUT', 'POST', 'DELETE']) {
      const res = await call('/media/aviation/a.parquet', { method, body: 'x' });

      expect(res.status, method).toBe(405);
    }
  });
});
