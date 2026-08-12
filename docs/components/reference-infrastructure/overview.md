---
title: Set up the environment
description: Bring up the shared environment every Player component runs against.
slug: /components/reference-infrastructure/
sidebar_position: 10
guide_type: Setup guide
guide_status: ready
guide_focus: The shared Player environment
repository: infrastructure
---

## Goal and scope

Reference Infrastructure brings up the services every other component depends on: a FHIR server, identity, the gateway in front of them, and the database underneath. It is deployment material rather than an application — nothing in it is a component you use directly, which is why it is the first stage rather than an item in the component set.

This is stage one of the [get started sequence](/get-started/). Everything after it points at what this creates.

## Before you begin

Docker Engine with Compose v2, plus a shell environment the setup scripts can run in — they use `envsubst` for template rendering and OpenSSL for secret generation. On Windows use WSL; the scripts do not run under native `cmd.exe` or PowerShell.

## Bring it up

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-infrastructure.git
cd ohs-player-reference-infrastructure
./dev.sh up
```

The first run copies the example environment file to `.env`, generates a random secret for every placeholder in it, renders the service configuration from those values, and starts the stack. Subsequent runs reuse what is already there.

`.env` holds generated credentials and is deliberately untracked. Do not commit it.

## What comes up

| Service | Default port | Role |
| --- | --- | --- |
| PostgreSQL | `5433` | Storage for the FHIR server and identity, bound to loopback only |
| Keycloak | `8081` | Identity, realms, clients, and roles |
| HAPI FHIR | `8082` | The FHIR server, unmodified |
| FHIR Gateway | `8083` | The authenticated, access-controlled entry point |

Every port is overridable in `.env`.

Clients never reach the FHIR server directly. Everything routes through the gateway, which is why bringing up the gateway is part of standing up the environment rather than a later step.

## Confirm it is healthy

Identity and the FHIR server both take appreciably longer to become ready than the database does — allow up to ninety seconds for Keycloak and up to three minutes for HAPI FHIR on a first run. Then:

```sh
curl -sf http://localhost:8081/health/ready | grep -q UP
curl -sf http://localhost:8082/fhir/metadata | grep -q CapabilityStatement
curl -sf http://localhost:8083/fhir/metadata | grep -q CapabilityStatement
```

Three silent successes mean identity is up, the FHIR server is serving, and the gateway is proxying to it.

## Choose an authentication mode

The FHIR server can run open or validating tokens from identity, selected by one value in `.env`:

| Value | Behaviour |
| --- | --- |
| `application-no-auth.yaml` | The FHIR server accepts requests without a token |
| `application-auth.yaml` | The FHIR server validates tokens issued by identity |

Open is convenient while exploring. Token validation is the mode that matches how the components are meant to fit together, and the one to use before running the Portal and the Client App against the environment.

Switching is a change to `.env` followed by `./dev.sh up` — no compose file is edited.

## Managing the stack

| Command | Does |
| --- | --- |
| `./dev.sh up` | Render configuration and start services |
| `./dev.sh down` | Stop services, keeping data |
| `./dev.sh reset` | Stop services and wipe the volumes |
| `./dev.sh logs [service]` | Tail logs for everything or one service |
| `./dev.sh render` | Regenerate service configuration from `.env` |
| `./dev.sh clean` | Remove generated files |

`reset` is the one to reach for when the environment has drifted into a state you cannot explain. It is faster than diagnosing a local-only problem.

Additional profiles extend the stack — `--pipes` adds the analytics pipeline and dashboard, covered in [set up analytics](/components/reference-analytics/run/).

## Expected result

Four services running and healthy, and the three values every other component needs: the FHIR base URL through the gateway, the gateway URL itself, and the identity issuer.

## Next step

[Set up the backend](/components/reference-backend/run/) loads the Player endpoints and access rules into the gateway, which the Web Portal and Client App both depend on.

## Source

The [Reference Infrastructure repository](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) owns the compose definitions, the setup script, the pinned service versions, and troubleshooting for start-up failures.
