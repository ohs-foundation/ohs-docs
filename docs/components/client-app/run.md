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

This guide is step 3 of the [get started sequence](/get-started/) for a usable integrated workflow. First prepare the shared Player environment and use the [Web Portal](/components/web-portal/run/) to administer it, then evaluate the Client App in that prepared environment.

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

## Connect to the shared Player environment

The application signs in against the identity service in your environment and syncs FHIR data through the gateway, so it needs three things from the earlier stages.

- the **gateway base URL**, from [set up the environment](/components/reference-infrastructure/)
- the **identity issuer** (the realm the environment publishes) and a client for the application
- a **health worker account** created in [the Web Portal](/components/web-portal/run/), to sign in as

Point the application at those values and sign in. Data captured on the device is held locally and synced through the gateway to the FHIR server, which is what makes the round trip observable. Register a household on the app, then find the same resources through the Portal's FHIR browser.

The [player-reference repository](https://github.com/ohs-foundation/player-reference) states which setting carries each value for the target you are building.

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
