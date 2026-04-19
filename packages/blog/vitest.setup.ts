// Vitest setup file
// Provides Nitro server auto-imports as globals for testing

// Aviation DuckDB tests exercise applyLockdownAndLoadHttpfs, which requires
// GCS HMAC creds to be set. Tests that hit real GCS live in integration.test.ts
// (excluded from `pnpm test`); unit tests only run local SELECTs that never
// actually authenticate, so fake creds are fine.
if (!process.env.GCS_HMAC_KEY_ID) process.env.GCS_HMAC_KEY_ID = 'test-hmac-key-id';
if (!process.env.GCS_HMAC_SECRET) process.env.GCS_HMAC_SECRET = 'test-hmac-secret';
