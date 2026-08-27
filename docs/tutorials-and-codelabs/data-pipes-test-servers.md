---
id: data-pipes-test-servers
title: Tutorial · Set Up Local Test Servers for Analytics
description: Spin up local HAPI FHIR or OpenMRS test servers with Docker Compose and preload synthetic clinical data.
slug: /tutorials-and-codelabs/data-pipes-test-servers/
sidebar_label: Analytics Test Servers Tutorial
sidebar_position: 60
guide_type: Tutorial
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-data-pipes
source_label: fhir-data-pipes on GitHub ↗
---

## Overview

Before running the FHIR Data Pipes extraction and transformation pipelines, you need a FHIR source server populated with clinical data.

This tutorial guides you through starting local containerized FHIR servers (HAPI FHIR with PostgreSQL or OpenMRS with MySQL) using Docker Compose, and uploading synthetic patient datasets.

## Prerequisites

- Docker and Docker Compose installed
- Python 3.8 or higher with `pip` and virtual environment tools
- Git installed and repository cloned locally

## Step 1 · Clone the repository and create network

Clone the `fhir-data-pipes` repository and create the shared Docker network.

```sh
git clone https://github.com/ohs-foundation/fhir-data-pipes.git
cd fhir-data-pipes
docker network create cloudbuild
```

## Step 2 · Start a FHIR source server

Choose one of the following source server options.

### Option A · HAPI FHIR server with PostgreSQL

Launch a HAPI FHIR R4 server backed by a PostgreSQL database container.

```sh
docker compose -f ./docker/hapi-compose.yml up --force-recreate -d
```

The server base URL is available at `http://localhost:8091/fhir`.

### Option B · OpenMRS Reference Application with MySQL

Launch OpenMRS preloaded with the FHIR2 module.

```sh
docker compose -f ./docker/openmrs-compose.yml up --force-recreate -d
```

The OpenMRS FHIR endpoint is available at `http://localhost:8099/openmrs/ws/fhir2/R4`, and the web interface is at `http://localhost:8099/openmrs/` with credentials `admin` / `Admin123`.

## Step 3 · Upload synthetic clinical data

Install the Python uploader dependencies inside a virtual environment.

```sh
python3 -m venv venv
source venv/bin/activate
pip install -r ./synthea-hiv/uploader/requirements.txt
```

Run the uploader script to load synthetic HIV cohort data into the HAPI FHIR server.

```sh
python3 ./synthea-hiv/uploader/main.py HAPI http://localhost:8091/fhir \
  --input_dir ./synthea-hiv/sample_data \
  --cores 4
```

## Step 4 · (Optional) Start a sink FHIR server

If you plan to test streaming transformed resources to a downstream FHIR server rather than flat database tables or Parquet files, start the destination container.

```sh
docker compose -f ./docker/sink-compose.yml up --force-recreate -d
```

The destination endpoint is available at `http://localhost:8098/fhir`.

## Where to go next

- Run the full pipeline in [Single Machine Analytics Deployment](/tutorials-and-codelabs/data-pipes-single-machine/).
- Manage pipeline batches in [Try Pipelines Controller with HAPI FHIR](/tutorials-and-codelabs/data-pipes-try-controller/).
