---
title: Get started with Data Capture
description: Add the library and render a first Questionnaire that returns a validated QuestionnaireResponse.
slug: /fhir-foundation/kotlin-fhir-data-capture/get-started/
sidebar_position: 20
guide_type: Get started
guide_status: ready
guide_focus: A Questionnaire rendered and submitted in a Compose app
repository: kotlin-fhir-data-capture
---

## Goal and scope

Add the SDK to a Compose Multiplatform (or Android Compose) project and render a Questionnaire end to end. That means display, fill, validate, submit.

## Prerequisites

- A project already using Compose Multiplatform with Material 3, or Jetpack Compose on Android (minSdk 26).
- A FHIR R4 Questionnaire as a JSON string. Any of the catalog app's bundled questionnaires in the repository works as a first input.
- Your platform on the [support matrix](/fhir-foundation/platform-support/).

## Add the dependency

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("dev.ohs.fhir:fhir-data-capture:2.0.0-alpha02")
    }
  }
}
```

Android-only projects put the same coordinate in the ordinary `dependencies` block. The SDK brings the FHIR model and FHIRPath engine transitively. Add explicit model dependencies only when your own code uses their types directly, as covered in [versions and compatibility](/fhir-foundation/versions/).

## Render a Questionnaire

```kotlin
import dev.ohs.fhir.datacapture.Questionnaire
import dev.ohs.fhir.model.r4.QuestionnaireResponse
import kotlinx.coroutines.launch

@Composable
fun IntakeForm(questionnaireJson: String, onDone: (QuestionnaireResponse) -> Unit) {
  val scope = rememberCoroutineScope()
  Questionnaire(
    questionnaireJson = questionnaireJson,
    onSubmit = { getResponse ->
      scope.launch {
        val response = getResponse() // runs validation and throws if invalid
        onDone(response)
      }
    },
    onCancel = { /* dismiss the form */ },
  )
}
```

Two things in that signature matter.

- `onSubmit` does not hand you a response. It hands you a **suspend getter**. Calling `getResponse()` runs validation. If answers are invalid, the SDK shows its validation dialog and the getter throws a `CancellationException` instead of returning, so your success path only ever sees valid responses.
- The composable takes the Questionnaire as a **JSON string** and returns a typed `QuestionnaireResponse` from [Kotlin FHIR](/fhir-foundation/kotlin-fhir/). Serialize it with a plain `Json` instance when you need to store or transmit it.

## Pre-filling and context

Two optional parameters cover the common launch scenarios.

- `questionnaireResponseJson` takes a previously saved response to continue editing.
- `questionnaireLaunchContextMap` supplies SDC launch context, meaning named resources (such as the current `patient`) that the Questionnaire's expressions can reference.

## Checkpoint

The form renders your Questionnaire's items, a required question left empty blocks submission with a validation message, and completing the form delivers a `QuestionnaireResponse` whose `item` answers echo what you entered.

## Next step

[Control rendering behavior](/fhir-foundation/kotlin-fhir-data-capture/render-a-questionnaire/) with configuration flags, review flows, and resolvers.
