---
title: Backend
description: The gateway, its Player extensions, identity, and the FHIR server behind them.
slug: /components/reference-backend/
sidebar_position: 30
guide_type: Component overview
guide_status: partial
guide_focus: The gateway layer and what sits behind it
repository: backend-extension
---

## What the backend is

"Backend" here means four things working as one layer. They are the **FHIR Gateway**, the **Reference Backend** extensions loaded into it, **Keycloak** for identity, and a **FHIR server** behind them. Both applications talk to this layer and nothing else.

The gateway is the centre of it. It sits in front of the FHIR store, validates the token on every request, applies access rules, serves the endpoints the extensions add, and proxies everything else through.

## Why a gateway rather than a modified FHIR server

Adding authentication and access control by extending the FHIR server is the obvious approach and the wrong one. It couples your security model to a particular server and leaves you maintaining a fork.

Putting a gateway in front instead means three things.

**The FHIR server stays unmodified.** Player uses HAPI FHIR, but nothing above the gateway depends on that choice.

**Access rules live in one place.** Scoping a health worker to their assigned location, organisation, or care team is enforced once, at the gateway, rather than trusted to each application.

**Clients never implement authorisation.** The Web Portal was built entirely on these APIs, and its team wrote no user-management or authentication logic.

## What the extensions add

The gateway is generic. The Reference Backend is the Player-specific part, a plugin loaded into the gateway host at runtime, adding what the reference needs beyond plain FHIR.

**Custom endpoints**, because some things a health programme needs are not FHIR operations. Creating a user has to create a Keycloak account and a FHIR Practitioner together. A location hierarchy has to be walked and returned as a tree. Users, organisations, and locations have to be imported in bulk when a programme is first stood up.

**An access checker**, which decides whether a request is allowed. It grants a request when the caller holds a role matching the request's verb and resource type, and for a bundle every entry must be authorised individually.

Endpoints use their own path prefix so they can never collide with FHIR paths, now or in a future version of FHIR.

## How it is packaged

The extensions ship as a separate artifact from the gateway rather than as one combined build. That is deliberate. A gateway upgrade does not force a release of your plugins, and a programme's own extensions can live in their own repository.

This is the extension point an implementing team is most likely to use. Adding a programme-specific endpoint or access rule means writing a plugin, not forking anything.

## Where to start

[Set up the backend](/components/reference-backend/run/) builds the plugin and loads it into a gateway host as part of preparing the environment.

[Add backend extensions](/extend/backend-extensions/) covers writing endpoints and access checkers of your own.

## Source and releases

The [ohs-player-reference-backend repository](https://github.com/ohs-foundation/ohs-player-reference-backend) owns the extensions, their configuration, the access checker behaviour, and the endpoint reference. The [FHIR Gateway repository](https://github.com/ohs-foundation/fhir-gateway) owns the host and its module system.
