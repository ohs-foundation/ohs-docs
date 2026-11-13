---
title: Troubleshooting
description: Common Kotlin FHIR errors and surprises, what causes them, and how to fix them.
slug: /fhir-foundations/kotlin-fhir/troubleshooting/
sidebar_position: 90
guide_type: Technical reference
guide_status: ready
guide_focus: Recognizing and fixing common problems
repository: kotlin-fhir
---

## Goal and scope

Each entry below starts with what you see, then gives the cause and the fix. The error messages are from version 1.0.0 with FHIR R4.

## Build and setup

### Type mismatch between `kotlin.String` and the FHIR `String`

The compiler reports a type mismatch, with `kotlin.String` expected and `dev.ohs.fhir.model.r4.String` found, or the other way round.

**Cause.** FHIR primitives are classes, and the FHIR `string` type is named `String`. The Kotlin value is inside its `value` property.

**Fix.** Read `.value` to get the Kotlin value, and import the FHIR type with an alias, such as `import dev.ohs.fhir.model.r4.String as FhirString`. The same applies to `Boolean`, `Integer`, and the other primitives.

### A Maven project cannot find the classes

**Cause.** The `fhir-model-r4` artifact is a Kotlin Multiplatform artifact. Maven cannot choose the platform-specific artifact inside it.

**Fix.** Depend on `fhir-model-r4-jvm` instead. See [Get started](/fhir-foundations/kotlin-fhir/get-started/#add-the-dependency).

### `UnsupportedClassVersionError` at startup

**Cause.** The JVM artifact needs Java 11 or newer.

**Fix.** Run your app on Java 11 or newer.

### Errors after adding Kotlin FHIR Engine, Kotlin FHIRPath, or Kotlin FHIR Data Capture

The build or the app fails after you add one of these libraries next to Kotlin FHIR, for example with a missing method or class at runtime.

**Cause.** These libraries are built against a specific Kotlin FHIR version. If your build declares a different one, Gradle uses the higher version for every library.

**Fix.** Use the Kotlin FHIR version listed in [Pairing the libraries](/fhir-foundations/versions/#pairing-the-libraries).

## Decoding

### `Encountered an unknown key`

```text
JsonDecodingException: Encountered an unknown key 'bogus' at path: $
```

**Cause.** The JSON has a property the model does not define. This is common with data from other systems, and with data from a different FHIR version. For example, R5 data decoded with the R4 model fails on R5-only elements such as `contact.additionalName`.

**Fix.** If the data is for the right FHIR version, set `ignoreUnknownKeys = true` on your `Json` instance. If it is for another FHIR version, use that version's artifact, such as `fhir-model-r5`.

### `Unknown code ... for enum ...`

```text
IllegalArgumentException: Unknown code nope for enum AdministrativeGender
```

**Cause.** An element with a `required` binding has a code that is not in its ValueSet. This exception is an `IllegalArgumentException`, not a `SerializationException`, so `catch (e: SerializationException)` does not catch it.

**Fix.** Catch `IllegalArgumentException`, which covers both. If you believe the specification allows the code, report it in the [kotlin-fhir issue tracker](https://github.com/ohs-foundation/kotlin-fhir/issues). Some ValueSets have been changed to accept other codes after such reports.

### `Missing required property`

```text
SerializationException: Missing required property 'type' on Bundle
```

**Cause.** The JSON leaves out an element that the specification requires.

**Fix.** The data is not valid FHIR. Fix it at the source, or handle the exception.

### `Serializer for subclass ... is not found`

```text
JsonDecodingException: Serializer for subclass 'Bogus' is not found in the polymorphic scope of 'Resource'
```

**Cause.** The `resourceType` is not a resource type in this FHIR version. This also happens when you decode a resource that only exists in a newer FHIR version.

**Fix.** Check the `resourceType`, and use the artifact for the FHIR version of the data.

### `StackOverflowError` or `OutOfMemoryError` while decoding

**Cause.** The JSON is very deeply nested, or contains a decimal with a very large number of digits. The library does not limit either.

**Fix.** Check the size, nesting depth, and number lengths of untrusted JSON before decoding. See [Limit untrusted input](/fhir-foundations/kotlin-fhir/serialization/#limit-untrusted-input).

## Values

### Two date-times for the same moment are not equal

```kotlin
val noonUtc = FhirDateTime.DateTime(LocalDateTime(2024, 1, 1, 12, 0, 0), UtcOffset.ZERO)
val sevenNewYork = FhirDateTime.DateTime(LocalDateTime(2024, 1, 1, 7, 0, 0), UtcOffset(hours = -5))

noonUtc == sevenNewYork // false
```

**Cause.** `==` compares the date, time, and offset as written. It does not convert to one time zone first. This is tracked in [issue 87](https://github.com/ohs-foundation/kotlin-fhir/issues/87).

**Fix.** To check if two values are the same moment, convert both to an `Instant`.

```kotlin
import kotlinx.datetime.toInstant

noonUtc.dateTime.toInstant(noonUtc.utcOffset) == sevenNewYork.dateTime.toInstant(sevenNewYork.utcOffset) // true
```

### Encoded JSON is different from the input

Trailing zeros in seconds are gone, such as `09:00:00.000000Z` becoming `09:00:00Z`, `+00:00` became `Z`, or properties are in a different order.

**Cause.** The encoder always writes one consistent form. The data has the same meaning. Trailing zeros in date-times are tracked in [issue 101](https://github.com/ohs-foundation/kotlin-fhir/issues/101).

**Fix.** Do not compare FHIR JSON as text. Decode both and compare the resources.

### A decimal lost its trailing zeros

`FhirDecimal.fromString("1.50") + FhirDecimal.fromInt(10)` gives `11.5`, not `11.50`.

**Cause.** A decimal keeps its original text only when it is parsed or decoded. The result of arithmetic is a new value.

**Fix.** If the result must have a specific number of digits, format it as text with those digits, then create the value with `FhirDecimal.fromString()`.

## Search parameters

### `NotImplementedError` from `extractFrom()`

```text
NotImplementedError: Search parameter 'age' has expression '' which is not yet supported.
```

**Cause.** The parameter is in the `unsupported` list. The generator cannot turn its expression into Kotlin code.

**Fix.** Iterate `all` instead of every parameter, or evaluate the parameter's `expression` with Kotlin FHIRPath. See [Extract search parameters](/fhir-foundations/kotlin-fhir/search-parameters/#get-values-for-an-unsupported-parameter).

### A search parameter returns fewer values than expected

**Cause.** The parameter is a union of several paths, and one of the paths is not supported. That path is skipped without an error.

**Fix.** Evaluate the full `expression` with Kotlin FHIRPath. See [Extract search parameters](/fhir-foundations/kotlin-fhir/search-parameters/#get-values-for-an-unsupported-parameter).

## Report a problem

If your problem is not listed here, search the [kotlin-fhir issues](https://github.com/ohs-foundation/kotlin-fhir/issues) or open a new one. Include the FHIR version, the library version, and a small JSON example.
