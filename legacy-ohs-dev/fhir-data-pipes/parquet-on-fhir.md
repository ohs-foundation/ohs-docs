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

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-05-15 UTC."],[],["Raw FHIR resources are transformed into a \*Parquet-on-FHIR\* schema representation, following defined mapping rules, for each resource type. These columnar Parquet files form the base data warehouse, accessible via parquet-aware tools, such as SQL query engines. The data can be further transformed into materialized views through the view layer. This conversion process is handled by the FHIR Data Pipes ETL Pipelines.\n"]]
