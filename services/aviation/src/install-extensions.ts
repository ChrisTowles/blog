import { DuckDBInstance } from '@duckdb/node-api';

const extensionDir = process.env.DUCKDB_EXTENSION_DIR;

if (!extensionDir) throw new Error('DUCKDB_EXTENSION_DIR is required');

const instance = await DuckDBInstance.create(':memory:', { extension_directory: extensionDir });

const conn = await instance.connect();

await conn.run('INSTALL httpfs');

await conn.run('LOAD httpfs');

conn.closeSync();
