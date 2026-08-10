---
title: The configuration model
description: How the Player client library and the configuration implementation guide work together to render a screen.
slug: /concepts/configuration-model/
sidebar_position: 20
guide_type: Concept
guide_status: ready
guide_focus: Declarative client UI configuration
repository: player-client
---

## The two parts

The Player Client library renders healthcare UI from configuration rather than hand-written resource-to-screen mapping. The Player Configuration IG defines the FHIR resources and vocabulary used for that configuration.

Separating them is what makes a screen changeable without touching application code: the library knows how to render a typed view state, and the implementation guide describes which FHIR data becomes that state.

## How a screen is composed

A screen is assembled from three declarative pieces and one piece of application code.

| Piece | What it decides |
| --- | --- |
| `ViewDefinition` | Which FHIR fields are projected into view state |
| `ViewJoinMap` | How those fields are named and composed into a view state |
| `ViewConfig` | Which renderer options apply |
| Renderer | How the resulting view state is drawn |

The first three are configuration. Only the renderer is code, and it is registered against a view type rather than against a screen, so one renderer serves every screen that produces the same view state.

The complete definitions and examples live in the [Player Client repository](https://github.com/ohs-foundation/player-client) and the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).

## Where to go next

To change what a screen shows, follow [Configure a screen from FHIR data](/configure/screen-from-fhir-data/).

To work out whether your change belongs in configuration, a renderer, or the application itself, read [Decide when code is necessary](/extend/decide/).
