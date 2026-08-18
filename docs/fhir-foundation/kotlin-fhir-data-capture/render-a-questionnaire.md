---
title: Control rendering behavior
description: QuestionnaireConfig display flags, review and read-only flows, and the resolvers that connect a form to your data.
slug: /fhir-foundation/kotlin-fhir-data-capture/render-a-questionnaire/
sidebar_position: 30
guide_type: Usage guide
guide_status: ready
guide_focus: Shaping how a Questionnaire renders and where its data comes from
repository: kotlin-fhir-data-capture
---

## Goal and scope

Two mechanisms shape a rendered form beyond the Questionnaire resource itself: `QuestionnaireConfig`, per-form display behavior passed to the composable, and `DataCaptureConfig`, app-level hooks that resolve external data. This page covers both.

## QuestionnaireConfig

Pass a `QuestionnaireConfig` as the `config` parameter to override display defaults:

```kotlin
Questionnaire(
  questionnaireJson = questionnaireJson,
  config = QuestionnaireConfig(
    showReviewPage = true,
    showAsterisk = true,
    showRequiredText = false,
  ),
  onSubmit = ...,
  onCancel = ...,
)
```

| Flag | Default | Effect |
| --- | --- | --- |
| `showSubmitButton` | `true` | Render the submit button |
| `showCancelButton` | `true` | Render the cancel button |
| `showReviewPage` | `false` | Insert a read-only review step before submission |
| `showReviewPageFirst` | `false` | Open directly on the review step |
| `isReadOnly` | `false` | Render the whole form non-editable |
| `showAsterisk` | `false` | Mark required questions with `*` |
| `showRequiredText` | `true` | Label required questions with text |
| `showOptionalText` | `false` | Label optional questions instead |
| `showNavigationLongScroll` | `false` | Navigation for long single-page scrolling |
| `submitButtonText` | `null` | Override the submit button label |
| `showSubmitAnywayWhenValidationFails` | `true` | Offer a "submit anyway" path in the validation dialog |

Two combinations to know: `showReviewPage` gives the standard fill-then-review flow, and `isReadOnly` with a `questionnaireResponseJson` is how you display a previously submitted response. Set `showSubmitAnywayWhenValidationFails = false` when invalid data must never leave the form.

Layout beyond these flags belongs to the Questionnaire resource itself — paginated versus single-scroll rendering comes from the Questionnaire's SDC item-control extensions, not from the config object.

## DataCaptureConfig: connecting the form to your data

Some Questionnaire features reference data the library cannot know about — ValueSets hosted elsewhere, x-fhir-query answer options, media binaries. `DataCaptureConfig` carries the resolvers for these, supplied through a CompositionLocal so any Questionnaire below it in the tree is served:

```kotlin
CompositionLocalProvider(
  LocalDataCaptureConfig provides DataCaptureConfig(
    xFhirQueryResolver = myQueryResolver,
  ),
) {
  Questionnaire(...)
}
```

The hooks:

- **`ExternalAnswerValueSetResolver`** — answer options declared as a ValueSet URL rather than inline. You decide where ValueSets come from: a bundled file, a terminology service, a local store.
- **`XFhirQueryResolver`** — answer options declared as an x-fhir-query (for example, "all Practitioners at this facility"). A natural implementation runs the query against [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/)'s local store.
- **`UrlResolver`** — fetching media attachments referenced by URL for item-media display.
- A factory for custom widget matchers, covered in [customize and extend](/fhir-foundation/kotlin-fhir-data-capture/customize-and-extend/).

A Questionnaire that uses none of these features needs no `DataCaptureConfig` at all.

## Checkpoint

With `showReviewPage = true`, submission shows your answers read-only with an edit path before the final submit. If a dropdown backed by an external ValueSet renders empty, the `ExternalAnswerValueSetResolver` is missing or not finding the ValueSet — the form renders, but that question has no options to offer.

## Next step

[Customize and extend](/fhir-foundation/kotlin-fhir-data-capture/customize-and-extend/) — custom widgets, validation details, and extracting resources from responses.
