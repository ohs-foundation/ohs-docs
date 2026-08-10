---
title: Client App
description: The Kotlin Multiplatform reference application that renders healthcare screens from FHIR configuration.
slug: /components/client-app/
sidebar_position: 10
guide_type: Component overview
guide_status: partial
guide_focus: Kotlin Multiplatform client application
repository: client-app
---

## What it is

The Player Reference Client App is the end-user application in the reference set. One Kotlin source tree builds for Android, iOS, desktop, and the browser, using Compose Multiplatform for the interface.

## What it demonstrates

That healthcare screens can be driven by configuration rather than written by hand. FHIR search results are projected into typed view state by declarative ViewDefinitions, and registered renderers draw that state. Adding a field to a screen is a configuration change and a rebuild, not new mapping code.

This is the pattern an implementation team is most likely to adopt from Player, because it is what makes a programme-specific client cheap to maintain.

## When to use it

Use it to evaluate what a Player-based client feels like, and as the starting point for a programme's own application. It runs standalone against local data, so you can see it working before any shared environment exists.

It is not a finished product. Its screens, workflows, and content are a reference composition meant to be replaced with your own.

## What it needs

| Depends on | Required or optional | Notes |
| --- | --- | --- |
| JDK 21 | Required | Needed for every target |
| Android SDK | For Android builds | Android Studio supplies it |
| Xcode on macOS | For iOS builds | — |
| A shared Player environment | Optional | Only for the connected reference flow |
| [Player Client](https://github.com/ohs-foundation/player-client) | Required | The library that renders configuration |
| [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig) | Required | The vocabulary configuration is written in |

## Where to start

[Run the Client App](/components/client-app/run/) builds it and opens the desktop target, which is the fastest path — it needs only a JDK.

To change what a screen shows, [Configure a screen from FHIR data](/configure/screen-from-fhir-data/). To work out whether a change needs code at all, read [Decide when code is necessary](/extend/decide/).

## Source and releases

The [player-reference repository](https://github.com/ohs-foundation/player-reference) owns the application, its build commands per platform, and its release pipeline. Every platform is built, tested, and released from CI there.
