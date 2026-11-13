---
title: Read Bundles and server responses
description: Decode the JSON a FHIR server returns, read the resources in a Bundle, handle OperationOutcome, and read extensions.
slug: /fhir-foundations/kotlin-fhir/server-responses/
sidebar_position: 60
guide_type: Usage guide
guide_status: ready
guide_focus: Turning real FHIR server responses into Kotlin objects
repository: kotlin-fhir
---

## Goal and scope

A FHIR server can return a single resource, a Bundle of search results, or an `OperationOutcome` that describes an error. This page shows how to decode each of them and read the data. Kotlin FHIR does not make HTTP requests. Use any HTTP client to get the response body as a string. Examples use R4.

## Configure the decoder for server data

Data from servers and other systems can contain properties the model does not define, such as elements from a newer FHIR version. Turn on `ignoreUnknownKeys` so these properties are skipped instead of making decoding fail.

```kotlin
import kotlinx.serialization.json.Json

val json = Json { ignoreUnknownKeys = true }
```

Create this `Json` instance once and reuse it.

## Decode a response of unknown type

If the response could be a resource or an error, decode it as `Resource` and check the type.

```kotlin
import dev.ohs.fhir.model.r4.OperationOutcome
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.Resource

try {
  when (val resource = json.decodeFromString<Resource>(responseBody)) {
    is Patient -> { /* use the patient */ }
    is OperationOutcome -> { /* read resource.issue to see what went wrong */ }
    else -> { /* a resource type you did not expect */ }
  }
} catch (e: IllegalArgumentException) {
  // The body is not valid FHIR JSON for this model.
  // This also catches SerializationException.
}
```

## Read the resources in a Bundle

A search returns a `Bundle`. Each item in `entry` can hold one resource, as a `Resource`. Pick out the types you need.

```kotlin
import dev.ohs.fhir.model.r4.Bundle
import dev.ohs.fhir.model.r4.OperationOutcome
import dev.ohs.fhir.model.r4.Patient

val bundle = json.decodeFromString<Bundle>(responseBody)

val patients: List<Patient> = bundle.entry.mapNotNull { it.resource as? Patient }
val outcomes: List<OperationOutcome> = bundle.entry.mapNotNull { it.resource as? OperationOutcome }
```

A search Bundle can include an `OperationOutcome` with warnings about the search, so check for one if your app needs to show them.

Other useful values in a Bundle are listed below.

| Value | Code |
| --- | --- |
| Total number of matches, if the server reports it | `bundle.total?.value` |
| Full URL of an entry | `bundle.entry[0].fullUrl?.value` |
| Links to other pages of results | `bundle.link` |

## Read an extension

Extensions are in the `extension` list of a resource or element. Find the extension by its `url`, then read its value. The value is a choice element, so use the `as` function for the type you expect.

```kotlin
val nickname: String? = patient.extension
  .firstOrNull { it.url == "http://example.org/fhir/StructureDefinition/nickname" }
  ?.value?.asString()?.value?.value
```

The chain has two `value` steps at the end. The first gives the FHIR `String`, and the second gives the Kotlin `String`.

## Store a resource under your own id

When you store resources from a server, you may need to give them a local id. Decoded resources are often typed as `Resource`, which has no `copy()`. Use `toBuilder()`, which works on every resource.

```kotlin
val stored: Resource = resource.toBuilder().apply { id = "local-123" }.build()
```

## When decoding fails

Most failures with real data have one of three causes.

- **A property the model does not know.** Turn on `ignoreUnknownKeys`, as shown above.
- **A code that is not in a `required` ValueSet.** The data does not follow the specification. If you believe the specification allows the code, report it in the [kotlin-fhir issue tracker](https://github.com/ohs-foundation/kotlin-fhir/issues).
- **Data from a different FHIR version.** Use the artifact for the FHIR version the server uses, such as `fhir-model-r4b` for an R4B server.

[Troubleshooting](/fhir-foundations/kotlin-fhir/troubleshooting/) lists the error messages and their fixes.

## Next step

[Read and write FHIR JSON](/fhir-foundations/kotlin-fhir/serialization/) covers all encoding and decoding options.
