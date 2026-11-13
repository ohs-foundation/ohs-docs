---
title: Extract search parameters
description: Use the generated search-parameter extractors to pull indexable values from resources, and know which parameters they cover.
slug: /fhir-foundations/kotlin-fhir/search-parameters/
sidebar_position: 80
guide_type: Usage guide
guide_status: ready
guide_focus: Building search indexes over FHIR resources without a runtime FHIRPath engine
repository: kotlin-fhir
---

## Goal and scope

This page shows how to get search parameter values from a resource, for example to build a search index, and how to handle parameters the library cannot extract. Examples use R4. For how the extractors are made, see [How the model maps FHIR](/fhir-foundations/kotlin-fhir/how-the-model-maps-fhir/#search-parameters-are-compiled-not-interpreted).

## Extract one parameter

Each resource type has a `SearchParams` object in the `search` package, such as `dev.ohs.fhir.model.r4.search.PatientSearchParams`. Each parameter in it is a `SearchParam<R, T>`. `R` is the resource type, and `T` is the type of the values it returns. A parameter also has its `name`, `type`, FHIRPath `expression`, and `target` resource types.

```kotlin
import dev.ohs.fhir.model.r4.search.PatientSearchParams

val birthDates: List<Date> = PatientSearchParams.birthdate.extractFrom(patient)
```

You can also call `extract()` on the resource. The result is the same.

```kotlin
import dev.ohs.fhir.model.r4.search.extract

val birthDates: List<Date> = patient.extract(PatientSearchParams.birthdate)
```

## Extract every supported parameter

Each `SearchParams` object has two lists.

- **`all`** contains the parameters that can be extracted. You can safely call `extractFrom()` on each of them.
- **`unsupported`** contains the parameters whose expressions the generator cannot handle. Their `extractFrom()` throws `NotImplementedError`.

To build an index, iterate `all`.

```kotlin
PatientSearchParams.all.forEach { searchParam ->
  val values = searchParam.extractFrom(patient)
  // add the values to your index
}
```

Check `unsupported` for the parameters your app needs. They are not in `all`, so an index built from `all` does not contain them.

## Get values for an unsupported parameter

An unsupported parameter still has its full FHIRPath `expression`. Evaluate it with [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) to get the values.

Some parameters use a union of several paths, such as `Device.serialNumber | Device.identifier.where(type='SNO')`. If only some paths are supported, `extractFrom()` returns values from those paths and skips the rest, without an error. If your app needs the skipped paths, evaluate the full `expression` with Kotlin FHIRPath instead.

The repository lists which [expressions are supported](https://github.com/ohs-foundation/kotlin-fhir/blob/main/docs/search-parameter-patterns.md#supported-fhirpath-patterns), which [unions are only partly extracted](https://github.com/ohs-foundation/kotlin-fhir/blob/main/docs/search-parameter-patterns.md#partially-extracted-unions), and every [unsupported parameter](https://github.com/ohs-foundation/kotlin-fhir/blob/main/docs/search-parameter-patterns.md#unsupported-fhirpath-patterns) by name. These lists change as support grows.

## Know how extracted values behave

Three kinds of expressions return values you might not expect.

- **A choice element without a type**, such as `ChargeItem.occurrence`, returns the choice interface, such as `ChargeItem.Occurrence`, not the value inside it.
- **`where(resolve() is Patient)`** does not look up the referenced resource. It checks if the reference text contains `Patient/`, such as `Patient/123`. It does not match URNs, contained resources, or references without a URL.
- **A union** returns the values of all its supported paths, in order, without duplicates. If the paths return different types, such as `dateTime` and `Period`, the values have the type `Any`.

## Choose generated extraction or Kotlin FHIRPath

Use the generated functions when every parameter you need is in `all`. They run as plain Kotlin code and need no other library.

Use Kotlin FHIRPath when you need parameters from `unsupported`, the skipped paths of a union, or your own expressions. [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) takes this approach and evaluates every search parameter with Kotlin FHIRPath.

## Next step

[Troubleshooting](/fhir-foundations/kotlin-fhir/troubleshooting/) lists common errors and how to fix them.
