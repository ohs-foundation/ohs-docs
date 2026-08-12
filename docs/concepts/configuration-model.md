---
title: The configuration model
description: The surfaces you can configure with FHIR artifacts, and where the boundary with code falls.
slug: /concepts/configuration-model/
sidebar_position: 60
guide_type: Concept
guide_status: ready
guide_focus: What is configurable, and what needs code
repository: player-client
---

## Four surfaces, four standards

Configuration in Player is not one mechanism. It is four, each governed by an existing FHIR standard rather than by something Player invented.

| Surface | What it decides | FHIR artifacts |
| --- | --- | --- |
| Data capture | What a form asks and how it behaves | `Questionnaire`, with Structured Data Capture |
| Extraction | How answers become FHIR resources | Extraction definitions on the questionnaire |
| Views | What a screen shows and how it is arranged | `ViewDefinition`, `ViewJoinMap`, `ViewConfig` |
| Workflow | What work is generated and when it is due | `PlanDefinition`, `ActivityDefinition` |

All of them are packaged together in the [Configuration IG](/concepts/configuration-ig/). The sections below take each in turn.

## Data capture

Forms are FHIR `Questionnaire` resources, using **Structured Data Capture**. The questionnaire describes the questions, their types, their order, and their grouping, and the application renders it — there is no separate form builder and no hand-written form code.

Behaviour comes from expressions carried on the questionnaire rather than from application logic:

- **initial expressions** pre-fill an answer
- **calculated expressions** derive one answer from others
- **answer expressions** supply the options a question offers
- **`x-fhir-query`** pulls existing FHIR data into the form

Validation is part of the questionnaire too — required answers, value ranges, and constraints travel with the form definition.

The codes a question offers are FHIR terminology, so the vocabulary a programme uses is itself configuration rather than something compiled in.

## Extraction

A completed form produces a `QuestionnaireResponse`, which records the answers but is not yet the clinical record. Extraction is the step that turns those answers into the FHIR resources a programme actually queries and reports on — a `Patient`, an `Observation`, a `Group` for a household.

Player uses **template-based extraction** today: the questionnaire carries a template describing the resource to produce, and FHIRPath expressions map answers into its fields.

**StructureMap-based extraction** is the other approach the standard supports, and it is on the roadmap. Template-based extraction covers the reference use case.

This is the surface teams most often underestimate. A form that captures the right answers into the wrong resource shape is a reporting problem later, so extraction is worth designing alongside the questionnaire rather than after it.

## Views

A screen is assembled from three declarative pieces and one piece of application code.

| Piece | What it decides | Configuration or code |
| --- | --- | --- |
| `ViewDefinition` | Which FHIR fields are projected into view state | Configuration |
| `ViewJoinMap` | How several projections compose into one row | Configuration |
| `ViewConfig` | Which renderer options apply | Configuration |
| Renderer | How the resulting view state is drawn | Code |

`ViewDefinition` comes from SQL-on-FHIR — the same specification the analytics pipeline uses to flatten FHIR into reportable tables. One idea, applied to screens instead of tables.

A single ViewDefinition projects one resource type. Because real screens show related data — a patient with their allergies, a household with its members — `ViewJoinMap` names a **pivot** resource that drives the row count and joins further projections onto each row. Its joins describe where each resource sits in a FHIR search response rather than describing a database join, so a view and the query feeding it have to agree.

`ViewConfig` is self-describing: a config declares its own properties and their defaults, and the application generates a typed configuration from that list. Adding a configurable option therefore does not change any schema.

[The Configuration IG](/concepts/configuration-ig/) sets out the full contract. The [Player Client](https://github.com/ohs-foundation/player-client) library reads the configuration, produces the view state, and resolves the renderer.

## Workflow

Clinical workflow is the fourth surface, and it is **on the roadmap** rather than in the code today.

The model is the standard one: a `PlanDefinition` describes what should happen and under what conditions, referencing `ActivityDefinition` resources that describe the work to create. Applying a plan to a patient generates the workflow resources a health worker acts on — a `CarePlan`, and the `Task`, `ServiceRequest`, `MedicationRequest`, or `Appointment` entries under it.

Scheduling falls out of those resources rather than being separate: each carries the period it applies to, which is what makes work classifiable as due, not yet due, overdue, or expired.

[What you can do today](/concepts/what-you-can-do-today/) records where this currently stands.

## Where the code boundary falls

A renderer is registered against a **view type**, not against a screen.

That single decision is what keeps most adaptation in configuration. One renderer serves every screen producing the same shape of view state, so a programme adding a register, a profile screen, or a field is usually writing configuration against renderers that already exist.

You reach for code when you need a shape of view state nothing currently draws — a new kind of widget, a different arrangement, an interaction the reference does not have.

The useful planning question is therefore not "is this a big change?" but "does a renderer already exist for the shape of state I need?" If it does, the work is configuration no matter how much of the screen changes.

## Where to go next

[What you can do today](/concepts/what-you-can-do-today/) sets out how much of this model is running now.

[Configure a screen from FHIR data](/configure/screen-from-fhir-data/) walks through a change, and [decide when code is necessary](/extend/decide/) works through the cases where the answer is not obvious.
