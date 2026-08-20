---
title: Get started with Kotlin FHIRPath
description: Add the engine to your project and evaluate FHIRPath expressions against FHIR resources.
slug: /fhir-foundations/kotlin-fhirpath/get-started/
sidebar_position: 20
guide_type: Get started
guide_status: ready
guide_focus: A first FHIRPath expression evaluated against a resource
repository: kotlin-fhirpath
---

## Goal and scope

Add Kotlin FHIRPath to a project and evaluate expressions against a resource. Examples use R4, and `forR4B()` and `forR5()` behave identically over their own models.

## Prerequisites

- A Kotlin project on a supported [target platform](/fhir-foundations/platform-support/).
- Resources represented with [Kotlin FHIR](/fhir-foundations/kotlin-fhir/), because the engine evaluates against those data classes. The dependency below brings the matching model transitively.

## Add the dependency

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("dev.ohs.fhir:fhir-path-r4:1.0.0-beta05")
    }
  }
}
```

For Android-only or JVM-only projects, the same coordinate goes in the ordinary `dependencies` block. Use the `fhir-path` aggregate only if you handle several FHIR versions in one codebase.

## Evaluate an expression

```kotlin
import dev.ohs.fhir.fhirpath.FhirPathEngine
import dev.ohs.fhir.fhirpath.forR4

val engine = FhirPathEngine.forR4()

val givenNames = engine.evaluateExpression("name.given", patient)
// e.g. ["Peter", "James", "Jim"]
```

`evaluateExpression` takes the expression string, a base object (a resource or any element from the model), and an optional map of external variables.

```kotlin
val results = engine.evaluateExpression(
  "name.where(use = %nameUse).given",
  patient,
  variables = mapOf("nameUse" to "official"),
)
```

The result is a `Collection<Any>` of FHIRPath system values, meaning strings, booleans, big decimals, and the engine's own date, time, and quantity types, because a FHIRPath expression can produce a heterogeneous collection. An empty collection is a normal outcome, not an error. It is FHIRPath's way of saying "nothing there".

## Strict mode

By default the engine is lenient. Accessing a property that does not exist on the input yields an empty collection, as the spec's dynamic evaluation model prescribes. While developing and testing expressions, prefer strict mode, which raises on invalid property access instead of quietly returning nothing.

```kotlin
val strictEngine = FhirPathEngine.forR4(strictMode = true)
val results = strictEngine.evaluateExpression("name.given", patient)
```

Invalid expression syntax fails fast in both modes. The parser rejects the expression with an error rather than evaluating a partial parse.

## Concurrency

An engine instance holds per-evaluation state internally. Create engine instances cheaply where you need them rather than sharing one instance across concurrent evaluations.

## Checkpoint

`engine.evaluateExpression("name.given", patient)` returns the given names of your patient as strings. An unexpected empty collection usually means a typo in a property name. Rerun the same expression on a strict engine to get an error instead.

## Next step

[Evaluation semantics](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/) covers how types, dates, and timezones behave, which is where FHIRPath surprises people.
