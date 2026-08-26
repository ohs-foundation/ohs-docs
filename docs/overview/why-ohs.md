---
id: why-ohs
title: Why Open Health Stack
description: Strategic capabilities, total cost of ownership reduction, open standards, and AI readiness for digital health.
slug: /why-ohs/
sidebar_label: Why Open Health Stack
sidebar_position: 5
guide_type: conceptual
guide_status: ready
---

## The digital health landscape challenge

Healthcare organisations worldwide face difficult choices when deploying software for frontline health workers, clinic operations, and national health reporting. 

Many systems rely on proprietary vertical applications. These create high ongoing licensing fees, proprietary database lock-in, and costly dependencies on single vendors for simple form or workflow changes. Other programmes attempt custom bespoke builds from scratch. These builds require separate engineering teams for Android, iOS, and Web, resulting in high maintenance budgets and systems that struggle to scale.

Open Health Stack provides an open source foundation of standards-native building blocks. It gives ministries of health, digital health entrepreneurs, and non-profit organisations the technical agility to build, adapt, and scale healthcare software without proprietary lock-in.

## Ecosystem architecture and the three pillars

![Open Health Stack ecosystem and capabilities diagram showing three pillars including FHIR Foundations with core libraries and SDKs, OHS Player reference composition, and AI Commons evaluation tooling](../images/ohs-ecosystem-overview.svg)

Open Health Stack organizes its building blocks into three complementary pillars.

### Pillar 1 for FHIR Foundations

FHIR Foundations delivers unbundled Kotlin Multiplatform libraries and client SDKs that any health application can import independently.

- **Kotlin FHIR (`fhir-model`)** provides type-safe FHIR data classes, JSON serialization, and spec-compliant resource models across Android, iOS, desktop, and web for FHIR R4, R4B, and R5, with an architecture ready for future releases including FHIR R6.
- **Kotlin FHIRPath (`fhir-path`)** provides a deterministic expression evaluation engine that evaluates clinical logic against Kotlin FHIR classes.
- **Kotlin FHIR Engine (`fhir-engine`)** provides on-device SQLite-based offline storage, typed search parameters, and bidirectional synchronization against standard FHIR servers.
- **Kotlin FHIR Data Capture (`fhir-data-capture`)** renders complex Structured Data Capture (SDC) forms, calculates clinical expressions in real time, and extracts completed forms into standard FHIR resource bundles.
- **Android FHIR SDK** provides native Android libraries for offline FHIR storage, synchronization, and form rendering on Google Android devices.
- **Info Gateway (`fhir-gateway`) and FHIR Data Pipes** provide reverse proxy authentication, granular access rules, and batch analytical streaming pipelines behind backend infrastructure.

### Pillar 2 for OHS Player reference platform

OHS Player is an end-to-end reference toolkit demonstrating how the unbundled building blocks assemble into a working digital health platform.

- **Frontline Client App** is a Kotlin Multiplatform application for community health workers and nurses, running on Android, iOS, desktop, and web from one unified source tree.
- **Web Admin Portal** is a browser administration console for managing users, roles, organisations, care teams, and health facility locations.
- **Reference Gateway Host** is an authenticating proxy that validates OpenID Connect tokens, enforces role-based access rules, and routes requests to un-forked FHIR stores.
- **Reference Analytics Pipeline** streams transactional FHIR data into relational data warehouses using standard SQL-on-FHIR view definitions, powering live Apache Superset dashboards.
- **Declarative Configuration IG** defines screen layouts, clinical forms, and indicator tables in standard FHIR resources, allowing health authorities to adapt workflows without recompiling mobile binaries.

### Pillar 3 for AI Commons

AI Commons focuses on the intersection of artificial intelligence and structured healthcare standards.

- **FHIR data model prompt engineering tools** allow developers to use modern language models to query, translate, and extract structured FHIR resources and questionnaires accurately.
- **Benchmarking and clinical evaluation suites** enable builders and health ministries to test artificial intelligence accuracy, clinical protocol compliance, and hallucination rates against standard clinical validation datasets.
- **Privacy-preserving execution frameworks** support on-premise model execution and automated clinical data de-identification, ensuring zero unauthorized health data leakage.

## Strategic capabilities by focus area

| Capability area | What Open Health Stack provides | Key components |
| --- | --- | --- |
| Mobile and client applications | Offline-first data entry, patient registry, task lists, and multiplatform form rendering | Kotlin FHIR Engine, Data Capture, Compose Multiplatform |
| Backend and gateway security | Centralized authentication, OAuth2 token validation, and patient-level access control | Info Gateway, Keycloak, Spring Boot |
| Analytics and reporting | Streaming pipelines that transform hierarchical FHIR resources into relational database tables | FHIR Data Pipes, SQL-on-FHIR ViewDefinitions, Apache Superset |
| Declarative configuration | Zero-code screen customization and form updates driven directly by standard FHIR resources | Player Configuration IG, Structured Data Capture |
| Clinical AI and evaluation | Benchmarking test suites and prompt tools to evaluate clinical accuracy and safety | AI Commons validation tools, FHIR prompt templates |

## Core business advantages

### 1. Zero vendor lock-in and sovereign data ownership

Open Health Stack is built strictly on official HL7 FHIR specifications without custom forks. Health systems retain full ownership of their data schemas, clinical forms, and access policies. Organisations can switch cloud providers, storage engines, or analytics tools without migrating data formats.

### 2. Lower total cost of ownership via Kotlin Multiplatform

Maintaining separate codebases for native Android, native iOS, and web portals quickly exhausts public health budgets. Open Health Stack shares core data models, local persistence, and form rendering logic across Android, iOS, Desktop, and Web from one codebase, reducing long-term maintenance costs significantly.

### 3. Rapid adaptation without recompiling applications

When national clinical guidelines or indicators change, health informaticians update central FHIR Questionnaire resources and SQL-on-FHIR view definitions. Frontline devices update their screens and workflows automatically upon synchronization without requiring new app store releases.

### 4. Resilient offline frontline care

Frontline workers in rural clinics and remote communities can register patients, record encounters, calculate clinical scores, and validate complex forms completely offline. Background synchronization reconciles records securely through the FHIR Gateway whenever connectivity is restored.

## Coexistence with national health systems

Open Health Stack connects directly with existing national digital health software.

- **DHIS2 national reporting** is supported through automated SQL-on-FHIR pipelines that aggregate patient-level clinical records into standard indicator payloads.
- **OpenMRS and legacy EHRs** connect through standard FHIR REST endpoints and Info Gateway access rules without altering core hospital databases.
- **National Master Patient Indexes** integrate directly with gateway identity routing to ensure patient identifier continuity across health facilities.
