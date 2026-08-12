---
title: What to know first
description: The concepts and tools worth understanding before you evaluate or adapt OHS Player.
slug: /prerequisites/
sidebar_position: 30
guide_type: Concept
guide_status: ready
guide_focus: Background knowledge for Player work
repository: ohs-player
---

## How to use this page

Nothing here is required before you start. The [shortest path](/get-started/) works without it.

It is the background that makes the rest of the site make sense, and the list is deliberately short — each entry says why Player needs it and points somewhere better than we could write ourselves. Skim it, and come back when a guide assumes something you do not have.

Tool versions and install steps are not here. Each guide states its own, because they differ per component and change more often than the ideas below.

## FHIR

Player stores, exchanges, and renders healthcare data as FHIR resources. Understanding resources, references between them, and search parameters will carry you through most of the site.

- [HL7 FHIR overview](https://hl7.org/fhir/overview.html) for the model and its vocabulary
- [FHIR resource index](https://hl7.org/fhir/resourcelist.html) for the resource types Player uses most: Patient, Encounter, Observation, Practitioner, Location, Task

## SQL-on-FHIR and ViewDefinitions

This is the idea that makes Player configurable. A `ViewDefinition` declares, in data rather than code, which FHIR fields become a flat row. The Client App uses it to project FHIR into screen state; Analytics uses the same idea to project FHIR into reporting tables.

- [SQL-on-FHIR specification](https://sql-on-fhir.org/) for ViewDefinition structure
- [FHIRPath](https://hl7.org/fhirpath/) for the expression language inside a ViewDefinition

## Kotlin Multiplatform and Compose Multiplatform

The Client App is one Kotlin source tree that builds for Android, iOS, desktop, and browser. You do not need to write Kotlin to evaluate it, but you do to extend it.

- [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html) for how one source tree targets several platforms
- [Compose Multiplatform](https://www.jetbrains.com/compose-multiplatform/) for the UI toolkit that renders Player screens

## Containers

Every component that runs services runs them in containers, and Docker Compose is how they are brought up together.

- [Get started with Docker](https://docs.docker.com/get-started/) if containers are new
- [Docker Compose](https://docs.docker.com/compose/) for multi-service startup

## OAuth 2.0 and identity

Player uses Keycloak for identity. Sign-in, tokens, realms, and roles appear in the Web Portal, the Client App, and the gateway's access rules.

- [OAuth 2.0 simplified](https://www.oauth.com/) for the flows and the vocabulary
- [Keycloak documentation](https://www.keycloak.org/documentation) for realms, clients, and role mapping

## The FHIR Gateway

The gateway sits in front of the FHIR store and decides who may read or write what. The Reference Backend extends it with Player-specific endpoints and access rules.

- [FHIR Gateway](https://github.com/ohs-foundation/fhir-gateway) for the host and its module system

## Where to go next

This is the end of the background reading. [Get started](/get-started/) brings up a reference environment and runs the components against it.
