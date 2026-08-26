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

You will learn how to configure Gradle version catalogs, initialize local SQLite storage with `kotlin-fhir-engine`, persist patient records locally, and synchronize changes with a remote FHIR server.

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
      implementation("dev.ohs.fhir:fhir-engine:2.0.0-alpha02")
      implementation("dev.ohs.fhir:fhir-model-r4:1.0.0-beta05")
      implementation("dev.ohs.fhir:fhir-path-r4:1.0.0-beta05")
    }
  }
}
```

## Step 2 · Initialize the local FHIR engine

Create and configure a local SQLite database driver wrapped by `FhirEngine`.

```kotlin
import dev.ohs.fhir.engine.FhirEngine
import dev.ohs.fhir.engine.FhirEngineConfiguration
import dev.ohs.fhir.engine.FhirEngineProvider
import dev.ohs.fhir.engine.ServerConfiguration

FhirEngineProvider.init(
  FhirEngineConfiguration(
    serverConfiguration = ServerConfiguration(baseUrl = "http://localhost:8083/fhir/"),
  ),
  platformContext, // Android passes applicationContext, other platforms pass Unit
)

val fhirEngine: FhirEngine = FhirEngineProvider.getInstance(platformContext)
```

## Step 3 · Create and persist a patient record

Create a type-safe `Patient` resource using the Kotlin FHIR model and write it to local storage.

```kotlin
import dev.ohs.fhir.model.r4.FhirString
import dev.ohs.fhir.model.r4.HumanName
import dev.ohs.fhir.model.r4.Patient

val patient = Patient(
  id = "pat-101",
  name = listOf(
    HumanName(
      family = FhirString("Smith"),
      given = listOf(FhirString("Jane")),
    )
  ),
)

// Create is a suspend function that persists to SQLite
fhirEngine.create(patient)
```

## Step 4 · Query local records offline

Execute strongly-typed search queries against the local SQLite database without network access.

```kotlin
import dev.ohs.fhir.engine.search.StringClientParam
import dev.ohs.fhir.engine.search.search
import dev.ohs.fhir.model.r4.Patient

val results = fhirEngine.search<Patient> {
  filter(StringClientParam("family"), { value = "Smith" })
}

val patients = results.map { it.resource }
```

## Step 5 · Synchronize with a central FHIR server

Execute a synchronization cycle to exchange local modifications with the remote server.

```kotlin
import dev.ohs.fhir.engine.sync.FhirSyncTask
import dev.ohs.fhir.engine.sync.runSync

// Execute a sync cycle against the configured server
val status = mySyncTask.runSync("patient-sync") { progress ->
  println("Sync progress " + progress)
}
```

## Where to go next

- Learn how to add form capture in the [SDC Questionnaire Tutorial](/tutorials-and-codelabs/sdc-questionnaires/).
- Explore the [Kotlin FHIR Engine documentation](/fhir-foundations/kotlin-fhir-engine/).
