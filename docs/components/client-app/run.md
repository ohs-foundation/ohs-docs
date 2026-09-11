---
title: Run the Client App
description: Build and run the Kotlin Multiplatform OHS Player reference client.
slug: /components/client-app/run/
sidebar_position: 20
guide_type: Setup guide
guide_status: partial
guide_focus: Kotlin Multiplatform client application
repository: client-app
---

## About the Client App

The Client App is the Kotlin Multiplatform and Compose Multiplatform end-user reference application for Android, iOS, JVM desktop, JavaScript browser, and Wasm browser. It demonstrates how the reusable Player Client library renders healthcare UI from declarative FHIR configuration. FHIR search results become typed view state, then registered renderers display that state.

This guide is step 4 of the [get started sequence](/get-started/) for a usable integrated workflow. First prepare the shared Player environment, load the backend extensions, and use the [Web Portal](/components/web-portal/run/) to administer it, then evaluate the Client App in that prepared environment.

## Before you begin

You need JDK 21. Android builds also need the Android SDK, and iOS builds need Xcode on macOS.

## Build the client

Clone the repository, enter its root directory, then run the Gradle build.

```sh
git clone https://github.com/ohs-foundation/player-reference.git
cd player-reference
./gradlew build
```

## Run the default target

Run the JVM desktop target for the first local Client App check.

```sh
./gradlew :ohs-player-reference-app:run
```

The desktop application opens and renders the reference healthcare screens from its configured FHIR view state. Continue with the remaining targets when the desktop run meets the needs of the implementation.

## What the application does today

The reference application runs entirely on the device. It initialises its FHIR store with local storage, renders screens from the configuration bundled with it, and captures data through Structured Data Capture forms into that local store.

It does not yet point at a FHIR server. There is no server configuration, no sign-in, and no synchronisation in the reference application, so what you capture stays on the device you captured it on.

Synchronisation exists in the `kotlin-fhir-engine` library beneath it, and the application now integrates that engine. Wiring the application to an environment, with sign-in against identity and sync through the gateway, is the next step in the client workstream.

That means this guide stops at a running application rather than a connected one. [Set up the environment](/components/reference-infrastructure/) and [run the Web Portal](/components/web-portal/run/) give you the server side of the reference, and the two meet once the application carries its server configuration.

## Run another target

| Target | Repository command or action |
| --- | --- |
| Android | `./gradlew :ohs-player-reference-app:assembleDebug` builds the debug APK. Install and run it with an Android development environment. |
| Web (Wasm) | `./gradlew :ohs-player-reference-app:wasmJsBrowserDevelopmentRun` |
| Web (JS) | `./gradlew :ohs-player-reference-app:jsBrowserDevelopmentRun` |
| iOS | Open `iosApp/` in Xcode and run it. |

## Change what a screen shows

The reference client renders typed view state rather than mapping FHIR resources in a screen, so changing a screen usually means changing configuration and rebuilding, not editing application code.

Configuration ships with the application as FHIR resources under `ohs-player-reference-app/src/commonMain/composeResources/files/`, divided into `states/`, `configs/`, and `viewtypes/`. The `ig-codegen` Gradle plugin turns them into Kotlin types during compilation, so a rebuild is the only step after an edit.

[Configure a screen from FHIR data](/configure/screen-from-fhir-data/) walks through a change with worked examples, and [decide when code is necessary](/extend/decide/) covers when a change needs a renderer instead.

## Expected result

The JVM Desktop command opens the Client App window and renders the reference healthcare screens from configured FHIR view state. That completes the local Client App check. In the integrated workflow, continue after the shared Player environment and Portal administration are ready.

## Package for distribution

Build a local package when the application needs to be distributed beyond development.

| Output | Command |
| --- | --- |
| macOS installer | `./gradlew :ohs-player-reference-app:packageDmg` |
| Windows installer | `./gradlew :ohs-player-reference-app:packageMsi` |
| Linux package | `./gradlew :ohs-player-reference-app:packageDeb` |
| Portable application | `./gradlew :ohs-player-reference-app:createDistributable` |
| Web bundle | `./gradlew :ohs-player-reference-app:wasmJsBrowserDistribution` |

Use the [Client App deployment documentation](https://github.com/ohs-foundation/player-reference#deployment) for release-pipeline and signing detail.

## Next step

[Decide when code is necessary](/extend/decide/) to work out whether the next change belongs in configuration, a renderer, or the application. For renderer API detail and FHIR configuration examples, use the [Player Client repository](https://github.com/ohs-foundation/player-client) and [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).
