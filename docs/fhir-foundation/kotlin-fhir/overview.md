---
title: Kotlin FHIR
description: A lean, code-generated implementation of the FHIR data model for Kotlin Multiplatform, with JSON serialization.
slug: /fhir-foundation/kotlin-fhir/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: Representing FHIR resources as idiomatic Kotlin
repository: kotlin-fhir
---

## What it is

Kotlin FHIR is the base of the FHIR Foundation stack: the HL7 FHIR data model — every resource and data type — generated as minimalistic, idiomatic Kotlin classes, together with `kotlinx.serialization` serializers that read and write spec-compliant FHIR JSON. It covers FHIR R4, R4B, and R5, each as its own artifact.

The library is deliberately lean. It carries no logging, no networking, no XML machinery, and no platform-specific dependencies, which is what lets it target everything from Android and iOS to Wasm and native Linux. Its only runtime dependencies are `kotlinx-serialization`, `kotlinx-datetime`, and an arbitrary-precision number library.

## What you get

- **Resource and data-type classes** for the full FHIR specification, generated from the official spec packages. Choice elements (`value[x]`) become sealed interfaces, so the compiler enforces which types an element accepts.
- **Enums for coded fields** where the spec binds a required ValueSet, including a shared `terminologies` package for bindings used across many resources (such as `AdministrativeGender`).
- **Hand-written primitive types** where Kotlin needs help matching FHIR semantics: `FhirDate` and `FhirDateTime` model FHIR's variable-precision dates, and `FhirDecimal` preserves arbitrary precision.
- **Generated serializers** that handle FHIR JSON's quirks — primitive elements with extensions (the `_field` convention), polymorphic resource decoding via the `resourceType` discriminator, and choice-type expansion — so you use a plain `kotlinx.serialization.Json` instance.
- **Generated search-parameter extractors**: for each resource, a `SearchParams` object whose parameters extract values as native Kotlin code, without needing a runtime FHIRPath engine. The FHIRPath expression string is still carried as metadata for callers that want to evaluate it externally — that seam is where [Kotlin FHIRPath](/fhir-foundation/kotlin-fhirpath/) plugs in.

## Artifacts

| Artifact | Contents |
| --- | --- |
| `fhir-model-r4` | FHIR R4 model, package `dev.ohs.fhir.model.r4` |
| `fhir-model-r4b` | FHIR R4B model, package `dev.ohs.fhir.model.r4b` |
| `fhir-model-r5` | FHIR R5 model, package `dev.ohs.fhir.model.r5` |
| `fhir-model` | Umbrella artifact that includes all three |

Depend on the single FHIR version you use; the umbrella exists for tools that genuinely handle multiple versions.

## What it is not

- **Not a validator.** Constraints, profiles, and binding strengths from StructureDefinitions are not represented in the generated code. Bindings only influence which enums exist.
- **Not a client or a database.** There is no networking and no persistence — that is [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/)'s job.
- **JSON only.** XML and Turtle are out of scope. Other `kotlinx.serialization` formats may work mechanically, but only JSON is extensively tested.
- **Selective generation.** Logical models, profiles, CapabilityStatements, CodeSystems, ConceptMaps, NamingSystems, OperationDefinitions, and ValueSets-as-resources are not generated. The abstract FHIR patterns (`Event`, `Request`, `Definition`) are not modeled as interfaces, because conforming resources may rename elements in ways Kotlin inheritance cannot express.
- **Not every search parameter is extractable.** Parameters whose FHIRPath patterns the generator does not support throw `NotImplementedError` — see [Extract search parameters](/fhir-foundation/kotlin-fhir/search-parameters/).

## Next step

[Add the dependency and create your first resource](/fhir-foundation/kotlin-fhir/get-started/).
