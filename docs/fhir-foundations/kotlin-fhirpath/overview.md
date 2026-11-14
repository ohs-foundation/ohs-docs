---
title: Kotlin FHIRPath
description: A FHIRPath expression engine for Kotlin Multiplatform that evaluates expressions over the Kotlin FHIR data model.
slug: /fhir-foundations/kotlin-fhirpath/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: Evaluating FHIRPath expressions in multiplatform Kotlin
repository: kotlin-fhirpath
---

## What it is

Kotlin FHIRPath runs FHIRPath expressions against FHIR resources in Kotlin. It works on the resource classes from [Kotlin FHIR](/fhir-foundations/kotlin-fhir/), for FHIR R4, R4B, and R5. It runs on Android, iOS, the JVM, and the web.

FHIRPath is the expression language that FHIR uses for search parameters, invariants, and questionnaire logic. [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) uses this library to index resources for search, and [Kotlin FHIR Data Capture](/fhir-foundations/kotlin-fhir-data-capture/) uses it for questionnaire behavior. You can also use it on its own.

## What you get

- **A small API.** Create an engine with `FhirPathEngine.forR4()` and call `evaluateExpression()`.
- **The FHIRPath specification v3.0.0 (STU3)** and the FHIR-specific additions from FHIR R5. The library is tested against the official FHIR test cases.
- **Quantities with units.** `Quantity` values use UCUM, so `2.1 'kg' = 2100 'g'` is `true`.
- **Two error modes.** By default, a property that does not exist gives an empty result. In strict mode, it throws an exception.

## Artifacts

| Artifact | Contents |
| --- | --- |
| `fhir-path-r4`, `fhir-path-r4b`, `fhir-path-r5` | The engine for one FHIR version. Each one includes the matching Kotlin FHIR model. |
| `fhir-path` | All three FHIR versions |
| `fhir-path-core` | Shared internals. The artifacts above depend on it. You do not add it yourself. |

## What it is not

- **It does not call other services.** There is no reference lookup, so `resolve()` is not available. There is no terminology server, so `memberOf()` and `subsumes()` are not available.
- **It does not check expressions before running them.** Mistakes show up when you evaluate, as an empty result or an exception.
- **It does not guess time zones.** Comparing a date-time that has a time zone offset with one that has none gives an empty result.

## How this documentation is organized

| Page | Use it to |
| --- | --- |
| [Get started](/fhir-foundations/kotlin-fhirpath/get-started/) | Add the library and evaluate your first expression |
| [How evaluation works](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/) | Understand result types, empty results, dates, and quantities |
| [Evaluate expressions](/fhir-foundations/kotlin-fhirpath/evaluate-expressions/) | Pass variables, read results, and evaluate search parameters |
| [Debug expressions](/fhir-foundations/kotlin-fhirpath/debug-expressions/) | Find out why an expression returns the wrong result |
| [Conformance](/fhir-foundations/kotlin-fhirpath/conformance/) | Check which functions and operators are supported |
| [Troubleshooting](/fhir-foundations/kotlin-fhirpath/troubleshooting/) | Look up an error message and its fix |

## Next step

[Get started](/fhir-foundations/kotlin-fhirpath/get-started/) adds the library and evaluates an expression.
