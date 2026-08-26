---
id: why-ohs
title: Why Open Health Stack
description: Open-source tools, shared Kotlin libraries, and standards-native building blocks for digital health systems.
slug: /why-ohs/
sidebar_label: Why Open Health Stack
sidebar_position: 5
guide_type: conceptual
guide_status: ready
---

## The digital health challenge

Healthcare programmes face two common hurdles when deploying software for frontline health workers and clinics.

Proprietary vertical systems introduce expensive ongoing license fees, closed databases, and slow turnaround for form changes. Custom bespoke apps require maintaining separate codebases across Android, iOS, and web, resulting in high engineering costs and scaling friction.

Open Health Stack is a collection of open-source tools, shared libraries, and reference components. It gives ministries of health, digital health entrepreneurs, and non-profits the flexibility to build, adapt, and scale healthcare tools on open standards.

## The three pillars

![Open Health Stack three pillars architecture diagram showing FHIR Foundations with core libraries and SDKs, OHS Player reference toolkit, and AI Commons evaluation tooling in incubation](../images/ohs-ecosystem-overview.svg)

### Pillar 1 for FHIR Foundations

Unbundled Kotlin Multiplatform libraries and client SDKs that can be imported independently into any project.

- **Core FHIR libraries** provide type-safe models (`fhir-model`) across Android, iOS, desktop, and web for FHIR R4, R4B, and R5, with an architecture ready for future releases including FHIR R6, alongside Kotlin FHIRPath (`fhir-path`) for deterministic clinical logic.
- **Kotlin Multiplatform FHIR SDK** provides on-device SQLite storage, search, bidirectional synchronization, and Structured Data Capture (SDC) forms.
- **Android FHIR SDK** provides native Android libraries for offline storage, sync, and form rendering.
- **Back-end services** include Info Gateway (`fhir-gateway`) and FHIR Data Pipes for reverse proxy authentication and batch SQL-on-FHIR pipelines.

### Pillar 2 for OHS Player reference toolkit

An end-to-end reference toolkit showing how foundational building blocks assemble into a working digital health application stack.

- **Frontline Client App** runs on Android, iOS, desktop, and web from a single shared Kotlin Multiplatform codebase.
- **Web Admin Portal** manages users, roles, organisations, and health facility hierarchies.
- **Reference Gateway** validates tokens, enforces access rules, and routes requests to un-forked FHIR stores.
- **Reference Analytics** streams clinical data into relational databases via SQL-on-FHIR view definitions for live Apache Superset dashboards.
- **Declarative Configuration IG** defines screens, forms, and indicator tables in standard FHIR resources so workflows update without recompiling apps.

### Pillar 3 for AI Commons (Incubating)

An active incubation track focused on artificial intelligence safety and structured healthcare standards.

- **FHIR prompt tooling** helps developers query, translate, and extract structured FHIR data with language models.
- **Benchmarking suites** test model accuracy, clinical protocol compliance, and hallucination rates against clinical datasets.
- **Privacy frameworks** support on-premise execution and automated clinical data de-identification.

## Core advantages

### 1. Sovereign data ownership with zero lock-in

Data models built strictly on official HL7 FHIR specifications without custom forks. Health systems retain full ownership of their data schemas, clinical forms, and access policies. Organisations can easily switch cloud providers, storage engines, or analytics tools without migrating data formats.

### 2. Lower maintenance costs via Kotlin Multiplatform

Sharing core data models, local storage, and form rendering logic across Android, iOS, Desktop, and Web from a single codebase cuts engineering maintenance costs significantly.

### 3. Rapid adaptation without recompiling applications

When clinical guidelines change, informaticians update central FHIR Questionnaires and SQL-on-FHIR view definitions. Frontline devices update their screens and workflows automatically on sync without requiring app store releases.

### 4. Offline frontline reliability

Frontline workers in remote clinics can register patients, record encounters, calculate clinical scores, and validate forms completely offline. Background sync reconciles records when connectivity is restored.

## What Open Health Stack does not cover

Open Health Stack focuses on client SDKs, multiplatform offline persistence, gateway security, analytical extraction, and reference applications. It integrates directly with existing tools across the FHIR and Global Goods ecosystem.

| Functional area | What the broader ecosystem provides | Ecosystem examples |
| --- | --- | --- |
| FHIR Form & IG Authoring | Specialized visual form builders and authoring suites | Aidbox Form Builder, LHC-Forms, FHIR Shorthand, Trifolia-on-FHIR |
| Enterprise Workflow & ETL | Message transformation, scheduling, and protocol bridging | OpenFn, Apache Camel, Mirth Connect |
| FHIR Servers & Repositories | Standard transactional and cloud clinical data repositories | HAPI FHIR, Medplum, Aidbox, IBM FHIR Server, Google Cloud, AWS, Azure |

## Coexistence with national health infrastructure

Open Health Stack tools complement existing digital health investments rather than replacing them. Where standard FHIR APIs exist, interoperability works out of the box.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      COMPLEMENTARY INTEGRATION PATTERNS                 │
├───────────────────────────────────┬─────────────────────────────────────┤
│ Standard FHIR APIs                │ Out-of-the-box native data exchange │
│ DHIS2 Aggregate Reporting         │ FHIR Data Pipes + OpenFn workflow   │
│ OpenMRS & Hospital EHRs           │ Info Gateway routing and access rules│
│ National Master Patient Index     │ Gateway identity verification       │
└───────────────────────────────────┴─────────────────────────────────────┘
```

- **Out of the box FHIR interoperability** connects directly with any system exposing standard FHIR endpoints.
- **DHIS2 national reporting** pairs FHIR Data Pipes with integration platforms like OpenFn to flatten encounters and automate monthly payload submissions.
- **OpenMRS and legacy EHRs** connect through standard FHIR endpoints and gateway access rules without altering core databases.
- **National Master Patient Indexes** integrate with gateway routing for patient identifier continuity across facilities.

Community implementation recipes and integration examples are shared across developer resources and community working groups.
