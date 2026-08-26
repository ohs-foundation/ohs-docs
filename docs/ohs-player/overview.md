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

OHS Player is the reference toolkit representing Pillar 02 of the [Open Health Stack](https://ohs.foundation/projects).

While [FHIR Foundations](/fhir-foundations/) provides the independent core libraries and SDKs for building FHIR-native software, OHS Player demonstrates how those unbundled building blocks (such as Kotlin FHIR libraries, Info Gateway, and SQL-on-FHIR pipelines) assemble into a complete, end-to-end digital health application stack.

In addition to integrating foundational components, OHS Player adds reference libraries and tools for declarative configuration, a web administration portal, and out-of-the-box analytics dashboards.

Every part of OHS Player is runnable open source software designed to be evaluated, configured, or replaced to meet the needs of specific health programmes.

## Who it is for

| Audience | Role and goals |
| --- | --- |
| **Evaluators** | Exploring what the Open Health Stack ecosystem provides across mobile, backend, and analytics layers in a live running environment. |
| **Implementers** | Building on Open Health Stack components who need reference architecture patterns, sample configurations, and deployment blueprints. |
| **Builders & Developers** | Extending gateway endpoints, creating custom UI renderers, or contributing to the core open source repositories. |

## Scope and boundaries

| Aspect | Scope and expectations |
| --- | --- |
| **Demonstration environment** | A fully functional, runnable local stack for evaluation and developer testing. Player is a **reference implementation**, not an out-of-the-box, "fit for deployment" turnkey production product. |
| **Production hardening** | Cloud infrastructure provisioning, high-availability clustering, identity federation, security compliance, formal penetration testing, and disaster recovery are managed by the implementing organisation. |
| **Clinical workflows** | General healthcare patterns (patient registration, encounters, and indicator tracking) that adapt to any clinical specialty through configuration rather than hardcoded assumptions. |

## Configure then extend (Content vs code)

Adapting OHS Player for your health programme rarely requires rewriting or recompiling applications from scratch. Instead, Player separates day-to-day clinical **content** from the underlying software **code**.

### 1. Content (Configuration without code)

Most everyday adaptations happen simply by updating standard FHIR configuration files.

- **Clinical forms** authored as standard FHIR `Questionnaire` resources using Structured Data Capture (SDC).
- **Screen views** configured using `ViewDefinition`, `ViewJoinMap`, and `ViewConfig` resources.
- **Clinical workflows** defined using `PlanDefinition` and `ActivityDefinition` resources.
- **Analytics & metrics** structured with SQL-on-FHIR view definitions.

> **Standards-based authoring & ecosystem tooling**  
> Because configuration strictly follows HL7 FHIR specifications rather than proprietary formats, you can use the wide ecosystem of existing FHIR tools (such as FHIR questionnaire builders, FHIR Shorthand/SUSHI, and terminology servers) to author and manage clinical content.
> 
> All configuration artifacts are packaged and versioned together in the [Configuration IG](/ohs-player/configuration-ig/). Learn more about how standard resources drive the interface in [The configuration model](/ohs-player/configuration-model/) and follow the step-by-step tutorial in [Configure a screen from FHIR data](/configure/screen-from-fhir-data/).

### 2. Code (Software extensions & Global Goods)

When a programme requires capabilities beyond standard declarative configuration, developers can extend the codebase or connect into the wider digital health ecosystem.

- **Custom UI renderers** add new Jetpack Compose renderers for specialized user interface widgets.
- **Gateway plugins** implement custom Info Gateway REST endpoints, auth plugins, or interceptors.
- **Digital health ecosystem & Global Goods** seamlessly connect with digital public goods and enterprise systems across the health ecosystem, including [OpenMRS](https://openmrs.org/), [DHIS2](https://dhis2.org/), [OpenHIE](https://ohie.org/) architecture patterns, Keycloak identity services, and cloud FHIR repositories.

For guidance on when to configure versus when to write code, see [Deciding how to extend](/extend/decide/) and [Backend extensions](/extend/backend-extensions/).

## Where to go next

- [The architecture](/ohs-player/architecture/) outlines how the reference toolkit connects and the foundational libraries underlying it.
- [The configuration model](/ohs-player/configuration-model/) details how standard FHIR resources drive client user interfaces.
- [Solutions and pathways](/overview/solutions-and-pathways/) explores different adoption models across the Open Health Stack.
- [Current capabilities and maturity](/ohs-player/what-you-can-do-today/) summarizes what is runnable today and active development roadmap items.
