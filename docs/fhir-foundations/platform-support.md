---
title: Platform support
description: Which Kotlin Multiplatform targets each FHIR Foundations library publishes artifacts for.
slug: /fhir-foundations/platform-support/
sidebar_position: 20
guide_type: Technical reference
guide_status: ready
guide_focus: Confirming a library supports your target before you depend on it
source_url: https://github.com/ohs-foundation
source_label: OHS Foundation on GitHub ↗
---

## Support matrix

The four repositories target different platform sets, so check this table before assuming the whole stack runs where your app does. A check means a published Maven Central artifact exists for that target, and a cross means none does.

| Target | FHIR | FHIRPath | Engine | Data Capture |
| --- | --- | --- | --- | --- |
| Android | ✓ | ✓ | ✓ | ✓ |
| JVM (desktop, server) | ✓ | ✓ | ✓ | ✓ |
| iOS device (`iosArm64`) | ✓ | ✓ | ✓ | ✓ |
| iOS simulator, Apple Silicon | ✓ | ✓ | ✓ | ✓ |
| iOS simulator, Intel (`iosX64`) | ✗ | ✗ | ✗ | ✓ |
| JS (browser) | ✓ | ✓ | ✓ | ✓ |
| Wasm JS (browser) | ✓ | ✓ | ✓ | ✓ |
| Wasm WASI | ✓ | ✓ | ✗ | ✗ |
| macOS (`macosArm64`) | ✓ | ✗ | ✗ | ✗ |
| Linux (`linuxX64`, `linuxArm64`) | ✓ | ✗ | ✗ | ✗ |

## Notes per library

### Kotlin FHIR

The widest matrix in the pillar. It is a pure data-model library with no I/O, so it also ships native macOS and Linux targets. There are no Intel Mac, watchOS, tvOS, or Windows-native targets. The JVM artifact of the current release candidate targets Java 21, so JVM consumers need a matching runtime.

### Kotlin FHIRPath

Adds a parser and evaluator on top of the model and covers the app-facing targets. Those are Android, JVM, both iOS ARM targets, JS, and both Wasm variants. The official FHIR test-suite conformance tests execute on JVM and Android, and the other targets run the unit-test suite.

### Kotlin FHIR Engine

Bounded by its storage layer. The engine persists with Room for Kotlin Multiplatform, and Room 3 publishes no `iosX64` artifacts, so the engine deliberately omits the Intel iOS simulator. Browser targets (JS and Wasm JS) work but need a documented project-level setup for the SQLite web worker. See [Run the engine in the browser](/fhir-foundations/kotlin-fhir-engine/web-targets/). Android requires minSdk 26.

### Kotlin FHIR Data Capture

The only repository in the pillar that ships `iosX64`, because Compose Multiplatform supports it. Wasm WASI is explicitly unsupported, since no UI toolkit exists there. Android requires minSdk 26.

## Reading the repositories

Each repository's README carries a per-artifact badge matrix that reflects exactly what is on Maven Central for the latest release. When this page and a repository disagree, the repository is right. Update this page via the normal documentation change process.
