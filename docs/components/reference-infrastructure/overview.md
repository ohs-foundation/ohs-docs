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

Reference Infrastructure brings up the services every other component depends on. Those are a HAPI FHIR server, identity, the gateway in front of them and the database underneath. It is deployment material rather than an application. Nothing in it is a component you use directly, which is why it is the first stage rather than an item in the component set.

This is stage one of the [get started sequence](/get-started/). Everything after it points at what this creates.

## Before you begin

Docker Engine with Compose v2.29 or newer, plus a shell environment the setup scripts can run in. They use `envsubst` for template rendering and read randomness from `/dev/urandom`, so GNU gettext is the only extra package to install.

| Platform | Install |
| --- | --- |
| Debian, Ubuntu, WSL | `sudo apt install gettext-base` |
| Fedora, RHEL | `sudo dnf install gettext` |
| Alpine | `apk add gettext` |
| macOS | `brew install gettext && brew link --force gettext` |

The link step on macOS is not optional. Homebrew keeps `gettext` keg-only, so the package installs but `envsubst` stays off your `PATH` until the link is forced. macOS also ships Bash 3.2, which is too old, so `brew install bash` replaces it.

Compose must be recent because two of the images are built from source and the script skips pulling those.

On Windows use WSL, because the scripts do not run under native `cmd.exe` or PowerShell.

Install Docker Desktop alongside it and enable WSL integration, then clone inside the WSL filesystem rather than under `/mnt/c`, where builds are markedly slower.

Confirm all four before starting. Four answers and no "command not found" is what you are looking for.

```sh
docker --version
docker compose version
envsubst --version
bash --version
```

## Bring it up

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-infrastructure.git
cd ohs-player-reference-infrastructure
./dev.sh up
```

The first run copies the example environment file to `.env`, generates a random secret for every placeholder in it, renders the service configuration from those values, builds the FHIR Gateway and the Web Portal from source and starts the stack.

Building from source takes several minutes. Published images for both are planned, so a first run will pull them rather than build them. Subsequent runs reuse what is already there.

`.env` holds generated credentials and is deliberately untracked. Do not commit it.

## What comes up

| Service | Default port | Role |
| --- | --- | --- |
| PostgreSQL | `5433` | Storage for the HAPI FHIR server and identity, bound to loopback only |
| Keycloak | `8081` | Identity, realms, clients, and roles |
| HAPI FHIR | `8082` | The FHIR server, unmodified |
| FHIR Gateway | `8083` | The authenticated, access-controlled entry point |
| Web Portal | `8084` | The reference SPA, calling HAPI FHIR server through the FHIR Gateway |

Every port is overridable in `.env`.

Clients never reach the HAPI FHIR server directly. Everything routes through the gateway, which is why bringing up the gateway is part of standing up the environment rather than a later step.

## Confirm it is healthy

Identity and the HAPI FHIR server both take appreciably longer to become ready than the database does. Allow up to ninety seconds for Keycloak and up to three minutes for HAPI FHIR on a first run, then run the checks.

```sh
# identity is serving the realm
curl -sf http://localhost:8081/realms/ohs-player/.well-known/openid-configuration | grep -q issuer

# the FHIR server, reached directly
curl -sf http://localhost:8082/fhir/metadata | grep -q CapabilityStatement

# the same document through the gateway, which is the only route clients use
curl -sf http://localhost:8083/fhir/metadata | grep -q CapabilityStatement
```

Three silent successes mean identity is up, HAPI FHIR server is serving and the FHIR Gateway is proxying to it.

The first command asks identity for its realm rather than for `/health/ready`. Keycloak serves its health endpoints on a management port this stack does not publish, so that path answers 404 even when Keycloak is perfectly healthy. The container's own health check probes that port internally, which is what `docker compose ps` reports.

## Sign in

The first run also loads sample data. That is an organisation, a six-level location hierarchy from country down to facility and a practitioner record for each user below. It loads only when the HAPI FHIR server holds none of it, so a later `up` never overwrites records you have created.

| User | Password | Group |
| --- | --- | --- |
| `admin-user` | `Admin@123` | Super User |
| `practitioner-user` | `Practitioner@123` | Practitioner |

Both sign in to the Portal at `http://localhost:8084`. `./dev.sh up` prints them at the end of every run, together with the Keycloak admin console credentials, which are generated per install. These are sample credentials, so change them for anything beyond development, staging or testing.

## Choose an authentication mode

The HAPI FHIR server can run open or validating tokens from identity, selected by one value in `.env`.

| Value | Behaviour |
| --- | --- |
| `application-no-auth.yaml` | The HAPI FHIR server accepts requests without a token |
| `application-auth.yaml` | The FHIR server validates tokens issued by identity |

Open is convenient while exploring. Token validation is the mode that matches how the components are meant to fit together and the one to use before running the Portal and the Client App against the environment.

Switching is a change to `.env` followed by `./dev.sh up`. No compose file is edited.

## Managing the stack

| Command | Does |
| --- | --- |
| `./dev.sh up` | Render configuration and start services |
| `./dev.sh down` | Stop services, keeping data |
| `./dev.sh reset` | Stop services and wipe the volumes |
| `./dev.sh logs [service]` | Tail logs for everything or one service |
| `./dev.sh render` | Regenerate service configuration from `.env` |
| `./dev.sh clean` | Remove generated files |
| `./dev.sh seed` | Load the sample data explicitly |

`reset` is the one to reach for when the environment has drifted into a state you cannot explain. It is faster than diagnosing a local-only problem.

Additional profiles extend the stack.
`--proxy` serves the Portal, the gateway and identity from a single origin.
`--pipes` adds the analytics pipeline and dashboard, which read from the FHIR server this stack already runs, covered in [set up analytics](/components/reference-analytics/run/).

## Running it by hand

`dev.sh` is a wrapper around `docker compose` that adds secret generation and template rendering. Doing the same by hand is three steps, and is what you want if your environment forbids running scripts, or you are folding these steps into your own automation.

Create the environment file, then replace each `[generated]` placeholder with its own random value. There are eight.

```sh
cp .env.example .env
chmod 600 .env

while grep -q '=\[generated\]' .env; do
  secret="$(od -An -N24 -tx1 /dev/urandom | tr -d ' \n')"
  sed -i "0,/=\[generated\]/{s/=\[generated\]/=$secret/}" .env
done
```

On macOS, `sed -i` takes an argument, so use `sed -i ''` instead.

Render the four service configurations. Each `envsubst` call is given an explicit list of variables, and that list is what stops it from also consuming Spring's own `${DB_HOST}` and `${DB_PORT}` placeholders, which have to survive into the rendered file for the container to expand at runtime.

```sh
set -a; . ./.env; set +a

envsubst '${OHS_PLAYER_KEYCLOAK_CLIENT_SECRET} ${OHS_PLAYER_APP_HOST} ${HAPI_FHIR_SERVER_KEYCLOAK_CLIENT_SECRET} ${FHIR_GATEWAY_KEYCLOAK_CLIENT_SECRET}' \
  < keycloak/ohs-player-realm.json.example > keycloak/ohs-player-realm.json

envsubst '${HAPI_FHIR_DB_PASSWORD}' \
  < hapi-fhir/application-no-auth.yaml.example > hapi-fhir/application-no-auth.yaml

envsubst '${HAPI_FHIR_DB_PASSWORD} ${HAPI_FHIR_SERVER_KEYCLOAK_CLIENT_SECRET} ${KEYCLOAK_PUBLIC_URL}' \
  < hapi-fhir/application-auth.yaml.example > hapi-fhir/application-auth.yaml

envsubst '${POSTGRES_ADMIN_PASSWORD}' \
  < data-pipes/config/postgres-analytics.json.example > data-pipes/config/postgres-analytics.json
```

All four outputs hold secrets and are untracked. Then start the stack.

```sh
docker compose pull --ignore-buildable
docker compose up -d --build
docker compose ps
```

`--ignore-buildable` matters because the gateway and the Web Portal exist in no registry, so a plain `pull` exits non-zero on them. `--build` matters because `up -d` on its own builds only when an image is absent, so a changed value in `.env` would never reach an already-built Portal bundle.

Profiles are passed the same way, and have to be repeated when stopping or containers from them are left running.

```sh
docker compose --profile pipes up -d --build
docker compose --profile proxy --profile pipes down
```

Loading the sample data is not part of compose. `./dev.sh seed` does it, and `seed/seed-fhir.sh` does the same directly.

## Expected result

Five services running and the three values every other component needs. Those are the FHIR base URL through the gateway, the gateway URL itself and the identity issuer.

## Next step

[Set up the backend](/components/reference-backend/run/) loads the Player endpoints and access rules into the gateway, which the Web Portal and Client App both depend on.

## Source

The [Reference Infrastructure repository](https://github.com/ohs-foundation/ohs-player-reference-infrastructure) owns the compose definitions, the setup script, the pinned service versions and troubleshooting for start-up failures.
