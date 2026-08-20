---
title: Customize and extend
description: Custom question widgets, the validation surface, and extracting FHIR resources from completed responses.
slug: /fhir-foundations/kotlin-fhir-data-capture/customize-and-extend/
sidebar_position: 40
guide_type: Extension guide
guide_status: partial
guide_focus: Going beyond the built-in renderers and into extraction
repository: kotlin-fhir-data-capture
---

## Goal and scope

Three deeper capabilities. Rendering a question with your own Compose UI, understanding what validation enforces, and turning a completed response into FHIR resources. The repository's catalog app is the reference implementation for the first.

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

A factory is paired with a matcher, a predicate over the Questionnaire item that decides which questions it renders. The catalog's barcode widget matches on the item-control code.

```kotlin
import dev.ohs.fhir.datacapture.extensions.itemControlCode

QuestionnaireItemViewFactoryMatcher(BarcodeScannerFactory()) { item ->
  item.itemControlCode == "barcode"
}
```

Matchers reach the composable through a `QuestionnaireItemViewFactoryMatchersProvider` passed as the `matchersProvider` parameter. Questions no matcher claims fall through to the built-in renderers, so custom widgets are additive.

The catalog app's barcode-scanner and geolocation questions are exactly this mechanism. They live in the demo, not the library, and are the recommended starting point to copy.

## What validation enforces

Validation runs when the submit getter is called, and interactively on items the user has modified. It covers the Questionnaire's declared constraints, meaning `required`, min and max values, string length, decimal places, regex, and the `questionnaire-constraint` extension. Constraint extensions are currently evaluated per item. A constraint expressed at questionnaire level over multiple items is not enforced. `QuestionnaireResponseValidator` is public if you need to run the same validation outside the UI.

## Extraction from response to resources

A `QuestionnaireResponse` records answers, but clinical systems usually want real resources such as a `Patient` or an `Observation`. The SDK implements the SDC **template-based extraction** mechanism. The Questionnaire embeds template resources with `templateExtract` and `templateExtractValue` extensions whose FHIRPath expressions pull answers into place, and the extraction engine produces a transaction `Bundle`.

`TemplateExtractionEngine.canExtract(questionnaire)` tells you whether a Questionnaire carries extraction templates before you offer the behavior in your UI.

The other two SDC extraction mechanisms are out of scope in the current release. StructureMap-based extraction is not implemented, and definition-based extraction is not part of the published library.

## Known edges

This SDK is the youngest in the pillar, and some SDC corners are partial in the current alpha.

- `choiceColumn` rendering is partially implemented.
- Item-media attachments render images, and other MIME types raise.
- Locale-sensitive date and time formatting is exercised by tests on the JVM only.

When a Questionnaire behaves unexpectedly, reproduce it against the catalog app first. If the catalog's corresponding demo Questionnaire works, the difference is in your Questionnaire's extensions rather than the SDK.

## Checkpoint

A custom matcher claims its question and your composable renders in its place. `TemplateExtractionEngine` turns a completed response from a template-carrying Questionnaire into a Bundle whose entries are the resources your templates describe.
