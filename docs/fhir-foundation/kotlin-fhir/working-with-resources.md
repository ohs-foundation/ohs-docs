---
title: Work with resources
description: Creating, modifying, and reading FHIR resources in Kotlin — builders, primitives, choice types, and coded values.
slug: /fhir-foundation/kotlin-fhir/working-with-resources/
sidebar_position: 30
guide_type: Usage guide
guide_status: ready
guide_focus: Fluent, type-safe manipulation of FHIR data
repository: kotlin-fhir
---

## Goal and scope

How the generated model behaves once you move past a first example: modifying immutable resources, FHIR's variable-precision primitives, choice elements, and coded fields. Examples use R4; the R4B and R5 packages follow the same shapes.

## Resources are immutable; copy or build

Every generated class is an immutable Kotlin `data class`. For shallow changes, `copy()` with named arguments is enough:

```kotlin
val updated = patient.copy(
  id = "patient-02",
  birthDate = Date(value = FhirDate.fromString("1990-06-15")),
)
```

For deeper mutations — appending to lists, editing nested elements — every class has a nested `Builder`. `toBuilder()` converts the whole tree to builders, you mutate, then `build()` produces a new immutable instance:

```kotlin
import dev.ohs.fhir.model.r4.String as FhirString

val updated = patient.toBuilder().apply {
  name.add(
    HumanName.Builder().apply {
      given.add(FhirString.Builder().apply { value = "Jane" })
    }
  )
}.build()
```

Mutations never leak into the original instance. Builders can also construct resources from scratch (`Patient.Builder().apply { ... }.build()`) when constructor calls nest too deeply to read well.

## FHIR primitives are wrapped types

A FHIR primitive is more than its value — it can carry an `id` and extensions. The model therefore wraps every primitive in a class named after the FHIR type: the FHIR `string` type is `dev.ohs.fhir.model.r4.String`, `boolean` is `...r4.Boolean`, and so on. Since those names shadow Kotlin's built-ins, import them with an alias (`import dev.ohs.fhir.model.r4.String as FhirString`). Three primitives get hand-written value types because Kotlin's standard types cannot represent them faithfully:

- **`FhirDate`** — a date at year, year-month, or full-date precision, as FHIR allows. Construct from text with `FhirDate.fromString("2000-01")`.
- **`FhirDateTime`** — the same variable precision plus optional time and timezone offset.
- **`FhirDecimal`** — arbitrary-precision decimal that preserves trailing zeros and scale, backed by a multiplatform big-decimal implementation, because `Double` would corrupt clinical quantities.

## Choice types are sealed interfaces

An element like `Patient.deceased[x]`, which the spec allows as a `boolean` or a `dateTime`, is generated as a sealed interface with one implementation per allowed type:

```kotlin
import dev.ohs.fhir.model.r4.Boolean as FhirBoolean

val deceased: Patient.Deceased = Patient.Deceased.Boolean(FhirBoolean(value = false))

// Reading back — as* accessors return null for the other branches:
val deceasedFlag: FhirBoolean? = deceased.asBoolean()?.value
```

The compiler rejects types the spec does not allow for the element, and a `when` over the sealed interface is exhaustive.

## Coded fields

Where the spec binds an element to a required ValueSet, the model generates an enum. Bindings shared across resources live in the `terminologies` subpackage (for example `AdministrativeGender`); bindings used by a single element are nested in the owning class. Three ValueSets are deliberately not generated as enums because they are unbounded or too large to compile (`mimetypes`, `all-languages`, and the usage-context set); those fields stay as plain coded types.

## Documentation in the IDE

Every generated class and property carries the FHIR specification's own definition and comments as KDoc, so the spec text is available on hover. It is spec-quality prose — occasionally terse — but it means the model is self-describing without leaving the editor.

## Next step

[Serialize and deserialize](/fhir-foundation/kotlin-fhir/serialization/) — the JSON layer and its configuration limits.
