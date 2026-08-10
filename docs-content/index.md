---
id: index
title: Open Health Stack
description: Interoperable, FHIR-native components for building offline-capable, mobile-first digital health software.
slug: /
sidebar_label: Overview
sidebar_position: 1
hide_title: true
page_type: landing
eyebrow: OPEN HEALTH STACK DOCUMENTATION
primary_action:
  label: Start with OHS Player
  to: /ohs-player/
secondary_action:
  label: Browse the source
  href: https://github.com/ohs-foundation
---

## What Open Health Stack is

Open Health Stack (OHS) is a set of open-source, [FHIR](https://hl7.org/fhir/)-native
components for building offline-capable, mobile-first digital health applications. The
components are independently versioned and independently useful: adopt one library, or
compose several into a working system.

This site documents the components maintained under the
[ohs-foundation](https://github.com/ohs-foundation) organization, and how they fit
together. The [OHS Foundation projects page](https://ohs.foundation/projects) remains the
catalogue of record for component maturity and roadmap.

## The components

### Client libraries

- **[Android FHIR SDK](/android-fhir-sdk/)** — Kotlin libraries for offline-capable,
  mobile-first healthcare applications on Android.
- **[Kotlin FHIR](/kotlin-fhir/)** — Kotlin Multiplatform implementations of the FHIR data
  model, FHIRPath, storage, and structured data capture.

### Server and data components

- **[FHIR Gateway](/fhir-gateway/)** — a proxy server that applies access-control policies
  in front of a FHIR store.
- **[FHIR Data Pipes](/fhir-data-pipes/)** — extraction of FHIR resources into analytics
  stores, and the query layer over them.

### Reference composition

- **[OHS Player](/ohs-player/)** — a cross-stack reference toolkit that assembles the
  components into a working healthcare solution, with guides for running and adapting it.
- **[FHIR App Examples](/fhir-app-examples/)** — smaller worked examples built from
  individual components.

## Where to start

If you are evaluating OHS, start with [OHS Player](/ohs-player/). It is the only place
where the components are shown running together, and its
[setup guides](/ohs-player/setups/) prepare a complete environment rather than a single
library.

If you already know which component you need, go directly to its section. Each one links
to its own repository for API detail, releases, and issue tracking.

To get involved, see [Contributing](/contributing/).
