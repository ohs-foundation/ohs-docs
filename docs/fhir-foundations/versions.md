---
title: Versions and compatibility
description: Current versions, how the four libraries pair with each other, and the history of their Maven coordinates.
slug: /fhir-foundations/versions/
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
| Kotlin FHIR | `fhir-model` (and `-r4`, `-r4b`, `-r5`) | 1.0.0 |
| Kotlin FHIRPath | `fhir-path` (and `-core`, `-r4`, `-r4b`, `-r5`) | 1.0.0-beta06 |
| Kotlin FHIR Engine | `fhir-engine` | 2.0.0-alpha05 |
| Kotlin FHIR Data Capture | `fhir-data-capture` | 2.0.0-alpha05 |

Each repository's Maven Central badges are the canonical source for the latest release.

## Maturity

Kotlin FHIR 1.0.0 is a stable release. Kotlin FHIRPath, Kotlin FHIR Engine, and Kotlin FHIR Data Capture are pre-release, so their APIs can change between versions. Pin exact versions, not version ranges.

Two dependencies can still cause changes in your code.

- Kotlin FHIR and Kotlin FHIRPath use types from `kotlinx-datetime` and `bignum` in their public API. For example, `FhirDecimal` is built on `BigDecimal` from `bignum`. Neither library has reached 1.0, so their types can change, even when you use the stable Kotlin FHIR.
- Kotlin FHIR Engine uses pre-release versions of Room for Kotlin Multiplatform and related storage libraries.

## Pairing the libraries

Each library is built against a specific version of the libraries below it.

| Library | Built against |
| --- | --- |
| Kotlin FHIRPath 1.0.0-beta06 | `fhir-model-r4` 1.0.0-rc03 |
| Kotlin FHIR Engine 2.0.0-alpha05 | `fhir-model-r4` 1.0.0-rc03 and `fhir-path-r4` 1.0.0-beta06 |
| Kotlin FHIR Data Capture 2.0.0-alpha05 | `fhir-model-r4` 1.0.0-rc03 and `fhir-path-r4` 1.0.0-beta06 |

None of them is built against Kotlin FHIR 1.0.0 yet. If your app uses any of them, use `fhir-model-r4` 1.0.0-rc03, the version they were built and tested with. If you add 1.0.0 to your build, Gradle uses 1.0.0 for every library, and that combination has not been tested.

In general, use the versions that the highest library in your stack declares. If you see a binary incompatibility, upgrade all the libraries together.

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
