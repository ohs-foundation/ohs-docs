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
