---
title: Coded values and enums
description: How FHIR ValueSet bindings become Kotlin enums, and how binding strength decides whether an element accepts codes outside the value set.
slug: /fhir-foundations/kotlin-fhir/coded-values/
sidebar_position: 40
guide_type: Usage guide
guide_status: ready
guide_focus: Reading and writing coded elements with type safety
repository: kotlin-fhir
---

## Goal and scope

Many FHIR elements hold a code from a ValueSet, such as `Patient.gender`. This page explains which elements Kotlin FHIR types with enums, which Kotlin type each element gets, and how codes are turned into enum names. Examples use R4.

## Which elements use enums

Only elements of the FHIR type `code` use enums. Elements of type `CodeableConcept` or `Coding` keep those types, whatever ValueSet they are bound to.

For example, `Patient.gender` is a `code`, so it uses the `AdministrativeGender` enum. `Observation.code` is a `CodeableConcept`, so it stays a `CodeableConcept`. Clinical codes such as LOINC and SNOMED CT are usually in `CodeableConcept` elements, so you work with them as `CodeableConcept` values, not enums.

## The Kotlin type depends on the binding strength

A FHIR binding has a [strength](https://hl7.org/fhir/R5/terminologies.html#strength) that says how strictly the element must use codes from its ValueSet. For a `code` element, the strength decides the Kotlin type.

| Binding strength | Kotlin type | Example | Codes not in the ValueSet |
| --- | --- | --- | --- |
| `required` | `Enumeration<T>` | `Patient.gender` is `Enumeration<AdministrativeGender>` | Decoding fails |
| `extensible` or `preferred` | `ExtensibleEnumeration<T>` | `Expression.language` is `ExtensibleEnumeration<ExpressionLanguage>` | Kept as `ExtensibleEnumeration.Custom` |
| `example`, or the ValueSet has no expansion | `Code` | | Accepted |

`Enumeration` and `ExtensibleEnumeration` also hold the element's `id` and extensions, like every primitive.

## The generated enums

An enum is generated for each ValueSet that a `code` element is bound to. All enums are in the `terminologies` package of their FHIR version, for example `dev.ohs.fhir.model.r4.terminologies.AdministrativeGender`.

Each enum constant has a `code`, `system`, and `display`. To get a constant from a code, use `fromCode()`. It throws `IllegalArgumentException` if the code is not in the ValueSet.

```kotlin
import dev.ohs.fhir.model.r4.terminologies.AdministrativeGender

val female = AdministrativeGender.fromCode("female")
female.code    // "female"
female.system  // "http://hl7.org/fhir/administrative-gender"
female.display // "Female"
```

## Required bindings

An element with a `required` binding is an `Enumeration<T>`. Wrap the enum constant to set it, and read `value` to get it.

```kotlin
import dev.ohs.fhir.model.r4.Enumeration
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.terminologies.AdministrativeGender

val patient = Patient(gender = Enumeration(value = AdministrativeGender.Female))

val gender: AdministrativeGender? = patient.gender?.value
```

If JSON contains a code that is not in the ValueSet, decoding throws `IllegalArgumentException`. See [Handle decoding failures](/fhir-foundations/kotlin-fhir/serialization/#handle-decoding-failures).

## Extensible and preferred bindings

An element with an `extensible` or `preferred` binding is an `ExtensibleEnumeration<T>`. It is one of two classes.

- `Predefined` holds an enum constant, for a code in the ValueSet.
- `Custom` holds the code as a string, for a code not in the ValueSet.

Both have a `code` property with the code as a string.

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

### A required binding that accepts other codes

`ImplementationGuide.license` has a `required` binding to the SPDX license ValueSet, but it is generated as `ExtensibleEnumeration<T>`. The specification allows new SPDX license identifiers for this element, and SPDX has added identifiers since the ValueSet was published. This applies to R4, R4B, and R5.

## ValueSets without enums

No enum is generated for these ValueSets, in R4, R4B, or R5.

| ValueSet | Reason |
| --- | --- |
| `http://hl7.org/fhir/ValueSet/mimetypes` | It has no fixed list of codes |
| `http://hl7.org/fhir/ValueSet/all-languages` | It has no fixed list of codes |
| `http://hl7.org/fhir/ValueSet/use-context` | It has more than 3800 codes, too many to compile |

## How codes become enum names

Enum constants are created from the codes in the ValueSet expansions published with the FHIR specification. A code is often not a valid Kotlin name, so it is changed by these steps, in order.

| Step | Rule | Code | Result |
| --- | --- | --- | --- |
| 1 | If the code is a URL, keep only the part after the last dot | `http://hl7.org/fhirpath/System.DateTime` | `DateTime` |
| 2 | Replace a comparison or arithmetic symbol with a word, from the table below | `>=` | `GreaterThanOrEqualTo` |
| 3 | Replace every other character that is not a letter or digit with an underscore | `4.0.1` | `4_0_1` |
| 4 | If the result starts with a digit, add an underscore at the start | `4_0_1` | `_4_0_1` |
| 5 | Capitalize the first letter of each part between underscores | `entered_in_error` | `Entered_In_Error` |

| Symbol | Word |
| --- | --- |
| `>=` | `GreaterThanOrEqualTo` |
| `>` | `GreaterThan` |
| `<=` | `LessThanOrEqualTo` |
| `<` | `LessThan` |
| `!=` or `<>` | `NotEqualTo` |
| `=` | `EqualTo` |
| `*` | `Multiply` |
| `+` | `Plus` |
| `-` | `Minus` |
| `/` | `Divide` |
| `%` | `Percent` |

For example, `text/fhirpath` becomes `Text_Fhirpath`, and `application/x-fhir-query` becomes `Application_X_Fhir_Query`. If you are not sure of a name, use `fromCode()` with the code, or check the enum in your IDE.

## Next step

[Serialize and deserialize](/fhir-foundations/kotlin-fhir/serialization/) covers reading and writing FHIR JSON.
