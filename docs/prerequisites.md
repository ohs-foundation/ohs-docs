---
id: prerequisites
title: Technical Prerequisites
description: Tool requirements, core standards, and architectural concepts for building with Open Health Stack.
slug: /prerequisites/
sidebar_label: Prerequisites
sidebar_position: 30
guide_type: Concept
guide_status: ready
repository: ohs-player
---

## Overview

Building with Open Health Stack involves four primary standards and technology layers. This guide summarizes the technical foundation and tooling required.

## Core specifications and standards

### 1. HL7 FHIR (Fast Healthcare Interoperability Resources)
All clinical data, patient identities, and administrative structures are modeled as standard FHIR resources.
- **Resource models** include Patient, Encounter, Observation, Condition, Practitioner, Location, and Organization.
- **Reference** is the official [HL7 FHIR R4 Specification](https://hl7.org/fhir/R4/).

### 2. Structured Data Capture (SDC)
Standard clinical intake forms, branching questionnaires, validation logic, and calculated clinical scores are defined in standard `Questionnaire` resources and rendered natively on devices.
- **Reference** is the [HL7 Structured Data Capture Implementation Guide](https://hl7.org/fhir/uv/sdc/).

### 3. SQL-on-FHIR and ViewDefinitions
Declarative `ViewDefinition` resources flatten nested FHIR JSON hierarchies into tabular rows for user interface projections and analytical database schemas.
- **Reference** is the [SQL-on-FHIR v2 Specification](https://sql-on-fhir.org/).

### 4. OpenID Connect and OAuth 2.0
Centralized identity, role tokens, and single sign-on across mobile clients, web portals, and gateway reverse proxies are managed via OAuth 2.0.

## Required developer toolchain

| Tool | Recommended version | Required for |
| --- | --- | --- |
| Docker Engine & Compose | Docker 24+, Compose v2 | Running the reference infrastructure topology |
| JDK | JDK 21+ | Building backend gateway extensions and Kotlin Multiplatform apps |
| Node.js & pnpm | Node 18+, pnpm 8+ | Running and extending the Web Admin Portal |
| Android Studio | Latest stable | Developing and debugging Android frontline client targets |
| Xcode | Latest stable (macOS only) | Building and testing iOS frontline client targets |

## Where to go next

- Ready to deploy the local stack? Follow the [Get started quickstart](/get-started/).
- Looking for hands-on code examples? Explore [Tutorials and codelabs](/resources/tutorials-and-codelabs/).
