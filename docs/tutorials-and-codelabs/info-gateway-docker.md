---
id: info-gateway-docker
title: Tutorial · Run Info Gateway in Docker
description: Run Info Gateway with Docker Compose alongside Keycloak and a sample HAPI FHIR server.
slug: /tutorials-and-codelabs/info-gateway-docker/
sidebar_label: Info Gateway Docker Tutorial
sidebar_position: 42
guide_type: Tutorial
guide_status: ready
source_url: https://github.com/ohs-foundation/fhir-gateway
source_label: fhir-gateway on GitHub ↗
---

## Overview

In this tutorial, you will run FHIR Info Gateway in Docker and see it work with Keycloak and a HAPI FHIR server preloaded with synthetic clinical data on your local machine.

## Prerequisites

- Docker and Docker Compose installed
- `curl` and `jq` command line utilities installed

## Step 1 · Start Keycloak with test configuration

Clone the repository and bring up the Keycloak identity service using the provided Docker Compose configuration.

```sh
git clone https://github.com/ohs-foundation/fhir-gateway.git
cd fhir-gateway
docker compose -f docker/keycloak/config-compose.yaml up -d
```

This starts Keycloak with SMART-on-FHIR extensions preloaded with a test realm, accessible at `http://localhost:9080`.

## Step 2 · Start the HAPI FHIR server

Run the sample HAPI FHIR server container preloaded with synthetic patient records.

```sh
docker run -d -p 8099:8080 --name hapi-synthea \
  us-docker.pkg.dev/fhir-proxy-build/stable/hapi-synthea:latest
```

The server includes synthetic clinical data and a `List/patient-list-example` resource.

## Step 3 · Start Info Gateway

Launch the Info Gateway container configured to use the `list` access checker.

```sh
docker run -d \
  --name fhir-gateway \
  -e TOKEN_ISSUER=http://localhost:9080/auth/realms/test \
  -e PROXY_TO=http://localhost:8099/fhir \
  -e BACKEND_TYPE=HAPI \
  -e RUN_MODE=PROD \
  -e ACCESS_CHECKER=list \
  -p 8080:8080 \
  --network=host \
  us-docker.pkg.dev/fhir-proxy-build/stable/fhir-gateway:latest
```

### Environment variables

- `TOKEN_ISSUER` specifies the OpenID Connect realm endpoint.
- `PROXY_TO` sets the target upstream FHIR server base URL.
- `BACKEND_TYPE` defines the backend adapter (`HAPI` or `GCP`).
- `ACCESS_CHECKER` selects the active access control rule plugin (`list` or `patient`).
- `RUN_MODE` toggles production validation or developer emulator compatibility.

## Step 4 · Examine Keycloak access mapping

Open the Keycloak admin console in your browser at `http://localhost:9080/auth/admin/` with username `admin` and password `adminpass`.

1. Select the `test` realm.
2. Under **Manage**, select **Users** and open the user profile for `testuser`.
3. In the **Attributes** tab, note the attribute `patient_list` with value `patient-list-example`.
4. Check client mapper settings under **Clients** > **my-fhir-client** > **Mappers** to see how `patient_list` is mapped into issued JWT tokens.

Inspect the allowed patient list directly on HAPI FHIR at `http://localhost:8099/fhir/List/patient-list-example`. The list grants access to patients `75270` and `3810`.

## Step 5 · Request a token and test access

Fetch an access token for `testuser` and extract the token string into an environment variable.

```sh
ACCESS_TOKEN="$( \
  curl -s -X POST \
    -d 'client_id=my-fhir-client' \
    -d 'username=testuser' \
    -d 'password=testpass' \
    -d 'grant_type=password' \
    "http://localhost:9080/auth/realms/test/protocol/openid-connect/token" \
  | jq -r .access_token \
)"
```

Query a patient included in the user list.

```sh
curl -X GET \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  'http://localhost:8080/fhir/Patient/75270'
```

The gateway confirms the patient ID exists in `patient-list-example` and returns the `Patient` resource.

Now request a patient not present in the user list.

```sh
curl -X GET \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json; charset=utf-8" \
  'http://localhost:8080/fhir/Patient/3'
```

The gateway denies the request with an authorization error response.

## Where to go next

- Learn how to implement custom access rules in [Create an Access Checker Plugin](/tutorials-and-codelabs/info-gateway-access-checker/).
- Explore gateway concepts in the [Info Gateway Overview](/fhir-foundations/info-gateway/).
