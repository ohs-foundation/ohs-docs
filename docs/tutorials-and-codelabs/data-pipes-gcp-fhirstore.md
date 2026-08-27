---
id: data-pipes-gcp-fhirstore
title: Tutorial · Create GCP FHIR Store and BigQuery Dataset
description: Set up a Google Cloud Healthcare FHIR store with BigQuery streaming integration as a pipeline data sink.
slug: /tutorials-and-codelabs/data-pipes-gcp-fhirstore/
sidebar_label: GCP FHIR & BigQuery Tutorial
sidebar_position: 68
guide_type: Tutorial
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-data-pipes
source_label: fhir-data-pipes on GitHub ↗
---

## Overview

Google Cloud Healthcare API FHIR stores and Google BigQuery serve as enterprise cloud sinks for FHIR Data Pipes.

In this tutorial, you will configure a Google Cloud project, enable Healthcare and BigQuery APIs, create a service account with data sink permissions, and initialize a FHIR store that streams updates into BigQuery.

## Prerequisites

- A Google Cloud Platform account with project owner or IAM admin rights
- Google Cloud SDK CLI (`gcloud`) installed and initialized
- `fhir-data-pipes` repository cloned locally

## Step 1 · Initialize Google Cloud project and credentials

Set your active Google Cloud project and authenticate via the command line.

```sh
gcloud init
gcloud auth application-default login
```

Enable the necessary cloud APIs for Healthcare and BigQuery.

```sh
gcloud services enable healthcare.googleapis.com bigquery.googleapis.com
```

## Step 2 · Create and configure a service account

Create a dedicated service account for pipeline data streaming.

```sh
gcloud iam service-accounts create fhir-analytics-sa \
  --description="Service account for FHIR Data Pipes sink" \
  --display-name="FHIR Analytics Service Account"
```

Grant BigQuery and Healthcare dataset administrative permissions to the service account.

```sh
export PROJECT_ID="your-project-id"
export SA_EMAIL="fhir-analytics-sa@${PROJECT_ID}.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --role="roles/bigquery.admin" \
  --member="serviceAccount:${SA_EMAIL}"

gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
  --role="roles/healthcare.datasetAdmin" \
  --member="serviceAccount:${SA_EMAIL}"
```

Generate and download a service account key file.

```sh
gcloud iam service-accounts keys create ./gcp-key.json \
  --iam-account="${SA_EMAIL}"

export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/gcp-key.json"
```

## Step 3 · Create the FHIR store with BigQuery streaming

Use the repository helper script `utils/create_fhir_store.sh` to create a dataset and FHIR store configured to stream changes directly into BigQuery.

```sh
./utils/create_fhir_store.sh "${PROJECT_ID}" "us-central1" "health_dataset" "fhir_analytics_store"
```

Upon completion, your FHIR store resource URL will be formatted as shown below.

```text
https://healthcare.googleapis.com/v1/projects/PROJECT/locations/LOCATION/datasets/DATASET/fhirStores/FHIR-STORE-NAME
```

Changes piped into this FHIR store will automatically synchronize to BigQuery analytical tables for cloud-scale querying.

## Where to go next

- Learn how to run batch pipelines in [Try Pipelines Controller with HAPI FHIR](/tutorials-and-codelabs/data-pipes-try-controller/).
- Explore SQL-on-FHIR schemas in [Streaming Analytics with SQL-on-FHIR](/tutorials-and-codelabs/sql-on-fhir-analytics/).
