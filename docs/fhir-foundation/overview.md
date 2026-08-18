---
title: FHIR Foundation
description: The Kotlin Multiplatform FHIR libraries that OHS Player and your own applications build on.
slug: /fhir-foundation/
sidebar_position: 10
sidebar_label: What FHIR Foundation is
guide_type: Group overview
guide_status: ready
guide_focus: What the FHIR Foundation libraries are and how they fit together
source_url: https://github.com/ohs-foundation
source_label: OHS Foundation on GitHub ↗
---

## What the group is

FHIR Foundation is a set of Kotlin Multiplatform libraries for building FHIR-native applications. OHS Player's client is built on them, but they exist independently of Player: each is an ordinary Maven Central library you can add to your own Kotlin project, whether or not you use anything else from the toolkit.

All four libraries publish under the Maven group `dev.ohs.fhir`, are licensed Apache 2.0, and share one design stance: pure Kotlin, no platform-specific FHIR dependencies, so the same code runs on Android, iOS, desktop JVM, and the browser.

| Library | Artifact | What it gives you |
| --- | --- | --- |
| [Kotlin FHIR](/fhir-foundation/kotlin-fhir/) | `fhir-model` | The FHIR data model as Kotlin classes, with JSON serialization |
| [Kotlin FHIRPath](/fhir-foundation/kotlin-fhirpath/) | `fhir-path` | An engine that evaluates FHIRPath expressions against those classes |
| [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/) | `fhir-engine` | On-device storage, typed search, and synchronization with a FHIR server |
| [Kotlin FHIR Data Capture](/fhir-foundation/kotlin-fhir-data-capture/) | `fhir-data-capture` | Questionnaire rendering, validation, and extraction with Compose Multiplatform |

## How the libraries layer

The group is a stack, not a bundle. Each library depends only on the ones below it, and you take only the layers you need.

```text
Kotlin FHIR Data Capture        Kotlin FHIR Engine
(forms, validation,             (storage, search,
 extraction)                     synchronization)
      │        │                    │        │
      │        └───────┬────────────┘        │
      │        Kotlin FHIRPath               │
      │        (expression engine)           │
      │                │                     │
      └────────────────┼─────────────────────┘
                 Kotlin FHIR
        (data model and serialization)
```

Data Capture and the Engine do not depend on each other. A typical offline-first data-collection app uses both — Data Capture to fill in a Questionnaire, the Engine to store and sync the resulting resources — and wires them together itself.

## Choosing your entry point

- **You need to read, build, or exchange FHIR resources in Kotlin.** Start with [Kotlin FHIR](/fhir-foundation/kotlin-fhir/). It is the base of everything else and useful entirely on its own.
- **You need to evaluate FHIRPath expressions** — for clinical logic, extraction rules, or anything spec-driven. Add [Kotlin FHIRPath](/fhir-foundation/kotlin-fhirpath/).
- **You are building an offline-capable app** that stores resources locally and syncs with a server. Use [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/).
- **You are collecting structured data with FHIR Questionnaires.** Use [Kotlin FHIR Data Capture](/fhir-foundation/kotlin-fhir-data-capture/).

Every library follows the same documentation shape here: an overview of what it is and is not, a get-started page, and task guides. Cross-library facts live in two shared references: [platform support](/fhir-foundation/platform-support/) and [versions and compatibility](/fhir-foundation/versions/).

## FHIR version coverage

Kotlin FHIR and Kotlin FHIRPath support FHIR R4, R4B, and R5, each as a separate artifact so you only ship the version you use. Kotlin FHIR Engine and Kotlin FHIR Data Capture support R4 only.

## How Player uses this group

OHS Player's [Client App](/components/client-app/) is the reference consumer: it demonstrates these libraries assembled into a working offline-first, configuration-driven application. If you are evaluating Player rather than building directly on the libraries, start from [What OHS Player is](/concepts/what-ohs-player-is/) instead — this section is for developers writing code against the libraries themselves.

Each library's repository remains the source of truth for its releases, API detail, and contribution process; every page here links to the repository it documents.
