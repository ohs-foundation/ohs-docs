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

The fastest way to get started with Open Health Stack is to spin up the OHS Player reference implementation. It provides a clear, sequential path from bringing up local infrastructure to running multiplatform client applications and streaming analytics dashboards.

Alternatively, if you are looking for component-specific examples, individual SDK integrations, or form authoring guides, explore [Tutorials and codelabs](/tutorials-and-codelabs/).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          THE BUILDER JOURNEY                            │
├─────────────┬─────────────┬─────────────┬─────────────┬─────────────────┤
│ STEP 1      │ STEP 2      │ STEP 3      │ STEP 4      │ STEP 5          │
│ Deploy      │ Load        │ Administer  │ Run Client  │ Stream          │
│ Reference   │ Gateway     │ Web Admin   │ Application │ Analytics       │
│ Infra       │ Extensions  │ Portal      │ (KMP)       │ & Dashboards    │
└─────────────┴─────────────┴─────────────┴─────────────┴─────────────────┘
```

## What you will achieve

By completing this quickstart, you will have a running local healthcare system with end-to-end data flow.

- **A live backend infrastructure** with PostgreSQL, Keycloak identity, an un-forked HAPI FHIR server, and Info Gateway.
- **An administrative organisation structure** with health facilities, practitioner roles, and care teams managed through the Web Admin Portal.
- **A multiplatform frontline client** capturing clinical encounters offline on mobile or desktop and syncing with the central FHIR server.
- **A streaming analytical pipeline** transforming FHIR resources into relational schemas powering live Apache Superset dashboards.

[Watch the 5-minute video demonstration ↗](https://ohs.foundation)

## System requirements

Before starting, ensure the required developer tools are installed.

| Tool | Minimum version | Purpose |
| --- | --- | --- |
| Docker Engine & Compose | Docker 24+, Compose v2 | Running the containerized service topology |
| JDK | JDK 21+ | Building gateway extension JARs and Kotlin applications |
| Node.js & pnpm | Node 18+, pnpm 8+ | Running the Web Admin Portal |
| Git & Bash | Standard tools | Repository cloning and environment script execution |

## The 5-step build path

### Step 1 · Bring up the reference infrastructure

Start the foundational containerized services including PostgreSQL, Keycloak for identity, an un-forked HAPI FHIR server, and the Info Gateway entry point.

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-infrastructure.git
cd ohs-player-reference-infrastructure
./dev.sh up
```

Follow the [Reference Infrastructure deployment guide](/components/reference-infrastructure/) to verify service health checks across ports 8081, 8082, and 8083.

### Step 2 · Build and load gateway backend extensions

Build the custom Spring Boot extension module providing administrative APIs and role-based access rules, then load it into the Gateway host.

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-backend.git
cd ohs-player-reference-backend
mvn clean package
```

Follow the [Reference Backend run guide](/components/reference-backend/run/) to configure and launch the gateway with your extension JAR.

### Step 3 · Launch the Web Admin Portal

Start the browser administration console to configure healthcare facilities, practitioner roles, organisations, and care teams.

```sh
git clone https://github.com/ohs-foundation/ohs-player-reference-web-portal.git
cd ohs-player-reference-web-portal
pnpm install && pnpm dev
```

Follow the [Web Admin Portal run guide](/components/web-portal/run/) to log in via Keycloak and set up initial health worker credentials.

### Step 4 · Run the frontline client application

Launch the Kotlin Multiplatform frontline mobile and desktop application.

```sh
git clone https://github.com/ohs-foundation/player-reference.git
cd player-reference
./gradlew :composeApp:run
```

Follow the [Client App run guide](/components/client-app/run/) to sign in with health worker credentials, capture patient encounters using Structured Data Capture forms, and synchronize records offline and online.

### Step 5 · Stream analytics into live dashboards

Deploy SQL-on-FHIR pipelines via FHIR Data Pipes to flatten transactional FHIR records into relational tables and view populated Apache Superset dashboards.

```sh
cd ohs-player-reference-infrastructure
./dev.sh up --pipes
```

Follow the [Reference Analytics run guide](/components/reference-analytics/run/) to view indicator queries and clinical dashboards.

## Next steps

- If you want to customize forms, registers, or indicators without writing code, follow [Configure a screen from FHIR data](/configure/screen-from-fhir-data/).
- If you want to explore hands-on developer tracks, check out [Tutorials and codelabs](/tutorials-and-codelabs/).
- If you need custom backend endpoints or unique UI widgets, read [Decide when code is necessary](/extend/decide/).
