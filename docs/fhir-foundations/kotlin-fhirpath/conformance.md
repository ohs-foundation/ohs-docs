---
title: Conformance
description: Which parts of the FHIRPath specification Kotlin FHIRPath 1.0.0-beta06 supports, which are partial, and which are missing.
slug: /fhir-foundations/kotlin-fhirpath/conformance/
sidebar_position: 60
guide_type: Technical reference
guide_status: ready
guide_focus: Checking whether the expressions you need are supported
repository: kotlin-fhirpath
---

## Goal and scope

This page summarizes what version 1.0.0-beta06 supports. It covers the [FHIRPath specification v3.0.0](https://hl7.org/fhirpath/STU3/en/) and the [FHIRPath section of FHIR R5](https://hl7.org/fhir/R5/fhirpath.html). The engine for every FHIR version uses the R5 definitions.

The repository has the full table for every function and operator, with notes and links to the code. Read the [conformance table for 1.0.0-beta06](https://github.com/ohs-foundation/kotlin-fhirpath/blob/v1.0.0-beta06/docs/conformance.md). The version on the `main` branch describes changes that are not released yet.

## Supported

- **Navigation and filtering.** Paths, `where()`, `select()`, `repeat()`, `ofType()`, and `sort()`
- **Existence and subsetting.** `exists()`, `all()`, `empty()`, `count()`, `first()`, `last()`, `tail()`, `skip()`, `take()`, and indexing
- **Strings, math, and conversion functions**
- **Aggregates.** `aggregate()`, `sum()`, `min()`, `max()`, and `avg()`
- **Dates and times.** Date arithmetic, `now()`, `today()`, `precision()`, `lowBoundary()`, `highBoundary()`, and component functions such as `yearOf()`
- **Types.** `is`, `as`, and reflection
- **Utility functions.** `trace()` and `iif()`
- **FHIR additions.** `extension()`, `hasValue()`, and the variables `%resource`, `%context`, `%ucum`, `%sct`, and `%loinc`
- **Quantities with UCUM units**

## Missing

Functions that need another service are missing by design, because the engine runs only in memory.

- `resolve()`, which needs a store of resources
- `memberOf()`, `subsumes()`, and `subsumedBy()`, which need a terminology server

These features are not implemented in 1.0.0-beta06. Calling a missing function throws `IllegalStateException` with the message `Function 'name' is not implemented.`

- `coalesce()`, `repeatAll()`, `defineVariable()`, and `pathname()`
- `duration()` and `difference()`
- `getValue()`, `conformsTo()`, `elementDefinition()`, `slice()`, `checkModifiers()`, and `htmlChecks()`
- Creating objects in an expression, such as `Quantity('3', 'mg')`
- The `%rootResource` variable. Using it throws `Unknown variable: %rootResource`.

## Partly supported

| Feature | Behavior in 1.0.0-beta06 |
| --- | --- |
| Indexing, such as `name[5]` | Throws `IndexOutOfBoundsException` when the index is too large, instead of returning empty |
| `div` and `mod` | Throw `ArithmeticException` or return a wrong result for some inputs |
| `+`, `-`, and `*` on integers | Overflow wraps around without an error |
| `combine()` | Has no `preserveOrder` parameter |
| `toInteger()`, `convertsToInteger()`, `toDecimal()`, and `convertsToDecimal()` | Do not accept `Long` values |
| `toDecimal()` on a string | Can lose precision for numbers with many digits |
| `toQuantity(unit)` on a number | Ignores the unit and uses `'1'` |
| `ceiling()`, `floor()`, and `truncate()` | Do not accept quantities |
| `<`, `<=`, `>`, and `>=` on quantities | Need the units to match after conversion |
| `as` | Matches the exact type only, not subtypes |
| `=` on resources | Compares the whole resource, not only the `id` |

[Troubleshooting](/fhir-foundations/kotlin-fhirpath/troubleshooting/) has workarounds for the ones you are most likely to meet.

## Intentional differences

- **Time zones.** The engine never assumes a time zone. See [How evaluation works](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/#the-engine-never-guesses-a-time-zone).
- **Official test cases.** A few official FHIR test cases fail on purpose, where the test or the specification is believed to be wrong. The repository lists each one in [Test conformance](https://github.com/ohs-foundation/kotlin-fhirpath/blob/v1.0.0-beta06/docs/conformance.md#test-conformance), with links to the discussions.

## When a feature is missing

- Rewrite the expression with supported functions. For example, use `iif(a.exists(), a, b)` instead of `coalesce(a, b)`.
- Do the step in Kotlin. Evaluate the parts of the expression that work, then combine the results in your code.
- For `resolve()`, load the referenced resource in your app, then evaluate the next expression on it.

## Next step

[Troubleshooting](/fhir-foundations/kotlin-fhirpath/troubleshooting/) lists error messages and their fixes.
