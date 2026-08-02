/**
 * ETL: aviation demo dataset → Parquet → GCS. Run via `pnpm etl:aviation`
 * (`--help` for flags). Schema: docs/aviation-schema.md. Ops: docs/mcp-aviation-ops.md.
 * OpenFlights is ODbL — the LICENSE.txt emitted here is that attribution.
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

// dotenv's override=false is the precedence we want: a shell var wins, so
// `MCP_DATA_BUCKET=blog-mcp-data-prod pnpm etl:aviation` beats the dev bucket in .env.
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

/**
 * FAA Aircraft Registry MASTER.txt → dims/aircraft.parquet. Duplicate N-numbers resolve
 * latest-wins on LAST_ACTION_DATE, and text columns are right-trimmed because the FAA
 * pads its fixed-width fields inside the CSV cells.
 */
export async function transformFaaMaster(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
  acftrefCsvPath: string,
): Promise<void> {
  // MASTER.txt is comma-separated and quoted, with trailing whitespace on some
  // columns left over from the underlying fixed-width format.
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

  // Joining ACFTREF on MFR_MDL_CODE → CODE here lets downstream queries group by
  // manufacturer/model without a second join.
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

/** FAA ACFTREF.txt → dims/aircraft_types.parquet (manufacturer + model + seats). */
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
 * One month of BTS T-100 Market CSV → facts/bts_t100_<yyyymm>.parquet. Partitioning is a
 * filename convention, not a Hive layout, which is what lets DuckDB httpfs push the
 * yearmonth predicate down to the filename.
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
 * OpenFlights airports.dat → dims/airports.parquet. Headerless, so the schema is declared
 * explicitly, and OpenFlights writes a literal "\N" for null, translated here.
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
 * Passes a curated carrier → operator CSV through to Parquet as-is. Only the integration
 * suite uses it, to exercise join logic against a fixture; production generates the
 * lookup below.
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
 * Builds the carrier → operator lookup by joining distinct BTS carrier codes against FAA
 * registrant names, so nothing here needs hand-curating.
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
 * A 1-row Parquet the MCP server reads at boot. The content is arbitrary — the point is
 * that one successful `read_parquet('gs://…')` absorbs the httpfs cold start.
 */
export async function writePreWarmParquet(
  conn: DuckDBConnection,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(`COPY (
    SELECT 'aviation-pre-warm' AS sentinel, CURRENT_TIMESTAMP AS built_at
  ) TO '${outputParquetPath}' (FORMAT PARQUET, COMPRESSION ZSTD)`);
}

// Co-hosted with the Parquet so OpenFlights' attribution requirement is visibly
// honored in the bucket root.

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

See docs/aviation-schema.md in the blog repo for the
full column-level schema.
`;

const SOURCE_URLS = {
  faaRegistryZip: 'https://registry.faa.gov/database/ReleasableAircraft.zip',
  openFlightsAirports:
    'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat',
  openFlightsAirlines:
    'https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat',
  openFlightsRoutes:
    'https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat',
  // BTS needs a POST whose form payload varies per month, so the URL is resolved at run
  // time — or the files are staged by hand in AVIATION_ETL_FIXTURE_DIR.
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
 * Extracts MASTER.txt + ACFTREF.txt from the FAA ReleasableAircraft zip via the `unzip`
 * binary. ~100MB in, ~400MB out, hence streaming to disk rather than buffering.
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
 * BTS serves T-100 only via an ASP.NET form (no download API, no PREZIP), hence the
 * headless Playwright below; each __doPostBack navigates, so year + period must be
 * re-selected after one. `FMF` = "T-100 Market (All Carriers)", per Tables.asp?QO_VQ=EEE.
 */
const BTS_T100_FORM_URL =
  'https://www.transtats.bts.gov/DL_SelectFields.asp?gnoyr_VQ=FMF&QO_fu146_anzr=Nv4%20Pn44vr45';

// An unpublished month returns a header-only CSV; real ones run ~7 MB.
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
 * Pulls a full year (cboPeriod="All") and splits it by MONTH into per-month CSVs: same
 * downstream partitioning, but one BTS round-trip per year instead of twelve. Returns
 * only the months actually published.
 */
async function downloadOneBtsYear(
  page: Page,
  year: number,
  destDir: string,
): Promise<Array<{ yyyymm: string; csvPath: string }>> {
  // Reuse per-month CSVs left by an interrupted run rather than re-downloading.
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

  // BTS sessions expire between downloads, redirecting the form to the homepage.
  await page.goto('https://www.transtats.bts.gov/Homepage.asp', {
    waitUntil: 'domcontentloaded',
    timeout: 60_000,
  });
  await page.goto(BTS_T100_FORM_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.selectOption('#cboYear', String(year));
  // Set explicitly in case a postback flipped the "All" default.
  await page.selectOption('#cboPeriod', 'All');
  await postBackCheckbox(page, 'chkAllVars');
  await postBackCheckbox(page, 'chkDownloadZip');
  await page.selectOption('#cboYear', String(year));
  await page.selectOption('#cboPeriod', 'All');

  // BTS builds the zip server-side before responding — 30-90s for a full year's ~86MB
  // CSV — so the click timeout has to outlast the server, not the network.
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

  // DuckDB's COPY with an expression filter beats Node string parsing by orders of
  // magnitude here; MONTH is an integer per the BTS spec.
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

    // Without a session cookie, DL_SelectFields.asp just redirects to Homepage.asp —
    // so visit the homepage first to get one.
    await page.goto('https://www.transtats.bts.gov/Homepage.asp', {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    // Newest year first, one download each; the current year yields only its
    // published months.
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
 * Source CSVs → local Parquet in a flat `outDir`; the caller maps those onto bucket
 * prefixes and uploads the returned list.
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

  // The `aviation/` prefix leaves room for other MCP tools in the shared bucket.
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

  // The work dir is reused for resumability: BTS downloads are slow, and transform +
  // upload are idempotent, so stale Parquet and GCS objects just get overwritten.
  mkdirSync(config.workDir, { recursive: true });

  // Fixture mode is for CI / smoke tests; network mode is the real run.
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

    // Fail fast rather than quietly shipping a partial bucket.
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
