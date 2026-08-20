---
title: Web Portal
description: The browser-based administration portal for workforce, access, and configuration data.
slug: /components/web-portal/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: Web-based workforce and configuration portal
repository: web-portal
---

## What it is

The Reference Web Portal is the administrative interface in the reference set. It manages workforce hierarchies, user accounts, access controls, locations, and configuration. This is the data a client application needs before anyone can use it operationally.

## What it demonstrates

That programme administration can be built directly on FHIR resources and gateway APIs rather than on a separate administrative database. The organisations, practitioners, and locations an administrator manages are the same FHIR resources the Client App reads.

## What an administrator does with it

It is where a programme is set up before anyone uses it operationally, by creating the organisations and facilities, building the location hierarchy, forming care teams, and creating the health worker accounts that sign in on the Client App.

That last point is the one worth understanding, because it is easy to misread. **The Portal does not push anything to devices.** The assignments made here (a health worker's location, care team, and organisation) are stored as FHIR resources, and the gateway's access rules read them to decide what that worker's device is allowed to receive. The Portal shapes access, and the gateway enforces it.

It also carries a FHIR browser, so an administrator can look at the records the Client App produced without writing a FHIR query.

## When to use it

Use it to prepare an environment before running the Client App against it, and as the starting point for a programme's own administration tooling.

## What it needs

| Depends on | Notes |
| --- | --- |
| Node and pnpm | The run guide states supported versions |
| A running environment | The FHIR server, identity, and gateway from [set up the environment](/components/reference-infrastructure/) |
| The Reference Backend | Its user, role, and location-hierarchy endpoints are what the Portal calls |

The Portal is a browser application with no backend of its own. Everything it does is a call to the gateway, which is what makes it a demonstration rather than a dependency. A programme can replace it entirely and keep the same API layer underneath.

## Where to start

[Run the Web Portal](/components/web-portal/run/) points it at your environment and signs you in.

## Source and releases

The [ohs-player-reference-web-portal repository](https://github.com/ohs-foundation/ohs-player-reference-web-portal) owns the application, its Compose setup, and its quickstart.
