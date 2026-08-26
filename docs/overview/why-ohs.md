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

![Open Health Stack three pillars architecture diagram showing FHIR Foundations with core libraries and SDKs, OHS Player reference toolkit, and AI Commons evaluation tooling in incubation](../images/ohs-ecosystem-overview.svg)

Open Health Stack organizes its building blocks into three complementary pillars.

### Pillar 1 for FHIR Foundations

FHIR Foundations delivers unbundled Kotlin Multiplatform libraries and client SDKs that any health application can import independently.

- **Core FHIR libraries** include Kotlin FHIR (`fhir-model`) for type-safe data models and JSON serialization across Android, iOS, desktop, and web for FHIR R4, R4B, and R5, with an architecture ready for future releases including FHIR R6, alongside Kotlin FHIRPath (`fhir-path`) for deterministic clinical logic evaluation.
- **Kotlin Multiplatform FHIR SDK** provides on-device SQLite storage, background synchronization, and Structured Data Capture (SDC) form rendering with Jetpack Compose Multiplatform.
- **Android FHIR SDK** provides native Android libraries for offline FHIR storage, synchronization, and form rendering on Google Android devices.
- **Back-end services** include Info Gateway (`fhir-gateway`) and FHIR Data Pipes for reverse proxy authentication, granular access rules, and batch analytical streaming pipelines.

### Pillar 2 for OHS Player reference toolkit

OHS Player is an end-to-end reference toolkit demonstrating how the unbundled building blocks assemble into a working digital health application stack.

- **Frontline Client App** is a Kotlin Multiplatform application for community health workers and nurses, running on Android, iOS, desktop, and web from one unified source tree.
- **Web Admin Portal** is a browser administration console for managing users, roles, organisations, care teams, and health facility locations.
- **Reference Gateway Host** is an authenticating proxy that validates OpenID Connect tokens, enforces role-based access rules, and routes requests to un-forked FHIR stores.
- **Reference Analytics Pipeline** streams transactional FHIR data into relational data warehouses using standard SQL-on-FHIR view definitions, powering live Apache Superset dashboards.
- **Declarative Configuration IG** defines screen layouts, clinical forms, and indicator tables in standard FHIR resources, allowing health authorities to adapt workflows without recompiling mobile binaries.

### Pillar 3 for AI Commons (Incubating)

AI Commons is an active incubation track focusing on the intersection of artificial intelligence and structured healthcare standards.

- **FHIR data model prompt engineering tools** allow developers to use modern language models to query, translate, and extract structured FHIR resources and questionnaires accurately.
- **Benchmarking and clinical evaluation suites** enable builders and health ministries to test artificial intelligence accuracy, clinical protocol compliance, and hallucination rates against standard clinical validation datasets.
- **Privacy-preserving execution frameworks** support on-premise model execution and automated clinical data de-identification, ensuring zero unauthorized health data leakage.

## Strategic capabilities by focus area

| Capability area | What Open Health Stack provides | Key components |
| --- | --- | --- |
| Mobile and client applications | Offline-first data entry, patient registry, task lists, and multiplatform form rendering | Kotlin Multiplatform FHIR SDK, Android FHIR SDK |
| Backend and gateway security | Centralized authentication, OAuth2 token validation, and patient-level access control | Info Gateway, Keycloak, Spring Boot |
| Analytics and reporting | Streaming pipelines that transform hierarchical FHIR resources into relational database tables | FHIR Data Pipes, SQL-on-FHIR ViewDefinitions, Apache Superset |
| Declarative configuration | Zero-code screen customization and form updates driven directly by standard FHIR resources | Player Configuration IG, Structured Data Capture |
| Clinical AI and evaluation | Benchmarking test suites and prompt tools to evaluate clinical accuracy and safety | AI Commons validation tools, FHIR prompt templates |

## What Open Health Stack does not cover

Open Health Stack focuses specifically on client SDKs, multiplatform offline persistence, gateway security, analytical extraction, and reference application assembly. Rather than building duplicative tools, Open Health Stack integrates seamlessly with established solutions across the broader FHIR and Global Goods ecosystem.

### FHIR authoring tools

Open Health Stack consumes standard FHIR resources but does not build specialized form authoring environments. Teams can author forms, questionnaires, and implementation guides using existing authoring software such as Aidbox Form Builder, LHC-Forms, FHIR Shorthand, and Trifolia-on-FHIR.

### FHIR data transformation and workflow automation

Open Health Stack provides SQL-on-FHIR extraction pipelines via FHIR Data Pipes. Broader enterprise workflow automation, message transformation, and protocol bridging can be handled by dedicated integration platforms and Digital Public Goods such as OpenFn, Apache Camel, and Mirth Connect.

### FHIR servers and clinical repositories

Open Health Stack is completely server-agnostic. It does not include a proprietary FHIR database. It operates out of the box with standard open source FHIR servers such as HAPI FHIR, Medplum, Aidbox, and IBM FHIR Server, as well as managed cloud healthcare APIs from Google Cloud, Amazon Web Services, and Microsoft Azure.

## Core business advantages

### 1. Zero vendor lock-in and sovereign data ownership

Open Health Stack is built strictly on official HL7 FHIR specifications without custom forks. Health systems retain full ownership of their data schemas, clinical forms, and access policies. Organisations can switch cloud providers, storage engines, or analytics tools without migrating data formats.

### 2. Lower total cost of ownership via Kotlin Multiplatform

Maintaining separate codebases for native Android, native iOS, and web portals quickly exhausts public health budgets. Open Health Stack shares core data models, local persistence, and form rendering logic across Android, iOS, Desktop, and Web from one codebase, reducing long-term maintenance costs significantly.

### 3. Rapid adaptation without recompiling applications

When national clinical guidelines or indicators change, health informaticians update central FHIR Questionnaire resources and SQL-on-FHIR view definitions. Frontline devices update their screens and workflows automatically upon synchronization without requiring new app store releases.

### 4. Resilient offline frontline care

Frontline workers in rural clinics and remote communities can register patients, record encounters, calculate clinical scores, and validate complex forms completely offline. Background synchronization reconciles records securely through the FHIR Gateway whenever connectivity is restored.

## Coexistence with national health infrastructure

Open Health Stack is intentionally designed to be complementary to existing digital health investments rather than requiring costly system replacement. Where standard FHIR APIs are available, interoperability works out of the box.

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

- **Out of the box FHIR interoperability** enables any system exposing standard FHIR endpoints to exchange resources with Open Health Stack components without custom adapters.
- **DHIS2 national reporting** connects through automated SQL-on-FHIR pipelines. FHIR Data Pipes transforms encounter resources into flat analytical tables, while third-party integration platforms and Digital Public Goods like OpenFn automate scheduling, mapping, and monthly payload submission directly into DHIS2 data value sets.
- **OpenMRS and legacy EHRs** connect seamlessly through standard FHIR module endpoints and Info Gateway access rules without altering core hospital database structures.
- **National Master Patient Indexes** integrate directly with gateway identity routing to ensure patient identifier continuity across health facilities.

Community implementation recipes and integration examples are shared across developer resources and community working groups.
