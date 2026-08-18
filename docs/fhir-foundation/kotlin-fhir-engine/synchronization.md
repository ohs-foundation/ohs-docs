---
title: Synchronize with a FHIR server
description: The two-phase sync model, the FhirSyncTask contract, and how each platform schedules it.
slug: /fhir-foundation/kotlin-fhir-engine/synchronization/
sidebar_position: 40
guide_type: Usage guide
guide_status: ready
guide_focus: Reliable bidirectional sync between device and server
repository: kotlin-fhir-engine
---

## Goal and scope

Wire the engine to a remote FHIR server so device and server converge. Sync requires a `ServerConfiguration` in the engine's initialization — without it, running sync raises an error telling you exactly that.

## The model: download, then upload

A sync cycle has two phases. **Download** fetches server changes: your download policy decides what to request, and a conflict resolver decides what happens when a downloaded resource collides with a local edit. **Upload** replays the engine's `LocalChange` log — every offline create, update, and delete — to the server, shaped by an upload strategy.

You express a sync job by implementing one interface:

```kotlin
interface FhirSyncTask {
  fun getFhirEngine(): FhirEngine
  fun getDownloadWorkManager(): DownloadWorkManager
  fun getConflictResolver(): ConflictResolver
  fun getUploadStrategy(): UploadStrategy
}
```

and executing it with the `runSync(taskName, onProgress)` extension, which runs a full cycle and returns the terminal `SyncJobStatus`. Progress statuses stream through `onProgress` along the way, and the terminal status of a named task is persisted so the app can show "last synced" honestly.

## The three decisions you own

- **`DownloadWorkManager`** — what to fetch. This is an interface, not a default, because download scope is an application decision: per-patient, per-region, since-last-sync. The library ships `ResourceParamsBasedDownloadWorkManager` for parameter-driven downloads, and the demo app contains a timestamp-based implementation to copy from.
- **`ConflictResolver`** — who wins when the server and the device both changed a resource. Two policies ship: `AcceptLocalConflictResolver` and `AcceptRemoteConflictResolver`.
- **`UploadStrategy`** — how local changes become requests: bundled transactions or individual requests, patches or full resources, squashed or per-change. Built via `UploadStrategy.forBundleRequest(...)` and its URL-request counterparts. Not every combination is implemented — the factory raises on unsupported ones (for example, bundled `PUT` updates and unsquashed changes are rejected).

## Scheduling per platform

The engine executes sync; each platform brings its own timer.

- **Android** is first-class: extend `FhirSyncWorker` (a WorkManager `CoroutineWorker` that implements `FhirSyncTask`), then schedule with the `Sync` object — `Sync.oneTimeSync<MyWorker>()`, `Sync.periodicSync<MyWorker>(...)` with constraints and retry configuration, `cancelOneTimeSync`/`cancelPeriodicSync`, and `getWorkerInfo` for observing status. Sync then runs under WorkManager's guarantees, including while the app is backgrounded.
- **iOS**: register a `BGTaskScheduler` background task and call your task's `runSync()` when it fires. The demo app's iOS source and its README document the `Info.plist` entries and the simulator tricks for triggering background tasks.
- **Desktop and web**: no OS scheduler exists, so the app invokes `runSync()` itself — typically a coroutine loop while the process or tab is alive. Sync stops when the process does.

## Observing sync

`SyncJobStatus` models the lifecycle: started, in-progress with phase and counts, succeeded, or failed. On Android, `getWorkerInfo` exposes the same through WorkManager; elsewhere your `onProgress` callback is the feed. Design the UI around the persisted terminal status rather than assuming a sync happened recently — on every platform except Android, nothing runs unless the app is running.

## Checkpoint

After a successful cycle against a test server: resources created on the device appear on the server, server-side edits appear locally, and the terminal status is a success carrying the completion timestamp. A failure status with an HTTP error points at server configuration; an immediate `IllegalStateException` means `ServerConfiguration` was not set at init.

## Next step

Browser targets add one build-level requirement to all of this — [run the engine in the browser](/fhir-foundation/kotlin-fhir-engine/web-targets/).
