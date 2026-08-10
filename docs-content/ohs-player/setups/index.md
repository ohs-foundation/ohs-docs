---
title: Setups
description: Prepare the shared Player environment, administer it through the Web Portal, then run the Client App.
slug: /ohs-player/setups/
sidebar_position: 1
guide_type: Quick start
guide_status: Guidance available
guide_focus: OHS Player getting-started guidance
repository: ohs-player
---

## Quick start sequence

For the full OHS Player reference journey, use the shared environment rather than treating the Client App as the complete setup.

1. **Prepare the shared Player environment.** HAPI FHIR stores the data, Keycloak supplies identity and access management, and FHIR Gateway hosts protected Player APIs. Start with [Reference Infrastructure](/ohs-player/setups/reference-infrastructure/) and add the [Reference Backend](/ohs-player/setups/backend-extension/) when the environment needs Player-specific APIs.
2. **Run the Web Portal and administer the environment.** The Portal starts its local services, then lets an administrator work with users, roles, workforce structures, and configuration. Follow [Run the Web Portal](/ohs-player/setups/web-portal/).
3. **Run the Client App.** After the shared Player environment and its administration are ready, follow [Run the Client App](/ohs-player/setups/client-app/) to build and launch the Kotlin Multiplatform application.
4. **Adapt the user interface.** Use [Adapt UI configuration](/ohs-player/concepts/configuration/) when a screen needs different data, renderer options, or application behaviour.
5. **Add Analytics when it is available.** [Reference Analytics](/ohs-player/setups/analytics/) is an extension to an already-running shared Player environment, not a first-run requirement.

## What you can run today

The Web Portal repository provides the current local commands for HAPI FHIR, Keycloak, a development gateway, and Portal administration. See the [Reference Infrastructure repository](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) for the source; its setup steps will be added when the deployment material is published. The Analytics repository identifies its intended stack, but its Compose extension and operational runbook are not currently published.

## Guide map

- [Reference Infrastructure](/ohs-player/setups/reference-infrastructure/): shared Player environment deployment material.
- [Add backend extensions](/ohs-player/setups/backend-extension/): Player-specific FHIR Gateway APIs.
- [Run the Web Portal](/ohs-player/setups/web-portal/): user administration and configuration before running the Client App.
- [Run the Client App](/ohs-player/setups/client-app/): the end-user reference application.
- [Adapt UI configuration](/ohs-player/concepts/configuration/): change configured screens or add custom renderers.
- [Reference Analytics](/ohs-player/setups/analytics/): future analytics extension for a running environment.
