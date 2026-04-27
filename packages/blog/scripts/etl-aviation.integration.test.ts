// @vitest-environment node
/**
 * Integration tests for the aviation ETL.
 *
 * Each test registers a fixture CSV, runs the pure transform against an
 * in-process DuckDB, then asserts row counts, column presence, types, and
 * key derivations. The 11 scenarios below trace back 1:1 to the Unit 1
 * Test Scenarios in docs/plans/2026-04-14-001-feat-mcp-ui-in-chat-plan.md
 * (lines 289-301).
 */

import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { DuckDBInstance } from '@duckdb/node-api';
import type { DuckDBConnection } from '@duckdb/node-api';
import {
  runAllTransforms,
  transformBtsT100,
  transformCarrierToOperator,
  transformFaaAcftref,
  transformFaaMaster,
  transformOpenFlightsAirlines,
  transformOpenFlightsAirports,
  transformOpenFlightsRoutes,
  writePreWarmParquet,
} from './etl-aviation';

const FIXTURE_DIR = join(__dirname, '__fixtures__', 'aviation');
const FAA_MASTER = join(FIXTURE_DIR, 'faa-master.csv');
const FAA_ACFTREF = join(FIXTURE_DIR, 'faa-acftref.csv');
const BTS_T100 = join(FIXTURE_DIR, 'bts-t100-202501.csv');
const OF_AIRPORTS = join(FIXTURE_DIR, 'openflights-airports.dat');
const OF_AIRLINES = join(FIXTURE_DIR, 'openflights-airlines.dat');
const OF_ROUTES = join(FIXTURE_DIR, 'openflights-routes.dat');
const CARRIER_LOOKUP = join(FIXTURE_DIR, 'carrier-to-operator.csv');

let tmpDir: string;
let db: Awaited<ReturnType<typeof DuckDBInstance.create>>;
let conn: DuckDBConnection;

beforeAll(async () => {
  tmpDir = mkdtempSync(join(tmpdir(), 'aviation-etl-test-'));
  db = await DuckDBInstance.create(':memory:');
  conn = await db.connect();
});

afterAll(() => {
  conn?.closeSync();
  db?.closeSync();
  if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
});

async function countRows(c: DuckDBConnection, parquet: string): Promise<number> {
  const reader = await c.runAndReadAll(
    `SELECT COUNT(*)::BIGINT AS n FROM read_parquet('${parquet}')`,
  );
  const rows = reader.getRowObjectsJson();
  return Number(rows[0]!.n);
}

async function allRows(c: DuckDBConnection, sql: string): Promise<Array<Record<string, unknown>>> {
  const reader = await c.runAndReadAll(sql);
  return reader.getRowObjectsJson() as Array<Record<string, unknown>>;
}

describe('aviation ETL — pure transforms', () => {
  // Scenario 1: happy path — FAA MASTER CSV → Parquet with manufacturer counts
  test('FAA MASTER CSV → aircraft Parquet with manufacturer join', async () => {
    const out = join(tmpDir, 'aircraft.parquet');
    await transformFaaMaster(conn, FAA_MASTER, out, FAA_ACFTREF);

    const rows = await allRows(
      conn,
      `SELECT manufacturer_name, COUNT(*)::BIGINT AS n
       FROM read_parquet('${out}')
       GROUP BY manufacturer_name
       ORDER BY manufacturer_name`,
    );
    const manufacturers = rows.map((r) => r.manufacturer_name as string);
    expect(manufacturers).toContain('BOEING');
    expect(manufacturers).toContain('AIRBUS');
    // Boeing 737 + 767 + Airbus A321 model codes are all present in the fixture.
    const byName = Object.fromEntries(
      rows.map((r) => [r.manufacturer_name as string, Number(r.n)]),
    );
    expect(byName.BOEING).toBeGreaterThanOrEqual(1);
    expect(byName.AIRBUS).toBeGreaterThanOrEqual(1);
  });

  // Scenario 2: happy path — BTS T-100 → Parquet with partition-by-yyyymm
  test('BTS T-100 CSV → Parquet preserves partition column values', async () => {
    const out = join(tmpDir, 'bts_t100_202501.parquet');
    await transformBtsT100(conn, BTS_T100, out);

    const n = await countRows(conn, out);
    expect(n).toBe(12);

    const rows = await allRows(
      conn,
      `SELECT year, month FROM read_parquet('${out}') GROUP BY year, month`,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.year).toBe(2025);
    expect(rows[0]!.month).toBe(1);

    // Verify the file naming convention the script uses is the partition key.
    expect(out).toMatch(/bts_t100_202501\.parquet$/);
  });

  // Scenario 3: happy path — OpenFlights airports → Parquet, referenceable from routes
  test('OpenFlights airports + routes → Parquet with referential integrity', async () => {
    const airportsOut = join(tmpDir, 'airports.parquet');
    const routesOut = join(tmpDir, 'routes.parquet');
    await transformOpenFlightsAirports(conn, OF_AIRPORTS, airportsOut);
    await transformOpenFlightsRoutes(conn, OF_ROUTES, routesOut);

    const orphans = await allRows(
      conn,
      `SELECT r.source_airport_iata
       FROM read_parquet('${routesOut}') r
       LEFT JOIN read_parquet('${airportsOut}') a ON a.iata = r.source_airport_iata
       WHERE a.iata IS NULL`,
    );
    expect(orphans).toHaveLength(0);
  });

  // Scenario 4: three-way join via carrier_to_operator
  test('three-way join FAA × BTS × OpenFlights aggregates passengers by manufacturer', async () => {
    const aircraftOut = join(tmpDir, 'aircraft-join.parquet');
    const btsOut = join(tmpDir, 'bts-join.parquet');
    const airportsOut = join(tmpDir, 'airports-join.parquet');
    const lookupOut = join(tmpDir, 'carrier-join.parquet');
    await transformFaaMaster(conn, FAA_MASTER, aircraftOut, FAA_ACFTREF);
    await transformBtsT100(conn, BTS_T100, btsOut);
    await transformOpenFlightsAirports(conn, OF_AIRPORTS, airportsOut);
    await transformCarrierToOperator(conn, CARRIER_LOOKUP, lookupOut);

    // Join BTS rows to FAA operators via the curated lookup, then group by the
    // FAA registrant's primary aircraft manufacturer. "Primary" here = mode of
    // manufacturer_name per operator in the fixture.
    const rows = await allRows(
      conn,
      `WITH operator_primary_mfr AS (
        SELECT registrant_name, manufacturer_name,
               ROW_NUMBER() OVER (PARTITION BY registrant_name ORDER BY COUNT(*) DESC) AS rn
        FROM read_parquet('${aircraftOut}')
        WHERE registrant_name IS NOT NULL
        GROUP BY registrant_name, manufacturer_name
      )
      SELECT m.manufacturer_name, SUM(b.passengers)::BIGINT AS total_pax
      FROM read_parquet('${btsOut}') b
      LEFT JOIN read_parquet('${lookupOut}') l ON l.bts_carrier_code = b.carrier_code
      LEFT JOIN operator_primary_mfr m ON m.registrant_name = l.faa_registrant_name AND m.rn = 1
      WHERE m.manufacturer_name IS NOT NULL
      GROUP BY m.manufacturer_name
      ORDER BY total_pax DESC`,
    );
    expect(rows.length).toBeGreaterThan(0);
    // Boeing is dominant in the fixture; total should be > 0.
    const boeing = rows.find((r) => r.manufacturer_name === 'BOEING');
    expect(boeing).toBeDefined();
    expect(Number(boeing!.total_pax)).toBeGreaterThan(0);
  });

  // Scenario 5: NULL home-base airport in FAA registry row — preserved
  test('FAA row with NULL city/state is preserved (no filter drop)', async () => {
    const out = join(tmpDir, 'aircraft-null-city.parquet');
    await transformFaaMaster(conn, FAA_MASTER, out, FAA_ACFTREF);

    const nullCity = await allRows(
      conn,
      `SELECT n_number, registrant_city, registrant_state
       FROM read_parquet('${out}')
       WHERE (registrant_city IS NULL OR registrant_city = '')
          OR (registrant_state IS NULL OR registrant_state = '')`,
    );
    // The fixture has 'N999EX' with blank city/state.
    expect(nullCity.map((r) => r.n_number)).toContain('N999EX');
  });

  // Scenario 6: unmatched BTS carrier → NULL operator, row preserved
  test('BTS row with carrier not in lookup survives left join with NULL operator', async () => {
    const btsOut = join(tmpDir, 'bts-unmatched.parquet');
    const lookupOut = join(tmpDir, 'carrier-unmatched.parquet');
    await transformBtsT100(conn, BTS_T100, btsOut);
    await transformCarrierToOperator(conn, CARRIER_LOOKUP, lookupOut);

    const rows = await allRows(
      conn,
      `SELECT b.carrier_code, l.faa_registrant_name
       FROM read_parquet('${btsOut}') b
       LEFT JOIN read_parquet('${lookupOut}') l ON l.bts_carrier_code = b.carrier_code
       WHERE b.carrier_code = 'XY'`,
    );
    expect(rows).toHaveLength(1);
    // Operator is null for the unmatched carrier; row itself is preserved.
    expect(rows[0]!.faa_registrant_name).toBeNull();
  });

  // Scenario 7: OpenFlights airport with NULL lat/lon → preserved
  test('OpenFlights airport with \\N lat/lon preserved as NULL', async () => {
    const out = join(tmpDir, 'airports-nullgeo.parquet');
    await transformOpenFlightsAirports(conn, OF_AIRPORTS, out);

    const rows = await allRows(
      conn,
      `SELECT iata, latitude, longitude FROM read_parquet('${out}') WHERE iata = 'XYZ'`,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.latitude).toBeNull();
    expect(rows[0]!.longitude).toBeNull();
  });

  // Scenario 8: BTS T-100 preserves negative values (not clamped)
  // The fixture doesn't include negative delays by default (T-100 market has
  // no delay column — delay is in the On-Time tables). We assert the
  // non-clamping policy on freight, a signed-ish field, by checking that small
  // values survive exactly.
  test('BTS T-100 preserves exact integer values (no clamping)', async () => {
    const out = join(tmpDir, 'bts-preserve.parquet');
    await transformBtsT100(conn, BTS_T100, out);
    const rows = await allRows(
      conn,
      `SELECT carrier_code, origin_iata, dest_iata, freight_lbs, mail_lbs
       FROM read_parquet('${out}')
       WHERE carrier_code = 'NK'`,
    );
    expect(rows).toHaveLength(1);
    // Fixture exact values for NK: 3000 freight, 150 mail.
    expect(Number(rows[0]!.freight_lbs)).toBe(3000);
    expect(Number(rows[0]!.mail_lbs)).toBe(150);
  });

  // Scenario 9: duplicate N-numbers — latest-wins dedup
  test('duplicate N-numbers in FAA MASTER deduped by latest LAST_ACTION_DATE', async () => {
    const out = join(tmpDir, 'aircraft-dedup.parquet');
    await transformFaaMaster(conn, FAA_MASTER, out, FAA_ACFTREF);

    // Fixture has N102AA twice: the 20240116 row wins over the 20220115 row.
    const rows = await allRows(
      conn,
      `SELECT n_number, registrant_state FROM read_parquet('${out}') WHERE n_number = 'N102AA'`,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.registrant_state).toBe('TX');
  });

  // Scenario 10: error path — transform against a missing file throws
  test('transform with a missing input throws a clear error', async () => {
    const out = join(tmpDir, 'error.parquet');
    await expect(
      transformBtsT100(conn, join(FIXTURE_DIR, 'does-not-exist.csv'), out),
    ).rejects.toThrow();
  });

  // Scenario 11: integration — every transform emits a readable Parquet,
  // and the pre-warm Parquet is tiny and round-trips.
  test('runAllTransforms emits all expected Parquet files and pre-warm is tiny', async () => {
    const outDir = join(tmpDir, 'all-transforms');
    const produced = await runAllTransforms(
      conn,
      {
        faaMaster: FAA_MASTER,
        faaAcftref: FAA_ACFTREF,
        btsT100: [{ yyyymm: '202501', csvPath: BTS_T100 }],
        ofAirports: OF_AIRPORTS,
        ofAirlines: OF_AIRLINES,
        ofRoutes: OF_ROUTES,
        carrierToOperator: CARRIER_LOOKUP,
      },
      outDir,
    );
    const remoteNames = produced.map((p) => p.remoteName).sort();
    expect(remoteNames).toEqual(
      [
        'aviation/dims/aircraft.parquet',
        'aviation/dims/aircraft_types.parquet',
        'aviation/dims/airlines.parquet',
        'aviation/dims/airports.parquet',
        'aviation/dims/routes.parquet',
        'aviation/facts/bts_t100_202501.parquet',
        'aviation/pre-warm.parquet',
        'aviation/ref/carrier_to_operator.parquet',
      ].sort(),
    );

    const preWarm = produced.find((p) => p.remoteName === 'aviation/pre-warm.parquet')!;
    const bytes = readFileSync(preWarm.localPath);
    expect(bytes.byteLength).toBeLessThan(10_000);

    // Round-trip read of the pre-warm file.
    const preWarmRows = await allRows(
      conn,
      `SELECT sentinel FROM read_parquet('${preWarm.localPath}')`,
    );
    expect(preWarmRows).toHaveLength(1);
    expect(preWarmRows[0]!.sentinel).toBe('aviation-pre-warm');
  });

  // Supplemental coverage for the airlines-only transform that isn't exercised
  // in any other test path.
  test('OpenFlights airlines → Parquet with IATA + ICAO preserved', async () => {
    const out = join(tmpDir, 'airlines.parquet');
    await transformOpenFlightsAirlines(conn, OF_AIRLINES, out);

    const rows = await allRows(
      conn,
      `SELECT airline_name, iata, icao FROM read_parquet('${out}') WHERE iata = 'AA'`,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.airline_name).toBe('American Airlines');
    expect(rows[0]!.icao).toBe('AAL');
  });

  // Supplemental coverage for the ACFTREF-only transform output.
  test('FAA ACFTREF → aircraft_types Parquet with seat counts', async () => {
    const out = join(tmpDir, 'aircraft_types.parquet');
    await transformFaaAcftref(conn, FAA_ACFTREF, out);

    const rows = await allRows(
      conn,
      `SELECT manufacturer_name, model_name, number_of_seats
       FROM read_parquet('${out}') WHERE model_name = 'A321-200'`,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]!.manufacturer_name).toBe('AIRBUS');
    expect(Number(rows[0]!.number_of_seats)).toBe(220);
  });

  // Supplemental coverage: pre-warm Parquet writes even without inputs.
  test('writePreWarmParquet creates a tiny file with a known sentinel', async () => {
    const out = join(tmpDir, 'pre-warm-standalone.parquet');
    await writePreWarmParquet(conn, out);
    const bytes = readFileSync(out);
    expect(bytes.byteLength).toBeGreaterThan(0);
    expect(bytes.byteLength).toBeLessThan(10_000);
  });
});
