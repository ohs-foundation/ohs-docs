---
id: how-player-uses-ohs-components
title: How Player uses OHS components
description: Foundational Open Health Stack building blocks and what the Player reference toolkit adds.
slug: /ohs-player/how-player-uses-ohs-components/
sidebar_position: 10
guide_type: Concept
guide_status: ready
repository: ohs-player
---

## Foundational building blocks

Open Health Stack provides unbundled open source building blocks that can be imported independently into any digital health project.

![The FHIR Foundations stack showing how Kotlin FHIR Data Capture and Kotlin FHIR Engine layer on top of Kotlin FHIRPath and Kotlin FHIR data model.](../../images/fhir-foundations-architecture.svg)

| Foundational component | Capability provided | Consumed by |
| --- | --- | --- |
| `kotlin-fhir` | Type-safe FHIR data models and JSON serialization | Client App |
| `kotlin-fhirpath` | FHIRPath expression evaluation engine | Client App |
| `kotlin-fhir-engine` | On-device encrypted SQLite persistence and sync | Client App |
| `kotlin-fhir-data-capture` | Structured Data Capture (SDC) questionnaire rendering | Client App |
| Info Gateway | Authentication proxy and custom extension framework | Reference Backend |
| FHIR Data Pipes | SQL-on-FHIR extraction pipelines for analytics | Reference Analytics |

## What the Player reference toolkit adds

| Reference component | What it adds |
| --- | --- |
| Player Client | Renders dynamic screens from declarative FHIR configuration |
| Configuration IG | Standard FHIR implementation guide defining screen layouts and views |
| Reference Backend | Custom gateway endpoints and role-based access rules |
| Reference Analytics | SQL-on-FHIR view definitions, queries, and Superset dashboard definitions |
| Reference Infrastructure | Turnkey Docker Compose topology linking all services |

## Where to go next

- [The configuration model](/ohs-player/configuration-model/) explains how screens and forms are configured with standard FHIR resources.
- [Component directory](/components/) provides technical summaries for each piece.
