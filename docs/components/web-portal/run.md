---
title: Run the Web Portal
description: Sign in to the administration portal and prepare the environment for the Client App.
slug: /components/web-portal/run/
sidebar_position: 20
guide_type: Setup guide
guide_status: ready
guide_focus: Web-based workforce and configuration portal
repository: web-portal
---

## About the Web Portal

The Web Portal is the administration interface for the reference environment. It manages workforce hierarchies, user accounts, access control, organisations, locations, and care teams.

It is not a separate stack. [Setting up the environment](/components/reference-infrastructure/) builds the Portal from source and runs it alongside the other services, so by the time you reach this guide it is already available.

## Before you begin

A running environment from [set up the environment](/components/reference-infrastructure/), with the Portal answering on its port. Nothing else needs installing.

## Open the Portal and sign in

The Portal is served at `http://localhost:8084`.

Sign in with one of the sample accounts the environment creates.

| User | Password | Reaches |
| --- | --- | --- |
| `admin-user` | `Admin@123` | Every screen |
| `practitioner-user` | `Practitioner@123` | The practitioner view |

`./dev.sh up` prints these at the end of every run, along with the Keycloak console credentials, which are generated for each install. They are sample credentials, so change them for anything beyond local development.

The Keycloak administrator account is for the Keycloak console itself. It is not a Portal account and cannot sign in to the realm.

## Why the Portal can administer anything at all

The Portal has no backend of its own. Everything it does is a call to the gateway, and the gateway carries the Reference Backend extensions.

Requests to `/fhir` reach the FHIR server through the gateway, so ordinary FHIR resources are read and written under the gateway's access rules. Requests to `/api` reach the Reference Backend endpoints, which is what makes user management possible, because creating a user has to create a Keycloak account and a FHIR Practitioner together.

Both paths are same-origin, proxied by the Portal's own web server to the gateway. That is why the Portal works without any cross-origin configuration.

## What the environment already contains

The first run loads sample data, so the Portal is not empty when you open it. You get one organisation, a facility, a location chain, a care team, and a set of practitioners including the two accounts above.

Reload it at any time with `./dev.sh seed`, or start clean with `./dev.sh reset`.

## Prepare the environment for the Client App

Sign in as `admin-user`, then set up the structure a health worker needs.

1. **Review or create the organisation** the workforce belongs to.
2. **Build the location hierarchy** the programme is arranged around. The Client App scopes a health worker's data by their assigned location.
3. **Create care teams** and assign practitioners to them.
4. **Create the health worker account** the Client App signs in as, and give it the roles it needs.

Each of these is a FHIR resource written through the gateway, so what you create here is what the Client App reads.

Continue to the Client App once an administrator can sign in and the workforce structure exists.

## Working on the Portal itself

To change Portal source rather than use it, run the development server against the same environment.

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-web-portal.git
cd ohs-player-reference-web-portal
pnpm install
cp .env.example .env
pnpm dev
```

The repository pins its package manager through the `packageManager` field in `package.json`, so install that version rather than a newer one.

Point the copied `.env` at the running environment. The development server needs the FHIR base URL, the gateway for `/api`, the identity issuer, and the client id, which are the same four values every component in the environment uses.

Two constraints are worth knowing before you start.

The development server uses a fixed port rather than incrementing, because the identity client accepts redirects only from that address. If the port is busy the server stops instead of moving to the next one.

The identity client in the environment allows redirects to the Portal's own address only. Running the development server on a different port means adding its address to the client's redirect URIs and web origins in the Keycloak console, or pointing `OHS_PLAYER_APP_HOST` at it and re-rendering.

## Expected result

The Portal loads at `http://localhost:8084`, signing in as `admin-user` lands on the dashboard with the full navigation, and the organisation and locations from the sample data are visible.

## Troubleshooting

### Keycloak rejects the sign-in

Use a realm account such as `admin-user` or `practitioner-user`. The Keycloak administrator from the environment file is for the administration console, not for the Portal.

### A screen is missing from the navigation

Either its feature flag is off or the account lacks the role for it. Unauthorised navigation is hidden rather than disabled, so both look the same. [Who can reach what](/configure/web-portal-access/) lists the roles and [configure the Web Portal](/configure/web-portal-configuration/) lists the flags.

### The Locations screen shows a no-access panel

That screen calls the gateway's location hierarchy endpoint, which is gated by the `location-hierarchy.view` role rather than by a general locations permission. The sample administrator holds it. An account created outside the realm import usually does not, and the panel appears even though the navigation link is visible.

### Creating a user fails

Creating a user posts to `/api/users`, which the Reference Backend serves from inside the gateway. Check that the gateway is running and that the account holds `users.edit` or `users.manage`.

## Next step

[Run the Client App](/components/client-app/run/) against the environment you just prepared.
