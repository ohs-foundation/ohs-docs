---
title: Get started with Kotlin FHIR
description: Add the data-model dependency to a Kotlin Multiplatform or Android project and round-trip your first resource.
slug: /fhir-foundations/kotlin-fhir/get-started/
sidebar_position: 20
guide_type: Get started
guide_status: ready
guide_focus: A first FHIR resource created and serialized in Kotlin
repository: kotlin-fhir
---

## Goal and scope

Add Kotlin FHIR to a project, create a resource in code, and serialize it to FHIR JSON. Everything here uses FHIR R4. Substitute `r4b` or `r5` throughout for the other versions.

## Prerequisites

- A Kotlin project on a current Kotlin release. The serializers ship pre-generated in the library, so no compiler plugin is needed.
- For JVM projects, a Java 21 runtime, because the current release candidate's JVM artifact targets Java 21.
- Your target platform on the [support matrix](/fhir-foundations/platform-support/).

## Add the dependency

In a Kotlin Multiplatform project the dependency goes in `commonMain`.

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("dev.ohs.fhir:fhir-model-r4:1.0.0-rc02")
    }
  }
}
```

In an Android-only or JVM-only project the same coordinate goes in the ordinary `dependencies` block.

```kotlin
dependencies {
  implementation("dev.ohs.fhir:fhir-model-r4:1.0.0-rc02")
}
```

Use `fhir-model` instead of `fhir-model-r4` only if you need R4, R4B, and R5 together. Check [versions and compatibility](/fhir-foundations/versions/) before combining this library with the rest of the stack.

## Create a resource

Resources are plain Kotlin classes in `dev.ohs.fhir.model.r4`. FHIR primitives are wrapped types named after the FHIR type, so the FHIR `string` type is literally `dev.ohs.fhir.model.r4.String`. Import those with an alias to avoid clashing with Kotlin's built-ins.

```kotlin
import dev.ohs.fhir.model.r4.Date
import dev.ohs.fhir.model.r4.FhirDate
import dev.ohs.fhir.model.r4.HumanName
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.String as FhirString

val patient = Patient(
  id = "patient-01",
  name = listOf(HumanName(given = listOf(FhirString(value = "John")))),
  birthDate = Date(value = FhirDate.fromString("2000-01-01")),
)
```

## Serialize and deserialize

Use a plain `kotlinx.serialization` `Json` instance. The generated serializers do the FHIR-specific work.

```kotlin
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.Resource
import kotlinx.serialization.json.Json

val json = Json { prettyPrint = true }

val encoded = json.encodeToString(patient)
val decoded = json.decodeFromString<Patient>(encoded)

// When the resource type is not known in advance, decode the base type.
val resource = json.decodeFromString<Resource>(encoded)
```

Decoding as `Resource` dispatches on the JSON `resourceType` field and returns the concrete class, so a `when (resource)` over resource types works as expected.

## Checkpoint

`encoded` is spec-compliant FHIR R4 JSON with `"resourceType": "Patient"`, and `decoded == patient`. A decoding failure usually means the input JSON does not match the model, for example a payload from a different FHIR version.

## Next step

[Work with resources in more depth](/fhir-foundations/kotlin-fhir/working-with-resources/), covering modification, dates and decimals, and choice types.
