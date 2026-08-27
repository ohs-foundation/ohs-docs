---
id: data-pipes-superset
title: Tutorial · Visualize Parquet DWH with Apache Superset
description: Connect Apache Superset to Apache Spark SQL and build clinical indicator dashboards from flattened FHIR tables.
slug: /tutorials-and-codelabs/data-pipes-superset/
sidebar_label: Superset Visualizations Tutorial
sidebar_position: 66
guide_type: Tutorial
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-data-pipes
source_label: fhir-data-pipes on GitHub ↗
---

## Overview

After transforming FHIR resources into flattened analytical tables, you can connect business intelligence tools to visualize key health metrics.

In this tutorial, you will connect Apache Superset to Apache Spark SQL or PostgreSQL, create datasets and charts, assemble a multi-metric clinical dashboard, and test live incremental updates.

## Prerequisites

- Completed [Single Machine Analytics Deployment](/tutorials-and-codelabs/data-pipes-single-machine/) with Spark Thrift Server running on port `10001`
- Apache Superset running locally (such as `http://localhost:8088`)
- `curl` command line utility installed

## Step 1 · Connect Superset to Spark SQL

1. Log into Apache Superset at `http://localhost:8088` with administrator credentials.
2. In the top navigation bar, navigate to **Settings** > **Database Connections**.
3. Click **+ Database** and select **Apache Spark SQL** (or **PostgreSQL** if connecting directly to `views`).
4. Set the connection URI to the Thrift endpoint.

```text
hive://localhost:10001/default
```

5. Test the connection and click **Connect**.

## Step 2 · Create a patient count metric chart

1. Open **SQL Lab** in Superset and select your database connection.
2. Run a query to count total patients.

```sql
SELECT COUNT(1) AS patient_count FROM Patient;
```

3. Click **Create Chart**, choose chart type **Big Number**, and configure the metric as `MAX(patient_count)`.
4. Save the chart with the name **Patient Count** and add it to a new dashboard named **Key Program Metrics**.

## Step 3 · Create a gender distribution chart

1. In SQL Lab, write an aggregation query over patient gender.

```sql
SELECT gender, COUNT(gender) AS count_gender
FROM Patient
GROUP BY gender
ORDER BY count_gender DESC;
```

2. Click **Create Chart** and select the **Pie Chart** visualizer.
3. Assign `gender` as the dimension and `MAX(count_gender)` as the metric.
4. Save the chart as **Gender Split** and attach it to your **Key Program Metrics** dashboard.

## Step 4 · Build an HIV treatment trend chart

Query longitudinal observation records to track treatment numbers over time.

```sql
SELECT 
  COUNT(*) AS total_patients, 
  YEAR(o.obs_date) AS obs_year
FROM observation_flat AS o
WHERE o.code LIKE '1255%'
  AND o.val_code LIKE '1256%'
  AND YEAR(o.obs_date) < 2023
GROUP BY YEAR(o.obs_date)
ORDER BY obs_year ASC;
```

Save this visualization as a **Bar Chart** titled **HIV Treatment Trends** and add it to the dashboard.

## Step 5 · Arrange dashboard layout

1. Navigate to **Dashboards** and open **Key Program Metrics**.
2. Click **Edit Dashboard** and add a top header component.
3. Position the **Patient Count** and **Gender Split** charts side by side in the top row.
4. Place the **HIV Treatment Trends** bar chart spanning the full width of the second row.
5. Click **Save**.

## Step 6 · Verify live incremental pipeline updates

Test that the analytics pipeline captures new patient records.

Post a new patient resource to the source FHIR server.

```sh
curl -X POST \
  -H "Content-Type: application/fhir+json; charset=utf-8" \
  'http://localhost:8091/fhir/Patient/' \
  -d '{"resourceType": "Patient"}'
```

Open the Pipelines Controller at `http://localhost:8090` and trigger an incremental run.

Once finished, return to Superset, click the dashboard menu, and select **Refresh dashboard**. The patient count metric increases dynamically.

## Where to go next

- Learn how to author custom schema projections in the [Streaming Analytics with SQL-on-FHIR Tutorial](/tutorials-and-codelabs/sql-on-fhir-analytics/).
- Connect cloud datasets in [Create GCP FHIR Store and BigQuery Dataset](/tutorials-and-codelabs/data-pipes-gcp-fhirstore/).
