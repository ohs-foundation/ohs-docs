---
title: Versions and compatibility
description: Current versions, how the four libraries pair with each other, and the history of their Maven coordinates.
slug: /fhir-foundation/versions/
sidebar_position: 30
guide_type: Technical reference
guide_status: ready
guide_focus: Picking versions of the four libraries that work together
source_url: https://github.com/ohs-foundation
source_label: OHS Foundation on GitHub ↗
---

## Current versions

All artifacts publish to Maven Central under the group `dev.ohs.fhir`. The table shows the versions at the time of writing.

| Repository | Artifact | Version |
| --- | --- | --- |
| Kotlin FHIR | `fhir-model` (and `-r4`, `-r4b`, `-r5`) | 1.0.0-rc02 |
| Kotlin FHIRPath | `fhir-path` (and `-core`, `-r4`, `-r4b`, `-r5`) | 1.0.0-beta05 |
| Kotlin FHIR Engine | `fhir-engine` | 2.0.0-alpha02 |
| Kotlin FHIR Data Capture | `fhir-data-capture` | 2.0.0-alpha02 |

Each repository's Maven Central badges are the canonical source for the latest release. This table exists to show the shape of the stack, not to race the release process.

## Maturity

None of the four has reached a stable 1.x or 2.x release. Expect API changes between versions, and pin exact versions rather than ranges. Two facts sharpen that caveat.

- Kotlin FHIR and Kotlin FHIRPath expose `kotlinx-datetime` and the `bignum` arbitrary-precision library in their public API (for example `FhirDecimal` and FHIRPath `Decimal` values are backed by `BigDecimal` from `bignum`). Both of those dependencies are themselves pre-1.0, so their types in your code are subject to the same churn.
- Kotlin FHIR Engine builds on pre-release versions of Room for Kotlin Multiplatform and related storage libraries.

## Pairing the libraries

The higher layers pin the lower layers they were built against. When you combine them, align with what the higher layer declares rather than mixing freely.

- Kotlin FHIR Engine 2.0.0-alpha02 builds against `fhir-model-r4` and `fhir-path-r4` 1.0.0-beta05. The engine's API signatures use the model's types directly, so your app should depend on the same model version.
- Kotlin FHIR Data Capture 2.0.0-alpha02 builds against `fhir-model` 1.0.0-beta05 and `fhir-path` 1.0.0-beta03.

If Gradle resolves conflicting versions of `dev.ohs.fhir` artifacts in one build, prefer the version the highest layer in your dependency graph declares. Treat any binary incompatibility as a signal to upgrade the whole stack together, because the four are released in near-lockstep.

## FHIR version axis

Kotlin FHIR and Kotlin FHIRPath each publish per-FHIR-version artifacts (`-r4`, `-r4b`, `-r5`) plus an aggregate that bundles all three. Depend on the single-version artifact matching your data unless you genuinely handle multiple FHIR versions, since the aggregate triples the model surface you ship. Kotlin FHIR Engine and Kotlin FHIR Data Capture are R4-only, so a stack that includes either of them is an R4 stack.

## Earlier coordinates

These libraries began life in Google's FHIR SDK work, and their earliest versions were published under Google coordinates. If you are migrating an existing project, the renames are listed below.

| Repository | Earlier coordinate | Current coordinate |
| --- | --- | --- |
| Kotlin FHIR | `com.google.fhir` group (up to 1.0.0-beta02) | `dev.ohs.fhir` with `fhir-model` artifacts |
| Kotlin FHIRPath | `com.google.fhir` group (up to 1.0.0-beta01) | `dev.ohs.fhir` with `fhir-path` artifacts |
| Kotlin FHIR Engine | `com.google.android.fhir` group, `engine` artifact | `dev.ohs.fhir` with the `fhir-engine` artifact |
| Kotlin FHIR Data Capture | `com.google.android.fhir` group, `data-capture` artifact (up to 1.0.0-beta02) | `dev.ohs.fhir` with the `fhir-data-capture` artifact |

The earlier artifacts were distributed on Google Maven, and the `dev.ohs.fhir` artifacts are on Maven Central. Package namespaces moved to `dev.ohs` at the same time, so a migration is a coordinate change plus an import rewrite, not a drop-in swap.
