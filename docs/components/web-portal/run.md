---
title: Run the Web Portal
description: Start the OHS Player web reference portal with its local development services.
slug: /components/web-portal/run/
sidebar_position: 20
guide_type: Setup guide
guide_status: ready
guide_focus: Web-based workforce and configuration portal
repository: web-portal
---

## About the Web Portal

The Web Portal is a configurable, extensible web application for healthcare organizations to manage workforce hierarchies, user accounts, access controls, and configuration. It is step 2 of the [get started sequence](/get-started/): use it after the shared Player environment is available and before running the Client App, so the environment has the users and administration data it needs.

## Before you begin

You need Node 20 or later, pnpm 9 or later, and Docker.

## Install the portal

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-web-portal.git
cd ohs-player-reference-web-portal
pnpm install
```

## Start the local services

```sh
docker compose up -d
```

Docker Compose starts these services and a containerised Portal preview:

- **HAPI FHIR** stores the FHIR resources used by the Portal at `http://localhost:8080/fhir`. The local Portal defaults to this service.
- **Keycloak** provides the `ohs` realm and OpenID Connect sign-in for Portal users at `http://localhost:8090`.
- **OHS Info Gateway** proxies FHIR requests at `http://localhost:8180/fhir`. The default image is an nginx development proxy; set `OHS_GATEWAY_IMAGE` to use a published gateway image.
- **OHS Player Web** builds and serves the containerised Portal using the configured FHIR and OIDC URLs at `http://localhost:3000`.

Wait for HAPI FHIR at `http://localhost:8080/fhir/metadata` and Keycloak at `http://localhost:8090`. Keycloak imports the `ohs` realm from `infra/keycloak/ohs-realm.json`.

## Choose how to run the Portal

Use the containerised preview at `http://localhost:3000` when you only need the Portal supplied by Docker Compose.

Use the local development server when you are working on Portal source code:

```sh
cp .env.example .env
pnpm dev
```

The development Portal is available at `http://localhost:5173`. Its default configuration sends FHIR requests through its Vite development proxy to HAPI FHIR and sends custom API requests to the gateway. Example realm users are defined in `infra/keycloak/ohs-realm.json`.

## Add optional demo data

Load the repository's demonstration FHIR data when you need records to explore in the Portal.

```sh
FHIR_BASE_URL=http://localhost:8080/fhir pnpm seed
```

## Prepare the environment for the Client App

Sign in as an administrator, then complete the preparation needed for the reference workflow:

- Confirm that the intended realm users can sign in and have the required roles.
- Create or review the organization and location hierarchy used by the workforce.
- Create or review care-team and user assignments where the workflow needs them.
- Load the demonstration FHIR data when the reference workflow needs records to display.

Continue to the Client App after an administrator can sign in and the users, workforce structure, and FHIR data needed for the evaluation are in place.

## Expected result

Confirm HAPI FHIR at `http://localhost:8080/fhir/metadata`, Keycloak at `http://localhost:8090`, and the selected Portal mode at `http://localhost:3000` or `http://localhost:5173`. Sign in with a realm user from `infra/keycloak/ohs-realm.json`.

## Troubleshooting

### Keycloak rejects a portal user

Use a user from the imported `ohs` realm, such as `admin-user` / `admin` or `manager-user` / `manager`. The Keycloak bootstrap administrator is for the administration console, not Portal sign-in.

### Realm users are missing

Follow the [repository quickstart recovery procedure](https://github.com/ohs-foundation/ohs-player-reference-web-portal/blob/main/docs/QUICKSTART.md#troubleshooting) for the persisted Keycloak data, then run `docker compose up -d` so Keycloak can import `infra/keycloak/ohs-realm.json` into a fresh store.

## Next step

[Run the Client App](/components/client-app/run/) after the shared Player environment and Portal administration are ready.
