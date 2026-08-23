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

The Web Portal is a configurable, extensible web application for healthcare organizations to manage workforce hierarchies, user accounts, access controls, and configuration. It is step 2 of the [get started sequence](/get-started/). Use it after the shared Player environment is available and before running the Client App, so the environment has the users and administration data it needs.

## Before you begin

You need Node 20 or later, pnpm, and Docker. The repository pins its package manager to pnpm 11.5.1 through the `packageManager` field in `package.json`, so install that version rather than a newer one you happen to have.

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

Docker Compose starts four services.

| Service | Address |
| --- | --- |
| HAPI FHIR | `http://localhost:8080/fhir` |
| Keycloak | `http://localhost:8090` |
| OHS Info Gateway | `http://localhost:8180` |
| Containerised Portal | `http://localhost:3000` |

Wait for HAPI FHIR to answer at `http://localhost:8080/fhir/metadata` and Keycloak to answer at `http://localhost:8090`. Keycloak imports the `ohs` realm from `infra/keycloak/ohs-realm.json` on first start.

The gateway slot is worth a note. Unless you set `OHS_GATEWAY_IMAGE` to a published OHS Info Gateway image, Compose fills it with a small nginx proxy defined in `infra/nginx-gateway.conf`. That proxy forwards FHIR traffic and nothing else, so the Portal's reads and writes of FHIR resources work while the endpoints under `/api` do not. Creating a user is the first thing you will notice, because it needs the real gateway.

## Choose how to run the Portal

Use the containerised preview at `http://localhost:3000` when you only need the Portal that Compose supplies. Its FHIR and identity URLs were baked in when the image was built.

Use the development server when you are working on Portal source code.

```sh
cp .env.example .env
pnpm dev
```

The development Portal is available at `http://localhost:5173`. That port is fixed rather than incremented, because the Keycloak client in the imported realm accepts redirects only from `http://localhost:5173` and `http://127.0.0.1:5173`. If the port is busy the server stops instead of moving to 5174.

The copied `.env` keeps the Portal same-origin. FHIR requests go to `/fhir` on the development server and are proxied to HAPI FHIR, and requests to `/api` are proxied to the gateway. Two things follow from that. Custom endpoints have no cross-origin headers of their own and work only because they are same-origin, and FHIR reads in development reach HAPI directly rather than passing the gateway's access checks.

## Add optional demo data

The FHIR store starts empty. Load the repository's demonstration data when you want records to explore.

```sh
FHIR_BASE_URL=http://localhost:8080/fhir pnpm seed
```

That writes one organisation, ten practitioners, a five-level location chain, and two care teams. Nothing runs it for you, and the Portal works without it. An empty store simply means empty lists, and the Setup Wizard offers to walk you through creating the first locations and organisations.

## Sign in

Use a user from the imported realm.

| User | Password | Reaches |
| --- | --- | --- |
| `admin-user` | `admin` | Every screen |
| `manager-user` | `manager` | Dashboard, users, locations, organisations, care teams, FHIR viewer |

The Keycloak bootstrap administrator from `docker-compose.yml` is for the Keycloak console at `http://localhost:8090/admin`. It is not a Portal account and cannot sign in to the realm. [Who can reach what](/configure/web-portal-access/) explains the roles behind those two accounts.

## Prepare the environment for the Client App

Sign in as an administrator, then complete the preparation the reference workflow needs.

- Confirm that the intended realm users can sign in and hold the roles they need.
- Create or review the organisation and location hierarchy the workforce is arranged around.
- Create or review care-team and user assignments where the workflow needs them.
- Load the demonstration FHIR data when the reference workflow needs records to display.

Continue to the Client App once an administrator can sign in and the users, workforce structure, and FHIR data are in place.

## Expected result

HAPI FHIR answers at `http://localhost:8080/fhir/metadata`, Keycloak answers at `http://localhost:8090`, and the Portal you chose loads at `http://localhost:3000` or `http://localhost:5173`. Signing in as `admin-user` lands you on the dashboard with the full navigation sidebar.

## Troubleshooting

### Keycloak rejects a portal user

Use a user from the imported `ohs` realm, such as `admin-user` or `manager-user`. The Keycloak bootstrap administrator is for the administration console, not Portal sign-in.

### Realm users are missing

Follow the [repository quickstart recovery procedure](https://github.com/ohs-foundation/ohs-player-reference-web-portal/blob/main/docs/QUICKSTART.md#troubleshooting) for the persisted Keycloak data, then run `docker compose up -d` so Keycloak can import `infra/keycloak/ohs-realm.json` into a fresh store.

### Creating a user fails

Creating a user posts to `/api/users` on the gateway, and the bundled nginx proxy does not serve that path. Point `OHS_GATEWAY_IMAGE` at a published OHS Info Gateway image and restart Compose. Everything that writes plain FHIR resources, including organisations, locations, and care teams, keeps working against the nginx proxy.

### The Locations screen shows a no-access panel

That screen calls the gateway's location hierarchy endpoint, which is gated by the `location-hierarchy.view` realm role rather than by a general locations permission. Both demo users hold it. An account created outside the imported realm usually does not, and the panel appears even though the sidebar link is visible.

### A screen is missing from the sidebar

Either its feature flag is off in `.env` or the signed-in account lacks the permission for it. Unauthorised navigation is hidden rather than disabled, so a missing link looks the same in both cases. [Configure the Web Portal](/configure/web-portal-configuration/) lists the flags and [who can reach what](/configure/web-portal-access/) lists the permissions.

## Next step

[Run the Client App](/components/client-app/run/) after the shared Player environment and Portal administration are ready.
