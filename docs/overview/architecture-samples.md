---
id: architecture-samples
title: Architecture Samples and Use Cases
description: Reference architectures and real-world deployment patterns built on Open Health Stack components.
slug: /overview/architecture-samples/
sidebar_label: Architecture samples
sidebar_position: 20
guide_type: Concept
guide_status: ready
---

## Modular components for real-world health architectures

Open Health Stack components can be used individually or combined to form the foundation of an end-to-end digital health platform. The modularity of the ecosystem enables engineering teams to solve specific integration challenges, modernize legacy environments, or launch complete clinical solutions.

![Five Open Health Stack solution samples. Sample 1, offline mobile apps, Android and multiplatform structured data capture apps. Sample 2, privacy and sync proxy, Info Gateway with SMART-on-FHIR. Sample 3, analytics pipelines, scalable SQL-on-FHIR pipelines. Sample 4, end-to-end platform, a complete mobile-to-analytics stack. Sample 5, hybrid and non-FHIR coexistence architectures, data harmonization pipelines and non-FHIR backend integration adapters.](../images/samples-overview.svg)

## Sample 1 for offline-first FHIR mobile applications

Using the client libraries and SDKs, developers can build FHIR-native mobile applications for frontline healthcare workers operating in low-connectivity settings.

- **Data collection** using Structured Data Capture to render validated FHIR Questionnaires
- **Offline operation** using FHIR Engine for local SQLite-backed storage and typed search
- **Clinical decision support** using FHIR Workflow to evaluate CQL logic and WHO Smart Guidelines recommendations directly on device

![Architecture diagram of an offline FHIR application. The mobile app contains the Structured Data Capture library for UI forms, FHIR Engine for local SQLite storage, and the Workflow library for CQL clinical decision support. The engine synchronizes with a remote FHIR Server over REST APIs.](../images/diagram-offline-app.svg)

## Sample 2 for privacy-preserving access proxy and sync

Deploying Info Gateway as a reverse proxy in front of health data endpoints provides fine-grained access control and SMART-on-FHIR support.

- **Restricted sync boundaries** limiting the scope of patient data downloaded to frontline devices based on practitioner assignments or health catchment area
- **SMART-on-FHIR application integration** enabling third-party clinical applications to access FHIR APIs securely without direct database access
- **Audit logging and policy enforcement** applying organizational access rules before requests touch underlying data stores

![Architecture diagram of privacy and sync control. Mobile devices and SMART on FHIR applications connect through the FHIR Info Gateway reverse proxy, which enforces access policies and sync rules before routing requests to the FHIR Server and authentication providers.](../images/diagram-privacy-sync.svg)

## Sample 3 for large-scale FHIR analytics pipelines

Heavily nested JSON structures in FHIR resources can make direct analytical queries challenging. Deploying FHIR Data Pipes transforms hierarchical FHIR data into tabular SQL-on-FHIR structures.

- **Batch and streaming extraction** pulling resources from transactional FHIR stores without impacting clinical operations
- **Relational transformations** converting nested resources into standardized SQL-on-FHIR tables in PostgreSQL, BigQuery, or ClickHouse
- **Aggregate indicators and dashboards** powering epidemiological tracking, national reporting, and programme management in tools like Apache Superset

![Architecture diagram of FHIR analytics. Transactional data from a FHIR Server is processed by FHIR Data Pipes using SQL-on-FHIR view definitions, outputting tabular data into analytical data warehouses for SQL queries and BI dashboards.](../images/diagram-analytics.svg)

## Sample 4 for end-to-end digital health platform

Combining all foundational components provides a complete foundation for health service delivery, coordination, and reporting.

- **Frontline care delivery** via offline-first mobile clients collecting data through standard questionnaires
- **Secure data exchange** via Info Gateway managing authentication, sync filtering, and role-based access
- **Interoperable persistence** with standard FHIR servers preserving longitudinal patient records
- **Automated analytics** via FHIR Data Pipes generating programme indicators and population health insights

![Architecture diagram of an end-to-end digital health solution. Frontline mobile apps sync with Info Gateway, which mediates requests to the central FHIR Server. FHIR Data Pipes streams data from the FHIR Server into an analytical data warehouse powering indicator dashboards.](../images/diagram-endtoend.svg)

## Sample 5 for hybrid architectures and non-FHIR coexistence

Because Open Health Stack is modular, organisations can modernize specific parts of their architecture while preserving existing legacy platforms.

1. **Non-FHIR data collection to FHIR-based analytics** where data collected through legacy systems is harmonized into FHIR resources (using tools like OpenFn or custom pipelines) to leverage FHIR Data Pipes for standard SQL-on-FHIR aggregate reporting.
2. **FHIR-native mobile app to non-FHIR backends** where frontline workers use FHIR-native mobile applications for offline care delivery. Data synchronizes to a FHIR server, where backend adapters route transactions into legacy hospital databases and national registries.

![Architecture diagram of hybrid architectures. Shows two patterns. First, non-FHIR data collectors transform data into FHIR for analytics with FHIR Data Pipes. Second, FHIR-native mobile apps sync to a FHIR server, with integration adapters connecting into non-FHIR enterprise systems.](../images/diagram-hybrid.svg)

## Where to go next

- [Adoption pathways](/overview/solutions-and-pathways/) explains how to select an adoption model.
- [The architecture](/ohs-player/architecture/) details how OHS Player reference components connect.
- [Reference Analytics](/components/reference-analytics/) covers deploying SQL-on-FHIR reporting pipelines.
- [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) explains offline client storage and synchronization.
