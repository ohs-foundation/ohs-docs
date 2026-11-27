---
title: Kotlin Multiplatform (KMP) FHIR SDK
description: Modular Kotlin Multiplatform libraries for building offline-capable FHIR applications across Android, iOS, desktop, and web from a single codebase.
slug: /fhir-foundations/kmp-fhir-sdk/
sidebar_position: 5
sidebar_label: Overview
guide_type: Component overview
guide_status: ready
guide_focus: Building cross-platform FHIR apps on Android, iOS, desktop, and web
source_url: https://github.com/orgs/ohs-foundation/repositories?q=topic:kmp-fhir-sdk
source_label: KMP FHIR SDK on GitHub ↗
---

## What it is

The Kotlin Multiplatform (KMP) FHIR SDK is the active next-generation multiplatform successor to the Maintenance-mode [Android FHIR SDK](/fhir-foundations/android-fhir/). It brings FHIR data modeling, deterministic clinical rules, on-device offline storage, bidirectional synchronization, and Structured Data Capture forms into shared Kotlin modules that publish under the Maven group `dev.ohs.fhir`.

Teams write their clinical data handling, validation, and form workflows once and ship across Android, iOS, JVM desktop, and modern web browsers via WebAssembly (`wasmJs`) and JavaScript (`js`). Rather than shipping a single monolithic dependency, the SDK is organized as modular libraries that can be adopted individually or used together as a full client stack.

## Libraries in the stack

![The FHIR Foundations stack showing Kotlin FHIR Data Capture and Kotlin FHIR Engine as client SDKs layered over Kotlin FHIRPath and Kotlin FHIR.](../../images/fhir-foundations-architecture.svg)

| Library | Artifact | Role |
| --- | --- | --- |
| [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) | `fhir-model` | Core FHIR R4, R4B, and R5 data models with JSON serialization |
| [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) | `fhir-path` | Clinical expression and search-parameter evaluation engine |
| [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) | `fhir-engine` | On-device FHIR R4 SQLite storage, typed search, and server sync |
| [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/) | `fhir-data-capture` | Compose Multiplatform rendering, validation, and template extraction for FHIR Questionnaires |
| [Kotlin FHIR Workflow](https://github.com/ohs-foundation/kotlin-fhir-workflow) | `fhir-workflow` | Clinical workflow execution, including `PlanDefinition/$apply` care plans |
| [Kotlin FHIR Knowledge](https://github.com/ohs-foundation/kotlin-fhir-knowledge) | `fhir-knowledge` | On-device FHIR NPM package installation and canonical resource lookup |

## Platform coverage

Every platform shares the same FHIR R4 models, FHIRPath evaluation, and Compose Multiplatform UI components, while storage and scheduling adapt to native platform capabilities.

| Platform | Storage and sync | UI and forms |
| --- | --- | --- |
| Android | SQLite with optional SQLCipher encryption and WorkManager background sync | Compose Multiplatform (`minSdk 26`) |
| iOS | Native SQLite and `BGTaskScheduler` background tasks (`iosArm64`, `iosSimulatorArm64`) | Compose Multiplatform |
| Web browser (`wasmJs` and `js`) | WebAssembly SQLite stored in OPFS with foreground sync | Compose Multiplatform in modern browsers |
| Desktop and Server JVM | Local SQLite (`~/.fhir-engine` or custom directory) and foreground sync | Compose Multiplatform on Java 11 or 21+ |

Browser targets require `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers plus the local SQLite worker setup documented in [Run the engine in the browser](/fhir-foundations/kotlin-fhir-engine/web-targets/). For target architecture details across every repository, see [Platform support](/fhir-foundations/platform-support/).

## Readiness and versions

The libraries in the stack are at different release stages as the higher-level client SDKs prepare for a coordinated Beta release.

- **Core primitives** are furthest along, with `kotlin-fhir` at `1.0.0` (stable) and `kotlin-fhirpath` at `1.0.0-beta06` (Beta).
- **Client SDKs and companions** (`kotlin-fhir-engine` and `kotlin-fhir-data-capture` at `2.0.0-alpha05`, plus `kotlin-fhir-workflow` and `kotlin-fhir-knowledge` at `2.0.0-alpha01`) already run forms, validation, offline persistence, and server sync across Android, iOS, desktop, and web while APIs continue to stabilize toward Beta.
- **Pin lockstep versions** declared by the highest library in your dependency tree (`fhir-model-r4` `1.0.0-rc03` and `fhir-path-r4` `1.0.0-beta06` alongside `2.0.0-alpha05`), as detailed in [Versions and compatibility](/fhir-foundations/versions/).
- **Check platform-specific behavior** before shipping. On-device database encryption via SQLCipher (`enableEncryption = true`) and WorkManager background scheduling are currently available on Android only.

## Migrating from the Android FHIR SDK

Teams running existing apps on the [Android FHIR SDK](/fhir-foundations/android-fhir/) do not need to rewrite clinical definitions or server integrations. Both generations target HL7 FHIR R4, so FHIR `Questionnaire` resources, Structured Data Capture rules, FHIRPath expressions, and HAPI FHIR synchronization patterns carry over.

Migration can happen incrementally. Existing Android-only modules can continue running while you migrate shared models, FHIRPath logic, storage, and forms onto `dev.ohs.fhir` Maven Central artifacts (replacing the earlier `com.google.android.fhir` and `com.google.fhir` coordinates listed in [Versions and compatibility](/fhir-foundations/versions/#earlier-coordinates)). Review the [Android FHIR SDK migration guide](/fhir-foundations/android-fhir/#migrating-to-the-kmp-fhir-sdk) for differences around Compose Multiplatform UI, Android-only SQLCipher, and on-device CQL evaluation.

## How OHS Player uses the SDK

The KMP FHIR SDK powers [OHS Player](/ohs-player/), the Foundation's Pillar 02 reference toolkit. Inside the cross-platform [Client App](/components/client-app/) (`player-reference`), the SDK connects through [`player-client`](https://github.com/ohs-foundation/player-client) so teams can configure patient lists and clinical screens from standard FHIR definitions and SQL-on-FHIR ViewDefinitions instead of writing repetitive mapping code.

Teams have two starting points. Adopt individual `dev.ohs.fhir` libraries inside an existing application, or launch the full OHS Player reference stack to see client, gateway, web portal, and analytics working together.

## Next steps

- Follow the [Manage FHIR Resources Codelab](/tutorials-and-codelabs/engine/) to sync patients, render a registration form, and apply a `PlanDefinition` across Android, iOS, desktop, and web.
- Follow the [Capture and Process Health Data Codelab](/tutorials-and-codelabs/data-capture/) to render a FHIR Questionnaire and extract structured resources.
- Check [Platform support](/fhir-foundations/platform-support/) and [Versions and compatibility](/fhir-foundations/versions/) before wiring dependencies.
- Browse the [KMP FHIR SDK repositories on GitHub](https://github.com/orgs/ohs-foundation/repositories?q=topic:kmp-fhir-sdk).
