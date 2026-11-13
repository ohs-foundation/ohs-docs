---
title: Create and change resources
description: Build FHIR resources in Kotlin, change them with copy and builders, and set primitives, dates, decimals, and choice elements.
slug: /fhir-foundations/kotlin-fhir/working-with-resources/
sidebar_position: 40
guide_type: Usage guide
guide_status: ready
guide_focus: Building and modifying FHIR data in Kotlin
repository: kotlin-fhir
---

## Goal and scope

This page shows how to create resources, change them, and set values of each kind. Examples use R4. For why the model works this way, see [How the model maps FHIR](/fhir-foundations/kotlin-fhir/how-the-model-maps-fhir/).

## Create a resource

Pass the elements you need to the constructor. Optional elements have default values.

```kotlin
import dev.ohs.fhir.model.r4.Date
import dev.ohs.fhir.model.r4.FhirDate
import dev.ohs.fhir.model.r4.HumanName
import dev.ohs.fhir.model.r4.Patient
import dev.ohs.fhir.model.r4.String as FhirString

val patient = Patient(
  id = "patient-01",
  name = listOf(HumanName(given = listOf(FhirString(value = "John")))),
  birthDate = Date(value = FhirDate.fromString("2000-01-01")),
)
```

FHIR primitive types such as `String` and `Boolean` have the same names as Kotlin types. Import them with an alias, such as `FhirString`, to avoid a clash.

If the constructor calls become deeply nested, use a builder instead.

```kotlin
val patient = Patient.Builder().apply {
  id = "patient-01"
  name.add(HumanName.Builder().apply { given.add(FhirString.Builder().apply { value = "John" }) })
}.build()
```

## Change a resource

Resources cannot be changed in place. Each change creates a new resource.

To replace top-level elements, use `copy()`.

```kotlin
val updated = patient.copy(
  id = "patient-02",
  birthDate = Date(value = FhirDate.fromString("1990-06-15")),
)
```

To add to a list or change a nested element, use `toBuilder()`, change the builder, and call `build()`.

```kotlin
val updated = patient.toBuilder().apply {
  name.add(HumanName.Builder().apply { given.add(FhirString.Builder().apply { value = "Jane" }) })
}.build()
```

## Change the id of any resource

If you only have a `Resource`, for example after decoding a Bundle, `copy()` is not available. Use `toBuilder()`, which works on every resource.

```kotlin
import dev.ohs.fhir.model.r4.Resource

val renamed: Resource = resource.toBuilder().apply { id = "local-123" }.build()
```

The result is still the same resource type. A `Patient` stays a `Patient`.

## Set and read decimals

Create a `FhirDecimal` from text to keep the exact digits.

```kotlin
import dev.ohs.fhir.model.r4.FhirDecimal

val dose = FhirDecimal.fromString("1.50")
val extra = FhirDecimal.fromInt(10)

dose.toString()       // "1.50"
val total = dose + extra
total.toString()      // "11.5"
dose.asBigDecimal()   // the underlying BigDecimal from the bignum library
```

You can also use `-`, `*`, and `/`. The result of arithmetic does not keep trailing zeros.

## Set and read dates

Create a date with the precision you need, or parse it from text.

```kotlin
import dev.ohs.fhir.model.r4.FhirDate
import dev.ohs.fhir.model.r4.FhirDateTime
import kotlinx.datetime.LocalDate
import kotlinx.datetime.LocalDateTime
import kotlinx.datetime.UtcOffset
import kotlinx.datetime.YearMonth

val year = FhirDate.Year(1985)
val month = FhirDate.YearMonth(YearMonth(1985, 3))
val day = FhirDate.Date(LocalDate(1985, 3, 15))
val dateTime = FhirDateTime.DateTime(
  dateTime = LocalDateTime(1985, 3, 15, 13, 0, 0),
  utcOffset = UtcOffset(hours = 1),
)

// The precision comes from the text
val parsedMonth = FhirDate.fromString("1985-03")              // FhirDate.YearMonth
val parsedDateTime = FhirDateTime.fromString("1985-03-15T13:00:00+01:00")
```

To read a date, handle each precision with `when`. The compiler reports an error if you leave one out.

```kotlin
fun describe(date: FhirDateTime): String = when (date) {
  is FhirDateTime.Year -> "Year ${date.value}"
  is FhirDateTime.YearMonth -> "Month ${date.value}"
  is FhirDateTime.Date -> "Day ${date.date}"
  is FhirDateTime.DateTime -> "${date.dateTime} at offset ${date.utcOffset}"
}
```

## Set and read choice elements

To set a choice element, create the class for the type you want.

```kotlin
import dev.ohs.fhir.model.r4.Boolean as FhirBoolean

val deceased: Patient.Deceased = Patient.Deceased.Boolean(FhirBoolean(value = false))
```

To read it, use `when`. Each branch gives you the value with its specific type.

```kotlin
when (val multipleBirth = patient.multipleBirth) {
  is Patient.MultipleBirth.Boolean -> println("Part of a multiple birth ${multipleBirth.value.value}")
  is Patient.MultipleBirth.Integer -> println("Birth order ${multipleBirth.value.value}")
  null -> Unit
}
```

If you only need one type, use its `as` function, such as `patient.multipleBirth?.asInteger()`. It returns `null` when the element holds a different type.

## Set and read coded values

Elements of the FHIR type `code`, such as `Patient.gender`, use enums. See [Work with coded values](/fhir-foundations/kotlin-fhir/coded-values/).

## Next step

[Work with coded values](/fhir-foundations/kotlin-fhir/coded-values/) shows how to set and read codes.
