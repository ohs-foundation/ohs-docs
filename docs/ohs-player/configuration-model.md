---
id: configuration-model
title: The configuration model
description: Declarative surfaces configured with standard FHIR resources versus code extensions.
slug: /ohs-player/configuration-model/
sidebar_position: 60
guide_type: Concept
guide_status: ready
repository: player-client
---

## Four declarative configuration surfaces

Application behavior in OHS Player is driven by four standard configuration surfaces defined using HL7 FHIR specifications.

| Surface | Purpose | Standard FHIR artifact |
| --- | --- | --- |
| Data capture | Form fields, question groups, and validation rules | `Questionnaire` with Structured Data Capture |
| Resource extraction | Transforming questionnaire responses into clinical resources | Extraction definitions on `Questionnaire` |
| Screen views | Projecting FHIR data into lists and profile screens | `ViewDefinition`, `ViewJoinMap`, and `ViewConfig` |
| Clinical workflow | Defining care plans, scheduled tasks, and activities | `PlanDefinition` and `ActivityDefinition` |

All configuration artifacts are packaged together in the [Configuration IG](/ohs-player/configuration-ig/).

## Data capture and validation

Forms are standard FHIR `Questionnaire` resources using Structured Data Capture. Form fields, input types, groupings, and validation constraints are defined in JSON or XML without custom UI code.

- **Initial expressions** pre-populate answers from patient records.
- **Calculated expressions** compute clinical scores in real time.
- **Answer expressions** supply dynamic option lists using FHIRPath.
- **Validation rules** enforce required fields, value ranges, and regex constraints on device.

## Resource extraction

Completed forms produce a `QuestionnaireResponse` resource. Extraction translates those responses into structured FHIR records such as `Patient`, `Observation`, and `Condition` using template-based extraction and FHIRPath mappings.

## Screen views

Screens are assembled from declarative view definitions and reusable Jetpack Compose renderers.

- **`ViewDefinition`** projects FHIR resource fields into flat view states using SQL-on-FHIR specifications.
- **`ViewJoinMap`** combines multiple related resources such as a patient with active conditions into unified rows.
- **`ViewConfig`** supplies configurable parameters and display options to renderers.
- **Renderers** draw the resulting view states on screen.

## Where the boundary with code falls

- **Declarative configuration** is used when adapting existing screens, adding new questionnaires, modifying indicators, or creating new patient registers.
- **Code extension** is used when creating entirely new UI widget renderers or developing custom gateway endpoints.

## Where to go next

- [The Configuration IG](/ohs-player/configuration-ig/) details the FHIR definitions and logical models.
- [Configure a screen from FHIR data](/configure/screen-from-fhir-data/) provides a step-by-step developer tutorial.
