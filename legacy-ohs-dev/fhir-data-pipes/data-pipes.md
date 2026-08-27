---
title: "FHIR Data Pipes  |  Open Health Stack  |  Google for Developers"
original_url: "https://developers.google.com/open-health-stack/fhir-analytics/data-pipes"
source: "ohs.dev (Google for Developers Open Health Stack)"
---

# FHIR Data Pipes  |  Open Health Stack  |  Google for Developers

# FHIR Data Pipes

[View source on GitHub
![](../images/GitHub-Mark-32px.png)](https://github.com/ohs-foundation/fhir-data-pipes)

*FHIR Data Pipes* is a set of ETL pipelines for transforming FHIR data into an
SQL-capable format for building analytics services. FHIR Data Pipes is designed
with horizontal scalability in mind and offers multiple deployment options.

The features include:

- [Apache Beam](https://beam.apache.org/) ETL pipelines to transform
  data from a FHIR source into an SQL-on-FHIR schema data warehouse, based on
  Apache Parquet files that can be queried using SQL
  (see [Parquet-on-FHIR schema](/open-health-stack/fhir-analytics/parquet-on-fhir))
- Controller Module for managing the FHIR Data Pipes Pipelines, integrating
  "full", "incremental", and "merger" pipelines together. Using the controller
  module you can schedule periodic incremental updates or use the Web Control
  Panel to start the pipeline manually.
- Implementation of the [SQL-on-FHIR-v2 specification](https://build.fhir.org/ig/FHIR/sql-on-fhir-v2/StructureDefinition-ViewDefinition.html)
  making it possible to apply ViewDefinition resources to generate flat views
  within the pipelines (see [View layer](/open-health-stack/fhir-analytics/view-layer))

Go to [developer documentation](https://ohs-foundation.github.io/fhir-data-pipes/)
