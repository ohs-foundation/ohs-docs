---
title: Set up the backend
description: How the gateway gets the Player endpoints and access rules, and how to change what it runs.
slug: /components/reference-backend/run/
sidebar_position: 20
guide_type: Setup guide
guide_status: ready
guide_focus: Building and loading the gateway extensions
repository: backend-extension
---

## Goal and scope

The Reference Backend is a plugin loaded into the FHIR Gateway at runtime. It adds the endpoints the Web Portal and the Client App consume, and the access checker that decides whether a FHIR request is allowed.

**The reference environment builds and loads it for you.** [Setting up the environment](/components/reference-infrastructure/) compiles the gateway and the plugin from source and starts them together, so there is no separate step to run.

This page explains what that build does, how to point it at different source, and how to build a plugin of your own.

## What the environment builds

The environment builds the gateway image in two stages and combines them.

1. Clone and build the [FHIR Gateway](https://github.com/ohs-foundation/fhir-gateway), producing the executable host.
2. Clone and build the [Reference Backend](https://github.com/ohs-foundation/ohs-player-reference-backend), producing the plugin JAR.
3. Run the host with the plugin on its loader path.

The plugin does not bundle gateway classes. They are declared as provided and supplied by the host at runtime, which is why the two are built separately and why upgrading one does not force a rebuild of the other.

## Choose what gets built

Two values in `.env` select the source for each half.

| Variable | Selects |
| --- | --- |
| `GATEWAY_REF` | The FHIR Gateway branch or tag to build |
| `PLUGIN_REF` | The Reference Backend branch or tag to build |

Point either at a branch to test a change, then run `./dev.sh up` to rebuild.

## How the gateway is configured

The environment sets these on the gateway container. You do not need to set them by hand, but they are the values to change when adapting the environment.

| Variable | Purpose |
| --- | --- |
| `PROXY_TO` | The upstream FHIR server the gateway forwards to |
| `TOKEN_ISSUER` | The identity realm that issues tokens |
| `IAM_PROVIDER` | The identity provider, with `keycloak` supported today |
| `IAM_PROVIDER_CLIENT_ID` | The administration client used for user management |
| `IAM_PROVIDER_CLIENT_SECRET` | That client's secret, generated for each install |
| `ACCESS_CHECKER` | Which access checker gates FHIR requests |
| `BACKEND_TYPE` | The kind of upstream FHIR store |

The administration client needs a service account holding `manage-users`, `view-users`, `manage-realm`, and `view-realm` from `realm-management`. The environment's realm import creates that client and assigns those roles, so this is already done. You only need to create it yourself when pointing the gateway at an identity server you manage.

## What the plugin adds

**Endpoints** under `/api`, covering users, groups, roles, location hierarchy, practitioner details, and bulk import. Access to each is governed by a three-level role hierarchy where `manage` satisfies `edit` and `edit` satisfies `view`.

**An access checker**, enabled by `ACCESS_CHECKER=ohs_player_access`. It grants a FHIR request only when the caller holds a role matching the request's verb and resource type. For a bundle, every entry must be authorised individually before the bundle is granted.

Those are two separate mechanisms. The role hierarchy gates the plugin's own endpoints. The access checker gates everything the gateway forwards to the FHIR server.

## Auditing

Setting `AUDIT_EVENT_ACTIONS_CONFIG` on the gateway writes an AuditEvent for the actions you name, given as action codes run together rather than separated.

One AuditEvent is written per request, and per entry within a bundle rather than once for the whole bundle. A broad configuration covering reads and searches grows the FHIR store quickly, so prefer writes only unless you need read auditing, and plan retention accordingly.

## Build the plugin outside the environment

Build it directly when developing the plugin itself, or when running a gateway you host elsewhere.

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-backend.git
cd ohs-player-reference-backend
mvn clean package
```

Building needs JDK 21. The output targets Java 11 bytecode, so the host it loads into can be older.

Load it into a gateway host on the loader path.

```sh
java -Dloader.path="PATH_TO_PLUGIN/ohs-player-backend-extensions-1.0-SNAPSHOT.jar" \
  -jar PATH_TO_GATEWAY/fhir-gateway-exec.jar --server.port=8080
```

The reference environment already runs a gateway, so pick a port that does not collide with it if you run both.

## Expected result

The gateway serves the Reference Backend endpoints under `/api` and enforces bearer-token access on them. Requests without a valid token are rejected, and requests with one are checked against the caller's roles before reaching the FHIR server.

The Web Portal exercises this directly. If you can create a user in the Portal, the plugin is loaded and serving.

## Next step

[Run the Web Portal](/components/web-portal/run/) to administer the environment.

To write endpoints or access rules of your own, see [extend the backend](/extend/backend-extensions/).

## Source

The [Reference Backend repository](https://github.com/ohs-foundation/ohs-player-reference-backend) owns the endpoints, the role model, the access checker, and their configuration. The [FHIR Gateway repository](https://github.com/ohs-foundation/fhir-gateway) owns the host and its module system.
