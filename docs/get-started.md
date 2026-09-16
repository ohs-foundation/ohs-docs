---
id: get-started
title: Build and Quickstart
description: A guided step-by-step path to deploy reference infrastructure, administer care teams, run frontline clients, and stream analytics.
slug: /get-started/
sidebar_label: Quickstart
sidebar_position: 20
guide_type: Get started
guide_status: ready
repository: ohs-player
---

## The end-to-end builder journey

The fastest way to get started building with FHIR is to spin up the OHS Player reference implementation. It provides a clear, sequential path from bringing up local infrastructure to running multiplatform client applications and streaming analytics dashboards.

Alternatively, if you are looking for component-specific examples, individual SDK integrations, or form authoring guides, explore [Tutorials and codelabs](/tutorials-and-codelabs/).

## What you will achieve

By completing this quickstart, you will have a running local healthcare system with end-to-end data flow.

- **A live backend infrastructure** with PostgreSQL, Keycloak identity, an un-forked HAPI FHIR server, and Info Gateway.
- **An administrative organisation structure** with health facilities, practitioner roles, and care teams managed through the Web Admin Portal.
- **A multiplatform frontline client** capturing clinical encounters offline on mobile or desktop and syncing them through the gateway.
- **A streaming analytical pipeline** transforming FHIR resources into relational schemas powering live Apache Superset dashboards.

[Watch the 5-minute video demonstration ↗](https://ohs.foundation)

## System requirements

The environment builds the gateway and the Portal inside containers, so you do not need a JDK or Node to run it. Those are needed only for the Client App and for working on the Portal source.

| Tool | Minimum version | Needed for |
| --- | --- | --- |
| Docker Engine and Compose | Docker 24+, Compose v2 | The whole environment |
| Git and Bash | Standard tools | Cloning and the environment scripts |
| JDK | 21+ | Building the Client App |
| Android Studio or Xcode | Current | Android and iOS targets |

On Windows use WSL, because the environment scripts do not run under native `cmd.exe` or PowerShell.

## The build path

### Step 1 · Bring up the reference environment

One command builds and starts everything the reference needs.

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-infrastructure.git
cd ohs-player-reference-infrastructure
cp .env.example .env
./dev.sh up
```

That starts PostgreSQL, Keycloak, an unforked HAPI FHIR server, the FHIR Gateway carrying the Reference Backend extensions, and the Web Admin Portal. It imports the identity realm with its clients and sample accounts, and loads sample FHIR data so nothing is empty on first open.

The gateway and the Portal are built from source as part of this, which is why the first run takes longer than later ones.

Follow [set up the environment](/components/reference-infrastructure/) for the service ports, the health checks, and how to choose an authentication mode. [Set up the backend](/components/reference-backend/run/) explains what the gateway build contains and how to point it at different source.

### Step 2 · Administer the programme

Open the Portal at `http://localhost:8084` and sign in as `admin-user`.

Review the organisation and location hierarchy, create care teams, and create the health worker account the Client App will sign in as. What you set up here is what the Client App is allowed to see.

Follow [run the Web Portal](/components/web-portal/run/).

### Step 3 · Run the frontline client application

Build and launch the Kotlin Multiplatform application, then sign in as the health worker you created.

```sh
git clone https://github.com/ohs-foundation/player-reference.git
cd player-reference
./gradlew :ohs-player-reference-app:run
```

Follow [run the Client App](/components/client-app/run/) to point it at the environment, sign in as the health worker you created, capture an encounter through a Structured Data Capture form, and sync it back.

### Step 4 · Add analytics

Flatten the FHIR records into relational tables and chart them.

```sh
cd ohs-player-reference-infrastructure
./dev.sh up --pipes
```

Follow [set up analytics](/components/reference-analytics/run/) to run the pipeline and connect the dashboard.

## Next steps

- To customize forms, registers, or indicators without writing code, follow [configure a screen from FHIR data](/configure/screen-from-fhir-data/).
- To explore hands-on developer tracks, see [tutorials and codelabs](/tutorials-and-codelabs/).
- For custom backend endpoints or new UI widgets, read [decide when code is necessary](/extend/decide/).
