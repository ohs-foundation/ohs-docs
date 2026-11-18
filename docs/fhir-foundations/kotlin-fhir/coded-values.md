---
title: Work with coded values
description: Set and read FHIR coded elements with the generated enums, Enumeration, and ExtensibleEnumeration.
slug: /fhir-foundations/kotlin-fhir/coded-values/
sidebar_position: 50
guide_type: Usage guide
guide_status: ready
guide_focus: Reading and writing coded elements with type safety
repository: kotlin-fhir
---

## Goal and scope

This page shows how to set and read elements that hold a code, such as `Patient.gender`. Examples use R4.

Only elements of the FHIR type `code` use enums. Elements of type `CodeableConcept` or `Coding`, such as `Observation.code`, keep those types. The element's binding strength decides which Kotlin type it has.

| Binding strength | Kotlin type | Example |
| --- | --- | --- |
| `required` | `Enumeration<T>` | `Patient.gender` is `Enumeration<AdministrativeGender>` |
| `extensible` or `preferred` | `ExtensibleEnumeration<T>` | `Expression.language` is `ExtensibleEnumeration<ExpressionLanguage>` |
| `example` | `Code` | |

[How the model maps FHIR](/fhir-foundations/kotlin-fhir/how-the-model-maps-fhir/#coded-values-use-enums-when-the-type-is-code) explains these rules.

## Find the enum for a code

All enums are in the `terminologies` package of their FHIR version, for example `dev.ohs.fhir.model.r4.terminologies.AdministrativeGender`. Each constant has a `code`, `system`, and `display`.

To get a constant from a code, use `fromCode()`. It throws `IllegalArgumentException` if the code is not in the ValueSet.

```kotlin
import dev.ohs.fhir.model.r4.terminologies.AdministrativeGender

val female = AdministrativeGender.fromCode("female")
female.code    // "female"
female.system  // "http://hl7.org/fhir/administrative-gender"
female.display // "Female"
```

Constant names are made from the codes, so they are not always obvious. For example, `text/fhirpath` becomes `Text_Fhirpath` and `>=` becomes `GreaterThanOrEqualTo`. Use `fromCode()` when you know the code, or see the [enum naming rules](https://github.com/ohs-foundation/kotlin-fhir/blob/main/docs/enum-generation.md#enum-naming-rules) in the repository.

## Set and read a required code

Wrap the enum constant in `Enumeration` to set it, and read `value` to get it.

```kotlin
import dev.ohs.fhir.model.r4.Enumeration
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.terminologies.AdministrativeGender

val patient = Patient(gender = Enumeration(value = AdministrativeGender.Female))

val gender: AdministrativeGender? = patient.gender?.value
```

If JSON contains a code that is not in the ValueSet, decoding throws `IllegalArgumentException`. See [Handle decoding failures](/fhir-foundations/kotlin-fhir/serialization/#handle-decoding-failures).

## Set and read an extensible code

An `ExtensibleEnumeration<T>` is one of two classes.

- `Predefined` holds an enum constant, for a code in the ValueSet.
- `Custom` holds the code as a string, for a code not in the ValueSet.

Both have a `code` property with the code as a string. Use `ExtensibleEnumeration.of()` to create either one.

```kotlin
import dev.ohs.fhir.model.r4.ExtensibleEnumeration
import dev.ohs.fhir.model.r4.terminologies.ExpressionLanguage

val fhirPath = ExtensibleEnumeration.of(ExpressionLanguage.Text_Fhirpath) // Predefined
val inHouse = ExtensibleEnumeration.of("text/x-in-house-rules")           // Custom

fun describe(language: ExtensibleEnumeration<ExpressionLanguage>): String =
  when (language) {
    is ExtensibleEnumeration.Predefined -> "Known language ${language.value.display}"
    is ExtensibleEnumeration.Custom -> "Other language ${language.code}"
  }
```

When decoding JSON, a code in the ValueSet becomes `Predefined` and any other code becomes `Custom`.

## Exceptions to the rules

A few ValueSets do not follow the table above. For example, `ImplementationGuide.license` has a `required` binding but accepts new SPDX license codes, and the `mimetypes` and `all-languages` ValueSets have no enum because they have no fixed list of codes. The repository lists every exception in [Excluded ValueSets](https://github.com/ohs-foundation/kotlin-fhir/blob/main/docs/enum-generation.md#excluded-valuesets) and [Required bindings generated as extensible](https://github.com/ohs-foundation/kotlin-fhir/blob/main/docs/enum-generation.md#required-bindings-generated-as-extensible).

## Next step

[Read Bundles and server responses](/fhir-foundations/kotlin-fhir/server-responses/) shows how to handle the JSON a FHIR server returns.
