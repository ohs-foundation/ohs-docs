---
title: Get started with Kotlin FHIR Engine
description: Add the engine, initialize it once at startup, and store your first resource on device.
slug: /fhir-foundations/kotlin-fhir-engine/get-started/
sidebar_position: 20
guide_type: Get started
guide_status: ready
guide_focus: A FHIR resource persisted and read back on device
repository: kotlin-fhir-engine
---

## Goal and scope

Add the engine to a Kotlin Multiplatform or Android project, initialize it, and run basic create-read-update-delete against local storage. Sync against a server is the next guide.

## Prerequisites

- A supported [target platform](/fhir-foundations/platform-support/). Note Android minSdk 26 and no Intel iOS simulator target.
- Browser targets need additional project setup before anything runs. Do [the web setup](/fhir-foundations/kotlin-fhir-engine/web-targets/) first if you target JS or Wasm.

## Add the dependencies

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("dev.ohs.fhir:fhir-engine:2.0.0-alpha02")
      implementation("dev.ohs.fhir:fhir-model-r4:1.0.0-beta05")
    }
  }
}
```

The model dependency is explicit because the engine's API signatures use those R4 types. Your code constructs `Patient` objects, not engine-specific wrappers. Keep the model version aligned with what the engine builds against, as listed in [versions and compatibility](/fhir-foundations/versions/).

## Initialize once, then use everywhere

```kotlin
import dev.ohs.fhir.engine.FhirEngineConfiguration
import dev.ohs.fhir.engine.FhirEngineProvider
import dev.ohs.fhir.engine.ServerConfiguration

FhirEngineProvider.init(
  FhirEngineConfiguration(
    // Optionally, a remote server to sync against.
    serverConfiguration = ServerConfiguration(baseUrl = "https://hapi.fhir.org/baseR4/"),
  ),
  platformContext, // Android passes applicationContext, other platforms pass Unit
)

val fhirEngine = FhirEngineProvider.getInstance(platformContext)
```

`init` runs once at application startup. On Android the platform context is the application `Context`, and every other platform passes `Unit`. `ServerConfiguration` is only required if you sync. A purely local store can omit it.

## Create, read, update, delete

```kotlin
import dev.ohs.fhir.engine.delete
import dev.ohs.fhir.engine.get
import dev.ohs.fhir.model.r4.Patient

// Create. Returns the assigned ids.
val ids = fhirEngine.create(Patient(id = "patient-1"))

// Read with the reified helper.
val patient = fhirEngine.get<Patient>("patient-1")

// Update and delete.
fhirEngine.update(patient)
fhirEngine.delete<Patient>("patient-1")
```

All of these are suspend functions, so call them from a coroutine. Every local mutation is also recorded in the engine's change log, which is what sync later uploads.

## Where the data lives

- **Android** uses the app's `filesDir`.
- **iOS** uses Application Support.
- **Desktop** uses `~/.fhir-engine`, unless you set `storageDirectory` in the configuration.
- **Browser** uses the origin-private file system (OPFS).

Data is stored unencrypted on all platforms.

## Checkpoint

`fhirEngine.get<Patient>("patient-1")` returns the resource you created, and it survives an app restart. A `ResourceNotFoundException` means the create did not run or ran against a different storage directory.

## Next steps

[Search the local store](/fhir-foundations/kotlin-fhir-engine/persist-and-search/), then [synchronize with a server](/fhir-foundations/kotlin-fhir-engine/synchronization/).
