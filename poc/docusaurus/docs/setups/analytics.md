---
title: Reference Analytics
description: Planned analytics extension for a running shared Player environment.
slug: /setups/analytics/
sidebar_position: 6
guide_type: Setup pending
guide_status: Setup material pending
guide_focus: Analytics pipeline and dashboards
repository: analytics
---

## About Analytics

Analytics transforms FHIR data from the OHS Player reference app and Web Portal into dashboard-ready data. FHIR Data Pipes applies SQL-on-FHIR ViewDefinitions to HAPI FHIR data, writes the resulting `analytics.*` schema to PostgreSQL, and Apache Superset provides dashboards and ad-hoc queries.

## Required environment

You need Docker, Docker Compose, a running shared Player environment, and HAPI FHIR data for the pipeline to transform. Analytics also requires FHIR Data Pipes, PostgreSQL, and Apache Superset. In the reference flow, the Client App and Web Portal provide data through that shared environment; FHIR Gateway and Reference Backend are used where protected Player APIs are required.

## Setup availability

The Analytics repository identifies a Docker Compose extension and operational runbook for this stack. Those files are not currently published in the repository, so there is not yet a start command or health check to follow here.

Complete the [shared Player environment](/setups/reference-infrastructure/), [Web Portal administration](/setups/web-portal/), and [Client App](/setups/client-app/) first. Return to this page when the Analytics Compose extension and runbook are available.

## Next step

[Adapt UI configuration](/concepts/configuration/) when the Client App needs to render data differently.
