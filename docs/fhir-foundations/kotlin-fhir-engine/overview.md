---
title: Kotlin FHIR Engine
description: On-device FHIR R4 persistence, type-safe search, and synchronization with remote FHIR servers, for offline-capable apps.
slug: /fhir-foundations/kotlin-fhir-engine/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: Offline-first FHIR storage and sync in a multiplatform app
repository: kotlin-fhir-engine
---

## What it is

Kotlin FHIR Engine is the storage-and-sync layer of the FHIR Foundations stack. It is a Kotlin Multiplatform SDK for building offline-capable healthcare applications on FHIR R4. It persists resources on the device, indexes them for typed search, records local edits as a change log, and synchronizes both directions with a remote FHIR server.

It is the Kotlin Multiplatform successor to the engine from the Android FHIR SDK, and the same programming model now runs on Android, iOS, desktop JVM, and the browser.

## What you get

- **Persistence** backed by Room for Kotlin Multiplatform over SQLite. Resources are stored alongside typed index tables (string, token, date, number, quantity, reference, URI, position), populated by evaluating each resource's search-parameter FHIRPath expressions with [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/).
- **A type-safe search DSL.** `engine.search<Patient> { ... }` takes filters and sorting with typed parameter classes per FHIR search type, plus nested searches, includes, reverse includes, and counts.
- **An offline change log.** Local creates, updates, and deletes are captured as `LocalChange` records that upload replays later.
- **Two-phase synchronization**, download then upload, with pluggable conflict resolution (`AcceptLocalConflictResolver` and `AcceptRemoteConflictResolver`), configurable upload strategies (transaction bundles or per-resource requests, patch or full-resource), and first-class WorkManager scheduling on Android.
- **A working demo app** (`engine-app` in the repository). It is a Compose Multiplatform patient-list application for Android, iOS, desktop, and web that exercises storage, search, and per-platform sync scheduling.

## API shape at a glance

Call `FhirEngineProvider.init(configuration, context)` once at startup and `FhirEngineProvider.getInstance(context)` for the `FhirEngine`, then use `create`, `get`, `update`, `delete`, and `search`. Sync is expressed as a `FhirSyncTask` your app schedules per platform. The engine's method signatures use the R4 types from [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) directly, so your app depends on `fhir-model-r4` as well.

## What it is not

- **Not encrypted storage.** Data at rest is unencrypted. Setting `enableEncryptionIfSupported = true` throws `IllegalArgumentException`. The flag exists to preserve call sites for when encryption is implemented.
- **Not a scheduler outside Android.** Android gets WorkManager integration (`FhirSyncWorker`, one-time and periodic sync). On iOS you schedule via `BGTaskScheduler`, and on desktop and web your app decides when to run sync. The library supplies the sync execution, not the timer.
- **Not a complete download policy.** What to fetch from the server is your decision. You implement `DownloadWorkManager` (or use the shipped resource-parameters-based one) rather than inheriting a default.
- **R4 only.** No R4B or R5.
- **Search coverage is bounded by FHIRPath support.** Search parameters whose expressions the FHIRPath engine cannot evaluate are skipped during indexing, so some standard parameters are not queryable.
- The `syncUpload` and `syncDownload` methods on `FhirEngine` are marked for deprecation. Schedule sync through `FhirSyncTask` instead.

## Next step

[Get the engine running](/fhir-foundations/kotlin-fhir-engine/get-started/) with the dependency, initialization, and a first stored resource.
