// @vitest-environment node
import { createServer, type IncomingHttpHeaders, type RequestListener } from 'node:http';
import type { AddressInfo } from 'node:net';
import { describe, expect, test } from 'vitest';
import { putObject, signRequest } from './r2-client';

const AWS_EXAMPLE_CREDENTIALS = {
  accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
  secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
};

const EMPTY_PAYLOAD_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

describe('signRequest', () => {
  test('matches the AWS documented GET Object signature', () => {
    const headers = signRequest(
      'GET',
      new URL('https://examplebucket.s3.amazonaws.com/test.txt'),
      new Headers({ range: 'bytes=0-9' }),
      EMPTY_PAYLOAD_SHA256,
      AWS_EXAMPLE_CREDENTIALS,
      new Date('2013-05-24T00:00:00Z'),
      'us-east-1',
    );

    expect(headers.get('authorization')).toBe(
      'AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE/20130524/us-east-1/s3/aws4_request, ' +
        'SignedHeaders=host;range;x-amz-content-sha256;x-amz-date, ' +
        'Signature=f0e8bdb87c964420e857bd35b5d6ed310bd44f0170aba48dd91039c6036bdb41',
    );
  });
});

interface SeenRequest {
  url?: string;
  headers?: IncomingHttpHeaders;
  body?: string;
}

async function listen(handler: RequestListener): Promise<{ origin: string; close: () => void }> {
  const server = createServer(handler);
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
  // SAFETY: listening on a numeric port always yields an AddressInfo, never a pipe path.
  const { port } = server.address() as AddressInfo;

  return { origin: `http://127.0.0.1:${port}`, close: () => server.close() };
}

describe('putObject', () => {
  test('sends a signed PUT with the body and content headers', async () => {
    const seen: SeenRequest = {};

    const server = await listen((req, res) => {
      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', () => {
        seen.url = req.url;
        seen.headers = req.headers;
        seen.body = Buffer.concat(chunks).toString('utf8');
        res.writeHead(200).end();
      });
    });

    try {
      await putObject(
        { endpoint: server.origin, bucket: 'bkt', credentials: AWS_EXAMPLE_CREDENTIALS },
        'aviation/dims/a b.parquet',
        'payload',
        'application/x-parquet',
        'public, max-age=3600',
      );
    } finally {
      server.close();
    }

    expect(seen.url).toBe('/bkt/aviation/dims/a%20b.parquet');
    expect(seen.body).toBe('payload');
    expect(seen.headers?.['content-type']).toBe('application/x-parquet');
    expect(seen.headers?.['x-amz-content-sha256']).toBe('UNSIGNED-PAYLOAD');
    expect(seen.headers?.authorization).toMatch(
      /^AWS4-HMAC-SHA256 Credential=AKIAIOSFODNN7EXAMPLE\/\d{8}\/auto\/s3\/aws4_request, SignedHeaders=cache-control;content-type;host;x-amz-content-sha256;x-amz-date, Signature=[0-9a-f]{64}$/,
    );
  });

  test('throws with the status when R2 rejects the upload', async () => {
    const server = await listen((_req, res) => {
      res.writeHead(403).end('denied');
    });

    try {
      await expect(
        putObject(
          { endpoint: server.origin, bucket: 'bkt', credentials: AWS_EXAMPLE_CREDENTIALS },
          'k',
          'x',
          'text/plain',
          'no-cache',
        ),
      ).rejects.toThrow(/403 denied/);
    } finally {
      server.close();
    }
  });
});
