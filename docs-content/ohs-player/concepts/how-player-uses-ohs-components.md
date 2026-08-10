---
title: How Player uses OHS components
description: The dependency relationships that matter when evaluating and adapting OHS Player.
slug: /ohs-player/concepts/how-player-uses-ohs-components/
sidebar_position: 1
guide_type: Concept
guide_status: Guidance available
guide_focus: Player repository responsibilities
repository: ohs-player
---

## The boundary

The Foundation site owns the broad OHS component catalogue. Player owns the reference composition: which Player repository uses a component, for which implementation concern, and where to find the source.

## Player-owned relationships

| Player material | Relationship | Go to source |
| --- | --- | --- |
| Client App and Player Client | Kotlin Multiplatform UI built from declarative FHIR data projections and renderers. | [Player Client](https://github.com/ohs-foundation/player-client) |
| Player Configuration IG | Defines the UI configuration resources consumed by Player clients. | [Configuration IG](https://github.com/ohs-foundation/player-reference-ig) |
| Reference Backend | Adds custom endpoints and access-checker plugins to FHIR Gateway. | [FHIR Gateway](https://github.com/ohs-foundation/fhir-gateway) |
| Reference Analytics | Uses FHIR Data Pipes to transform Player FHIR data for PostgreSQL and Superset. | [FHIR Data Pipes](https://github.com/ohs-foundation/fhir-data-pipes) |

## Choose the right documentation

- Use this site for a Player setup, cross-repository dependency, or Player-specific configuration outcome.
- Use the owning component repository for its API, releases, build system, and contribution instructions.
- Use the [Foundation Projects page](https://ohs.foundation/projects) to discover the wider OHS component catalogue.

## Next step

[Follow the setup sequence](/ohs-player/setups/) to see where these relationships appear in an implementation path.
