---
title: How Player uses OHS components
description: The foundational components Player is built on, and what Player adds on top of them.
slug: /concepts/how-player-uses-ohs-components/
sidebar_position: 10
guide_type: Concept
guide_status: ready
guide_focus: Player repository responsibilities
repository: ohs-player
---

## The boundary

The Open Health Stack provides building blocks. They exist independently of Player, are useful without it, and are maintained on their own.

Player is the composition. It does not reimplement the building blocks — it assembles them, adds what a working implementation needs beyond them, and shows the result running.

Keeping that boundary clear matters when something needs changing, because it tells you which repository owns the answer. The Foundation site owns the component catalogue and their maturity. This site owns how Player uses them.

## What Player is built on

Almost everything Player does, a foundational component does the work for.

| Foundational component | What it provides | Used by |
| --- | --- | --- |
| [`kotlin-fhir`](https://github.com/ohs-foundation/kotlin-fhir) | The FHIR data model as Kotlin types | Client App |
| [`kotlin-fhirpath`](https://github.com/ohs-foundation/kotlin-fhirpath) | FHIRPath evaluation over that model | Client App |
| [`kotlin-fhir-engine`](https://github.com/ohs-foundation/kotlin-fhir-engine) | On-device storage, search, and sync | Client App |
| [`kotlin-fhir-data-capture`](https://github.com/ohs-foundation/kotlin-fhir-data-capture) | Questionnaire rendering and extraction | Client App |
| [FHIR Gateway](https://github.com/ohs-foundation/fhir-gateway) | Authentication, access control, and a host for custom endpoints | Reference Backend |
| [FHIR Data Pipes](https://github.com/ohs-foundation/fhir-data-pipes) | Transforming FHIR into tabular data for reporting | Reference Analytics |

The four Kotlin libraries are the Multiplatform generation of the Open Health Stack's mobile libraries, which is what lets one Client App source tree target Android, iOS, desktop, and the browser.

## What Player adds

| Player material | What it adds |
| --- | --- |
| [Player Client](https://github.com/ohs-foundation/player-client) | Renders healthcare screens from declarative configuration rather than hand-written mapping code |
| [Configuration IG](/concepts/configuration-ig/) | The FHIR vocabulary that configuration is written in |
| Reference Backend | Player endpoints and access rules, loaded into the gateway |
| Reference Analytics | ViewDefinitions, indicator queries, and a reference dashboard |
| Reference Infrastructure | The deployment material that runs all of it together |

Read down that list and the pattern is consistent: each entry is configuration, composition, or packaging. None of it reimplements a building block.

## Choose the right documentation

- Use this site for a Player setup, a cross-repository dependency, or a Player-specific configuration outcome.
- Use the owning component repository for its API, releases, build system, and contribution instructions.
- Use the [Foundation projects page](https://ohs.foundation/projects) to discover the wider component catalogue and check maturity.

## Next step

[What each piece does](/components/) maps every capability to the Player component that provides it and the foundational component underneath.
