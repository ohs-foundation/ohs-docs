---
title: Set up analytics
description: Start the analytics pipeline and dashboard alongside a running reference environment.
slug: /components/reference-analytics/run/
sidebar_position: 60
guide_type: Setup guide
guide_status: partial
guide_focus: Running the pipeline and connecting the dashboard
repository: analytics
---

## Goal and scope

This starts the analytics pipeline, its database, and Apache Superset alongside the environment you already have running, then produces the first set of reporting tables and charts them.

Analytics is the last stage of the [get started sequence](/get-started/). It runs under an additional compose profile in the same repository, so it is a flag on the same script rather than a separate deployment.

## Before you begin

A running reference environment from [set up the environment](/components/reference-infrastructure/).

The pipeline is a JVM workload and is the most memory-hungry part of the stack. Allow Docker 8 GB or more for a dataset of ten thousand patients, and set the pipeline heap in your environment file:

```sh
PIPELINE_JAVA_OPTS=-Xms512m -Xmx4g
```

## Choose what the pipeline reads

The profile brings up a second, isolated FHIR server holding synthetic data, and the pipeline reads from that by default:

```sh
PIPELINE_FHIR_SOURCE=http://hapi-synth:8080/fhir
```

That default is deliberate. It gives you populated dashboards immediately, without waiting for enough real activity to make a chart meaningful.

To report on the data you captured through the Web Portal and the Client App instead, point the pipeline at the transactional FHIR server and restart it:

```sh
PIPELINE_FHIR_SOURCE=http://hapi-fhir:8080/fhir
```

Services address each other by service name on the container network, which is why these are not `localhost` URLs.

## Start the analytics services

```sh
./dev.sh render
./dev.sh up --pipes
```

`render` regenerates service configuration from your environment file, including the pipeline's database connection file. That file holds a password, so it is generated rather than committed — skip this step and the pipeline starts with no database configuration and writes nothing.

| Service | Default port | Purpose |
| --- | --- | --- |
| Pipeline controller | `8090` | Triggers and monitors pipeline runs |
| Analytics PostgreSQL | `5434` | Holds the flat tables and Superset's metadata |
| Superset | `8088` | Queries the analytics database and serves dashboards |

Two databases are created on first boot: **`analytics`** for the reporting tables, and **`superset`** for Superset's own metadata.

## Run the pipeline

Open the controller at `http://localhost:8090` and trigger a full run.

The first run has to be a full one. Incremental runs fetch only what changed since the previous run, so there has to be a previous run for them to be incremental against.

Watch it work:

```sh
docker logs -f ohs-pipeline-controller
```

After the first run the pipeline follows its schedule and fetches only changed resources. You can trigger a run by hand at any time.

## Connect Superset

Sign in at `http://localhost:8088` with `admin` / `admin`, then add the analytics database under **Settings → Database Connections**.

| Field | Value |
| --- | --- |
| Host | `postgres-analytics` |
| Port | `5432` |
| Database | `analytics` |
| Username | `postgres` |
| Password | `POSTGRES_ADMIN_PASSWORD` from your environment file |

The port is `5432`, not `5434`. Superset reaches the database across the container network on its internal port; `5434` is only the port published to your own machine. This is the most common mistake at this step.

Then add datasets from **Data → Datasets** against the `public` schema, where the flat tables are, and build charts from there.

### If Superset cannot connect

The `apache/superset:latest` image does not ship the PostgreSQL driver, so the connection fails until it is installed:

```sh
docker exec ohs-superset /usr/local/bin/pip install psycopg2-binary \
  --target /app/.venv/lib/python3.10/site-packages
```

Confirm it worked:

```sh
docker exec ohs-superset /app/.venv/bin/python -c "import psycopg2; print('ok')"
```

This is a workaround, not a setting. It does not survive the container being recreated, and it has to be repeated if you rebuild. A Superset image with the driver already present is the permanent fix.

## Expected result

The `analytics` database holds one flat table per ViewDefinition, populated from whichever FHIR server the pipeline read. Check from the host:

```sh
docker exec -i ohs-postgres-analytics psql -U postgres -d analytics \
  -c "\dt public.*"
```

A count against a flat table should match the same count taken from the FHIR server.

Remember that ViewDefinitions expand repeated elements into multiple rows, so counting rows is not the same as counting resources. Deduplicate before aggregating:

```sql
-- Households, not household members
SELECT count(*) FROM (
  SELECT DISTINCT ON (id) id FROM group_flat ORDER BY id
) t;
```

The same expansion is what lets the household table double as the patient-to-household join:

```sql
SELECT p.id, p.given, p.family, g.name AS household
FROM patient_flat p
LEFT JOIN group_flat g ON g.member_patient_id = p.id;
```

## When a ViewDefinition changes

The pipeline creates a table if it is missing but does not alter one that already exists, so adding a column to a ViewDefinition has no effect on a table that has already been created.

Drop the affected table and trigger a full run:

```sh
docker exec -i ohs-postgres-analytics psql -U postgres -d analytics \
  -c "DROP TABLE IF EXISTS patient_flat;"
```

To start the whole schema again, drop and recreate `public`.

## Troubleshooting

**The pipeline runs but writes nothing.** Its database configuration file was not generated. Run `./dev.sh render`, then restart the controller.

**The pipeline cannot reach the database.** The connection is configured with `5434` instead of the internal port `5432`.

**The pipeline fails to start with a missing Flink configuration.** The controller requires its Flink configuration file to be present in the mounted config directory; it will not start without it.

**The pipeline is killed part-way through a run.** The JVM ran out of memory. Increase the Docker memory allocation and check `PIPELINE_JAVA_OPTS`.

## Next step

[Configure a screen from FHIR data](/configure/screen-from-fhir-data/) is the first step from running the reference to adapting it.

## Source

The [Reference Infrastructure repository](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) owns the pipeline configuration, the ViewDefinitions, the compose definitions, and the environment file these values come from. [FHIR Data Pipes](https://github.com/ohs-foundation/fhir-data-pipes) documents the engine, its pipeline modes, and its configuration options.
