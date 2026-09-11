---
title: Configure the Web Portal
description: Point the Portal at an environment and choose which screens it offers, using build-time settings.
slug: /configure/web-portal-configuration/
sidebar_position: 20
guide_type: Configuration guide
guide_status: ready
guide_focus: Environment URLs and feature flags for the Portal
repository: web-portal
---

## The one thing to understand first

The Portal reads no configuration at runtime. Every setting below is compiled into the JavaScript bundle when the application is built, which has two consequences worth stating before anything else.

Setting an environment variable on a running container changes nothing. Moving the Portal to a new environment means building it again with that environment's values.

That is a deliberate property of a single-page application with no backend of its own, not an oversight. It also means an image is tied to the environment it was built for, so tag images accordingly.

## Where the values live

In development, Vite reads a `.env` file from the root of the repository rather than from the application directory. Start from the checked-in example.

```sh
cp .env.example .env
```

Every variable is read in one place, `apps/ohs-player-web/src/config/env.ts`, which is the file to open when you want to know what a setting actually does.

For a container image, the same values are passed as Docker build arguments instead. The repository's `docker-compose.yml` shows the pattern.

## Point it at an environment

| Variable | What it sets |
| --- | --- |
| `VITE_FHIR_BASE_URL` | The FHIR base URL, and by derivation the gateway root |
| `VITE_OIDC_ISSUER` | The OpenID Connect issuer, such as a Keycloak realm |
| `VITE_CLIENT_ID` | The identity client the Portal signs in as |
| `VITE_FHIR_VERSION` | The FHIR version the Portal declares, `R4` |

**Keep `VITE_FHIR_BASE_URL` ending in `/fhir`.** The Portal derives the gateway root by removing that suffix, and calls the endpoints under `/api` against the result. A base URL of `https://gateway.example.org/fhir` gives a gateway root of `https://gateway.example.org`, so user creation posts to `https://gateway.example.org/api/users`. Drop the suffix and those calls go to the wrong host path while ordinary FHIR traffic keeps working, which makes the mistake look like a gateway fault.

The identity client also needs the Portal's own origin registered as a valid redirect target and web origin, because sign-in uses the authorization code flow with PKCE and returns to `/callback` on the Portal.

## Choose which screens exist

Seven flags, one per screen.

| Variable | Screen |
| --- | --- |
| `VITE_FLAG_DASHBOARD` | Dashboard |
| `VITE_FLAG_USER_MGMT` | Users |
| `VITE_FLAG_LOCATION_MGMT` | Locations |
| `VITE_FLAG_ORG_MGMT` | Organisations |
| `VITE_FLAG_CARE_TEAMS` | Care Teams |
| `VITE_FLAG_SETUP_WIZARD` | Setup Wizard |
| `VITE_FLAG_FHIR_VIEWER` | FHIR Viewer |

Each one is on unless you set it to exactly `false`. Any other value leaves the screen enabled, including `0` and an empty string, so a typo fails towards showing the screen rather than hiding it.

Turning a flag off removes the screen's link from the sidebar and blocks its route, so a bookmarked address lands back on the dashboard. It does not restrict the underlying API, which the gateway still governs. Use flags to shape what an audience sees, and roles to decide what an account may do.

## Development-only settings

Two variables exist only for the development server and have no effect in a built image.

| Variable | What it sets |
| --- | --- |
| `VITE_DEV_FHIR_TARGET` | Where the development proxy sends `/fhir` |
| `VITE_DEV_API_TARGET` | Where the development proxy sends `/api` |

They exist because the example configuration points `VITE_FHIR_BASE_URL` at the development server itself, keeping the Portal same-origin. The custom endpoints carry no cross-origin headers, so same-origin is what makes them reachable at all in development.

## Form definitions

`VITE_QUESTIONNAIRE_VARIANT` selects which bundled set of FHIR `Questionnaire` files the Portal uses for the forms that are questionnaire-driven. The repository ships one set, named `default`, and an unrecognised value falls back to it. Adding a variant is a code change, covered in [extend the Web Portal](/extend/web-portal-extensions/).

## Appearance

Light and dark are chosen by the person using the Portal, through the control in the top bar, and remembered in that browser. There is no environment variable for it. Changing the palette itself means supplying a different theme to the core library, which is [an extension](/extend/web-portal-extensions/) rather than configuration.

## Expected result

Start the Portal and sign in. Three checks confirm the settings took effect.

- The sidebar shows exactly the screens whose flags are on and whose permissions your account holds.
- The dashboard counts populate, which means the FHIR base URL resolves.
- Creating a user succeeds, which means the gateway root resolved correctly from that same URL.

If the first two pass and the third fails, the FHIR base URL is reaching FHIR but the derived gateway root is wrong, or the gateway in front of it does not serve the endpoints under `/api`.

## Where to go next

[Who can reach what](/configure/web-portal-access/) covers the second half of what a person sees, which is the roles behind the permissions.
