---
title: Conformance
description: What the engine implements from the FHIRPath specification, what is partial, and what is absent.
slug: /fhir-foundation/kotlin-fhirpath/conformance/
sidebar_position: 40
guide_type: Technical reference
guide_status: ready
guide_focus: Checking whether the expressions you need are supported
repository: kotlin-fhirpath
---

## Scope and the canonical source

The engine implements the FHIRPath Specification v3.0.0 (STU3) and, for the FHIR-specific additions, the FHIRPath section of FHIR R5. Conformance is verified against the official FHIR test-case suite on JVM and Android.

The repository maintains the authoritative, per-feature conformance table — every function and operator with its status and a link to the implementing source — in [`docs/conformance.md`](https://github.com/ohs-foundation/kotlin-fhirpath/blob/main/docs/conformance.md). This page summarizes the shape of that table so you can tell quickly whether your expressions are safe; consult the repository document for a specific feature's status before relying on it.

## What is solidly covered

The core language: path navigation, filtering and projection (`where`, `select`, `repeat`), existence (`exists`, `all`, `empty`, `count`), subsetting (`first`, `last`, `tail`, `skip`, `take`, indexing), combining, string manipulation, math, type operators (`is`, `as`, `ofType`), boolean logic, comparison and equivalence, date/time arithmetic, `aggregate`, environment variables, `trace`, and reflection over types. UCUM-based quantity comparison and conversion is implemented.

## Notable gaps

Features that require **external services** are absent by design — the engine is purely in-memory:

- `resolve()` — following references needs a resource store
- `memberOf`, `subsumes`, `subsumedBy` — terminology operations need a terminology server
- The terminology and general server API bindings

Features from newer spec drafts and less-traveled corners that are **unimplemented** in the current release include:

- `defineVariable`, `coalesce`, `repeatAll`
- The aggregate shorthands `sum()`, `min()`, `max()`, `avg()` — use `aggregate()` instead
- Date/time component extractors (`yearOf`, `monthOf`, and siblings)
- `toLong`/`convertsToLong`, `lastIndexOf`, instance/object creation syntax, `%rootResource`, `elementDefinition`, `slice`, `checkModifiers`, `conformsTo`, `htmlChecks`

## Known divergences

Places where behavior differs from a literal spec reading, tracked in the conformance document with upstream issue links:

- The indexer `[n]` raises on out-of-bounds access instead of returning `{}`.
- `combine` does not deduplicate.
- Some numeric conversions omit edge-case handling (`Long` inputs; `toDecimal` can lose precision on certain paths; `toQuantity` with a unit argument has a hardcoded default unit for bare numbers).
- Timezone comparisons are deliberately stricter than the spec permits — described under [evaluation semantics](/fhir-foundation/kotlin-fhirpath/evaluation-semantics/).
- Resource equality compares full object structure, including `id`.

A further set of divergences exists against the official test suite itself, where the engine's authors judged the test or the spec to be wrong; each is documented with a link to the corresponding HL7 discussion.

## What to do at a gap

If an expression you need touches an unimplemented feature, first confirm its status in the repository's conformance table. Then the options in practice are: rewrite the expression within the supported surface, evaluate the offending fragment in your own code against the model classes, or — for `resolve()`-style needs — restructure so the referenced resource is fetched by your application first.
