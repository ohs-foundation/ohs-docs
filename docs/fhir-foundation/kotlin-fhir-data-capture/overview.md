---
title: Kotlin FHIR Data Capture
description: Collecting, validating, and processing structured healthcare data with FHIR Questionnaires, rendered in Compose Multiplatform.
slug: /fhir-foundation/kotlin-fhir-data-capture/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: FHIR Questionnaire forms on every Compose platform
repository: kotlin-fhir-data-capture
---

## What it is

Kotlin FHIR Data Capture turns a FHIR Questionnaire into a working, validated form. Hand it a Questionnaire's JSON and it renders the questions with Material 3 components, applies the Questionnaire's behavior for skip logic, calculated values, and answer options, validates the answers, and returns a `QuestionnaireResponse`. It implements FHIR's Structured Data Capture (SDC) patterns for R4, built on Compose Multiplatform so the same form code runs on Android, iOS, desktop, and the browser.

It is the Kotlin Multiplatform successor to the Android FHIR SDK's data-capture library, rebuilt from Android Views onto Compose.

## What you get

- **A single entry point.** The `Questionnaire` composable takes Questionnaire JSON in and hands a `QuestionnaireResponse` out through an `onSubmit` callback that runs validation first.
- **Built-in renderers** for the standard question types. These cover text in single and multi-line, integer and decimal, boolean, date, time and date-time pickers, radio groups, checkboxes, dropdowns, autocomplete, dialog selection, sliders, quantities, phone numbers, attachments, groups, and display items.
- **SDC behavior driven by the Questionnaire itself.** `enableWhen` and enable-expressions, calculated and initial expressions, answer expressions and answer ValueSets, launch context, entry mode, and paginated and review layouts are expressed in the Questionnaire resource and evaluated at runtime with [Kotlin FHIRPath](/fhir-foundation/kotlin-fhirpath/).
- **Validation** from the Questionnaire's constraints, including required, min and max values, length, regex, and constraint extensions, surfaced in the UI before submission.
- **Template-based extraction**, turning a completed response into real FHIR resources (a transaction Bundle) using the SDC template-extraction extensions.
- **An extension point for custom widgets**, so a question can render as anything you can write in Compose. The repository's catalog app demonstrates barcode-scanner and geolocation widgets built this way.

## The catalog app

The repository ships a catalog application with several dozen small Questionnaires, one per component, behavior, and layout, from `component_slider` to `behavior_skip_logic` to `layout_paginated`. It runs on all four platforms and is the fastest way to see what a given item type or SDC behavior looks like before writing your own Questionnaire.

## What it is not

- **Not storage and not sync.** The SDK is purely in-memory. Persisting the `QuestionnaireResponse` (or extracted resources) is your application's job, typically with [Kotlin FHIR Engine](/fhir-foundation/kotlin-fhir-engine/), on which this SDK deliberately does not depend.
- **R4 only**, matching the rest of the SDK tier.
- **FHIRPath expressions only.** Questionnaires using CQL or other expression languages raise an error at the offending expression.
- **Extraction is template-based only.** StructureMap-based extraction is not implemented, and definition-based extraction is not part of the published library.
- **Unsupported item types fail loudly.** An unrecognized question type raises rather than rendering a degraded fallback, so authoring mistakes surface in development.

## Next step

[Render your first Questionnaire](/fhir-foundation/kotlin-fhir-data-capture/get-started/).
