---
id: zero-code-screens
title: Tutorial · Zero-Code Screen Configuration
description: Adapt patient registers, clinical profiles, and task lists without writing code using the Configuration Implementation Guide.
slug: /tutorials-and-codelabs/zero-code-screens/
sidebar_label: 5. Zero-Code Screens Tutorial
sidebar_position: 50
guide_type: Tutorial
guide_status: ready
repository: configuration-ig
---

## Overview

In this tutorial, you will customize frontline patient registers and clinical summary screens purely through declarative FHIR resources without recompiling mobile or desktop application binaries.

You will write a `ViewDefinition` to extract clinical fields, link them using `ViewJoinMap`, and distribute the configuration over the air.

## Prerequisites

- Local reference infrastructure running
- Player Client App installed or running locally

## Step 1 · Define a patient summary ViewDefinition

Create a `ViewDefinition` resource to extract patient names, birthdates, and identification numbers.

```json
{
  "resourceType": "http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewDefinition",
  "id": "patient-summary-view",
  "name": "patient_summary",
  "status": "active",
  "resource": "Patient",
  "select": [
    {
      "column": [
        { "name": "patient_id", "path": "id" },
        { "name": "full_name", "path": "name.first().text" },
        { "name": "birth_date", "path": "birthDate" },
        { "name": "gender", "path": "gender" }
      ]
    }
  ]
}
```

## Step 2 · Create a ViewJoinMap for active conditions

Combine the patient view with active diagnoses using a `ViewJoinMap` resource.

```json
{
  "resourceType": "http://hl7.org/fhir/uv/sql-on-fhir/StructureDefinition/ViewJoinMap",
  "id": "patient-with-conditions-map",
  "name": "patient_with_conditions",
  "from": "patient_summary",
  "resource": "Patient",
  "view": { "reference": "ViewDefinition/patient-summary-view" },
  "joins": [
    {
      "name": "active_conditions",
      "resource": "Condition",
      "view": { "reference": "ViewDefinition/condition-view" },
      "match": { "from": "patient_id", "to": "subject.reference" }
    }
  ]
}
```

## Step 3 · Publish configuration to the FHIR store

Upload your updated `ViewDefinition` and `ViewJoinMap` resources to the central FHIR server via the gateway.

```sh
curl -X POST http://localhost:8083/fhir/ViewDefinition \
  -H "Content-Type: application/json" \
  -d @patient-summary-view.json
```

## Step 4 · Verify dynamic UI updates on device

Open the Player Client application and trigger a sync. The client downloads the updated configuration resources and renders the new summary columns instantly without requiring a binary rebuild.

## Where to go next

- Read the full [Configuration IG documentation](/ohs-player/configuration-ig/).
- Explore the [Configure a screen guide](/configure/screen-from-fhir-data/).
