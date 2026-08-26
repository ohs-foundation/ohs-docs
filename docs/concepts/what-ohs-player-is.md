---
title: What OHS Player is
description: A reference toolkit that shows how Open Health Stack components assemble into a working digital health platform.
slug: /concepts/what-ohs-player-is/
sidebar_position: 5
guide_type: Concept
guide_status: ready
guide_focus: What Player is, what it is not, and where it stops
release_tag: Alpha Release
repository: ohs-player
---

## The short version

OHS Player is a reference toolkit for the [Open Health Stack](https://ohs.foundation/). It takes the OHS building blocks (the FHIR libraries, the gateway, the analytics pipeline) and shows how they assemble into an end-to-end digital health platform that runs.

It is a working skeleton. Every part of it is real, runnable software, and every part of it is meant to be replaced with your own.

The value is not the code you keep. It is knowing, before you commit a team to a year of work, what a FHIR-native, offline-first, multiplatform system looks like when the pieces are actually connected.

## What it is not

**Not a product.** There is no deployment of OHS Player that a district runs. Its screens, its forms, its organisational structure, and its indicators are a demonstration, not a programme.

**Not production infrastructure.** Player stops at a reference environment you can run locally and a demonstration you can look at. Hardening, scaling, cloud architecture, security review, and operations are the implementing team's work.

That boundary is deliberate. A reference that pretended to be production-ready would be worse than useless, because the decisions that make a system production-ready are the ones that depend on a specific programme, a specific country, and a specific set of constraints.

**Not programme-specific.** The community health scenario running through this site (a district office, health facilities, villages, care teams, and community health workers) exists to give every guide the same concrete thread. It is illustrative. Nothing about Player assumes community health.

## Who it is for

**Evaluators** deciding whether the Open Health Stack suits a programme. Player is the fastest way to see what the components do together rather than reading five repositories separately.

**Implementors** who have decided to build on OHS and want a running environment, a working example of every layer, and a clear account of what to configure and what to write.

**Contributors** extending a component or building something OHS-shaped of their own.

## Configure, then extend

Player separates two kinds of change, and the distinction runs through the whole site.

**Configuration** changes behaviour without code. Because the configuration is FHIR (questionnaires, view definitions, and the vocabulary that binds them), a programme team can change what a screen shows, what a form asks, and what an indicator counts without a Kotlin compiler.

**Extension** changes behaviour with code, such as a new renderer, a custom gateway endpoint, or an access rule of your own.

Most adaptation is configuration. That is the argument Player exists to make.

## Where to go next

[The architecture](/concepts/architecture/) shows how the components connect and why everything routes through the gateway.

[What you can do today](/concepts/what-you-can-do-today/) is the honest inventory of what runs now, what is on the roadmap, and whether Player fits your programme.
