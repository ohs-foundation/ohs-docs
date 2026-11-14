---
title: Debug expressions
description: Find out why a FHIRPath expression returns an empty or unexpected result, with strict mode and the trace function.
slug: /fhir-foundations/kotlin-fhirpath/debug-expressions/
sidebar_position: 50
guide_type: Usage guide
guide_status: ready
guide_focus: Finding the step where an expression goes wrong
repository: kotlin-fhirpath
---

## Goal and scope

This page shows how to find the step where an expression goes wrong. Examples use R4 and the Patient from [Evaluate expressions](/fhir-foundations/kotlin-fhirpath/evaluate-expressions/).

## Find misspelled properties with strict mode

By default, a property that does not exist returns an empty result, so a typo looks like missing data. A strict engine throws instead, and the message names the property and the type.

```kotlin
val strictEngine = FhirPathEngine.forR4(strictMode = true)

strictEngine.evaluateExpression("name.given1", patient)
// Throws IllegalStateException with "Property 'given1' does not exist on type 'HumanName'"
```

Strict mode throws only for property names that the type does not define. An element that is defined but has no value still returns empty, so strict mode does not fail on incomplete data.

## See the values at each step with `trace()`

`trace(name)` records the values at that point in the expression and passes them on unchanged. After the call, read them from `engine.traces`. It maps each trace name to a list of `TraceEntry` objects, and each entry has a `path` and a `value`.

```kotlin
engine.evaluateExpression("name.where(use = 'official').trace('official').given", patient)

engine.traces["official"]?.forEach { println("${it.path} ${it.value}") }
// Patient.name.where(use='official')[0] HumanName(...)
```

To record something other than the values themselves, pass a second argument. It is evaluated for each value.

```kotlin
engine.evaluateExpression("name.given.trace('lengths', length())", patient)
engine.traces["lengths"]?.map { it.value } // [5, 5, 3]
```

`engine.traces` is replaced only when a call succeeds. If a call throws, it still holds the traces of the previous call. If several threads share the engine, a call on another thread can replace them before you read them.

The engine also prints each trace to standard output as it runs, in the form `trace[official]: [...]`. Read this output when the expression throws.

## Find the step that returns empty

When a long expression returns empty, shorten it from the end until it returns a value. The part you removed last is the step that fails. For example, check `name`, then `name.where(use = 'official')`, then `name.where(use = 'official').given`.

Common reasons a step returns empty are below.

- **A choice element with a type suffix.** Use `value`, not `valueQuantity`. To select one type, use `value.ofType(Quantity)`.
- **A comparison the engine cannot decide.** Dates with different precision, or a date-time with an offset compared to one without. See [How evaluation works](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/#dates-and-times-are-compared-at-their-precision).
- **A different case in a string or code.** String comparison with `=` is case sensitive.

## Next step

[Conformance](/fhir-foundations/kotlin-fhirpath/conformance/) lists which functions and operators are supported.
