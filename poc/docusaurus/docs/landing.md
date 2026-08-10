---
id: landing
title: OHS Player
description: A cross-stack reference toolkit for evaluating, assembling, and adapting Open Health Stack components.
slug: /
sidebar_label: Overview
sidebar_position: 10
hide_title: true
page_type: landing
eyebrow: OHS PLAYER DOCUMENTATION
primary_action:
  label: How to get started
  to: /get-started/
secondary_action:
  label: View OHS Player source
  href: https://github.com/ohs-foundation/ohs-player
---

## What OHS Player is

[Open Health Stack (OHS)](https://ohs.foundation/) provides open-source building blocks for healthcare software. OHS Player is a cross-stack reference toolkit that brings those components together into a working healthcare solution. It demonstrates how components can be combined, deployed, and adapted, giving healthcare implementers and developers a practical starting point for an implementation-specific solution.

Player also showcases OHS features and provides a platform for sharing best practice across common use cases.

Player is not a deployable end-user product, and it is not a runtime embedded inside the client application. It is a reference composition and a starting point for adaptation.

Its pieces fall into three groups.

### The applications you run

- **Reference Web Portal** manages workforce hierarchies, user accounts, access controls, and configuration.
- **Player Reference Client App** is the end-user Kotlin Multiplatform application, built from one source tree for Android, iOS, desktop, and browser.

### The services they depend on

- **Reference Infrastructure** is the deployment material for the shared Player environment.
- **Reference Backend** supplies Player-specific endpoints and access-control plugins for a FHIR Gateway host.
- **Reference Analytics** turns Player FHIR data into PostgreSQL datasets and Superset dashboards.

### The configuration layer you adapt

- **Player Client** is the reusable Kotlin Multiplatform UI library inside the Client App, used when changing how healthcare screens render.
- **Player Configuration IG** defines the FHIR resources and vocabulary that configure what Player Client renders. An implementation guide, or IG, is a published set of such FHIR definitions and rules.

## How the pieces work together

Player assembles the [FHIR Foundations building blocks](https://github.com/ohs-foundation#01--fhir-foundations) into working solutions. [FHIR](https://hl7.org/fhir/) is the standard used to exchange the healthcare information that those solutions manage.

The full reference journey starts with the shared Player environment. HAPI FHIR stores the healthcare data, Keycloak manages identity and issues sign-in tokens, and FHIR Gateway can protect FHIR access and load the Reference Backend APIs. Use the Web Portal to prepare users, roles, workforce information, and configuration. Then run the Client App against that prepared environment. FHIR Data Pipes, PostgreSQL, and Superset are added later for analytics.

## How to get started

This guide shows how to prepare, run, evaluate, and adapt the Player reference components.

For a usable reference application, prepare the shared Player environment first, use the Web Portal for user administration, then run the Client App. This is one guided sequence, not two unrelated application choices.

[How to get started](/get-started/)

## Where things live

### OHS Player repositories

Use these repositories for component source, API detail, releases, and contribution guidance.

- [OHS Player](https://github.com/ohs-foundation/ohs-player)
- [Player Reference Client App](https://github.com/ohs-foundation/player-reference)
- [Reference Web Portal](https://github.com/ohs-foundation/ohs-player-reference-web-portal)
- [Reference Backend](https://github.com/ohs-foundation/ohs-player-reference-backend)
- [Reference Infrastructure](https://github.com/ohs-foundation/ohs-player-reference-infrastructure)
- [Reference Analytics](https://github.com/ohs-foundation/ohs-player-reference-analytics)
- [Player Client](https://github.com/ohs-foundation/player-client)
- [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig)

### Upstream OHS components

The [OHS Foundation Projects page](https://ohs.foundation/projects) is the component catalogue and source of maturity information. This site explains only how Player repositories use components in a setup.

[How OHS Player uses OHS components](/concepts/how-player-uses-ohs-components/)

## Adapt and own it

Player is a starting point. Its client application, portal, backend extensions, configuration, and deployment material are intended to be adapted to the needs of an implementation.

[The configuration model](/concepts/configuration-model/) explains the relationship between the Player client library and the configuration implementation guide.
