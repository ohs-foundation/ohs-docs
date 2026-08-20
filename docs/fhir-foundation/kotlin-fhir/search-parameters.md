---
title: Extract search parameters
description: Using the generated search-parameter extractors to pull indexable values from resources, and what they cover.
slug: /fhir-foundation/kotlin-fhir/search-parameters/
sidebar_position: 50
guide_type: Usage guide
guide_status: ready
guide_focus: Building search indexes over FHIR resources without a runtime FHIRPath engine
repository: kotlin-fhir
---

## Goal and scope

Every FHIR search parameter is defined by a FHIRPath expression. Kotlin FHIR resolves those expressions at code-generation time and emits them as native Kotlin extraction functions, so you can pull search values out of a resource with no expression engine at runtime. This page covers the generated API and its coverage boundary.

## The generated objects

For each resource type there is a `SearchParams` object in the `search` subpackage, such as `dev.ohs.fhir.model.r4.search.PatientSearchParams`. Each parameter knows its `name`, `type`, original FHIRPath `expression`, and `target` resource types, and can extract typed values.

```kotlin
import dev.ohs.fhir.model.r4.search.PatientSearchParams

val birthDates: List<Date> = PatientSearchParams.birthdate.extractFrom(patient)
```

A fluent extension reads the other way around.

```kotlin
import dev.ohs.fhir.model.r4.search.extract

val birthDates: List<Date> = patient.extract(PatientSearchParams.birthdate)
```

## The `all` and `unsupported` lists

Not every search parameter's FHIRPath pattern is supported by the code generator. Each `SearchParams` object therefore exposes two lists.

- **`all`** holds the parameters whose extraction is implemented. It is safe to iterate, which is exactly what building a search index needs.

  ```kotlin
  PatientSearchParams.all.forEach { searchParam ->
    val values = searchParam.extractFrom(patient)
    // index the values
  }
  ```

- **`unsupported`** holds the parameters whose `extractFrom()` throws `NotImplementedError`. They are listed so the gap is visible, not so you call them.

Iterate `all`, never the union of every declared parameter.

## Coverage boundaries

- The repository documents which FHIRPath patterns the generator supports and which parameters fall outside them. Consult it when a parameter you need is in `unsupported`. For those parameters, the `expression` metadata still carries the original FHIRPath string, so you can evaluate it with [Kotlin FHIRPath](/fhir-foundation/kotlin-fhirpath/) instead.
- In the current release candidate, parameters whose expression is a union of several paths extract only the first branch. If a parameter matters clinically to your application, verify its extraction against your own data rather than assuming full-expression semantics.

## Where this sits in the stack

These extractors exist to make search indexing cheap and multiplatform. [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/) does not use them directly, since it evaluates search-parameter expressions with the FHIRPath engine for broader coverage. The two approaches are complementary. Use generated extraction when you control the parameter set and want zero interpretation overhead, and engine evaluation when you need arbitrary expressions.
