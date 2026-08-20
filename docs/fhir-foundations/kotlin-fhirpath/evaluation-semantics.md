---
title: Evaluation semantics
description: How the engine handles types, dates, timezones, and errors, which decides whether expressions mean what you think.
slug: /fhir-foundations/kotlin-fhirpath/evaluation-semantics/
sidebar_position: 30
guide_type: Concept
guide_status: ready
guide_focus: Predicting what an expression returns before running it
repository: kotlin-fhirpath
---

## Why this page exists

This page describes the behavior the engine commits to around types, empty collections, and dates, including two places where it is deliberately stricter than the spec permits.

## Result values and their types

`evaluateExpression` returns `Collection<Any>` because FHIRPath is a collection language. Every expression produces a collection, possibly empty, possibly mixed. Values are FHIRPath *system* types, mapped to Kotlin as follows.

| FHIRPath type | Kotlin representation |
| --- | --- |
| String | `kotlin.String` |
| Boolean | `kotlin.Boolean` |
| Integer | `kotlin.Int` |
| Long | `kotlin.Long` |
| Decimal | `BigDecimal` (multiplatform, arbitrary precision) |
| Date / DateTime / Time | `FhirPathDate` / `FhirPathDateTime` / `FhirPathTime` |
| Quantity | `FhirPathQuantity` |

FHIR values convert to FHIRPath values lazily, at the last possible moment. That matters because a FHIR primitive can carry `id` and extensions. Converting early would discard them and break expressions like `name.given.extension(...)`. The engine keeps the FHIR representation while navigating and converts at the end, so `Patient.name.given` and `Patient.name.given.select(substring(0))` both come back as FHIRPath strings.

## Empty is an answer

Per the spec, evaluation over missing data yields the empty collection `{}`, and most operators propagate emptiness rather than failing. An empty result therefore means "no value", not "error". If you want an undefined property access to be an error, create the engine with `strictMode = true`.

## Dates, times, and timezones

Two deliberate decisions, both on the conservative side for clinical data.

- **No default timezone is ever assumed.** Comparing a date-time that has a timezone offset with one that has none returns `{}` for `=` and the ordering operators, and the equivalence operator `~` returns `false`. The spec permits filling in a default zone, but the engine refuses because the data may come from a system whose timezone is unknown, making any guess unsafe. Two values that both lack an offset compare as if they shared one, so local timestamps remain comparable.
- **Precision is respected.** FHIRPath dates can be a year, a year-month, or a full date, and comparisons that cannot be decided at the values' precisions return `{}`. This includes comparing partial date-times that carry timezone offsets. The `precision()`, `lowBoundary()`, and `highBoundary()` functions expose precision explicitly, and passing an invalid precision argument to them raises an error rather than returning empty.

## Quantities and UCUM

`Quantity` values validate their units against UCUM, and comparison and arithmetic convert between commensurable units, so `2.1 'kg'` and `2100 'g'` compare equal. Incommensurable units compare to `{}`.

## Errors

- **Syntax errors fail fast.** The parser uses a bail-out strategy plus an end-of-input check, so a malformed expression raises immediately with the offending fragment. It never half-evaluates.
- **Undefined property access behaves per mode.** Lenient mode yields an empty collection. Strict mode throws an `IllegalStateException`.

## Engine state and concurrency

The engine reinitializes internal evaluator state on every `evaluateExpression` call. This is also what powers the `traces` property, which exposes the output of the FHIRPath `trace()` function after a call. Because that state is per-instance, do not share a single engine across concurrent evaluations. Construct one per thread of work.

## Next step

[Conformance](/fhir-foundations/kotlin-fhirpath/conformance/) lists exactly which spec features are implemented, partial, or absent.
