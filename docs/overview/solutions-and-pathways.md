---
id: solutions-and-pathways
title: Adoption pathways
description: Adoption models and integration patterns for health ministries, digital health entrepreneurs, and enterprise architects.
slug: /overview/solutions-and-pathways/
sidebar_label: Adoption pathways
sidebar_position: 10
guide_type: Concept
guide_status: ready
---

## Flexible adoption for diverse digital health needs

Open Health Stack is designed to accommodate different digital health contexts, from national ministry programmes to agile technology startups. Rather than imposing a single monolithic architecture, the ecosystem provides distinct pathways that allow teams to adopt specific components or deploy complete reference systems.

![Four OHS adoption pathways. Pathway A, unbundled SDKs, client and backend libraries added to existing applications. Pathway B, reference platform, a full end-to-end multiplatform stack for a rapid baseline. Pathway C, analytics hub, SQL-on-FHIR pipelines powering aggregate dashboards. Pathway D, advancing safe, effective AI for global health use cases, launching evaluation tooling and frameworks.](../images/pathways-overview.svg)

## Pathway A for unbundled SDK and client adoption

Engineering teams with established mobile, web, or backend applications can adopt individual Open Health Stack libraries without adopting the full reference stack.

- **Kotlin FHIR and FHIRPath** provide type-safe FHIR data models and clinical logic evaluation for any Kotlin Multiplatform project.
- **Kotlin FHIR Engine** provides local SQLite-based offline storage, typed search, and background synchronization against standard FHIR endpoints.
- **Kotlin FHIR Data Capture** renders structured clinical questionnaires with Jetpack Compose Multiplatform across Android, iOS, desktop, and web.
- **Info Gateway and FHIR Data Pipes** provide reverse proxy authentication and batch analytical pipelines for backend infrastructure.

This pathway is ideal for organisations that already have a functioning clinical app and want to upgrade to multiplatform FHIR compliance or add robust offline sync.

## Pathway B for reference platform adaptation

For national health authorities, non-governmental organisations, and digital health entrepreneurs building new platforms, the OHS Player reference composition provides an end-to-end baseline.

- Frontline mobile client app for community health workers and nurses
- Web administration portal for managing users, roles, organisations, and locations
- Reference gateway backend with authentication and custom access rules
- Reference analytics pipeline with automated SQL-on-FHIR extraction and Superset dashboards
- Complete Docker Compose reference infrastructure for local evaluation

Implementing teams fork the reference repositories, customize screen layouts via declarative FHIR resources, configure access rules, and deploy to their cloud or on-premise infrastructure.

## Pathway C for analytics and interoperability hubs

Health systems often possess substantial transactional FHIR data but lack accessible analytical reporting for programme managers and epidemiologists.

In this pathway, organisations deploy FHIR Data Pipes alongside existing FHIR servers. The pipeline extracts transactional FHIR resources on a schedule into analytical PostgreSQL, BigQuery, or ClickHouse data warehouses using standard SQL-on-FHIR view definitions. Programme directors can query tabular health indicators and visualize trends in Apache Superset without impacting operational clinic servers.

## Pathway D for advancing safe, effective AI for global health

Builders, health system innovators, and researchers can engage with AI Commons to advance safe, effective artificial intelligence for global health use cases.

- **AI Evals Lifecycle Working Group** operationalizing an open evaluation infrastructure across model selection, application staging, and post-deployment monitoring.
- **Structured evaluation frameworks** to test clinical reasoning, safety baselines, and protocol adherence.
- **Open adapters and staging harnesses** to validate prompts, retrieval pipelines, and EHR or FHIR schema mappings.

Participating teams collaborate through fortnightly working sessions to test lifecycle frameworks, publish shared playbooks, and build developer-ready evaluation tooling. Read the [AI Commons briefing and working group schedule](/why-ohs/#pillar-3-for-ai-commons-launching) to get involved.

## Pathway E for coexistence with national health infrastructure

Open Health Stack is designed to be complementary to existing digital health investments. Where standard FHIR APIs are available, interoperability works out of the box without requiring replacement of national software.

| Existing national component | How Open Health Stack integrates |
| --- | --- |
| Standard FHIR health systems | Direct resource synchronization and REST querying out of the box |
| DHIS2 national aggregate reporting | FHIR Data Pipes flattens encounters into indicator tables, and workflow tools like OpenFn submit monthly payloads |
| OpenMRS or hospital EHRs | Info Gateway routes client synchronization requests directly to standard FHIR module endpoints |
| National Master Patient Index | Gateway authentication plugins verify and map patient identifiers across regional health registries |
| Keycloak or enterprise IAM | Unified OpenID Connect and OAuth2 single sign-on across mobile apps and web portals |

## How to choose your pathway

| If your primary goal is to | Recommended pathway | Where to start |
| --- | --- | --- |
| Add offline FHIR storage to an existing mobile app | Pathway A (Client SDKs) | [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) |
| Launch a complete community health solution | Pathway B (OHS Player) | [Get started with Player](/get-started/) |
| Generate aggregate reports from FHIR databases | Pathway C (Analytics Hub) | [Reference Analytics](/components/reference-analytics/) |
| Advance safe, effective AI for global health | Pathway D (AI Commons) | [AI Commons briefing](/why-ohs/#pillar-3-for-ai-commons-launching) |
| Connect mobile workers to an existing national EHR | Pathway E (Coexistence) | [The architecture](/ohs-player/architecture/) |
| Explore reference solution architectures | Solution Architecture Samples | [Architecture samples and use cases](/overview/architecture-samples/) |
