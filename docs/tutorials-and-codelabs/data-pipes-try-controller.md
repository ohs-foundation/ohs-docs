---
id: data-pipes-try-controller
title: Tutorial · Try Pipelines Controller with HAPI FHIR
description: Run the Spring Boot Pipelines Controller directly with Maven and manage ETL transformations against HAPI FHIR.
slug: /tutorials-and-codelabs/data-pipes-try-controller/
sidebar_label: Pipelines Controller Tutorial
sidebar_position: 64
guide_type: Tutorial
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-data-pipes
source_label: fhir-data-pipes on GitHub ↗
---

## Overview

The FHIR Pipelines Controller manages and schedules data transformations from a FHIR store into Apache Parquet files or relational database tables using batch and incremental jobs.

In this tutorial, you will configure and run the Pipelines Controller as a local Spring Boot application against a HAPI FHIR server with PostgreSQL.

## Prerequisites

- Java Development Kit 17 or higher
- Apache Maven 3.8 or higher
- A running HAPI FHIR server with PostgreSQL backend (such as the test server from [Set Up Local Test Servers](/tutorials-and-codelabs/data-pipes-test-servers/))

## Step 1 · Configure controller application settings

Open `pipelines/controller/config/application.yml` in a text editor and set the FHIR server endpoint and data warehouse target directory.

```yaml
fhirServerUrl: "http://localhost:8091/fhir"
dwhRootPrefix: "/tmp/dwh"
```

Next, open `pipelines/controller/config/hapi-postgres-config.json` and configure the database host settings.

```json
{
  "databaseHostName": "localhost",
  "databasePort": 5432,
  "databaseName": "hapi",
  "databaseUser": "admin",
  "databasePassword": "adminpassword"
}
```

## Step 2 · Run the Pipelines Controller

Navigate to the controller module directory and launch the Spring Boot service using Maven.

```sh
cd pipelines/controller
mvn spring-boot:run
```

The controller web control panel starts up at `http://localhost:8080`.

## Step 3 · Trigger pipeline execution

1. Open `http://localhost:8080` in your web browser.
2. Under the **Run Full Pipeline** section, click **Run Full** to trigger the initial baseline extraction.
3. Observe real-time progress indicators as resources are read from HAPI FHIR and written to Parquet files under `dwhRootPrefix`.

Once the baseline run finishes, automatic incremental schedules can run continuously, or you can trigger incremental updates on demand.

## Step 4 · Inspect output Parquet files

Check the generated Parquet files in the destination directory.

```sh
ls -la /tmp/dwh/
```

You can query the Parquet files using Python notebooks with PySpark and Pandas or load them into query engines like DuckDB, Trino, or Apache Spark.

## Where to go next

- Learn how to visualize your clinical data warehouse in [Visualize Parquet DWH with Apache Superset](/tutorials-and-codelabs/data-pipes-superset/).
- Explore Google Cloud integration in [Create GCP FHIR Store and BigQuery Dataset](/tutorials-and-codelabs/data-pipes-gcp-fhirstore/).
