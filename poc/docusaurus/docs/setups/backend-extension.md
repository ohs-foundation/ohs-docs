---
title: Add backend extensions
description: Build the OHS Player backend extensions and load them into a FHIR Gateway host.
slug: /setups/backend-extension/
sidebar_position: 5
guide_type: Setup guide
guide_status: Guidance available
guide_focus: FHIR Gateway extensions for Player clients
repository: backend-extension
---

## About the Reference Backend

Reference Backend provides custom endpoints and access-checker plugins for OHS Player Kotlin Multiplatform and web clients. FHIR Gateway loads the JAR at runtime. The extensions add user, group, role, practitioner-detail, location-hierarchy, and bulk-import APIs; they use the gateway's upstream FHIR server and identity provider.

This is part of the shared Player environment stage of the [quick start](/setups/). The Web Portal uses its gateway endpoint for custom APIs, and the Client App is run after the shared Player environment and Portal administration are ready.

## Before you begin

You need JDK 21 to build the extensions and a compatible FHIR Gateway host to run them. The compiled JAR targets Java 11 bytecode, so the host can use JDK 11 or later.

## Get a FHIR Gateway host

The [FHIR Gateway repository](https://github.com/ohs-foundation/fhir-gateway) provides the host JAR. Build its executable host from the repository root:

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

## Configure the extension

Set these values in the FHIR Gateway host environment before starting it.

- `PROXY_TO`: upstream FHIR server base URL.
- `IAM_PROVIDER`: identity provider; `keycloak` is the default and supported value.
- `TOKEN_ISSUER`: Keycloak issuer URL, for example `http://keycloak:8080/realms/my-realm`.
- `IAM_PROVIDER_CLIENT_ID`: Keycloak administration client ID.
- `IAM_PROVIDER_CLIENT_SECRET`: Keycloak administration client secret.

The Keycloak administration client needs a service account with `manage-users`, `view-users`, `manage-realm`, and `view-realm` roles from the `realm-management` client. When using the Web Portal's local Docker Compose environment, replace its nginx development proxy with a gateway image that loads this extension before relying on custom `/api/*` endpoints. Use [FHIR Gateway deployment documentation](https://github.com/ohs-foundation/fhir-gateway#modules) for host deployment details.

## Expected result

The gateway exposes the Reference Backend APIs at `/api/*` and enforces bearer-token access. After the Portal signs in with an `ohs` realm user, its custom API requests can use the configured gateway endpoint. Keycloak is the default identity provider.

## Next step

[Run the Web Portal](/setups/web-portal/) to administer the environment before running the Client App.
