---
title: Configure a screen from FHIR data
description: Change which FHIR fields a Player client screen renders, without modifying application code.
slug: /configure/screen-from-fhir-data/
sidebar_position: 10
guide_type: Configuration guide
guide_status: ready
guide_focus: Declarative client UI configuration
repository: player-client
---

## What you can change

Which FHIR fields a screen reads, how they are composed into view state, and which renderer options apply. None of it requires changing application code.

What you cannot change this way is how the view state is drawn. That needs a renderer, which is code. See [decide when code is necessary](/extend/decide/).

Read [the configuration model](/ohs-player/configuration-model/) first if the pieces below are unfamiliar.

## Where the configuration lives

Configuration ships with the reference application as FHIR `Binary` resources, under this path.

```
ohs-player-reference-app/src/commonMain/composeResources/files/
```

Three directories divide it by role.

| Directory | Holds |
| --- | --- |
| `states/` | `ViewDefinition` and `ViewJoinMap` resources |
| `configs/` | `ViewConfig` resources |
| `viewtypes/` | The `CodeSystem` of view types renderers register against |

## Change what a screen shows

**1. Project the fields.** Add or update a `ViewDefinition` in `states/`, for example [`Binary-PatientSummary.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/states/Binary-PatientSummary.json).

Each field is a column with a name, a FHIRPath expression that fills it, and a type. Here is one column, excerpted.

```json
{
  "name": "familyName",
  "path": "name.family.first()",
  "type": "http://hl7.org/fhir/StructureDefinition/string"
}
```

**2. Name the view state.** Add or update its `ViewJoinMap` in `states/`, which binds the named state to its pivot view. These are short enough to read whole. This is [`Binary-PatientSummaryState.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/states/Binary-PatientSummaryState.json) in full.

```json
{
  "resourceType": "http://ohs.dev/StructureDefinition/ViewJoinMap",
  "name": "patientSummary",
  "from": "root",
  "resource": "Patient",
  "view": "PatientSummary"
}
```

**3. Set renderer options.** Add or update a `ViewConfig` in `configs/`, such as [`Binary-PatientCardConfig.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/configs/Binary-PatientCardConfig.json).

**4. Build.** The `ig-codegen` Gradle plugin runs as part of compilation and generates the matching Kotlin state and configuration types. There is no separate generation step to remember.

```sh
./gradlew :ohs-player-reference-app:run
```

## How the application picks it up

The reference application loads configuration through `LocalConfigSource` and `ConfigStore`, then calls `GenericStateExtractor.extract<T>()` to turn a FHIR `SearchResult` into the generated state type.

You do not wire any of that per screen. Adding a field means updating the `ViewDefinition`, building, and using the regenerated field in the renderer that already draws that state.

## When a change needs a new view type

Introducing a genuinely new kind of presentation (not new fields, but a new way of drawing them) crosses into code.

1. Add a view type to [`viewtypes/CodeSystem-ViewTypes.json`](https://github.com/ohs-foundation/player-reference/blob/main/ohs-player-reference-app/src/commonMain/composeResources/files/viewtypes/CodeSystem-ViewTypes.json).
2. Build, so `ig-codegen` generates the matching `ViewTypeCS` entry.
3. Implement a `ComponentRenderer`, register it in the `ViewRegistry` under that view type, and render the state with `ListScaffold` or `DetailScaffold`.

Steps 1 and 2 are configuration, and step 3 is application code. [Decide when code is necessary](/extend/decide/) covers how to tell in advance which side of that line a change falls on.

## Expected result

Rebuild and the screen renders the fields you projected. If a field is missing, the usual cause is the FHIRPath expression rather than the wiring. A path that matches nothing yields an empty column rather than an error.

## Where to go next

[Decide when code is necessary](/extend/decide/) for changes that may need a renderer.

For renderer API detail use the [Player Client repository](https://github.com/ohs-foundation/player-client), and for the complete configuration definitions and examples use the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig).
