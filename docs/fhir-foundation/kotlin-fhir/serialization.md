---
title: Serialize and deserialize
description: Reading and writing FHIR JSON with kotlinx.serialization, and which Json configuration options apply.
slug: /fhir-foundation/kotlin-fhir/serialization/
sidebar_position: 40
guide_type: Usage guide
guide_status: ready
guide_focus: Spec-compliant FHIR JSON in and out of the generated model
repository: kotlin-fhir
---

## Goal and scope

Kotlin FHIR uses `kotlinx.serialization` for JSON, with a generated serializer per type. There is no library-specific JSON wrapper: you configure and use a standard `Json` instance, which is thread-safe and shareable across coroutines.

## Encode and decode

```kotlin
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.Resource
import kotlinx.serialization.json.Json

val json = Json { prettyPrint = true }

val text = json.encodeToString(patient)
val patientAgain = json.decodeFromString<Patient>(text)
```

When the concrete type is unknown — a payload from a server, a mixed Bundle — decode the base `Resource` type. A polymorphic serializer dispatches on the JSON `resourceType` field and returns the concrete class:

```kotlin
val resource: Resource = json.decodeFromString<Resource>(text)
```

## What the generated serializers handle for you

FHIR JSON deviates from what a naive data-class mapping would produce, and the generated serializers absorb those deviations:

- **Primitive elements with extensions.** FHIR serializes a primitive's value under its field name and its `id`/extensions under an underscore-prefixed sibling (`"birthDate"` and `"_birthDate"`). The serializers merge and split these pairs transparently.
- **Choice types.** A sealed-interface element like `deceased[x]` reads and writes the spec's expanded field names (`deceasedBoolean`, `deceasedDateTime`).
- **Resource polymorphism** via `resourceType`, including resources nested in `contained` and Bundles.

## Json configuration limits

Because the generated serializers control encoding directly, several `Json` options behave differently than on ordinary Kotlin classes:

- `explicitNulls`, `encodeDefaults`, `useAlternativeNames`, and `classDiscriminator` have no effect.
- `useArrayPolymorphism` and `namingStrategy` produce JSON that is not FHIR-conformant — do not enable them for FHIR payloads.
- Options like `prettyPrint`, `ignoreUnknownKeys`, and `isLenient` work as usual.

## Other formats

JSON is the only format the library targets and tests. FHIR XML and Turtle are not supported. Other `kotlinx.serialization` formats (such as ProtoBuf) may run against the generated serializers, but they are untested and their output is not a FHIR exchange format — treat JSON as the wire format.

## Next step

[Extract search parameters](/fhir-foundation/kotlin-fhir/search-parameters/) — pulling indexable values out of resources without a FHIRPath engine.
