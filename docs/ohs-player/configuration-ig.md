---
id: configuration-ig
title: The Configuration IG
description: The FHIR implementation guide defining screen layouts, view joins, and UI parameters.
slug: /ohs-player/configuration-ig/
sidebar_position: 40
guide_type: Concept
guide_status: ready
repository: configuration-ig
---

## Declarative FHIR configuration

Rather than using proprietary JSON or YAML configuration formats, the reference toolkit defines screen configurations in a standard HL7 FHIR Implementation Guide.

- **Portability** allows any FHIR-compliant application to interpret the configuration models.
- **Canonical versioning** allows packaging, publishing, and distributing configuration updates like standard medical terminology.
- **Zero-code updates** allow updating forms, registers, and indicators on frontline devices without rebuilding mobile binaries.

## Structure of the Implementation Guide

The Configuration IG defines three primary logical models alongside standard SQL-on-FHIR specifications.

### 1. ViewDefinition

`ViewDefinition` is adopted directly from [SQL-on-FHIR v2](https://sql-on-fhir.org/ig/). It extracts fields from single FHIR resources into tabular columns using `select`, `where`, and `forEach` expressions.

### 2. ViewJoinMap

`ViewJoinMap` combines multiple `ViewDefinition` projections into composite screen rows.

| Field | Cardinality | Meaning |
| --- | --- | --- |
| `name` | 1..1 | Output key for the combined row |
| `from` | 1..1 | Scope holding the primary pivot resource |
| `resource` | 1..1 | FHIR resource type of the pivot |
| `view` | 1..1 | ViewDefinition applied to the pivot resource |
| `joins` | 0..* | Additional resource views joined by match key |

### 3. ViewConfig

`ViewConfig` parameterizes UI renderers with display options, titles, and layout properties.

| Field | Cardinality | Meaning |
| --- | --- | --- |
| `viewType` | 1..1 | Identifier of the renderer being configured |
| `property` | 0..* | Key-value configuration parameters |

## Distribution to clients

Configuration resources are published in the central FHIR store. When client applications synchronize with the gateway, updated questionnaires, view maps, and display parameters are downloaded and applied dynamically.

## Where to go next

- [The configuration model](/ohs-player/configuration-model/) sets these artifacts in architectural context.
- [Configure a screen from FHIR data](/configure/screen-from-fhir-data/) walks through an example configuration update.
