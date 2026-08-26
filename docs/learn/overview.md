---
id: overview
title: Learn Open Health Stack
description: Understand the three pillars of Open Health Stack including FHIR Foundations, OHS Player reference platform, and AI Commons.
slug: /learn/
sidebar_label: Learn Overview
sidebar_position: 1
guide_type: hub
guide_status: ready
---

## The three architectural pillars

Open Health Stack organizes its capabilities into three complementary pillars. Whether you are building an offline-first mobile application, evaluating a complete national reference platform, or testing clinical artificial intelligence safety, each pillar provides standards-based building blocks designed to work together or independently.

![Open Health Stack ecosystem and capabilities diagram showing three pillars including FHIR Foundations with core libraries and SDKs, OHS Player reference composition, and AI Commons evaluation tooling](../images/ohs-ecosystem-overview.svg)

## Pillar 1 for FHIR Foundations

FHIR Foundations provides unbundled Kotlin Multiplatform core libraries, on-device persistence, and user interface rendering toolkits that can be integrated into any digital health application.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       PILLAR 01: FHIR FOUNDATIONS                       │
├───────────────────────────────────┬─────────────────────────────────────┤
│ Core FHIR Libraries               │ Client & Back-End SDKs              │
│ Kotlin FHIR (R4, R5, R6 ready)    │ Kotlin FHIR Engine (offline SQLite) │
│ Kotlin FHIRPath (logic engine)    │ Kotlin FHIR Data Capture (SDC forms)│
│ Spec serialization and search     │ Info Gateway and FHIR Data Pipes    │
└───────────────────────────────────┴─────────────────────────────────────┘
```

- **Kotlin FHIR (`fhir-model`)** provides type-safe FHIR data models and JSON serialization across Android, iOS, desktop, and web for FHIR R4, R4B, and R5, with an architecture designed for future releases including FHIR R6. Explore the [Kotlin FHIR overview](/fhir-foundations/kotlin-fhir/).
- **Kotlin FHIRPath (`fhir-path`)** provides a standalone deterministic clinical logic evaluation engine. Explore the [Kotlin FHIRPath overview](/fhir-foundations/kotlin-fhirpath/).
- **Kotlin FHIR Engine (`fhir-engine`)** provides encrypted on-device SQLite storage, indexed search parameters, and bidirectional synchronization against standard FHIR servers. Explore the [Kotlin FHIR Engine overview](/fhir-foundations/kotlin-fhir-engine/).
- **Kotlin FHIR Data Capture (`fhir-data-capture`)** renders complex Structured Data Capture (SDC) forms with Jetpack Compose Multiplatform across mobile and desktop. Explore the [Kotlin FHIR Data Capture overview](/fhir-foundations/kotlin-fhir-data-capture/).
- **Android FHIR SDK** provides native Android libraries for Google Android applications.
- **Info Gateway and FHIR Data Pipes** provide reverse proxy authentication and batch SQL-on-FHIR streaming pipelines.
- **Platform support and version compatibility** details supported Kotlin Multiplatform targets and tested versions. Explore [Platform support](/fhir-foundations/platform-support/) and [Version compatibility](/fhir-foundations/versions/).

[Explore complete FHIR Foundations documentation →](/fhir-foundations/)

## Pillar 2 for OHS Player reference platform

OHS Player is an end-to-end reference composition demonstrating how the unbundled building blocks assemble into a working digital health platform.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PILLAR 02: OHS PLAYER                           │
├───────────────────────────────────┬─────────────────────────────────────┤
│ Frontline Client & Web Admin      │ Backend & Streaming Analytics       │
│ Multiplatform mobile application  │ Info Gateway authentication proxy   │
│ Web portal for supervisors        │ SQL-on-FHIR Superset dashboards     │
│ Declarative Configuration IG      │ Turnkey Docker Compose topology     │
└───────────────────────────────────┴─────────────────────────────────────┘
```

- **What OHS Player is** explains the philosophy of reference composition and modular assembly. Explore the [OHS Player overview](/concepts/what-ohs-player-is/).
- **The architecture** illustrates how clients, web portals, gateway security, FHIR servers, and analytical pipelines connect without vendor lock-in. Explore [The architecture](/concepts/architecture/).
- **How Player uses OHS components** explains how the reference platform consumes foundational libraries and un-forked FHIR servers. Explore [Component relationships](/concepts/how-player-uses-ohs-components/).
- **The components** details the individual reference components. Explore the [Components directory](/components/).
- **The configuration model** explains how standard FHIR resources drive screen layouts and workflows without custom code. Explore the [Configuration model](/concepts/configuration-model/).
- **What you can do today** outlines current reference capabilities and maturity. Explore [Current capabilities](/concepts/what-you-can-do-today/).

[Explore complete OHS Player concepts →](/concepts/what-ohs-player-is/)

## Pillar 3 for AI Commons (Exploring)

AI Commons is an exploration and incubation track addressing the critical intersection of clinical artificial intelligence and structured health data standards.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          PILLAR 03: AI COMMONS                          │
├───────────────────────────────────┬─────────────────────────────────────┤
│ Structured FHIR AI Tooling        │ Benchmarking & Clinical Safety      │
│ Prompt engineering for FHIR models│ Validation against reference datasets│
│ Clinical note extraction to FHIR  │ Hallucination and protocol metrics  │
└───────────────────────────────────┴─────────────────────────────────────┘
```

- **FHIR data model prompt engineering** allows engineering teams to leverage modern language models to query, transform, and extract structured FHIR resources from unstructured clinical text.
- **Clinical benchmarking and evaluation suites** provide standardized testing harnesses to evaluate accuracy, protocol compliance, and hallucination rates against clinical datasets.
- **Sovereign, privacy-preserving execution** supports on-premise model execution and automated clinical data de-identification to safeguard patient privacy.

## Where to go next

- If you want to understand strategic benefits and total cost of ownership, read the executive briefing in [About Open Health Stack](/why-ohs/).
- If you want to evaluate adoption models and national system coexistence, explore [Stories and solutions](/overview/solutions-and-pathways/).
- If you want hands-on deployment scripts, codelabs, or configuration recipes, dive into [Build and quickstart](/get-started/).
