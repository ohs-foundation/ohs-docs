---
title: Run the Client App
description: Build and run the Kotlin Multiplatform OHS Player reference client.
slug: /setups/client-app/
sidebar_position: 2
guide_type: Setup guide
guide_status: Guidance available
guide_focus: Kotlin Multiplatform client application
repository: client-app
---

## About the Client App

The Client App is the Kotlin Multiplatform and Compose Multiplatform end-user reference application for Android, iOS, JVM desktop, JavaScript browser, and Wasm browser. It demonstrates how the reusable Player Client library renders healthcare UI from declarative FHIR configuration: FHIR search results become typed view state, then registered renderers display that state.

This guide is step 3 of the [quick start](/setups/) for a usable integrated workflow: first prepare the shared Player environment and use the [Web Portal](/setups/web-portal/) to administer it, then evaluate the Client App in that prepared environment.

## Before you begin

You need JDK 21. Android builds also need the Android SDK; iOS builds need Xcode on macOS.

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

This documentation will add connection guidance for the Client App and shared Player environment when source-backed setup material is published.

## Run another target

| Target | Repository command or action |
| --- | --- |
| Android | `./gradlew :ohs-player-reference-app:assembleDebug` builds the debug APK. Install and run it with an Android development environment. |
| Web (Wasm) | `./gradlew :ohs-player-reference-app:wasmJsBrowserDevelopmentRun` |
| Web (JS) | `./gradlew :ohs-player-reference-app:jsBrowserDevelopmentRun` |
| iOS | Open `iosApp/` in Xcode and run it. |

## Configure a screen from FHIR data

The reference client renders typed view state rather than mapping raw FHIR resources directly in a screen. Start in `ohs-player-reference-app/src/commonMain/composeResources/files/`:

For a configuration-only change:

1. Add or update a `ViewDefinition` in `states/`, such as [`Binary-PatientSummary.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/states/Binary-PatientSummary.json), to define the fields and FHIRPath expressions a screen needs.
2. Add or update its `ViewJoinMap` in `states/`, such as [`Binary-PatientSummaryState.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/states/Binary-PatientSummaryState.json), to name the view state and bind it to its pivot view.
3. Add or update a `ViewConfig` in `configs/`, such as [`Binary-PatientCardConfig.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/configs/Binary-PatientCardConfig.json), to set the renderer options.
4. Build the app. The `ig-codegen` Gradle plugin runs as part of compilation and generates the corresponding Kotlin state and configuration types.

A `ViewDefinition` declares each field as a column with a name and the FHIRPath expression that fills it. This is one column excerpted from `Binary-PatientSummary.json`:

```json
{
  "name": "familyName",
  "path": "name.family.first()",
  "type": "http://hl7.org/fhir/StructureDefinition/string"
}
```

A `ViewJoinMap` is short enough to read whole. This is `Binary-PatientSummaryState.json` in full, where `from`, `resource`, and `view` bind the named view state to its pivot view:

```json
{
  "resourceType": "http://ohs.dev/StructureDefinition/ViewJoinMap",
  "name": "patientSummary",
  "from": "root",
  "resource": "Patient",
  "view": "PatientSummary"
}
```

Adding a new renderer also requires Kotlin application code:

1. Add a view type to [`viewtypes/CodeSystem-ViewTypes.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/viewtypes/CodeSystem-ViewTypes.json) when the renderer introduces a new view type.
2. Build the app after changing the CodeSystem so `ig-codegen` generates the corresponding `ViewTypeCS` entry.
3. Implement a `ComponentRenderer`, register it in `ViewRegistry` under the generated view type, and render the state with `ListScaffold` or `DetailScaffold`.

The reference application already loads configuration through `LocalConfigSource` and `ConfigStore`, then uses `GenericStateExtractor.extract<T>()` to turn a FHIR `SearchResult` into the generated state type.

To add a field, update the `ViewDefinition`, build again, then use the regenerated field in the renderer. Read [Adapt UI configuration](/concepts/configuration/) before deciding whether the change belongs in declarative configuration, a renderer, or the reference application.

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

[Adapt UI configuration](/concepts/configuration/) to decide whether the next change belongs in configuration, a renderer, or the application. For renderer API detail and FHIR configuration examples, use the [Player Client repository](https://github.com/ohs-foundation/player-client) and [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).
