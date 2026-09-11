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

The Reference Web Portal is the administrative interface in the reference set. It manages the structure a programme runs on. Organisations, the location hierarchy, care teams, user accounts, and the roles those accounts hold.

This is the data a client application needs before anyone can use it operationally.

## What it demonstrates

That programme administration can be built directly on FHIR resources and gateway APIs rather than on a separate administrative database. The organisations, practitioners, and locations an administrator manages here are the same FHIR resources the Client App reads.

The Portal is a browser application with no backend of its own. Every action it takes is an HTTP request to something else, which is what makes it a demonstration rather than a dependency. A programme can replace the whole interface and keep the API layer underneath it unchanged.

## The two places it sends requests

Every screen talks to one of two bases, and knowing which is which explains most of the Portal's behaviour.

| Where a request goes | What it carries |
| --- | --- |
| The FHIR base URL | Standard FHIR reads and writes, for `Practitioner`, `Location`, `Organization`, `CareTeam`, and the rest |
| The gateway root | The endpoints plain FHIR does not cover, such as `/api/users`, `/api/location-hierarchy`, and `/api/bulk-import/locations` |

Both are derived from one setting. The Portal takes the gateway root by removing a trailing `/fhir` from the FHIR base URL, so that URL has to end in `/fhir` or the gateway calls resolve to the wrong place. [Configure the Web Portal](/configure/web-portal-configuration/) covers the setting itself.

## What an administrator does with it

It is where a programme is set up before anyone uses it operationally, by creating the organisations and facilities, building the location hierarchy, forming care teams, and creating the health worker accounts that sign in on the Client App.

That last point is the one worth understanding, because it is easy to misread. **The Portal does not push anything to devices.** The assignments made here, meaning a health worker's location, care team, and organisation, are stored as FHIR resources, and the gateway's access rules read them to decide what that worker's device is allowed to receive. The Portal shapes access, and the gateway enforces it.

It also carries a FHIR browser, so an administrator can look at the records the Client App produced without writing a FHIR query. [What each screen does](/components/web-portal/screens/) is the page-by-page account.

## The library underneath

The repository publishes two things. The Portal application is one. The other is `ohs-player-web-core`, a library carrying the parts that are not screens. Sign-in over OpenID Connect, the role and permission model, the FHIR client, feature flags, theming, and translation.

That split matters if you are planning to build your own administration interface. You can depend on the library, write your own screens, and leave the reference application behind without losing the pieces that are tedious to rebuild.

## What it does not do

Stating these plainly saves an evaluation from a surprise later.

- It does not push configuration or data to devices. The gateway decides what a device receives.
- It does not fully deactivate a person. Creating a user creates their identity account, but deactivating one changes FHIR records alone and leaves that account able to sign in.
- It does not export. The Export controls on the list screens show a notice instead of producing a file.
- It does not read configuration at runtime. Settings compile into the bundle, so a new environment means a new build.

## What it needs

| Depends on | Notes |
| --- | --- |
| Node and pnpm | The run guide states supported versions |
| A running environment | The FHIR server, identity, and gateway from [set up the environment](/components/reference-infrastructure/) |
| The Reference Backend | Its user, role, and location-hierarchy endpoints are what the Portal calls |

## Where to start

[Run the Web Portal](/components/web-portal/run/) points it at your environment and signs you in.

After that, [what each screen does](/components/web-portal/screens/) covers the data each screen touches, and [who can reach what](/configure/web-portal-access/) covers the roles that open those screens.

## Source and releases

The [ohs-player-reference-web-portal repository](https://github.com/ohs-foundation/ohs-player-reference-web-portal) owns the application, its Compose setup, and its quickstart.
