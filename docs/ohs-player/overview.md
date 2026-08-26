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

OHS Player is the reference toolkit representing Pillar 02 of the Open Health Stack.

While [FHIR Foundations](/fhir-foundations/) provides the independent core libraries and SDKs for building FHIR-native software, OHS Player demonstrates how those unbundled building blocks including Kotlin FHIR libraries, Info Gateway, and SQL-on-FHIR pipelines assemble into a complete, end-to-end digital health application stack.

In addition to integrating foundational components, OHS Player provides reference libraries and tools for declarative configuration, a web administration portal, and analytics dashboards.

Every part of OHS Player is runnable open source software designed to be evaluated, configured, or replaced to meet the needs of specific health programmes.

## Who it is for

| Audience | Role and goals |
| --- | --- |
| **Evaluators** | Exploring what the Open Health Stack ecosystem provides across mobile, backend, and analytics layers in a live running environment |
| **Implementers** | Building on Open Health Stack components who need reference architecture patterns, sample configurations, and deployment blueprints |
| **Builders and Developers** | Extending gateway endpoints, creating custom UI renderers, or contributing to the core open source repositories |

## Scope and boundaries

- **Demonstration environment** provides a fully functional, runnable stack locally for evaluation and developer testing with sample workflows including patient registration, encounters, and indicator tracking.
- **Production hardening** is managed by implementing organisations, including cloud infrastructure provisioning, high availability clustering, identity federation, security compliance, formal penetration testing, and disaster recovery.
- **Flexible clinical domain** provides general healthcare patterns adaptable to any clinical specialty through configuration rather than hardcoded assumptions.

## Configure then extend

OHS Player establishes a clear architectural boundary between declarative configuration and software extensions.

### 1. Declarative configuration

Most adaptations happen at the content layer without writing code or recompiling mobile binaries.

- **Clinical forms** are authored as standard FHIR `Questionnaire` resources using Structured Data Capture.
- **Screen views** are configured using `ViewDefinition`, `ViewJoinMap`, and `ViewConfig` resources.
- **Clinical workflows** are defined using `PlanDefinition` and `ActivityDefinition` resources.
- **Analytics and metrics** are structured with SQL-on-FHIR view definitions.

All declarative configuration is packaged and versioned in the [Configuration IG](/ohs-player/configuration-ig/).

### 2. Code extensions and customizations

When declarative configuration is not sufficient, developers extend the codebase.

- **Custom UI renderers** add new Jetpack Compose renderers for specialized UI widgets.
- **Gateway plugins** implement custom Info Gateway REST endpoints, auth plugins, or interceptors.
- **Backend integrations** connect external legacy systems or custom FHIR stores.

## Where to go next

- [The architecture](/ohs-player/architecture/) details how the frontline client, web portal, gateway, and analytics connect.
- [How Player uses OHS components](/ohs-player/how-player-uses-ohs-components/) outlines the foundational libraries underlying the reference toolkit.
- [The configuration model](/ohs-player/configuration-model/) details how standard FHIR resources drive client user interfaces.
- [Current capabilities and maturity](/ohs-player/what-you-can-do-today/) summarizes what is runnable today and active development roadmap items.
