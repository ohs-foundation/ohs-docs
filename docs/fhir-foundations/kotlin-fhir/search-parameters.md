---
title: Extract search parameters
description: Using the generated search-parameter extractors to pull indexable values from resources, and what they cover.
slug: /fhir-foundations/kotlin-fhir/search-parameters/
sidebar_position: 60
guide_type: Usage guide
guide_status: ready
guide_focus: Building search indexes over FHIR resources without a runtime FHIRPath engine
repository: kotlin-fhir
---

## Goal and scope

Each FHIR search parameter has a FHIRPath expression that says which values to take from a resource. Kotlin FHIR turns most of these expressions into Kotlin code when the library is built. You can then get search values from a resource without running a FHIRPath engine. This page covers the API and which expressions are supported.

## Extract values

Each resource type has a `SearchParams` object in the `search` package, such as `dev.ohs.fhir.model.r4.search.PatientSearchParams`. Each search parameter in it is a `SearchParam<R, T>`. `R` is the resource type, and `T` is the type of the values it returns. A parameter also has its `name`, `type`, FHIRPath `expression`, and `target` resource types.

```kotlin
import dev.ohs.fhir.model.r4.search.PatientSearchParams

val birthDates: List<Date> = PatientSearchParams.birthdate.extractFrom(patient)
```

You can also call `extract()` on the resource. The result is the same.

```kotlin
import dev.ohs.fhir.model.r4.search.extract

val birthDates: List<Date> = patient.extract(PatientSearchParams.birthdate)
```

## The `all` and `unsupported` lists

Each `SearchParams` object has two lists.

- **`all`** contains the parameters that can be extracted. You can safely call `extractFrom()` on each of them.

  ```kotlin
  PatientSearchParams.all.forEach { searchParam ->
    val values = searchParam.extractFrom(patient)
    // add the values to your index
  }
  ```

- **`unsupported`** contains the parameters whose expressions the generator cannot handle. Their `extractFrom()` throws `NotImplementedError`.

For example, these Patient parameters are in `unsupported` in R4. An index built from `PatientSearchParams.all` does not include them.

- `age`
- `birthOrderBoolean`
- `deceased`
- `mothersMaidenName`

## Supported expressions

A parameter can be extracted if its expression uses only these patterns.

| Pattern | Example |
| --- | --- |
| Property | `Patient.birthDate` |
| Nested property | `Patient.address.city` |
| List property | `Patient.identifier` |
| Type cast with `as` | `(Patient.deceased as dateTime)` |
| Type cast with `as()` | `Condition.onset.as(dateTime)` |
| Type filter with `ofType()` | `Observation.value.ofType(Quantity)` |
| Choice element without a cast | `ChargeItem.occurrence` |
| Reference type filter | `Account.subject.where(resolve() is Patient)` |
| Value filter | `Patient.telecom.where(system='email')` |
| Union of the patterns above | `Observation.value.ofType(dateTime) \| Observation.value.ofType(Period)` |

Three patterns behave differently from what you might expect.

- **A choice element without a cast** returns the choice interface, such as `ChargeItem.Occurrence`, not the value inside it.
- **`where(resolve() is Type)`** does not look up the referenced resource. It checks if the reference text contains `Type/`, such as `Patient/123`. It does not match URNs, contained resources, or references without a URL.
- **A union** returns the values of all its parts, in order, without duplicates. The values have the type that all parts share, such as `CodeableConcept`. If the parts have different types, such as `dateTime` and `Period`, the values have the type `Any`.

### Unions with an unsupported part

If one part of a union is unsupported, that part is skipped and the other parts are extracted. A union parameter is only in `unsupported` if no part can be extracted. These parameters have a skipped part.

| Version | Parameter | Extracted | Skipped |
| --- | --- | --- | --- |
| R4, R4B | `Observation.value-string` | `(Observation.value as string)` | `(Observation.value as CodeableConcept).text` |
| R5 | `CareTeam.name` | `CareTeam.name` | The `careteam-alias` extension value |
| R5 | `Composition.section-text` | `Composition.section.text` | `Composition.section.section.text` |
| R5 | `Device.serial-number` | `Device.serialNumber` | `Device.identifier.where(type='SNO')` |

## Unsupported expressions

In the 1.0.0 release, 84 search parameter definitions are unsupported. This counts each FHIR version separately, so a parameter that is unsupported in R4, R4B, and R5 counts three times.

| Reason | Count |
| --- | --- |
| The specification gives no expression | 28 |
| Selects an extension by URL, with `.extension('url')` | 17 |
| Composite parameter with no path for its parts | 13 |
| Uses an index, such as `Bundle.entry[0]` | 6 |
| Path does not start with a resource type | 6 |
| Uses boolean logic, such as `and`, `or`, `exists()`, or a comparison | 5 |
| Uses another kind of `where(...)` condition | 3 |
| Uses an element defined by `contentReference` | 3 |
| Casts a choice element to a type it does not allow | 2 |
| Union with no supported part | 1 |

An unsupported parameter still has its full FHIRPath `expression`. So does a union with a skipped part. You can evaluate the expression with [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) to get the missing values.

The [search parameter patterns](https://github.com/ohs-foundation/kotlin-fhir/blob/main/docs/search-parameter-patterns.md) document in the repository lists every unsupported parameter by name.

## Generated extraction or a FHIRPath engine

[Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) does not use these generated functions. It evaluates search parameter expressions with Kotlin FHIRPath, which supports more expressions.

Use the generated functions when every parameter you need is in `all`. They run as plain Kotlin code. Use Kotlin FHIRPath when you need a parameter from `unsupported` or your own expressions.
