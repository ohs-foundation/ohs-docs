---
title: What you can do today
description: What the Player components do now, what is on the roadmap, and whether Player suits your programme.
slug: /concepts/what-you-can-do-today/
sidebar_position: 25
guide_type: Concept
guide_status: ready
guide_focus: Current capability, roadmap, and fit
repository: ohs-player
---

## Why this page exists

Player is a reference under active development, and the gap between what it demonstrates and what it does is worth knowing before you invest a team's time rather than after.

Everything below describes the software. Where a capability is on the roadmap rather than in the code, this page says so.

## What runs now

| Component | What works today |
| --- | --- |
| Reference Infrastructure | One command brings up PostgreSQL, Keycloak, HAPI FHIR, and the gateway, with health checks and a reset |
| Reference Backend | Custom endpoints for users, groups, roles, location hierarchy, practitioner details, and bulk CSV import, plus an access checker enforcing per-verb, per-resource permissions |
| Web Admin Portal | Sign-in through OIDC, and management of users, roles, organisations, care teams, and location hierarchies, with a FHIR browser for records |
| Client App | Builds and runs on Android, iOS, desktop, and the browser, rendering screens from FHIR configuration |
| Sync | The Client App syncs with the FHIR server through the gateway |
| Data capture | FHIR SDC questionnaires with template-based extraction |
| Reference Analytics | ViewDefinitions, indicator queries, and a reference dashboard over a PostgreSQL analytics schema |

Taken together, that is a connected round trip. An administrator sets up programme structure in the portal, a health worker captures data in the app, it reaches the FHIR server through the gateway, and it arrives in the analytics schema behind the dashboard.

## What the software does not do yet

**Clinical workflow is not implemented in the multiplatform libraries.** The `$apply` operation, CarePlan generation from PlanDefinition, task and appointment generation, the due and overdue task scheduler, measure reports, and CQL evaluation are all on the roadmap. They exist in the original Android FHIR SDK and are being migrated.

**Extraction is template-based.** StructureMap-based extraction is a roadmap item, and template-based extraction using FHIRPath covers the reference use case today.

**Other roadmap items** include on-device encryption, bulk import through the portal interface rather than the API, single sign-on for the dashboard, and an audit events view.

**Production concerns are out of scope for the reference itself.** Hardened deployment workflows, cloud templates, and infrastructure-as-code are roadmap items, and the deployment decisions that matter most are the ones specific to a programme.

## Maturity

Nothing in Player is generally available. Every component, and every library it depends on, is a prerelease.

**FHIR Foundations** is the Kotlin Multiplatform rewrite of the original Android FHIR SDK, covering Android, iOS, desktop, and the browser from one source tree. Its libraries sit at alpha, beta, and release-candidate stages depending on the library.

Player is built on that generation. The rewrite buys multiplatform reach and sheds a set of older, slower dependencies, and the cost is that some of what Player depends on is still early. That trade is worth making deliberately rather than discovering later.

## Is Player a fit for your programme?

**A good fit when** you are starting FHIR-native rather than migrating a legacy data model, when offline-first matters because the work happens where connectivity does not reach, when you need more than one platform, when you would rather configure a reference than fork one, or when you are evaluating what the Open Health Stack makes possible.

**Think carefully when** you need production deployment on a short timeline, when on-device encryption is a regulatory requirement today, or when clinical decision support is central to your first release. In each case the capability is on the roadmap rather than in the code, and building on a moving foundation is a real cost to plan for.

## Where to go next

[Get started](/get-started/) brings up a reference environment and runs the components against it.

[What to know first](/prerequisites/) is the background reading that makes the rest of the site easier.
