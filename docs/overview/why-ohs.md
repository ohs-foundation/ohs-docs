---
id: why-ohs
title: Why Open Health Stack
description: Open-source tools, shared Kotlin libraries, and standards-native building blocks for digital health systems.
slug: /why-ohs/
sidebar_label: Why Open Health Stack
sidebar_position: 5
guide_type: Concept
guide_status: ready
---

## The digital health challenge

Healthcare programmes face two common hurdles when deploying software for frontline health workers and clinics.

Proprietary vertical systems introduce expensive ongoing license fees, closed databases, and slow turnaround for form changes. Custom bespoke apps require maintaining separate codebases across Android, iOS, and web, resulting in high engineering costs and scaling friction.

Open Health Stack is a collection of open-source tools, shared libraries, and reference components. It gives ministries of health, digital health entrepreneurs, and non-profits the flexibility to build, adapt, and scale healthcare tools on open standards.

## The three pillars

![Open Health Stack three pillars architecture diagram showing FHIR Foundations with core libraries and SDKs, OHS Player reference toolkit, and active AI Commons benchmarking, evaluation, and skills initiatives](../images/ohs-ecosystem-overview.svg)

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
- **Reference Analytics** extracts clinical data into relational databases on a schedule, via SQL-on-FHIR view definitions, for Apache Superset dashboards.
- **Declarative Configuration IG** defines screens, forms, and indicator tables in standard FHIR resources so workflows update without recompiling apps.

### Pillar 3 for AI Commons (Active)

Advancing safe, effective, and verifiable artificial intelligence for global health use cases through shared benchmarking infrastructure, open lifecycle evaluation, and developer tooling under neutral Linux Foundation governance.

#### Key initiatives

- **Benchmarking (gHBench)** is an initiative funded by Google.org to develop shared infrastructure for global health benchmarking use cases. It is led by PATH and MLCommons in collaboration with the AI Evals Working Group and CHAI on behalf of the AI Commons for Global Health community. Current status is funded and forming.
- **Evals (AI Evals Working Group)** convenes builders, clinicians, researchers, and implementing partners with the AI Commons for Global Health collective to operationalize end-to-end evaluation infrastructure across the full health AI lifecycle. Active work spans pre-development model selection baselines, pre-deployment application staging harnesses for prompts and FHIR schema mappings, post-deployment field monitoring for continuous quality improvement, and shared evaluation playbooks.
- **Skills development** is building out an open set of [Agent Skills](https://github.com/ohs-foundation/labs-ohs-agent/tree/main/skills) (`SKILL.md`) for Open Health Stack libraries so AI coding agents can build offline-capable, standards-compliant FHIR applications at minimal cost and complexity. Read the recent OHS Labs post [The FHIR Tax Is Shrinking](https://ohs.foundation/blog/fhir-standards-tax.html) for empirical benchmark results across Kotlin FHIR Models, Kotlin FHIR Engine, and Kotlin FHIR Data Capture.

#### Get involved with AI Commons

- [Register to join the AI Evals Working Group and receive updates](https://ohs.foundation/get-involved)
- [Join the OHS Discord community](https://discord.gg/sfgUU7AHZT)
- [Explore the OHS Labs Agent Skills experiment on GitHub](https://github.com/ohs-foundation/labs-ohs-agent)

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

![Four complementary integration patterns. Standard FHIR APIs get direct interoperability out of the box. DHIS2 aggregate reporting is reached through FHIR Data Pipes with OpenFn workflows. OpenMRS and hospital EHRs are enabled through a FHIR Facade layer. National Master Patient Index integrates through gateway identity verification.](../images/coexistence-overview.svg)

- **Out of the box FHIR interoperability** connects directly with any system exposing standard FHIR endpoints.
- **DHIS2 national reporting** pairs FHIR Data Pipes with integration platforms like OpenFn to flatten encounters and automate monthly payload submissions.
- **OpenMRS and legacy EHRs** connect through a FHIR Facade exposing standard FHIR endpoints, routed via gateway access rules without altering core databases.
- **National Master Patient Indexes** integrate with gateway routing for patient identifier continuity across facilities.

Community implementation recipes and integration examples are shared across developer resources and community working groups.
