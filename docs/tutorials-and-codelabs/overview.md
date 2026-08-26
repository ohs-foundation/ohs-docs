---
id: overview
title: Tutorials and Codelabs
description: Step-by-step tutorials, codelabs, and hands-on developer guides for Open Health Stack.
slug: /tutorials-and-codelabs/
sidebar_label: Overview
sidebar_position: 1
guide_type: Hub
guide_status: ready
repository: ohs-player
---

## Hands-on learning paths

Here you can find guided tutorials and hands-on codelabs to help engineering teams, health informaticians, and enterprise architects build with foundational libraries and the reference platform.

Each module focuses on a concrete technical capability, complete with prerequisites, runnable code snippets, and expected outcomes.

## Client SDKs

| Learning module | Type | What you build | Link |
| --- | --- | --- | --- |
| Offline-First Multiplatform Client | Codelab | An offline-capable Kotlin Multiplatform mobile and desktop app | [Start codelab](/tutorials-and-codelabs/multiplatform-client/) |
| Clinical Questionnaire Authoring | Tutorial | SDC questionnaires with FHIRPath validation and data extraction | [Start tutorial](/tutorials-and-codelabs/sdc-questionnaires/) |

## Info Gateway

| Learning module | Type | What you build | Link |
| --- | --- | --- | --- |
| Info Gateway Getting Started | Setup guide | Standalone Info Gateway build, upstream FHIR store setup, and token validation | [Start guide](/tutorials-and-codelabs/info-gateway-getting-started/) |
| Run Info Gateway in Docker | Tutorial | Local containerized Info Gateway stack with Keycloak and HAPI FHIR | [Start tutorial](/tutorials-and-codelabs/info-gateway-docker/) |
| Create an Access Checker Plugin | Tutorial | Custom Java access checker and factory plugin for fine-grained authorization | [Start tutorial](/tutorials-and-codelabs/info-gateway-access-checker/) |
| Gateway Security and Access Rules | Codelab | Role-based Spring Boot access control plugins and custom REST endpoints | [Start codelab](/tutorials-and-codelabs/gateway-access-rules/) |

## FHIR Data Pipes

| Learning module | Type | What you build | Link |
| --- | --- | --- | --- |
| Streaming Analytics with SQL-on-FHIR | Tutorial | Relational database views and Apache Superset dashboards | [Start tutorial](/tutorials-and-codelabs/sql-on-fhir-analytics/) |
| Analytics Test Servers Setup | Tutorial | Local HAPI FHIR and OpenMRS test containers preloaded with synthetic data | [Start tutorial](/tutorials-and-codelabs/data-pipes-test-servers/) |
| Single Machine Analytics Deployment | Tutorial | Pipeline controller, Apache Spark SQL, and PostgreSQL flattened views | [Start tutorial](/tutorials-and-codelabs/data-pipes-single-machine/) |
| Pipelines Controller with HAPI FHIR | Tutorial | Spring Boot batch transformation management and Parquet file generation | [Start tutorial](/tutorials-and-codelabs/data-pipes-try-controller/) |
| Parquet Visualization in Superset | Tutorial | Connect Apache Superset to Spark SQL and assemble indicator dashboards | [Start tutorial](/tutorials-and-codelabs/data-pipes-superset/) |
| GCP FHIR Store and BigQuery Sink | Tutorial | Google Cloud Healthcare API FHIR store with BigQuery streaming export | [Start tutorial](/tutorials-and-codelabs/data-pipes-gcp-fhirstore/) |

## OHS Player Reference Toolkit

| Learning module | Type | What you build | Link |
| --- | --- | --- | --- |
| Zero-Code Screen Configuration | Tutorial | Dynamic patient registers and profile screens configured in FHIR | [Start tutorial](/tutorials-and-codelabs/zero-code-screens/) |

## Suggested progression by role

- **Mobile and frontend developers** can begin with the [Offline-First Multiplatform Client Codelab](/tutorials-and-codelabs/multiplatform-client/) and proceed to [Clinical Questionnaire Authoring](/tutorials-and-codelabs/sdc-questionnaires/).
- **Backend and DevOps engineers** can explore [Info Gateway Getting Started](/tutorials-and-codelabs/info-gateway-getting-started/), [Run Info Gateway in Docker](/tutorials-and-codelabs/info-gateway-docker/), [Create an Access Checker Plugin](/tutorials-and-codelabs/info-gateway-access-checker/), or try the [Gateway Security Codelab](/tutorials-and-codelabs/gateway-access-rules/).
- **Health informaticians and data analysts** can progress through [Streaming Analytics with SQL-on-FHIR](/tutorials-and-codelabs/sql-on-fhir-analytics/), [Analytics Test Servers Setup](/tutorials-and-codelabs/data-pipes-test-servers/), [Single Machine Analytics Deployment](/tutorials-and-codelabs/data-pipes-single-machine/), and [Parquet Visualization in Superset](/tutorials-and-codelabs/data-pipes-superset/).
