---
title: 'Aviation Demo Dataset Schema'
type: reference
status: active
date: 2026-04-14
plan: docs/plans/2026-04-14-001-feat-mcp-ui-in-chat-plan.md
---

# Aviation Demo Dataset Schema

Reference doc for the Parquet files uploaded by
`packages/blog/scripts/etl-aviation.ts`. Unit 3's `aviation-prompt.ts`
reads this to shape the LLM's system prompt and structured-output schema;
the blog post (Unit 8) reads this for the data-layer architecture section.

## 1. Dataset provenance

| Source                               | License                      | Download URL                                                        | Refresh cadence       | Notes                                                                                                                    |
| ------------------------------------ | ---------------------------- | ------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| FAA Aircraft Registry                | US government, public domain | https://registry.faa.gov (MASTER.txt, ACFTREF.txt zip)              | Monthly, 1st          | Needs manual download today — the zip endpoint doesn't have a stable direct URL; stage under `AVIATION_ETL_FIXTURE_DIR`. |
| BTS T-100 Market All-Carrier         | US government, public domain | https://transtats.bts.gov (form POST per month)                     | Monthly (~45-day lag) | Download requires a POST with field selectors; the ETL expects the CSVs pre-staged. One file per YYYYMM.                 |
| OpenFlights airports/airlines/routes | ODbL v1.0 + attribution      | https://raw.githubusercontent.com/jpatokal/openflights/master/data/ | Community-maintained  | Attribution is honored via `LICENSE.txt` co-hosted in the bucket root.                                                   |

The Parquet bucket itself (`gs://blog-mcp-aviation-<env>/`) is publicly
readable (bucket-level `allUsers:objectViewer`). DuckDB httpfs reads it
anonymously from Cloud Run and from any reader's Claude Desktop.

### Known gotchas

- **FAA `MASTER.txt` has internal trailing whitespace inside comma-separated
  cells.** The ETL script trims every text column.
- **FAA `N-NUMBER` can repeat across historical reserved records.** The ETL
  collapses to latest-wins by `LAST ACTION DATE`.
- **BTS carrier codes don't align with FAA registrant names.** A small
  hand-curated `ref/carrier_to_operator.parquet` lookup bridges the two. Rows
  in BTS whose carrier isn't in the lookup survive with `NULL` operator fields;
  do not drop them.
- **OpenFlights uses the literal string `\N` to mean SQL `NULL`.** The ETL
  translates these; consumers should always see real SQL nulls.
- **BTS T-100 Market has no delay column.** Delay data lives in the
  "Reporting Carrier On-Time Performance" tables (not loaded here). Queries
  about delay belong to a future v2.

## 2. File layout in the bucket

```
gs://blog-mcp-aviation-<env>/
├── LICENSE.txt                      # OpenFlights ODbL attribution + source URLs
├── pre-warm.parquet                 # 1-row file for DuckDB httpfs cold-start warmup
├── dims/
│   ├── aircraft.parquet             # FAA MASTER × ACFTREF (per-tail)
│   ├── aircraft_types.parquet       # FAA ACFTREF (per mfr_mdl_code)
│   ├── airports.parquet             # OpenFlights
│   ├── airlines.parquet             # OpenFlights
│   └── routes.parquet               # OpenFlights
├── facts/
│   └── bts_t100_<yyyymm>.parquet    # one file per calendar month (BTS T-100 Market)
└── ref/
    └── carrier_to_operator.parquet  # curated BTS carrier ↔ FAA registrant lookup
```

All Parquet files are Zstandard-compressed (`COMPRESSION ZSTD`) for a small
size on the wire. Cold-start httpfs reads are <500ms for a file <10KB.

## 3. Column schemas

### `dims/aircraft.parquet` (FAA fleet, per tail number)

| Column               | Type    | Nullable | Description                                              | Example                 |
| -------------------- | ------- | -------- | -------------------------------------------------------- | ----------------------- |
| `n_number`           | VARCHAR | no       | FAA registration number without the N prefix removed.    | `N101AA`                |
| `serial_number`      | VARCHAR | yes      | Manufacturer serial.                                     | `12345`                 |
| `mfr_mdl_code`       | VARCHAR | yes      | Joins to `aircraft_types.mfr_mdl_code` and ACFTREF.CODE. | `1301024`               |
| `year_manufactured`  | INTEGER | yes      | Four-digit year.                                         | `2015`                  |
| `registrant_name`    | VARCHAR | yes      | Operator / owner name as registered with FAA (UPPER).    | `AMERICAN AIRLINES INC` |
| `registrant_city`    | VARCHAR | yes      |                                                          | `FORT WORTH`            |
| `registrant_state`   | VARCHAR | yes      | US state abbreviation; may be empty for foreign owners.  | `TX`                    |
| `registrant_country` | VARCHAR | yes      |                                                          | `US`                    |
| `status_code`        | VARCHAR | yes      | FAA status code (`V` = valid, etc).                      | `V`                     |
| `mode_s_code_hex`    | VARCHAR | yes      | Mode-S 24-bit address (ADS-B).                           | `A0D001`                |
| `manufacturer_name`  | VARCHAR | yes      | Denormalized from ACFTREF for query ergonomics.          | `BOEING`                |
| `model_name`         | VARCHAR | yes      | Denormalized from ACFTREF.                               | `737-800`               |
| `number_of_seats`    | INTEGER | yes      |                                                          | `189`                   |
| `number_of_engines`  | INTEGER | yes      |                                                          | `2`                     |

### `dims/aircraft_types.parquet` (FAA ACFTREF per manufacturer/model code)

| Column               | Type    | Nullable | Description                       | Example   |
| -------------------- | ------- | -------- | --------------------------------- | --------- |
| `mfr_mdl_code`       | VARCHAR | no       | Primary key for aircraft type.    | `1301024` |
| `manufacturer_name`  | VARCHAR | yes      |                                   | `BOEING`  |
| `model_name`         | VARCHAR | yes      |                                   | `737-800` |
| `number_of_engines`  | INTEGER | yes      |                                   | `2`       |
| `number_of_seats`    | INTEGER | yes      |                                   | `189`     |
| `weight_class`       | VARCHAR | yes      | FAA weight class, e.g. `CLASS 4`. | `CLASS 4` |
| `cruise_speed_knots` | INTEGER | yes      | Cruise speed in knots.            | `530`     |

### `facts/bts_t100_<yyyymm>.parquet` (monthly route operations)

| Column               | Type    | Nullable | Description                                                 | Example                  |
| -------------------- | ------- | -------- | ----------------------------------------------------------- | ------------------------ |
| `passengers`         | BIGINT  | yes      | Total enplaned passengers for this segment/month.           | `450000`                 |
| `freight_lbs`        | BIGINT  | yes      | Freight in pounds.                                          | `12000`                  |
| `mail_lbs`           | BIGINT  | yes      | Mail in pounds.                                             | `800`                    |
| `distance_miles`     | INTEGER | yes      | Great-circle distance between origin and dest.              | `404`                    |
| `carrier_code`       | VARCHAR | yes      | Unique BTS carrier code. Joins `carrier_to_operator`.       | `AA`                     |
| `carrier_name`       | VARCHAR | yes      | BTS carrier display name.                                   | `American Airlines Inc.` |
| `origin_iata`        | VARCHAR | yes      | IATA airport code. Joins `airports.iata`.                   | `ATL`                    |
| `origin_city`        | VARCHAR | yes      |                                                             | `Atlanta, GA`            |
| `origin_state`       | VARCHAR | yes      | 2-letter US state.                                          | `GA`                     |
| `dest_iata`          | VARCHAR | yes      |                                                             | `MCO`                    |
| `dest_city`          | VARCHAR | yes      |                                                             | `Orlando, FL`            |
| `dest_state`         | VARCHAR | yes      |                                                             | `FL`                     |
| `year`               | INTEGER | yes      | Redundant with filename; convenient for WHERE.              | `2025`                   |
| `month`              | INTEGER | yes      | Redundant with filename; 1-12.                              | `1`                      |
| `aircraft_type_code` | INTEGER | yes      | BTS aircraft-type code (not to be confused with FAA codes). | `631`                    |
| `service_class`      | VARCHAR | yes      | `F` = scheduled, `G` = non-scheduled, etc.                  | `F`                      |

### `dims/airports.parquet` (OpenFlights)

| Column             | Type    | Nullable | Description                                          | Example                                            |
| ------------------ | ------- | -------- | ---------------------------------------------------- | -------------------------------------------------- |
| `openflights_id`   | INTEGER | yes      | OpenFlights-internal airport id.                     | `1`                                                |
| `airport_name`     | VARCHAR | yes      |                                                      | `Hartsfield–Jackson Atlanta International Airport` |
| `city`             | VARCHAR | yes      |                                                      | `Atlanta`                                          |
| `country`          | VARCHAR | yes      |                                                      | `United States`                                    |
| `iata`             | VARCHAR | yes      | 3-letter IATA code, NULL for airports without one.   | `ATL`                                              |
| `icao`             | VARCHAR | yes      | 4-letter ICAO code.                                  | `KATL`                                             |
| `latitude`         | DOUBLE  | yes      | Decimal degrees. NULL when OpenFlights had no coord. | `33.6367`                                          |
| `longitude`        | DOUBLE  | yes      | Decimal degrees.                                     | `-84.4281`                                         |
| `altitude_ft`      | INTEGER | yes      | Airport elevation in feet.                           | `1026`                                             |
| `utc_offset_hours` | DOUBLE  | yes      | Nominal UTC offset (ignores DST).                    | `-5.0`                                             |
| `dst`              | VARCHAR | yes      | DST rule: `A` = North America, `E` = Europe, etc.    | `A`                                                |
| `timezone_db`      | VARCHAR | yes      | IANA tzdb name.                                      | `America/New_York`                                 |
| `kind`             | VARCHAR | yes      | `airport` / `heliport` / etc.                        | `airport`                                          |
| `source`           | VARCHAR | yes      |                                                      | `OurAirports`                                      |

### `dims/airlines.parquet` (OpenFlights)

| Column           | Type    | Nullable | Description         | Example             |
| ---------------- | ------- | -------- | ------------------- | ------------------- |
| `openflights_id` | INTEGER | yes      |                     | `24`                |
| `airline_name`   | VARCHAR | yes      |                     | `American Airlines` |
| `alias`          | VARCHAR | yes      |                     | NULL                |
| `iata`           | VARCHAR | yes      | 2-letter IATA code. | `AA`                |
| `icao`           | VARCHAR | yes      | 3-letter ICAO code. | `AAL`               |
| `callsign`       | VARCHAR | yes      | Radio callsign.     | `AMERICAN`          |
| `country`        | VARCHAR | yes      |                     | `United States`     |
| `active`         | VARCHAR | yes      | `Y` or `N`.         | `Y`                 |

### `dims/routes.parquet` (OpenFlights)

| Column                          | Type    | Nullable | Description                           | Example |
| ------------------------------- | ------- | -------- | ------------------------------------- | ------- |
| `airline_iata`                  | VARCHAR | yes      | Joins `airlines.iata`.                | `AA`    |
| `airline_openflights_id`        | INTEGER | yes      |                                       | `24`    |
| `source_airport_iata`           | VARCHAR | yes      | Joins `airports.iata`.                | `ATL`   |
| `source_airport_openflights_id` | INTEGER | yes      |                                       | `1`     |
| `dest_airport_iata`             | VARCHAR | yes      |                                       | `MCO`   |
| `dest_airport_openflights_id`   | INTEGER | yes      |                                       | `2`     |
| `codeshare`                     | VARCHAR | yes      | `Y` if operated as codeshare.         | NULL    |
| `stops`                         | INTEGER | yes      | 0 = direct.                           | `0`     |
| `equipment`                     | VARCHAR | yes      | Space-separated IATA equipment codes. | `738`   |

### `ref/carrier_to_operator.parquet`

| Column                | Type    | Nullable | Description                                        | Example                     |
| --------------------- | ------- | -------- | -------------------------------------------------- | --------------------------- |
| `bts_carrier_code`    | VARCHAR | no       | BTS T-100 `carrier_code`.                          | `AA`                        |
| `faa_registrant_name` | VARCHAR | no       | Exact FAA `registrant_name` to match.              | `AMERICAN AIRLINES INC`     |
| `display_name`        | VARCHAR | no       | Human-readable display name for charts/tables.     | `American Airlines`         |
| `notes`               | VARCHAR | yes      | Any caveat (aliasing, parent-company differences). | `Direct FAA registry match` |

### `pre-warm.parquet`

| Column     | Type      | Description                          |
| ---------- | --------- | ------------------------------------ |
| `sentinel` | VARCHAR   | Constant string `aviation-pre-warm`. |
| `built_at` | TIMESTAMP | ETL-run wall-clock time.             |

Not for query use; read on container start to amortize DuckDB httpfs cold
latency (see plan Key Decisions → "Pre-warm DuckDB on cold start").

## 4. Known unmatched cases

A small number of BTS carriers have no direct FAA registrant match because:

- Regional-feeder carriers operate for legacy mainline carriers under a
  shared IATA code (e.g. Envoy Air flying AA metal).
- Some carriers have changed names or merged since the FAA registration;
  BTS keeps the pre-merger code.
- A few cargo-only carriers register their fleet through a holding-company
  name that differs from the BTS display.

Queries SHOULD use `LEFT JOIN carrier_to_operator` and treat a `NULL`
`faa_registrant_name` as "operator unknown in fleet data" rather than drop the
row. The ETL script initializes the lookup with the 9 carriers in the demo
fixture; real-data runs extend the lookup case-by-case as blog queries surface
unmatched carriers.

## 5. Join key architecture

```
                         ref/carrier_to_operator
                        (bts_carrier_code ↔ faa_registrant_name)
                                      │
                  ┌───────────────────┼────────────────────┐
                  │                                        │
           facts/bts_t100_<yyyymm>                  dims/aircraft
           (carrier_code, origin_iata,              (registrant_name, manufacturer_name,
            dest_iata, year, month)                  model_name, year_manufactured)
                  │                                        │
                  ▼                                        ▼
           dims/airports                                dims/aircraft_types
           (iata — joins origin_iata / dest_iata)       (mfr_mdl_code)
                  │
                  ▼
           dims/routes (source_airport_iata → dest_airport_iata)
           dims/airlines (iata)
```

Typical question: "which operators have the oldest Boeing 737 fleets?"

```sql
SELECT a.registrant_name,
       AVG(2026 - a.year_manufactured)::DOUBLE AS avg_age,
       COUNT(*)::BIGINT                         AS fleet_size
FROM read_parquet('gs://blog-mcp-aviation-prod/dims/aircraft.parquet') a
WHERE a.manufacturer_name = 'BOEING'
  AND a.model_name LIKE '737%'
  AND a.registrant_country = 'US'
GROUP BY a.registrant_name
HAVING fleet_size >= 5
ORDER BY avg_age DESC
LIMIT 20;
```

Typical cross-dataset: "what's the busiest US route, and which aircraft
families fly it?"

```sql
WITH busiest AS (
  SELECT origin_iata, dest_iata, SUM(passengers)::BIGINT AS total_pax
  FROM read_parquet('gs://blog-mcp-aviation-prod/facts/bts_t100_*.parquet')
  WHERE year = 2025
  GROUP BY origin_iata, dest_iata
  ORDER BY total_pax DESC LIMIT 1
)
SELECT b.*, l.display_name AS operator,
       a.manufacturer_name, a.model_name,
       COUNT(*)::BIGINT AS aircraft_in_fleet
FROM busiest b
JOIN read_parquet('gs://blog-mcp-aviation-prod/facts/bts_t100_*.parquet') f
  ON f.origin_iata = b.origin_iata AND f.dest_iata = b.dest_iata
LEFT JOIN read_parquet('gs://blog-mcp-aviation-prod/ref/carrier_to_operator.parquet') l
  ON l.bts_carrier_code = f.carrier_code
LEFT JOIN read_parquet('gs://blog-mcp-aviation-prod/dims/aircraft.parquet') a
  ON a.registrant_name = l.faa_registrant_name
GROUP BY ALL
ORDER BY aircraft_in_fleet DESC;
```

## 6. Plain-English column notes for the LLM prompt

These notes feed into Unit 3's `aviation-prompt.ts`. They describe what each
column _means_ to an aerospace-fluent but non-database reader.

- `passengers` is monthly enplaned total, not a daily average. Annual totals
  need `SUM(passengers) GROUP BY year`.
- `distance_miles` is great-circle distance between the two IATA airports, not
  actual flown miles. Great for "longest route" questions.
- `year_manufactured` is the model year from the FAA registration — this is
  aircraft age, not how long the current operator has owned it.
- `manufacturer_name` is a freeform FAA-owned string (`BOEING`, `AIRBUS`,
  `EMBRAER`). Use `LIKE` for family queries (e.g. `model_name LIKE 'A32%'`).
- `service_class` = `F` means scheduled passenger/cargo; `G` means
  non-scheduled (charter). Most LLM questions should filter to `F`.
- The BTS T-100 file covers a _segment_ (origin→dest directional pair), not a
  flight number. `SUM` across segments to get route-level totals.
- OpenFlights `airlines.active = 'Y'` filters to currently-operating carriers;
  historical carriers are still in the file.
