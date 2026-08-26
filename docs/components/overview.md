---
title: What each piece does
description: Which component provides a capability, and which page to open for it.
slug: /components/
sidebar_position: 10
guide_type: Concept
guide_status: ready
guide_focus: Mapping capabilities to components
repository: ohs-player
---

## Which piece does what

Player is five components built on the Open Health Stack's foundational libraries. This is the lookup for which one provides a capability, and what it is built on.

| To do this | Player component | Built on |
| --- | --- | --- |
| Store health data on a device | Client App | `kotlin-fhir-engine` |
| Work offline | Client App | `kotlin-fhir-engine` |
| Sync with a server | Client App | `kotlin-fhir-engine` |
| Render a form and capture an answer | Client App | `kotlin-fhir-data-capture` |
| Turn FHIR into what a screen shows | Client App | Player Client, using SQL-on-FHIR ViewDefinitions |
| Declare what a screen shows | Configuration IG | SQL-on-FHIR |
| Evaluate an expression over FHIR | Client App | `kotlin-fhirpath` |
| Sign a user in | Client App and Web Portal | Keycloak, through the FHIR Gateway |
| Decide whether a FHIR request is allowed | Backend | FHIR Gateway access checkers |
| Serve APIs beyond plain FHIR | Backend | FHIR Gateway custom endpoints |
| Manage users, roles, organisations, care teams, and locations | Web Portal | Backend endpoints |
| Store FHIR data | none | HAPI FHIR |
| Flatten FHIR into reportable tables | Analytics | FHIR Data Pipes |
| Serve dashboards and ad-hoc queries | Analytics | PostgreSQL and Apache Superset |
| Bring the whole environment up | Reference Infrastructure | Docker Compose |

Storing FHIR data has no Player component beside it on purpose. The FHIR server stays unmodified. That is the point of putting the gateway in front of it.

## The component pages

| Component | What it is |
| --- | --- |
| [Client App](/components/client-app/) | The application frontline health workers use, on four platforms |
| [Configuration IG](/ohs-player/configuration-ig/) | The FHIR contract that drives what the app renders |
| [Backend](/components/reference-backend/) | The gateway, its Player extensions, identity, and the FHIR server |
| [Web Portal](/components/web-portal/) | Browser administration for programme structure and users |
| [Analytics](/components/reference-analytics/) | The reporting pipeline and dashboard |

Reference Infrastructure is not in that list. It is deployment material rather than a component you use, so it opens [Run it](/get-started/) instead.

## Where to go next

[The architecture](/ohs-player/architecture/) shows how these connect and why every request routes through the gateway.

[How Player uses OHS components](/ohs-player/how-player-uses-ohs-components/) draws the line between what Player owns and what the wider Open Health Stack owns.
