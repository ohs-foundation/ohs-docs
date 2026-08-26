---
title: FHIR Data Pipes
description: Horizontally scalable ETL pipelines transforming FHIR resources into Parquet and SQL-on-FHIR analytics schemas.
slug: /fhir-foundations/fhir-data-pipes/
sidebar_position: 18
guide_type: Component overview
guide_status: ready
guide_focus: Transforming FHIR data for large-scale relational querying and analytics
source_url: https://github.com/ohs-foundation/fhir-data-pipes
source_label: fhir-data-pipes on GitHub ↗
---

## What it is

Data-driven healthcare relies on quickly generating trusted, actionable insights from clinical encounters. While the FHIR standard offers structured data models for health interoperability, its deeply nested JSON hierarchies make direct analytical queries challenging.

FHIR Data Pipes provides horizontally scalable ETL pipelines that transform hierarchical FHIR resources into tabular, queryable formats using the SQL-on-FHIR standard.

![Architecture diagram of FHIR Data Pipes showing batch and streaming extraction from FHIR servers, Apache Beam pipeline transformations, Parquet storage, ViewDefinition processing, and SQL analytics engines.](../../images/diagram-analytics.svg)

## Core capabilities

FHIR Data Pipes is designed for flexible deployment across on-premise servers, single-machine developer setups, or horizontally distributed cloud infrastructure.

- **Apache Beam ETL pipelines** transform resources from FHIR stores into columnar Apache Parquet files organized for SQL engines.
- **SQL-on-FHIR specification support** implements the standard ViewDefinition format, allowing clinical data teams to define flat tabular projections declaratively.
- **Pipeline Controller module** coordinates full data extractions, incremental sync jobs, and dataset merging. Teams can schedule recurring sync cycles or trigger pipelines manually through the web control interface.
- **Query engine interoperability** produces standardized tables ready for querying via Apache Spark, Trino, PostgreSQL, BigQuery, ClickHouse, or business intelligence dashboards.

## Parquet-on-FHIR schema

The foundation of FHIR Data Pipes is the Parquet-on-FHIR representation. Each FHIR resource type maps to a corresponding columnar schema, preserving data types while optimizing disk layout and query performance.

```
┌─────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
│  FHIR Server    │  ──>  │  FHIR Data Pipes       │  ──>  │  Parquet Data Lake     │
│  (HAPI / Cloud) │       │  (Apache Beam ETL)     │       │  (Columnar Storage)    │
└─────────────────┘       └────────────────────────┘       └────────────────────────┘
                                                                       │
                                                                       ▼
┌─────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
│  BI Dashboards  │  <──  │  SQL Query Engine      │  <──  │  ViewDefinition Layer  │
│  (Superset)     │       │  (Spark / Postgres)    │       │  (Tabular Projections) │
└─────────────────┘       └────────────────────────┘       └────────────────────────┘
```

The generated Parquet files serve as the base analytical warehouse. They can be queried directly using SQL tools or materialized into specialized summary tables via the view layer.

## ViewDefinition layer

To make querying straightforward for epidemiologists and programme managers, FHIR Data Pipes applies FHIR ViewDefinition resources.

1. **Virtual views** generated via direct SQL queries over Parquet tables for ad-hoc analysis.
2. **Materialized views** created directly inside the extraction pipeline using standard ViewDefinitions, outputting flattened relational tables.

Predefined views for common clinical resources (such as Patients, Observations, Encounters, and Conditions) are provided out of the box and can be customized for specific health programmes.

## Next steps

- Explore [Reference Analytics](/components/reference-analytics/) to see how FHIR Data Pipes integrates with OHS Player.
- Review [SQL-on-FHIR Analytics codelab](/tutorials-and-codelabs/sql-on-fhir-analytics/) for a step-by-step query walkthrough.
- Check the [fhir-data-pipes repository on GitHub](https://github.com/ohs-foundation/fhir-data-pipes) for developer guides and deployment scripts.
