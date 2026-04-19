/**
 * ETL: Aviation demo dataset → Parquet → GCS
 *
 * Unit 1 of the MCP UI-in-Chat aviation demo plan
 * (docs/plans/2026-04-14-001-feat-mcp-ui-in-chat-plan.md).
 *
 * Downloads three public-domain sources, transforms CSVs to Parquet via DuckDB
 * in-process, then uploads to a private GCS bucket that the MCP server reads
 * via HMAC-authenticated httpfs.
 *
 *   - FAA Aircraft Registry (US public domain)   → dims/aircraft.parquet
 *                                                 → dims/aircraft_types.parquet
 *     (auto-downloaded from registry.faa.gov; requires `unzip` on PATH)
 *   - BTS T-100 Market (US public domain)        → facts/bts_t100_<yyyymm>.parquet
 *     (BTS only serves T-100 via an ASP.NET form — the script drives it
 *     headlessly via Playwright, one download per month, skipping periods
 *     with no published data)
 *   - OpenFlights (ODbL w/ attribution)          → dims/airports.parquet
 *                                                 → dims/airlines.parquet
 *                                                 → dims/routes.parquet
 *   - Curated carrier → operator lookup           → ref/carrier_to_operator.parquet
 *   - Pre-warm Parquet (1 row)                    → pre-warm.parquet
 *   - License attribution                         → LICENSE.txt
 *
 * Design:
 *   - Pure transform functions (run* exports) take a DuckDB connection +
 *     an input CSV path + an output Parquet path. They are unit-tested
 *     against small fixture CSVs checked into the repo at
 *     `packages/blog/scripts/__fixtures__/aviation/`.
 *   - Impure I/O (download, upload) is isolated in top-level functions that
 *     compose the pure transforms with network + GCS side effects.
 *
 * Usage:
 *   pnpm --filter @chris-towles/blog etl:aviation
 *
 * Env vars:
 *   - MCP_DATA_BUCKET         (required when uploading; e.g. blog-mcp-data-staging).
 *                             Aviation data is uploaded under the `aviation/` prefix
 *                             inside this shared MCP dataset bucket.
 *   - AVIATION_ETL_SKIP_UPLOAD  truthy → transform locally only, skip GCS upload
 *   - AVIATION_ETL_FIXTURE_DIR  if set, use fixture CSVs instead of network downloads
 *   - AVIATION_ETL_WORK_DIR    local scratch dir (defaults to os.tmpdir()/aviation-etl)
 *   - AVIATION_ETL_YEARS      number of recent years of BTS T-100 to pull (default 12)
 */

import { createWriteStream, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { spawnSync } from 'node:child_process';
import { DuckDBInstance } from '@duckdb/node-api';
import type { DuckDBConnection } from '@duckdb/node-api';
import { Storage } from '@google-cloud/storage';
import { chromium, type Page } from 'playwright-chromium';
import { consola } from 'consola';
import { config as loadDotenv } from 'dotenv';

// Load repo-root .env, but do NOT clobber vars already set in the shell.
// This lets `MCP_DATA_BUCKET=blog-mcp-data-prod pnpm etl:aviation` point at
// prod even when the dev bucket is pinned in .env. dotenv defaults to
// override=false, which is exactly the precedence we want.
loadDotenv({
  path: join(dirname(fileURLToPath(import.meta.url)), '../../../.env'),
  quiet: true,
});

const etlStart = Date.now();

function elapsed(sinceMs?: number): string {
  const ms = Date.now() - (sinceMs ?? etlStart);
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${(ms / 1000).toFixed(1)}s`;
  const m = Math.floor(ms / 60_000);
  const s = Math.round((ms % 60_000) / 1000);
  return `${m}m ${s}s`;
}

/* --------------------------------------------------------------------------
 * Pure transform functions (testable without network / GCS)
 * -------------------------------------------------------------------------- */

/**
 * Transform the FAA Aircraft Registry MASTER.txt into dims/aircraft.parquet.
 *
 * Applies the "latest wins" rule for duplicate N-numbers by keeping the row
 * with the max LAST_ACTION_DATE per N-NUMBER. Strips trailing whitespace from
 * CSV text columns (the FAA files pad fixed-width fields inside CSV cells).
 */
export async function transformFaaMaster(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
  acftrefCsvPath: string,
): Promise<void> {
  // Register the MASTER.txt file as a view so we can reference it below.
  // MASTER.txt is comma-separated and quoted; some columns have trailing
  // whitespace from the underlying fixed-width format.
  await conn.run(`CREATE OR REPLACE TEMP VIEW faa_master_raw AS
    SELECT * FROM read_csv(
      '${inputCsvPath}',
      delim = ',',
      header = true,
      quote = '"',
      null_padding = true,
      ignore_errors = false,
      all_varchar = true
    )`);

  // ACFTREF.txt has rogue quotes in data values (e.g. "B"-BALLOON where "
  // means inches). ignore_errors skips the handful of malformed rows.
  await conn.run(`CREATE OR REPLACE TEMP VIEW faa_acftref_raw AS
    SELECT * FROM read_csv(
      '${acftrefCsvPath}',
      delim = ',',
      header = true,
      quote = '"',
      all_varchar = true,
      ignore_errors = true
    )`);

  // Latest-wins dedup: pick the row with max LAST_ACTION_DATE per N-NUMBER.
  // Join with ACFTREF (aircraft-type reference) on MFR_MDL_CODE → CODE so
  // downstream queries can group by manufacturer/model without a second join.
  await conn.run(`COPY (
    WITH deduped AS (
      SELECT
        trim("N-NUMBER")                             AS n_number,
        trim("SERIAL NUMBER")                        AS serial_number,
        trim("MFR MDL CODE")                         AS mfr_mdl_code,
        TRY_CAST(trim("YEAR MFR") AS INTEGER)        AS year_manufactured,
        trim("NAME")                                 AS registrant_name,
        trim("CITY")                                 AS registrant_city,
        trim("STATE")                                AS registrant_state,
        trim("COUNTRY")                              AS registrant_country,
        TRY_CAST(trim("LAST ACTION DATE") AS INTEGER) AS last_action_date_raw,
        TRY_CAST(trim("CERT ISSUE DATE") AS INTEGER)  AS cert_issue_date_raw,
        trim("STATUS CODE")                          AS status_code,
        trim("MODE S CODE HEX")                      AS mode_s_code_hex,
        ROW_NUMBER() OVER (
          PARTITION BY trim("N-NUMBER")
          ORDER BY TRY_CAST(trim("LAST ACTION DATE") AS INTEGER) DESC NULLS LAST
        )                                            AS rn
      FROM faa_master_raw
      WHERE trim("N-NUMBER") IS NOT NULL AND trim("N-NUMBER") <> ''
    )
    SELECT
      d.n_number,
      d.serial_number,
      d.mfr_mdl_code,
      d.year_manufactured,
      d.registrant_name,
      d.registrant_city,
      d.registrant_state,
      d.registrant_country,
      d.status_code,
      d.mode_s_code_hex,
      trim(r."MFR")   AS manufacturer_name,
      trim(r."MODEL") AS model_name,
      TRY_CAST(trim(r."NO-SEATS") AS INTEGER) AS number_of_seats,
      TRY_CAST(trim(r."NO-ENG")   AS INTEGER) AS number_of_engines
    FROM deduped d
    LEFT JOIN faa_acftref_raw r
      ON trim(r."CODE") = d.mfr_mdl_code
    WHERE d.rn = 1
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/**
 * Transform the FAA ACFTREF.txt into dims/aircraft_types.parquet.
 * This is the aircraft-model reference table (manufacturer + model + seats).
 */
export async function transformFaaAcftref(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(`COPY (
    SELECT
      trim("CODE")                                AS mfr_mdl_code,
      trim("MFR")                                 AS manufacturer_name,
      trim("MODEL")                               AS model_name,
      TRY_CAST(trim("NO-ENG") AS INTEGER)         AS number_of_engines,
      TRY_CAST(trim("NO-SEATS") AS INTEGER)       AS number_of_seats,
      trim("AC-WEIGHT")                           AS weight_class,
      TRY_CAST(trim("SPEED") AS INTEGER)          AS cruise_speed_knots
    FROM read_csv(
      '${inputCsvPath}',
      delim = ',',
      header = true,
      quote = '"',
      all_varchar = true,
      ignore_errors = true
    )
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/**
 * Transform one month of BTS T-100 Market CSV → facts/bts_t100_<yyyymm>.parquet.
 *
 * The BTS file is already per-month, so partitioning is a naming convention
 * rather than a Hive-style directory layout. This keeps DuckDB httpfs happy
 * (predicate pushdown on yearmonth from the filename).
 */
export async function transformBtsT100(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(`COPY (
    SELECT
      TRY_CAST("PASSENGERS" AS BIGINT)        AS passengers,
      TRY_CAST("FREIGHT" AS BIGINT)           AS freight_lbs,
      TRY_CAST("MAIL" AS BIGINT)              AS mail_lbs,
      TRY_CAST("DISTANCE" AS INTEGER)         AS distance_miles,
      "UNIQUE_CARRIER"                        AS carrier_code,
      "UNIQUE_CARRIER_NAME"                   AS carrier_name,
      "ORIGIN"                                AS origin_iata,
      "ORIGIN_CITY_NAME"                      AS origin_city,
      "ORIGIN_STATE_ABR"                      AS origin_state,
      "DEST"                                  AS dest_iata,
      "DEST_CITY_NAME"                        AS dest_city,
      "DEST_STATE_ABR"                        AS dest_state,
      TRY_CAST("YEAR" AS INTEGER)             AS year,
      TRY_CAST("MONTH" AS INTEGER)            AS month,
      "CLASS"                                 AS service_class
    FROM read_csv(
      '${inputCsvPath}',
      delim = ',',
      header = true,
      quote = '"',
      all_varchar = true
    )
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/**
 * OpenFlights airports.dat → dims/airports.parquet.
 * The file is a headerless CSV; we declare the schema explicitly.
 * OpenFlights uses literal "\N" for nulls; we translate that here.
 */
export async function transformOpenFlightsAirports(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
): Promise<void> {
  // 14-column headerless file → DuckDB auto-names column00..column13 (2-digit padding).
  await conn.run(`COPY (
    SELECT
      TRY_CAST(column00 AS INTEGER)                         AS openflights_id,
      column01                                              AS airport_name,
      column02                                              AS city,
      column03                                              AS country,
      CASE WHEN column04 = '\\N' THEN NULL ELSE column04 END AS iata,
      CASE WHEN column05 = '\\N' THEN NULL ELSE column05 END AS icao,
      CASE WHEN column06 = '\\N' THEN NULL ELSE TRY_CAST(column06 AS DOUBLE) END AS latitude,
      CASE WHEN column07 = '\\N' THEN NULL ELSE TRY_CAST(column07 AS DOUBLE) END AS longitude,
      CASE WHEN column08 = '\\N' THEN NULL ELSE TRY_CAST(column08 AS INTEGER) END AS altitude_ft,
      TRY_CAST(column09 AS DOUBLE)                          AS utc_offset_hours,
      column10                                              AS dst,
      CASE WHEN column11 = '\\N' THEN NULL ELSE column11 END AS timezone_db,
      column12                                              AS kind,
      column13                                              AS source
    FROM read_csv(
      '${inputCsvPath}',
      delim = ',',
      header = false,
      quote = '"',
      all_varchar = true
    )
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/**
 * OpenFlights airlines.dat → dims/airlines.parquet.
 */
export async function transformOpenFlightsAirlines(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(`COPY (
    SELECT
      TRY_CAST(column0 AS INTEGER)                  AS openflights_id,
      column1                                       AS airline_name,
      CASE WHEN column2 = '\\N' THEN NULL ELSE column2 END AS alias,
      CASE WHEN column3 = '\\N' THEN NULL ELSE column3 END AS iata,
      CASE WHEN column4 = '\\N' THEN NULL ELSE column4 END AS icao,
      CASE WHEN column5 = '\\N' THEN NULL ELSE column5 END AS callsign,
      column6                                       AS country,
      column7                                       AS active
    FROM read_csv(
      '${inputCsvPath}',
      delim = ',',
      header = false,
      quote = '"',
      all_varchar = true
    )
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/**
 * OpenFlights routes.dat → dims/routes.parquet.
 */
export async function transformOpenFlightsRoutes(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(`COPY (
    SELECT
      column0                                       AS airline_iata,
      TRY_CAST(column1 AS INTEGER)                  AS airline_openflights_id,
      column2                                       AS source_airport_iata,
      TRY_CAST(column3 AS INTEGER)                  AS source_airport_openflights_id,
      column4                                       AS dest_airport_iata,
      TRY_CAST(column5 AS INTEGER)                  AS dest_airport_openflights_id,
      column6                                       AS codeshare,
      TRY_CAST(column7 AS INTEGER)                  AS stops,
      column8                                       AS equipment
    FROM read_csv(
      '${inputCsvPath}',
      delim = ',',
      header = false,
      quote = '"',
      all_varchar = true
    )
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/**
 * Convert a curated carrier → operator lookup CSV into Parquet as-is.
 * Used by the integration test suite to exercise join logic against a
 * fixture CSV. Production uses generateCarrierToOperator below.
 */
export async function transformCarrierToOperator(
  conn: DuckDBConnection,
  csvPath: string,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(
    `COPY (
      SELECT * FROM read_csv(
        '${csvPath}',
        delim = ',', header = true, quote = '"', all_varchar = true
      )
    ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`,
  );
}

/**
 * Auto-generate the carrier-to-operator lookup by joining distinct BTS
 * carrier codes against FAA registrant names. Replaces the old hand-curated
 * CSV — no manual curation needed.
 */
export async function generateCarrierToOperator(
  conn: DuckDBConnection,
  btsT100Csvs: Array<{ csvPath: string }>,
  faaMasterPath: string,
  outputParquetPath: string,
): Promise<void> {
  const btsCsvGlob = btsT100Csvs.map((b) => b.csvPath).join("', '");
  await conn.run(`COPY (
    WITH bts_carriers AS (
      SELECT DISTINCT
        trim("UNIQUE_CARRIER") AS bts_carrier_code,
        trim("UNIQUE_CARRIER_NAME") AS carrier_name
      FROM read_csv(
        ['${btsCsvGlob}'],
        delim = ',', header = true, quote = '"', all_varchar = true
      )
      WHERE trim("UNIQUE_CARRIER") != ''
    ),
    faa_names AS (
      SELECT DISTINCT
        upper(regexp_replace(trim("NAME"), '[,\\.\\s]+$', '')) AS norm_name,
        trim("NAME") AS raw_name
      FROM read_csv(
        '${faaMasterPath}',
        delim = ',', header = true, quote = '"',
        null_padding = true, ignore_errors = false, all_varchar = true
      )
      WHERE trim("NAME") != ''
    )
    SELECT
      b.bts_carrier_code,
      f.raw_name AS faa_registrant_name,
      b.carrier_name AS display_name,
      CASE
        WHEN f.raw_name IS NOT NULL THEN 'Auto-matched'
        ELSE 'No FAA match'
      END AS notes
    FROM bts_carriers b
    LEFT JOIN faa_names f
      ON upper(regexp_replace(trim(b.carrier_name), '[,\\.\\s]+$', '')) = f.norm_name
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/**
 * Emit a 1-row Parquet file used by the MCP server to pre-warm DuckDB httpfs
 * on cold start. The row content itself is arbitrary — it exists so that a
 * successful read_parquet('gs://.../pre-warm.parquet') amortizes cold-load
 * latency before the first real query.
 */
export async function writePreWarmParquet(
  conn: DuckDBConnection,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(`COPY (
    SELECT 'aviation-pre-warm' AS sentinel, CURRENT_TIMESTAMP AS built_at
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

/* --------------------------------------------------------------------------
 * License text (co-hosted with the Parquet so the OpenFlights attribution
 * requirement is visibly honored in the bucket root).
 * -------------------------------------------------------------------------- */

export const LICENSE_TEXT = `Aviation demo dataset — license + attribution
================================================

This bucket hosts three public-domain / ODbL datasets for a personal blog
MCP UI-in-Chat demo (github.com/ChrisTowles/blog).

1. FAA Aircraft Registry
   Source: https://registry.faa.gov
   License: US government work, public domain (17 USC 105).

2. BTS T-100 Market (All Carriers)
   Source: https://transtats.bts.gov
   License: US government work, public domain (17 USC 105).

3. OpenFlights airports / airlines / routes
   Source: https://openflights.org/data.html
   License: Open Database License (ODbL) v1.0
            https://opendatacommons.org/licenses/odbl/1-0/
   Attribution: This product uses data from OpenFlights (CC-BY-SA). Any
                public use of the OpenFlights subset of this bucket must
                preserve this attribution.

See docs/plans/2026-04-14-001-aviation-schema.md in the blog repo for the
full column-level schema.
`;

/* --------------------------------------------------------------------------
 * Impure orchestration: download, transform, upload
 * -------------------------------------------------------------------------- */

const SOURCE_URLS = {
  faaRegistryZip: 'https://registry.faa.gov/database/ReleasableAircraft.zip',
  openFlightsAirports:
    'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat',
  openFlightsAirlines:
    'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat',
  openFlightsRoutes:
    'https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat',
  // BTS T-100 Market: the transtats.bts.gov download flow requires a POST with
  // a form payload that varies per month; the ETL runner should resolve the
  // exact URL at run time or stage files manually in AVIATION_ETL_FIXTURE_DIR.
  btsT100Note:
    'See https://transtats.bts.gov/DL_SelectFields.aspx?Table_ID=292 — stage CSVs in AVIATION_ETL_FIXTURE_DIR if the form POST breaks.',
};

async function downloadToFile(url: string, destPath: string): Promise<void> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed: ${url} → HTTP ${res.status}`);
  }
  if (!res.body) {
    throw new Error(`Download returned empty body: ${url}`);
  }
  await pipeline(Readable.fromWeb(res.body as never), createWriteStream(destPath));
}

/**
 * Download the FAA ReleasableAircraft zip and extract MASTER.txt + ACFTREF.txt
 * into `destDir`. Relies on the `unzip` binary (pre-installed on Linux/macOS).
 * The zip is ~100MB, extracts to ~400MB — stream the download to disk first.
 */
async function downloadAndExtractFaaRegistry(destDir: string): Promise<void> {
  const zipPath = join(destDir, 'ReleasableAircraft.zip');
  await downloadToFile(SOURCE_URLS.faaRegistryZip, zipPath);
  const unzip = spawnSync(
    'unzip',
    ['-o', '-j', zipPath, 'MASTER.txt', 'ACFTREF.txt', '-d', destDir],
    {
      stdio: 'inherit',
    },
  );
  if (unzip.status !== 0) {
    throw new Error(
      `unzip failed (exit ${unzip.status}). Ensure the 'unzip' binary is on PATH, ` +
        `or manually stage MASTER.txt + ACFTREF.txt in ${destDir}.`,
    );
  }
  rmSync(zipPath, { force: true });
}

/**
 * BTS T-100 Market (All Carriers) download via headless Playwright.
 *
 * BTS exposes T-100 only through an ASP.NET form (DL_SelectFields.asp) — no
 * direct-download API, no PREZIP per-month files. The form uses __doPostBack
 * for both chkAllVars (select all fields) and chkDownloadZip (return a zip).
 * Each postback navigates, so we must re-select year + period afterward.
 *
 * The `FMF` table ID corresponds to "T-100 Market (All Carriers)"; see the
 * output of Tables.asp?QO_VQ=EEE if BTS ever renames it.
 */
const BTS_T100_FORM_URL =
  'https://www.transtats.bts.gov/DL_SelectFields.asp?gnoyr_VQ=FMF&QO_fu146_anzr=Nv4%20Pn44vr45';

// Months with no published data return a zip where the inner CSV is a header
// row only. 50 KB is comfortably below real months (~7 MB) and above empty.
const BTS_MIN_VALID_CSV_BYTES = 50_000;

async function postBackCheckbox(page: Page, id: string): Promise<void> {
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout: 60_000 }),
    page.evaluate((elId) => {
      const cb = document.getElementById(elId) as HTMLInputElement | null;
      if (!cb) throw new Error(`missing #${elId}`);
      cb.checked = true;
      (window as unknown as { __doPostBack: (t: string, a: string) => void }).__doPostBack(
        elId,
        '',
      );
    }, id),
  ]);
  const checked = await page.evaluate(
    (elId) => (document.getElementById(elId) as HTMLInputElement | null)?.checked ?? false,
    id,
  );
  if (!checked) throw new Error(`postback did not stick for #${id}`);
}

/**
 * Download one full year of T-100 Market data (cboPeriod="All") and split
 * the resulting CSV by MONTH column into per-month `bts-t100-YYYYMM.csv`
 * files — preserves the downstream per-month Parquet partitioning while
 * cutting BTS round-trips from 12 to 1 per year. Returns the yyyymm
 * stamps for every month actually present in the year's data (e.g. the
 * current year returns only published months).
 */
async function downloadOneBtsYear(
  page: Page,
  year: number,
  destDir: string,
): Promise<Array<{ yyyymm: string; csvPath: string }>> {
  // Resumability: if per-month CSVs for this year already exist on disk
  // (from a prior interrupted run), reuse them instead of re-downloading.
  const { readdirSync } = await import('node:fs');
  const existing = readdirSync(destDir)
    .filter((name) => new RegExp(`^bts-t100-${year}\\d{2}\\.csv$`).test(name))
    .filter((name) => statSync(join(destDir, name)).size > 0)
    .sort()
    .map((name) => {
      const m = name.match(/(\d{6})/)!;
      return { yyyymm: m[1]!, csvPath: join(destDir, name) };
    });
  if (existing.length > 0) {
    consola.info(`${year} cached — ${existing.length} months on disk`);
    return existing;
  }

  // Refresh the session cookie before each year — BTS's session can expire
  // between downloads, causing the form to redirect to the homepage.
  await page.goto('https://www.transtats.bts.gov/Homepage.asp', {
    waitUntil: 'domcontentloaded',
    timeout: 60_000,
  });
  await page.goto(BTS_T100_FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.selectOption('#cboYear', String(year));
  // cboPeriod defaults to "All"; we explicitly set it in case a postback
  // flipped the default.
  await page.selectOption('#cboPeriod', 'All');
  await postBackCheckbox(page, 'chkAllVars');
  await postBackCheckbox(page, 'chkDownloadZip');
  await page.selectOption('#cboYear', String(year));
  await page.selectOption('#cboPeriod', 'All');

  // Clicking Download triggers a form POST. BTS generates the zip server-side
  // before responding — for a full year (~86MB CSV) this takes 30-90s. The
  // click timeout must be long enough for the server to finish, and we use
  // waitForEvent('download') to catch the file when it arrives.
  const zipPath = join(destDir, `bts-t100-${year}.zip`);
  let download;
  try {
    [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 120_000 }),
      page.click('#btnDownload', { timeout: 120_000 }),
    ]);
  } catch (e) {
    if (e instanceof Error && /Timeout/i.test(e.message)) {
      return [];
    }
    throw e;
  }
  await download.saveAs(zipPath);

  const tmpExtract = join(destDir, `_bts_${year}`);
  mkdirSync(tmpExtract, { recursive: true });
  const unzip = spawnSync('unzip', ['-o', '-j', zipPath, '-d', tmpExtract], { stdio: 'pipe' });
  if (unzip.status !== 0) throw new Error(`unzip failed for ${zipPath}`);

  const csvInside = join(tmpExtract, 'T_T100_MARKET_ALL_CARRIER.csv');
  if (!existsSync(csvInside) || statSync(csvInside).size < BTS_MIN_VALID_CSV_BYTES) {
    rmSync(tmpExtract, { recursive: true, force: true });
    rmSync(zipPath, { force: true });
    return [];
  }

  // Split the year CSV into one CSV per month. DuckDB's COPY with an
  // expression filter is orders of magnitude faster than Node string
  // parsing; the MONTH column is an integer per BTS spec.
  const db = await DuckDBInstance.create(':memory:');
  const conn = await db.connect();
  const produced: Array<{ yyyymm: string; csvPath: string }> = [];
  try {
    const monthsRows = await conn.runAndReadAll(
      `SELECT DISTINCT CAST(MONTH AS INTEGER) AS m FROM read_csv('${csvInside}', all_varchar = true) ORDER BY m`,
    );
    for (const row of monthsRows.getRowObjectsJson()) {
      const monthNum = Number((row as { m: number | string }).m);
      if (!Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) continue;
      const yyyymm = `${year}${String(monthNum).padStart(2, '0')}`;
      const outPath = join(destDir, `bts-t100-${yyyymm}.csv`);
      await conn.run(
        `COPY (SELECT * FROM read_csv('${csvInside}', all_varchar = true) WHERE CAST(MONTH AS INTEGER) = ${monthNum}) ` +
          `TO '${outPath}' (HEADER, DELIMITER ',', QUOTE '"')`,
      );
      produced.push({ yyyymm, csvPath: outPath });
    }
  } finally {
    conn.closeSync();
  }

  rmSync(tmpExtract, { recursive: true, force: true });
  rmSync(zipPath, { force: true });
  return produced;
}

export async function downloadBtsT100ViaPlaywright(
  destDir: string,
  yearsWanted: number,
): Promise<Array<{ yyyymm: string; csvPath: string }>> {
  const browser = await chromium.launch({ headless: true });
  try {
    const ctx = await browser.newContext({ acceptDownloads: true });
    const page = await ctx.newPage();

    // BTS requires a session cookie before serving the download form.
    // Without this, direct navigation to DL_SelectFields.asp redirects to
    // Homepage.asp. Hitting the homepage first establishes the session.
    await page.goto('https://www.transtats.bts.gov/Homepage.asp', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    // One download per year (period="All"), newest year first. Each year
    // yields up to 12 per-month CSVs after the split step. The current year
    // returns only published months.
    let year = new Date().getUTCFullYear();
    const stopYear = 1989;
    let yearsCollected = 0;
    const collected: Array<{ yyyymm: string; csvPath: string }> = [];

    while (year > stopYear && yearsCollected < yearsWanted) {
      consola.start(`Fetching ${year}…`);
      const yearStart = Date.now();
      try {
        const monthsInYear = await downloadOneBtsYear(page, year, destDir);
        if (monthsInYear.length === 0) {
          consola.warn(`${year} — no data available`);
        } else {
          collected.push(...monthsInYear);
          yearsCollected++;
          consola.success(
            `${year}  ${monthsInYear.length} months  (${yearsCollected}/${yearsWanted} years)  ${elapsed(yearStart)}`,
          );
        }
      } catch (e) {
        consola.error(`${year} failed:`, e instanceof Error ? e.message : String(e));
      }
      year -= 1;
    }

    if (yearsCollected < yearsWanted) {
      throw new Error(
        `Collected only ${yearsCollected}/${yearsWanted} years of BTS T-100 data — ` +
          `BTS may be throttling or the date range is exhausted.`,
      );
    }
    return collected;
  } finally {
    await browser.close();
  }
}

async function uploadFileToGcs(
  storage: Storage,
  bucketName: string,
  localPath: string,
  remoteName: string,
  contentType: string,
): Promise<void> {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(remoteName);
  await file.save(await readFile(localPath), {
    contentType,
    metadata: { cacheControl: 'public, max-age=3600' },
  });
}

async function uploadTextToGcs(
  storage: Storage,
  bucketName: string,
  text: string,
  remoteName: string,
  contentType: string,
): Promise<void> {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(remoteName);
  await file.save(text, {
    contentType,
    metadata: { cacheControl: 'public, max-age=3600' },
  });
}

interface EtlConfig {
  bucketName: string | undefined;
  skipUpload: boolean;
  fixtureDir: string | undefined;
  workDir: string;
  btsYears: number;
}

function readConfig(): EtlConfig {
  const yearsRaw = process.env.AVIATION_ETL_YEARS;
  const parsed = yearsRaw ? Number.parseInt(yearsRaw, 10) : 12;
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`AVIATION_ETL_YEARS must be a positive integer, got: ${yearsRaw}`);
  }
  return {
    bucketName: process.env.MCP_DATA_BUCKET,
    skipUpload: Boolean(process.env.AVIATION_ETL_SKIP_UPLOAD),
    fixtureDir: process.env.AVIATION_ETL_FIXTURE_DIR,
    workDir: process.env.AVIATION_ETL_WORK_DIR ?? join(tmpdir(), 'aviation-etl'),
    btsYears: parsed,
  };
}

/**
 * Source CSVs → local Parquet. Writes to `outDir` (a flat dir — the caller
 * maps to the eventual bucket prefixes). Returns the list of local files
 * produced so the caller can upload them.
 */
export async function runAllTransforms(
  conn: DuckDBConnection,
  inputs: {
    faaMaster: string;
    faaAcftref: string;
    btsT100: Array<{ yyyymm: string; csvPath: string }>;
    ofAirports: string;
    ofAirlines: string;
    ofRoutes: string;
  },
  outDir: string,
): Promise<Array<{ localPath: string; remoteName: string; contentType: string }>> {
  mkdirSync(outDir, { recursive: true });
  const produced: Array<{ localPath: string; remoteName: string; contentType: string }> = [];

  // All aviation assets live under `aviation/` inside the shared MCP data
  // bucket so other future MCP tools can co-host their own prefixes.
  const aircraftParquet = join(outDir, 'aircraft.parquet');
  await transformFaaMaster(conn, inputs.faaMaster, aircraftParquet, inputs.faaAcftref);
  produced.push({
    localPath: aircraftParquet,
    remoteName: 'aviation/dims/aircraft.parquet',
    contentType: 'application/x-parquet',
  });

  const aircraftTypesParquet = join(outDir, 'aircraft_types.parquet');
  await transformFaaAcftref(conn, inputs.faaAcftref, aircraftTypesParquet);
  produced.push({
    localPath: aircraftTypesParquet,
    remoteName: 'aviation/dims/aircraft_types.parquet',
    contentType: 'application/x-parquet',
  });

  for (const { yyyymm, csvPath } of inputs.btsT100) {
    const parquetPath = join(outDir, `bts_t100_${yyyymm}.parquet`);
    await transformBtsT100(conn, csvPath, parquetPath);
    produced.push({
      localPath: parquetPath,
      remoteName: `aviation/facts/bts_t100_${yyyymm}.parquet`,
      contentType: 'application/x-parquet',
    });
  }

  const airportsParquet = join(outDir, 'airports.parquet');
  await transformOpenFlightsAirports(conn, inputs.ofAirports, airportsParquet);
  produced.push({
    localPath: airportsParquet,
    remoteName: 'aviation/dims/airports.parquet',
    contentType: 'application/x-parquet',
  });

  const airlinesParquet = join(outDir, 'airlines.parquet');
  await transformOpenFlightsAirlines(conn, inputs.ofAirlines, airlinesParquet);
  produced.push({
    localPath: airlinesParquet,
    remoteName: 'aviation/dims/airlines.parquet',
    contentType: 'application/x-parquet',
  });

  const routesParquet = join(outDir, 'routes.parquet');
  await transformOpenFlightsRoutes(conn, inputs.ofRoutes, routesParquet);
  produced.push({
    localPath: routesParquet,
    remoteName: 'aviation/dims/routes.parquet',
    contentType: 'application/x-parquet',
  });

  const carrierParquet = join(outDir, 'carrier_to_operator.parquet');
  await generateCarrierToOperator(conn, inputs.btsT100, inputs.faaMaster, carrierParquet);
  produced.push({
    localPath: carrierParquet,
    remoteName: 'aviation/ref/carrier_to_operator.parquet',
    contentType: 'application/x-parquet',
  });

  const preWarmParquet = join(outDir, 'pre-warm.parquet');
  await writePreWarmParquet(conn, preWarmParquet);
  produced.push({
    localPath: preWarmParquet,
    remoteName: 'aviation/pre-warm.parquet',
    contentType: 'application/x-parquet',
  });

  return produced;
}

async function runEtl(): Promise<void> {
  const config = readConfig();

  consola.box({
    title: 'Aviation ETL',
    message: [
      `Bucket:   ${config.bucketName || '(local only)'}`,
      `Years:    ${config.btsYears}`,
      `Work dir: ${config.workDir}`,
      config.skipUpload ? 'Upload:   skipped' : '',
    ]
      .filter(Boolean)
      .join('\n'),
    style: { borderColor: 'cyan' },
  });

  // Reuse work dir for resumability — BTS downloads are slow, so we keep
  // already-downloaded CSVs from prior runs. The transform + upload steps
  // are idempotent and will overwrite stale Parquet / GCS objects.
  mkdirSync(config.workDir, { recursive: true });

  // Resolve inputs. Fixture mode is for CI / smoke tests; network mode is
  // the real run.
  const useFixtures = Boolean(config.fixtureDir);
  const sourceDir = useFixtures ? resolve(config.fixtureDir!) : join(config.workDir, 'downloads');
  if (!useFixtures) {
    mkdirSync(sourceDir, { recursive: true });

    let phaseStart = Date.now();
    consola.start('Downloading OpenFlights dimensional data…');
    await downloadToFile(SOURCE_URLS.openFlightsAirports, join(sourceDir, 'airports.dat'));
    await downloadToFile(SOURCE_URLS.openFlightsAirlines, join(sourceDir, 'airlines.dat'));
    await downloadToFile(SOURCE_URLS.openFlightsRoutes, join(sourceDir, 'routes.dat'));
    consola.success(`OpenFlights done  ${elapsed(phaseStart)}`);

    phaseStart = Date.now();
    consola.start('Downloading FAA Aircraft Registry…');
    await downloadAndExtractFaaRegistry(sourceDir);
    consola.success(`FAA Registry done  ${elapsed(phaseStart)}`);

    phaseStart = Date.now();
    consola.box({
      title: 'BTS T-100 Market (All Carriers)',
      message: [`Years:   ${config.btsYears}`, `Form:    ${BTS_T100_FORM_URL}`].join('\n'),
      style: { borderColor: 'cyan' },
    });
    await downloadBtsT100ViaPlaywright(sourceDir, config.btsYears);
    consola.success(`BTS T-100 download done  ${elapsed(phaseStart)}`);

    // The script intentionally fails fast if the required files aren't present,
    // rather than quietly shipping a partial bucket.
    const requiredLarge = ['MASTER.txt', 'ACFTREF.txt'];
    for (const f of requiredLarge) {
      if (!existsSync(join(sourceDir, f))) {
        throw new Error(`Missing required file: ${join(sourceDir, f)}`);
      }
    }
  }

  // The fixture filenames differ from the real-data filenames; normalize here.
  const pathFor = (fixture: string, real: string): string => {
    const fixturePath = join(sourceDir, fixture);
    const realPath = join(sourceDir, real);
    if (existsSync(fixturePath)) return fixturePath;
    if (existsSync(realPath)) return realPath;
    throw new Error(`Missing input: neither ${fixturePath} nor ${realPath} exists`);
  };

  const faaMaster = pathFor('faa-master.csv', 'MASTER.txt');
  const faaAcftref = pathFor('faa-acftref.csv', 'ACFTREF.txt');
  const ofAirports = pathFor('openflights-airports.dat', 'airports.dat');
  const ofAirlines = pathFor('openflights-airlines.dat', 'airlines.dat');
  const ofRoutes = pathFor('openflights-routes.dat', 'routes.dat');

  // Find every bts-t100-<yyyymm>.csv the user staged.
  const { readdirSync } = await import('node:fs');
  const btsT100 = readdirSync(sourceDir)
    .filter((name) => /^bts-t100-(\d{6})\.csv$/.test(name) || /^bts_t100_(\d{6})\.csv$/i.test(name))
    .map((name) => {
      const m = name.match(/(\d{6})/)!;
      return { yyyymm: m[1]!, csvPath: join(sourceDir, name) };
    });
  if (btsT100.length === 0) {
    throw new Error(`No BTS T-100 CSVs found in ${sourceDir} (expected bts-t100-<yyyymm>.csv)`);
  }

  // One DuckDB instance + connection is plenty for the sequential transforms.
  const db = await DuckDBInstance.create(':memory:');
  const conn = await db.connect();

  try {
    const transformStart = Date.now();
    consola.start(`Transforming ${btsT100.length} month files → Parquet…`);
    const outDir = join(config.workDir, 'parquet');
    const produced = await runAllTransforms(
      conn,
      { faaMaster, faaAcftref, btsT100, ofAirports, ofAirlines, ofRoutes },
      outDir,
    );
    consola.success(`Transform done — ${produced.length} files  ${elapsed(transformStart)}`);

    // Drop a LICENSE.txt in the work dir so the upload step can push it too.
    const licensePath = join(outDir, 'LICENSE.txt');
    writeFileSync(licensePath, LICENSE_TEXT, 'utf8');

    if (config.skipUpload || !config.bucketName) {
      consola.info(`Upload skipped (bucket=${config.bucketName ?? 'unset'}). Parquet at ${outDir}`);
    } else {
      const uploadStart = Date.now();
      const storage = new Storage();
      consola.start(`Uploading to gs://${config.bucketName}/…`);
      for (const { localPath, remoteName, contentType } of produced) {
        await uploadFileToGcs(storage, config.bucketName, localPath, remoteName, contentType);
        consola.log(`  ↑ ${remoteName}`);
      }
      await uploadTextToGcs(
        storage,
        config.bucketName,
        LICENSE_TEXT,
        'aviation/LICENSE.txt',
        'text/plain; charset=utf-8',
      );
      consola.log(`  ↑ aviation/LICENSE.txt`);
      consola.success(`Upload done — ${produced.length + 1} files  ${elapsed(uploadStart)}`);
    }
  } finally {
    conn.closeSync();
    db.closeSync();
  }

  consola.box({
    title: 'Aviation ETL complete',
    message: `Total time: ${elapsed()}`,
    style: { borderColor: 'green' },
  });
}

// CLI entrypoint via citty
import { defineCommand, runMain } from 'citty';

const main = defineCommand({
  meta: {
    name: 'etl-aviation',
    description:
      'Download aviation datasets (FAA, BTS T-100, OpenFlights), transform to Parquet, upload to GCS',
  },
  args: {
    years: {
      type: 'string',
      description: 'Number of recent years of BTS T-100 data to download',
      default: process.env.AVIATION_ETL_YEARS || '12',
    },
    bucket: {
      type: 'string',
      description:
        'GCS bucket for upload (overrides MCP_DATA_BUCKET env). Aviation data is written under the aviation/ prefix.',
      default: process.env.MCP_DATA_BUCKET || '',
    },
    'skip-upload': {
      type: 'boolean',
      description: 'Transform only — skip GCS upload',
      default: false,
    },
    'work-dir': {
      type: 'string',
      description: 'Scratch directory (reused for resumability)',
      default: process.env.AVIATION_ETL_WORK_DIR || join(tmpdir(), 'aviation-etl'),
    },
  },
  async run({ args }) {
    // Override env-based config with CLI args so both paths work
    if (args.years) process.env.AVIATION_ETL_YEARS = args.years;
    if (args.bucket) process.env.MCP_DATA_BUCKET = args.bucket;
    if (args['skip-upload']) process.env.AVIATION_ETL_SKIP_UPLOAD = '1';
    if (args['work-dir']) process.env.AVIATION_ETL_WORK_DIR = args['work-dir'];

    await runEtl();
  },
});

runMain(main);
