---
id: sql-on-fhir-analytics
title: Tutorial · Streaming Analytics with SQL-on-FHIR
description: Transform hierarchical FHIR data into relational database schemas with ViewDefinitions and build Apache Superset dashboards.
slug: /tutorials-and-codelabs/sql-on-fhir-analytics/
sidebar_label: SQL-on-FHIR Analytics Tutorial
sidebar_position: 30
guide_type: Tutorial
guide_status: ready
repository: analytics
---

## Overview

In this tutorial, you will define declarative SQL-on-FHIR `ViewDefinition` resources to flatten complex, nested FHIR JSON documents into relational database tables, run FHIR Data Pipes streaming, and build real-time population health charts in Apache Superset.

## Prerequisites

- Local reference infrastructure running with Docker Compose
- Basic knowledge of SQL queries

## Step 1 · Write a ViewDefinition resource

Create a declarative `ViewDefinition` file that projects fields from FHIR `Observation` resources into flat columns.

```json
{
  "resourceType": "http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition",
  "name": "patient_vitals_flat",
  "status": "active",
  "resource": "Observation",
  "select": [
    {
      "column": [
        { "name": "observation_id", "path": "id" },
        { "name": "patient_id", "path": "subject.reference" },
        { "name": "recorded_date", "path": "effectiveDateTime" },
        { "name": "code", "path": "code.coding[0].code" },
        { "name": "value_num", "path": "valueQuantity.value" }
      ]
    }
  ]
}
```

## Step 2 · Run FHIR Data Pipes streaming

Deploy the analytics profile within the reference infrastructure to start continuous batch extraction.

```sh
cd ohs-player-reference-infrastructure
./dev.sh up --pipes
```

FHIR Data Pipes reads transactional records from HAPI FHIR, applies your `ViewDefinition` transformations, and writes flattened relational tables to PostgreSQL.

## Step 3 · Query flattened tables in SQL

Connect to PostgreSQL and inspect your flattened analytical view.

```sql
SELECT 
  patient_id, 
  code, 
  value_num, 
  recorded_date 
FROM patient_vitals_flat 
WHERE recorded_date >= NOW() - INTERVAL '30 days';
```

## Step 4 · Build charts in Apache Superset

Open Apache Superset at `http://localhost:8088` and create a line chart showing blood pressure trends over time across care facilities.

## Where to go next

- Learn how to secure your backend with the [Gateway Security Codelab](/tutorials-and-codelabs/gateway-access-rules/).
- Read the [Reference Analytics guide](/components/reference-analytics/).
