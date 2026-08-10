---
title: Adapt UI configuration
description: Understand the Player client library and configuration implementation guide before adapting a client screen.
slug: /ohs-player/concepts/configuration/
sidebar_position: 2
guide_type: Concept
guide_status: Guidance available
guide_focus: Declarative client UI configuration
repository: player-client
---

## The two parts

The Player Client library renders healthcare UI from configuration rather than hand-written resource-to-screen mapping. The Player Configuration IG defines the FHIR resources and vocabulary used for that configuration.

## Configuration flow

1. Author a `ViewDefinition` that projects the FHIR fields needed by a screen.
2. Associate the resulting view state with a `ViewJoinMap`.
3. Declare renderer options through a `ViewConfig`.
4. Register a renderer for the resulting view type in the client.

The complete definitions and examples live in the [Player Client repository](https://github.com/ohs-foundation/player-client) and [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).

## Decide what to change

### Change declarative configuration

Change a `ViewDefinition`, `ViewJoinMap`, or `ViewConfig` when the existing application structure and renderer are suitable but the screen needs different FHIR fields, view-state composition, or renderer options.

### Add a renderer

Add and register a renderer when the application needs a new way to present an existing typed view state. The renderer is application code; its options can remain declarative through `ViewConfig`.

### Modify the reference application

Modify the reference application when its navigation, workflow, data source, or feature composition must change. Use configuration and renderers inside that application change where they remain the right boundary.

## Next step

Use the [Player Client repository](https://github.com/ohs-foundation/player-client) for renderer API detail and the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig) for the complete FHIR definitions and examples.
