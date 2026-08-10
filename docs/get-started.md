---
title: Get started
description: Prepare the shared Player environment, administer it through the Web Portal, then run the Client App.
slug: /get-started/
sidebar_position: 20
guide_type: Get started
guide_status: partial
guide_focus: OHS Player getting-started guidance
repository: ohs-player
---

## The shortest path

[Run the Web Portal](/components/web-portal/run/). Its Docker Compose setup starts HAPI FHIR, Keycloak, and a development gateway locally, so it is the one component you can bring up on its own and sign in to. If you are evaluating Player and want to see something working in an afternoon, start there.

## The full sequence

For a usable reference implementation rather than a single component, prepare the shared Player environment first and treat the Client App as the end of the path rather than the beginning.

1. **Prepare the shared Player environment.** HAPI FHIR stores the data, Keycloak supplies identity and access management, and FHIR Gateway hosts protected Player APIs. Start with [Reference Infrastructure](/components/reference-infrastructure/) and add the [Reference Backend](/extend/backend-extensions/) when the environment needs Player-specific APIs.
2. **Run the Web Portal and administer the environment.** The Portal starts its local services, then lets an administrator work with users, roles, workforce structures, and configuration. Follow [Run the Web Portal](/components/web-portal/run/).
3. **Run the Client App.** After the shared Player environment and its administration are ready, follow [Run the Client App](/components/client-app/run/) to build and launch the Kotlin Multiplatform application.
4. **Adapt the user interface.** Use [Decide when code is necessary](/extend/decide/) to work out whether a change belongs in configuration, a renderer, or the application itself.
5. **Add Analytics for reporting.** [Reference Analytics](/components/reference-analytics/) reads from an already-running shared Player environment. It is a continuation of the operational setup, not a first-run requirement.

Stages 1 to 3 depend on each other in that order. Stages 4 and 5 are independent of one another and can be taken in either order once the client runs.

## Where each guide lives

| To do this | Go to |
| --- | --- |
| Understand what Player is and how its parts relate | [How Player uses OHS components](/concepts/how-player-uses-ohs-components/) |
| Bring up the shared environment | [Reference Infrastructure](/components/reference-infrastructure/) |
| Add Player-specific gateway APIs | [Add backend extensions](/extend/backend-extensions/) |
| Administer users and workforce data | [Run the Web Portal](/components/web-portal/run/) |
| Run the end-user application | [Run the Client App](/components/client-app/run/) |
| Change what a screen shows | [Configure a screen from FHIR data](/configure/screen-from-fhir-data/) |
| Work out whether a change needs code | [Decide when code is necessary](/extend/decide/) |
| Add reporting and dashboards | [Reference Analytics](/components/reference-analytics/) |
