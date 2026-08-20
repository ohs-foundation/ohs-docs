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
  label: Get started
  to: /get-started/
secondary_action:
  label: View OHS Player source
  href: https://github.com/ohs-foundation/ohs-player
---

## What OHS Player is

[Open Health Stack](https://ohs.foundation/) provides open-source building blocks for FHIR-native healthcare software. OHS Player is the reference toolkit that shows how those blocks assemble into a working end-to-end platform. That platform is a multiplatform client for frontline health workers, a browser portal for administrators, a gateway that carries authentication and access control, and an analytics pipeline behind them.

It is a working skeleton. Everything in it runs, and everything in it is meant to be replaced with your own. The value is not the code you keep. It is knowing what a FHIR-native, offline-first, multiplatform system looks like once the pieces are connected.

Player stops at a reference environment you can run and study. Hardening, scaling, and production operations are the implementing team's work, because those decisions belong to a specific programme.

## Where to start

| If you want to | Go to |
| --- | --- |
| Decide whether Player suits your programme | [What OHS Player is](/concepts/what-ohs-player-is/) |
| See how the components connect | [The architecture](/concepts/architecture/) |
| Get a reference environment running | [Get started](/get-started/) |
| Adapt it without writing code | [Configure a screen from FHIR data](/configure/screen-from-fhir-data/) |
| Build directly on the FHIR libraries | [FHIR Foundation](/fhir-foundation/) |
| Extend a component or contribute | [Resources and contributing](/resources/) |

## What is in the toolkit

| Component | Role |
| --- | --- |
| [Client App](/components/client-app/) | The Kotlin Multiplatform application for frontline health workers, built for Android, iOS, desktop, and browser from one source tree |
| [Web Portal](/components/web-portal/) | Browser administration for users, roles, organisations, care teams, and locations |
| [Reference Backend](/components/reference-backend/) | Custom endpoints and access rules loaded into a FHIR Gateway host |
| [Reference Infrastructure](/components/reference-infrastructure/) | The deployment material that brings the shared environment up |
| [Reference Analytics](/components/reference-analytics/) | ViewDefinitions, indicators, and the reference dashboard |

Two libraries sit underneath rather than beside these. [Player Client](https://github.com/ohs-foundation/player-client) renders healthcare screens from configuration, and the [Player Configuration IG](https://github.com/ohs-foundation/player-reference-ig) defines the FHIR vocabulary that configuration is written in. [The configuration model](/concepts/configuration-model/) explains how they work together.

## The FHIR Foundation libraries

Beneath the whole toolkit sits [FHIR Foundation](/fhir-foundation/). It provides Kotlin Multiplatform libraries for the FHIR data model and FHIRPath evaluation, plus client SDKs built on them for on-device storage and sync and for Questionnaire-based data capture. Player's client is built on this stack, and it is equally usable in your own applications without the rest of Player. Its documentation is its own section, written for developers consuming the libraries and SDKs directly.

## The wider ecosystem

Player assembles components that exist independently of it. The [OHS Foundation projects page](https://ohs.foundation/projects) is the catalogue for those components and the source for their maturity.

This site covers only how Player uses them. See [How Player uses OHS components](/concepts/how-player-uses-ohs-components/).
