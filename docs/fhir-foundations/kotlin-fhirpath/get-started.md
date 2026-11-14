---
title: Get started with Kotlin FHIRPath
description: Add Kotlin FHIRPath to your project and evaluate a FHIRPath expression against a FHIR resource.
slug: /fhir-foundations/kotlin-fhirpath/get-started/
sidebar_position: 20
guide_type: Get started
guide_status: ready
guide_focus: A first FHIRPath expression evaluated against a resource
repository: kotlin-fhirpath
---

## Goal and scope

This page adds Kotlin FHIRPath to a project and evaluates an expression against a Patient. Examples use R4. The R4B and R5 engines work the same way.

## Prerequisites

- A Kotlin project on a supported [platform](/fhir-foundations/platform-support/). On the JVM, use Java 21 or newer.
- Resources as [Kotlin FHIR](/fhir-foundations/kotlin-fhir/) objects. The dependency below includes the Kotlin FHIR model, so you do not add it separately.

## Add the dependency

Add `mavenCentral()` to your repositories, then add the artifact for your FHIR version.

```kotlin
// build.gradle.kts
dependencies {
  implementation("dev.ohs.fhir:fhir-path-r4:1.0.0-beta06")
}
```

In a Kotlin Multiplatform project, add it to `commonMain.dependencies` instead. In a Maven project, use the `fhir-path-r4-jvm` artifact.

If your build also declares Kotlin FHIR, use the Kotlin FHIR version listed in [Pairing the libraries](/fhir-foundations/versions/#pairing-the-libraries).

## Evaluate an expression

```kotlin
import dev.ohs.fhir.fhirpath.FhirPathEngine
import dev.ohs.fhir.fhirpath.forR4
import dev.ohs.fhir.model.r4.Patient
import kotlinx.serialization.json.Json

val patient = Json { ignoreUnknownKeys = true }.decodeFromString<Patient>(patientJson)

val engine = FhirPathEngine.forR4()
val givenNames = engine.evaluateExpression("name.given", patient)
// [Peter, James, Jim]
```

`evaluateExpression()` returns a collection. It can hold several values, one value, or none.

## Turn on strict mode while you develop

By default, a misspelled property gives an empty result. In strict mode, it throws an `IllegalStateException` that names the property.

```kotlin
val strictEngine = FhirPathEngine.forR4(strictMode = true)

strictEngine.evaluateExpression("name.given1", patient)
// Throws IllegalStateException with "Property 'given1' does not exist on type 'HumanName'"
```

## Checkpoint

`engine.evaluateExpression("name.given", patient)` returns the given names of the patient. If it returns an empty collection, run the same expression on a strict engine to find the mistake.

## Next step

[How evaluation works](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/) explains what the engine returns and why.
