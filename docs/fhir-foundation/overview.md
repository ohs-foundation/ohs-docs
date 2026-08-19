---
title: FHIR Foundation
description: The Kotlin Multiplatform FHIR libraries and client SDKs that OHS Player and your own applications build on.
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

FHIR Foundation is the Kotlin Multiplatform foundation for building FHIR-native software. OHS Player's client is built on it, but everything here exists independently of Player: each piece is an ordinary Maven Central artifact you can add to your own Kotlin project, whether or not you use anything else from the toolkit.

Everything publishes under the Maven group `dev.ohs.fhir`, is licensed Apache 2.0, and shares one design stance: pure Kotlin, no platform-specific FHIR dependencies, so the same code runs on Android, iOS, desktop JVM, and the browser.

## Libraries and SDKs

The group has two tiers, and the difference matters when you choose what to depend on.

**Libraries** are unopinionated building blocks — they take no position on what kind of program uses them. Both run everywhere, server-side JVM and native targets included, so a backend service can share the exact model code a mobile app uses.

| Library | Artifact | What it gives you |
| --- | --- | --- |
| [Kotlin FHIR](/fhir-foundation/kotlin-fhir/) | `fhir-model` | The FHIR data model as Kotlin classes, with JSON serialization |
| [Kotlin FHIRPath](/fhir-foundation/kotlin-fhirpath/) | `fhir-path` | An engine that evaluates FHIRPath expressions against those classes |

**SDKs** are opinionated, application-facing toolkits built on the libraries — each one solves a whole application concern rather than providing a primitive. Today's SDKs are both **client-side**: they exist to make an offline-capable, form-driven app buildable. Server-side SDKs would sit beside them as a sibling category; today, server-side use of this group means using the libraries directly.

| Client SDK | Artifact | What it gives you |
| --- | --- | --- |
| [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/) | `fhir-engine` | On-device storage, typed search, and synchronization with a FHIR server |
| [Kotlin FHIR Data Capture](/fhir-foundation/kotlin-fhir-data-capture/) | `fhir-data-capture` | Questionnaire rendering, validation, and extraction with Compose Multiplatform |

## How the tiers layer

The group is a stack, not a bundle. Each piece depends only on the ones below it, and you take only the layers you need.

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

The two SDKs do not depend on each other. A typical offline-first data-collection app uses both — Data Capture to fill in a Questionnaire, the Engine to store and sync the resulting resources — and wires them together itself.

## Choosing your entry point

**Building a client application?** Start at the SDK tier — the SDKs bring the libraries with them.

- **An offline-capable app** that stores resources locally and syncs with a server: [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/).
- **Collecting structured data with FHIR Questionnaires**: [Kotlin FHIR Data Capture](/fhir-foundation/kotlin-fhir-data-capture/).

**Building a server, a tool, or anything else in Kotlin?** Use the libraries directly.

- **Reading, building, or exchanging FHIR resources**: [Kotlin FHIR](/fhir-foundation/kotlin-fhir/). It is the base of everything else and useful entirely on its own.
- **Evaluating FHIRPath expressions** — clinical logic, extraction rules, anything spec-driven: add [Kotlin FHIRPath](/fhir-foundation/kotlin-fhirpath/).

Every repository follows the same documentation shape here: an overview of what it is and is not, a get-started page, and task guides. Facts that span the stack live in two shared references: [platform support](/fhir-foundation/platform-support/) and [versions and compatibility](/fhir-foundation/versions/).

## FHIR version coverage

The libraries support FHIR R4, R4B, and R5, each as a separate artifact so you only ship the version you use. The client SDKs support R4 only.

## How Player uses this group

OHS Player's [Client App](/components/client-app/) is the reference consumer: it demonstrates these libraries assembled into a working offline-first, configuration-driven application. If you are evaluating Player rather than building directly on the libraries, start from [What OHS Player is](/concepts/what-ohs-player-is/) instead — this section is for developers writing code against the libraries themselves.

Each library's repository remains the source of truth for its releases, API detail, and contribution process; every page here links to the repository it documents.
