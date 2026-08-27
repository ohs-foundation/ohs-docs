---
id: what-you-can-do-today
title: Current capabilities and maturity
description: Current runnable features across reference components and development roadmap areas.
slug: /ohs-player/what-you-can-do-today/
sidebar_position: 25
guide_type: Concept
guide_status: ready
repository: ohs-player
---

## Overview

OHS Player is an open source reference toolkit under active development. This page provides a transparent inventory of current software capabilities and active engineering roadmap areas.

## Current runnable capabilities

| Component area | Current capabilities |
| --- | --- |
| Reference Infrastructure | Turnkey Docker Compose topology spinning up PostgreSQL, Keycloak, HAPI FHIR, and Info Gateway with health checks |
| Reference Backend | Custom gateway endpoints for users, groups, roles, location hierarchies, practitioner details, and bulk CSV ingestion |
| Web Admin Portal | OpenID Connect sign-in, user and role management, facility hierarchy configuration, and FHIR resource browsing |
| Client Application | Cross-platform builds on Android, iOS, desktop, and web rendering screens dynamically from FHIR configurations |
| Sync and Offline Persistence | Encrypted SQLite storage on device with bidirectional background sync through Info Gateway |
| Form Data Capture | Rendering Structured Data Capture (SDC) questionnaires with real-time FHIRPath evaluation and template-based extraction |
| Streaming Analytics | Continuous extraction of transactional FHIR records into PostgreSQL via SQL-on-FHIR pipelines with Superset dashboards |

## Active development areas

- **Complex clinical workflow** including automated `$apply` operations for PlanDefinitions and CarePlan generation is transitioning from the original Android FHIR SDK into the multiplatform libraries.
- **StructureMap extraction** for advanced FHIR mapping alongside existing template-based extraction.
- **Enhanced portal management** for visual questionnaire validation and direct audit event inspection.

## Evaluation criteria

- **Strong fit** for teams building new FHIR-native health software, requiring offline-first frontline tools across mobile and desktop, or seeking to eliminate proprietary vendor lock-in.
- **Implementation considerations** include planning for production infrastructure provisioning, organizational access policies, and clinical content authoring tailored to local health guidelines.

## Where to go next

- [Get started](/get-started/) launches the local reference environment with Docker Compose.
- [What to know first](/prerequisites/) provides technical background on FHIR specifications and tools.
