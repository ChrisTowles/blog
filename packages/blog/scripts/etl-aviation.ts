/**
 * ETL: Aviation demo dataset → Parquet → GCS
 *
 * Unit 1 of the MCP UI-in-Chat aviation demo plan
 * (docs/plans/2026-04-14-001-feat-mcp-ui-in-chat-plan.md).
 *
 * Downloads three public-domain sources, transforms CSVs to Parquet via DuckDB
 * in-process, then uploads to a public-read GCS bucket so the MCP server can
 * read them anonymously via httpfs.
 *
 *   - FAA Aircraft Registry (US public domain)   → dims/aircraft.parquet
 *                                                 → dims/aircraft_types.parquet
 *   - BTS T-100 Market (US public domain)        → facts/bts_t100_<yyyymm>.parquet
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
 *   - GCS_AVIATION_BUCKET     (required when uploading; e.g. blog-mcp-aviation-staging)
 *   - AVIATION_ETL_SKIP_UPLOAD  truthy → transform locally only, skip GCS upload
 *   - AVIATION_ETL_FIXTURE_DIR  if set, use fixture CSVs instead of network downloads
 *   - AVIATION_ETL_WORK_DIR    local scratch dir (defaults to os.tmpdir()/aviation-etl)
 *   - AVIATION_ETL_MONTHS      number of recent months of BTS T-100 to pull (default 12)
 */

import { createWriteStream, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { DuckDBInstance } from '@duckdb/node-api';
import type { DuckDBConnection } from '@duckdb/node-api';
import { Storage } from '@google-cloud/storage';

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

  await conn.run(`CREATE OR REPLACE TEMP VIEW faa_acftref_raw AS
    SELECT * FROM read_csv(
      '${acftrefCsvPath}',
      delim = ',',
      header = true,
      quote = '"',
      all_varchar = true
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
      all_varchar = true
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
      TRY_CAST("AIRCRAFT_TYPE" AS INTEGER)    AS aircraft_type_code,
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
 * Curated carrier → FAA operator lookup CSV → ref/carrier_to_operator.parquet.
 */
export async function transformCarrierToOperator(
  conn: DuckDBConnection,
  inputCsvPath: string,
  outputParquetPath: string,
): Promise<void> {
  await conn.run(`COPY (
    SELECT
      bts_carrier_code,
      faa_registrant_name,
      display_name,
      notes
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
}

function readConfig(): EtlConfig {
  return {
    bucketName: process.env.GCS_AVIATION_BUCKET,
    skipUpload: Boolean(process.env.AVIATION_ETL_SKIP_UPLOAD),
    fixtureDir: process.env.AVIATION_ETL_FIXTURE_DIR,
    workDir: process.env.AVIATION_ETL_WORK_DIR ?? join(tmpdir(), 'aviation-etl'),
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
    carrierToOperator: string;
  },
  outDir: string,
): Promise<Array<{ localPath: string; remoteName: string; contentType: string }>> {
  mkdirSync(outDir, { recursive: true });
  const produced: Array<{ localPath: string; remoteName: string; contentType: string }> = [];

  const aircraftParquet = join(outDir, 'aircraft.parquet');
  await transformFaaMaster(conn, inputs.faaMaster, aircraftParquet, inputs.faaAcftref);
  produced.push({
    localPath: aircraftParquet,
    remoteName: 'dims/aircraft.parquet',
    contentType: 'application/x-parquet',
  });

  const aircraftTypesParquet = join(outDir, 'aircraft_types.parquet');
  await transformFaaAcftref(conn, inputs.faaAcftref, aircraftTypesParquet);
  produced.push({
    localPath: aircraftTypesParquet,
    remoteName: 'dims/aircraft_types.parquet',
    contentType: 'application/x-parquet',
  });

  for (const { yyyymm, csvPath } of inputs.btsT100) {
    const parquetPath = join(outDir, `bts_t100_${yyyymm}.parquet`);
    await transformBtsT100(conn, csvPath, parquetPath);
    produced.push({
      localPath: parquetPath,
      remoteName: `facts/bts_t100_${yyyymm}.parquet`,
      contentType: 'application/x-parquet',
    });
  }

  const airportsParquet = join(outDir, 'airports.parquet');
  await transformOpenFlightsAirports(conn, inputs.ofAirports, airportsParquet);
  produced.push({
    localPath: airportsParquet,
    remoteName: 'dims/airports.parquet',
    contentType: 'application/x-parquet',
  });

  const airlinesParquet = join(outDir, 'airlines.parquet');
  await transformOpenFlightsAirlines(conn, inputs.ofAirlines, airlinesParquet);
  produced.push({
    localPath: airlinesParquet,
    remoteName: 'dims/airlines.parquet',
    contentType: 'application/x-parquet',
  });

  const routesParquet = join(outDir, 'routes.parquet');
  await transformOpenFlightsRoutes(conn, inputs.ofRoutes, routesParquet);
  produced.push({
    localPath: routesParquet,
    remoteName: 'dims/routes.parquet',
    contentType: 'application/x-parquet',
  });

  const carrierParquet = join(outDir, 'carrier_to_operator.parquet');
  await transformCarrierToOperator(conn, inputs.carrierToOperator, carrierParquet);
  produced.push({
    localPath: carrierParquet,
    remoteName: 'ref/carrier_to_operator.parquet',
    contentType: 'application/x-parquet',
  });

  const preWarmParquet = join(outDir, 'pre-warm.parquet');
  await writePreWarmParquet(conn, preWarmParquet);
  produced.push({
    localPath: preWarmParquet,
    remoteName: 'pre-warm.parquet',
    contentType: 'application/x-parquet',
  });

  return produced;
}

async function runEtl(): Promise<void> {
  const config = readConfig();

  // Clean work dir so partial state from an earlier failed run doesn't leak.
  if (existsSync(config.workDir)) {
    rmSync(config.workDir, { recursive: true, force: true });
  }
  mkdirSync(config.workDir, { recursive: true });

  // Resolve inputs. Fixture mode is for CI / smoke tests; network mode is
  // the real run.
  const useFixtures = Boolean(config.fixtureDir);
  const sourceDir = useFixtures ? resolve(config.fixtureDir!) : join(config.workDir, 'downloads');
  if (!useFixtures) {
    mkdirSync(sourceDir, { recursive: true });
    console.log('Downloading OpenFlights dimensional data…');
    await downloadToFile(SOURCE_URLS.openFlightsAirports, join(sourceDir, 'airports.dat'));
    await downloadToFile(SOURCE_URLS.openFlightsAirlines, join(sourceDir, 'airlines.dat'));
    await downloadToFile(SOURCE_URLS.openFlightsRoutes, join(sourceDir, 'routes.dat'));
    console.warn(
      `NOTE: FAA Registry + BTS T-100 require manual staging. See SOURCE_URLS in this file.\n` +
        `      Place MASTER.txt, ACFTREF.txt, and bts-t100-<yyyymm>.csv under ${sourceDir}`,
    );
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
  const carrierToOperator = pathFor('carrier-to-operator.csv', 'carrier-to-operator.csv');

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
    const outDir = join(config.workDir, 'parquet');
    const produced = await runAllTransforms(
      conn,
      { faaMaster, faaAcftref, btsT100, ofAirports, ofAirlines, ofRoutes, carrierToOperator },
      outDir,
    );

    // Drop a LICENSE.txt in the work dir so the upload step can push it too.
    const licensePath = join(outDir, 'LICENSE.txt');
    writeFileSync(licensePath, LICENSE_TEXT, 'utf8');

    if (config.skipUpload || !config.bucketName) {
      console.log(
        `Skipped GCS upload (SKIP=${config.skipUpload}, bucket=${config.bucketName ?? 'unset'}). ` +
          `Parquet written to ${outDir}.`,
      );
    } else {
      const storage = new Storage();
      console.log(`Uploading to gs://${config.bucketName}/ …`);
      for (const { localPath, remoteName, contentType } of produced) {
        await uploadFileToGcs(storage, config.bucketName, localPath, remoteName, contentType);
        console.log(`  ↑ gs://${config.bucketName}/${remoteName}`);
      }
      await uploadTextToGcs(
        storage,
        config.bucketName,
        LICENSE_TEXT,
        'LICENSE.txt',
        'text/plain; charset=utf-8',
      );
      console.log(`  ↑ gs://${config.bucketName}/LICENSE.txt`);
    }
  } finally {
    conn.closeSync();
    db.closeSync();
  }

  console.log('Aviation ETL complete.');
}

// Allow both "run as a script" and "import as a module for tests".
const isMain =
  typeof process !== 'undefined' &&
  process.argv[1] !== undefined &&
  import.meta.url === `file://${resolve(process.argv[1])}`;

if (isMain) {
  runEtl().catch((err) => {
    console.error('Aviation ETL failed:', err);
    process.exit(1);
  });
}
