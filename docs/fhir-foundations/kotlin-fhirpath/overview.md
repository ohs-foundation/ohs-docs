---
title: Kotlin FHIRPath
description: A spec-conformant FHIRPath expression engine for Kotlin Multiplatform, evaluated over the Kotlin FHIR data model.
slug: /fhir-foundations/kotlin-fhirpath/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: Evaluating FHIRPath expressions in multiplatform Kotlin
repository: kotlin-fhirpath
---

## What it is

Kotlin FHIRPath implements HL7's FHIRPath expression language on Kotlin Multiplatform. It parses expressions with an ANTLR-generated parser and evaluates them directly against the in-memory data classes from [Kotlin FHIR](/fhir-foundations/kotlin-fhir/), for FHIR R4, R4B, and R5.

FHIRPath is the expression language FHIR itself is written in. Search parameters, invariants, and Structured Data Capture behavior are all FHIRPath. In this stack, [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) uses it to index resources for search and [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/) uses it for questionnaire behavior, but it is equally usable on its own.

## What you get

- **Strict conformance to the FHIRPath specification** (v3.0.0, STU3) plus the FHIR-specific additions defined in FHIR R5, verified against the official FHIR test-case suite, with deviations documented in [conformance](/fhir-foundations/kotlin-fhirpath/conformance/).
- **UCUM-aware quantities**, with unit validation, conversion, and comparison for `Quantity` values.
- **A deliberately small API.** Create an engine with `FhirPathEngine.forR4()` (or `forR4B()` and `forR5()`) and call `evaluateExpression(expression, base, variables)`. Results come back as a collection of FHIRPath system-typed values.
- **Two error postures.** Lenient mode treats unknown property access as an empty collection, per the spec's dynamic semantics. Strict mode raises instead.

## Artifacts

| Artifact | Contents |
| --- | --- |
| `fhir-path-r4` / `fhir-path-r4b` / `fhir-path-r5` | Engine for one FHIR version, bundling the matching model |
| `fhir-path` | Aggregate of all three |
| `fhir-path-core` | Version-independent evaluator internals (a dependency of the above, not a direct entry point) |

Each per-version artifact transitively brings the matching `fhir-model` artifact, so depending on `fhir-path-r4` gives you the R4 data model too.

## What it is not

- **No external services.** The engine is purely in-memory. There is no terminology server binding, so functions like `memberOf` and `subsumes` are unimplemented, and no reference resolution, so `resolve()` is unimplemented.
- **No compile-time type checking of expressions.** Errors surface at evaluation, as empty results in lenient mode or exceptions in strict mode.
- **No reflection.** Model navigation uses generated accessors, which is what keeps it working on Wasm and native targets.
- **Deliberately conservative about timezones.** Comparing a date-time that has a timezone offset with one that has none returns empty rather than assuming a default zone. See [evaluation semantics](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/).

## Next step

[Add the dependency and evaluate your first expression](/fhir-foundations/kotlin-fhirpath/get-started/).
