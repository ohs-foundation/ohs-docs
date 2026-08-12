---
title: The Configuration IG
description: The FHIR implementation guide that defines Player's UI configuration contract.
slug: /concepts/configuration-ig/
sidebar_position: 40
guide_type: Concept
guide_status: ready
guide_focus: The configuration contract and how it reaches the app
repository: configuration-ig
---

## Configuration that is FHIR

Most configurable applications invent a configuration format. Player does not. Its configuration is FHIR, published as an **implementation guide** — a versioned set of FHIR definitions and rules.

The guide describes *what* to show: which resources to project into rows, how to combine them, which component renders each row, and how that component is configured. Any implementation that honours these artifacts satisfies the contract — nothing in the guide is specific to one application's code.

That choice has consequences worth understanding before the detail:

- The configuration is **portable**. Another FHIR-native tool can read the same artifacts.
- It is **versionable and publishable**, because an implementation guide is a canonical artifact rather than a file in a repository.
- It is **inspectable**. There is no proprietary schema to reverse-engineer.

Say *FHIR IG*, not *config file*. The distinction is the whole argument.

## Blueprint and runtime

The most important idea in the guide is that it operates on two levels, and confusing them is the usual source of trouble.

**Blueprint** is what the guide itself defines: the `ViewJoinMap` and `ViewConfig` logical models, and the `SearchScope` vocabulary. These are the shapes an author writes against, and they change rarely.

**Runtime configuration** is *instances* of those models — your actual screens. These are your content, not the guide's. The guide ships only examples of them.

A runtime artifact declares its kind through its top-level `resourceType`, set to the canonical URL of the blueprint it instantiates. That is how a Player tells a ViewDefinition from a ViewJoinMap from a ViewConfig without inspecting its contents.

## What the guide borrows

`ViewDefinition` is **not** defined here. It comes from [SQL-on-FHIR v2](https://sql-on-fhir.org/ig/), and this guide is a consumer of that specification rather than a redefinition of it.

Player supports the full projection surface: `where`, `forEach`, `forEachOrNull`, `unionAll`, nested `select`, constants, collection columns, and all FHIR primitive column types.

This is the same artifact the analytics pipeline uses to flatten FHIR into reporting tables. One specification, two destinations.

## What the guide defines

### ViewJoinMap

A `ViewDefinition` projects one resource type. Real screens need several — a patient with their allergies, a household with its members. `ViewJoinMap` stitches them into a single flat row.

| Field | Cardinality | Meaning |
| --- | --- | --- |
| `name` | 1..1 | The output key in the assembled row |
| `from` | 1..1 | Which search scope holds the pivot resource |
| `resource` | 1..1 | The pivot's FHIR resource type |
| `view` | 1..1 | The ViewDefinition applied to each pivot resource |
| `searchParam` | 0..1 | Disambiguates same-type included resources |
| `joins` | 0..* | Additional views whose columns merge into the row |

Each entry in `joins` carries its own `view`, `from`, `resource`, optional `searchParam`, and a `matchKey` — the column in the pivot view used as a foreign key to locate the joined resource.

Two rules govern the result. **The pivot drives row count**: one row per pivot instance, with joins appending columns rather than multiplying rows. And **column names must be unique** across the pivot and every join, because the output is a flat merge.

### SearchScope

`from` refers to where in a FHIR search response a resource appears:

| Code | Meaning |
| --- | --- |
| `root` | The primary resource the query returned |
| `included` | Returned via `_include` |
| `revIncluded` | Returned via `_revinclude` |

So a join is not a database join. It is a statement about the shape of a FHIR search response, which is why a `ViewJoinMap` and the query that feeds it have to agree.

### ViewConfig

`ViewConfig` is a contract for declaring a configuration, not a fixed set of fields. It is **self-describing**: a config lists its own properties, each with a `name`, a `type`, and a default `value`.

| Field | Cardinality | Meaning |
| --- | --- | --- |
| `viewType` | 1..1 | The view type this config parameterises |
| `property` | 0..* | One configuration field: `name`, `type`, `value[x]` |

A Player generates a typed configuration class from the property list and binds the values to the renderer selected by `viewType`. That is why adding a configurable option is a configuration change rather than a schema change — the guide never has to enumerate anyone's fields.

### View types are yours

The guide ships a view-type CodeSystem, but it is **an example**. View types are implementer-defined: a Player provides its own CodeSystem, and its ViewConfigs bind to those codes. Mapping a code to a concrete renderer is the implementation's own business.

This matters when planning. Your view-type vocabulary is part of your configuration, not something inherited.

## How configuration reaches an application

Runtime configuration is delivered to a Player at startup. It can be bundled with the application, seeded into a database, or fetched from a server — the guide does not mandate one.

The reference application bundles it, which is the simplest arrangement to inspect. [Configure a screen from FHIR data](/configure/screen-from-fhir-data/) shows where those files live and what changing one involves.

## Because the app is multiplatform, so is the configuration

One guide configures Android, iOS, desktop, and the browser at once. There is no per-platform configuration layer, because the library consuming it is itself a single Kotlin Multiplatform source tree.

## Source

The [Player Configuration IG repository](https://github.com/ohs-foundation/player-reference-ig) owns the logical models, the vocabularies, and the examples. It is published against FHIR R4 under the canonical `http://ohs.dev`, and depends on the SQL-on-FHIR package for ViewDefinition.

The [Player Client repository](https://github.com/ohs-foundation/player-client) owns the library that consumes these artifacts and documents its extraction and rendering interfaces.

## Where to go next

[The configuration model](/concepts/configuration-model/) sets these artifacts alongside the other configurable surfaces and shows where the boundary with code falls.

[The Client App](/components/client-app/) is the application this configuration drives.
