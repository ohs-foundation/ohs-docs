---
title: Client App
description: The Kotlin Multiplatform application for frontline health workers, and the libraries it is built from.
slug: /components/client-app/
sidebar_position: 10
guide_type: Component overview
guide_status: partial
guide_focus: Kotlin Multiplatform client application
repository: client-app
---

## What it is

The Client App is the end-user application in the reference set, the one a frontline health worker actually opens. One Kotlin source tree builds it for Android, iOS, desktop, and the browser, using Compose Multiplatform for the interface.

It is the component most of the Open Health Stack converges on, and the one an implementing team is most likely to carry forward as the basis of their own application.

## What it offers

**Offline-first data capture.** The app holds FHIR resources in an on-device database and works without connectivity, because community health work happens where connectivity does not reach. It syncs with the FHIR server through the gateway when a connection is available.

**Forms driven by FHIR.** Data capture is FHIR Structured Data Capture. A `Questionnaire` describes the form, its validation, and its expressions, and the answers are extracted back into FHIR resources.

**Screens driven by configuration.** FHIR search results are projected into typed view state by declarative ViewDefinitions, and registered renderers draw that state. Adding a field to a screen is a configuration change, not new mapping code.

**One source tree, four platforms.** Android, iOS, desktop, and browser builds come from the same code and the same configuration.

## The libraries underneath

The app is an assembly of the OHS foundational libraries rather than a monolith. This is the clearest illustration of what Pillar 1 gives Pillar 2.

![The FHIR Foundations stack showing how Kotlin Multiplatform SDKs (Data Capture and Engine) layer over Kotlin FHIRPath and Kotlin FHIR models.](../../images/fhir-foundations-architecture.svg)

| Library | What it provides |
| --- | --- |
| [`kotlin-fhir`](https://github.com/ohs-foundation/kotlin-fhir) | The FHIR data model as Kotlin types |
| [`kotlin-fhirpath`](https://github.com/ohs-foundation/kotlin-fhirpath) | FHIRPath evaluation, used by projections and form expressions |
| [`kotlin-fhir-engine`](https://github.com/ohs-foundation/kotlin-fhir-engine) | On-device storage, search, and sync with a FHIR server |
| [`kotlin-fhir-data-capture`](https://github.com/ohs-foundation/kotlin-fhir-data-capture) | Questionnaire rendering and extraction |

These are the Kotlin Multiplatform generation of the libraries, which is what lets one application target four platforms. They are also earlier in their release cycle than the Android-only generation they replace. [What you can do today](/ohs-player/what-you-can-do-today/) sets out what that means.

Between the libraries and the application sits [Player Client](https://github.com/ohs-foundation/player-client), the library that turns configuration into screens, and the [Configuration IG](/ohs-player/configuration-ig/), which is the configuration it reads.

## What it is not

Not a finished product. Its screens, forms, and content are a reference composition meant to be replaced. The repository is published as a template so a programme can start its own application from it.

## Where to start

[Run the Client App](/components/client-app/run/) builds it and opens the desktop target, which is the fastest path because it needs only a JDK.

To change what a screen shows, [configure a screen from FHIR data](/configure/screen-from-fhir-data/). To work out whether a change needs code at all, read [decide when code is necessary](/extend/decide/).

## Source and releases

The [player-reference repository](https://github.com/ohs-foundation/player-reference) owns the application, its build commands per platform, and its release pipeline. Every platform is built, tested, and released from CI there.
