---
title: Reference Backend
description: Player-specific endpoints and access checkers loaded into a FHIR Gateway host.
slug: /components/reference-backend/
sidebar_position: 10
guide_type: Component overview
guide_status: partial
guide_focus: FHIR Gateway extensions for Player clients
repository: backend-extension
---

## What it is

The Reference Backend is not a server of its own. It is a set of extensions — custom endpoints and access checker plugins — loaded into a [FHIR Gateway](https://github.com/ohs-foundation/fhir-gateway) host at runtime, giving Player clients APIs and access rules the gateway does not provide by itself.

## What it demonstrates

How to add programme-specific behaviour in front of a FHIR store without forking the gateway or putting that logic in each client. Both the Client App and the Web Portal consume the same endpoints, so the rule lives in one place.

The access checker is the clearest example: it grants a request only when the caller holds a role matching the request's verb and resource type, and for a bundle every entry must be authorised individually.

## When to use it

Use it when clients need endpoints beyond plain FHIR, or when access control needs to be enforced centrally rather than trusted to each application.

You do not need it to evaluate either application. The Web Portal runs against a FHIR store directly.

## What it needs

| Depends on | Needed for |
| --- | --- |
| JDK 21 | Building the plugin |
| A JDK 11+ runtime | Running it |
| A FHIR Gateway host | Running it |

The build and the runtime have different requirements. Building needs JDK 21 because the build tooling depends on JDK 21 APIs, but the output targets Java 11 bytecode, so the host it loads into can be older.

The plugin does not bundle gateway classes. The host supplies them at runtime, which is why a compatible gateway is a prerequisite rather than a dependency you install.

## Where to start

[Add backend extensions](/extend/backend-extensions/) builds the plugin and loads it into a gateway host.

## Source and releases

The [ohs-player-reference-backend repository](https://github.com/ohs-foundation/ohs-player-reference-backend) owns the extensions, their configuration, the access checker behaviour, and the endpoint reference. The [FHIR Gateway repository](https://github.com/ohs-foundation/fhir-gateway) owns the host and its module system.
