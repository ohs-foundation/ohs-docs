---
title: Work with resources
description: Creating, modifying, and reading FHIR resources in Kotlin, using builders, primitives, choice types, and coded values.
slug: /fhir-foundations/kotlin-fhir/working-with-resources/
sidebar_position: 30
guide_type: Usage guide
guide_status: ready
guide_focus: Fluent, type-safe manipulation of FHIR data
repository: kotlin-fhir
---

## Goal and scope

This page covers how to change resources, use primitive values, dates, and decimals, and read choice elements. Examples use R4. R4B and R5 work the same way.

## Change a resource

Resources cannot be changed in place. To change one, create a new copy. For a few top-level elements, use `copy()`.

```kotlin
val updated = patient.copy(
  id = "patient-02",
  birthDate = Date(value = FhirDate.fromString("1990-06-15")),
)
```

To add to a list or change a nested element, use a builder. `toBuilder()` returns a builder for the resource. Change the builder, then call `build()` to get a new resource.

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

You can also create a resource with a builder, such as `Patient.Builder().apply { ... }.build()`. This can be easier to read than deeply nested constructors.

## Primitive values

A FHIR primitive can have an `id` and extensions as well as a value. For this reason, each primitive is a class named after its FHIR type. For example, `string` is `dev.ohs.fhir.model.r4.String` and `boolean` is `dev.ohs.fhir.model.r4.Boolean`. These names clash with Kotlin's own types, so import them with an alias, such as `import dev.ohs.fhir.model.r4.String as FhirString`.

The value itself is in the `value` property. Its Kotlin type depends on the FHIRPath type the specification uses for that value.

| FHIRPath type | Kotlin type of `value` |
| --- | --- |
| `System.Boolean` | `kotlin.Boolean` |
| `System.String` | `kotlin.String` |
| `System.Integer` | `kotlin.Int` |
| `System.Long` | `kotlin.Long` |
| `System.Decimal` | `FhirDecimal` |
| `System.Date` | `FhirDate` |
| `System.DateTime` | `FhirDateTime` |
| `System.Time` | `kotlinx.datetime.LocalTime` |

There is one exception. The specification gives `positiveInt` and `unsignedInt` the type `System.String`, but the model uses `kotlin.Int` for them.

`FhirDecimal`, `FhirDate`, and `FhirDateTime` are types from the library, because Kotlin's standard types cannot represent FHIR decimals and partial dates.

### Decimals

`FhirDecimal` stores a decimal with its exact digits. A value that is parsed or decoded keeps its original text, including trailing zeros, and is encoded back the same way. The result of arithmetic is a new value and does not keep trailing zeros.

```kotlin
import dev.ohs.fhir.model.r4.FhirDecimal

val dose = FhirDecimal.fromString("1.50")
val extra = FhirDecimal.fromInt(10)

dose.toString()       // "1.50"
val total = dose + extra
total.toString()      // "11.5"
dose.asBigDecimal()   // the underlying BigDecimal from the bignum library
```

You can also use `-`, `*`, and `/`.

### Partial dates and date-times

In FHIR, a date can be a year only, or a year and month only. `FhirDate` has one class for each precision, `Year`, `YearMonth`, and `Date`. `FhirDateTime` has the same three, plus `DateTime` for a full date and time with a UTC offset.

```kotlin
import dev.ohs.fhir.model.r4.FhirDate
import dev.ohs.fhir.model.r4.FhirDateTime
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.UtcOffset
import kotlinx.datetime.YearMonth

// Create a value with a specific precision
val year = FhirDate.Year(1985)
val month = FhirDate.YearMonth(YearMonth(1985, 3))
val day = FhirDate.Date(LocalDate(1985, 3, 15))
val dateTime = FhirDateTime.DateTime(
  dateTime = LocalDateTime(1985, 3, 15, 13, 0, 0),
  utcOffset = UtcOffset(hours = 1),
)

// Parse text. The precision comes from the text.
val parsedMonth = FhirDate.fromString("1985-03")              // FhirDate.YearMonth
val parsedDateTime = FhirDateTime.fromString("1985-03-15T13:00:00+01:00")
```

Use `when` to handle each precision. The compiler reports an error if you leave one out.

```kotlin
fun describe(date: FhirDateTime): String = when (date) {
  is FhirDateTime.Year -> "Year ${date.value}"
  is FhirDateTime.YearMonth -> "Month ${date.value}"
  is FhirDateTime.Date -> "Day ${date.date}"
  is FhirDateTime.DateTime -> "${date.dateTime} at offset ${date.utcOffset}"
}
```

## Choice elements

A choice element can hold one of several types. For example, `Patient.deceased[x]` holds either a `boolean` or a `dateTime`. The model generates a sealed interface for it inside the resource class, with one class for each allowed type. The compiler only accepts those types.

```kotlin
import dev.ohs.fhir.model.r4.Boolean as FhirBoolean

val deceased: Patient.Deceased = Patient.Deceased.Boolean(FhirBoolean(value = false))
```

To read a choice element, use `when`. Each branch gives you the value with its specific type.

```kotlin
when (val multipleBirth = patient.multipleBirth) {
  is Patient.MultipleBirth.Boolean -> println("Part of a multiple birth ${multipleBirth.value.value}")
  is Patient.MultipleBirth.Integer -> println("Birth order ${multipleBirth.value.value}")
  null -> Unit
}
```

If you only need one type, use its `as` function, such as `patient.multipleBirth?.asInteger()`. It returns `null` when the element holds a different type. Every choice interface also implements `FhirChoice`, whose `value` property returns the value as `Any`.

## Coded elements

Elements of the FHIR type `code`, such as `Patient.gender`, use generated enums. [Coded values and enums](/fhir-foundations/kotlin-fhir/coded-values/) explains how.

## Class hierarchy

The classes follow FHIR's inheritance. `Patient` extends `DomainResource`, which extends `Resource`. A function that accepts `Resource` therefore accepts any resource.

A BackboneElement is a nested class inside its resource. For example, `Patient.contact` is `Patient.Contact`.

The FHIR patterns `Event`, `Request`, and `Definition` are not interfaces. Resources that follow a pattern can name their elements differently. For example, `Observation` uses `effective[x]` for the time, and `Procedure` uses `performed[x]`. A Kotlin interface cannot describe that.

## Documentation in the IDE

Each class and property has the FHIR specification's definition as KDoc, so your IDE shows it when you hover over the code.

## Next step

[Coded values and enums](/fhir-foundations/kotlin-fhir/coded-values/) covers coded elements and the generated enums.
