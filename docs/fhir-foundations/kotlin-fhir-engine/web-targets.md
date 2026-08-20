---
title: Run the engine in the browser
description: What the JS and Wasm targets need, covering the SQLite web worker, OPFS storage, and cross-origin isolation headers.
slug: /fhir-foundations/kotlin-fhir-engine/web-targets/
sidebar_position: 50
guide_type: Setup guide
guide_status: ready
guide_focus: A browser app persisting FHIR data in OPFS
repository: kotlin-fhir-engine
---

## Goal and scope

The engine runs in the browser, in both the `js` and `wasmJs` Kotlin targets, with real SQLite persistence. Getting there requires project-level setup that the library cannot do for you, which this page walks through at the level of what and why. The repository README carries the exact current file contents to copy.

## How browser storage works

There is no filesystem in a browser tab, so the engine's SQLite database runs as WebAssembly inside a dedicated Web Worker, storing its file in the origin-private file system (OPFS). The engine wires this up itself. Its web database builder talks to the worker through a `WebWorkerSQLiteDriver`, so your code uses the same `FhirEngine` API as everywhere else. This design is why the engine uses Room 3 on all platforms. It is the Room generation with Wasm support.

## The cross-origin isolation requirement

SQLite's worker uses `SharedArrayBuffer`, which browsers only enable on cross-origin isolated pages. Your dev server and production host must send these two headers.

```text
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Without them the engine fails at startup in the browser regardless of anything else being correct. For local development the repository shows the webpack dev-server configuration that sets them.

## The worker module workaround

The SQLite worker is a *local* npm module inside the engine, and Gradle cannot propagate local npm modules to projects that consume `fhir-engine` from Maven. Without intervention, a `js` or `wasmJs` build fails with `Can't resolve 'sqlite-wasm-worker/worker.js'`. The fix is to copy the module's two files (`package.json` and `worker.js`) into your own project and declare a matching local `npm(...)` dependency on your web source set, so your build resolves the same specifier the engine's compiled code looks for. Follow the numbered steps in the [repository README](https://github.com/ohs-foundation/kotlin-fhir-engine#web-wasm) verbatim for your engine version. The demo app has the workaround wired up as a copy-pasteable reference, and this is the part of the setup most likely to change between alphas.

## What is different on web, operationally

- **Storage lives in OPFS**, scoped to the origin. Clearing site data deletes the database.
- **No background sync.** A tab that is closed runs nothing. Schedule sync as a foreground loop while the app is open, as described in [synchronization](/fhir-foundations/kotlin-fhir-engine/synchronization/).
- **Both web targets behave the same** at the API level. `js` and `wasmJs` differ in compilation, not in engine capability.

## Checkpoint

The demo app in the repository (`engine-app`) runs on the web target and is the fastest way to verify your environment. If it persists patients across a page reload in your browser, your headers and worker setup are correct, and your own project needs only the same configuration.
