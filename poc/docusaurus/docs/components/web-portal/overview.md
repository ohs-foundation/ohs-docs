---
title: Web Portal
description: The browser-based administration portal for workforce, access, and configuration data.
slug: /components/web-portal/
sidebar_position: 10
guide_type: Component overview
guide_status: partial
guide_focus: Web-based workforce and configuration portal
repository: web-portal
---

## What it is

The Reference Web Portal is the administrative interface in the reference set. It manages workforce hierarchies, user accounts, access controls, locations, and configuration — the data a client application needs before anyone can use it operationally.

## What it demonstrates

That programme administration can be built directly on FHIR resources and gateway APIs rather than on a separate administrative database. The organisations, practitioners, and locations an administrator manages are the same FHIR resources the Client App reads.

## When to use it

Use it to prepare an environment before running the Client App against it, and as the starting point for a programme's own administration tooling.

It is also the quickest component to see working. Its Docker Compose setup starts HAPI FHIR, Keycloak, and a development gateway locally, so it does not wait on a shared environment.

## What it needs

| Depends on | Required or optional | Notes |
| --- | --- | --- |
| Node and pnpm | Required | The run guide states supported versions |
| Docker | Required | Runs the backing services |
| HAPI FHIR | Required | Started locally by the Portal's own Compose setup |
| Keycloak | Required | Started locally, with a realm imported at first run |
| A FHIR Gateway | For custom endpoints | Player-specific endpoints are served by the gateway, not by the Portal |

The last row is the boundary worth knowing: the Portal talks to the FHIR store directly by default, and custom Player APIs come from a gateway alongside it rather than from the Portal itself.

## Where to start

[Run the Web Portal](/components/web-portal/run/) brings up the services, imports the realm, and signs you in.

For Player-specific gateway APIs on top of it, [add the Reference Backend extensions](/extend/backend-extensions/).

## Source and releases

The [ohs-player-reference-web-portal repository](https://github.com/ohs-foundation/ohs-player-reference-web-portal) owns the application, its Compose setup, and its quickstart.
