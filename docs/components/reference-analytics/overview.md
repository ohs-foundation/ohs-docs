---
title: Reference Analytics
description: The analytics pipeline that turns Player FHIR data into dashboard-ready datasets.
slug: /components/reference-analytics/
sidebar_position: 10
guide_type: Component overview
guide_status: pending
guide_focus: Analytics pipeline and dashboards
repository: analytics
---

## What it is

Reference Analytics turns FHIR data produced by the Client App and Web Portal into dashboard-ready datasets. FHIR Data Pipes applies SQL-on-FHIR ViewDefinitions to HAPI FHIR data, writes the resulting `analytics.*` schema to PostgreSQL, and Apache Superset provides dashboards and ad-hoc queries.

## What it demonstrates

How a FHIR-native reporting layer can be assembled from existing OHS components rather than built as a separate reporting database. The projection from FHIR to flat tables is declarative — the same SQL-on-FHIR idea the Client App uses to project FHIR into view state, applied to reporting instead of screens.

## When to use it

Add Analytics once the operational reference flow works and a programme needs reporting or indicator tracking. It reads from a running environment; it is not part of a first run.

## What it needs

| Depends on | Purpose |
| --- | --- |
| A running shared Player environment | Supplies the FHIR data to transform |
| HAPI FHIR | The source store the pipeline reads |
| [FHIR Data Pipes](https://github.com/ohs-foundation/fhir-data-pipes) | The transformation engine |
| PostgreSQL | Holds the resulting `analytics.*` schema |
| Apache Superset | Serves dashboards and ad-hoc queries |

Docker and Docker Compose run the stack.

## Where to start

The [Reference Analytics repository](https://github.com/ohs-foundation/ohs-player-reference-analytics) owns the ViewDefinitions, indicator SQL, and dashboards. [FHIR Data Pipes](https://github.com/ohs-foundation/fhir-data-pipes) documents the engine underneath, including how ViewDefinitions are applied.

For the operational flow that produces the data, start with [Run the Web Portal](/components/web-portal/run/) and [Run the Client App](/components/client-app/run/).

## Where to go next

[Configure a screen from FHIR data](/configure/screen-from-fhir-data/) when the Client App needs to render data differently.
