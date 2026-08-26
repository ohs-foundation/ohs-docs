---
id: multiplatform-client
title: Codelab · Offline-First Multiplatform Client
description: Build a cross-platform mobile and desktop healthcare application with Kotlin FHIR and local SQLite storage.
slug: /tutorials-and-codelabs/multiplatform-client/
sidebar_label: Multiplatform Client Codelab
sidebar_position: 10
guide_type: Codelab
guide_status: ready
repository: kotlin-fhir-engine
---

## Overview

In this hands-on codelab, you will create an offline-capable healthcare application using Kotlin Multiplatform targeting Android, JVM Desktop, and iOS.

You will learn how to configure Gradle version catalogs, initialize encrypted SQLite storage with `kotlin-fhir-engine`, persist patient records locally, and synchronize changes with a remote FHIR server.

## Prerequisites

- JDK 21 installed
- Android Studio or IntelliJ IDEA
- Basic familiarity with Kotlin

## Step 1 · Set up your Gradle dependencies

Add the Open Health Stack dependencies to your shared `build.gradle.kts` file.

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("dev.ohs.fhir:fhir-model:0.1.0")
      implementation("dev.ohs.fhir:fhir-path:0.1.0")
      implementation("dev.ohs.fhir:fhir-engine:0.1.0")
    }
  }
}
```

## Step 2 · Initialize the local FHIR engine

Create and configure a local SQLite database driver wrapped by `FhirEngine`.

```kotlin
import dev.ohs.fhir.engine.FhirEngine
import dev.ohs.fhir.engine.FhirEngineProvider

val fhirEngine: FhirEngine = FhirEngineProvider.getInstance(context)
```

## Step 3 · Create and persist a patient record

Create a type-safe `Patient` resource using the Kotlin FHIR model and write it to local storage.

```kotlin
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.HumanName

val patient = Patient(
  id = "pat-101",
  name = listOf(
    HumanName(
      family = "Smith",
      given = listOf("Jane")
    )
  )
)

fhirEngine.create(patient)
```

## Step 4 · Query local records offline

Execute strongly-typed search queries against the local encrypted SQLite database without network access.

```kotlin
val patients = fhirEngine.search<Patient> {
  filter(Patient.FAMILY, { value = of("Smith") })
}
```

## Step 5 · Synchronize with a central FHIR server

Configure the background sync task to exchange new and updated FHIR bundles through the Info Gateway.

```kotlin
import dev.ohs.fhir.engine.sync.SyncJob

val syncJob = SyncJob(fhirEngine)
val result = syncJob.poll(
  serverUrl = "http://localhost:8083/fhir",
  authToken = sessionToken
)
```

## Where to go next

- Learn how to add form capture in the [SDC Questionnaire Tutorial](/tutorials-and-codelabs/sdc-questionnaires/).
- Explore the [Kotlin FHIR Engine documentation](/fhir-foundations/kotlin-fhir-engine/).
