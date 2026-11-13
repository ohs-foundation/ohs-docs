---
title: Serialize and deserialize
description: Reading and writing FHIR JSON with kotlinx.serialization, and which Json configuration options apply.
slug: /fhir-foundations/kotlin-fhir/serialization/
sidebar_position: 50
guide_type: Usage guide
guide_status: ready
guide_focus: Spec-compliant FHIR JSON in and out of the generated model
repository: kotlin-fhir
---

## Goal and scope

Kotlin FHIR reads and writes JSON with `kotlinx.serialization`. Every class has a generated serializer, and you use a standard `Json` instance. One `Json` instance can be shared across threads and coroutines. This page covers encoding, decoding, error handling, untrusted input, and `Json` options.

## Encode and decode

```kotlin
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.Resource
import kotlinx.serialization.json.Json

val json = Json { prettyPrint = true }

val text = json.encodeToString(patient)
val patientAgain = json.decodeFromString<Patient>(text)
```

If you do not know the resource type in advance, for example in a server response, decode as `Resource`. The library reads the `resourceType` property and returns an instance of the matching class.

```kotlin
val resource: Resource = json.decodeFromString<Resource>(text)
```

## Handle decoding failures

Decoding throws one of two exceptions.

- `SerializationException` if the JSON is malformed, a required element is missing, a property is unknown, or the `resourceType` is unknown.
- `IllegalArgumentException` if an element with a `required` binding has a code that is not in its ValueSet.

`SerializationException` is a subclass of `IllegalArgumentException`. Catch `IllegalArgumentException` to handle both.

```kotlin
import dev.ohs.fhir.model.r4.OperationOutcome
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.Resource

try {
  when (val resource = json.decodeFromString<Resource>(responseBody)) {
    is OperationOutcome -> { /* the server returned an error */ }
    is Patient -> { /* use the patient */ }
    else -> { /* handle other resource types */ }
  }
} catch (e: IllegalArgumentException) {
  // The JSON is not valid for this FHIR model.
  // This also catches SerializationException.
}
```

## Limit untrusted input

The library does not limit how deeply JSON is nested or how large a decimal is. Two kinds of input can use up memory or CPU.

- **Deeply nested JSON.** Nested elements, such as extensions inside extensions, are decoded recursively. Very deep nesting can cause a `StackOverflowError`.
- **Very large decimals.** A decimal with tens of thousands of digits, or arithmetic with a very large exponent such as `1e1000000`, can cause high CPU use or an `OutOfMemoryError`. This comes from the `bignum` library that `FhirDecimal` uses.

If you decode JSON from a source you do not control, check its size, nesting depth, and number lengths before decoding.

## What the serializers handle

FHIR JSON has rules that plain Kotlin serialization does not follow. The generated serializers handle them.

- **Extensions on primitive values.** FHIR writes a primitive's value under its name, and its `id` and extensions under the same name with an underscore, such as `"birthDate"` and `"_birthDate"`. The serializers combine the two into one Kotlin property and split them again when encoding.
- **Choice elements.** FHIR writes the type into the property name, such as `deceasedBoolean` or `deceasedDateTime`. The serializers read whichever name is present and create the matching Kotlin class.
- **Resource types.** Every resource in FHIR JSON has a `resourceType` property. It is written whether you encode a `Patient` or a `Resource`, and it is read to choose the class when decoding, including resources inside `contained` and Bundles.

### Encoded JSON can differ from the original

FHIR allows the same data to be written in slightly different ways. When you decode a resource and encode it again, the output always uses one form.

- Properties are written in the model's order.
- Extra trailing zeros in times and date-times are removed.
- A UTC offset of `+00:00` is written as `Z`.

The data means the same, but the text may not match the original exactly. Decimals are not changed, because `FhirDecimal` keeps their original text.

## Json options

This configuration suits JSON from servers and other systems.

```kotlin
import kotlinx.serialization.json.Json

val json = Json {
  prettyPrint = true       // indent the output
  ignoreUnknownKeys = true // skip properties the model does not have
  isLenient = true         // accept relaxed syntax, such as unquoted strings
}
```

Without `ignoreUnknownKeys`, a single unknown property makes decoding fail.

Some options do not work with the generated serializers.

- `explicitNulls`, `encodeDefaults`, `useAlternativeNames`, and `classDiscriminator` have no effect.
- `useArrayPolymorphism` and `namingStrategy` produce JSON that is not valid FHIR. Do not use them.

## Other formats

JSON is the only FHIR format the library supports and tests. FHIR XML and Turtle are not supported. You can use other `kotlinx.serialization` formats, such as ProtoBuf, but the output is not a FHIR format. ProtoBuf output has not been tested for compatibility with [Google's FHIR protocol buffers](https://github.com/google/fhir).

## Next step

[Extract search parameters](/fhir-foundations/kotlin-fhir/search-parameters/) covers getting search values from resources without a FHIRPath engine.
