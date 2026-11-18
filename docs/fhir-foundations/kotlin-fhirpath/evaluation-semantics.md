---
title: How evaluation works
description: What the engine returns, why results can be empty, and how it handles dates, time zones, and quantities.
slug: /fhir-foundations/kotlin-fhirpath/evaluation-semantics/
sidebar_position: 30
guide_type: Concept
guide_status: ready
guide_focus: Predicting what an expression returns before running it
repository: kotlin-fhirpath
---

## Goal and scope

This page explains the rules the engine follows, so you can predict what an expression returns. It covers result types, empty results, dates and time zones, quantities, and errors. To run expressions, see [Evaluate expressions](/fhir-foundations/kotlin-fhirpath/evaluate-expressions/).

## Every result is a collection

FHIRPath works on collections. Every expression returns a collection, and `evaluateExpression()` returns it as `Collection<Any>`. A single value is a collection with one item. No value is an empty collection.

## Results use FHIRPath types

Primitive values come back as FHIRPath types, not Kotlin FHIR types. For example, `name.given` returns Kotlin `String` values, not the FHIR `String` class.

| FHIRPath type | Kotlin type |
| --- | --- |
| Boolean | `kotlin.Boolean` |
| String | `kotlin.String` |
| Integer | `kotlin.Int` |
| Long | `kotlin.Long` |
| Decimal | `FhirPathDecimal` |
| Date | `FhirPathDate` |
| DateTime | `FhirPathDateTime` |
| Time | `FhirPathTime` |
| Quantity | `FhirPathQuantity` |

The `FhirPath` types are in the `dev.ohs.fhir.fhirpath.types` package. Results can also contain Kotlin FHIR objects, such as `HumanName`, when the expression returns an element that is not a primitive.

The engine has its own date and time types because FHIRPath allows partial times, such as `@T10` with only an hour. Kotlin FHIR does not allow these.

## FHIR values are converted as late as possible

A FHIR primitive can have an `id` and extensions. FHIRPath types cannot. So the engine keeps FHIR values while it navigates, which lets expressions such as `name.given.extension` work. It converts values to FHIRPath types only when needed.

- For equality and comparison, such as `=` and `<`
- For membership, such as `in` and `contains`
- For set functions, such as `union`, `distinct`, `intersect`, `exclude`, `subsetOf`, and `supersetOf`
- At the end of the evaluation, for every value in the result

## An empty result is an answer

When data is missing, most FHIRPath operators return an empty collection instead of failing. So an empty result means "no value", not "error".

The engine also returns an empty collection when it cannot decide an answer. Division by zero, comparing quantities with incompatible units, and the date comparisons below all return empty.

## Dates and times are compared at their precision

A FHIRPath date can be a year, a year and month, or a full date. A date-time can stop at any part. If the values differ in a part that both have, that part decides the result. If they are equal in every part they share and one value has more parts, the comparison returns empty.

| Expression | Result |
| --- | --- |
| `@2024 < @2024-06` | empty |
| `@2024-01-01T10 < @2024-01-01T10:30` | empty |
| `@2025 > @2024-06` | `true` |

The `precision()` function returns the precision of a value as a number.

| Type | Precision values |
| --- | --- |
| Date | 4 for year, 6 for month, 8 for day |
| DateTime | 4, 6, 8, then 10 for hour, 12 for minute, 14 for second, and more than 14 for fractions of a second |
| Time | 2 for hour, 4 for minute, 6 for second, and more than 6 for fractions of a second |

For fractions of a second, each extra number adds one decimal place. For example, a DateTime precision of 17 is milliseconds. For equality and comparison, seconds and fractions of a second count as one precision, so `@T10:00:00 = @T10:00:00.0` is `true`. The `lowBoundary()` and `highBoundary()` functions take the same values. Any other value returns an empty result.

## The engine never guesses a time zone

The specification lets an engine assume a time zone for date-times that have none. This engine does not, because the data could come from a system with an unknown time zone, and a wrong guess is unsafe for clinical data.

| Expression | Result |
| --- | --- |
| `@2025-01-01T00:00:00.0+00:00 = @2025-01-01T00:00:00.0` | empty |
| `@2025-01-01T00:00:00.0+00:00 ~ @2025-01-01T00:00:00.0` | `false` |
| `@2025-01-01T00:00:00.0 = @2025-01-01T00:00:00.0` | `true` |
| `@2025-01-01T00+05:30 = @2025-01-01T00+05:45` | empty |

- **One value has an offset and the other has none.** Equality and comparison return empty. Equivalence, `~`, returns `false`.
- **Neither value has an offset.** They are compared as if they had the same offset, so local times can still be compared.
- **Partial date-times with offsets.** Comparing them returns empty. For example, two hour-precision times with the offsets `+05:30` and `+05:45` cannot be compared hour by hour.

## Quantities convert between units

`Quantity` values check their units against UCUM. Comparison and arithmetic convert between compatible units.

| Expression | Result |
| --- | --- |
| `2.1 'kg' = 2100 'g'` | `true` |
| `2.1 'kg' > 1 'm'` | empty, because mass and length cannot be compared |

## Errors depend on the mode

- **Syntax errors** always throw. The engine never evaluates part of an expression.
- **A property that the type does not define** returns empty by default. In strict mode, it throws an `IllegalStateException`. A defined element with no value returns empty in both modes.
- **Some invalid operations** throw in both modes, such as calling a function that is not implemented or adding a string to a number.

[Troubleshooting](/fhir-foundations/kotlin-fhirpath/troubleshooting/) lists the error messages.

## Next step

[Evaluate expressions](/fhir-foundations/kotlin-fhirpath/evaluate-expressions/) shows how to run expressions and read their results.
