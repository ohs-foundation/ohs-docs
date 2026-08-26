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

Open Health Stack is a collection of open-source tools and libraries organized into three complementary pillars. Each pillar provides standards-based building blocks designed to work together or independently.

![Open Health Stack three pillars architecture diagram showing FHIR Foundations with core libraries and SDKs, OHS Player reference toolkit, and AI Commons evaluation tooling in incubation](../images/ohs-ecosystem-overview.svg)

## Pillar 1 for FHIR Foundations

Unbundled Kotlin Multiplatform core libraries, on-device storage, and UI rendering toolkits that integrate into any digital health application.

- **Core FHIR libraries** provide type-safe models (`fhir-model`) across Android, iOS, desktop, and web for FHIR R4, R4B, and R5, with an architecture ready for future releases including FHIR R6, alongside Kotlin FHIRPath (`fhir-path`) for clinical logic. Explore [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) and [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/).
- **Kotlin Multiplatform FHIR SDK** provides encrypted on-device SQLite storage, search, sync, and Structured Data Capture (SDC) forms. Explore [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) and [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/).
- **Android FHIR SDK** provides native Android libraries for offline storage, sync, and form rendering.
- **Back-end services** include Info Gateway and FHIR Data Pipes for reverse proxy authentication and batch SQL-on-FHIR pipelines.
- **Platform support and version compatibility** details supported Kotlin Multiplatform targets and tested versions. Explore [Platform support](/fhir-foundations/platform-support/) and [Version compatibility](/fhir-foundations/versions/).

[Explore complete FHIR Foundations documentation →](/fhir-foundations/)

## Pillar 2 for OHS Player reference toolkit

An end-to-end reference toolkit showing how foundational building blocks assemble into a working digital health application stack.

- **What OHS Player is** explains the philosophy of reference composition and modular assembly. Explore the [OHS Player overview](/ohs-player/).
- **The architecture** illustrates how clients, web portals, gateway security, FHIR servers, and analytical pipelines connect. Explore [The architecture](/ohs-player/architecture/).
- **How Player uses OHS components** explains how the reference toolkit consumes foundational libraries and un-forked FHIR servers. Explore [Component relationships](/ohs-player/how-player-uses-ohs-components/).
- **The components** details the individual reference components. Explore the [Components directory](/components/).
- **The configuration model** explains how standard FHIR resources drive screen layouts and workflows without custom code. Explore the [Configuration model](/ohs-player/configuration-model/).
- **What you can do today** outlines current reference capabilities and maturity. Explore [Current capabilities](/ohs-player/what-you-can-do-today/).

[Explore complete OHS Player reference toolkit →](/ohs-player/)

## Pillar 3 for AI Commons (Incubating)

An active incubation track focused on artificial intelligence safety and structured healthcare standards.

- **FHIR prompt tooling** helps developers query, translate, and extract structured FHIR data with language models.
- **Benchmarking suites** test model accuracy, clinical protocol compliance, and hallucination rates against clinical datasets.
- **Privacy frameworks** support on-premise execution and automated clinical data de-identification.

## What Open Health Stack leaves to the broader ecosystem

Open Health Stack integrates directly with established tools across the FHIR and Global Goods community rather than rebuilding them.

- **FHIR authoring tools** like Aidbox Form Builder, LHC-Forms, FHIR Shorthand, and Trifolia-on-FHIR create forms, questionnaires, and implementation guides.
- **FHIR data transformation engines** like OpenFn, Apache Camel, and Mirth Connect handle complex enterprise data mapping and scheduled aggregate transfers.
- **FHIR servers and repositories** like HAPI FHIR, Medplum, Aidbox, IBM FHIR Server, and commercial cloud repositories store and index health resources natively.

## Where to go next

- If you want to understand strategic benefits and total cost of ownership, read the executive briefing in [About Open Health Stack](/why-ohs/).
- If you want to evaluate adoption models and national system coexistence, explore [Stories and solutions](/overview/solutions-and-pathways/).
- If you want hands-on deployment scripts, codelabs, or configuration recipes, dive into [Build and quickstart](/get-started/).
