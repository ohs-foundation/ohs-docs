---
id: sdc-questionnaires
title: Tutorial · Clinical Questionnaire Authoring and Extraction
description: Author standard Structured Data Capture questionnaires, evaluate real-time FHIRPath validation rules, and extract clinical resources.
slug: /tutorials-and-codelabs/sdc-questionnaires/
sidebar_label: SDC Questionnaires Tutorial
sidebar_position: 20
guide_type: Tutorial
guide_status: ready
repository: kotlin-fhir-data-capture
---

## Overview

In this tutorial, you will design, render, and process a clinical intake questionnaire using the Structured Data Capture (SDC) standard and Jetpack Compose Multiplatform.

You will learn how to build nested form items, apply dynamic calculations with FHIRPath, render forms on device, and extract `Observation` resources automatically upon form submission.

## Prerequisites

- Completed the [Multiplatform Client Codelab](/tutorials-and-codelabs/multiplatform-client/) or have an existing Kotlin Multiplatform project
- `kotlin-fhir-data-capture` imported in your project

## Step 1 · Define a Questionnaire resource

Create a standard FHIR `Questionnaire` resource with validation constraints and choice sets.

```json
{
  "resourceType": "Questionnaire",
  "id": "vitals-check",
  "status": "active",
  "item": [
    {
      "linkId": "systolic",
      "text": "Systolic Blood Pressure (mmHg)",
      "type": "integer",
      "required": true
    },
    {
      "linkId": "diastolic",
      "text": "Diastolic Blood Pressure (mmHg)",
      "type": "integer",
      "required": true
    }
  ]
}
```

## Step 2 · Add real-time FHIRPath validation

Embed dynamic calculate and enableWhen expressions to enforce clinical constraints directly on device.

```json
{
  "linkId": "stage-warning",
  "text": "Elevated blood pressure detected",
  "type": "display",
  "extension": [
    {
      "url": "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression",
      "valueExpression": {
        "language": "text/fhirpath",
        "expression": "%resource.item.where(linkId='systolic').answer.value > 140"
      }
    }
  ]
}
```

## Step 3 · Render the questionnaire in Compose

Render the questionnaire dynamically with Jetpack Compose Multiplatform.

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import dev.ohs.fhir.datacapture.Questionnaire
import dev.ohs.fhir.model.r4.QuestionnaireResponse
import kotlinx.coroutines.launch

@Composable
fun ClinicalIntakeScreen(
  questionnaireJson: String,
  handleFormSubmission: (QuestionnaireResponse) -> Unit,
) {
  val scope = rememberCoroutineScope()

  Questionnaire(
    questionnaireJson = questionnaireJson,
    onSubmit = { getResponse ->
      scope.launch {
        val response = getResponse()
        handleFormSubmission(response)
      }
    },
  )
}
```

## Step 4 · Extract clinical Observation resources

Use template-based extraction to generate structured FHIR `Observation` records from the completed `QuestionnaireResponse`.

```kotlin
import dev.ohs.fhir.datacapture.mapping.TemplateExtractionEngine
import dev.ohs.fhir.model.r4.Bundle

// Extract structured resources using embedded Questionnaire templates
val canExtract = TemplateExtractionEngine.canExtract(questionnaire)

if (canExtract) {
  val transactionBundle: Bundle = TemplateExtractionEngine.extract(
    questionnaire = questionnaire,
    questionnaireResponse = response,
  )
}
```

## Where to go next

- Learn how to visualize clinical indicators in the [SQL-on-FHIR Analytics Tutorial](/tutorials-and-codelabs/sql-on-fhir-analytics/).
- Review [Kotlin FHIR Data Capture documentation](/fhir-foundations/kotlin-fhir-data-capture/).
