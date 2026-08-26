---
id: overview
title: Learn Open Health Stack
description: Understand the three pillars of Open Health Stack including FHIR Foundations, OHS Player reference toolkit, and AI Commons.
slug: /learn/
sidebar_label: Learn Overview
sidebar_position: 1
guide_type: hub
guide_status: ready
---

## The three architectural pillars

Open Health Stack organizes its capabilities into three complementary pillars. Whether you are building an offline-first mobile application, evaluating a complete national reference toolkit, or testing clinical artificial intelligence safety, each pillar provides standards-based building blocks designed to work together or independently.

![Open Health Stack three pillars architecture diagram showing FHIR Foundations with core libraries and SDKs, OHS Player reference toolkit, and AI Commons evaluation tooling in incubation](../images/ohs-ecosystem-overview.svg)

## Pillar 1 for FHIR Foundations

FHIR Foundations provides unbundled Kotlin Multiplatform core libraries, on-device persistence, and user interface rendering toolkits that can be integrated into any digital health application.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       PILLAR 01: FHIR FOUNDATIONS                       │
├───────────────────────────────────┬─────────────────────────────────────┤
│ Core FHIR Libraries               │ Client & Back-End SDKs              │
│ Kotlin FHIR (R4, R5, R6 ready)    │ Kotlin Multiplatform FHIR SDK       │
│ Kotlin FHIRPath (logic engine)    │ Android FHIR SDK                    │
│ Spec serialization and search     │ Info Gateway and FHIR Data Pipes    │
└───────────────────────────────────┴─────────────────────────────────────┘
```

- **Core FHIR libraries** include Kotlin FHIR (`fhir-model`) for type-safe data models across Android, iOS, desktop, and web for FHIR R4, R4B, and R5, with an architecture designed for future releases including FHIR R6, alongside Kotlin FHIRPath (`fhir-path`) for clinical logic evaluation. Explore [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) and [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/).
- **Kotlin Multiplatform FHIR SDK** provides on-device SQLite storage, indexed search, bidirectional sync, and Structured Data Capture form rendering across mobile and desktop. Explore [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) and [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/).
- **Android FHIR SDK** provides native Android libraries for Google Android applications.
- **Back-end services** include Info Gateway and FHIR Data Pipes for reverse proxy authentication and batch SQL-on-FHIR streaming pipelines.
- **Platform support and version compatibility** details supported Kotlin Multiplatform targets and tested versions. Explore [Platform support](/fhir-foundations/platform-support/) and [Version compatibility](/fhir-foundations/versions/).

[Explore complete FHIR Foundations documentation →](/fhir-foundations/)

## Pillar 2 for OHS Player reference toolkit

OHS Player is an end-to-end reference toolkit demonstrating how the unbundled building blocks assemble into a working digital health application stack.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PILLAR 02: OHS PLAYER REFERENCE                      │
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

## Pillar 3 for AI Commons (Incubating)

AI Commons is an active incubation track addressing the critical intersection of clinical artificial intelligence and structured health data standards.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     PILLAR 03: AI COMMONS (INCUBATING)                  │
├───────────────────────────────────┬─────────────────────────────────────┤
│ Structured FHIR AI Tooling        │ Benchmarking & Clinical Safety      │
│ Prompt engineering for FHIR models│ Validation against reference datasets│
│ Clinical note extraction to FHIR  │ Hallucination and protocol metrics  │
└───────────────────────────────────┴─────────────────────────────────────┘
```

- **FHIR data model prompt engineering** allows engineering teams to leverage modern language models to query, transform, and extract structured FHIR resources from unstructured clinical text.
- **Clinical benchmarking and evaluation suites** provide standardized testing harnesses to evaluate accuracy, protocol compliance, and hallucination rates against clinical datasets.
- **Sovereign, privacy-preserving execution** supports on-premise model execution and automated clinical data de-identification to safeguard patient privacy.

## What Open Health Stack leaves to the broader ecosystem

Open Health Stack integrates directly with established tools across the FHIR and Global Goods community rather than rebuilding them.

- **FHIR authoring tools** such as Aidbox Form Builder, LHC-Forms, FHIR Shorthand, and Trifolia-on-FHIR can be used to create forms, questionnaires, and implementation guides.
- **FHIR data transformation engines** such as OpenFn, Apache Camel, and Mirth Connect handle complex enterprise data mapping and scheduled aggregate transfers.
- **FHIR servers and repositories** such as HAPI FHIR, Medplum, Aidbox, IBM FHIR Server, and commercial cloud repositories store and index health resources natively.

## Where to go next

- If you want to understand strategic benefits and total cost of ownership, read the executive briefing in [About Open Health Stack](/why-ohs/).
- If you want to evaluate adoption models and national system coexistence, explore [Stories and solutions](/overview/solutions-and-pathways/).
- If you want hands-on deployment scripts, codelabs, or configuration recipes, dive into [Build and quickstart](/get-started/).
