---
title: Reference components
description: What each OHS Player component is for, and what you can do with it today.
slug: /components/
sidebar_position: 10
guide_type: Component overview
guide_status: ready
guide_focus: The Player component set
repository: ohs-player
---

## What you can do today

Player is five components plus the libraries that configure them. They are separately useful: you do not need all of them to see something working.

| Component | What you can do with it | Source |
| --- | --- | --- |
| [Client App](/components/client-app/) | Build and run the reference application on Android, iOS, desktop, and browser | [player-reference](https://github.com/ohs-foundation/player-reference) |
| [Web Portal](/components/web-portal/) | Start it with its own FHIR and identity services and administer workforce data | [ohs-player-reference-web-portal](https://github.com/ohs-foundation/ohs-player-reference-web-portal) |
| [Reference Backend](/components/reference-backend/) | Build Player endpoints and access checkers into a FHIR Gateway host | [ohs-player-reference-backend](https://github.com/ohs-foundation/ohs-player-reference-backend) |
| [Reference Infrastructure](/components/reference-infrastructure/) | Understand the shared environment the other components run against | [ohs-player-reference-infrastructure](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) |
| [Reference Analytics](/components/reference-analytics/) | Understand how Player FHIR data becomes dashboards | [ohs-player-reference-analytics](https://github.com/ohs-foundation/ohs-player-reference-analytics) |

The Web Portal is the quickest thing to see working, because it starts the services it needs.

## The two layers

**The applications you run** are the Client App and the Web Portal. They are what an end user or an administrator actually opens.

**The services they run against** are Reference Infrastructure, the Reference Backend, and Reference Analytics. Infrastructure provides the shared environment, the Backend adds Player-specific APIs and access rules to the gateway in front of it, and Analytics reads from it for reporting.

## The configuration layer

Two libraries sit underneath rather than beside the components, and neither is something you deploy.

- **[Player Client](https://github.com/ohs-foundation/player-client)** is the Kotlin Multiplatform library inside the Client App that renders healthcare UI from configuration.
- **[Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig)** defines the FHIR resources and vocabulary that configuration is written in.

[The configuration model](/concepts/configuration-model/) explains how they work together.

## Where to go next

[Get started](/get-started/) for the order to take these in, or open a component above to see what it is for and what guidance exists.
