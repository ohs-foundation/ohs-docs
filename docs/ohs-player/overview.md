---
id: overview
title: What OHS Player is
description: A reference toolkit that shows how Open Health Stack components assemble into a working digital health system.
slug: /ohs-player/
sidebar_label: Overview
sidebar_position: 5
guide_type: Concept
guide_status: ready
repository: ohs-player
---

## Summary

OHS Player is a reference toolkit for the [Open Health Stack](https://ohs.foundation/). It takes the unbundled building blocks including Kotlin FHIR libraries, gateway access proxy, and SQL-on-FHIR pipelines, and demonstrates how they assemble into an end-to-end digital health application stack.

Every part of OHS Player is runnable open source software designed to be configured or replaced to meet the needs of specific health programmes.

## Who it is for

- **Evaluators** exploring what the Open Health Stack provides across mobile, backend, and analytics layers in a running environment.
- **Implementers** building on Open Health Stack who need reference architecture patterns, sample configurations, and deployment blueprints.
- **Builders and developers** extending gateway endpoints, creating custom UI renderers, or contributing to the core open source repositories.

## Scope and boundaries

- **Reference implementation** provides a fully functional demonstration environment for local evaluation and developer testing.
- **Production hardening** such as cloud infrastructure provisioning, high availability clustering, formal penetration testing, and disaster recovery planning is managed by the implementing organisation.
- **Flexible clinical domain** provides general healthcare patterns including patient registration, encounter tracking, and indicator aggregation that adapt to any clinical specialty.

## Configure then extend

Open Health Stack separates adaptation into two clear tiers.

- **Declarative configuration** changes application behavior without writing code. Screen layouts, clinical questionnaires, and SQL-on-FHIR analytics views are defined in standard FHIR resources.
- **Code extension** adds custom capabilities when standard configuration is not sufficient, such as new Jetpack Compose renderers or custom gateway REST endpoints.

Most adaptation happens through declarative configuration without recompiling mobile binaries.

## Where to go next

- [The architecture](/ohs-player/architecture/) details how the frontline client, web portal, gateway, and analytics connect.
- [How Player uses OHS components](/ohs-player/how-player-uses-ohs-components/) outlines the foundational libraries underlying the reference toolkit.
- [Current capabilities and maturity](/ohs-player/what-you-can-do-today/) summarizes what is runnable today and active development roadmap items.
