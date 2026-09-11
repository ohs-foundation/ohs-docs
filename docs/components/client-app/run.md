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

## Connect to the environment

The application signs in over OAuth 2.0 Authorization Code with PKCE against a public client, then syncs FHIR through the gateway carrying the session's bearer token.

Server and identity settings come from a `local.properties` file, which is git-ignored so each developer points at their own environment.

```sh
cp local.properties.sample local.properties
```

Set the four values that matter for a local environment.

| Key | Value for the reference environment |
| --- | --- |
| `OAUTH_ISSUER` | The identity realm, which for the reference environment is `ohs-player` |
| `OAUTH_CLIENT_ID` | The public client registered for this application |
| `OAUTH_SCOPES` | Leave the default, which includes `offline_access` for a refresh token |
| `FHIR_BASE_URL` | The gateway's FHIR base URL, so requests pass the access checks |

Point `FHIR_BASE_URL` at the gateway rather than the FHIR server directly. Sync carries the signed-in session's token, and the gateway is what validates it.

A Gradle task bakes these into generated configuration before Kotlin compilation, so **a change here needs a rebuild rather than a restart**. Every key has a working default, which means an absent file still builds and simply points the application at a provider that does not exist.

### Register the redirect URIs

Each platform uses its own redirect, and all of them must be registered on the client in the identity provider.

| Target | Redirect |
| --- | --- |
| Android and iOS | A custom-scheme deep link, built from `OAUTH_REDIRECT_SCHEME` and `OAUTH_REDIRECT_HOST` |
| Desktop | A loopback address on `OAUTH_DESKTOP_REDIRECT_PORT`, served for the duration of the flow |
| Web | The full page URL in `OAUTH_WEB_REDIRECT_URL`, which must be a path the server actually serves |

Changing the Android scheme or host also means editing the matching intent filter in `AndroidManifest.xml`, which hardcodes the pair.

The client must be **public with PKCE required**. There is deliberately no client secret, so do not add one.

The reference environment's realm import does not yet include a client for this application, so create one in the Keycloak console with the redirects above before signing in.

### Sign in and sync

Sign in as a health worker created in [the Web Portal](/components/web-portal/run/). Capture data, then find the same resources through the Portal's FHIR browser to confirm the round trip.

Filtering what a device receives by location, care team, and organisation is enforced by the gateway access checkers and is still in progress, so a signed-in user currently syncs the data the access rules allow rather than a scoped subset.

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
