---
title: Customize and extend
description: Custom question widgets, the validation surface, and extracting FHIR resources from completed responses.
slug: /fhir-foundation/kotlin-fhir-data-capture/customize-and-extend/
sidebar_position: 40
guide_type: Extension guide
guide_status: partial
guide_focus: Going beyond the built-in renderers and into extraction
repository: kotlin-fhir-data-capture
---

## Goal and scope

Three deeper capabilities. Rendering a question with your own Compose UI, understanding what validation enforces, and turning a completed response into FHIR resources. The repository's catalog app is the reference implementation for the first, and its source is worth having open alongside this page.

## Custom widgets

A custom widget is a `QuestionnaireItemViewFactory`, one composable that receives the question's view item and renders it.

```kotlin
class BarcodeScannerFactory : QuestionnaireItemViewFactory {
  @Composable
  override fun Content(questionnaireViewItem: QuestionnaireViewItem) {
    // your Compose UI here, reading the item and writing answers through the view item
  }
}
```

A factory is paired with a matcher, a predicate over the Questionnaire item that decides which questions it renders.

```kotlin
QuestionnaireItemViewFactoryMatcher(
  factory = BarcodeScannerFactory(),
  matches = { item -> item.hasCustomWidgetExtension() },
)
```

Matchers arrive at the composable through a `QuestionnaireItemViewFactoryMatchersProvider`, either passed directly as the `matchersProvider` parameter or supplied app-wide via `DataCaptureConfig`. Questions no matcher claims fall through to the built-in renderers, so custom widgets are additive.

The catalog app's barcode-scanner and geolocation questions are exactly this mechanism. They live in the demo, not the library, and are the recommended starting point to copy.

## What validation enforces

Validation runs when the submit getter is called, and interactively as users answer. It covers the Questionnaire's declared constraints, meaning `required`, min and max values, string length, decimal places, regex, and the `questionnaire-constraint` extension. Constraint extensions are currently evaluated per item. A constraint expressed at questionnaire level over multiple items is not enforced. `QuestionnaireResponseValidator` is public if you need to run the same validation outside the UI, for example before syncing stored drafts.

## Extraction from response to resources

A `QuestionnaireResponse` records answers, but clinical systems usually want real resources such as a `Patient` or an `Observation`. The SDK implements the SDC **template-based extraction** mechanism. The Questionnaire embeds template resources with `templateExtract` and `templateExtractValue` extensions whose FHIRPath expressions pull answers into place, and the extraction engine produces a transaction `Bundle` ready to post to a server or hand to [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/).

`TemplateExtractionEngine.canExtract(questionnaire)` tells you whether a Questionnaire carries extraction templates before you offer the behavior in your UI.

The other two SDC extraction mechanisms are out of scope in the current release. StructureMap-based extraction is not implemented, and definition-based extraction is not part of the published library. If your Questionnaires come from a system that relies on those, plan extraction in your own code from the `QuestionnaireResponse`.

## Known edges

This SDK is the youngest in the group, and some SDC corners are partial in the current alpha.

- `choiceColumn` rendering is partially implemented.
- Item-media attachments render images, and other MIME types raise.
- Locale-sensitive date and time formatting is fully exercised on the JVM, and other platforms follow the platform default patterns.

When a Questionnaire behaves unexpectedly, reproduce it against the catalog app first. If the catalog's corresponding demo Questionnaire works, the difference is in your Questionnaire's extensions rather than the SDK.

## Checkpoint

A custom matcher claims its question and your composable renders in its place. `TemplateExtractionEngine` turns a completed response from a template-carrying Questionnaire into a Bundle whose entries are the resources your templates describe.
