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

Add Kotlin FHIR to a project, create a resource, and convert it to and from FHIR JSON. This page uses FHIR R4. For R4B or R5, replace `r4` with `r4b` or `r5` in every artifact and package name.

## Prerequisites

- A Kotlin project. You do not need the serialization compiler plugin, because the serializers are already generated in the library.
- For JVM projects, Java 11 or newer.
- A target platform listed in the [support matrix](/fhir-foundations/platform-support/).

## Add the dependency

The artifacts are published to Maven Central. Add `mavenCentral()` to your repositories if it is not there already.

```kotlin
// settings.gradle.kts or build.gradle.kts
repositories {
  mavenCentral()
}
```

In a Kotlin Multiplatform project, add the dependency to `commonMain` of your shared module. It is then available on every target.

```kotlin
// composeApp/build.gradle.kts or shared/build.gradle.kts
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("dev.ohs.fhir:fhir-model-r4:1.0.0")
    }
  }
}
```

In an Android or JVM Gradle project, add it to the `dependencies` block. Gradle selects the correct platform artifact.

```kotlin
// app/build.gradle.kts
dependencies {
  implementation("dev.ohs.fhir:fhir-model-r4:1.0.0")
}
```

In a Maven project, use the JVM artifact, which has the `-jvm` suffix. Maven cannot select a platform artifact for you.

```xml
<dependency>
  <groupId>dev.ohs.fhir</groupId>
  <artifactId>fhir-model-r4-jvm</artifactId>
  <version>1.0.0</version>
</dependency>
```

These versions are for using Kotlin FHIR on its own. Kotlin FHIRPath, Kotlin FHIR Engine, and Kotlin FHIR Data Capture are built against an earlier Kotlin FHIR version. If your app uses any of them, use the version listed in [Pairing the libraries](/fhir-foundations/versions/#pairing-the-libraries).

Use `fhir-model` instead of `fhir-model-r4` only if you need R4, R4B, and R5 together.

## Create a resource

Resource classes are in the package `dev.ohs.fhir.model.r4`. Each FHIR primitive has its own class named after the FHIR type. For example, the FHIR `string` type is `dev.ohs.fhir.model.r4.String`. Import it with an alias so it does not clash with Kotlin's `String`.

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

Optional elements have default values, so you only pass the elements you need.

## Serialize and deserialize

Use a standard `kotlinx.serialization` `Json` instance.

```kotlin
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.Resource
import kotlinx.serialization.json.Json

val json = Json { prettyPrint = true }

val encoded = json.encodeToString(patient)
val decoded = json.decodeFromString<Patient>(encoded)

// If you do not know the resource type in advance, decode as Resource
val resource = json.decodeFromString<Resource>(encoded)
```

When you decode as `Resource`, the library reads the `resourceType` property and returns an instance of the matching class, such as `Patient`. You can then use `when (resource)` to handle each type.

## Checkpoint

`encoded` contains FHIR R4 JSON with `"resourceType": "Patient"`, and `decoded == patient` is `true`. If decoding fails, the JSON usually does not match the model, for example because it uses a different FHIR version.

## Next step

[How the model maps FHIR](/fhir-foundations/kotlin-fhir/how-the-model-maps-fhir/) explains the ideas the rest of this documentation relies on. To go straight to tasks, see [Create and change resources](/fhir-foundations/kotlin-fhir/working-with-resources/).
