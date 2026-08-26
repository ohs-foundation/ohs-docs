---
title: "View Layer  |  Open Health Stack  |  Google for Developers"
original_url: "https://developers.google.com/open-health-stack/fhir-analytics/view-layer"
source: "ohs.dev (Google for Developers Open Health Stack)"
---

# View Layer  |  Open Health Stack  |  Google for Developers

# View Layer

The heavily nested nature of FHIR resources and the Parque-on-FHIR schema
requires complex SQL queries that can make them difficult to work with for
analytics use cases.

A common approach to address this is to flatten the data into a set of views
(virtual or materialized) which can then be queried using simpler SQL
statements.

Using FHIR Data Pipes, there are multiple approaches for generating flat tabular
views for use in analytics applications to match the deployment requirements:

1. SQL queries to generate virtual views (outside the pipeline)
2. [FHIR ViewDefinition](https://build.fhir.org/ig/FHIR/sql-on-fhir-v2/StructureDefinition-ViewDefinition.html) resources to generate materialized views (within the pipeline)
   which can be outputted in any tabular format (with current support for Parquet
   and DB tables)

For both of these approaches, a set of "predefined views" for common FHIR
resources are provided. These can be modified or extended.

Go to [developer documentation](https://ohs-foundation.github.io/fhir-data-pipes/)

Except as otherwise noted, the content of this page is licensed under the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/), and code samples are licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0). For details, see the [Google Developers Site Policies](https://developers.google.com/site-policies). Java is a registered trademark of Oracle and/or its affiliates.

Last updated 2026-05-15 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-05-15 UTC."],[],["FHIR data's complexity necessitates flattening for analytics. This is achieved by creating tabular views, either virtual or materialized. Virtual views are created using SQL queries, while materialized views are generated via FHIR ViewDefinition resources, outputting in formats like Parquet or DB tables. FHIR Data Pipes supports both methods, providing predefined views for common FHIR resources that can be customized, to facilitate analytics applications. Further details are available in the developer documentation.\n"]]
