---
title: Troubleshooting
description: Common Kotlin FHIRPath errors and surprising results, what causes them, and how to fix them.
slug: /fhir-foundations/kotlin-fhirpath/troubleshooting/
sidebar_position: 70
guide_type: Technical reference
guide_status: ready
guide_focus: Recognizing and fixing common problems
repository: kotlin-fhirpath
---

## Goal and scope

Each entry below starts with what you see, then gives the cause and the fix. The error messages are from version 1.0.0-beta06 on the JVM with FHIR R4.

## Setup

### `UnsupportedClassVersionError` at startup

**Cause.** The JVM artifacts of Kotlin FHIRPath 1.0.0-beta06, and the Kotlin FHIR version it uses, need Java 21 or newer.

**Fix.** Run your app on Java 21 or newer.

### Errors after adding Kotlin FHIR next to Kotlin FHIRPath

The build or the app can fail, for example with a missing method or class at runtime.

**Cause.** Kotlin FHIRPath is built against a specific Kotlin FHIR version. If your build declares a different one, Gradle uses the higher version for both libraries.

**Fix.** Use the Kotlin FHIR version listed in [Pairing the libraries](/fhir-foundations/versions/#pairing-the-libraries).

## Expression errors

### A syntax error throws `ParseCancellationException` or `IndexOutOfBoundsException`

```text
ParseCancellationException: org.antlr.v4.kotlinruntime.NoViableAltException
```

```text
IndexOutOfBoundsException: token index 5 out of range 0..4
```

A line such as `line 1:12 no viable alternative at input '<EOF>'` can also appear in the console.

**Cause.** The expression is not valid FHIRPath. For example, `name.given +` is incomplete, and `name.given )` has extra text at the end. The second kind of error throws `IndexOutOfBoundsException` in this version, instead of a message that names the extra text.

**Fix.** Correct the expression. If expressions come from users or configuration, catch `RuntimeException` around `evaluateExpression()`, because syntax errors and evaluation errors use different exception types. Test fixed expressions in your unit tests, so syntax errors show up before release.

### `Function '...' is not implemented.`

```text
IllegalStateException: Function 'resolve' is not implemented.
```

**Cause.** The function is not supported in this version.

**Fix.** See [Conformance](/fhir-foundations/kotlin-fhirpath/conformance/#when-a-feature-is-missing) for ways to work around it.

### `Unknown variable`

```text
IllegalStateException: Unknown variable: %nameUse
```

**Cause.** The expression uses a variable that is not in the `variables` map. `%rootResource` also gives this error, because it is not supported in this version.

**Fix.** Pass the variable in `variables`, without the `%`. See [Pass variables](/fhir-foundations/kotlin-fhirpath/evaluate-expressions/#pass-variables).

### `Property '...' does not exist on type '...'`

```text
IllegalStateException: Property 'given1' does not exist on type 'HumanName'
```

**Cause.** The engine is in strict mode, and the expression uses a property that the type does not have.

**Fix.** Correct the property name. If the expression starts with a resource type, check that it matches the resource. For example, `Observation.status` on a Patient gives this error in strict mode.

### `... cannot be called on a collection with more than 1 item`

```text
IllegalStateException: indexOf() cannot be called on a collection with more than 1 item
```

**Cause.** Many functions, such as string functions, need a single value. The input has several values.

**Fix.** Pick one value first, such as `name.given.first().indexOf('e')`, or apply the function to each value with `select()`, such as `name.given.select(indexOf('e'))`.

### `iif criterion must evaluate to a Boolean`

```text
IllegalStateException: iif criterion must evaluate to a Boolean
```

**Cause.** In this version, `iif()` does not accept a FHIR `boolean` element as its condition, such as `iif(active, 'yes', 'no')`.

**Fix.** Compare the element with `true`, as in `iif(active = true, 'yes', 'no')`.

### `IndexOutOfBoundsException` from an index

```text
IndexOutOfBoundsException: Index 5 out of bounds for length 2
```

**Cause.** The expression uses an index that is too large, such as `name[5]` when there are two names. The specification says this returns empty, but this version throws.

**Fix.** Use `skip()` and `first()`, such as `name.skip(5).first()`. It returns empty when there is no such item.

## Wrong or empty results

### An expression returns empty

**Cause.** There are several common causes.

- A property name is misspelled. The default mode returns empty instead of an error.
- A choice element is written with its type, such as `valueQuantity`. Write `value`, or `value.ofType(Quantity)`.
- A comparison cannot be decided, such as dates with different precision.

**Fix.** See [Debug expressions](/fhir-foundations/kotlin-fhirpath/debug-expressions/).

### `div` or `mod` throws `ArithmeticException` or gives a wrong result

```text
ArithmeticException: Cannot convert to int and provide exact value
```

`10 div 4` throws this exception, and `10 mod 4` returns `0` instead of `2`.

**Cause.** In this version, `div` and `mod` throw or return a wrong result for some inputs. Other inputs work. For example, `5 div 2` correctly returns `2`.

**Fix.** Use `/` with `truncate()`. Write `(10 / 4).truncate()` for `10 div 4`, and `10 - (10 / 4).truncate() * 4` for `10 mod 4`.

### A large integer becomes negative

`2147483647 + 1` returns `-2147483648`.

**Cause.** Integer `+`, `-`, and `*` overflow without an error in this version.

**Fix.** Use decimals when values can be large. `2147483647.0 + 1` returns `2147483648.0`.

### A division has many decimal places

`10 / 4` returns `2.50000000000000`.

**Cause.** `/` rounds its result to 15 significant digits and keeps trailing zeros. For example, `1 / 3` returns `0.333333333333333`.

**Fix.** Use `round()` with the number of places you need, such as `(10 / 4).round(2)`, which returns `2.50`.

### `lowBoundary()` or `highBoundary()` returns empty

**Cause.** The precision you passed is not valid for the type. For example, `@2024-01-01.lowBoundary(3)` returns empty, because a date accepts only 4, 6, or 8.

**Fix.** Use a valid precision. See [How evaluation works](/fhir-foundations/kotlin-fhirpath/evaluation-semantics/#dates-and-times-are-compared-at-their-precision).

## Report a problem

If your problem is not listed here, search the [kotlin-fhirpath issues](https://github.com/ohs-foundation/kotlin-fhirpath/issues) or open a new one. Include the library version, the FHIR version, the expression, and a small resource that shows the problem.
