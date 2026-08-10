---
title: Configure a screen from FHIR data
description: Change which FHIR fields a Player client screen renders, without modifying application code.
slug: /configure/screen-from-fhir-data/
sidebar_position: 10
guide_type: Configuration guide
guide_status: partial
guide_focus: Declarative client UI configuration
repository: player-client
---

## What you can change

Which FHIR fields a screen reads, how they are composed into view state, and which renderer options apply. None of this requires changing application code.

What you cannot change this way is how the view state is drawn. That needs a renderer, which is code — see [Decide when code is necessary](/extend/decide/).

Read [the configuration model](/concepts/configuration-model/) first if the pieces below are unfamiliar.

## The steps

1. Author a `ViewDefinition` that projects the FHIR fields the screen needs.
2. Associate the resulting view state with a `ViewJoinMap`.
3. Declare renderer options through a `ViewConfig`.
4. Register a renderer for the resulting view type in the client.

## Where the definitions live

The configuration artifacts and their schemas are maintained in the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig). Renderer registration and the client-side API are in the [Player Client repository](https://github.com/ohs-foundation/player-client).

## Where to go next

For renderer API detail, use the [Player Client repository](https://github.com/ohs-foundation/player-client). For the complete FHIR definitions and examples, use the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).
