// Build-time stand-in for `@duckdb/node-api`: the native binding cannot load in a Worker.
// Aliased in `nuxt.config.ts`; delete both when the aviation wave moves DuckDB into the
// AVIATION container and removes `server/utils/mcp/aviation/duckdb.ts`.
export const DuckDBInstance = {
  create(): never {
    throw new Error(
      'DuckDB is unavailable on Workers; aviation queries run in the AVIATION container',
    );
  },
};
