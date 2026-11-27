---
title: Platform support
description: Which Kotlin Multiplatform targets the Core Libraries and KMP FHIR SDK publish artifacts for.
slug: /fhir-foundations/platform-support/
sidebar_position: 20
guide_type: Technical reference
guide_status: ready
guide_focus: Confirming a library supports your target before you depend on it
source_url: https://github.com/ohs-foundation
source_label: OHS Foundation on GitHub ↗
---

## Support matrix

The Core Libraries and [KMP FHIR SDK](/fhir-foundations/kmp-fhir-sdk/) target different platform sets, so check this table before assuming the whole stack runs where your app does. A check means the repository's latest release publishes a Maven Central artifact for that target, and a cross means it does not.

| Target | FHIR | FHIRPath | Engine | Data Capture |
| --- | --- | --- | --- | --- |
| Android | ✓ | ✓ | ✓ | ✓ |
| JVM (desktop, server) | ✓ | ✓ | ✓ | ✓ |
| iOS device (`iosArm64`) | ✓ | ✓ | ✓ | ✓ |
| iOS simulator, Apple Silicon | ✓ | ✓ | ✓ | ✓ |
| iOS simulator, Intel (`iosX64`) | ✗ | ✗ | ✗ | ✗ |
| JS (browser) | ✓ | ✓ | ✓ | ✓ |
| Wasm JS (browser) | ✓ | ✓ | ✓ | ✓ |
| Wasm WASI | ✓ | ✓ | ✗ | ✗ |
| macOS (`macosArm64`) | ✓ | ✗ | ✗ | ✗ |
| Linux (`linuxX64`, `linuxArm64`) | ✓ | ✗ | ✗ | ✗ |

## Notes per library

### Kotlin FHIR

The widest matrix in the pillar. It is a pure data-model library with no I/O, so it also ships native macOS and Linux targets. There are no Intel Mac, watchOS, tvOS, or Windows-native targets. The JVM artifact is compiled to Java 11 bytecode, so it runs on Java 11 or newer.

### Kotlin FHIRPath

Adds a parser and evaluator on top of the model and covers the app-facing targets. Those are Android, JVM, both iOS ARM targets, JS, and both Wasm variants. The official FHIR test-suite conformance tests execute on JVM and Android, and the other targets run the unit-test suite.

### Kotlin FHIR Engine

Bounded by its storage layer. The engine persists with Room for Kotlin Multiplatform, and Room 3 publishes no `iosX64` artifacts, so the engine deliberately omits the Intel iOS simulator. Browser targets (JS and Wasm JS) work but need a documented project-level setup for the SQLite web worker. See [Run the engine in the browser](/fhir-foundations/kotlin-fhir-engine/web-targets/). Android requires minSdk 26.

### Kotlin FHIR Data Capture

Targets Android (`minSdk 26`), JVM, `iosArm64`, `iosSimulatorArm64`, JS, and Wasm JS. Intel iOS simulator (`iosX64`) targets were dropped after `2.0.0-alpha02`, and Wasm WASI is explicitly unsupported because no Compose UI toolkit exists there.

### Kotlin FHIR Workflow

The `2.0.0-alpha01` companion targets Android (`minSdk 26`), Desktop JVM, `iosArm64`, `iosSimulatorArm64`, and Node `wasmJs`. It omits `iosX64` because `kotlin-fhir` and `kotlin-fhirpath` do not publish that target.

### Kotlin FHIR Knowledge

The `2.0.0-alpha01` companion targets Android (`minSdk 26`), Desktop JVM, `iosArm64`, `iosSimulatorArm64`, JS, and Wasm JS. Package downloading and gzip extraction run on non-web targets (`Android`, `iOS`, `Desktop JVM`).

## Reading the repositories

Each repository's README carries a per-artifact badge matrix for its latest release. When this page and Maven Central disagree, Maven Central is right.
