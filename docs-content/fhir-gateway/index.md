---
title: FHIR Gateway
description: A proxy server that applies access-control policies in front of a FHIR store.
sidebar_position: 1
guide_type: Component
guide_status: Reference pending
guide_focus: FHIR access control
repository: fhir-gateway
---

## What it provides

FHIR Gateway is a generic proxy server for applying access-control policies for a FHIR
store. Deployments extend it with access-checker plugins and custom endpoints rather than
modifying the FHIR server itself.

## Where it is used

OHS Player runs FHIR Gateway as the host for its Reference Backend, which supplies
Player-specific endpoints and access-checker plugins. See
[Add backend extensions](/ohs-player/setups/backend-extension/) for that setup, and
[How Player uses OHS components](/ohs-player/concepts/how-player-uses-ohs-components/) for
the dependency relationships.

## Reference material

Configuration, deployment, and plugin development are documented in the component
repository.
