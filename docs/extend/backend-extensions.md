---
title: Extend the backend
description: Add custom endpoints and access checkers to the FHIR Gateway without forking it.
slug: /extend/backend-extensions/
sidebar_position: 20
guide_type: Extension guide
guide_status: partial
guide_focus: Writing your own gateway endpoints and access rules
repository: backend-extension
---

## When you need this

The gateway gives you authenticated, access-controlled FHIR. The Reference Backend adds the endpoints the reference implementation needs on top of it. A programme usually needs a third thing, namely its own endpoints or its own rule about who may see what.

Two extension points cover almost all of it.

**A custom endpoint** when a programme needs an operation that is not a FHIR operation, something that spans FHIR and identity, aggregates across resources, or accepts a payload FHIR does not describe.

**An access checker** when the rule about who may read or write a resource is specific to how your programme is organised.

If what you need is a different screen rather than a different rule, you are in the wrong place. [Decide when code is necessary](/extend/decide/) sorts that out.

## The extension model

Extensions are a plugin JAR loaded into the gateway host at runtime. The plugin does not bundle gateway classes. The host supplies them.

That separation is the point. You are not forking the gateway, and you are not maintaining a patched copy of it. A gateway upgrade does not force a release of your plugin, and your plugin can live in its own repository with its own release cycle.

The Reference Backend is itself an example of this. It is a plugin, built and loaded exactly the way yours would be. [Setting up the backend](/components/reference-backend/run/) walks through that build-and-load cycle, and the same commands apply to a plugin of your own.

## Writing an access checker

The gateway resolves access checkers through its plugin mechanism and selects one by configuration, so a deployment chooses which rule applies without a code change.

The gateway ships sample checkers, and the Reference Backend's own checker is a worked example of a role-based rule. It grants a request when the caller holds a role matching the request's verb and resource type, and for a bundle it requires every entry to be authorised individually.

That bundle behaviour is worth copying rather than reinventing. A bundle that is authorised as a whole rather than per entry is a common way to accidentally grant more than intended.

The [FHIR Gateway repository](https://github.com/ohs-foundation/fhir-gateway) owns the access checker interfaces, the plugin discovery mechanism, and its sample implementations.

## Writing a custom endpoint

Custom endpoints use a path prefix that keeps them clear of FHIR paths, so an endpoint you add cannot collide with a FHIR route now or in a future version of FHIR. Keep to that convention.

Endpoints run inside the gateway, which means they inherit its authentication rather than reimplementing it. The alternative, a separate service beside the gateway, means rebuilding token validation and maintaining another deployable, which is the situation the gateway exists to avoid.

The [ohs-player-reference-backend repository](https://github.com/ohs-foundation/ohs-player-reference-backend) owns the endpoint implementations, the role model they enforce, and their configuration.

## Packaging

Keep your extensions in their own repository and build them as a separate artifact rather than combining them with the gateway into a single build. Decoupled, you redeploy against a new gateway release without cutting a release of your own.

## Where to go next

[Set up the backend](/components/reference-backend/run/) covers building a plugin and loading it into a host.

[Decide when code is necessary](/extend/decide/) covers the boundary between configuration and code across the whole toolkit.

To contribute an extension back, see [resources and contributing](/resources/).
