---
title: "Parquet on FHIR Schema  |  Open Health Stack  |  Google for Developers"
original_url: "https://developers.google.com/open-health-stack/fhir-analytics/parquet-on-fhir"
source: "ohs.dev (Google for Developers Open Health Stack)"
---

# Parquet on FHIR Schema  |  Open Health Stack  |  Google for Developers

# Parquet on FHIR Schema

The output of the *FHIR Data Pipes ETL Pipelines* is conversion of raw FHIR
resources to a *Parquet-on-FHIR* schema representation. This takes place for
each resource type and follows the [FHIR Data Pipes Schema Mapping Rules](https://github.com/ohs-foundation/fhir-data-pipes/blob/master/doc/schema.md).

The generated columnar Parquet files provide the 'base data warehouse' that can
be queried using any parquet-aware tools (e.g a SQL based query engine) or
further transformed [via the view layer](/open-health-stack/fhir-analytics/view-layer)
into materialized views.

Go to [developer documentation](https://ohs-foundation.github.io/fhir-data-pipes/)
