---
title: How the model maps FHIR
description: How FHIR resources, primitives, choice elements, coded values, and JSON rules become Kotlin types in Kotlin FHIR.
slug: /fhir-foundations/kotlin-fhir/how-the-model-maps-fhir/
sidebar_position: 30
guide_type: Concept
guide_status: ready
guide_focus: The design of the generated model, before you write code against it
repository: kotlin-fhir
---

## Goal and scope

This page explains how Kotlin FHIR represents FHIR in Kotlin and why. It has no procedures. The task guides that follow link back here when they rely on these ideas. Examples use R4. R4B and R5 follow the same rules.

## Generated from the specification

Every class is generated from the StructureDefinitions in the official FHIR packages, `hl7.fhir.r4.core`, `hl7.fhir.r4b.core`, and `hl7.fhir.r5.core`. Each StructureDefinition becomes one Kotlin file with one class. For example, `StructureDefinition-Patient.json` becomes `Patient.kt` with the class `Patient`.

Only the base specification is generated. Profiles, logical models, constraints (invariants), and the FHIR patterns are not part of the model.

Each class and property has the specification's definition as KDoc, so your IDE shows the FHIR documentation when you hover over the code.

## Resources are immutable data classes

Each resource and data type is a Kotlin `data class`. Its properties cannot be changed after it is created. This makes resources safe to share between threads and to compare with `==`.

To change a resource, you create a new one, either with `copy()` or with a builder. Every class has a nested `Builder`, and `toBuilder()` converts a resource into one. See [Create and change resources](/fhir-foundations/kotlin-fhir/working-with-resources/).

## The class hierarchy follows FHIR

`Patient` extends `DomainResource`, which extends `Resource`. Code that accepts `Resource` therefore accepts any resource, and code that accepts `DomainResource` can read `text`, `contained`, and `extension` on any resource that has them.

A BackboneElement, such as `Patient.contact`, becomes a class nested inside its resource, such as `Patient.Contact`.

The FHIR patterns, such as `Event`, `Request`, and `Definition`, are not interfaces. Resources that follow a pattern may name and type their elements differently. For example, `Observation` uses `effective[x]` for the time it describes, and `Procedure` uses `performed[x]`. A Kotlin interface cannot describe that.

## Primitives are classes

In FHIR, a primitive value such as a string or a date can have an `id` and extensions. A plain Kotlin `String` cannot hold those, so each FHIR primitive type is a class named after it. The FHIR `string` type is `dev.ohs.fhir.model.r4.String`, and `boolean` is `dev.ohs.fhir.model.r4.Boolean`.

The value itself is in the `value` property. Its Kotlin type depends on the FHIRPath type the specification uses for that value.

| FHIRPath type | Kotlin type of `value` |
| --- | --- |
| `System.Boolean` | `kotlin.Boolean` |
| `System.String` | `kotlin.String` |
| `System.Integer` | `kotlin.Int` |
| `System.Long` | `kotlin.Long` |
| `System.Decimal` | `FhirDecimal` |
| `System.Date` | `FhirDate` |
| `System.DateTime` | `FhirDateTime` |
| `System.Time` | `kotlinx.datetime.LocalTime` |

There is one exception. The specification gives `positiveInt` and `unsignedInt` the type `System.String`, but the model uses `kotlin.Int` for them.

Three of these types come from the library, because Kotlin's standard types cannot represent FHIR exactly.

- **`FhirDecimal`** keeps the exact digits of a decimal, including trailing zeros. FHIR treats `1.50` and `1.5` as different values, because the number of digits shows precision.
- **`FhirDate`** can be a year, a year and month, or a full date, because FHIR allows partial dates.
- **`FhirDateTime`** can be any of those, or a full date and time with a UTC offset.

## Choice elements are sealed interfaces

A FHIR choice element, written with `[x]`, can hold one of several types. For example, `Patient.deceased[x]` holds a `boolean` or a `dateTime`. The model generates a sealed interface for it, such as `Patient.Deceased`, with one class for each allowed type. The compiler only accepts the allowed types, and a `when` over the interface must handle every one.

Every choice interface implements `FhirChoice`. Its `value` property returns the wrapped value as `Any`.

## Coded values use enums when the type is `code`

Some elements must hold a code from a ValueSet. How the model types them depends on two things.

The first is the element's FHIR type. Only elements of type `code`, such as `Patient.gender`, use enums. Elements of type `CodeableConcept` or `Coding`, such as `Observation.code`, keep those types. Clinical codes such as LOINC and SNOMED CT are usually in `CodeableConcept` elements.

The second is the binding strength, which says how strictly the element must use codes from its ValueSet.

| Binding strength | Kotlin type | A code that is not in the ValueSet |
| --- | --- | --- |
| `required` | `Enumeration<T>` | Fails to decode |
| `extensible` or `preferred` | `ExtensibleEnumeration<T>` | Is kept as `ExtensibleEnumeration.Custom` |
| `example`, or the ValueSet has no expansion | `Code` | Is accepted |

The enums are generated from the ValueSet expansions published with the specification, and are in the `terminologies` package. See [Work with coded values](/fhir-foundations/kotlin-fhir/coded-values/).

## Serializers follow FHIR JSON rules

FHIR JSON has rules that ordinary Kotlin serialization does not follow. Each class therefore has a generated serializer that handles them.

- **Extensions on primitives.** FHIR writes a primitive's value under its name, and its `id` and extensions under the same name with an underscore, such as `"birthDate"` and `"_birthDate"`. The serializer combines both into one Kotlin property.
- **Choice elements.** FHIR puts the type in the property name, such as `deceasedBoolean`. The serializer reads whichever name is present and creates the matching class.
- **Resource types.** Every resource has a `resourceType` property. It is always written, and it is used to choose the class when you decode as `Resource`.

When you decode and then encode a resource, the output uses one consistent form. Properties are in the model's order, extra trailing zeros in times and date-times are removed, and a `+00:00` offset is written as `Z`. The data has the same meaning, but the text can differ from the original. Decimals keep their original text.

## Search parameters are compiled, not interpreted

Each FHIR search parameter has a FHIRPath expression that selects values from a resource. When the library is built, the generator turns most of these expressions into plain Kotlin functions. Your app can then get search values without a FHIRPath engine. Expressions the generator cannot handle are listed as unsupported, and you can evaluate them with [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/). See [Extract search parameters](/fhir-foundations/kotlin-fhir/search-parameters/).

## Next step

[Create and change resources](/fhir-foundations/kotlin-fhir/working-with-resources/) shows how to build and modify resources in code.
