---
title: The architecture
description: How the Player components connect, why everything routes through the gateway, and how data reaches a dashboard.
slug: /concepts/architecture/
sidebar_position: 8
guide_type: Concept
guide_status: ready
guide_focus: The end-to-end reference architecture
repository: ohs-player
---

## The end-to-end picture

![OHS Player end-to-end architecture. The Client App and Web Admin Portal both reach the HAPI FHIR server through the FHIR Gateway carrying the Reference Backend plugins, with Keycloak alongside as the auth layer. The FHIR Foundations libraries and the Player Configuration IG both feed the Client App. FHIR data flows from HAPI FHIR through FHIR Data Pipes into PostgreSQL, which serves the reference dashboard. Reference Infrastructure packages the gateway, Keycloak, FHIR server, pipeline, and database as a Docker Compose stack.](../images/ohs-player-end-to-end-architecture.svg)

Colour carries the distinction that matters most: purple is an OHS Player reference component, blue is an OHS foundational component that exists independently of Player, and grey is a third-party service or a datastore.

That split is the whole idea. Player owns very little. What it owns is the composition.

## Everything goes through the gateway

The single most important line in the diagram is the one that is not there: neither application talks to the FHIR server directly.

The Client App and the Web Admin Portal both authenticate against Keycloak and then reach FHIR through the gateway. The gateway validates the token, applies access rules, serves the custom endpoints the Reference Backend adds, and proxies everything else through to the FHIR store.

Three consequences follow, and each one is a reason the architecture is shaped this way.

**The FHIR server stays vanilla.** No forked HAPI, no server-side patches for authentication. Swap HAPI for another FHIR server and nothing above the gateway changes.

**Access rules live in one place.** Scoping a health worker to their assigned location, organisation, or care team is enforced at the gateway, not trusted to each application. One rule, every client.

**Clients never implement auth.** The Web Admin Portal was built entirely on gateway APIs — its team wrote no user-management or authentication logic. That is the proof the pattern works: an implementing team can build their own administration tool, with their own branding and workflows, without rebuilding the API layer beneath it.

## Reading the diagram

Position carries meaning, and three bands are worth naming.

**Across the top, what someone opens.** The Client App for frontline health workers, built from one Kotlin source tree for Android, iOS, desktop, and the browser; the Web Admin Portal for programme administrators; and the dashboard for reporting.

**Across the bottom, what runs behind them.** The gateway carrying the Reference Backend plugins, Keycloak for identity, HAPI FHIR as the source of truth, and the analytics pipeline. The dashed boundary is Reference Infrastructure — the Docker Compose stack that brings these up together.

**Outside that boundary, what is compiled in rather than deployed.** FHIR Foundations and the Configuration IG feed the Client App directly. They are not services, which is why they sit outside the dashed line: there is nothing to start.

[What each piece does](/components/) maps a capability to the component that provides it.

## How data flows

A health worker captures data in the Client App. The app holds it locally, because community health work happens where connectivity does not reach.

When it reaches the server, it passes through the gateway, which authorises the request and forwards it to HAPI FHIR. Administrative data — the users, organisations, locations, and care teams the Web Admin Portal manages — arrives at the same store by the same route.

From there, FHIR Data Pipes reads the FHIR resources and applies SQL-on-FHIR ViewDefinitions, flattening deeply nested FHIR JSON into columnar tables in a PostgreSQL analytics schema. The reference dashboard queries those tables.

That last step is worth pausing on. FHIR is excellent for exchange and unusable for reporting — nobody points a business intelligence tool at nested JSON. The ViewDefinition layer is what makes FHIR data answerable, and it is the same declarative idea the Client App uses to project FHIR into screens, applied to reporting instead.

## What administration actually controls

A point that is easy to misread: the Web Admin Portal does not push data to devices.

Assignments configured there — which location, care team, and organisation a health worker belongs to — are stored as FHIR resources. The gateway's access rules read them to decide what that worker's device is permitted to receive. The portal shapes access; the gateway enforces it.

## Where to go next

[How Player uses OHS components](/concepts/how-player-uses-ohs-components/) draws the boundary between what Player owns and what the wider Open Health Stack owns.

[The configuration model](/concepts/configuration-model/) explains how a screen is assembled from FHIR configuration rather than written by hand.

[What you can do today](/concepts/what-you-can-do-today/) sets out which of this is running now.
