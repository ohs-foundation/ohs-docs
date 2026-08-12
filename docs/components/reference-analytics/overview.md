---
title: Analytics
description: How Player FHIR data becomes reportable tables and dashboards.
slug: /components/reference-analytics/
sidebar_position: 50
guide_type: Component overview
guide_status: partial
guide_focus: The analytics pipeline and reporting model
repository: analytics
---

## What it is

Analytics turns the FHIR data the Client App and Web Portal produce into tables a reporting tool can query, and serves dashboards over them.

It is not a separate deployment. The pipeline, its analytics database, and the dashboard tool ship as part of [Reference Infrastructure](/components/reference-infrastructure/), started with an additional profile alongside the core services.

## Why a reporting layer is needed at all

FHIR is excellent for exchange and unusable for reporting. Resources are deeply nested documents, and no business intelligence tool can meaningfully query them. Counting how many households a health worker registered last month against raw FHIR is not a query anyone wants to write.

The answer is not a second database that duplicates the clinical record. It is a declarative projection from FHIR into flat tables, which is exactly what SQL-on-FHIR describes.

## Three stages

**Extract.** The pipeline reads resources from the FHIR server using standard FHIR Search, filtering on last-updated so each run fetches only what changed.

**Transform.** It applies a `ViewDefinition` per resource type, flattening nested FHIR into rows and columns.

**Serve.** The rows are written to a dedicated PostgreSQL database, and the dashboard tool queries that.

Two properties of this arrangement matter more than the mechanics.

**The pipeline is read-only with respect to FHIR.** It never writes back. The core stack — FHIR server, identity, gateway — is untouched by analytics, so reporting cannot affect the clinical record.

**It is scheduled, not live.** The pipeline runs on a schedule and can also be triggered by hand. Reports reflect data as of the last run rather than the current moment, which is the right trade for reporting and the wrong one for anything operational.

## The same idea as the Client App

`ViewDefinition` is the SQL-on-FHIR artifact the [configuration model](/concepts/configuration-model/) already uses to project FHIR into what a screen shows. Analytics applies the same declarative projection to produce reporting tables instead.

One idea, two destinations. A team that has understood how a register is configured has already understood how a reporting table is defined.

The reference set covers the resource types the community health scenario produces: patients, practitioners and their roles, organisations, locations, households, related people, encounters, conditions, observations, care plans, tasks, immunizations, medication requests, procedures, and diagnostic reports.

## Which FHIR server it reads

The pipeline reads from whichever FHIR server it is configured to point at, and the reference ships pointed at a separate server holding a synthetic dataset rather than at the transactional one.

That is a convenience, not a limitation. Dashboards are populated from the first run, so you can see what the reporting layer does without first generating enough real activity to make a chart meaningful. Pointing it at the transactional server is a configuration change.

## Two layers of tables

The analytics database holds two kinds of thing, and knowing which you are querying saves a lot of confusion.

**Flat tables** are one-to-one projections of FHIR resources — a faithful, unaggregated view of the clinical record. They are rewritten by every pipeline run.

**Indicator views** are pre-aggregated: counts and rates at a reporting grain such as month, location, or health worker, joined against resolved dimensions like a location hierarchy or an age band. These are what a dashboard should usually query, because they carry the aggregation and the joins that every chart would otherwise repeat.

## A modelling note worth knowing early

ViewDefinitions expand repeated FHIR elements into multiple rows. A household with four members produces four rows in the household table, one per member — which is what makes that table double as the patient-to-household join.

The consequence is that counting rows is not the same as counting resources. Any query that aggregates over an expanded table has to deduplicate first. This catches people once, and then never again.

## Where to start

[Set up analytics](/components/reference-analytics/run/) starts the pipeline and the dashboard alongside a running environment.

## Source

The [Reference Infrastructure repository](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) owns the pipeline configuration, the ViewDefinitions, and the compose definitions that run them. [FHIR Data Pipes](https://github.com/ohs-foundation/fhir-data-pipes) is the engine underneath and documents how ViewDefinitions are applied.
