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

![Four OHS adoption pathways. Pathway A, unbundled SDKs, client and backend libraries added to existing applications. Pathway B, reference platform, a full end-to-end multiplatform stack for a rapid baseline. Pathway C, analytics hub, SQL-on-FHIR pipelines powering aggregate dashboards. Pathway D, advancing safe, effective AI for global health use cases with active benchmarking, lifecycle evaluation, and Agent Skills initiatives.](../images/pathways-overview.svg)

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

Builders, health system innovators, and researchers can engage with AI Commons to advance safe, effective, and verifiable artificial intelligence for global health use cases.

- **Benchmarking (gHBench)** developing shared infrastructure for global health benchmarking use cases with funding from Google.org, led by PATH and MLCommons in collaboration with the AI Evals Working Group and CHAI on behalf of the AI Commons for Global Health community (funded and forming).
- **Evals (AI Evals Working Group)** operationalizing open evaluation infrastructure and shared playbooks across model selection baselines, application staging harnesses, and post-deployment monitoring.
- **Skills development** building open [Agent Skills](https://github.com/ohs-foundation/labs-ohs-agent/tree/main/skills) for Open Health Stack libraries, highlighted in the OHS Labs post [The FHIR Tax Is Shrinking](https://ohs.foundation/blog/fhir-standards-tax.html).

Participating teams collaborate through regular working sessions to test lifecycle frameworks, publish shared playbooks, and build developer-ready tooling. Read the [AI Commons overview and initiatives](/why-ohs/#pillar-3-for-ai-commons-active) to get involved.

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
| Advance safe, effective AI for global health | Pathway D (AI Commons) | [AI Commons initiatives](/why-ohs/#pillar-3-for-ai-commons-active) |
| Connect mobile workers to an existing national EHR | Pathway E (Coexistence) | [The architecture](/ohs-player/architecture/) |
| Explore reference solution architectures | Solution Architecture Samples | [Architecture samples and use cases](/overview/architecture-samples/) |
