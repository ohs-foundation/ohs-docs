---
title: Search the local store
description: The type-safe search DSL with filters, sorting, counts, and the boundaries of what is queryable offline.
slug: /fhir-foundations/kotlin-fhir-engine/persist-and-search/
sidebar_position: 30
guide_type: Usage guide
guide_status: ready
guide_focus: Querying on-device FHIR data with typed filters
repository: kotlin-fhir-engine
---

## Goal and scope

Everything the engine stores is indexed for search. When a resource is written, its search-parameter FHIRPath expressions are evaluated and the values land in typed index tables. This page covers querying that index with the DSL in `dev.ohs.fhir.engine.search`.

## The search DSL

`search<R>` takes a block configuring the query. An empty block matches every resource of the type.

```kotlin
import dev.ohs.fhir.engine.search.Order
import dev.ohs.fhir.engine.search.StringClientParam
import dev.ohs.fhir.engine.search.search
import dev.ohs.fhir.model.r4.Patient

val results = fhirEngine.search<Patient> {
  filter(StringClientParam("name"), { value = "Jo" })
  sort(StringClientParam("name"), Order.ASCENDING)
}

val patients = results.map { it.resource }
```

Each hit is a `SearchResult` carrying the matched `resource`, plus any included resources when the query asks for them.

## Typed parameters per FHIR search type

The DSL mirrors FHIR's search parameter types with one filter class each.

| FHIR search type | DSL parameter class |
| --- | --- |
| string | `StringClientParam` |
| token | `TokenClientParam` |
| date | `DateClientParam` |
| number | `NumberClientParam` |
| quantity | `QuantityClientParam` |
| reference | `ReferenceClientParam` |
| uri | `UriClientParam` |

The parameter name is the FHIR search parameter's name (`"name"`, `"birthdate"`, `"identifier"`, and so on). Comparable types take a prefix alongside the value, mirroring FHIR's search prefixes.

```kotlin
import dev.ohs.fhir.engine.search.NumberClientParam
import dev.ohs.fhir.model.r4.SearchParameter.SearchComparator

filter(
  NumberClientParam("probability"),
  {
    prefix = SearchComparator.Gt
    value = threshold
  },
)
```

Beyond flat filters, the DSL supports nested searches on referenced resources, forward includes and reverse includes to fetch related resources in one query, and `count<R> { ... }` when you need the number of matches without materializing them.

## String queries

`search(xFhirQuery: String)` accepts an x-fhir-query string (`"Patient?name=Jo"`) for queries that arrive as data. Its translator supports plain parameter matching and sorting only. There are no modifiers, prefixes, chained parameters, global common parameters, or embedded FHIRPath. When you control the query at compile time, prefer the typed DSL.

## What is queryable

- Indexing happens at write time, driven by the standard R4 search-parameter definitions. Parameters whose FHIRPath expressions the [FHIRPath engine](/fhir-foundations/kotlin-fhirpath/) cannot evaluate, such as `resolve()`-based ones, are skipped, so those parameters return no results rather than failing.
- Custom search parameters can be supplied at initialization through `customSearchParameters` in `FhirEngineConfiguration`. They add to the spec-defined parameters and must not redefine existing ones.

## Checkpoint

Searching `StringClientParam("name")` for a prefix of a stored patient's name returns that patient. A resource that a filter unexpectedly misses usually means the relevant search parameter is not indexed. Check the parameter's FHIRPath expression against the supported surface.

## Next step

[Synchronize with a server](/fhir-foundations/kotlin-fhir-engine/synchronization/). The change log you have been silently writing becomes an upload.
