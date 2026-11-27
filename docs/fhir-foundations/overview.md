---
title: FHIR Foundations
description: The Kotlin Multiplatform FHIR libraries, client SDKs, and backend services that OHS Player and your own applications build on.
slug: /fhir-foundations/
sidebar_position: 10
sidebar_label: What FHIR Foundations is
guide_type: Pillar overview
guide_status: ready
guide_focus: What the FHIR Foundations libraries are and how they fit together
source_url: https://github.com/ohs-foundation
source_label: OHS Foundation on GitHub ↗
---

## What FHIR Foundations is

FHIR Foundations is one of [Open Health Stack's three pillars](https://ohs.foundation/projects), providing the core libraries and SDKs for building FHIR-native software. OHS Player is built on this foundation, but everything here exists independently of Player.

The pillar is organized into three areas.

- **Core FHIR libraries** provide unopinionated primitives for data modeling and expression evaluation.
- **Client SDKs** provide application-facing toolkits for Kotlin Multiplatform and Android.
- **Back-end SDKs** provide data gateway and analytics pipeline infrastructure.

## Core FHIR libraries

Core libraries are unopinionated building blocks usable in any Kotlin program, client or server. Both run across JVM and native targets, so backend services and cross-platform client applications share identical model code.

| Core library | Artifact | What it gives you |
| --- | --- | --- |
| [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) | `fhir-model` | The FHIR data model as Kotlin classes with JSON serialization |
| [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) | `fhir-path` | An engine that evaluates FHIRPath expressions against those classes |

## Client SDKs

Client SDKs are application-facing toolkits that solve client-side storage, synchronization, workflow execution, knowledge management, and structured data capture.

### Kotlin Multiplatform (KMP) FHIR SDK

The [Kotlin Multiplatform (KMP) FHIR SDK](/fhir-foundations/kmp-fhir-sdk/) is the active successor to the Android FHIR SDK. Its modular libraries publish under the Maven group `dev.ohs.fhir` on [GitHub](https://github.com/orgs/ohs-foundation/repositories?q=topic:kmp-fhir-sdk) and run across Android, iOS, desktop, and web targets.

| SDK | Artifact | What it gives you |
| --- | --- | --- |
| [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) | `fhir-engine` | On-device storage, typed search, and synchronization with a FHIR server |
| [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/) | `fhir-data-capture` | Structured Data Capture (SDC) questionnaire rendering, validation, and extraction |
| [Kotlin FHIR Workflow](https://github.com/ohs-foundation/kotlin-fhir-workflow) | `fhir-workflow` | Workflow execution and care plan management |
| [Kotlin FHIR Knowledge](https://github.com/ohs-foundation/kotlin-fhir-knowledge) | `fhir-knowledge` | On-device FHIR NPM package installation and canonical resource lookup |

### Android FHIR SDK (Maintenance)

The [Android FHIR SDK](/fhir-foundations/android-fhir/) is in **Maintenance** mode. Developed in collaboration with the World Health Organization, it provides offline-first SQLite resource management, FHIR synchronization, Android View questionnaire rendering, and on-device CQL clinical reasoning for existing native Android View applications. New projects should start with the [KMP FHIR SDK](/fhir-foundations/kmp-fhir-sdk/).

## Back-end SDKs

Back-end SDKs handle routing, access control, and large-scale analytical pipelines behind applications.

| Back-end service | Repository | Role |
| --- | --- | --- |
| [Info Gateway](/fhir-foundations/info-gateway/) | `fhir-gateway` | Authentication proxy, granular access control, and endpoint customization |
| [FHIR Data Pipes](/fhir-foundations/fhir-data-pipes/) | `fhir-data-pipes` | Batch and streaming pipelines for data extraction and SQL-on-FHIR analytics |

## How the projects fit together

The pillar is modular. Each layer depends only on the primitives below it, and teams adopt only the components their architecture requires.

![The FHIR Foundations stack. Kotlin FHIR Data Capture and Kotlin FHIR Engine are the client-side SDKs. Both depend on Kotlin FHIRPath for expression evaluation and on Kotlin FHIR for the data model. Kotlin FHIRPath itself navigates the Kotlin FHIR data model, the base of the pillar.](../images/fhir-foundations-architecture.svg)

The client SDKs operate independently. A typical offline-first data-collection app uses both Data Capture and Engine together. Data Capture fills in a Questionnaire, and the Engine stores and syncs the resulting resources through Info Gateway.

## Choosing your entry point

**Building a new cross-platform, web, desktop, or Android application?** Start with the [Kotlin Multiplatform (KMP) FHIR SDK](/fhir-foundations/kmp-fhir-sdk/).

- Use [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) for local resource storage and synchronization.
- Use [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/) to collect structured data with FHIR Questionnaires.

**Maintaining an existing Android View app or need on-device CQL evaluation today?** Explore the Maintenance-mode [Android FHIR SDK](/fhir-foundations/android-fhir/).

**Building a server, service, or CLI tool?** Use the core libraries directly.

- Use [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) to read, validate, or serialize FHIR resources.
- Add [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) to evaluate clinical logic and search parameters.

**Managing analytics or access gateways?** Connect [Info Gateway](/fhir-foundations/info-gateway/) and [FHIR Data Pipes](/fhir-foundations/fhir-data-pipes/).

## FHIR version coverage

The core libraries support FHIR R4, R4B, and R5, each as a separate artifact so you only ship the version you use. The SDKs support R4.

## How Player uses this pillar

OHS Player's [Client App](/components/client-app/) is the reference consumer for the [KMP FHIR SDK](/fhir-foundations/kmp-fhir-sdk/). Its backend integrates with [Reference Backend](/components/reference-backend/) and [Reference Analytics](/components/reference-analytics/), demonstrating end-to-end assembly.
