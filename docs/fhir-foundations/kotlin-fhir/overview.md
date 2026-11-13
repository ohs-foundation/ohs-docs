---
title: Kotlin FHIR
description: A lean, code-generated implementation of the FHIR data model for Kotlin Multiplatform, with JSON serialization.
slug: /fhir-foundations/kotlin-fhir/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: Representing FHIR resources as idiomatic Kotlin
repository: kotlin-fhir
---

## What it is

Kotlin FHIR is the HL7 FHIR data model as Kotlin classes. It is the base of the FHIR Foundations stack. Every resource and data type is generated from the FHIR specification, and each class comes with a serializer that reads and writes FHIR JSON. FHIR R4, R4B, and R5 each have their own artifact.

The library has no logging, networking, XML, or platform-specific dependencies. This is why it runs on Android, iOS, JVM, JavaScript, Wasm, macOS, and Linux. Its only runtime dependencies are `kotlinx-serialization`, `kotlinx-datetime`, and the `bignum` arbitrary-precision number library.

## What you get

- **A class for every resource and data type.** Choice elements such as `value[x]` are sealed interfaces, so the compiler only accepts the types the specification allows.
- **Enums for coded elements.** An element of the FHIR type `code` is typed with an enum generated from its ValueSet, such as `AdministrativeGender`. The binding strength decides whether other codes are allowed. Elements of type `CodeableConcept` or `Coding` keep those types. See [Work with coded values](/fhir-foundations/kotlin-fhir/coded-values/).
- **Special types for dates and decimals.** `FhirDate` and `FhirDateTime` support partial dates such as a year only. `FhirDecimal` keeps the exact digits of a decimal.
- **JSON serializers.** They handle the parts of FHIR JSON that plain Kotlin serialization cannot, such as extensions on primitive values (the `_field` properties), choice elements, and decoding a resource by its `resourceType`. You use a standard `kotlinx.serialization.Json` instance.
- **Search parameter extraction.** For each resource, a `SearchParams` object extracts search values as plain Kotlin code, without a FHIRPath engine. Each parameter also keeps its FHIRPath expression, so you can evaluate it with [Kotlin FHIRPath](/fhir-foundations/kotlin-fhirpath/) when the generated code does not cover it.
- **Tests against the official examples.** On every change, about 11,000 example resources from the HL7 example packages for R4, R4B, and R5 are decoded, encoded again, and compared with the original JSON.

## Artifacts

| Artifact | Contents |
| --- | --- |
| `fhir-model-r4` | FHIR R4 model, package `dev.ohs.fhir.model.r4` |
| `fhir-model-r4b` | FHIR R4B model, package `dev.ohs.fhir.model.r4b` |
| `fhir-model-r5` | FHIR R5 model, package `dev.ohs.fhir.model.r5` |
| `fhir-model` | All three versions in one artifact |

Depend only on the FHIR version you use. Use `fhir-model` only if your code handles more than one FHIR version.

## What it is not

- **Not a validator.** Profiles and constraints (invariants) are not checked. The only check is that a `code` element with a `required` binding holds a code from its ValueSet when decoded.
- **Not a client or a database.** It has no networking or storage. [Kotlin FHIR Engine](/fhir-foundations/kotlin-fhir-engine/) provides those.
- **JSON only.** XML and Turtle are not supported. Other `kotlinx.serialization` formats may work, but only JSON is tested.
- **No profiles or logical models.** Only the base specification is generated. The library has classes such as `ValueSet` and `CodeSystem`, but it does not include the ValueSets and CodeSystems published with the specification. The FHIR patterns `Event`, `Request`, and `Definition` are not interfaces, because resources may rename their elements, which Kotlin inheritance cannot express.
- **Not every search parameter is extractable.** Some FHIRPath expressions are not supported by the generator, and those parameters throw `NotImplementedError`. See [Extract search parameters](/fhir-foundations/kotlin-fhir/search-parameters/).

## How this documentation is organized

| If you want to | Read |
| --- | --- |
| Try the library for the first time | [Get started](/fhir-foundations/kotlin-fhir/get-started/) |
| Understand how FHIR becomes Kotlin | [How the model maps FHIR](/fhir-foundations/kotlin-fhir/how-the-model-maps-fhir/) |
| Build or change resources | [Create and change resources](/fhir-foundations/kotlin-fhir/working-with-resources/) |
| Set or read codes | [Work with coded values](/fhir-foundations/kotlin-fhir/coded-values/) |
| Handle data from a FHIR server | [Read Bundles and server responses](/fhir-foundations/kotlin-fhir/server-responses/) |
| Encode and decode JSON | [Read and write FHIR JSON](/fhir-foundations/kotlin-fhir/serialization/) |
| Build a search index | [Extract search parameters](/fhir-foundations/kotlin-fhir/search-parameters/) |
| Fix an error | [Troubleshooting](/fhir-foundations/kotlin-fhir/troubleshooting/) |
| Choose versions | [Versions and compatibility](/fhir-foundations/versions/) |

The [repository documentation](https://github.com/ohs-foundation/kotlin-fhir/tree/main/docs) has the detailed lists that change with each release, such as enum naming rules and supported search expressions.

## Next step

[Add the dependency and create your first resource](/fhir-foundations/kotlin-fhir/get-started/).
