---
id: info-gateway-getting-started
title: Getting Started with Info Gateway
description: Build Info Gateway from source, configure upstream FHIR store access, and test authorized requests.
slug: /tutorials-and-codelabs/info-gateway-getting-started/
sidebar_label: Info Gateway Getting Started
sidebar_position: 40
guide_type: Get started
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-gateway
source_label: fhir-gateway on GitHub ↗
---

## Overview

FHIR Info Gateway is an access-control proxy that sits in front of a FHIR server or store, verifying authentication tokens and applying fine-grained access policies to requests.

This guide walks through building Info Gateway from source, configuring upstream FHIR server connectivity, running the proxy server, and testing requests with bearer tokens.

## Prerequisites

- Java Development Kit 17 or higher
- Apache Maven 3.8 or higher
- A running OpenID Connect Identity Provider such as Keycloak
- An upstream FHIR server such as HAPI FHIR or Google Cloud Healthcare FHIR store

## Step 1 · Build from source

Clone the repository and compile all modules using Maven.

```sh
git clone https://github.com/ohs-foundation/fhir-gateway.git
cd fhir-gateway
mvn package -Dspotless.apply.skip=true
```

The build produces an executable Spring Boot JAR in `exec/target/exec-0.1.0.jar`.

## Step 2 · Configure upstream server access

The proxy forwards authorized queries to the upstream FHIR server. Configure network and authentication settings so the proxy can communicate with your FHIR backend.

### Local HAPI FHIR Server

When proxying to a local HAPI FHIR server, specify the service base URL using the `PROXY_TO` environment variable.

```sh
export PROXY_TO="http://localhost:8099/fhir"
export BACKEND_TYPE="HAPI"
```

### Google Cloud Healthcare FHIR Store

When connecting to a Google Cloud Healthcare API FHIR store, set the credentials and backend type.

- For local testing, obtain user credentials using the Google Cloud SDK.

```sh
gcloud auth application-default login
```

- When running on a Google Cloud VM, attach a service account with the Healthcare FHIR Resource Reader and FHIR Store Viewer roles.
- Alternatively, supply a service account key file using the credentials environment variable.

```sh
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
export BACKEND_TYPE="GCP"
```

## Step 3 · Launch the gateway

Run the standalone executable JAR, configuring the server port and token issuer.

```sh
java -jar exec/target/exec-0.1.0.jar --server.port=8081
```

To load external access checker plugins dynamically, pass the plugin JAR via `loader.path`.

```sh
java -Dloader.path="/path/to/plugins/custom-plugins.jar" \
  -jar exec/target/exec-0.1.0.jar --server.port=8081
```

### Configuration parameters

| Variable | Description | Example |
| --- | --- | --- |
| `TOKEN_ISSUER` | OpenID Connect issuer URL | `http://localhost:9080/auth/realms/test` |
| `PROXY_TO` | Target upstream FHIR service base URL | `http://localhost:8099/fhir` |
| `BACKEND_TYPE` | Backend store type (`HAPI` or `GCP`) | `HAPI` |
| `ACCESS_CHECKER` | Selected access checker plugin | `list` or `patient` |
| `RUN_MODE` | Runtime mode (`PROD` or `DEV`) | `PROD` |
| `AUDIT_EVENT_ACTIONS_CONFIG` | Audit logging actions (`C`, `R`, `U`, `D`, `E`) | `C,R,U,D` |

When testing against an Android emulator where the identity provider runs on the host machine, set `RUN_MODE=DEV` to skip strict token issuer hostname checks across the virtual network.

## Step 4 · Obtain an access token

Authenticate against your Identity Provider to obtain a JSON Web Token (JWT) for testing.

```sh
curl -X POST \
  -d "client_id=my-fhir-client" \
  -d "username=testuser" \
  -d "password=testpass" \
  -d "grant_type=password" \
  "http://localhost:9080/auth/realms/test/protocol/openid-connect/token"
```

Extract the `access_token` from the JSON response and store it in an environment variable.

```sh
export ACCESS_TOKEN="<token_value>"
```

## Step 5 · Send authorized FHIR requests

Send an authorized `GET` request through the Info Gateway on port 8081.

```sh
curl -X GET \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  "http://localhost:8081/Patient/75270"
```

The gateway validates the token signature, checks user claims against the active `ACCESS_CHECKER` policy, and proxies the request to the upstream FHIR store.

Update a resource using `PUT` with the authorization header.

```sh
curl -X PUT \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  "http://localhost:8081/Patient/75270" \
  -d @Patient_75270_modified.json
```

## Where to go next

- Run the full stack locally with [Run Info Gateway in Docker](/tutorials-and-codelabs/info-gateway-docker/).
- Learn how to write custom authorization logic in [Create an Access Checker Plugin](/tutorials-and-codelabs/info-gateway-access-checker/).
- Explore full gateway features in the [Info Gateway Overview](/fhir-foundations/info-gateway/).
