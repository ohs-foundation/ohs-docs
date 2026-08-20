---
title: Get started
description: Bring up a reference environment, administer it, run the Client App against it, and add reporting.
slug: /get-started/
sidebar_position: 20
guide_type: Get started
guide_status: partial
guide_focus: The order to take the Player components in
repository: ohs-player
---

## What you will have at the end

One shared environment, with every Player component running against it.

A programme structure you created (organisations, locations, care teams, and health workers), administered through the Web Portal. A health worker signed in on the Client App, capturing data and syncing it through the gateway to the FHIR server. And a dashboard reading that same data through the analytics pipeline.

That is the whole reference, the round trip from a health worker in a village to an indicator on a chart.

## Before you start

Each guide states its own versions, but you need all of the following somewhere on the path, so it is worth having them ready.

| For | You need |
| --- | --- |
| The environment and the analytics stack | Docker Engine with Compose v2 |
| The environment scripts | Bash, GNU gettext for `envsubst`, and OpenSSL. On Windows use WSL |
| Building the Reference Backend and the Client App | JDK 21 |
| The Web Portal | Node and pnpm |
| Android and iOS builds | Android Studio, and Xcode on macOS |

Nothing conceptual is required first. [What to know first](/prerequisites/) is background that makes the rest of the site easier, not a gate.

## The sequence

The order matters. Each stage depends on the one before it, because every client reaches FHIR through the gateway rather than directly.

**1. Bring up the reference environment.** [Set up the environment](/components/reference-infrastructure/) starts PostgreSQL, Keycloak, HAPI FHIR, and the FHIR Gateway together, and tells you how to confirm they are healthy. This is the shared environment everything else points at.

**2. Load the Reference Backend into the gateway.** [Set up the backend](/components/reference-backend/run/) builds the plugin and loads it into the gateway host. Both the Web Portal and the Client App consume the endpoints it adds, so this is part of preparing the environment rather than an optional extra.

**3. Administer the programme in the Web Portal.** [Run the Web Portal](/components/web-portal/run/) against the environment from step 1, then create the organisations, locations, care teams, and users your scenario needs. What you set up here determines what each health worker's device receives.

**4. Run the Client App.** [Run the Client App](/components/client-app/run/) builds the application for your target and points it at the same environment. Sign in as one of the health workers you created, capture data, and sync.

**5. Add analytics.** [Set up analytics](/components/reference-analytics/run/) starts the pipeline and the dashboard with an additional profile on the same stack from step 1. It ships pointed at a synthetic dataset so dashboards are populated immediately, and can be pointed at the data you captured in the previous steps instead.

## How the pieces find each other

Every client needs the same three things, and knowing that makes the configuration in each guide easier to follow.

- **The FHIR base URL**, reached through the gateway, never the FHIR server directly
- **The gateway URL**, which also serves the Reference Backend endpoints
- **The identity issuer**, meaning the Keycloak realm, plus a client for the application signing in

The environment from step 1 supplies all three. Each guide states which setting carries which value for that component.

## Where to go next

Once the reference runs, [Configure a screen from FHIR data](/configure/screen-from-fhir-data/) is the first step from *running* to *yours*.

[Decide when code is necessary](/extend/decide/) helps work out whether a change belongs in configuration, a renderer, or the application itself.
