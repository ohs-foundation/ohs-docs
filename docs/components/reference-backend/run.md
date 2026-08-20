---
title: Set up the backend
description: Build the OHS Player backend extensions and load them into a FHIR Gateway host.
slug: /components/reference-backend/run/
sidebar_position: 20
guide_type: Setup guide
guide_status: ready
guide_focus: Building and loading the gateway extensions
repository: backend-extension
---

## Goal and scope

The Reference Backend provides custom endpoints and access-checker plugins for the Player clients. The FHIR Gateway loads the JAR at runtime. The extensions add user, group, role, practitioner-detail, location-hierarchy, and bulk-import APIs, and they use the gateway's upstream FHIR server and identity provider.

This is the second stage of the [get started sequence](/get-started/), after [setting up the environment](/components/reference-infrastructure/). Both the Web Portal and the Client App consume these endpoints, so it is part of preparing the environment rather than an optional addition.

## Before you begin

You need JDK 21 to build the extensions and a compatible FHIR Gateway host to run them. The compiled JAR targets Java 11 bytecode, so the host can use JDK 11 or later.

## Get a FHIR Gateway host

The [FHIR Gateway repository](https://github.com/ohs-foundation/fhir-gateway) provides the host JAR. Build its executable host from the repository root.

```sh
mvn package -Dspotless.apply.skip=true
```

The executable host is `exec/target/fhir-gateway-exec.jar`.

## Build the extension

Clone the Reference Backend repository, enter it, then build the extension.

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-backend.git
cd ohs-player-reference-backend
mvn clean package
```

The repository identifies the output as `target/ohs-player-backend-extensions-1.0-SNAPSHOT.jar`.

## Load it into FHIR Gateway

```sh
java -Dloader.path="PATH_TO_PLUGIN/ohs-player-backend-extensions-1.0-SNAPSHOT.jar" \
  -jar PATH_TO_FHIR_GATEWAY/exec/target/fhir-gateway-exec.jar --server.port=8081
```

Replace `PATH_TO_PLUGIN` with the absolute path to the JAR produced in the previous step. Replace `PATH_TO_FHIR_GATEWAY` with the absolute path to the FHIR Gateway repository where its host JAR was built.

The gateway host reads the plugin from the loader path rather than bundling it, which is why the two are built separately and why upgrading one does not require rebuilding the other.

## Configure the extension

Set these values in the FHIR Gateway host environment before starting it.

- `PROXY_TO` is the upstream FHIR server base URL.
- `IAM_PROVIDER` is the identity provider. `keycloak` is the default and supported value.
- `TOKEN_ISSUER` is the Keycloak issuer URL, for example `http://keycloak:8080/realms/my-realm`.
- `IAM_PROVIDER_CLIENT_ID` is the Keycloak administration client ID.
- `IAM_PROVIDER_CLIENT_SECRET` is the Keycloak administration client secret.

The Keycloak administration client needs a service account with `manage-users`, `view-users`, `manage-realm`, and `view-realm` roles from the `realm-management` client. Without those roles, requests return `403 Forbidden`.

Use the [FHIR Gateway deployment documentation](https://github.com/ohs-foundation/fhir-gateway#modules) for host deployment details.

## Expected result

The gateway exposes the Reference Backend APIs under `/api/*` and enforces bearer-token access on them. Requests without a valid token are rejected, and requests with one are checked against the caller's roles before reaching the FHIR server.

## Next step

[Run the Web Portal](/components/web-portal/run/) to administer the environment, then [run the Client App](/components/client-app/run/) against it.

To write endpoints or access rules of your own, see [extend the backend](/extend/backend-extensions/).
