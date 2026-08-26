---
id: data-pipes-single-machine
title: Tutorial · Single Machine Analytics Deployment
description: Deploy FHIR Data Pipes with Apache Spark Thrift Server and PostgreSQL flattened views on a single machine.
slug: /tutorials-and-codelabs/data-pipes-single-machine/
sidebar_label: Single Machine Analytics Tutorial
sidebar_position: 62
guide_type: Tutorial
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-data-pipes
source_label: fhir-data-pipes on GitHub ↗
---

## Overview

FHIR Data Pipes extracts data from clinical systems and flattens nested FHIR structures into relational tables or columnar Parquet files using ViewDefinitions.

In this tutorial, you will run a complete single-machine analytics stack consisting of the Pipelines Controller, Apache Spark Thrift Server for SQL queries, and PostgreSQL for relational flattened views.

## Prerequisites

- A running FHIR source server (such as HAPI FHIR on `http://localhost:8091/fhir`)
- Docker and Docker Compose installed
- `fhir-data-pipes` repository cloned locally

## Step 1 · Configure controller and sinks

Open `docker/config/application.yaml` in the repository root.

Configure either FHIR Search API mode or direct database access mode.

### FHIR Search API mode

Set `fhirServerUrl` to your source server and leave `dbConfig` commented out.

```yaml
fhirServerUrl: "http://localhost:8091/fhir"
```

### PostgreSQL sink views database

To enable flattened relational tables, verify that `sinkDbConfigPath` points to your PostgreSQL configuration, and create the `views` database if it does not already exist.

```sh
PGPASSWORD=admin psql -h 127.0.0.1 -p 5432 -U admin postgres -c "CREATE DATABASE views"
```

## Step 2 · Launch the single machine stack

Start the controller and Spark Thrift server containers with Docker Compose.

```sh
docker compose -f docker/compose-controller-spark-sql-single.yaml up --force-recreate -d
```

Once running, the Pipelines Controller web UI is available at `http://localhost:8090` and the Spark Thrift server is listening on port `10001`.

## Step 3 · Execute the initial full pipeline

1. Open your browser and navigate to `http://localhost:8090`.
2. Under **Run Full Pipeline**, click **Run Full**.
3. Wait for the initial batch to process and generate the Parquet files and database tables.

Subsequent updates can be scheduled or triggered manually via **Run Incremental**.

## Step 4 · Query flattened tables in PostgreSQL

Connect to the PostgreSQL container and inspect the generated flattened tables.

```sh
docker exec -it hapi_fhir_db psql -U admin -d views
```

List the generated relation tables.

```text
\d
```

You will see flattened tables including `patient_flat`, `observation_flat`, `condition_flat`, and `encounter_flat`.

Query patient counts directly.

```sql
SELECT COUNT(0) FROM patient_flat;
SELECT COUNT(0) FROM observation_flat;
```

## Step 5 · Query Parquet tables via Spark SQL

Connect to the Spark Thrift server using any Hive or JDBC compatible query tool at `jdbc:hive2://localhost:10001`.

```sql
SELECT COUNT(0) FROM Patient;
SELECT COUNT(0) FROM Observation;
```

## Where to go next

- Build dashboards with [Visualize Parquet DWH with Apache Superset](/tutorials-and-codelabs/data-pipes-superset/).
- Explore managing pipelines in [Try Pipelines Controller with HAPI FHIR](/tutorials-and-codelabs/data-pipes-try-controller/).
