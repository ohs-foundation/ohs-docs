---
title: Decide when code is necessary
description: Choose between changing declarative configuration, adding a renderer, and modifying the reference application.
slug: /extend/decide/
sidebar_position: 10
guide_type: Concept
guide_status: partial
guide_focus: Choosing an adaptation route
repository: player-client
---

## Three routes

Player is a starting point for adaptation, and most adaptations have an obvious home. These are the three, in increasing order of cost to maintain.

## Change declarative configuration

Change a `ViewDefinition`, `ViewJoinMap`, or `ViewConfig` when the existing application structure and renderer are suitable but the screen needs different FHIR fields, view-state composition, or renderer options.

This is the cheapest route and the one to exhaust first. Follow [Configure a screen from FHIR data](/configure/screen-from-fhir-data/).

## Add a renderer

Add and register a renderer when the application needs a new way to present an existing typed view state. The renderer is application code, but its options can remain declarative through `ViewConfig`, so the screens that use it stay configurable.

## Modify the reference application

Modify the reference application when its navigation, workflow, data source, or feature composition must change. Use configuration and renderers inside that change wherever they remain the right boundary — modifying the application does not mean abandoning the configuration model.

## Where to go next

For backend rather than client behaviour, see [Add backend extensions](/extend/backend-extensions/).

Renderer API detail is in the [Player Client repository](https://github.com/ohs-foundation/player-client); the configuration vocabulary is in the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).
