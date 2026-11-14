---
title: Evaluate expressions
description: Run FHIRPath expressions on resources, elements, and Bundles, pass variables, read the results, and evaluate search parameters.
slug: /fhir-foundations/kotlin-fhirpath/evaluate-expressions/
sidebar_position: 40
guide_type: Usage guide
guide_status: ready
guide_focus: Running FHIRPath expressions and using their results in Kotlin
repository: kotlin-fhirpath
---

## Goal and scope

This page shows how to evaluate expressions and use the results in Kotlin. Examples use R4 and this Patient.

```json
{
  "resourceType": "Patient",
  "id": "example",
  "active": true,
  "name": [
    { "use": "official", "family": "Chalmers", "given": ["Peter", "James"] },
    { "use": "usual", "given": ["Jim"] }
  ],
  "birthDate": "1974-12-25"
}
```

## Create an engine

Create one engine for each FHIR version you use, and reuse it.

```kotlin
import dev.ohs.fhir.fhirpath.FhirPathEngine
import dev.ohs.fhir.fhirpath.forR4

val engine = FhirPathEngine.forR4()
```

Use `forR4B()` or `forR5()` for other FHIR versions. Each one is in the artifact for that version.

## Evaluate on a resource

Pass the expression and the resource. You can start the expression with the resource type or leave it out.

```kotlin
engine.evaluateExpression("name.given", patient)                        // [Peter, James, Jim]
engine.evaluateExpression("Patient.name.given", patient)                // [Peter, James, Jim]
engine.evaluateExpression("name.where(use = 'official').given", patient) // [Peter, James]
engine.evaluateExpression("name.select(given.first() + ' ' + family)", patient) // [Peter Chalmers]
```

The last expression returns one value, because the second name has no `family`, and adding to an empty value gives an empty value.

## Evaluate on an element

The base can be any element, not only a resource. The expression then starts from that element.

```kotlin
engine.evaluateExpression("given", patient.name[0]) // [Peter, James]
```

When the base is not a resource, `%resource` and `%context` refer to that element.

## Evaluate on a Bundle

To reach the resources in a Bundle, filter `entry.resource` by type.

```kotlin
engine.evaluateExpression("entry.resource.ofType(Patient).name.family", bundle) // [Chalmers]
```

## Pass variables

Pass a map as `variables`, and use each key with `%` in the expression. A value can be a Kotlin `String`, `Boolean`, `Int`, or `Long`, or a Kotlin FHIR object. Each variable is a single item, so a `List` counts as one value.

```kotlin
engine.evaluateExpression(
  "name.where(use = %nameUse).given",
  patient,
  variables = mapOf("nameUse" to "official"),
)
// [Peter, James]
```

A Kotlin `Double` or `Float` does not work, and using it throws an error such as `Cannot add 2.5 and 1`. For a decimal, pass a Kotlin FHIR `Decimal`, such as `Decimal(value = FhirDecimal.fromString("2.5"))`.

The engine also provides `%resource`, `%context`, `%ucum`, `%sct`, and `%loinc`. Using a variable that is not defined throws `IllegalStateException` with the message `Unknown variable: %name`.

## Read the results

Results are FHIRPath types. See [How evaluation works](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/#results-use-fhirpath-types) for the full list.

To check a condition, test for a single `true`. An empty result is neither true nor false.

```kotlin
val isAdult = engine.evaluateExpression("birthDate < today() - 18 years", patient).singleOrNull() == true
```

To read other values, check the type of each item.

```kotlin
import dev.ohs.fhir.fhirpath.types.FhirPathDate
import dev.ohs.fhir.fhirpath.types.FhirPathDecimal
import dev.ohs.fhir.fhirpath.types.FhirPathQuantity

for (value in engine.evaluateExpression(expression, resource)) {
  when (value) {
    is String -> println("Text $value")
    is Boolean -> println("Flag $value")
    is Int -> println("Number $value")
    is FhirPathDecimal -> println("Decimal ${value.asBigDecimal()}")
    is FhirPathDate -> println("Date ${value.year} ${value.month} ${value.day}")
    is FhirPathQuantity -> println("Quantity ${value.value} ${value.unit}")
    else -> println("Element $value")
  }
}
```

A `FhirPathDecimal` keeps its digits as written, so `toString()` on `1.50` returns `1.50`. Use `asBigDecimal()` to get the `BigDecimal` from the bignum library. `FhirPathDate` has `year`, and `month` and `day` are `null` when the date does not have them.

## Evaluate a search parameter

Each search parameter in Kotlin FHIR has a FHIRPath `expression`. Evaluate it to get the parameter's values, including for parameters that Kotlin FHIR cannot extract itself.

```kotlin
import dev.ohs.fhir.model.r4.search.PatientSearchParams

val searchParam = PatientSearchParams.deceased
engine.evaluateExpression(searchParam.expression, patient)
```

Some parameters have an empty `expression`, such as `PatientSearchParams.age`. There is nothing to evaluate for them. See [Extract search parameters](/fhir-foundations/kotlin-fhir/search-parameters/) for the parameters Kotlin FHIR extracts without FHIRPath.

## Next step

[Debug expressions](/fhir-foundations/kotlin-fhirpath/debug-expressions/) shows how to find out why an expression returns the wrong result.
