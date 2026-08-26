---
id: tutorials-and-codelabs
title: Tutorials and Codelabs
description: Step-by-step tutorials, codelabs, and hands-on developer guides for Open Health Stack.
slug: /resources/tutorials-and-codelabs/
sidebar_label: Tutorials and codelabs
sidebar_position: 20
guide_type: hub
guide_status: ready
---

## Hands-on learning paths

Open Health Stack provides guided tutorials and hands-on codelabs to help engineering teams, health informaticians, and enterprise architects build with foundational libraries and the reference platform.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       DEVELOPER LEARNING PATHS                          │
├───────────────────────────────────┬─────────────────────────────────────┤
│ 1. Multiplatform Client Codelab   │ 2. SDC Questionnaire Tutorial       │
│ Build an offline-first mobile app │ Author, validate, and extract forms │
├───────────────────────────────────┼─────────────────────────────────────┤
│ 3. SQL-on-FHIR Analytics Tutorial │ 4. Gateway Security Codelab         │
│ Stream FHIR into Superset tables  │ Write custom access rules in Kotlin │
└───────────────────────────────────┴─────────────────────────────────────┘
```

## Codelab 1 for building an offline-first multiplatform client

Learn how to create a Kotlin Multiplatform application targeting Android, iOS, and Desktop from scratch using Open Health Stack libraries.

### What you will learn

- How to set up a Kotlin Multiplatform project with Gradle version catalogs
- How to import `dev.ohs.fhir.model` for type-safe FHIR data models
- How to initialize `FhirEngine` for local SQLite database storage
- How to perform typed searches and persist patient records offline
- How to configure `FhirSyncTask` to synchronize changes with a remote FHIR server

### Prerequisites and starting point

Start with the [Kotlin FHIR Engine get started guide](/fhir-foundations/kotlin-fhir-engine/get-started/) and the [Kotlin FHIR get started guide](/fhir-foundations/kotlin-fhir/get-started/).

## Tutorial 2 for authoring and validating clinical questionnaires

Learn how to design, validate, and extract clinical intake questionnaires using the Structured Data Capture (SDC) standard.

### What you will learn

- How to structure FHIR Questionnaire resources with nested items and value sets
- How to write FHIRPath expressions for real-time validation and dynamic field calculation
- How to render forms using Jetpack Compose Multiplatform via `fhir-data-capture`
- How to configure template-based and definition-based extraction to generate FHIR Observation and Patient resources automatically
- How to build custom Compose UI widgets for specialized inputs

### Prerequisites and starting point

Start with the [Kotlin FHIR Data Capture overview](/fhir-foundations/kotlin-fhir-data-capture/) and [Questionnaire rendering guide](/fhir-foundations/kotlin-fhir-data-capture/render-a-questionnaire/).

## Tutorial 3 for streaming analytics with SQL-on-FHIR

Learn how to transform complex hierarchical FHIR data into relational analytical tables and visualize population health indicators in Apache Superset.

### What you will learn

- How to write declarative SQL-on-FHIR `ViewDefinition` files to flatten FHIR resources into relational columns
- How to deploy FHIR Data Pipes to stream clinical updates into PostgreSQL or BigQuery
- How to configure Apache Superset dashboards to track clinic metrics, patient cohorts, and maternal health indicators
- How to generate monthly aggregate indicator payloads for national DHIS2 reporting

### Prerequisites and starting point

Start with the [Reference Analytics overview](/components/reference-analytics/) and [Analytics run guide](/components/reference-analytics/run/).

## Codelab 4 for implementing gateway access rules and custom endpoints

Learn how to extend the Open Health Stack FHIR Gateway with custom Spring Boot plugins, role-based access checkers, and bespoke endpoints.

### What you will learn

- How to configure Keycloak OpenID Connect authentication and role tokens
- How to write custom `AccessChecker` plugins in Kotlin to restrict resource access by user location and role
- How to add custom REST endpoints to the Gateway host without modifying the upstream FHIR store
- How to package and load backend plugins via runtime loader arguments

### Prerequisites and starting point

Start with the [Reference Backend overview](/components/reference-backend/) and [Backend extensions guide](/extend/backend-extensions/).

## Tutorial 5 for zero-code screen configuration

Learn how to adapt frontline health worker user interfaces without recompiling mobile binaries.

### What you will learn

- How the Player Configuration Implementation Guide defines screens and list views in standard FHIR resources
- How SQL-on-FHIR `ViewJoinMap` links database views to user interface components
- How to modify clinical summary screens and deploy configuration updates over the air

### Prerequisites and starting point

Start with the [Screen configuration guide](/configure/screen-from-fhir-data/) and the [Configuration model concept](/concepts/configuration-model/).
