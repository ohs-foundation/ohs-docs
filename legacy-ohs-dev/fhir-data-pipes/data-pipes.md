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

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-05-15 UTC."],[],["FHIR Data Pipes provides ETL pipelines to convert FHIR data into an SQL-ready format using Apache Beam. These pipelines create a data warehouse based on Apache Parquet files, enabling SQL queries. A Controller Module manages \"full,\" \"incremental,\" and \"merger\" pipelines, allowing scheduled or manual updates. The system implements the SQL-on-FHIR-v2 specification, supporting ViewDefinition resources to create flat views within the pipelines. It offers scalability and multiple deployment options for analytics services.\n"]]
