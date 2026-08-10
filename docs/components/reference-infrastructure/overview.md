---
title: Reference Infrastructure
description: The deployment material for the shared Player environment that other components run against.
slug: /components/reference-infrastructure/
sidebar_position: 10
guide_type: Component overview
guide_status: pending
guide_focus: Shared Player environment
repository: infrastructure
---

## What it is

Reference Infrastructure is the deployment material for the shared Player environment: the FHIR store, identity and access management, the gateway, and the related deployment assets. It is the layer the other components run against rather than an application in its own right.

## What it demonstrates

How the OHS backend components are packaged together so a team can bring up an environment once and point several applications at it, instead of each application starting its own services.

## When to use it

Use it when you need one environment shared by the Web Portal, the Client App, and Analytics — a demo instance, a team development environment, or the basis of a deployment.

You do not need it to evaluate a single component. The Web Portal starts its own HAPI FHIR and Keycloak for local use, which is enough to see the Portal working.

## What it needs

Docker and Docker Compose. The [Reference Infrastructure repository](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) is the source for the deployment assets and their requirements.

## Where to start

To see Player components running today without a shared environment, follow [Run the Web Portal](/components/web-portal/run/). Its Docker Compose setup starts HAPI FHIR, Keycloak, and a development gateway locally.

For Player-specific gateway APIs on top of that, [add the Reference Backend extensions](/extend/backend-extensions/).

## Where to go next

Once an environment is available, [Run the Client App](/components/client-app/run/) against it.
