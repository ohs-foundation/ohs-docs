---
title: Reference Infrastructure
description: Available source material for the infrastructure that supports integrated Player services.
slug: /setups/reference-infrastructure/
sidebar_position: 4
guide_type: Setup pending
guide_status: Setup procedure pending
guide_focus: Source boundary for integrated Player services
repository: infrastructure
---

## About Reference Infrastructure

Reference Infrastructure is the deployment material for the shared Player environment: the FHIR store, identity and access management, gateway, and related deployment assets. Those services must be available before the Web Portal can administer the environment and before the Client App is used in the full reference journey.

See the [Reference Infrastructure repository](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) for the source. Setup steps will be added to this page when its deployment material is published.

## Continue with local evaluation

For a local Portal evaluation, [Run the Web Portal](/setups/web-portal/). Its Docker Compose setup starts HAPI FHIR, Keycloak, and a development gateway. For Player-specific gateway APIs, [add the Reference Backend extensions](/setups/backend-extension/).
