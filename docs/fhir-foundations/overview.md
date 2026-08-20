---
title: FHIR Foundations
description: The Kotlin Multiplatform FHIR libraries and client SDKs that OHS Player and your own applications build on.
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

FHIR Foundations is one of [Open Health Stack's three pillars](https://ohs.foundation/projects), the Kotlin Multiplatform foundation for building FHIR-native software. OHS Player's client is built on it, but everything here exists independently of Player. Each piece is an ordinary Maven Central artifact you can add to your own Kotlin project, whether or not you use anything else from the toolkit.

Everything publishes under the Maven group `dev.ohs.fhir` and is licensed Apache 2.0. All of it shares one design stance. It is pure Kotlin with no platform-specific FHIR dependencies, so the same code runs on Android, iOS, desktop JVM, and the browser.

## Core libraries and SDKs

The pillar has two tiers, and the difference matters when you choose what to depend on.

**Core libraries** are unopinionated building blocks that take no position on what kind of program uses them. Both run everywhere, server-side JVM and native targets included, so a backend service can share the exact model code a mobile app uses.

| Core library | Artifact | What it gives you |
| --- | --- | --- |
| [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) | `fhir-model` | The FHIR data model as Kotlin classes, with JSON serialization |
| [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) | `fhir-path` | An engine that evaluates FHIRPath expressions against those classes |

**SDKs** are opinionated, application-facing toolkits built on the core libraries. Each one solves a whole application concern rather than providing a primitive. Today's SDKs are both **client-side**, and they exist to make an offline-capable, form-driven app buildable. Server-side SDKs would sit beside them as a sibling category. Today, server-side use of this pillar means using the core libraries directly.

| SDK | Artifact | What it gives you |
| --- | --- | --- |
| [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) | `fhir-engine` | On-device storage, typed search, and synchronization with a FHIR server |
| [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/) | `fhir-data-capture` | Questionnaire rendering, validation, and extraction with Compose Multiplatform |

## How the tiers layer

The pillar is a stack, not a bundle. Each piece depends only on the ones below it, and you take only the layers you need.

```text
  Kotlin FHIR Data Capture        Kotlin FHIR Engine     ─┐
  (forms, validation,             (storage, search,       │ client SDKs
   extraction)                     synchronization)      ─┘
        │        │                    │        │
        │        └───────┬────────────┘        │
        │        Kotlin FHIRPath              ─┐
        │        (expression engine)           │
        │                │                     │ libraries
        └────────────────┼─────────────────────┤
                   Kotlin FHIR                 │
          (data model and serialization)      ─┘
```

The two SDKs do not depend on each other. A typical offline-first data-collection app uses both and wires them together itself. Data Capture fills in a Questionnaire, and the Engine stores and syncs the resulting resources.

## Choosing your entry point

**Building a client application?** Start at the SDK tier. The SDKs bring the core libraries with them.

- Use [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) for an offline-capable app that stores resources locally and syncs with a server.
- Use [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/) to collect structured data with FHIR Questionnaires.

**Building a server, a tool, or anything else in Kotlin?** Use the core libraries directly.

- Use [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) to read, build, or exchange FHIR resources. It is the base of everything else and useful entirely on its own.
- Add [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) to evaluate FHIRPath expressions for clinical logic, extraction rules, or anything spec-driven.

Every repository follows the same documentation shape here. Each has an overview of what it is and is not, a get-started page, and task guides. Facts that span the stack live in two shared references, [platform support](/fhir-foundations/platform-support/) and [versions and compatibility](/fhir-foundations/versions/).

## FHIR version coverage

The core libraries support FHIR R4, R4B, and R5, each as a separate artifact so you only ship the version you use. The SDKs support R4 only.

## How Player uses this pillar

OHS Player's [Client App](/components/client-app/) is the reference consumer. It demonstrates this stack assembled into a working offline-first, configuration-driven application. If you are evaluating Player rather than building directly on the stack, start from [What OHS Player is](/concepts/what-ohs-player-is/) instead. This section is for developers writing code against the libraries and SDKs themselves.

Each repository remains the source of truth for its releases, API detail, and contribution process. Every page here links to the repository it documents.
